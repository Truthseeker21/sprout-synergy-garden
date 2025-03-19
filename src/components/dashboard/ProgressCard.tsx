
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { DemoUser } from '@/types/UserTypes';

interface ProgressCardProps {
  user: DemoUser;
}

const ProgressCard = ({ user }: ProgressCardProps) => {
  return (
    <Card className="col-span-1 animate-fade-up">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Gardening Points</span>
              <span className="font-medium">{user.points}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${Math.min((user.points / 1000) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Challenges Completed</span>
              <span className="font-medium">{user.challengesCompleted}</span>
            </div>
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className={`h-2 rounded-full ${i < user.challengesCompleted ? 'bg-success' : 'bg-muted'}`}
                ></div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm">Latest Badge</div>
            {user.badges.length > 0 ? (
              <div className="flex items-center">
                <Award className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium">{user.badges[0].name}</span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No badges yet</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
