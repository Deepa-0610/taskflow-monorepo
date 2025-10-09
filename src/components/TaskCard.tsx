import { Task } from '@/pages/Dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, is_complete: boolean) => Promise<void>;
  onEdit: (id: string, title: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TaskCard = ({ task, onToggle, onEdit, onDelete }: TaskCardProps) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

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

  const handleEdit = async () => {
    if (!editedTitle.trim() || editedTitle === task.title) {
      setIsEditing(false);
      setEditedTitle(task.title);
      return;
    }
    
    setLoading(true);
    await onEdit(task.id, editedTitle.trim());
    setIsEditing(false);
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
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
        {isEditing ? (
          <>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              disabled={loading}
              className="flex-1 h-10"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              disabled={loading}
              className="text-accent hover:text-accent hover:bg-accent/10 transition-all duration-300 hover:scale-110"
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancelEdit}
              disabled={loading}
              className="text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 hover:scale-110"
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
                  : 'text-foreground font-medium bg-gradient-to-r from-foreground to-primary bg-clip-text'
              }`}
            >
              {task.title}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(true)}
              disabled={loading || task.is_complete}
              className="text-primary hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <Edit2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={loading}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-12"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
