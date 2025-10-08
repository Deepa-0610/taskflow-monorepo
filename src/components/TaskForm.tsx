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
    <Card className="shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.15)] border-2">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="flex-1 h-12 text-base transition-all focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.1)]"
          />
          <Button 
            type="submit" 
            disabled={loading || !title.trim()} 
            className="gap-2 h-12 px-6"
            variant="gradient"
          >
            <Plus className="h-5 w-5" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
