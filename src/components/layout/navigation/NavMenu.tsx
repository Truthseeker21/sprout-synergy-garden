
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import NavButton from './NavButton';
import { menuItems, adminMenuItem } from './MenuItems';

interface NavMenuProps {
  showAdminDashboard?: boolean;
  onNavigation: (path: string) => void;
}

const NavMenu = ({ showAdminDashboard = false, onNavigation }: NavMenuProps) => {
  return (
    <ScrollArea className="flex-1 px-4">
      <div className="space-y-2 py-2">
        {menuItems.map((item) => (
          <NavButton
            key={item.path}
            path={item.path}
            icon={item.icon}
            label={item.label}
            isActive={window.location.pathname === item.path}
            onClick={() => onNavigation(item.path)}
          />
        ))}

        {showAdminDashboard && (
          <NavButton
            path={adminMenuItem.path}
            icon={adminMenuItem.icon}
            label={adminMenuItem.label}
            isActive={window.location.pathname === adminMenuItem.path}
            onClick={() => onNavigation(adminMenuItem.path)}
          />
        )}
      </div>
    </ScrollArea>
  );
};

export default NavMenu;
