
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Sidebar from './layout/Sidebar';
import MobileHeader from './layout/MobileHeader';
import DesktopHeader from './layout/DesktopHeader';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <MobileHeader title={title} />
        <div className={cn("flex-1 p-4 md:p-8", isMobile && "pt-2")}>
          <DesktopHeader title={title} />
          {isMobile && title && (
            <h1 className="text-xl font-bold mb-4">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
