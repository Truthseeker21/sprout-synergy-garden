
import React, { useState, useRef, useEffect } from 'react';
import { GardenObject } from '@/types/GardenTypes';
import GardenItem from './GardenItem';

interface GardenCanvasProps {
  width: number;
  height: number;
  objects: GardenObject[];
  background: 'grass' | 'soil' | 'concrete' | 'grid';
  onObjectsChange: (objects: GardenObject[]) => void;
  isEditing: boolean;
}

const GardenCanvas = ({ 
  width, 
  height, 
  objects, 
  background, 
  onObjectsChange, 
  isEditing 
}: GardenCanvasProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  // Handle object selection
  const handleSelect = (id: string) => {
    if (!isEditing) return;
    setSelectedId(id === selectedId ? null : id);
  };

  // Handle object position change
  const handleDragEnd = (id: string, newX: number, newY: number) => {
    if (!isEditing) return;
    const updatedObjects = objects.map(obj => 
      obj.id === id ? { ...obj, x: newX, y: newY } : obj
    );
    onObjectsChange(updatedObjects);
  };

  // Handle object deletion with Delete key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedId && isEditing) {
        const updatedObjects = objects.filter(obj => obj.id !== selectedId);
        onObjectsChange(updatedObjects);
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, objects, onObjectsChange, isEditing]);

  // Get background style based on type
  const getBackgroundStyle = () => {
    switch (background) {
      case 'grass':
        return 'bg-green-100';
      case 'soil':
        return 'bg-amber-100';
      case 'concrete':
        return 'bg-gray-200';
      case 'grid':
        return 'bg-white bg-grid-pattern';
      default:
        return 'bg-white';
    }
  };

  // Canvas pan handling
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    
    // Check if we clicked on the canvas and not an object
    if ((e.target as HTMLElement).classList.contains('garden-canvas')) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - startPosition.x,
      y: e.clientY - startPosition.y
    });
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handling with wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(2, scale + delta));
    setScale(newScale);
  };

  return (
    <div 
      className="relative overflow-hidden border rounded-lg bg-gray-50 h-[600px]"
      onWheel={handleWheel}
    >
      <div 
        ref={canvasRef}
        className={`garden-canvas absolute ${getBackgroundStyle()} cursor-move transition-transform`}
        style={{ 
          width: width, 
          height: height,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0'
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        {objects.map(object => (
          <GardenItem
            key={object.id}
            object={object}
            isSelected={object.id === selectedId}
            onSelect={() => handleSelect(object.id)}
            onDragEnd={(x, y) => handleDragEnd(object.id, x, y)}
            isEditing={isEditing}
          />
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-2 flex space-x-2">
        <button 
          onClick={() => setScale(Math.min(2, scale + 0.1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          +
        </button>
        <div className="px-2 flex items-center">{Math.round(scale * 100)}%</div>
        <button 
          onClick={() => setScale(Math.max(0.5, scale - 0.1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default GardenCanvas;
