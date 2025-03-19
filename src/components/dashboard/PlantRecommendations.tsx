
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlantCard from '@/components/PlantCard';
import { Plant } from '@/data/plants';

interface PlantRecommendationsProps {
  plants: Plant[];
}

const PlantRecommendations = ({ plants }: PlantRecommendationsProps) => {
  const navigate = useNavigate();
  
  return (
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
        {plants.map((plant) => (
          <PlantCard 
            key={plant.id} 
            plant={plant} 
            onClick={() => navigate(`/plants/${plant.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantRecommendations;
