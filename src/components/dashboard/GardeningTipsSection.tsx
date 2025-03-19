
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import GardeningTipCard from '@/components/GardeningTipCard';
import { GardeningTip } from '@/data/gardeningTips';

interface GardeningTipsSectionProps {
  tips: GardeningTip[];
}

const GardeningTipsSection = ({ tips }: GardeningTipsSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="animate-fade-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Gardening Tips</h2>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="watering">Watering</TabsTrigger>
            <TabsTrigger value="pest-control">Pest Control</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {tips.map((tip) => (
          <GardeningTipCard key={tip.id} tip={tip} />
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={() => navigate('/tips')}
        >
          View All Tips
        </Button>
      </div>
    </div>
  );
};

export default GardeningTipsSection;
