
import React from 'react';
import ProgressCard from './ProgressCard';
import WeatherSection from './WeatherSection';
import PlantRecommendations from './PlantRecommendations';
import SeasonalPlantingGuide from '@/components/SeasonalPlantingGuide';
import ActiveChallenges from './ActiveChallenges';
import GardeningTipsSection from './GardeningTipsSection';
import { DemoUser } from '@/types/UserTypes';
import { Plant } from '@/data/plants';
import { GardeningTip } from '@/data/gardeningTips';
import { WeatherData } from '@/data/weatherData';
import { GardeningChallenge } from '@/data/challenges';

interface DashboardOverviewProps {
  currentUser: DemoUser;
  recommendedPlants: Plant[];
  gardeningTips: GardeningTip[];
  weatherData: WeatherData;
  weatherRecommendations: string[];
  activeChallenges: GardeningChallenge[];
}

const DashboardOverview = ({
  currentUser,
  recommendedPlants,
  gardeningTips,
  weatherData,
  weatherRecommendations,
  activeChallenges
}: DashboardOverviewProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Progress Card */}
        <ProgressCard user={currentUser} />
        
        {/* Weather Card */}
        <WeatherSection 
          weatherData={weatherData} 
          recommendations={weatherRecommendations} 
        />
      </div>
      
      {/* Plant Recommendations */}
      <PlantRecommendations plants={recommendedPlants} />
      
      {/* Seasonal Planting Guide */}
      <div className="mb-8 animate-fade-up">
        <SeasonalPlantingGuide />
      </div>
      
      {/* Active Challenges */}
      <ActiveChallenges challenges={activeChallenges} />
      
      {/* Gardening Tips */}
      <GardeningTipsSection tips={gardeningTips} />
    </>
  );
};

export default DashboardOverview;
