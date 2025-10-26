'use client'

export const dynamic = 'force-dynamic'

import { useAuth } from '@/hooks/useAuth'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function AuthPage() {
  const { user, loading, signIn, signUp } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email || !password) {
        toast.error('Please fill in all fields')
        setIsLoading(false)
        return
      }

      const { error } = await signIn(email, password)
      if (error) {
        toast.error(error.message || 'Failed to sign in')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!email || !password || !confirmPassword) {
        toast.error('Please fill in all fields')
        setIsLoading(false)
        return
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        setIsLoading(false)
        return
      }

      if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        setIsLoading(false)
        return
      }

      const { error } = await signUp(email, password)
      if (error) {
        toast.error(error.message || 'Failed to sign up')
      } else {
        toast.success('Check your email to confirm your account')
      }
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background">
      <Card className="w-full max-w-md border-2 border-primary/20">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? 'Sign up to start managing your tasks'
              : 'Sign in to your account to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}