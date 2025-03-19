
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { menuItems } from './Sidebar';
import { Menu, Settings, LogOut, User } from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileMenuDrawer = ({ isOpen, onOpenChange }: MobileMenuDrawerProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  const showAdminDashboard = user?.isAdmin;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">
            <h1 className="font-bold text-2xl text-primary">AgriGrow</h1>
            <p className="text-xs text-muted-foreground">Urban Gardening Guide</p>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-2 p-4">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuDrawer;
