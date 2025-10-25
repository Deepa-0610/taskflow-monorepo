'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { CheckSquare, ListTodo, Zap, Shield, Clock, CheckCircle2 } from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

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
              <Button size="lg" variant="gradient" className="group" onClick={() => router.push('/auth')}>
                Get Started Free
                <CheckCircle2 className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
              </Button>
              
              <Button size="lg" variant="outline" className="group">
                <ListTodo className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Everything you need to stay organized
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful features designed to help you manage tasks efficiently and boost your productivity.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CheckSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Task Management</h3>
              <p className="text-muted-foreground">
                Create, organize, and track your tasks with ease. Set priorities, due dates, and categories.
              </p>
            </div>
            
            <div className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Time Tracking</h3>
              <p className="text-muted-foreground">
                Monitor how much time you spend on each task to improve your productivity and planning.
              </p>
            </div>
            
            <div className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/20">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted and secure. We respect your privacy and never share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Ready to get organized?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of users who have transformed their productivity with TaskFlow.
            </p>
            <Button size="lg" variant="gradient" onClick={() => router.push('/auth')}>
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;