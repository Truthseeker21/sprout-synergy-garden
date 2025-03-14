
import { GardenObject, GardenLayoutPreset } from '@/types/GardenTypes';

export const gardenObjectTemplates: Omit<GardenObject, 'id' | 'x' | 'y'>[] = [
  // Plants
  {
    type: 'plant',
    name: 'Tomato Plant',
    width: 60,
    height: 60,
    rotation: 0,
    color: '#4CAF50',
    size: 'medium',
    shape: 'circle',
    plantId: '1'
  },
  {
    type: 'plant',
    name: 'Basil',
    width: 40,
    height: 40,
    rotation: 0,
    color: '#81C784',
    size: 'small',
    shape: 'circle',
    plantId: '2'
  },
  {
    type: 'plant',
    name: 'Lettuce',
    width: 50,
    height: 50,
    rotation: 0,
    color: '#AED581',
    size: 'small',
    shape: 'circle',
    plantId: '3'
  },
  // Trees
  {
    type: 'tree',
    name: 'Coconut Palm',
    width: 100,
    height: 100,
    rotation: 0,
    color: '#33691E',
    size: 'large',
    shape: 'circle'
  },
  {
    type: 'tree',
    name: 'Banana Tree',
    width: 90,
    height: 90,
    rotation: 0,
    color: '#558B2F',
    size: 'large',
    shape: 'circle'
  },
  // Containers
  {
    type: 'container',
    name: 'Raised Bed',
    width: 200,
    height: 100,
    rotation: 0,
    color: '#795548',
    size: 'large',
    shape: 'rectangle'
  },
  {
    type: 'container',
    name: 'Plant Pot',
    width: 50,
    height: 50,
    rotation: 0,
    color: '#A1887F',
    size: 'medium',
    shape: 'circle'
  },
  {
    type: 'container',
    name: 'Window Box',
    width: 120,
    height: 40,
    rotation: 0,
    color: '#8D6E63',
    size: 'medium',
    shape: 'rectangle'
  },
  // Structures
  {
    type: 'structure',
    name: 'Garden Shed',
    width: 150,
    height: 150,
    rotation: 0,
    color: '#5D4037',
    size: 'large',
    shape: 'rectangle'
  },
  {
    type: 'structure',
    name: 'Bamboo Trellis',
    width: 80,
    height: 30,
    rotation: 0,
    color: '#8BC34A',
    size: 'medium',
    shape: 'rectangle'
  },
  // Paths
  {
    type: 'path',
    name: 'Stone Path',
    width: 40,
    height: 40,
    rotation: 0,
    color: '#9E9E9E',
    size: 'medium',
    shape: 'square'
  },
  // Decorations
  {
    type: 'decoration',
    name: 'Stone Bench',
    width: 100,
    height: 40,
    rotation: 0,
    color: '#757575',
    size: 'medium',
    shape: 'rectangle'
  },
  {
    type: 'decoration',
    name: 'Compost Bin',
    width: 60,
    height: 60,
    rotation: 0,
    color: '#6D4C41',
    size: 'medium',
    shape: 'square'
  }
];

export const gardenLayoutPresets: GardenLayoutPreset[] = [
  {
    id: 'balcony-1',
    name: 'Small Balcony Garden',
    description: 'Perfect for small balconies in urban settings',
    imageUrl: '/placeholder.svg',
    width: 300,
    height: 150,
    background: 'concrete'
  },
  {
    id: 'backyard-1',
    name: 'Backyard Vegetable Garden',
    description: 'A productive vegetable garden for your backyard',
    imageUrl: '/placeholder.svg',
    width: 500,
    height: 400,
    background: 'soil'
  },
  {
    id: 'community-1',
    name: 'Community Garden Plot',
    description: 'Standard community garden plot layout',
    imageUrl: '/placeholder.svg',
    width: 400,
    height: 200,
    background: 'soil'
  },
  {
    id: 'indoor-1',
    name: 'Indoor Container Garden',
    description: 'Container arrangement for indoor spaces',
    imageUrl: '/placeholder.svg',
    width: 250,
    height: 150,
    background: 'concrete'
  },
  {
    id: 'rooftop-1',
    name: 'Rooftop Garden',
    description: 'Optimized layout for rooftop conditions',
    imageUrl: '/placeholder.svg',
    width: 500,
    height: 300,
    background: 'concrete'
  }
];
