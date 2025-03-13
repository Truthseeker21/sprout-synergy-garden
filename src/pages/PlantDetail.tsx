
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPlantById } from '@/data/plants';
import { Droplet, Sun, Calendar, Ruler, Award, ArrowLeft } from 'lucide-react';
import GardeningTipCard from '@/components/GardeningTipCard';
import { getRandomTips } from '@/data/gardeningTips';
import { GardeningTip } from '@/data/gardeningTips';

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [relatedTips, setRelatedTips] = useState<GardeningTip[]>([]);
  
  // Only fetch the plant once during initial render
  const plant = id ? getPlantById(id) : undefined;
  
  // Only fetch related tips once during initial render or when plant changes
  useEffect(() => {
    if (plant) {
      // Get random tips but preferably related to the plant's category if possible
      setRelatedTips(getRandomTips(2, plant.category));
    }
  }, [plant]);

  if (!plant) {
    return (
      <MainLayout title="Plant Not Found">
        <div className="text-center py-10">
          <p className="text-muted-foreground mb-4">The plant you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/plants')}>Back to Plants</Button>
        </div>
      </MainLayout>
    );
  }

  const getDifficultyClass = () => {
    switch (plant.difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSunlightIcon = () => {
    switch (plant.sunlight) {
      case 'full':
        return <div className="flex items-center text-amber-500"><Sun className="h-5 w-5 mr-2" /> Full Sun</div>;
      case 'partial':
        return <div className="flex items-center text-amber-400"><Sun className="h-5 w-5 mr-2" /> Partial Sun</div>;
      case 'shade':
        return <div className="flex items-center text-amber-300"><Sun className="h-5 w-5 mr-2" /> Shade</div>;
      default:
        return null;
    }
  };

  const getWaterIcon = () => {
    switch (plant.water) {
      case 'high':
        return <div className="flex items-center text-blue-500"><Droplet className="h-5 w-5 mr-2" /> High</div>;
      case 'medium':
        return <div className="flex items-center text-blue-400"><Droplet className="h-5 w-5 mr-2" /> Medium</div>;
      case 'low':
        return <div className="flex items-center text-blue-300"><Droplet className="h-5 w-5 mr-2" /> Low</div>;
      default:
        return null;
    }
  };

  return (
    <MainLayout title={plant.name}>
      <Button 
        variant="ghost" 
        className="mb-4 flex items-center"
        onClick={() => navigate('/plants')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Plants
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img
                src={plant.image || '/placeholder.svg'}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{plant.name}</h1>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getDifficultyClass()}`}>
                  {plant.difficulty}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground mb-4 capitalize">{plant.category}</div>
              
              <div className="space-y-3 mb-4">
                {getSunlightIcon()}
                {getWaterIcon()}
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" /> 
                  Growth Time: {plant.growthTime} weeks
                </div>
                <div className="flex items-center">
                  <Ruler className="h-5 w-5 mr-2 text-gray-500" /> 
                  Spacing: {plant.spacing} inches
                </div>
                <div className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-gray-500" /> 
                  Container Friendly: {plant.containerFriendly ? 'Yes' : 'No'}
                </div>
              </div>
              
              {plant.seasonStart && plant.seasonEnd && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Growing Season</h3>
                  <div className="flex space-x-1">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const month = i + 1;
                      let isInSeason = false;
                      
                      if (plant.seasonStart && plant.seasonEnd) {
                        if (plant.seasonStart <= plant.seasonEnd) {
                          isInSeason = month >= plant.seasonStart && month <= plant.seasonEnd;
                        } else {
                          // Handles seasons that cross year boundaries
                          isInSeason = month >= plant.seasonStart || month <= plant.seasonEnd;
                        }
                      }
                      
                      return (
                        <div 
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center text-xs rounded-sm ${isInSeason ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Jan</span>
                    <span>Dec</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">About {plant.name}</h2>
              <p className="text-sm">{plant.description}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Growing Instructions</h2>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Planting</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {plant.plantingInstructions.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Care</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {plant.careInstructions.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Harvesting</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {plant.harvestInstructions.map((instruction, index) => (
                    <li key={index} className="text-sm">{instruction}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Companions</h2>
                <div className="flex flex-wrap gap-2">
                  {plant.companions.map((companion, index) => (
                    <div key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                      {companion}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Pests & Diseases</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Common Pests</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.pests.map((pest, index) => (
                        <div key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                          {pest}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Common Diseases</h3>
                    <div className="flex flex-wrap gap-2">
                      {plant.diseases.map((disease, index) => (
                        <div key={index} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs">
                          {disease}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Remedies & Solutions</h2>
              <ul className="list-disc pl-5 space-y-2">
                {plant.remedies.map((remedy, index) => (
                  <li key={index} className="text-sm">{remedy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Related Tips Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Related Gardening Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedTips.map((tip) => (
            <GardeningTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PlantDetail;
