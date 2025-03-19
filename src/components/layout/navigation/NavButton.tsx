
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavButtonProps {
  path: string;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

const NavButton = ({ path, onClick, icon, label, isActive = false }: NavButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-base font-normal",
        isActive && "bg-muted font-medium"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3">{label}</span>
      </div>
    </Button>
  );
};

export default NavButton;
