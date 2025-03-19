
import { useNavigate } from 'react-router-dom';
import NotificationsPopover from '../NotificationsPopover';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

interface DesktopHeaderProps {
  title?: string;
}

const DesktopHeader = ({ title }: DesktopHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="hidden md:flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <NotificationsPopover />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DesktopHeader;
