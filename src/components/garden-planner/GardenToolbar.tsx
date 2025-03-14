
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { GardenObject } from '@/types/GardenTypes';
import { Trash2, Save, FileDown, Plus, Edit, Eye } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GardenToolbarProps {
  onAddObject: (object: GardenObject) => void;
  onClear: () => void;
  onSave: () => void;
  onExport: () => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

const GardenToolbar = ({
  onAddObject,
  onClear,
  onSave,
  onExport,
  isEditing,
  setIsEditing
}: GardenToolbarProps) => {
  const [objectSize, setObjectSize] = useState<'small' | 'medium' | 'large'>('medium');
  
  const handleQuickAddPlant = () => {
    const width = objectSize === 'small' ? 30 : objectSize === 'medium' ? 50 : 80;
    const height = width;
    
    const newObject: GardenObject = {
      id: uuidv4(),
      name: 'Plant',
      type: 'plant',
      shape: 'circle',
      size: objectSize,
      width,
      height,
      color: '#5eba7d',
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      rotation: 0
    };
    
    onAddObject(newObject);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Garden Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Switch
              id="edit-mode"
              checked={isEditing}
              onCheckedChange={setIsEditing}
            />
            <Label htmlFor="edit-mode">
              {isEditing ? (
                <span className="flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Mode
                </span>
              ) : (
                <span className="flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  View Mode
                </span>
              )}
            </Label>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button
              variant={objectSize === 'small' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setObjectSize('small')}
            >
              Small
            </Button>
            <Button
              variant={objectSize === 'medium' ? 'default' : 'outline'}
              className="flex-1 mx-2"
              onClick={() => setObjectSize('medium')}
            >
              Medium
            </Button>
            <Button
              variant={objectSize === 'large' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setObjectSize('large')}
            >
              Large
            </Button>
          </div>
          <Button
            className="w-full"
            onClick={handleQuickAddPlant}
            disabled={!isEditing}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Plant
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Garden Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onClear}
            disabled={!isEditing}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Garden
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Garden
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onExport}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Export as Image
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GardenToolbar;
