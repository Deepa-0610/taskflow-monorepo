'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import * as serverActions from '@/app/dashboard/server-actions'
import { useAuth } from '@/hooks/useAuth'

type Task = {
  id: string
  title: string
  is_complete: boolean
}

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Task title cannot be empty').max(200, 'Task title is too long'),
})

interface TaskFormProps {
  onTaskAdded?: (task: Task) => void
}

export const TaskForm = ({ onTaskAdded }: TaskFormProps) => {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('You must be logged in to add tasks')
      return
    }

    setLoading(true)

    try {
      const validated = taskSchema.parse({ title })

      // Prefer server action if available (Next.js App Router "use server")
      let taskData = null
      try {
        // call server action
        taskData = await serverActions.addTask({ title: validated.title, userId: user.id } as any)
      } catch (err) {
        // fallback to client-side supabase for environments where server actions aren't available
        const { data, error } = await supabase
          .from('tasks')
          .insert([
            {
              title: validated.title,
              user_id: user.id,
              is_complete: false,
            }
          ])
          .select('id, title, is_complete')
          .single()

        if (error) throw error
        taskData = data
      }

      if (!taskData) throw new Error('No task returned from insert')

      setTitle('')
      toast.success('Task added successfully')
      onTaskAdded?.(taskData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        toast.error('Failed to add task')
      }
      console.error('Error adding task:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="shadow-lg border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="✨ What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="h-12 text-base transition-all duration-300 focus:border-primary"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !title.trim()} 
            className="gap-2 h-12 px-6"
          >
            <Plus className="h-5 w-5" />
            <span>Add Task</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}