'use client'

import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, User as UserIcon, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const { user, signOut } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-background p-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Profile</h1>
          
          {user && (
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Your profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-mono text-sm">{user.id}</p>
                    </div>
                  </div>

                  {user.user_metadata?.name && (
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <UserIcon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{user.user_metadata.name}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="text-sm text-muted-foreground">
                <p>Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>

              <Button 
                onClick={signOut} 
                variant="outline" 
                className="w-full gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}