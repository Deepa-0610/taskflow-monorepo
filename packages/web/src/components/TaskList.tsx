'use client'

import { TaskCard } from './TaskCard'

interface Task {
  id: string
  title: string
  is_complete: boolean
  created_at?: string | null
  updated_at?: string | null
}

interface TaskListProps {
  tasks?: Task[]
  onTaskUpdated?: (task?: Task) => void
  filter?: 'all' | 'active' | 'completed'
  className?: string
}

export const TaskList = ({ tasks = [], onTaskUpdated, filter = 'all', className }: TaskListProps) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.is_complete
    if (filter === 'completed') return task.is_complete
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aDate = a.updated_at || a.created_at
    const bDate = b.updated_at || b.created_at

    if (!aDate || !bDate) return 0

    const aTime = new Date(aDate).getTime()
    const bTime = new Date(bDate).getTime()

    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0

    return bTime - aTime
  })

  if (sortedTasks.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12 bg-card rounded-lg border">
          <p className="text-muted-foreground text-lg">
            {filter === 'completed'
              ? 'No completed tasks. Keep up the great work!'
              : filter === 'active'
              ? 'All caught up! Create a new task to get started.'
              : 'No tasks yet. Create your first task!'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskUpdated={onTaskUpdated}
          />
        ))}
      </div>
    </div>
  )
}