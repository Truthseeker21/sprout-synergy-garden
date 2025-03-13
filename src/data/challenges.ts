
export interface GardeningChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationDays: number;
  points: number;
  tasks: ChallengeTask[];
  completedBy: number;
  image?: string;
}

export interface ChallengeTask {
  id: string;
  description: string;
  pointValue: number;
  isCompleted?: boolean;
}

export const gardeningChallenges: GardeningChallenge[] = [
  {
    id: '1',
    title: 'Herb Garden Starter',
    description: 'Begin your urban gardening journey by creating a simple herb garden in your kitchen or balcony.',
    difficulty: 'beginner',
    durationDays: 14,
    points: 100,
    tasks: [
      {
        id: '1-1',
        description: 'Select and prepare containers with drainage holes',
        pointValue: 20
      },
      {
        id: '1-2',
        description: 'Fill containers with quality potting mix',
        pointValue: 15
      },
      {
        id: '1-3',
        description: 'Plant at least 3 different herbs (basil, mint, cilantro, etc.)',
        pointValue: 25
      },
      {
        id: '1-4',
        description: 'Water plants and place in a sunny location',
        pointValue: 10
      },
      {
        id: '1-5',
        description: 'Record observations of growth for 7 days',
        pointValue: 30
      }
    ],
    completedBy: 1245,
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Composting Pioneer',
    description: 'Start reducing waste and create nutrient-rich soil by setting up your first composting system.',
    difficulty: 'intermediate',
    durationDays: 30,
    points: 150,
    tasks: [
      {
        id: '2-1',
        description: 'Choose a composting method suitable for your space',
        pointValue: 20
      },
      {
        id: '2-2',
        description: 'Set up your composting system',
        pointValue: 30
      },
      {
        id: '2-3',
        description: 'Collect and add both green and brown materials',
        pointValue: 25
      },
      {
        id: '2-4',
        description: 'Turn or aerate your compost weekly',
        pointValue: 35
      },
      {
        id: '2-5',
        description: 'Document the decomposition process with photos',
        pointValue: 40
      }
    ],
    completedBy: 876,
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Vertical Garden Creator',
    description: 'Maximize your growing space by building and maintaining a vertical garden system.',
    difficulty: 'advanced',
    durationDays: 45,
    points: 200,
    tasks: [
      {
        id: '3-1',
        description: 'Design a vertical garden plan appropriate for your space',
        pointValue: 30
      },
      {
        id: '3-2',
        description: 'Gather materials and build the vertical structure',
        pointValue: 50
      },
      {
        id: '3-3',
        description: 'Select appropriate plants for vertical growing',
        pointValue: 25
      },
      {
        id: '3-4',
        description: 'Install irrigation system (if applicable)',
        pointValue: 40
      },
      {
        id: '3-5',
        description: 'Plant and maintain your vertical garden for 30 days',
        pointValue: 55
      }
    ],
    completedBy: 348,
    image: '/placeholder.svg'
  }
];

export const getChallengesByDifficulty = (difficulty: GardeningChallenge['difficulty']): GardeningChallenge[] => {
  return gardeningChallenges.filter(challenge => challenge.difficulty === difficulty);
};

export const getActiveChallenges = (userChallenges: string[]): GardeningChallenge[] => {
  return gardeningChallenges.filter(challenge => userChallenges.includes(challenge.id));
};
