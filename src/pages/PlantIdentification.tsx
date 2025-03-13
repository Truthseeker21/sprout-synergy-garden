
import React, { useState, useRef } from 'react';
import MainLayout from '@/components/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Camera, Upload, Image, RefreshCw } from 'lucide-react';
import { plants } from '@/data/plants';
import PlantIdentificationResult from '@/components/PlantIdentificationResult';

const PlantIdentification = () => {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [identificationResult, setIdentificationResult] = useState<{
    plant: typeof plants[0] | null;
    confidence: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
      });
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setIdentificationResult(null);
    };
    reader.readAsDataURL(file);
  };

  const takePicture = () => {
    // In a real app, this would access the device camera
    // For this demo, we'll just trigger the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const identifyPlant = () => {
    if (!selectedImage) return;
    
    setIsIdentifying(true);
    
    // Simulate API call to plant identification service
    setTimeout(() => {
      // For demo purposes, we'll just randomly select a plant from our database
      const randomPlant = plants[Math.floor(Math.random() * plants.length)];
      const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setIdentificationResult({
        plant: randomPlant,
        confidence: randomConfidence
      });
      
      setIsIdentifying(false);
    }, 2000);
  };

  const resetIdentification = () => {
    setSelectedImage(null);
    setIdentificationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveToGarden = () => {
    if (!identificationResult?.plant) return;
    
    toast({
      title: "Plant Added to Garden",
      description: `${identificationResult.plant.name} has been added to your garden.`,
    });
  };

  return (
    <MainLayout title="Plant Identification">
      <div className="mb-6">
        <p className="text-muted-foreground mb-4">
          Upload a photo or take a picture of a plant to identify it. Our system will analyze the image and tell you what plant it is.
        </p>
      </div>

      {!selectedImage ? (
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </TabsTrigger>
            <TabsTrigger value="camera">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="plant-photo" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Image className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG or JPEG (MAX. 5MB)
                      </p>
                    </div>
                    <Input 
                      id="plant-photo" 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="camera">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-6 p-4 bg-muted rounded-full">
                    <Camera className="h-12 w-12 text-primary" />
                  </div>
                  <Button onClick={takePicture} className="mb-2">
                    <Camera className="h-4 w-4 mr-2" />
                    Take a Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    This will open your device camera
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Plant Photo</h2>
            <Button variant="ghost" size="sm" onClick={resetIdentification}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-square relative overflow-hidden rounded-md">
                  <img 
                    src={selectedImage} 
                    alt="Selected plant" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {identificationResult ? (
                <PlantIdentificationResult 
                  plant={identificationResult.plant}
                  confidence={identificationResult.confidence}
                  onSaveToGarden={saveToGarden}
                  onTryAgain={resetIdentification}
                />
              ) : (
                <Card>
                  <CardContent className="py-6">
                    <Button 
                      onClick={identifyPlant} 
                      className="w-full" 
                      disabled={isIdentifying}
                    >
                      {isIdentifying ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Identifying...
                        </>
                      ) : (
                        <>
                          <Leaf className="h-4 w-4 mr-2" />
                          Identify Plant
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardContent className="py-4">
                  <h3 className="font-medium mb-2">Tips for better identification:</h3>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Focus on the plant's leaves, flowers, or fruits</li>
                    <li>Ensure good lighting conditions</li>
                    <li>Avoid blurry or dark images</li>
                    <li>Include multiple parts of the plant if possible</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Common Plants in the Philippines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {plants.slice(0, 4).map((plant) => (
            <Card key={plant.id} className="overflow-hidden">
              <div className="aspect-square">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm">{plant.name}</h3>
                <p className="text-xs text-muted-foreground capitalize">{plant.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PlantIdentification;
