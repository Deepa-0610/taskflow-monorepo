import { useState, useEffect } from 'react';
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

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    
    fetchTasks();

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
            setTasks(prev => [payload.new as Task, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev => prev.map(task => 
              task.id === payload.new.id ? payload.new as Task : task
            ));
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(task => task.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleAddTask = async (title: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .insert([{ title, user_id: user.id }]);

      if (error) throw error;
      toast.success('Task added successfully');
    } catch (error: any) {
      toast.error('Failed to add task');
      console.error('Error adding task:', error);
    }
  };

  const handleToggleTask = async (id: string, is_complete: boolean) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ is_complete })
        .eq('id', id);

      if (error) throw error;
      toast.success(is_complete ? 'Task completed!' : 'Task marked incomplete');
    } catch (error: any) {
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Task deleted');
    } catch (error: any) {
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

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : (
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <TaskList
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
