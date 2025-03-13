
export interface GardeningTechnique {
  id: string;
  title: string;
  category: 'container' | 'vertical' | 'hydroponics' | 'raised-bed' | 'indoor';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  benefits: string[];
  materials: string[];
  steps: string[];
  tips: string[];
  image?: string;
}

export const gardeningTechniques: GardeningTechnique[] = [
  {
    id: '1',
    title: 'Container Gardening',
    category: 'container',
    difficulty: 'beginner',
    description: 'Growing plants in containers is perfect for small spaces like balconies, patios, or even windowsills. Almost any vegetable, herb, or flower can be grown in a container with the right care.',
    benefits: [
      'Perfect for limited space',
      'Portable - can move plants as needed',
      'Better control over soil quality',
      'Fewer problems with ground-dwelling pests'
    ],
    materials: [
      'Containers with drainage holes',
      'Quality potting mix (not garden soil)',
      'Plants or seeds suitable for containers',
      'Watering can or hose with gentle spray',
      'Liquid organic fertilizer'
    ],
    steps: [
      'Select containers at least 6-12 inches deep with drainage holes',
      'Fill containers with high-quality potting mix, leaving 1-2 inches of space at top',
      'Plant seeds at depth recommended on packet, or transplant seedlings',
      'Water thoroughly until water drains from bottom',
      'Place in appropriate light conditions based on plant requirements',
      'Check moisture levels daily - container plants dry out faster than garden beds'
    ],
    tips: [
      'Use larger containers for better moisture retention',
      'Group containers for humidity and easier watering',
      'Consider self-watering containers for consistent moisture',
      'Fertilize regularly as nutrients deplete faster in containers',
      'Rotate containers occasionally for even growth if light comes from one direction'
    ],
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Vertical Gardening',
    category: 'vertical',
    difficulty: 'intermediate',
    description: 'Vertical gardening maximizes growing space by training plants to grow upward on supports, or by using vertical structures with multiple planting pockets or containers.',
    benefits: [
      'Maximizes limited ground space',
      'Improves air circulation around plants',
      'Reduces certain pest and disease problems',
      'Makes harvesting easier',
      'Creates visual interest and can act as a privacy screen'
    ],
    materials: [
      'Trellises, cages, stakes, or vertical growing systems',
      'Plant ties or soft twine',
      'Container or garden bed for planting',
      'Appropriate soil for chosen plants',
      'Climbing or vining plants (or plants suitable for vertical systems)'
    ],
    steps: [
      'Install your vertical support before planting to avoid root damage',
      'Ensure support is sturdy enough to hold plants when fully grown and bearing produce',
      'Plant climbing varieties at the base of supports',
      'Train young plants by gently tying stems to support',
      'For pocket or container vertical systems, plant appropriate sized plants in each section',
      'Check ties regularly to prevent stem damage as plants grow'
    ],
    tips: [
      'Choose appropriate plants: peas, beans, cucumbers, tomatoes, and small squash grow well vertically',
      'Consider the weight of mature plants when building or buying supports',
      'In pocket systems, place plants that need less water at the top, thirstier plants at bottom',
      'South-facing vertical gardens receive the most sun (in Northern Hemisphere)',
      'Use vertical gardens on walls to provide insulation and reduce energy costs'
    ],
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Indoor Herb Garden',
    category: 'indoor',
    difficulty: 'beginner',
    description: 'Growing herbs indoors provides fresh flavors year-round and is one of the easiest ways to start gardening in limited space.',
    benefits: [
      'Fresh herbs available year-round',
      'No outdoor space required',
      'Adds beauty and fresh scents to your home',
      'Most culinary herbs are easy to grow',
      'Saves money compared to buying fresh herbs'
    ],
    materials: [
      'Containers with drainage holes (4-6 inches deep minimum)',
      'Saucers to catch water',
      'Quality potting mix',
      'Herb seeds or seedlings',
      'Sunny windowsill or grow light'
    ],
    steps: [
      'Select a location that receives at least 6 hours of sunlight daily (usually south or west-facing windows)',
      'Fill containers with potting mix, leaving 1/2 inch space at top',
      'Plant seeds according to package directions or transplant seedlings',
      'Water thoroughly until water drains from bottom',
      'Place containers on saucers in your selected location',
      'Allow soil to dry slightly between waterings'
    ],
    tips: [
      'Basil, chives, mint, parsley, and rosemary are great starter herbs',
      'Rotate plants regularly for even growth if light comes from one direction',
      'Harvest herbs regularly to encourage bushier growth',
      'If using grow lights, keep them 6-12 inches from plants for 12-16 hours daily',
      'Group herbs with similar water needs together',
      'Avoid placing herbs near cold drafts or heating vents'
    ],
    image: '/placeholder.svg'
  }
];

export const getTechniquesByCategory = (category: GardeningTechnique['category']): GardeningTechnique[] => {
  return gardeningTechniques.filter(technique => technique.category === category);
};

export const getTechniquesByDifficulty = (difficulty: GardeningTechnique['difficulty']): GardeningTechnique[] => {
  return gardeningTechniques.filter(technique => technique.difficulty === difficulty);
};
