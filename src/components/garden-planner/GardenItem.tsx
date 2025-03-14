
import React, { useState, useRef } from 'react';
import { GardenObject } from '@/types/GardenTypes';

interface GardenItemProps {
  object: GardenObject;
  isEditing: boolean;
  isDragging: boolean;
  zoomLevel: number;
  onDragStart: () => void;
  onDragMove: (x: number, y: number) => void;
  onDragEnd: () => void;
}

const GardenItem = ({
  object,
  isEditing,
  isDragging,
  zoomLevel,
  onDragStart,
  onDragMove,
  onDragEnd
}: GardenItemProps) => {
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  const getItemStyle = () => {
    let style: React.CSSProperties = {
      position: 'absolute',
      left: object.x * zoomLevel,
      top: object.y * zoomLevel,
      width: object.width * zoomLevel,
      height: object.height * zoomLevel,
      backgroundColor: object.color,
      transform: `rotate(${object.rotation}deg)`,
      cursor: isEditing ? 'move' : 'default',
      transition: isDragging ? 'none' : 'transform 0.2s',
      zIndex: isDragging ? 10 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: `${12 * zoomLevel}px`,
      color: 'white',
      userSelect: 'none'
    };
    
    if (object.shape === 'circle') {
      style.borderRadius = '50%';
    } else if (object.shape === 'square') {
      style.borderRadius = '4px';
    } else if (object.shape === 'rectangle') {
      style.borderRadius = '4px';
    }
    
    return style;
  };
  
  const getSizeStyle = () => {
    switch (object.size) {
      case 'small':
        return 'text-xs';
      case 'medium':
        return 'text-sm';
      case 'large':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditing) return;
    e.preventDefault();
    onDragStart();
    
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setStartPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isEditing) return;
    const parentRect = elementRef.current?.parentElement?.getBoundingClientRect();
    if (parentRect) {
      const newX = (e.clientX - parentRect.left - startPos.x) / zoomLevel;
      const newY = (e.clientY - parentRect.top - startPos.y) / zoomLevel;
      
      // Constrain to parent boundaries
      const x = Math.max(0, Math.min(newX, (parentRect.width / zoomLevel) - object.width));
      const y = Math.max(0, Math.min(newY, (parentRect.height / zoomLevel) - object.height));
      
      onDragMove(x, y);
    }
  };
  
  const handleMouseUp = () => {
    if (!isEditing) return;
    onDragEnd();
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  
  return (
    <div
      ref={elementRef}
      style={getItemStyle()}
      onMouseDown={handleMouseDown}
      className={`shadow-md ${getSizeStyle()}`}
    >
      {object.name}
    </div>
  );
};

export default GardenItem;
