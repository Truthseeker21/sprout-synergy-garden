
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { useGardenLayout } from '@/hooks/use-garden-layout';
import { useIsMobile } from '@/hooks/use-mobile';
import GardenHeader from '@/components/garden-planner/GardenHeader';
import GardenMobileView from '@/components/garden-planner/GardenMobileView';
import GardenDesktopView from '@/components/garden-planner/GardenDesktopView';

const GardenPlanner = () => {
  const {
    layout,
    isLayoutSelectOpen,
    setIsLayoutSelectOpen,
    isEditing,
    setIsEditing,
    handleAddObject,
    handleObjectsChange,
    handleClearGarden,
    handleSaveGarden,
    handleExportGarden,
    handleSelectPreset
  } = useGardenLayout();
  
  const isMobile = useIsMobile();
  
  return (
    <MainLayout title="Garden Layout Planner">
      <div className="container mx-auto py-6">
        <GardenHeader 
          isLayoutSelectOpen={isLayoutSelectOpen}
          setIsLayoutSelectOpen={setIsLayoutSelectOpen}
          onSave={handleSaveGarden}
          onSelectPreset={handleSelectPreset}
        />
        
        {isMobile ? (
          <GardenMobileView 
            layout={layout}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onAddObject={handleAddObject}
            onObjectsChange={handleObjectsChange}
            onClear={handleClearGarden}
            onSave={handleSaveGarden}
            onExport={handleExportGarden}
          />
        ) : (
          <GardenDesktopView 
            layout={layout}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onAddObject={handleAddObject}
            onObjectsChange={handleObjectsChange}
            onClear={handleClearGarden}
            onSave={handleSaveGarden}
            onExport={handleExportGarden}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default GardenPlanner;
