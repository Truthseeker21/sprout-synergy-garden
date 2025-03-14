
import React, { useState } from 'react';
import { GardenObject } from '@/types/GardenTypes';
import { Flower, Trees, Box, Home, Footprints, CircleDot, RotateCw } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';

interface GardenItemProps {
  object: GardenObject;
  isSelected: boolean;
  onSelect: () => void;
  onDragEnd: (x: number, y: number) => void;
  onRotate: (degrees: number) => void;
  isEditing: boolean;
}

const GardenItem = ({ 
  object, 
  isSelected, 
  onSelect, 
  onDragEnd,
  onRotate,
  isEditing
}: GardenItemProps) => {
  const [position, setPosition] = useState({ x: object.x, y: object.y });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) return;
    
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isEditing) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (isDragging && isEditing) {
      setIsDragging(false);
      onDragEnd(position.x, position.y);
    }
  };

  const handleRotate = (e: React.MouseEvent) => {
    if (!isEditing) return;
    e.stopPropagation();
    onRotate((object.rotation || 0) + 45);
  };

  const getTypeIcon = () => {
    switch (object.type) {
      case "plant":
        return <Flower className="h-4 w-4" />;
      case "tree":
        return <Trees className="h-4 w-4" />;
      case "container":
        return <Box className="h-4 w-4" />;
      case "structure":
        return <Home className="h-4 w-4" />;
      case "path":
        return <Footprints className="h-4 w-4" />;
      case "decoration":
        return <CircleDot className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getBorderShape = () => {
    switch (object.shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-md';
      case 'rectangle':
        return 'rounded-md';
      default:
        return 'rounded-md';
    }
  };

  return (
    <div
      className={`absolute cursor-move flex items-center justify-center overflow-hidden ${getBorderShape()} transition-colors ${
        isSelected ? 'ring-2 ring-blue-500 z-10' : ''
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: object.width,
        height: object.height,
        backgroundColor: object.color || '#ccc',
        transform: `rotate(${object.rotation || 0}deg)`,
        opacity: isDragging ? 0.7 : 1,
        cursor: isEditing ? 'move' : 'pointer'
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {getTypeIcon()}
        <span className="text-xs font-medium truncate px-1 text-center">
          {object.name}
        </span>
      </div>
      
      {isSelected && isEditing && (
        <Tooltip content="Rotate">
          <button
            className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            onClick={handleRotate}
          >
            <RotateCw className="h-3 w-3 text-gray-600" />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default GardenItem;
