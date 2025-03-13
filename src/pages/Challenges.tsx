
import React from 'react';
import MainLayout from '@/components/MainLayout';
import { gardeningChallenges as challenges } from '@/data/challenges';
import ChallengeCard from '@/components/ChallengeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Trophy, Clock, Check } from 'lucide-react';

const Challenges = () => {
  const currentDate = new Date();
  
  // Use durationDays instead of endDate for active challenges
  // Assuming challenges that have more completedBy users are "active"
  const activeChallenges = challenges.filter(
    challenge => challenge.completedBy > 0 && challenge.completedBy < 1000
  );
  
  // Use completedBy instead of completed
  // Assuming challenges that have many completedBy users are "completed"
  const completedChallenges = challenges.filter(
    challenge => challenge.completedBy >= 1000
  );
  
  // For upcoming challenges, use the ones with fewer completedBy
  const upcomingChallenges = challenges.filter(
    challenge => challenge.completedBy === 0
  );
  
  return (
    <MainLayout title="Gardening Challenges">
      <div className="mb-6">
        <p className="text-muted-foreground mb-6">
          Participate in gardening challenges to learn new skills, connect with the community, and earn achievements!
        </p>
        <Button className="mb-4">
          <Trophy className="h-4 w-4 mr-2" />
          View Your Achievements
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-6">
          <TabsTrigger value="active">
            <Clock className="h-4 w-4 mr-2" />
            Active
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            <Calendar className="h-4 w-4 mr-2" />
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="completed">
            <Check className="h-4 w-4 mr-2" />
            Completed
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No active challenges at the moment.</p>
              <Button>Check Upcoming Challenges</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="upcoming">
          {upcomingChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">No upcoming challenges yet.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="completed">
          {completedChallenges.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedChallenges.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">You haven't completed any challenges yet.</p>
              <Button>Join a Challenge</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Challenges;
