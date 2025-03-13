
import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import { gardeningTechniques } from '@/data/gardeningTechniques';
import TechniqueCard from '@/components/TechniqueCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

const Techniques = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTechniques = gardeningTechniques.filter(technique =>
    technique.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    technique.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const beginnerTechniques = gardeningTechniques.filter(
    technique => technique.difficulty === 'beginner'
  );
  
  const sustainableTechniques = gardeningTechniques.filter(
    technique => technique.category === 'container' || technique.category === 'vertical'
  );
  
  return (
    <MainLayout title="Gardening Techniques">
      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search techniques..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Techniques</TabsTrigger>
          <TabsTrigger value="beginner">Beginner-Friendly</TabsTrigger>
          <TabsTrigger value="sustainable">Sustainable</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredTechniques.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTechniques.map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No techniques match your search criteria.</p>
              <button 
                className="text-primary hover:underline"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="beginner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {beginnerTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="sustainable">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sustainableTechniques.map((technique) => (
              <TechniqueCard key={technique.id} technique={technique} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="seasonal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gardeningTechniques
              .filter(technique => technique.category === 'container')
              .map((technique) => (
                <TechniqueCard key={technique.id} technique={technique} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Techniques;
