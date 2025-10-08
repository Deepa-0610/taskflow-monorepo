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
    <Card className="group animate-slide-in-bottom hover-lift border-l-4 border-l-primary/50 hover:border-l-primary transition-all duration-300">
      <CardContent className="flex items-center gap-4 p-5">
        <div className="relative">
          <Checkbox
            checked={task.is_complete}
            onCheckedChange={handleToggle}
            disabled={loading}
            className="h-6 w-6 transition-all duration-300 group-hover:scale-110 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-accent data-[state=checked]:to-primary data-[state=checked]:border-0"
          />
          {task.is_complete && (
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-accent to-primary opacity-20 blur-md animate-pulse-glow" />
          )}
        </div>
        <span
          className={`flex-1 text-base transition-all duration-300 ${
            task.is_complete
              ? 'text-muted-foreground line-through opacity-60'
              : 'text-foreground font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text'
          }`}
        >
          {task.title}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          disabled={loading}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-12"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
