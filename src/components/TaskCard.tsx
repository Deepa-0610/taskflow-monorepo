import { Task } from '@/pages/Dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, is_complete: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(task.id, !task.is_complete);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(task.id);
    setLoading(false);
  };

  return (
    <Card className="group animate-fade-in hover-lift">
      <CardContent className="flex items-center gap-4 p-5">
        <Checkbox
          checked={task.is_complete}
          onCheckedChange={handleToggle}
          disabled={loading}
          className="h-5 w-5 transition-transform group-hover:scale-110"
        />
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
          onClick={handleDelete}
          disabled={loading}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all hover:scale-110 active:scale-95"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
