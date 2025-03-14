
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { gardenLayoutPresets, GardenLayoutPreset } from '@/types/GardenTypes';

interface GardenLayoutPresetSelectorProps {
  onSelectPreset: (preset: GardenLayoutPreset) => void;
}

const GardenLayoutPresetSelector = ({ onSelectPreset }: GardenLayoutPresetSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
      {gardenLayoutPresets.map((preset) => (
        <Card key={preset.id} className="cursor-pointer overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg">{preset.name}</CardTitle>
            <CardDescription>{preset.description}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-48 bg-muted flex items-center justify-center">
              <img 
                src={preset.imageUrl} 
                alt={preset.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </CardContent>
          <CardFooter className="p-4">
            <Button 
              className="w-full" 
              onClick={() => onSelectPreset(preset)}
            >
              Select This Layout
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GardenLayoutPresetSelector;
