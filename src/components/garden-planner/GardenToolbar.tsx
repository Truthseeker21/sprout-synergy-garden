
import React from 'react';
import { Button } from '@/components/ui/button';
import { gardenObjectTemplates } from '@/data/gardenObjects';
import { GardenObject, GardenObjectType, GardenObjectShape } from '@/types/GardenTypes';
import { Tooltip } from '@/components/ui/tooltip';
import { 
  Flower, 
  Tree, 
  Box, 
  Home, 
  Footprints, 
  CircleDot,
  Save,
  Download,
  Share,
  Trash,
  RotateCw
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GardenToolbarProps {
  onAddObject: (object: GardenObject) => void;
  onClear: () => void;
  onSave: () => void;
  onExport: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
}

const GardenToolbar = ({ 
  onAddObject, 
  onClear, 
  onSave, 
  onExport,
  isEditing,
  setIsEditing
}: GardenToolbarProps) => {
  const handleAddObject = (template: Omit<GardenObject, 'id' | 'x' | 'y'>) => {
    const newObject: GardenObject = {
      ...template,
      id: uuidv4(),
      x: 100,
      y: 100
    };
    onAddObject(newObject);
  };

  const renderObjectButton = (type: GardenObjectType, icon: React.ReactNode, label: string) => {
    const templates = gardenObjectTemplates.filter(obj => obj.type === type);
    
    return (
      <div className="flex flex-col items-center">
        <Tooltip content={label}>
          <Button 
            variant="outline" 
            size="icon" 
            className="mb-1"
            onClick={() => handleAddObject(templates[0])}
            disabled={!isEditing}
          >
            {icon}
          </Button>
        </Tooltip>
        <span className="text-xs">{label}</span>
      </div>
    );
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Garden Objects</h3>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Exit Edit Mode' : 'Edit Garden'}
          </Button>
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          {renderObjectButton('plant', <Flower className="h-4 w-4" />, 'Plant')}
          {renderObjectButton('tree', <Tree className="h-4 w-4" />, 'Tree')}
          {renderObjectButton('container', <Box className="h-4 w-4" />, 'Container')}
          {renderObjectButton('structure', <Home className="h-4 w-4" />, 'Structure')}
          {renderObjectButton('path', <Footprints className="h-4 w-4" />, 'Path')}
          {renderObjectButton('decoration', <CircleDot className="h-4 w-4" />, 'Decoration')}
        </div>
        
        <div className="flex justify-between pt-2 border-t">
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={onClear}
            disabled={!isEditing}
          >
            <Trash className="h-4 w-4 mr-1" /> Clear
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenToolbar;
