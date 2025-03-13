
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GardeningChallenge } from '@/data/challenges';
import { Award, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChallengeCardProps {
  challenge: GardeningChallenge;
  onJoin?: () => void;
  isActive?: boolean;
}

const ChallengeCard = ({ challenge, onJoin, isActive = false }: ChallengeCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <img
          src={challenge.image || '/placeholder.svg'}
          alt={challenge.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xs flex items-center">
          <Award className="h-3 w-3 mr-1 text-primary" />
          {challenge.points} points
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{challenge.title}</h3>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          <div className="capitalize">{challenge.difficulty}</div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {challenge.durationDays} days
          </div>
        </div>
        <p className="text-sm line-clamp-2 mb-3">{challenge.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3 w-3 mr-1" />
            {challenge.completedBy} gardeners
          </div>
          <Button 
            variant={isActive ? "secondary" : "outline"} 
            size="sm" 
            onClick={onJoin}
          >
            {isActive ? 'View Progress' : 'Join Challenge'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
