
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { getPlantById } from '@/data/plants';
import { getRandomTips } from '@/data/gardeningTips';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import GardeningTipCard from '@/components/GardeningTipCard';
import { ArrowLeft, Droplet, Sun, Calendar, Ruler, CheckCircle } from 'lucide-react';

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [relatedTips, setRelatedTips] = useState([]);
  
  // Get plant data directly (not in useEffect to avoid render issues)
  const plant = id ? getPlantById(id) : null;
  
  useEffect(() => {
    // Only fetch related tips when plant changes
    if (plant) {
      const tips = getRandomTips(3, plant.category);
      setRelatedTips(tips);
    }
  }, [plant?.id]);
  
  if (!plant) {
    return (
      <MainLayout title="Plant Not Found">
        <div className="text-center py-10">
          <p className="text-lg mb-4">Sorry, we couldn't find that plant.</p>
          <Button onClick={() => navigate('/plants')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plants
          </Button>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title={plant.name}>
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate('/plants')}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Plants
      </Button>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <Sun className="h-5 w-5 mr-2" />
                <span className="font-medium">Sunlight</span>
              </div>
              <p className="capitalize">{plant.sunlight}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <Droplet className="h-5 w-5 mr-2" />
                <span className="font-medium">Water Needs</span>
              </div>
              <p className="capitalize">{plant.water}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="font-medium">Growth Time</span>
              </div>
              <p>{plant.growthTime} weeks</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center text-primary mb-1">
                <Ruler className="h-5 w-5 mr-2" />
                <span className="font-medium">Spacing</span>
              </div>
              <p>{plant.spacing} inches</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{plant.description}</p>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              <h3 className="text-lg font-medium">Growing Difficulty</h3>
            </div>
            <p className="capitalize">
              <span className="font-medium">Level:</span> {plant.difficulty}
            </p>
            <p>
              <span className="font-medium">Container Friendly:</span> {plant.containerFriendly ? 'Yes' : 'No'}
            </p>
          </div>
          
          {plant.seasonStart && plant.seasonEnd && (
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Growing Season</h3>
              <p>
                {new Date(0, plant.seasonStart - 1).toLocaleString('default', { month: 'long' })} to {' '}
                {new Date(0, plant.seasonEnd - 1).toLocaleString('default', { month: 'long' })}
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="planting" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="planting">Planting</TabsTrigger>
          <TabsTrigger value="care">Care</TabsTrigger>
          <TabsTrigger value="harvest">Harvest</TabsTrigger>
          <TabsTrigger value="problems">Problems & Solutions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="planting" className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Planting Instructions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {plant.plantingInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
          
          {plant.companions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-1">Companion Plants</h4>
              <p>{plant.companions.join(', ')}</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="care" className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Care Instructions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {plant.careInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="harvest" className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Harvest Instructions</h3>
          <ul className="list-disc pl-5 space-y-2">
            {plant.harvestInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </TabsContent>
        
        <TabsContent value="problems" className="bg-muted p-4 rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Common Pests</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plant.pests.map((pest, index) => (
                  <li key={index}>{pest}</li>
                ))}
              </ul>
              
              <h3 className="font-semibold mt-4 mb-2">Common Diseases</h3>
              <ul className="list-disc pl-5 space-y-1">
                {plant.diseases.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Remedies & Solutions</h3>
              <ul className="list-disc pl-5 space-y-2">
                {plant.remedies.map((remedy, index) => (
                  <li key={index}>{remedy}</li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {relatedTips.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Related Gardening Tips</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedTips.map((tip) => (
              <GardeningTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default PlantDetail;
