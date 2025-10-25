'use client'

import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ListTodo, User, LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const Navigation = () => {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    // fixed full-width navbar
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2 text-2xl font-bold group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 transition-transform group-hover:scale-110">
              <ListTodo className="h-5 w-5 text-white" />
            </div>
            <span className="text-gradient">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/dashboard">
                    <ListTodo className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="gap-2">
                  <Link href="/profile">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button onClick={signOut} variant="outline" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {user ? (
              <>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <ListTodo className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button 
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }} 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild className="w-full">
                <Link href="/auth" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}