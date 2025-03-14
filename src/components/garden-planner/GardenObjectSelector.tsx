
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { GardenObject, GardenObjectType, GardenObjectShape, GardenObjectSize } from '@/types/GardenTypes';
import { Flower, Home, Chair, TreeDeciduous } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GardenObjectSelectorProps {
  onSelectObject: (object: GardenObject) => void;
  isEditing: boolean;
}

const GardenObjectSelector = ({
  onSelectObject,
  isEditing
}: GardenObjectSelectorProps) => {
  const [selectedType, setSelectedType] = useState<GardenObjectType>('plant');
  const [selectedShape, setSelectedShape] = useState<GardenObjectShape>('circle');
  const [selectedSize, setSelectedSize] = useState<GardenObjectSize>('medium');
  const [selectedColor, setSelectedColor] = useState('#5eba7d');
  const [rotation, setRotation] = useState(0);
  
  const getSizeValues = (size: GardenObjectSize): { width: number, height: number } => {
    switch (size) {
      case 'small':
        return { width: 30, height: 30 };
      case 'medium':
        return { width: 50, height: 50 };
      case 'large':
        return { width: 80, height: 80 };
      default:
        return { width: 50, height: 50 };
    }
  };
  
  const handleAddObject = () => {
    if (!isEditing) return;
    
    const { width, height } = getSizeValues(selectedSize);
    
    const newObject: GardenObject = {
      id: uuidv4(),
      name: getObjectName(),
      type: selectedType,
      shape: selectedShape,
      size: selectedSize,
      width,
      height: selectedType === 'structure' && selectedShape === 'rectangle' ? height * 1.5 : height,
      color: selectedColor,
      x: 100,
      y: 100,
      rotation
    };
    
    onSelectObject(newObject);
  };
  
  const getObjectName = (): string => {
    switch (selectedType) {
      case 'plant':
        return 'Plant';
      case 'furniture':
        return 'Furniture';
      case 'structure':
        return 'Structure';
      case 'decoration':
        return 'Decoration';
      default:
        return 'Object';
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="type">
        <TabsList className="w-full">
          <TabsTrigger value="type">Type</TabsTrigger>
          <TabsTrigger value="shape">Shape</TabsTrigger>
          <TabsTrigger value="size">Size</TabsTrigger>
          <TabsTrigger value="color">Color</TabsTrigger>
        </TabsList>
        
        <TabsContent value="type" className="space-y-4">
          <RadioGroup
            value={selectedType}
            onValueChange={(value) => setSelectedType(value as GardenObjectType)}
            className="grid grid-cols-2 gap-2"
          >
            <Label
              htmlFor="plant"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="plant" id="plant" className="sr-only" />
              <Flower className="mb-2 h-6 w-6" />
              <span className="text-sm">Plant</span>
            </Label>
            
            <Label
              htmlFor="structure"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="structure" id="structure" className="sr-only" />
              <Home className="mb-2 h-6 w-6" />
              <span className="text-sm">Structure</span>
            </Label>
            
            <Label
              htmlFor="furniture"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="furniture" id="furniture" className="sr-only" />
              <Chair className="mb-2 h-6 w-6" />
              <span className="text-sm">Furniture</span>
            </Label>
            
            <Label
              htmlFor="decoration"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="decoration" id="decoration" className="sr-only" />
              <TreeDeciduous className="mb-2 h-6 w-6" />
              <span className="text-sm">Decoration</span>
            </Label>
          </RadioGroup>
        </TabsContent>
        
        <TabsContent value="shape" className="space-y-4">
          <RadioGroup
            value={selectedShape}
            onValueChange={(value) => setSelectedShape(value as GardenObjectShape)}
            className="grid grid-cols-3 gap-2"
          >
            <Label
              htmlFor="circle"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="circle" id="circle" className="sr-only" />
              <div className="h-8 w-8 rounded-full bg-primary mb-2"></div>
              <span className="text-sm">Circle</span>
            </Label>
            
            <Label
              htmlFor="square"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="square" id="square" className="sr-only" />
              <div className="h-8 w-8 rounded-md bg-primary mb-2"></div>
              <span className="text-sm">Square</span>
            </Label>
            
            <Label
              htmlFor="rectangle"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="rectangle" id="rectangle" className="sr-only" />
              <div className="h-6 w-8 rounded-md bg-primary mb-2"></div>
              <span className="text-sm">Rectangle</span>
            </Label>
          </RadioGroup>
          
          <div className="space-y-2">
            <Label>Rotation</Label>
            <div className="flex items-center space-x-4">
              <Slider
                value={[rotation]}
                min={0}
                max={360}
                step={15}
                onValueChange={(value) => setRotation(value[0])}
              />
              <span className="text-sm w-10">{rotation}°</span>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="size" className="space-y-4">
          <RadioGroup
            value={selectedSize}
            onValueChange={(value) => setSelectedSize(value as GardenObjectSize)}
            className="grid grid-cols-3 gap-2"
          >
            <Label
              htmlFor="small"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="small" id="small" className="sr-only" />
              <div className="h-4 w-4 rounded-full bg-primary mb-2"></div>
              <span className="text-sm">Small</span>
            </Label>
            
            <Label
              htmlFor="medium"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="medium" id="medium" className="sr-only" />
              <div className="h-6 w-6 rounded-full bg-primary mb-2"></div>
              <span className="text-sm">Medium</span>
            </Label>
            
            <Label
              htmlFor="large"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <RadioGroupItem value="large" id="large" className="sr-only" />
              <div className="h-8 w-8 rounded-full bg-primary mb-2"></div>
              <span className="text-sm">Large</span>
            </Label>
          </RadioGroup>
        </TabsContent>
        
        <TabsContent value="color" className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {['#5eba7d', '#3b82f6', '#f97316', '#8b5cf6', '#ec4899', '#ef4444', '#10b981', '#f59e0b'].map((color) => (
              <button
                key={color}
                className={`h-10 w-10 rounded-full border-2 ${selectedColor === color ? 'border-black dark:border-white' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
          
          <div className="pt-2">
            <Label htmlFor="custom-color">Custom Color</Label>
            <input
              id="custom-color"
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full h-10 mt-1"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardContent className="pt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div
                className={`h-8 w-8 ${selectedShape === 'circle' ? 'rounded-full' : 'rounded-md'}`}
                style={{ backgroundColor: selectedColor, transform: `rotate(${rotation}deg)` }}
              ></div>
              <span className="font-medium">{getObjectName()}</span>
            </div>
            <Button
              onClick={handleAddObject}
              disabled={!isEditing}
            >
              Add to Garden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GardenObjectSelector;
