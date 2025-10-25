import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from "../packages/web/src/components/ui/toaster";
import { Toaster as Sonner } from "../packages/web/src/components/ui/sonner";
import { TooltipProvider } from "../packages/web/src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../packages/web/src/hooks/useAuth";
import '../packages/web/src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TaskFlow',
  description: 'A modern task management application',
}

// Create a client component for providers
function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          {children}
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}