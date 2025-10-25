import { Task } from '@/pages/Dashboard';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string, is_complete: boolean) => Promise<void>;
  onEditTask: (id: string, title: string) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  className?: string;
  filter?: 'all' | 'active' | 'completed';
}

const TaskList = ({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  className,
  filter = 'all'
}: TaskListProps) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.is_complete;
    }

    if (filter === 'completed') {
      return task.is_complete;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aDate = a.updated_at || a.created_at;
    const bDate = b.updated_at || b.created_at;

    if (!aDate || !bDate) {
      return 0;
    }

    const aTime = new Date(aDate).getTime();
    const bTime = new Date(bDate).getTime();

    if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
      return 0;
    }

    return bTime - aTime;
  });

  if (sortedTasks.length === 0) {
    return (
      <div className={className}>
        <div className="text-center py-12 bg-card rounded-lg border">
          <p className="text-muted-foreground text-lg">
            {filter === 'completed'
              ? 'No completed tasks. Keep up the great work!'
              : filter === 'active'
              ? 'All caught up! Create a new task to get started.'
              : 'No tasks yet. Create your first task above!'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-3">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
