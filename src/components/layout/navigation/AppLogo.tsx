
interface AppLogoProps {
  title?: string;
  subtitle?: string;
}

const AppLogo = ({ 
  title = "AgriGrow",
  subtitle = "Urban Gardening Guide" 
}: AppLogoProps) => {
  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl text-primary">{title}</h1>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default AppLogo;
