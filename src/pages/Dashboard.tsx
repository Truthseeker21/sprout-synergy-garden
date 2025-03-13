
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold text-primary">Welcome, {user?.name}</h1>
          <Button onClick={handleLogout} variant="outline" className="self-start sm:self-auto">
            Logout
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow animate-fade-up">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Plant Guide</h2>
            <p className="text-sm text-muted-foreground">
              Explore our comprehensive guide to urban plants.
            </p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow animate-fade-up">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Gardening Tips</h2>
            <p className="text-sm text-muted-foreground">
              Learn essential tips for successful urban gardening.
            </p>
          </Card>
          <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow animate-fade-up">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Community</h2>
            <p className="text-sm text-muted-foreground">
              Connect with fellow urban gardeners.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
