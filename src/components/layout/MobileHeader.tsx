
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationsPopover from '../NotificationsPopover';
import MobileMenuDrawer from './MobileMenuDrawer';
import { Settings } from 'lucide-react';

interface MobileHeaderProps {
  title?: string;
}

const MobileHeader = ({ title }: MobileHeaderProps) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <MobileMenuDrawer
          isOpen={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        />
        <h1 className="font-bold text-xl ml-2 text-primary">AgriGrow</h1>
      </div>
      <div className="flex items-center">
        <NotificationsPopover />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleNavigation('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
