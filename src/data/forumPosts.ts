
export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: 'general' | 'plants' | 'techniques' | 'pests' | 'success-stories';
  tags: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  likes: number;
  createdAt: string;
}

export const forumPosts: ForumPost[] = [
  {
    id: '1',
    userId: '2',
    userName: 'Urban Farmer',
    userAvatar: '/placeholder.svg',
    title: 'Best vegetables for balcony container gardening?',
    content: 'I have a small balcony that gets about 6 hours of sunlight. I want to start growing vegetables in containers. Which ones would be best suited for my space and relatively easy to grow for a beginner?',
    category: 'plants',
    tags: ['container', 'vegetables', 'balcony', 'beginner'],
    likes: 12,
    comments: [
      {
        id: '1-1',
        userId: '3',
        userName: 'GreenThumb',
        userAvatar: '/placeholder.svg',
        content: 'Leafy greens like lettuce, spinach, and kale do well in containers and don\'t need full sun. Cherry tomatoes, peppers, and herbs are also great choices for balconies. Just make sure your containers are deep enough - at least 12 inches for tomatoes and peppers.',
        likes: 5,
        createdAt: '2023-09-15T14:25:00Z'
      },
      {
        id: '1-2',
        userId: '4',
        userName: 'BalconyGardener',
        userAvatar: '/placeholder.svg',
        content: 'I\'ve had great success with bush beans, radishes, and green onions on my balcony. They grow quickly which is really satisfying as a beginner! Just watch the watering - containers dry out faster than in-ground gardens.',
        likes: 3,
        createdAt: '2023-09-15T16:42:00Z'
      }
    ],
    createdAt: '2023-09-15T10:30:00Z'
  },
  {
    id: '2',
    userId: '5',
    userName: 'OrganicGrower',
    userAvatar: '/placeholder.svg',
    title: 'Natural solutions for aphid infestation',
    content: 'My pepper plants are being attacked by aphids! I want to avoid chemical pesticides since I\'m growing organically. Has anyone tried natural remedies that actually work? I\'ve heard of neem oil and soap sprays but would love to hear personal experiences.',
    category: 'pests',
    tags: ['organic', 'aphids', 'natural-remedies', 'pest-control'],
    likes: 18,
    comments: [
      {
        id: '2-1',
        userId: '6',
        userName: 'BugBattler',
        userAvatar: '/placeholder.svg',
        content: 'I make a spray with 1 tablespoon of dish soap in 1 quart of water. Spray directly on the aphids in the early morning or evening (not during hot sun). You might need to reapply every few days. Also, try introducing ladybugs if you can find them - they\'re aphid predators!',
        likes: 7,
        createdAt: '2023-09-17T08:15:00Z'
      },
      {
        id: '2-2',
        userId: '7',
        userName: 'HerbGardener',
        userAvatar: '/placeholder.svg',
        content: 'Neem oil has worked well for me. Mix 2 tsp neem oil with 1 tsp mild liquid soap in 1 quart of water. Shake well and spray thoroughly, including the undersides of leaves. As a preventative measure, I also plant aphid-repelling companions like marigolds, nasturtiums, and chives near vulnerable plants.',
        likes: 5,
        createdAt: '2023-09-17T09:30:00Z'
      }
    ],
    createdAt: '2023-09-16T18:45:00Z'
  },
  {
    id: '3',
    userId: '8',
    userName: 'CityHomesteader',
    userAvatar: '/placeholder.svg',
    title: 'Success with vertical strawberry garden!',
    content: 'I wanted to share my success with a DIY vertical strawberry planter I made from PVC pipe! I have a tiny urban yard but was able to grow 30 strawberry plants in a 4 ft x 2 ft space. I\'ll share how I made it and some lessons learned over the growing season.',
    category: 'success-stories',
    tags: ['vertical-gardening', 'strawberries', 'DIY', 'small-space'],
    likes: 26,
    comments: [
      {
        id: '3-1',
        userId: '9',
        userName: 'CraftyGardener',
        userAvatar: '/placeholder.svg',
        content: 'This looks amazing! Would you mind sharing more details about the construction? Did you have any issues with watering the top plants vs. bottom ones?',
        likes: 2,
        createdAt: '2023-09-19T12:10:00Z'
      },
      {
        id: '3-2',
        userId: '8',
        userName: 'CityHomesteader',
        userAvatar: '/placeholder.svg',
        content: 'Thanks! I used 4-inch PVC pipe with 2-inch holes cut at alternating angles. For watering, I installed a drip irrigation tube down the center with small holes throughout. The top plants got more water initially, but adding a layer of coconut coir at each level helped distribute the moisture more evenly. I\'ll post a full DIY guide with pictures next week!',
        likes: 8,
        createdAt: '2023-09-19T14:05:00Z'
      }
    ],
    createdAt: '2023-09-19T09:20:00Z'
  }
];

export const getPostsByCategory = (category: ForumPost['category']): ForumPost[] => {
  return forumPosts.filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): ForumPost[] => {
  return forumPosts.filter(post => post.tags.includes(tag));
};

export const searchPosts = (query: string): ForumPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return forumPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) || 
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
