import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { CheckSquare, ListTodo, Zap, Shield, Clock, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                <Zap className="h-4 w-4" />
                Boost Your Productivity
              </span>
            </div>
            
            <h1 className="mb-6 animate-slide-up text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Organize Your Tasks,{' '}
              <span className="gradient-text">Achieve Your Goals</span>
            </h1>
            
            <p className="mb-8 animate-slide-up text-lg text-muted-foreground md:text-xl" style={{ animationDelay: '0.1s' }}>
              TaskFlow helps you manage your daily tasks efficiently with a clean,
              intuitive interface. Stay focused, get things done, and track your progress.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" variant="gradient" className="group" onClick={() => navigate('/auth')}>
                Get Started Free
                <CheckCircle2 className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Everything You Need to Stay Organized
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, powerful features to help you manage your tasks
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group animate-fade-in hover-lift rounded-2xl border bg-card p-8 transition-all" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
              <ListTodo className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Easy Task Management</h3>
            <p className="text-muted-foreground">
              Create, organize, and complete tasks with a simple and intuitive interface
              that keeps you focused on what matters.
            </p>
          </div>

          <div className="group animate-fade-in hover-lift rounded-2xl border bg-card p-8 transition-all" style={{ animationDelay: '0.2s' }}>
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
              <Clock className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Real-time Updates</h3>
            <p className="text-muted-foreground">
              Your tasks sync instantly across all your devices. Always stay up to date
              with real-time synchronization.
            </p>
          </div>

          <div className="group animate-fade-in hover-lift rounded-2xl border bg-card p-8 transition-all" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-destructive/10 text-destructive transition-all group-hover:scale-110 group-hover:bg-destructive group-hover:text-destructive-foreground">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is protected with enterprise-grade security. Only you can access
              your tasks with row-level security.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-primary py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-primary-foreground md:text-4xl">
            Ready to Get Organized?
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Join thousands of users who are already managing their tasks efficiently
          </p>
          <Button size="lg" variant="secondary" className="group" onClick={() => navigate('/auth')}>
            Start Using TaskFlow
            <CheckCircle2 className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
