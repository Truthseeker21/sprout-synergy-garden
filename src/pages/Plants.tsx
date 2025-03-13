
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/MainLayout';
import { plants, Plant, getPlantsByCategory, getPlantsByDifficulty } from '@/data/plants';
import PlantCard from '@/components/PlantCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';

const Plants = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Plant['category'] | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Plant['difficulty'] | 'all'>('all');
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>(plants);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = [...plants];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(plant => plant.category === selectedCategory);
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      result = result.filter(plant => plant.difficulty === selectedDifficulty);
    }
    
    setFilteredPlants(result);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const categories: Array<Plant['category'] | 'all'> = ['all', 'vegetable', 'fruit', 'herb', 'flower'];
  const difficulties: Array<Plant['difficulty'] | 'all'> = ['all', 'beginner', 'intermediate', 'advanced'];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  return (
    <MainLayout title="Plant Guide">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search plants..."
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
          <Button
            variant="outline"
            className="md:w-auto"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {isFilterOpen && (
          <div className="bg-muted p-4 rounded-md mb-4 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Category</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      size="sm"
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize"
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Difficulty</Label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <Button
                      key={difficulty}
                      size="sm"
                      variant={selectedDifficulty === difficulty ? "default" : "outline"}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className="capitalize"
                    >
                      {difficulty === 'all' ? 'All Levels' : difficulty}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Plants</TabsTrigger>
          <TabsTrigger value="vegetable">Vegetables</TabsTrigger>
          <TabsTrigger value="herb">Herbs</TabsTrigger>
          <TabsTrigger value="container">Container Friendly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredPlants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPlants.map((plant) => (
                <PlantCard 
                  key={plant.id} 
                  plant={plant} 
                  onClick={() => navigate(`/plants/${plant.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No plants match your search criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="vegetable">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getPlantsByCategory('vegetable').map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onClick={() => navigate(`/plants/${plant.id}`)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="herb">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getPlantsByCategory('herb').map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onClick={() => navigate(`/plants/${plant.id}`)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {plants.filter(p => p.containerFriendly).map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onClick={() => navigate(`/plants/${plant.id}`)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Plants;
