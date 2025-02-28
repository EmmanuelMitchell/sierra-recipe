import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Cassava Leaf Soup',
    category: 'Main Course',
    ingredients: [
      '2 lbs cassava leaves, finely ground',
      '1 lb beef or chicken, cut into small pieces',
      '1 cup palm oil',
      '2 onions, chopped',
      '3 hot peppers, chopped',
      '1/4 cup dried fish or stockfish',
      '1/4 cup dried shrimp',
      '2 Maggi cubes',
      'Salt to taste'
    ],
    instructions: [
      'Wash and clean the meat, then season with salt and one Maggi cube.',
      'In a large pot, heat palm oil and sauté onions until translucent.',
      'Add meat and cook until browned on all sides.',
      'Add the ground cassava leaves and stir well.',
      'Add enough water to cover the mixture and bring to a boil.',
      'Add dried fish, dried shrimp, remaining Maggi cube, and hot peppers.',
      'Reduce heat and simmer for 1-2 hours, stirring occasionally until oil rises to the top.',
      'Serve hot with rice.'
    ],
    prepTime: 30,
    cookTime: 120,
    servings: 6,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-01-15',
    approved: true,
    approvalVotes: {
      upvotes: 45,
      downvotes: 5
    },
    ratings: {
      average: 4.8,
      count: 24
    },
    comments: [
      {
        id: 'c1',
        userId: 'u2',
        username: 'MariamJ',
        text: 'This recipe reminds me of my grandmother\'s cooking. Authentic and delicious!',
        date: '2023-02-10'
      }
    ]
  },
  {
    id: '2',
    name: 'Jollof Rice',
    category: 'Main Course',
    ingredients: [
      '3 cups long grain rice',
      '1 can tomato paste',
      '4 fresh tomatoes',
      '2 onions',
      '4 cloves garlic',
      '1 inch ginger',
      '2 bell peppers',
      '1/4 cup vegetable oil',
      '2 Maggi cubes',
      '1 tsp thyme',
      '1 tsp curry powder',
      'Salt to taste',
      'Scotch bonnet pepper (to taste)',
      '4 cups chicken stock'
    ],
    instructions: [
      'Blend tomatoes, one onion, garlic, ginger, and scotch bonnet pepper.',
      'Heat oil in a large pot and sauté the remaining chopped onion until translucent.',
      'Add tomato paste and fry for 2-3 minutes.',
      'Pour in the blended mixture and cook for 10-15 minutes until reduced.',
      'Add thyme, curry powder, Maggi cubes, and salt.',
      'Wash rice thoroughly and add to the pot.',
      'Pour in chicken stock, stir, and bring to a boil.',
      'Reduce heat, cover, and simmer for 20-25 minutes until rice is cooked.',
      'Fluff with a fork and serve hot.'
    ],
    prepTime: 20,
    cookTime: 45,
    servings: 8,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-01-20',
    approved: true,
    approvalVotes: {
      upvotes: 38,
      downvotes: 2
    },
    ratings: {
      average: 4.9,
      count: 18
    },
    comments: []
  },
  {
    id: '3',
    name: 'Groundnut Stew',
    category: 'Main Course',
    ingredients: [
      '1 lb chicken or beef, cut into pieces',
      '1 cup natural peanut butter (unsweetened)',
      '2 onions, chopped',
      '3 tomatoes, chopped',
      '2 bell peppers, chopped',
      '2 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 Maggi cubes',
      '1/4 cup palm oil',
      'Hot pepper to taste',
      'Salt to taste',
      '4 cups water or chicken stock'
    ],
    instructions: [
      'Season meat with salt and one Maggi cube, then brown in palm oil.',
      'Add onions, garlic, and ginger, and sauté until fragrant.',
      'Add tomatoes and bell peppers, and cook until soft.',
      'Dissolve peanut butter in 1 cup of warm water and add to the pot.',
      'Add remaining water or stock, remaining Maggi cube, and hot pepper.',
      'Bring to a boil, then reduce heat and simmer for 45-60 minutes until meat is tender and stew thickens.',
      'Serve hot with rice or fufu.'
    ],
    prepTime: 15,
    cookTime: 60,
    servings: 6,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-01-25',
    approved: true,
    approvalVotes: {
      upvotes: 32,
      downvotes: 3
    },
    ratings: {
      average: 4.7,
      count: 15
    },
    comments: []
  },
  {
    id: '4',
    name: 'Okra Soup',
    category: 'Soup',
    ingredients: [
      '2 lbs fresh okra, sliced',
      '1 lb beef or fish',
      '1/2 cup palm oil',
      '2 onions, chopped',
      '2 Maggi cubes',
      '1/4 cup dried fish',
      '1/4 cup dried shrimp',
      'Hot pepper to taste',
      'Salt to taste'
    ],
    instructions: [
      'Season meat with salt and one Maggi cube, then cook until tender.',
      'In a separate pot, heat palm oil and sauté onions.',
      'Add sliced okra and stir-fry for 5 minutes.',
      'Add cooked meat, dried fish, dried shrimp, remaining Maggi cube, and hot pepper.',
      'Add a little water if necessary and simmer for 15-20 minutes.',
      'Serve hot with rice or fufu.'
    ],
    prepTime: 15,
    cookTime: 40,
    servings: 6,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1599020792689-9fde458e7e17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-01',
    approved: true,
    approvalVotes: {
      upvotes: 28,
      downvotes: 2
    },
    ratings: {
      average: 4.6,
      count: 12
    },
    comments: []
  },
  {
    id: '5',
    name: 'Pepper Soup',
    category: 'Soup',
    ingredients: [
      '2 lbs goat meat or fish, cut into pieces',
      '2 onions, chopped',
      '3 cloves garlic, minced',
      '1 inch ginger, grated',
      '2 Maggi cubes',
      '1 tbsp pepper soup spice',
      'Hot pepper to taste',
      'Salt to taste',
      '6 cups water'
    ],
    instructions: [
      'Wash meat or fish thoroughly and place in a pot.',
      'Add onions, garlic, ginger, Maggi cubes, pepper soup spice, hot pepper, and salt.',
      'Pour in water and bring to a boil.',
      'Reduce heat and simmer for 45-60 minutes until meat is tender.',
      'Adjust seasoning to taste.',
      'Serve hot as an appetizer or with rice.'
    ],
    prepTime: 10,
    cookTime: 60,
    servings: 6,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1583608564770-462a84a0a1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-05',
    approved: true,
    approvalVotes: {
      upvotes: 25,
      downvotes: 1
    },
    ratings: {
      average: 4.8,
      count: 10
    },
    comments: []
  },
  {
    id: '6',
    name: 'Fufu and Soup',
    category: 'Main Course',
    ingredients: [
      '4 cups cassava flour',
      '2 cups water',
      'Soup of choice (cassava leaf, groundnut, okra, etc.)'
    ],
    instructions: [
      'Boil water in a large pot.',
      'Gradually add cassava flour while stirring continuously to avoid lumps.',
      'Continue stirring until the mixture becomes thick and smooth.',
      'Reduce heat and cook for 5-10 minutes, stirring occasionally.',
      'Shape into balls and serve with soup of choice.'
    ],
    prepTime: 5,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1604329756574-bda01e1a3fed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-10',
    approved: true,
    approvalVotes: {
      upvotes: 30,
      downvotes: 0
    },
    ratings: {
      average: 4.9,
      count: 14
    },
    comments: []
  },
  {
    id: '7',
    name: 'Binch (Beans Stew)',
    category: 'Main Course',
    ingredients: [
      '2 cups black-eyed peas',
      '1/4 cup palm oil',
      '2 onions, chopped',
      '3 tomatoes, chopped',
      '2 bell peppers, chopped',
      '2 Maggi cubes',
      'Hot pepper to taste',
      'Salt to taste'
    ],
    instructions: [
      'Soak beans overnight, then rinse thoroughly.',
      'Cook beans in water until tender, about 45-60 minutes.',
      'In a separate pan, heat palm oil and sauté onions until translucent.',
      'Add tomatoes, bell peppers, Maggi cubes, hot pepper, and salt.',
      'Cook until vegetables are soft and oil rises to the top.',
      'Add cooked beans and simmer for 15-20 minutes.',
      'Serve hot with rice or bread.'
    ],
    prepTime: 480, // Including soaking time
    cookTime: 80,
    servings: 6,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-15',
    approved: true,
    approvalVotes: {
      upvotes: 22,
      downvotes: 3
    },
    ratings: {
      average: 4.5,
      count: 8
    },
    comments: []
  },
  {
    id: '8',
    name: 'Akara (Bean Cakes)',
    category: 'Snack',
    ingredients: [
      '2 cups black-eyed peas',
      '1 onion, finely chopped',
      '1 hot pepper, finely chopped (optional)',
      'Salt to taste',
      'Vegetable oil for frying'
    ],
    instructions: [
      'Soak beans for 2-3 hours, then remove the skins by rubbing between your hands.',
      'Blend beans with a little water to form a thick paste.',
      'Add chopped onions, hot pepper, and salt to the paste and mix well.',
      'Heat oil in a deep pan.',
      'Drop spoonfuls of the mixture into the hot oil and fry until golden brown on both sides.',
      'Remove and drain on paper towels.',
      'Serve hot as a snack or breakfast.'
    ],
    prepTime: 180, // Including soaking time
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-20',
    approved: true,
    approvalVotes: {
      upvotes: 18,
      downvotes: 2
    },
    ratings: {
      average: 4.6,
      count: 7
    },
    comments: []
  },
  {
    id: '9',
    name: 'Plasas (Sweet Potato Leaf Stew)',
    category: 'Main Course',
    ingredients: [
      '2 lbs sweet potato leaves, finely chopped',
      '1 lb beef or fish',
      '1/4 cup palm oil',
      '2 onions, chopped',
      '2 Maggi cubes',
      '1/4 cup dried fish',
      'Hot pepper to taste',
      'Salt to taste'
    ],
    instructions: [
      'Season meat with salt and one Maggi cube, then cook until tender.',
      'In a large pot, heat palm oil and sauté onions until translucent.',
      'Add sweet potato leaves and stir well.',
      'Add cooked meat, dried fish, remaining Maggi cube, hot pepper, and salt.',
      'Add a little water if necessary and simmer for 30-40 minutes.',
      'Serve hot with rice or fufu.'
    ],
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-02-25',
    approved: true,
    approvalVotes: {
      upvotes: 20,
      downvotes: 1
    },
    ratings: {
      average: 4.7,
      count: 9
    },
    comments: []
  },
  {
    id: '10',
    name: 'Coconut Rice',
    category: 'Main Course',
    ingredients: [
      '3 cups long grain rice',
      '2 cups coconut milk',
      '2 cups water',
      '1 onion, chopped',
      '2 cloves garlic, minced',
      '1 bell pepper, chopped',
      '2 Maggi cubes',
      '1 tsp thyme',
      'Salt to taste',
      '2 tbsp vegetable oil'
    ],
    instructions: [
      'Wash rice thoroughly and set aside.',
      'In a large pot, heat oil and sauté onions and garlic until fragrant.',
      'Add bell pepper and cook for 2-3 minutes.',
      'Add rice and stir to coat with oil.',
      'Pour in coconut milk, water, Maggi cubes, thyme, and salt.',
      'Bring to a boil, then reduce heat, cover, and simmer for 20-25 minutes until rice is cooked.',
      'Fluff with a fork and serve hot.'
    ],
    prepTime: 10,
    cookTime: 30,
    servings: 6,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'Admin',
    dateSubmitted: '2023-03-01',
    approved: true,
    approvalVotes: {
      upvotes: 24,
      downvotes: 1
    },
    ratings: {
      average: 4.8,
      count: 11
    },
    comments: []
  }
];

