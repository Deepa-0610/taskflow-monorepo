'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

import { TaskList } from '@/components/TaskList'
import { TaskForm } from '@/components/TaskForm'
import { useAuth } from '@/hooks/useAuth'

interface Task {
  id: string
  title: string
  is_complete: boolean
  created_at?: string | null
  updated_at?: string | null
}

type TaskFilter = 'all' | 'active' | 'completed'

export default function DashboardPage() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)
  const [filter, setFilter] = useState<TaskFilter>('all')

  const localStorageKey = (userId?: string) => `taskflow_tasks_${userId ?? 'anon'}`

  const loadLocalTasks = (userId?: string) => {
    try {
      const raw = localStorage.getItem(localStorageKey(userId))
      if (!raw) return [] as Task[]
      const parsed = JSON.parse(raw) as Task[]
      if (!Array.isArray(parsed)) return [] as Task[]
      return parsed
    } catch (err) {
      console.warn('Failed to load tasks from localStorage', err)
      return [] as Task[]
    }
  }

  const saveLocalTasks = (items: Task[], userId?: string) => {
    try {
      localStorage.setItem(localStorageKey(userId), JSON.stringify(items))
    } catch (err) {
      console.warn('Failed to save tasks to localStorage', err)
    }
  }

  const supabase = useMemo(() => {
    if (!user) {
      return null
    }

    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
    )
  }, [user])

  const fetchTasks = useCallback(async () => {
    if (!user || !supabase) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select('id, title, is_complete, created_at, updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      // Merge server tasks with any locally cached tasks (e.g., created offline)
      const serverTasks: Task[] = data || []
      const localTasks = loadLocalTasks(user.id)

      // Build a map of server tasks to avoid duplicates
      const idSet = new Set(serverTasks.map((t) => t.id))
      const merged = [...serverTasks]
      for (const lt of localTasks) {
        if (!idSet.has(lt.id)) merged.push(lt)
      }

      setTasks(merged)
      saveLocalTasks(merged, user.id)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }, [supabase, user])

  useEffect(() => {
    if (!user || !supabase) return

    // Load any locally cached tasks first so the UI is responsive,
    // then fetch latest from the server and merge.
    try {
      const cached = loadLocalTasks(user.id)
      if (cached.length > 0) setTasks(cached)
    } catch (err) {
      /* ignore */
    }

    fetchTasks()

    const channel = supabase
      .channel(`tasks-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchTasks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, supabase, fetchTasks])

  const handleTaskAdded = useCallback((task: Task) => {
    setTasks((prev) => {
      const next = [task, ...prev]
      // persist immediately to localStorage
      try {
        saveLocalTasks(next, user?.id)
      } catch (err) {
        /* ignore */
      }
      return next
    })
    setRefreshKey(prev => prev + 1)
  }, [user])

  // onTaskUpdated can be called with an updated task (optimistic) or without payload.
  const handleTaskUpdated = useCallback((updatedTask?: Task) => {
    if (updatedTask && user) {
      setTasks((prev) => {
        const next = prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        saveLocalTasks(next, user.id)
        return next
      })
      return
    }

    // fallback: re-fetch from server
    fetchTasks()
  }, [fetchTasks, user])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.is_complete
      if (filter === 'completed') return task.is_complete
      return true
    })
  }, [tasks, filter])

  useEffect(() => {
    if (!user) return

    // simple debounce: wait 300ms after tasks settle before writing
    const id = setTimeout(() => {
      try {
        saveLocalTasks(tasks, user.id)
      } catch (err) {
        /* ignore */
      }
    }, 300)

    return () => clearTimeout(id)
  }, [tasks, user])

  // Keep localStorage in sync whenever tasks change (debounced)

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">Please log in to view your tasks.</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Centered task input */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <TaskForm onTaskAdded={handleTaskAdded} />
        </div>
      </div>

      {/* Centered filter buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-3">
        {(['all', 'active', 'completed'] as TaskFilter[]).map((value) => {
          const isActive = filter === value
          const label = value.charAt(0).toUpperCase() + value.slice(1)

          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                isActive
                  ? 'border-primary bg-primary text-primary-foreground shadow'
                  : 'border-muted bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Center the task list */}
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading tasks...</p>
            </div>
          ) : (
            <TaskList
              key={refreshKey}
              tasks={filteredTasks}
              onTaskUpdated={handleTaskUpdated}
              filter={filter}
              className="animate-in fade-in"
            />
          )}
        </div>
      </div>
    </div>
  )
}