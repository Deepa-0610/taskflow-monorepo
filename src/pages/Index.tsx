import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { CheckSquare, ListTodo, Zap, Shield } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <CheckSquare className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Organize Your Tasks with <span className="text-primary">TaskFlow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive task management application designed to help you organize, track, and complete your daily tasks efficiently.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
              Get Started Free
              <CheckSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/50">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose TaskFlow?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-card p-6 rounded-lg border text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
              <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Easy Task Management</h3>
            <p className="text-muted-foreground">
              Create, update, and organize your tasks with a simple and intuitive interface.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-accent/10 rounded-full">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold">Real-time Updates</h3>
            <p className="text-muted-foreground">
              See your changes instantly across all devices with real-time synchronization.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border text-center space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is protected with enterprise-grade security and row-level access control.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Organized?</h2>
          <p className="text-xl text-muted-foreground">
            Join TaskFlow today and start managing your tasks more efficiently.
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="gap-2">
            Start Managing Tasks
            <CheckSquare className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
