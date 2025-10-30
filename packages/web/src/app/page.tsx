'use client'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { Navigation } from '@/components/Navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-20 pb-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold tracking-tighter leading-tight">
              Manage Your Tasks <span className="gradient-text">Effortlessly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay organized and boost your productivity with Taskflow. Create, track, and complete your tasks with a beautiful and intuitive interface.
            </p>
            
            <div className="flex gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur hover:border-primary/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Task Management</h3>
            <p className="text-muted-foreground">
              Create, edit, and delete tasks with just a few clicks. Keep your task list organized and up-to-date.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur hover:border-primary/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-muted-foreground">
              Experience instant synchronization across all your devices. Your tasks update in real-time.
            </p>
          </div>

          <div className="p-6 rounded-lg border border-primary/20 bg-card/50 backdrop-blur hover:border-primary/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and secured. We use industry-standard security practices.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-2xl mx-auto text-center mt-20 pt-12 border-t border-primary/10">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who are already managing their tasks with Taskflow.
          </p>
          <Button size="lg" asChild>
            <Link href="/auth" className="gap-2">
              Start Free Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  )
}