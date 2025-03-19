
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GardenAnalytics from '@/components/GardenAnalytics';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { getRecommendedPlants } from '@/data/plants';
import { getRandomTips } from '@/data/gardeningTips';
import { mockWeatherData, getGardeningWeatherRecommendations } from '@/data/weatherData';
import { demoUser } from '@/types/UserTypes';
import { getActiveChallenges } from '@/data/challenges';

const Dashboard = () => {
  const { user } = useAuth();
  const currentUser = demoUser; // Replace with actual user data when available
  
  const [recommendedPlants, setRecommendedPlants] = useState([]);
  const [gardeningTips, setGardeningTips] = useState([]);
  const [weatherRecommendations, setWeatherRecommendations] = useState([]);
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');
  
  useEffect(() => {
    // Load initial data
    setRecommendedPlants(getRecommendedPlants());
    setGardeningTips(getRandomTips(3));
    setWeatherRecommendations(getGardeningWeatherRecommendations(mockWeatherData));
    
    if (currentUser) {
      setActiveChallenges(getActiveChallenges(currentUser.activeChallenges));
    }
  }, [currentUser]);

  return (
    <MainLayout title={`Welcome, ${user?.name}`}>
      <Tabs 
        defaultValue="overview" 
        className="w-full" 
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardOverview 
            currentUser={currentUser}
            recommendedPlants={recommendedPlants}
            gardeningTips={gardeningTips}
            weatherData={mockWeatherData}
            weatherRecommendations={weatherRecommendations}
            activeChallenges={activeChallenges}
          />
        </TabsContent>
        
        <TabsContent value="analytics">
          <GardenAnalytics />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Dashboard;
