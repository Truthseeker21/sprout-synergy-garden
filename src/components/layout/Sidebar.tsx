
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  Leaf,
  Lightbulb,
  Users,
  Trophy,
  Book,
  Camera,
  LayoutGrid,
  Settings,
  LogOut,
  User
} from 'lucide-react';

export const menuItems = [
  { icon: <Home className="h-5 w-5" />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Leaf className="h-5 w-5" />, label: 'Plants', path: '/plants' },
  { icon: <Lightbulb className="h-5 w-5" />, label: 'Techniques', path: '/techniques' },
  { icon: <Users className="h-5 w-5" />, label: 'Community', path: '/community' },
  { icon: <Trophy className="h-5 w-5" />, label: 'Challenges', path: '/challenges' },
  { icon: <Book className="h-5 w-5" />, label: 'Journal', path: '/journal' },
  { icon: <Camera className="h-5 w-5" />, label: 'Identify', path: '/identify' },
  { icon: <LayoutGrid className="h-5 w-5" />, label: 'Garden Planner', path: '/garden-planner' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const showAdminDashboard = user?.isAdmin;

  return (
    <div className="hidden md:flex flex-col h-screen w-64 bg-background border-r">
      <div className="p-6">
        <h1 className="font-bold text-2xl text-primary">AgriGrow</h1>
        <p className="text-xs text-muted-foreground">Urban Gardening Guide</p>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-2">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                "w-full justify-start text-base font-normal",
                window.location.pathname === item.path && "bg-muted font-medium"
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <div className="flex items-center">
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </div>
            </Button>
          ))}

          {showAdminDashboard && (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-base font-normal",
                window.location.pathname === '/admin' && "bg-muted font-medium"
              )}
              onClick={() => handleNavigation('/admin')}
            >
              <div className="flex items-center">
                <Settings className="h-5 w-5" />
                <span className="ml-3">Admin</span>
              </div>
            </Button>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-muted-foreground flex items-center justify-center text-primary-foreground">
            {user?.name?.charAt(0)}
          </div>
          <div className="ml-2">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 justify-start" 
            onClick={() => handleNavigation('/profile')}
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 justify-start" 
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
