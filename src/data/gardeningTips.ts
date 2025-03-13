export interface GardeningTip {
  id: string;
  title: string;
  content: string;
  category: 'watering' | 'pest-control' | 'composting' | 'soil-care' | 'general';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export const gardeningTips: GardeningTip[] = [
  {
    id: '1',
    title: 'Water Deeply, Not Frequently',
    content: 'Watering deeply and less frequently encourages deeper root growth. This helps plants become more drought-resistant and reduces water waste.',
    category: 'watering',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Morning Watering',
    content: 'Water your plants in the early morning to reduce evaporation and give leaves time to dry, which helps prevent fungal diseases.',
    category: 'watering',
    difficulty: 'beginner'
  },
  {
    id: '3',
    title: 'Organic Mulch Benefits',
    content: 'Apply a layer of organic mulch around your plants to conserve moisture, suppress weeds, and add nutrients to the soil as it breaks down.',
    category: 'soil-care',
    difficulty: 'beginner'
  },
  {
    id: '4',
    title: 'Companion Planting for Pest Control',
    content: 'Plant aromatic herbs like basil, rosemary, and mint near vegetables to repel pests naturally. Marigolds are also excellent for deterring nematodes.',
    category: 'pest-control',
    difficulty: 'intermediate'
  },
  {
    id: '5',
    title: 'DIY Organic Pest Spray',
    content: 'Make a natural pest spray by mixing 1 tablespoon of mild dish soap with 1 quart of water. Spray on plants affected by aphids, mites, or other soft-bodied insects.',
    category: 'pest-control',
    difficulty: 'beginner'
  },
  {
    id: '6',
    title: 'Coffee Grounds in Compost',
    content: 'Add used coffee grounds to your compost pile. They're rich in nitrogen and help create high-quality compost for your garden.',
    category: 'composting',
    difficulty: 'beginner'
  },
  {
    id: '7',
    title: 'Balance Your Compost',
    content: 'Maintain a balance of "green" (nitrogen-rich) and "brown" (carbon-rich) materials in your compost. Aim for roughly 1 part green to 3 parts brown materials.',
    category: 'composting',
    difficulty: 'intermediate'
  },
  {
    id: '8',
    title: 'Soil pH Testing',
    content: 'Test your soil's pH before planting. Most vegetables prefer a slightly acidic soil with a pH between 6.0 and 7.0. Adjust as needed with lime (to raise pH) or sulfur (to lower pH).',
    category: 'soil-care',
    difficulty: 'intermediate'
  },
  {
    id: '9',
    title: 'Crop Rotation',
    content: 'Practice crop rotation by not planting the same type of vegetable in the same spot year after year. This helps prevent pest and disease buildup in the soil.',
    category: 'general',
    difficulty: 'intermediate'
  },
  {
    id: '10',
    title: 'Catch Rainwater',
    content: 'Set up a rain barrel to collect rainwater for your garden. Rainwater is free from chlorine and other chemicals found in tap water.',
    category: 'watering',
    difficulty: 'intermediate'
  }
];

// Get random gardening tips
export const getRandomTips = (count: number = 3, preferredCategory?: string): GardeningTip[] => {
  let filteredTips = [...gardeningTips];
  
  // If a preferred category is provided, try to find tips in that category first
  if (preferredCategory) {
    const categoryTips = gardeningTips.filter(tip => 
      tip.category === preferredCategory.toLowerCase().replace(' ', '-') as GardeningTip['category']
    );
    
    // If we have enough tips in the preferred category, use those
    if (categoryTips.length >= count) {
      filteredTips = categoryTips;
    }
    // Otherwise, we'll fall back to all tips
  }
  
  // Shuffle the array and take the first 'count' items
  return [...filteredTips]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

// Get tips by category
export const getTipsByCategory = (category: GardeningTip['category']): GardeningTip[] => {
  return gardeningTips.filter(tip => tip.category === category);
};

// Get tip by ID
export const getTipById = (id: string): GardeningTip | undefined => {
  return gardeningTips.find(tip => tip.id === id);
};
