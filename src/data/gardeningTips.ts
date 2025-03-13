
export interface GardeningTip {
  id: string;
  title: string;
  category: 'watering' | 'pest-control' | 'soil' | 'harvesting' | 'general';
  content: string;
  image?: string;
}

export const gardeningTips: GardeningTip[] = [
  {
    id: '1',
    title: 'Watering in the Morning',
    category: 'watering',
    content: 'Water your plants in the early morning to reduce evaporation and fungal problems. Morning watering gives plants time to dry before evening, which helps prevent diseases that thrive in cool, damp conditions.',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Companion Planting for Pest Control',
    category: 'pest-control',
    content: 'Plant marigolds, nasturtiums, and other companion plants throughout your garden to naturally repel pests. Marigolds deter nematodes and many insects, while nasturtiums can act as trap crops for aphids.',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Homemade Compost Tea',
    category: 'soil',
    content: 'Create compost tea by steeping compost in water for 24-48 hours. This nutrient-rich liquid can be used as a natural fertilizer and disease suppressant when sprayed directly on plants or added to soil.',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Succession Planting',
    category: 'general',
    content: 'Instead of planting all your seeds at once, practice succession planting by sowing small amounts every 2-3 weeks. This ensures a continuous harvest rather than having all your crops mature simultaneously.',
    image: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Natural Slug Deterrents',
    category: 'pest-control',
    content: 'Sprinkle crushed eggshells or diatomaceous earth around vulnerable plants to deter slugs and snails. These materials create sharp barriers that soft-bodied pests avoid crossing.',
    image: '/placeholder.svg'
  },
  {
    id: '6',
    title: 'Harvesting Herbs Correctly',
    category: 'harvesting',
    content: 'When harvesting herbs, cut just above a leaf node or set of leaves to encourage the plant to branch out and produce more foliage. This promotes bushier growth and a more abundant harvest.',
    image: '/placeholder.svg'
  }
];

export const getTipsByCategory = (category: GardeningTip['category']): GardeningTip[] => {
  return gardeningTips.filter(tip => tip.category === category);
};

export const getRandomTips = (count: number = 3): GardeningTip[] => {
  const shuffled = [...gardeningTips].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
