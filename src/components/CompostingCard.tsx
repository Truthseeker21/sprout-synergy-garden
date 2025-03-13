
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CompostingMethod } from '@/data/composting';
import { Sprout, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompostingCardProps {
  method: CompostingMethod;
  onClick?: () => void;
}

const CompostingCard = ({ method, onClick }: CompostingCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative h-36 overflow-hidden rounded-t-lg">
        <img
          src={method.image || '/placeholder.svg'}
          alt={method.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs">
          {method.difficulty}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{method.title}</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          <div className="capitalize">{method.type.replace('-', ' ')}</div>
          <div className="flex items-center">
            <Home className="h-3 w-3 mr-1" />
            {method.indoorSuitable ? 'Indoor Suitable' : 'Outdoor Only'}
          </div>
        </div>
        <p className="text-sm line-clamp-3 mb-3">{method.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Sprout className="h-3 w-3 mr-1" />
            <span className="capitalize">{method.spaceRequired} space</span>
          </div>
          <Button variant="outline" size="sm" onClick={onClick}>
            View Method
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompostingCard;
