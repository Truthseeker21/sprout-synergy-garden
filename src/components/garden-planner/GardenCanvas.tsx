import React, { useRef, useEffect, useState } from 'react';
import { GardenObject, GardenBackground } from '@/types/GardenTypes';
import GardenItem from './GardenItem';
import html2canvas from 'html2canvas';

interface GardenCanvasProps {
  width: number;
  height: number;
  objects: GardenObject[];
  background: GardenBackground;
  onObjectsChange: (objects: GardenObject[]) => void;
  isEditing: boolean;
  onExport: () => void;
}

const GardenCanvas = ({
  width,
  height,
  objects,
  background,
  onObjectsChange,
  isEditing,
  onExport
}: GardenCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Export garden as image
  useEffect(() => {
    // This is a placeholder that would be replaced with actual implementation
    const handleExport = async () => {
      if (canvasRef.current) {
        try {
          const canvas = await html2canvas(canvasRef.current);
          const image = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = image;
          link.download = 'my-garden.png';
          link.click();
          onExport();
        } catch (error) {
          console.error('Error exporting garden:', error);
        }
      }
    };
    
    // This would be connected to a button or other trigger
    // For now, it's just a placeholder
    window.handleGardenExport = handleExport;
  }, [onExport]);
  
  const getBackgroundStyle = () => {
    switch (background) {
      case 'grass':
        return 'bg-green-200';
      case 'soil':
        return 'bg-amber-800';
      case 'gravel':
        return 'bg-gray-300';
      case 'concrete':
        return 'bg-gray-400';
      case 'wood':
        return 'bg-amber-600';
      default:
        return 'bg-green-200';
    }
  };
  
  const handleDragStart = (id: string) => {
    if (!isEditing) return;
    setDraggingId(id);
  };
  
  const handleDragMove = (id: string, x: number, y: number) => {
    if (!isEditing) return;
    const updatedObjects = objects.map(obj => 
      obj.id === id ? { ...obj, x, y } : obj
    );
    onObjectsChange(updatedObjects);
  };
  
  const handleDragEnd = () => {
    if (!isEditing) return;
    setDraggingId(null);
  };
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };
  
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <button
          className="bg-white p-2 rounded-full shadow"
          onClick={handleZoomIn}
        >
          +
        </button>
        <button
          className="bg-white p-2 rounded-full shadow"
          onClick={handleZoomOut}
        >
          -
        </button>
      </div>
      
      <div 
        ref={canvasRef}
        className={`relative overflow-hidden border border-gray-300 rounded-lg ${getBackgroundStyle()}`}
        style={{
          width: width * zoomLevel,
          height: height * zoomLevel,
          transition: 'width 0.3s, height 0.3s'
        }}
      >
        {objects.map((object) => (
          <GardenItem
            key={object.id}
            object={object}
            isEditing={isEditing}
            isDragging={object.id === draggingId}
            zoomLevel={zoomLevel}
            onDragStart={() => handleDragStart(object.id)}
            onDragMove={(x, y) => handleDragMove(object.id, x, y)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default GardenCanvas;
