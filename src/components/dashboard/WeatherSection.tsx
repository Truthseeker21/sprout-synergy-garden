
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import WeatherCard from '@/components/WeatherCard';
import { WeatherData } from '@/data/weatherData';

interface WeatherSectionProps {
  weatherData: WeatherData;
  recommendations: string[];
}

const WeatherSection = ({ weatherData, recommendations }: WeatherSectionProps) => {
  return (
    <Card className="col-span-1 md:col-span-2 animate-fade-up">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Today's Gardening Weather</h2>
        <WeatherCard weatherData={weatherData} />
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Gardening Recommendations</h3>
          <ul className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-primary mr-2">•</span>
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSection;
