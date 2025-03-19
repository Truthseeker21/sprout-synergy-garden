
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '@/components/ChallengeCard';
import { GardeningChallenge } from '@/data/challenges';

interface ActiveChallengesProps {
  challenges: GardeningChallenge[];
}

const ActiveChallenges = ({ challenges }: ActiveChallengesProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-8 animate-fade-up">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Active Challenges</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={() => navigate('/challenges')}
        >
          Find Challenges <Plus className="ml-1 h-4 w-4" />
        </Button>
      </div>
      {challenges.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {challenges.map((challenge) => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge}
              isActive={true}
              onJoin={() => navigate(`/challenges/${challenge.id}`)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">You don't have any active challenges yet.</p>
            <Button onClick={() => navigate('/challenges')}>Browse Challenges</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActiveChallenges;
