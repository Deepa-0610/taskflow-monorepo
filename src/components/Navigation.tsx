import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ListTodo, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-2xl font-bold group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow transition-transform group-hover:scale-110">
              <ListTodo className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="gradient-text">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to="/dashboard">
                    <ListTodo className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="gap-2">
                  <Link to="/profile">
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
                  <Link to="/auth?mode=login">Sign In</Link>
                </Button>
                <Button asChild variant="gradient">
                  <Link to="/auth?mode=signup">Get Started</Link>
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
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {user ? (
              <>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <ListTodo className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start gap-2">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <Button 
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }} 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="gradient" className="w-full">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
