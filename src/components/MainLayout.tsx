
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Sprout, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Sprout, label: 'Plants', path: '/plants' },
    { icon: BookOpen, label: 'Techniques', path: '/techniques' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: Award, label: 'Challenges', path: '/challenges' },
    { icon: Calendar, label: 'Garden Journal', path: '/journal' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Add admin link if user is admin
  if (user?.isAdmin) {
    navigationItems.push({
      icon: Settings,
      label: 'Admin Panel',
      path: '/admin',
    });
  }

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-primary text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">AgriGrow</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:bg-primary-hover"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b p-4 space-y-2">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
          <Button 
            variant="outline" 
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-56 bg-muted border-r min-h-screen p-4">
        <div className="text-center mb-6">
          <h1 className="font-bold text-xl text-primary">AgriGrow</h1>
          <p className="text-xs text-muted-foreground">Urban Gardening Guide</p>
        </div>
        
        <div className="space-y-1 flex-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>
        
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-muted-foreground flex items-center justify-center text-primary-foreground">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
