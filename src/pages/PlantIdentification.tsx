
import React, { useState, useRef } from 'react';
import MainLayout from '@/components/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getPlantById, getRecommendedPlants, plants } from '@/data/plants';
import PlantIdentificationResult from '@/components/PlantIdentificationResult';
import { Camera, Upload, Info, Leaf as PlantIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PlantIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [identifiedPlant, setIdentifiedPlant] = useState<any>(null);
  const [confidence, setConfidence] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIdentifiedPlant(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    // In a real application, this would access the device camera
    // For this prototype, we'll simulate it by clicking the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleIdentify = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image or take a photo first.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call to identify plant
    setTimeout(() => {
      // For demo purposes, randomly select a plant from our database
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];
      // Generate a random confidence level (higher is more likely for demo purposes)
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setIdentifiedPlant(randomPlant);
      setConfidence(randomConfidence);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSaveToGarden = () => {
    if (identifiedPlant) {
      toast({
        title: "Added to Garden",
        description: `${identifiedPlant.name} has been added to your garden.`,
      });
    }
  };

  const handleTryAgain = () => {
    setSelectedImage(null);
    setIdentifiedPlant(null);
    setConfidence(0);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Plant Identification</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlantIcon className="h-5 w-5 mr-2 text-green-500" />
                  Upload Plant Image
                </CardTitle>
                <CardDescription>
                  Take a clear photo of the plant you want to identify
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid w-full gap-1.5">
                    <Label htmlFor="picture">Picture</Label>
                    <Input 
                      id="picture" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" /> Upload Image
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleCameraCapture}
                      >
                        <Camera className="mr-2 h-4 w-4" /> Take Photo
                      </Button>
                    </div>
                  </div>
                  
                  {selectedImage && (
                    <div className="mt-4">
                      <div className="border rounded-md overflow-hidden h-64 flex items-center justify-center bg-muted">
                        <img 
                          src={selectedImage} 
                          alt="Selected plant" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <Button 
                        onClick={handleIdentify} 
                        className="w-full mt-4"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Identify Plant'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Tips for Better Identification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Take a clear, well-lit photo</li>
                  <li>Include flowers or fruits if possible</li>
                  <li>Capture distinctive features (leaf shape, patterns)</li>
                  <li>Include multiple parts of the plant if needed</li>
                  <li>Avoid blurry or dark images</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Common Philippine Plants</CardTitle>
                <CardDescription>Plants you might encounter in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {getRecommendedPlants().map((plant) => (
                    <div key={plant.id} className="text-center">
                      <div className="h-16 w-16 mx-auto rounded-full overflow-hidden bg-muted mb-2">
                        <img 
                          src={plant.image} 
                          alt={plant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium">{plant.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="link" size="sm">View All Philippine Plants</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div>
            {identifiedPlant ? (
              <PlantIdentificationResult 
                plant={identifiedPlant}
                confidence={confidence}
                onSaveToGarden={handleSaveToGarden}
                onTryAgain={handleTryAgain}
              />
            ) : (
              <Card className="h-full border-dashed border-2 border-muted-foreground/50 bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <PlantIcon className="h-16 w-16 mb-4 text-muted-foreground/60" />
                  <h3 className="text-xl font-medium mb-2">No Plant Identified Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Upload a photo of a plant you want to identify, and our system will analyze it
                    and provide information about the plant.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload an Image
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlantIdentification;
