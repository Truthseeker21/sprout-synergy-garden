
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/MainLayout';
import { GardenObject, GardenLayout, GardenLayoutPreset } from '@/types/GardenTypes';
import GardenCanvas from '@/components/garden-planner/GardenCanvas';
import GardenToolbar from '@/components/garden-planner/GardenToolbar';
import GardenObjectSelector from '@/components/garden-planner/GardenObjectSelector';
import GardenLayoutPresetSelector from '@/components/garden-planner/GardenLayoutPresetSelector';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { Layout, Save, Menu, FileDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const GardenPlanner = () => {
  const [layout, setLayout] = useState<GardenLayout>({
    id: uuidv4(),
    name: 'My Garden',
    width: 500,
    height: 400,
    objects: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    background: 'grass'
  });
  const [isLayoutSelectOpen, setIsLayoutSelectOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Add an object to the garden
  const handleAddObject = (object: GardenObject) => {
    setLayout(prev => ({
      ...prev,
      objects: [...prev.objects, object],
      updatedAt: new Date().toISOString()
    }));
  };
  
  // Update objects in the garden
  const handleObjectsChange = (objects: GardenObject[]) => {
    setLayout(prev => ({
      ...prev,
      objects,
      updatedAt: new Date().toISOString()
    }));
  };
  
  // Clear all objects from the garden
  const handleClearGarden = () => {
    setLayout(prev => ({
      ...prev,
      objects: [],
      updatedAt: new Date().toISOString()
    }));
    
    toast({
      title: "Garden cleared",
      description: "All objects have been removed from your garden."
    });
  };
  
  // Save the garden layout
  const handleSaveGarden = () => {
    // In a real application, this would save to a database
    // For now, we'll just show a success message
    
    toast({
      title: "Garden saved",
      description: "Your garden layout has been saved successfully."
    });
  };
  
  // Export the garden as an image
  const handleExportGarden = () => {
    // In a real application, this would generate an image file
    // For now, we'll just show a success message
    
    toast({
      title: "Garden exported",
      description: "Your garden layout has been exported as an image."
    });
  };
  
  // Select a garden layout preset
  const handleSelectPreset = (preset: GardenLayoutPreset) => {
    setLayout({
      id: uuidv4(),
      name: preset.name,
      description: preset.description,
      width: preset.width,
      height: preset.height,
      objects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      background: preset.background
    });
    
    setIsLayoutSelectOpen(false);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
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
                <GardenLayoutPresetSelector onSelectPreset={handleSelectPreset} />
              </DialogContent>
            </Dialog>
            
            <Button onClick={handleSaveGarden}>
              <Save className="h-4 w-4 mr-2" /> Save Garden
            </Button>
          </div>
        </div>
        
        {isMobile ? (
          // Mobile layout
          <div className="space-y-4">
            <GardenCanvas 
              width={layout.width}
              height={layout.height}
              objects={layout.objects}
              background={layout.background}
              onObjectsChange={handleObjectsChange}
              isEditing={isEditing}
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
                          onAddObject={handleAddObject}
                          onClear={handleClearGarden}
                          onSave={handleSaveGarden}
                          onExport={handleExportGarden}
                          isEditing={isEditing}
                          setIsEditing={setIsEditing}
                        />
                      </TabsContent>
                      <TabsContent value="objects">
                        <GardenObjectSelector 
                          onSelectObject={handleAddObject}
                          isEditing={isEditing}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </DrawerContent>
              </Drawer>
              
              <Button variant="outline" onClick={handleExportGarden}>
                <FileDown className="h-4 w-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        ) : (
          // Desktop layout with resizable panels
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={75} minSize={60}>
              <GardenCanvas 
                width={layout.width}
                height={layout.height}
                objects={layout.objects}
                background={layout.background}
                onObjectsChange={handleObjectsChange}
                isEditing={isEditing}
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
                    onAddObject={handleAddObject}
                    onClear={handleClearGarden}
                    onSave={handleSaveGarden}
                    onExport={handleExportGarden}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                  />
                </TabsContent>
                <TabsContent value="objects">
                  <GardenObjectSelector 
                    onSelectObject={handleAddObject}
                    isEditing={isEditing}
                  />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </MainLayout>
  );
};

export default GardenPlanner;
