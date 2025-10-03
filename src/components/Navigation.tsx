import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { CheckSquare, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-xl font-bold text-primary">
            <CheckSquare className="h-6 w-6" />
            TaskFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button 
                    variant={isActive('/profile') ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={signOut} variant="outline" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="default">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant={isActive('/dashboard') ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                  >
                    <CheckSquare className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant={isActive('/profile') ? 'default' : 'ghost'}
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
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
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="default" className="w-full">Get Started</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
