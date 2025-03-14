
export type GardenObjectType = 
  | 'plant' 
  | 'tree' 
  | 'container' 
  | 'structure' 
  | 'decoration'
  | 'path';

export type GardenObjectSize = 'small' | 'medium' | 'large';

export type GardenObjectShape = 'circle' | 'square' | 'rectangle';

export interface GardenObject {
  id: string;
  type: GardenObjectType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  image?: string;
  size: GardenObjectSize;
  shape: GardenObjectShape;
  plantId?: string;
}

export interface GardenLayout {
  id: string;
  name: string;
  description?: string;
  width: number;
  height: number;
  objects: GardenObject[];
  createdAt: string;
  updatedAt: string;
  background: 'grass' | 'soil' | 'concrete' | 'grid';
}

export interface GardenLayoutPreset {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'balcony' | 'backyard' | 'community' | 'indoor' | 'rooftop' | 'custom';
  width: number;
  height: number;
  background: 'grass' | 'soil' | 'concrete' | 'grid';
}
