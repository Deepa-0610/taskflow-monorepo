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
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !title.trim()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
