
import React from 'react';
import { GardenObject, GardenLayout } from '@/types/GardenTypes';
import GardenCanvas from '@/components/garden-planner/GardenCanvas';
import GardenToolbar from '@/components/garden-planner/GardenToolbar';
import GardenObjectSelector from '@/components/garden-planner/GardenObjectSelector';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Menu, FileDown } from 'lucide-react';

interface GardenMobileViewProps {
  layout: GardenLayout;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onAddObject: (object: GardenObject) => void;
  onObjectsChange: (objects: GardenObject[]) => void;
  onClear: () => void;
  onSave: () => void;
  onExport: () => void;
}

const GardenMobileView = ({
  layout,
  isEditing,
  setIsEditing,
  onAddObject,
  onObjectsChange,
  onClear,
  onSave,
  onExport
}: GardenMobileViewProps) => {
  return (
    <div className="space-y-4">
      <GardenCanvas 
        width={layout.width}
        height={layout.height}
        objects={layout.objects}
        background={layout.background}
        onObjectsChange={onObjectsChange}
        isEditing={isEditing}
        onExport={onExport}
      />
      
      <div className="flex justify-between">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <Menu className="h-4 w-4 mr-2" /> Objects
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="px-4 py-2">
              <Tabs defaultValue="toolbar">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="toolbar">Garden Tools</TabsTrigger>
                  <TabsTrigger value="objects">Objects</TabsTrigger>
                </TabsList>
                <TabsContent value="toolbar">
                  <GardenToolbar 
                    onAddObject={onAddObject}
                    onClear={onClear}
                    onSave={onSave}
                    onExport={onExport}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                </TabsContent>
                <TabsContent value="objects">
                  <GardenObjectSelector 
                    onSelectObject={onAddObject}
                    isEditing={isEditing}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </DrawerContent>
        </Drawer>
        
        <Button variant="outline" onClick={onExport}>
          <FileDown className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>
    </div>
  );
};

export default GardenMobileView;
