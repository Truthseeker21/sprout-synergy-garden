
export type GardenObjectType = 'plant' | 'furniture' | 'structure' | 'decoration';
export type GardenObjectSize = 'small' | 'medium' | 'large';
export type GardenObjectShape = 'circle' | 'square' | 'rectangle';
export type GardenBackground = 'grass' | 'soil' | 'gravel' | 'concrete' | 'wood';

export interface GardenObject {
  id: string;
  name: string;
  type: GardenObjectType;
  shape: GardenObjectShape;
  size: GardenObjectSize;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
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
  background: GardenBackground;
}

export interface GardenLayoutPreset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  width: number;
  height: number;
  background: GardenBackground;
}

export const gardenLayoutPresets: GardenLayoutPreset[] = [
  {
    id: 'small-vegetable-garden',
    name: 'Small Vegetable Garden',
    description: 'A compact vegetable garden design for limited spaces',
    imageUrl: '/placeholder.svg',
    width: 500,
    height: 400,
    background: 'soil'
  },
  {
    id: 'container-garden',
    name: 'Container Garden',
    description: 'Perfect for balconies and patios with potted plants',
    imageUrl: '/placeholder.svg',
    width: 400,
    height: 300,
    background: 'concrete'
  },
  {
    id: 'raised-bed-garden',
    name: 'Raised Bed Garden',
    description: 'Organized garden with multiple raised beds',
    imageUrl: '/placeholder.svg',
    width: 600,
    height: 500,
    background: 'grass'
  },
  {
    id: 'philippines-tropical-garden',
    name: 'Philippine Tropical Garden',
    description: 'Lush tropical garden with indigenous Filipino plants',
    imageUrl: '/placeholder.svg',
    width: 700,
    height: 600,
    background: 'grass'
  }
];
