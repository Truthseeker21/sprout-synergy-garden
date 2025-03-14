
import React from 'react';
import { GardenObject, GardenLayout } from '@/types/GardenTypes';
import GardenCanvas from '@/components/garden-planner/GardenCanvas';
import GardenToolbar from '@/components/garden-planner/GardenToolbar';
import GardenObjectSelector from '@/components/garden-planner/GardenObjectSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface GardenDesktopViewProps {
  layout: GardenLayout;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  onAddObject: (object: GardenObject) => void;
  onObjectsChange: (objects: GardenObject[]) => void;
  onClear: () => void;
  onSave: () => void;
  onExport: () => void;
}

const GardenDesktopView = ({
  layout,
  isEditing,
  setIsEditing,
  onAddObject,
  onObjectsChange,
  onClear,
  onSave,
  onExport
}: GardenDesktopViewProps) => {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} minSize={60}>
        <GardenCanvas 
          width={layout.width}
          height={layout.height}
          objects={layout.objects}
          background={layout.background}
          onObjectsChange={onObjectsChange}
          isEditing={isEditing}
          onExport={onExport}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} minSize={20}>
        <Tabs defaultValue="toolbar">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="toolbar">Garden Tools</TabsTrigger>
            <TabsTrigger value="objects">Objects Library</TabsTrigger>
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default GardenDesktopView;
