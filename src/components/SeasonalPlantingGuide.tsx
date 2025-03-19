
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Leaf, Sun, CloudRain, Snowflake, ChevronRight } from 'lucide-react';

// Sample seasonal planting data
const seasonalPlants = {
  spring: [
    { id: 1, name: 'Tomatoes', bestTime: 'Late Spring', difficulty: 'Medium', type: 'Vegetable' },
    { id: 2, name: 'Lettuce', bestTime: 'Early Spring', difficulty: 'Easy', type: 'Vegetable' },
    { id: 3, name: 'Peas', bestTime: 'Early Spring', difficulty: 'Easy', type: 'Vegetable' },
    { id: 4, name: 'Marigolds', bestTime: 'Mid Spring', difficulty: 'Easy', type: 'Flower' },
    { id: 5, name: 'Strawberries', bestTime: 'Early Spring', difficulty: 'Medium', type: 'Fruit' },
  ],
  summer: [
    { id: 6, name: 'Peppers', bestTime: 'Early Summer', difficulty: 'Medium', type: 'Vegetable' },
    { id: 7, name: 'Cucumbers', bestTime: 'Early Summer', difficulty: 'Medium', type: 'Vegetable' },
    { id: 8, name: 'Basil', bestTime: 'Summer', difficulty: 'Easy', type: 'Herb' },
    { id: 9, name: 'Sunflowers', bestTime: 'Early Summer', difficulty: 'Easy', type: 'Flower' },
    { id: 10, name: 'Watermelon', bestTime: 'Early Summer', difficulty: 'Hard', type: 'Fruit' },
  ],
  fall: [
    { id: 11, name: 'Kale', bestTime: 'Fall', difficulty: 'Easy', type: 'Vegetable' },
    { id: 12, name: 'Spinach', bestTime: 'Fall', difficulty: 'Easy', type: 'Vegetable' },
    { id: 13, name: 'Carrots', bestTime: 'Late Summer/Fall', difficulty: 'Medium', type: 'Vegetable' },
    { id: 14, name: 'Broccoli', bestTime: 'Fall', difficulty: 'Medium', type: 'Vegetable' },
    { id: 15, name: 'Turnips', bestTime: 'Fall', difficulty: 'Easy', type: 'Vegetable' },
  ],
  winter: [
    { id: 16, name: 'Garlic', bestTime: 'Late Fall/Winter', difficulty: 'Easy', type: 'Vegetable' },
    { id: 17, name: 'Winter Squash', bestTime: 'Plant in Summer for Winter', difficulty: 'Medium', type: 'Vegetable' },
    { id: 18, name: 'Brussels Sprouts', bestTime: 'Plant in Summer for Winter', difficulty: 'Hard', type: 'Vegetable' },
    { id: 19, name: 'Onions', bestTime: 'Late Winter', difficulty: 'Easy', type: 'Vegetable' },
    { id: 20, name: 'Pansies', bestTime: 'Winter', difficulty: 'Easy', type: 'Flower' },
  ]
};

// Sample season tips
const seasonTips = {
  spring: [
    "Start seeds indoors 6-8 weeks before the last frost",
    "Prepare garden beds with compost and fertilizer",
    "Begin hardening off seedlings two weeks before transplanting",
    "Install rain barrels to collect spring showers"
  ],
  summer: [
    "Water deeply in the early morning to avoid evaporation",
    "Mulch around plants to retain moisture",
    "Harvest vegetables regularly to encourage production",
    "Monitor for pests frequently in the warmer weather"
  ],
  fall: [
    "Plant cover crops in unused beds to improve soil",
    "Begin planting spring-flowering bulbs",
    "Clean up fallen leaves to prevent disease",
    "Protect cold-sensitive perennials"
  ],
  winter: [
    "Plan your spring garden layout",
    "Order seeds early for the best selection",
    "Clean and sharpen garden tools",
    "Start slow-growing seeds indoors"
  ]
};

const SeasonalPlantingGuide = () => {
  const [selectedSeason, setSelectedSeason] = useState('spring');
  
  const getSeasonIcon = (season: string) => {
    switch (season) {
      case 'spring':
        return <Leaf className="h-4 w-4 mr-2 text-green-500" />;
      case 'summer':
        return <Sun className="h-4 w-4 mr-2 text-amber-500" />;
      case 'fall':
        return <CloudRain className="h-4 w-4 mr-2 text-blue-500" />;
      case 'winter':
        return <Snowflake className="h-4 w-4 mr-2 text-blue-300" />;
      default:
        return <CalendarDays className="h-4 w-4 mr-2" />;
    }
  };
  
  const getSeasonClass = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-700';
      case 'summer': return 'bg-amber-100 text-amber-700';
      case 'fall': return 'bg-blue-100 text-blue-700';
      case 'winter': return 'bg-blue-50 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-amber-100 text-amber-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Seasonal Planting Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          value={selectedSeason} 
          onValueChange={setSelectedSeason}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="spring" className="flex items-center">
              <Leaf className="h-4 w-4 mr-2 text-green-500" />
              Spring
            </TabsTrigger>
            <TabsTrigger value="summer" className="flex items-center">
              <Sun className="h-4 w-4 mr-2 text-amber-500" />
              Summer
            </TabsTrigger>
            <TabsTrigger value="fall" className="flex items-center">
              <CloudRain className="h-4 w-4 mr-2 text-blue-500" />
              Fall
            </TabsTrigger>
            <TabsTrigger value="winter" className="flex items-center">
              <Snowflake className="h-4 w-4 mr-2 text-blue-300" />
              Winter
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(seasonalPlants).map((season) => (
            <TabsContent key={season} value={season} className="space-y-4">
              <div>
                <h3 className="text-base font-medium mb-2">Season Tips:</h3>
                <ul className="space-y-1 mb-4">
                  {seasonTips[season as keyof typeof seasonTips].map((tip, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <h3 className="text-base font-medium">Recommended Plants:</h3>
              <div className="space-y-2">
                {seasonalPlants[season as keyof typeof seasonalPlants].map((plant) => (
                  <div
                    key={plant.id}
                    className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">{plant.name}</span>
                        <Badge variant="outline" className={`ml-2 ${getSeasonClass(season)}`}>
                          {plant.bestTime}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <span className="mr-2">{plant.type}</span>
                        <Badge variant="outline" className={getDifficultyClass(plant.difficulty)}>
                          {plant.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-2">
                <Button variant="outline">View Full {season.charAt(0).toUpperCase() + season.slice(1)} Guide</Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SeasonalPlantingGuide;
