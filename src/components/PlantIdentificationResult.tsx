
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plant } from '@/data/plants';
import { CheckCircle, Leaf, ExternalLink } from 'lucide-react';

interface PlantIdentificationResultProps {
  plant: Plant | null;
  confidence: number;
  onSaveToGarden?: () => void;
  onTryAgain: () => void;
}

const PlantIdentificationResult = ({ 
  plant, 
  confidence, 
  onSaveToGarden, 
  onTryAgain 
}: PlantIdentificationResultProps) => {
  if (!plant) {
    return (
      <Card className="w-full border-dashed border-2 border-muted-foreground/50 bg-muted/50">
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground mb-4">Sorry, we couldn't identify this plant.</p>
          <Button onClick={onTryAgain}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Leaf className="h-5 w-5 mr-2 text-green-500" />
          {plant.name}
        </CardTitle>
        <CardDescription>
          {confidence >= 80 ? (
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" /> 
              High confidence match ({confidence}%)
            </span>
          ) : (
            <span className="text-amber-500">
              Possible match ({confidence}%)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm"><span className="font-medium">Category:</span> {plant.category}</p>
          <p className="text-sm"><span className="font-medium">Difficulty:</span> {plant.difficulty}</p>
          <p className="text-sm">{plant.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onTryAgain}>
          Try Different Photo
        </Button>
        <div className="space-x-2">
          <Button onClick={onSaveToGarden}>
            Add to My Garden
          </Button>
          <Button variant="outline" onClick={() => window.open(`/plants/${plant.id}`, '_blank')}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Plant Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlantIdentificationResult;
