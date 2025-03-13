
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GardeningTip } from '@/data/gardeningTips';
import { Lightbulb } from 'lucide-react';

interface GardeningTipCardProps {
  tip: GardeningTip;
}

const GardeningTipCard = ({ tip }: GardeningTipCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
            <Lightbulb className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium text-base">{tip.title}</h3>
            <div className="text-xs text-muted-foreground mb-2 capitalize">{tip.category.replace('-', ' ')}</div>
            <p className="text-sm">{tip.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GardeningTipCard;
