
export interface CompostingMethod {
  id: string;
  title: string;
  type: 'traditional' | 'vermicomposting' | 'bokashi' | 'trench' | 'tumbler';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  spaceRequired: 'small' | 'medium' | 'large';
  indoorSuitable: boolean;
  description: string;
  materials: string[];
  steps: string[];
  tips: string[];
  image?: string;
}

export const compostingMethods: CompostingMethod[] = [
  {
    id: '1',
    title: 'Kitchen Counter Compost Bin',
    type: 'bokashi',
    difficulty: 'beginner',
    spaceRequired: 'small',
    indoorSuitable: true,
    description: 'Bokashi composting uses an anaerobic fermentation process to break down all food waste, including meat and dairy. It\'s perfect for small spaces and apartments.',
    materials: [
      'Bokashi bucket with spigot',
      'Bokashi bran (inoculated with effective microorganisms)',
      'Kitchen scraps (can include meat, dairy, and citrus)',
      'Spray bottle with diluted molasses (optional)',
    ],
    steps: [
      'Add a layer of bokashi bran to the bottom of the bucket',
      'Add a layer of food waste (chopped into small pieces)',
      'Sprinkle another layer of bokashi bran',
      'Press down firmly to remove air pockets',
      'Keep lid tightly closed between additions',
      'Drain liquid every 2-3 days and use as fertilizer (diluted 1:100 with water)',
      'When full, let ferment for 2 weeks, then bury in soil or add to traditional compost'
    ],
    tips: [
      'Keep bucket in a convenient location like under the sink',
      'Chop large food scraps into smaller pieces for faster fermentation',
      'The process shouldn\'t smell bad - if it does, add more bokashi bran',
      'Fermented bokashi material needs to be buried or further composted to complete the process',
      'Use the liquid fertilizer promptly after draining'
    ],
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Worm Composting Bin',
    type: 'vermicomposting',
    difficulty: 'intermediate',
    spaceRequired: 'small',
    indoorSuitable: true,
    description: 'Vermicomposting uses special composting worms to quickly break down food scraps. It produces rich worm castings, which are an excellent natural fertilizer.',
    materials: [
      'Worm bin (can be purchased or homemade)',
      'Red wiggler worms (Eisenia fetida)',
      'Bedding (shredded newspaper, cardboard, or coco coir)',
      'Kitchen scraps (no meat, dairy, citrus, or alliums)',
      'Spray bottle with water'
    ],
    steps: [
      'Prepare bedding by moistening shredded paper/cardboard to the dampness of a wrung-out sponge',
      'Fill bin about 3/4 full with bedding',
      'Add worms to the bedding and let them acclimate for a day before adding food',
      'Bury small amounts of food waste in a different spot each time',
      'Cover with a breathable lid or damp cloth',
      'Harvest castings when bin is mostly dark material (2-3 months)'
    ],
    tips: [
      'Keep bin in a location between 55-77°F (13-25°C)',
      'Don\'t overfeed - start with small amounts and increase as worm population grows',
      'If bin smells bad, you\'re probably overfeeding or it\'s too wet',
      'Avoid fruit flies by burying food completely in bedding',
      'Add a layer of fresh bedding every few weeks',
      'To harvest, move contents to one side and add fresh bedding to empty side with food; worms will migrate'
    ],
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Balcony Compost Tumbler',
    type: 'tumbler',
    difficulty: 'beginner',
    spaceRequired: 'medium',
    indoorSuitable: false,
    description: 'A compost tumbler is a fully enclosed system that can be rotated for easy mixing. It\'s faster than traditional composting and is suitable for balconies and small outdoor spaces.',
    materials: [
      'Compost tumbler',
      'Brown materials (dry leaves, paper, cardboard)',
      'Green materials (food scraps, coffee grounds, fresh plant trimmings)',
      'Compost accelerator (optional)'
    ],
    steps: [
      'Assemble your compost tumbler according to manufacturer instructions',
      'Start with a layer of brown materials',
      'Add green materials in roughly equal amounts',
      'Add a shovelful of garden soil or compost accelerator to introduce microorganisms',
      'Keep moisture level similar to a wrung-out sponge',
      'Rotate tumbler every 2-3 days to mix contents',
      'Compost should be ready in 4-8 weeks, depending on conditions'
    ],
    tips: [
      'Position in a spot that gets some sun to speed up the process',
      'Chop or shred materials for faster decomposition',
      'If contents are too wet, add more brown materials',
      'If decomposition seems slow, check moisture and add green materials',
      'In cold weather, insulate tumbler or expect slower processing',
      'When nearly full, stop adding materials and allow current batch to finish'
    ],
    image: '/placeholder.svg'
  }
];

export const getCompostingMethodsBySpace = (spaceRequired: CompostingMethod['spaceRequired']): CompostingMethod[] => {
  return compostingMethods.filter(method => method.spaceRequired === spaceRequired);
};

export const getCompostingMethodsByIndoorSuitability = (indoorSuitable: boolean): CompostingMethod[] => {
  return compostingMethods.filter(method => method.indoorSuitable === indoorSuitable);
};

export const getCompostingMethodsByDifficulty = (difficulty: CompostingMethod['difficulty']): CompostingMethod[] => {
  return compostingMethods.filter(method => method.difficulty === difficulty);
};
