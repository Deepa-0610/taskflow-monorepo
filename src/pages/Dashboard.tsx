import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const getStorageKey = (userId: string) => `taskflow:tasks:${userId}`;

  const loadCachedTasks = (userId: string): Task[] | null => {
    if (typeof window === 'undefined') return null;

    const cachedTasks = localStorage.getItem(getStorageKey(userId));
    if (!cachedTasks) return null;

    try {
      return JSON.parse(cachedTasks) as Task[];
    } catch (error) {
      console.error('Failed to parse cached tasks from localStorage:', error);
      localStorage.removeItem(getStorageKey(userId));
      return null;
    }
  };

  const persistTasks = useCallback((currentUserId: string, tasksToCache: Task[]) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(getStorageKey(currentUserId), JSON.stringify(tasksToCache));
    } catch (error) {
      console.error('Failed to store tasks in localStorage:', error);
    }
  }, []);

  const fetchTasks = useCallback(async (currentUserId: string) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', currentUserId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const fetchedTasks = data || [];
      setTasks(fetchedTasks);
      persistTasks(currentUserId, fetchedTasks);
    } catch (error: any) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [persistTasks]);

  const applyTasksUpdate = useCallback(
    (updater: (prev: Task[]) => Task[] | Task[]) => {
      if (!user) return;

      setTasks((prev) => {
        const next = updater(prev);
        persistTasks(user.id, next);
        return next;
      });
    },
    [persistTasks, user]
  );

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const cachedTasks = loadCachedTasks(user.id);
    if (cachedTasks) {
      setTasks(cachedTasks);
      setLoading(false);
    } else {
      setLoading(true);
    }

    fetchTasks(user.id);

    // Subscribe to realtime changes with proper configuration
    const channel = supabase
      .channel('tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Realtime update:', payload);
          
          // Immediately update local state based on event type
          if (payload.eventType === 'INSERT') {
            applyTasksUpdate(prev => [payload.new as Task, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            applyTasksUpdate(prev => prev.map(task => 
              task.id === payload.new.id ? payload.new as Task : task
            ));
          } else if (payload.eventType === 'DELETE') {
            applyTasksUpdate(prev => prev.filter(task => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchTasks]);

  const handleAddTask = async (title: string) => {
    if (!user) return;

    // Optimistic: add a temp task immediately
    const tempId = `temp-${crypto.randomUUID()}`;
    const tempTask: Task = {
      id: tempId,
      title,
      is_complete: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: user.id,
    };
    applyTasksUpdate((prev) => [tempTask, ...prev]);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      // Replace temp with actual DB row (in case Realtime is delayed)
      if (data) {
        applyTasksUpdate((prev) => prev.map((t) => (t.id === tempId ? (data as Task) : t)));
      }

      toast.success('Task added successfully');
    } catch (error: any) {
      // Revert optimistic add on error
      applyTasksUpdate((prev) => prev.filter((t) => t.id !== tempId));
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (id: string, is_complete: boolean) => {
    if (!user) {
      toast.error('You must be signed in to update tasks');
      return;
    }

    const prevTasks = tasks;
    // Optimistic toggle
    applyTasksUpdate((cur) => cur.map((t) => (t.id === id ? { ...t, is_complete } : t)));

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete })
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        applyTasksUpdate((cur) => cur.map((t) => (t.id === id ? (data as Task) : t)));
      }

      toast.success(is_complete ? 'Task completed!' : 'Task marked incomplete');
    } catch (error: any) {
      // Revert on error
      applyTasksUpdate(() => prevTasks);
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleEditTask = async (id: string, title: string) => {
    const newTitle = title.trim();
    if (!newTitle) return;

    if (!user) {
      toast.error('You must be signed in to update tasks');
      return;
    }

    const prevTasks = tasks;
    // Optimistic title update
    applyTasksUpdate((cur) => cur.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: newTitle })
        .eq('id', id)
        .eq('user_id', user.id)
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        applyTasksUpdate((cur) => cur.map((t) => (t.id === id ? (data as Task) : t)));
      }

      toast.success('Task updated successfully');
    } catch (error: any) {
      // Revert on error
      applyTasksUpdate(() => prevTasks);
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!user) {
      toast.error('You must be signed in to delete tasks');
      return;
    }

    const prevTasks = tasks;
    // Optimistic remove
    applyTasksUpdate((cur) => cur.filter((t) => t.id !== id));

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Task deleted');
    } catch (error: any) {
      // Revert on error
      applyTasksUpdate(() => prevTasks);
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3 animate-fade-in">
            <h1 className="text-5xl font-bold tracking-tight">
              My <span className="gradient-text">Tasks</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Organize your day and accomplish your goals
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <TaskForm onAddTask={handleAddTask} />
          </div>

          <div className="flex gap-3 pt-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                filter === 'all'
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                  : 'border-muted bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                filter === 'active'
                  ? 'border-accent bg-accent text-accent-foreground shadow-lg'
                  : 'border-muted bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground'
              }`}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => setFilter('completed')}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                filter === 'completed'
                  ? 'border-emerald-500 bg-emerald-500 text-emerald-50 shadow-lg'
                  : 'border-muted bg-card text-muted-foreground hover:border-emerald-300/60 hover:text-foreground'
              }`}
            >
              Completed
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : (
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                filter={filter}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
