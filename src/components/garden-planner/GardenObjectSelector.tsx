import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { gardenObjectTemplates } from '@/data/gardenObjects';
import { GardenObject, GardenObjectType } from '@/types/GardenTypes';
import { Flower, Trees, Box, Home, Footprints, CircleDot, Search } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface GardenObjectSelectorProps {
  onSelectObject: (object: GardenObject) => void;
  isEditing: boolean;
}

const GardenObjectSelector = ({ onSelectObject, isEditing }: GardenObjectSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterTemplates = (type: GardenObjectType) => {
    return gardenObjectTemplates
      .filter(template => template.type === type)
      .filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  };
  
  const handleSelectObject = (template: Omit<GardenObject, 'id' | 'x' | 'y'>) => {
    if (!isEditing) return;
    
    const newObject: GardenObject = {
      ...template,
      id: uuidv4(),
      x: 100,
      y: 100
    };
    
    onSelectObject(newObject);
  };
  
  const renderObjectTypeIcon = (type: GardenObjectType) => {
    switch (type) {
      case 'plant':
        return <Flower className="h-4 w-4" />;
      case 'tree':
        return <Trees className="h-4 w-4" />;
      case 'container':
        return <Box className="h-4 w-4" />;
      case 'structure':
        return <Home className="h-4 w-4" />;
      case 'path':
        return <Footprints className="h-4 w-4" />;
      case 'decoration':
        return <CircleDot className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search objects..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="plants">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="plants" className="flex items-center">
              <Flower className="h-4 w-4 mr-1" /> Plants
            </TabsTrigger>
            <TabsTrigger value="trees" className="flex items-center">
              <Trees className="h-4 w-4 mr-1" /> Trees
            </TabsTrigger>
            <TabsTrigger value="containers" className="flex items-center">
              <Box className="h-4 w-4 mr-1" /> Containers
            </TabsTrigger>
            <TabsTrigger value="structures" className="flex items-center">
              <Home className="h-4 w-4 mr-1" /> Structures
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center">
              Other
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="p-4 max-h-[300px] overflow-y-auto">
          <TabsContent value="plants" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterTemplates('plant').map((template, index) => (
                <div 
                  key={`plant-${index}`}
                  className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    !isEditing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => handleSelectObject(template)}
                >
                  <div 
                    className="w-8 h-8 rounded-full mr-2 flex items-center justify-center"
                    style={{ backgroundColor: template.color || '#ccc' }}
                  >
                    {renderObjectTypeIcon('plant')}
                  </div>
                  <span className="text-sm">{template.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trees" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterTemplates('tree').map((template, index) => (
                <div 
                  key={`tree-${index}`}
                  className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    !isEditing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => handleSelectObject(template)}
                >
                  <div 
                    className="w-8 h-8 rounded-full mr-2 flex items-center justify-center"
                    style={{ backgroundColor: template.color || '#ccc' }}
                  >
                    {renderObjectTypeIcon('tree')}
                  </div>
                  <span className="text-sm">{template.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="containers" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterTemplates('container').map((template, index) => (
                <div 
                  key={`container-${index}`}
                  className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    !isEditing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => handleSelectObject(template)}
                >
                  <div 
                    className="w-8 h-8 rounded-md mr-2 flex items-center justify-center"
                    style={{ backgroundColor: template.color || '#ccc' }}
                  >
                    {renderObjectTypeIcon('container')}
                  </div>
                  <span className="text-sm">{template.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="structures" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {filterTemplates('structure').map((template, index) => (
                <div 
                  key={`structure-${index}`}
                  className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    !isEditing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => handleSelectObject(template)}
                >
                  <div 
                    className="w-8 h-8 rounded-md mr-2 flex items-center justify-center"
                    style={{ backgroundColor: template.color || '#ccc' }}
                  >
                    {renderObjectTypeIcon('structure')}
                  </div>
                  <span className="text-sm">{template.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="other" className="mt-0">
            <div className="grid grid-cols-2 gap-2">
              {[...filterTemplates('path'), ...filterTemplates('decoration')].map((template, index) => (
                <div 
                  key={`other-${index}`}
                  className={`flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                    !isEditing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                  onClick={() => handleSelectObject(template)}
                >
                  <div 
                    className="w-8 h-8 rounded-md mr-2 flex items-center justify-center"
                    style={{ backgroundColor: template.color || '#ccc' }}
                  >
                    {renderObjectTypeIcon(template.type)}
                  </div>
                  <span className="text-sm">{template.name}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default GardenObjectSelector;