export const pendingRecipes: Recipe[] = [
  {
    id: 'p1',
    name: 'Potato Leaf Stew',
    category: 'Main Course',
    ingredients: [
      '2 lbs potato leaves, finely chopped',
      '1 lb beef, cut into small pieces',
      '1/2 cup palm oil',
      '2 onions, chopped',
      '2 Maggi cubes',
      '1/4 cup dried fish',
      'Hot pepper to taste',
      'Salt to taste'
    ],
    instructions: [
      'Season beef with salt and one Maggi cube, then cook until tender.',
      'In a large pot, heat palm oil and sauté onions until translucent.',
      'Add potato leaves and stir well.',
      'Add cooked beef, dried fish, remaining Maggi cube, hot pepper, and salt.',
      'Add a little water if necessary and simmer for 30-40 minutes.',
      'Serve hot with rice or fufu.'
    ],
    prepTime: 20,
    cookTime: 60,
    servings: 6,
    difficulty: 'Medium',
    imageUrl: 'https://images.unsplash.com/photo-1564894809611-1742fc40ed80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'JohnD',
    dateSubmitted: '2023-03-10',
    approved: false,
    approvalVotes: {
      upvotes: 12,
      downvotes: 3
    },
    ratings: {
      average: 0,
      count: 0
    },
    comments: []
  },
  {
    id: 'p2',
    name: 'Ginger Beer',
    category: 'Beverage',
    ingredients: [
      '1/2 lb fresh ginger, peeled and grated',
      '2 cups sugar',
      '1 lemon, juiced',
      '1 gallon water',
      '1/4 tsp active dry yeast (optional for fermentation)'
    ],
    instructions: [
      'In a large pot, bring water to a boil.',
      'Add grated ginger and boil for 10-15 minutes.',
      'Remove from heat and add sugar, stirring until dissolved.',
      'Add lemon juice and stir well.',
      'Allow to cool to room temperature.',
      'If fermenting, add yeast when mixture is lukewarm.',
      'Strain the mixture and bottle.',
      'If fermenting, leave at room temperature for 24-48 hours, then refrigerate.',
      'If not fermenting, refrigerate immediately.',
      'Serve cold.'
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 16,
    difficulty: 'Easy',
    imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    submittedBy: 'SarahM',
    dateSubmitted: '2023-03-15',
    approved: false,
    approvalVotes: {
      upvotes: 8,
      downvotes: 1
    },
    ratings: {
      average: 0,
      count: 0
    },
    comments: []
  }
];