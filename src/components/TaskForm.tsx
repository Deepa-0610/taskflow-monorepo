import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().trim().min(1, 'Task title cannot be empty').max(200, 'Task title is too long'),
});

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

const TaskForm = ({ onAddTask }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validated = taskSchema.parse({ title });
      await onAddTask(validated.title);
      setTitle('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error('Failed to add task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-[0_8px_30px_-4px_hsl(262_83%_58%/0.2)] border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 bg-gradient-to-br from-card via-card to-primary/5">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="✨ What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="h-12 text-base transition-all duration-300 focus:shadow-[0_0_0_3px_hsl(262_83%_58%/0.2)] focus:border-primary pr-4 bg-background/50"
            />
          </div>
          <Button 
            type="submit" 
            disabled={loading || !title.trim()} 
            className="gap-2 h-12 px-6 relative overflow-hidden"
            variant="gradient"
          >
            <Plus className="h-5 w-5 transition-transform group-hover:rotate-180 duration-300" />
            <span className="relative z-10">Add Task</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
