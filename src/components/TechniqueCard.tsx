
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GardeningTechnique } from '@/data/gardeningTechniques';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TechniqueCardProps {
  technique: GardeningTechnique;
  onClick?: () => void;
}

const TechniqueCard = ({ technique, onClick }: TechniqueCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative h-36 overflow-hidden rounded-t-lg">
        <img
          src={technique.image || '/placeholder.svg'}
          alt={technique.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs">
          {technique.difficulty}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{technique.title}</h3>
        <div className="text-xs text-muted-foreground mb-2 capitalize">{technique.category.replace('-', ' ')}</div>
        <p className="text-sm line-clamp-3 mb-3">{technique.description}</p>
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClick} className="flex items-center">
            Learn More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechniqueCard;
