
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import GardenLayoutPresetSelector from '@/components/garden-planner/GardenLayoutPresetSelector';
import { GardenLayoutPreset } from '@/types/GardenTypes';
import { Layout, Save } from 'lucide-react';

interface GardenHeaderProps {
  isLayoutSelectOpen: boolean;
  setIsLayoutSelectOpen: (value: boolean) => void;
  onSave: () => void;
  onSelectPreset: (preset: GardenLayoutPreset) => void;
}

const GardenHeader = ({
  isLayoutSelectOpen,
  setIsLayoutSelectOpen,
  onSave,
  onSelectPreset
}: GardenHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Garden Layout Planner</h1>
      
      <div className="flex space-x-2">
        <Dialog open={isLayoutSelectOpen} onOpenChange={setIsLayoutSelectOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Layout className="h-4 w-4 mr-2" /> Templates
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>Select a Garden Template</DialogTitle>
            </DialogHeader>
            <GardenLayoutPresetSelector onSelectPreset={onSelectPreset} />
          </DialogContent>
        </Dialog>
        
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" /> Save Garden
        </Button>
      </div>
    </div>
  );
};

export default GardenHeader;
