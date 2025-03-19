export interface UserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  location: string;
  climate: string;
  avatar?: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  gardenType: ('balcony' | 'indoor' | 'small yard' | 'community garden')[];
  plantPreferences: string[];
  challengesCompleted: number;
  points: number;
  badges: Badge[];
  joinedDate: string;
  activeChallenges: string[];
  savedPlants: string[];
  gardenJournal: JournalEntry[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  earnedDate: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  images?: string[];
  plantIds?: string[];
  tags: string[];
}

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  points: number;
  challengesCompleted: number;
  badges: Array<{ id: string; name: string }>;
  activeChallenges: string[];
  plants: string[];
  notifications: number;
};

export const demoUser: UserProfile = {
  id: '2',
  name: 'User',
  email: 'user@agrigrow.com',
  isAdmin: false,
  location: 'General Santos City',
  climate: 'Tropical',
  experience: 'beginner',
  gardenType: ['balcony', 'indoor'],
  plantPreferences: ['herbs', 'vegetables', 'flowers'],
  challengesCompleted: 2,
  points: 275,
  badges: [
    {
      id: 'b1',
      name: 'Green Thumb Beginner',
      description: 'Completed your first plant care cycle',
      image: '/placeholder.svg',
      earnedDate: '2023-08-15'
    },
    {
      id: 'b2',
      name: 'Compost Champion',
      description: 'Started your first composting system',
      image: '/placeholder.svg',
      earnedDate: '2023-09-02'
    }
  ],
  joinedDate: '2023-07-20',
  activeChallenges: ['1', '2'],
  savedPlants: ['1', '3'],
  gardenJournal: [
    {
      id: 'j1',
      date: '2023-08-10',
      title: 'Started Basil Seeds',
      content: 'Planted basil seeds in a small container on my kitchen windowsill. Using organic potting mix and keeping soil moist.',
      tags: ['herbs', 'basil', 'beginnings']
    },
    {
      id: 'j2',
      date: '2023-08-24',
      title: 'Basil Seedlings Emerging!',
      content: 'My basil seeds have sprouted! They have their first set of true leaves now. Thinned out some of the weaker seedlings to give the stronger ones more space.',
      tags: ['herbs', 'basil', 'growth']
    },
    {
      id: 'j3',
      date: '2023-09-15',
      title: 'First Tomato Flowers',
      content: 'My cherry tomato plant has its first flowers! I\'ve been making sure to water it consistently and it\'s getting about 6 hours of sunlight on the balcony.',
      tags: ['vegetables', 'tomatoes', 'flowers']
    }
  ]
};

export const demoAdmin: UserProfile = {
  id: '1',
  name: 'Admin',
  email: 'admin@agrigrow.com',
  isAdmin: true,
  location: 'General Santos City',
  climate: 'Tropical',
  experience: 'advanced',
  gardenType: ['small yard', 'community garden'],
  plantPreferences: ['vegetables', 'fruits', 'native plants'],
  challengesCompleted: 12,
  points: 1850,
  badges: [
    {
      id: 'b1',
      name: 'Master Gardener',
      description: 'Completed 10 gardening challenges',
      image: '/placeholder.svg',
      earnedDate: '2023-03-15'
    },
    {
      id: 'b2',
      name: 'Community Leader',
      description: 'Helped 50 community members with gardening advice',
      image: '/placeholder.svg',
      earnedDate: '2023-06-02'
    },
    {
      id: 'b3',
      name: 'Sustainability Champion',
      description: 'Maintained an organic garden for one full year',
      image: '/placeholder.svg',
      earnedDate: '2023-01-30'
    }
  ],
  joinedDate: '2022-05-10',
  activeChallenges: ['3'],
  savedPlants: ['1', '2', '3'],
  gardenJournal: [
    {
      id: 'j1',
      date: '2023-07-10',
      title: 'Community Garden Planning',
      content: 'Met with neighborhood members to plan our community garden layout. We\'ll be implementing permaculture principles and focusing on native plants that support local pollinators.',
      tags: ['community', 'planning', 'native plants']
    },
    {
      id: 'j2',
      date: '2023-08-05',
      title: 'Seed Saving Workshop',
      content: 'Hosted a seed saving workshop at the community garden. 15 participants learned how to properly harvest and store seeds from tomatoes, peppers, and beans.',
      tags: ['workshop', 'seed saving', 'community']
    }
  ]
};
