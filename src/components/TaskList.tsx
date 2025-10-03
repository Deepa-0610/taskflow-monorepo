import { Task } from '@/pages/Dashboard';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string, is_complete: boolean) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
}

const TaskList = ({ tasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border">
        <p className="text-muted-foreground text-lg">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggleTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
