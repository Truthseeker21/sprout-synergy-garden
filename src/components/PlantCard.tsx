
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plant } from '@/data/plants';
import { Droplet, Sun } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onClick?: () => void;
}

const PlantCard = ({ plant, onClick }: PlantCardProps) => {
  const getSunlightIcon = () => {
    switch (plant.sunlight) {
      case 'full':
        return <div className="flex items-center text-amber-500"><Sun className="h-4 w-4 mr-1" /> Full Sun</div>;
      case 'partial':
        return <div className="flex items-center text-amber-400"><Sun className="h-4 w-4 mr-1" /> Partial Sun</div>;
      case 'shade':
        return <div className="flex items-center text-amber-300"><Sun className="h-4 w-4 mr-1" /> Shade</div>;
      default:
        return null;
    }
  };

  const getWaterIcon = () => {
    switch (plant.water) {
      case 'high':
        return <div className="flex items-center text-blue-500"><Droplet className="h-4 w-4 mr-1" /> High</div>;
      case 'medium':
        return <div className="flex items-center text-blue-400"><Droplet className="h-4 w-4 mr-1" /> Medium</div>;
      case 'low':
        return <div className="flex items-center text-blue-300"><Droplet className="h-4 w-4 mr-1" /> Low</div>;
      default:
        return null;
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-36 overflow-hidden rounded-t-lg">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs">
          {plant.difficulty}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-1 font-semibold text-lg">{plant.name}</div>
        <div className="text-xs text-muted-foreground mb-2 capitalize">{plant.category}</div>
        <p className="text-sm line-clamp-2 mb-2">{plant.description}</p>
        <div className="flex justify-between text-xs">
          {getSunlightIcon()}
          {getWaterIcon()}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
