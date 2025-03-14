
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { gardenLayoutPresets } from '@/data/gardenObjects';
import { GardenLayoutPreset } from '@/types/GardenTypes';

interface GardenLayoutPresetSelectorProps {
  onSelectPreset: (preset: GardenLayoutPreset) => void;
}

const GardenLayoutPresetSelector = ({ onSelectPreset }: GardenLayoutPresetSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {gardenLayoutPresets.map((preset) => (
        <Card key={preset.id} className="overflow-hidden">
          <div className="h-36 overflow-hidden">
            <img
              src={preset.image}
              alt={preset.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="py-3">
            <CardTitle className="text-lg">{preset.name}</CardTitle>
            <CardDescription>{preset.description}</CardDescription>
          </CardHeader>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectPreset(preset)}
            >
              Select Template
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      <Card className="overflow-hidden">
        <div className="h-36 bg-muted flex items-center justify-center border-b">
          <div className="text-4xl text-muted-foreground">+</div>
        </div>
        <CardHeader className="py-3">
          <CardTitle className="text-lg">Custom Garden</CardTitle>
          <CardDescription>Create your own garden layout from scratch</CardDescription>
        </CardHeader>
        <CardFooter className="pt-0">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onSelectPreset({
              id: 'custom',
              name: 'Custom Garden',
              description: 'Your custom garden layout',
              image: '/placeholder.svg',
              type: 'custom',
              width: 500,
              height: 400,
              background: 'grass'
            })}
          >
            Start from Scratch
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GardenLayoutPresetSelector;
