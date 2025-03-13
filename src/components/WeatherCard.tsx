
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/data/weatherData';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-base">{weatherData.location}</h3>
            <div className="text-3xl font-semibold mt-1">{weatherData.current.temp}°C</div>
            <div className="text-sm text-muted-foreground">{weatherData.current.condition}</div>
          </div>
          <div className="text-primary">
            <Cloud className="h-12 w-12" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div className="text-xs mt-1">Humidity</div>
            <div className="text-sm font-medium">{weatherData.current.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-4 w-4 text-blue-500" />
            <div className="text-xs mt-1">Wind</div>
            <div className="text-sm font-medium">{weatherData.current.windSpeed} km/h</div>
          </div>
          <div className="flex flex-col items-center">
            <Thermometer className="h-4 w-4 text-blue-500" />
            <div className="text-xs mt-1">Feels Like</div>
            <div className="text-sm font-medium">{weatherData.current.temp}°C</div>
          </div>
        </div>
        
        <div className="border-t mt-4 pt-3">
          <h4 className="text-sm font-medium mb-2">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-1 text-center">
            {weatherData.forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs">{day.date.slice(5)}</div>
                <Cloud className="h-4 w-4 my-1" />
                <div className="text-xs font-medium">{day.maxTemp}°</div>
                <div className="text-xs text-muted-foreground">{day.minTemp}°</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
