
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { gardenObjectTemplates } from '@/data/gardenObjects';
import { GardenObject, GardenObjectType } from '@/types/GardenTypes';
import { Tooltip } from '@/components/ui/tooltip';
import { 
  Flower, 
  Trees, 
  Box, 
  Home, 
  Footprints, 
  CircleDot,
  Save,
  Download,
  Share,
  Trash,
  RotateCw,
  PaintBucket,
  Square,
  Circle,
  FileText
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
  const [selectedType, setSelectedType] = useState<GardenObjectType>('plant');
  const [objectSize, setObjectSize] = useState(50);
  const [objectColor, setObjectColor] = useState('#4CAF50');
  
  const colors = [
    '#4CAF50', // Green
    '#8BC34A', // Light Green
    '#CDDC39', // Lime
    '#FFC107', // Amber
    '#FF9800', // Orange
    '#795548', // Brown
    '#607D8B', // Blue Grey
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#F44336', // Red
  ];

  const handleAddObject = (type: GardenObjectType, shape: 'circle' | 'square' | 'rectangle' = 'square') => {
    const template = gardenObjectTemplates.find(obj => obj.type === type) || gardenObjectTemplates[0];
    
    const newObject: GardenObject = {
      id: uuidv4(),
      name: template.name,
      type: type,
      shape: shape,
      width: shape === 'rectangle' ? objectSize * 1.5 : objectSize,
      height: objectSize,
      color: objectColor,
      x: 100,
      y: 100,
      rotation: 0
    };
    
    onAddObject(newObject);
  };

  const renderObjectButton = (type: GardenObjectType, icon: React.ReactNode, label: string) => {
    return (
      <div className="flex flex-col items-center">
        <Tooltip content={label}>
          <Button 
            variant={selectedType === type ? "default" : "outline"} 
            size="icon" 
            className="mb-1"
            onClick={() => setSelectedType(type)}
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
        
        {isEditing && (
          <>
            <div className="grid grid-cols-6 gap-4">
              {renderObjectButton('plant', <Flower className="h-4 w-4" />, 'Plant')}
              {renderObjectButton('tree', <Trees className="h-4 w-4" />, 'Tree')}
              {renderObjectButton('container', <Box className="h-4 w-4" />, 'Container')}
              {renderObjectButton('structure', <Home className="h-4 w-4" />, 'Structure')}
              {renderObjectButton('path', <Footprints className="h-4 w-4" />, 'Path')}
              {renderObjectButton('decoration', <CircleDot className="h-4 w-4" />, 'Decoration')}
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Object Size</h4>
              <Slider
                defaultValue={[50]}
                min={20}
                max={100}
                step={5}
                onValueChange={(value) => setObjectSize(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Object Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border hover:scale-110 transition-transform ${
                      objectColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setObjectColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Object Shape</h4>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddObject(selectedType, 'square')}
                >
                  <Square className="h-4 w-4 mr-2" /> Square
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddObject(selectedType, 'circle')}
                >
                  <Circle className="h-4 w-4 mr-2" /> Circle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddObject(selectedType, 'rectangle')}
                >
                  <FileText className="h-4 w-4 mr-2" /> Rectangle
                </Button>
              </div>
            </div>
          </>
        )}
        
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
