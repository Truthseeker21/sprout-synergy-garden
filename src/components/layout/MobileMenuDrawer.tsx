
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import AppLogo from './navigation/AppLogo';
import NavMenu from './navigation/NavMenu';
import UserProfileSection from './navigation/UserProfileSection';

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
            <AppLogo />
          </SheetTitle>
        </SheetHeader>
        <NavMenu 
          showAdminDashboard={showAdminDashboard} 
          onNavigation={handleNavigation} 
        />
        <UserProfileSection 
          user={user} 
          onProfileClick={() => handleNavigation('/profile')} 
          onLogoutClick={handleLogout} 
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenuDrawer;
