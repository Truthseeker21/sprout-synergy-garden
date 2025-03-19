
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { getRecommendedPlants } from '@/data/plants';
import { getRandomTips } from '@/data/gardeningTips';
import { mockWeatherData, getGardeningWeatherRecommendations } from '@/data/weatherData';
import { demoUser } from '@/types/UserTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlantCard from '@/components/PlantCard';
import GardeningTipCard from '@/components/GardeningTipCard';
import WeatherCard from '@/components/WeatherCard';
import ChallengeCard from '@/components/ChallengeCard';
import SeasonalPlantingGuide from '@/components/SeasonalPlantingGuide';
import GardenAnalytics from '@/components/GardenAnalytics';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Plant } from '@/data/plants';
import { GardeningTip } from '@/data/gardeningTips';
import { getActiveChallenges } from '@/data/challenges';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const currentUser = demoUser; // Replace with actual user data when available
  
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);
  const [gardeningTips, setGardeningTips] = useState<GardeningTip[]>([]);
  const [weatherRecommendations, setWeatherRecommendations] = useState<string[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<any[]>([]);
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Progress Card */}
            <Card className="col-span-1 animate-fade-up">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gardening Points</span>
                      <span className="font-medium">{currentUser.points}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${Math.min((currentUser.points / 1000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Challenges Completed</span>
                      <span className="font-medium">{currentUser.challengesCompleted}</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div 
                          key={i}
                          className={`h-2 rounded-full ${i < currentUser.challengesCompleted ? 'bg-success' : 'bg-muted'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Latest Badge</div>
                    {currentUser.badges.length > 0 ? (
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">{currentUser.badges[0].name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No badges yet</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Weather Card */}
            <Card className="col-span-1 md:col-span-2 animate-fade-up">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Today's Gardening Weather</h2>
                <WeatherCard weatherData={mockWeatherData} />
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Gardening Recommendations</h3>
                  <ul className="space-y-2">
                    {weatherRecommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm flex items-start">
                        <span className="text-primary mr-2">•</span>
                        {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Plant Recommendations */}
          <div className="mb-8 animate-fade-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recommended Plants for Your Garden</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => navigate('/plants')}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedPlants.map((plant) => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant} 
                  onClick={() => navigate(`/plants/${plant.id}`)}
                />
              ))}
            </div>
          </div>
          
          {/* Seasonal Planting Guide */}
          <div className="mb-8 animate-fade-up">
            <SeasonalPlantingGuide />
          </div>
          
          {/* Active Challenges */}
          <div className="mb-8 animate-fade-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Active Challenges</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => navigate('/challenges')}
              >
                Find Challenges <Plus className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {activeChallenges.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeChallenges.map((challenge) => (
                  <ChallengeCard 
                    key={challenge.id} 
                    challenge={challenge}
                    isActive={true}
                    onJoin={() => navigate(`/challenges/${challenge.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">You don't have any active challenges yet.</p>
                  <Button onClick={() => navigate('/challenges')}>Browse Challenges</Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Gardening Tips */}
          <div className="animate-fade-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Gardening Tips</h2>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="watering">Watering</TabsTrigger>
                  <TabsTrigger value="pest-control">Pest Control</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {gardeningTips.map((tip) => (
                <GardeningTipCard key={tip.id} tip={tip} />
              ))}
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => navigate('/tips')}
              >
                View All Tips
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <GardenAnalytics />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Dashboard;
