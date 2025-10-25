'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2, Check, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import * as serverActions from '@/app/dashboard/server-actions'
import { useAuth } from '@/hooks/useAuth'

interface Task {
  id: string
  title: string
  is_complete: boolean
  created_at?: string | null
  updated_at?: string | null
}

interface TaskCardProps {
  task: Task
  // onTaskUpdated: optional callback that receives the updated task (or undefined)
  onTaskUpdated?: (task?: Task) => void
}

export const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)

  const ensureUser = () => {
    if (!user) {
      toast.error('You must be signed in to modify tasks')
      return false
    }
    return true
  }

  const handleToggle = async () => {
    if (!ensureUser()) return

    setLoading(true)
    try {
      try {
        // try server action first
        const updated = await serverActions.updateTask({ id: task.id, userId: user.id, updates: { is_complete: !task.is_complete } } as any)
        toast.success(!task.is_complete ? 'Task completed!' : 'Task marked incomplete')
        onTaskUpdated?.(updated)
      } catch (err) {
        // fallback to client-side supabase
        try {
          const { data, error } = await supabase
            .from('tasks')
            .update({ is_complete: !task.is_complete })
            .eq('id', task.id)
            .eq('user_id', user.id)
            .select('id, title, is_complete, created_at, updated_at')
            .single()

          if (error) throw error

          const updated: Task = data ?? {
            ...task,
            is_complete: !task.is_complete,
            updated_at: new Date().toISOString(),
          }

          toast.success(!task.is_complete ? 'Task completed!' : 'Task marked incomplete')
          onTaskUpdated?.(updated)
        } catch (e) {
          toast.error('Failed to update task')
          console.error('Error updating task:', e)
        }
      }
    } catch (error) {
      toast.error('Failed to update task')
      console.error('Error updating task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!ensureUser()) return

    setLoading(true)
    try {
      try {
        await serverActions.deleteTask({ id: task.id, userId: user.id } as any)
        toast.success('Task deleted')
        onTaskUpdated?.()
      } catch (err) {
        try {
          const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', task.id)
            .eq('user_id', user.id)

          if (error) throw error

          toast.success('Task deleted')
          onTaskUpdated?.()
        } catch (e) {
          toast.error('Failed to delete task')
          console.error('Error deleting task:', e)
        }
      }
    } catch (error) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async () => {
    if (!editedTitle.trim() || editedTitle === task.title) {
      setIsEditing(false)
      setEditedTitle(task.title)
      return
    }

    if (!ensureUser()) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title: editedTitle.trim() })
        .eq('id', task.id)
        .eq('user_id', user.id)
        .select('id, title, is_complete, created_at, updated_at')
        .single()

      if (error) throw error

      const updated: Task = data ?? {
        ...task,
        title: editedTitle.trim(),
        updated_at: new Date().toISOString(),
      }

      toast.success('Task updated successfully')
      setIsEditing(false)
      onTaskUpdated?.(updated)
    } catch (error) {
      toast.error('Failed to update task')
      console.error('Error updating task:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedTitle(task.title)
  }

  return (
    <Card className="group hover:shadow-lg border-l-4 border-l-primary/50 hover:border-l-primary transition-all duration-300">
      <CardContent className="flex items-center gap-4 p-5">
        <Checkbox
          checked={task.is_complete}
          onCheckedChange={handleToggle}
          disabled={loading}
          className="h-6 w-6"
        />
        {isEditing ? (
          <>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={loading}
              className="flex-1 h-10"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit()
                if (e.key === 'Escape') handleCancelEdit()
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              disabled={loading}
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              disabled={loading}
            >
              <X className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <>
            <span
              className={`flex-1 text-base transition-all duration-300 ${
                task.is_complete
                  ? 'text-muted-foreground line-through opacity-60'
                  : 'text-foreground font-medium'
              }`}
            >
              {task.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              disabled={loading || task.is_complete}
            >
              <Edit2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}