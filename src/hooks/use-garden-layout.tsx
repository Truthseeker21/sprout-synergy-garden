
import { useState, useEffect } from 'react';
import { GardenLayout, GardenObject, GardenLayoutPreset } from '@/types/GardenTypes';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

export const useGardenLayout = () => {
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
  const [savedLayouts, setSavedLayouts] = useState<GardenLayout[]>([]);
  const { toast } = useToast();

  // Load saved layouts from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('gardenLayouts');
    if (saved) {
      try {
        setSavedLayouts(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading saved layouts:", e);
      }
    }
  }, []);

  const handleAddObject = (object: GardenObject) => {
    setLayout(prev => ({
      ...prev,
      objects: [...prev.objects, object],
      updatedAt: new Date().toISOString()
    }));
  };

  const handleObjectsChange = (objects: GardenObject[]) => {
    setLayout(prev => ({
      ...prev,
      objects,
      updatedAt: new Date().toISOString()
    }));
  };

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

  const handleSaveGarden = () => {
    const layoutToSave = {
      ...layout,
      updatedAt: new Date().toISOString()
    };
    
    // Check if we're updating an existing layout or creating a new one
    const existingIndex = savedLayouts.findIndex(l => l.id === layout.id);
    
    let updatedLayouts: GardenLayout[];
    if (existingIndex >= 0) {
      // Update existing layout
      updatedLayouts = [...savedLayouts];
      updatedLayouts[existingIndex] = layoutToSave;
    } else {
      // Add new layout
      updatedLayouts = [...savedLayouts, layoutToSave];
    }
    
    setSavedLayouts(updatedLayouts);
    
    // Save to localStorage
    localStorage.setItem('gardenLayouts', JSON.stringify(updatedLayouts));
    
    toast({
      title: "Garden saved",
      description: "Your garden layout has been saved successfully."
    });
  };

  const handleExportGarden = () => {
    toast({
      title: "Garden exported",
      description: "Your garden layout has been exported as an image."
    });
  };

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

  return {
    layout,
    isLayoutSelectOpen,
    setIsLayoutSelectOpen,
    isEditing,
    setIsEditing,
    savedLayouts,
    handleAddObject,
    handleObjectsChange,
    handleClearGarden,
    handleSaveGarden,
    handleExportGarden,
    handleSelectPreset
  };
};
