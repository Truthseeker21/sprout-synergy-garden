
export interface Plant {
  id: string;
  name: string;
  category: 'vegetable' | 'fruit' | 'herb' | 'flower';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sunlight: 'full' | 'partial' | 'shade';
  water: 'low' | 'medium' | 'high';
  growthTime: number; // in weeks
  spacing: number; // in inches
  containerFriendly: boolean;
  description: string;
  plantingInstructions: string[];
  careInstructions: string[];
  harvestInstructions: string[];
  companions: string[];
  pests: string[];
  diseases: string[];
  remedies: string[];
  image: string;
  seasonStart?: number; // month number (1-12)
  seasonEnd?: number; // month number (1-12)
}

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Tomato',
    category: 'vegetable',
    difficulty: 'beginner',
    sunlight: 'full',
    water: 'medium',
    growthTime: 12,
    spacing: 24,
    containerFriendly: true,
    description: 'Tomatoes are a popular garden vegetable with many varieties. They require regular watering and full sun to produce a good harvest.',
    plantingInstructions: [
      'Start seeds indoors 6-8 weeks before last frost date',
      'Transplant outdoors when soil has warmed and danger of frost has passed',
      'Plant deeply, burying 2/3 of the stem to encourage root growth',
      'Space plants 24 inches apart'
    ],
    careInstructions: [
      'Water regularly, keeping soil moist but not waterlogged',
      'Apply organic mulch to retain moisture and prevent weeds',
      'Stake or cage plants to support heavy fruit',
      'Prune suckers for indeterminate varieties to improve air circulation'
    ],
    harvestInstructions: [
      'Harvest when fruits are firm and fully colored',
      'Pick regularly to encourage more production',
      'Towards end of season, remove new flowers to direct energy to existing fruit'
    ],
    companions: ['Basil', 'Marigold', 'Nasturtium', 'Garlic'],
    pests: ['Aphids', 'Tomato Hornworm', 'Whiteflies'],
    diseases: ['Blight', 'Fusarium Wilt', 'Powdery Mildew'],
    remedies: [
      'Use neem oil for insect pests',
      'Improve air circulation to prevent fungal diseases',
      'Apply compost tea to boost plant immunity'
    ],
    image: '/placeholder.svg',
    seasonStart: 4,
    seasonEnd: 9
  },
  {
    id: '2',
    name: 'Basil',
    category: 'herb',
    difficulty: 'beginner',
    sunlight: 'full',
    water: 'medium',
    growthTime: 8,
    spacing: 12,
    containerFriendly: true,
    description: 'Basil is a fragrant herb that pairs well with tomatoes, both in the garden and in the kitchen. It grows quickly and can be harvested throughout the season.',
    plantingInstructions: [
      'Sow seeds directly in garden after last frost date',
      'Plant seeds 1/4 inch deep',
      'Space plants 12 inches apart',
      'Can be grown in containers or garden beds'
    ],
    careInstructions: [
      'Water regularly, keeping soil moist',
      'Pinch off flower buds to encourage leafy growth',
      'Harvest leaves regularly to promote bushier plants',
      'Protect from cold temperatures'
    ],
    harvestInstructions: [
      'Begin harvesting when plants have at least 6 leaves',
      'Harvest in the morning when oil content is highest',
      'Cut stems just above a pair of leaves to encourage branching'
    ],
    companions: ['Tomato', 'Pepper', 'Oregano'],
    pests: ['Aphids', 'Japanese Beetles', 'Slugs'],
    diseases: ['Fusarium Wilt', 'Downy Mildew'],
    remedies: [
      'Use insecticidal soap for aphids',
      'Apply diatomaceous earth for slugs',
      'Ensure good air circulation to prevent fungal issues'
    ],
    image: '/placeholder.svg',
    seasonStart: 5,
    seasonEnd: 9
  },
  {
    id: '3',
    name: 'Lettuce',
    category: 'vegetable',
    difficulty: 'beginner',
    sunlight: 'partial',
    water: 'medium',
    growthTime: 6,
    spacing: 8,
    containerFriendly: true,
    description: 'Lettuce is a cool-season crop that grows quickly and can be harvested multiple times. It\'s perfect for container gardening and small spaces.',
    plantingInstructions: [
      'Sow seeds directly in garden as soon as soil can be worked in spring',
      'Plant seeds 1/8 inch deep',
      'Space plants 8 inches apart for head lettuce, closer for leaf varieties',
      'For continuous harvest, plant new seeds every 2 weeks'
    ],
    careInstructions: [
      'Keep soil consistently moist',
      'Apply light mulch to retain moisture and suppress weeds',
      'Provide afternoon shade in hot weather',
      'Harvest outer leaves to extend growing season'
    ],
    harvestInstructions: [
      'Harvest outer leaves as needed for leaf lettuce',
      'For head lettuce, harvest when heads are firm but before they bolt',
      'Harvest in morning for best flavor and crispness'
    ],
    companions: ['Carrots', 'Radishes', 'Strawberries'],
    pests: ['Aphids', 'Slugs', 'Rabbits'],
    diseases: ['Downy Mildew', 'Bottom Rot'],
    remedies: [
      'Use row covers to protect from pests',
      'Apply diatomaceous earth for slugs',
      'Ensure good air circulation to prevent mildew'
    ],
    image: '/placeholder.svg',
    seasonStart: 3,
    seasonEnd: 5
  }
];

export const getPlantById = (id: string): Plant | undefined => {
  return plants.find(plant => plant.id === id);
};

export const getPlantsByCategory = (category: Plant['category']): Plant[] => {
  return plants.filter(plant => plant.category === category);
};

export const getPlantsBySeason = (month: number): Plant[] => {
  return plants.filter(plant => {
    if (!plant.seasonStart || !plant.seasonEnd) return true;
    if (plant.seasonStart <= plant.seasonEnd) {
      return month >= plant.seasonStart && month <= plant.seasonEnd;
    } else {
      // Handles winter seasons that span across year boundaries
      return month >= plant.seasonStart || month <= plant.seasonEnd;
    }
  });
};

export const getPlantsByDifficulty = (difficulty: Plant['difficulty']): Plant[] => {
  return plants.filter(plant => plant.difficulty === difficulty);
};

export const getPlantsByContainerFriendly = (containerFriendly: boolean): Plant[] => {
  return plants.filter(plant => plant.containerFriendly === containerFriendly);
};

// Recommendations based on user's location and current month
export const getRecommendedPlants = (month: number = new Date().getMonth() + 1): Plant[] => {
  return getPlantsBySeason(month).slice(0, 4);
};
