
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/UserTypes';

interface UserProfileSectionProps {
  user: any; // Using any type to accommodate both AuthContext User and UserProfile types
  onProfileClick: () => void;
  onLogoutClick: () => void;
}

const UserProfileSection = ({ user, onProfileClick, onLogoutClick }: UserProfileSectionProps) => {
  if (!user) return null;
  
  return (
    <div className="p-4 border-t">
      <div className="flex items-center mb-4">
        <div className="h-8 w-8 rounded-full bg-muted-foreground flex items-center justify-center text-primary-foreground">
          {user.name?.charAt(0)}
        </div>
        <div className="ml-2">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 justify-start" 
          onClick={onProfileClick}
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 justify-start" 
          onClick={onLogoutClick}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfileSection;
