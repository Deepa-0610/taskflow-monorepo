'use client'

import { Navigation } from '@/components/Navigation'
import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      {/* Navigation is fixed; add top padding to main so content appears below it */}
      <Navigation />
      <main className="pt-16 min-h-screen overflow-auto">
        {children}
      </main>
    </ProtectedRoute>
  )
}