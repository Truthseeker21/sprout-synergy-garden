
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AppLogo from './navigation/AppLogo';
import NavMenu from './navigation/NavMenu';
import UserProfileSection from './navigation/UserProfileSection';
import { menuItems } from './navigation/MenuItems';

export { menuItems };

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
      <AppLogo />
      <NavMenu 
        showAdminDashboard={showAdminDashboard} 
        onNavigation={handleNavigation} 
      />
      <UserProfileSection 
        user={user} 
        onProfileClick={() => handleNavigation('/profile')} 
        onLogoutClick={handleLogout} 
      />
    </div>
  );
};

export default Sidebar;
