// Seed data for sandwich builder ingredients
// This data structure will be used to populate the Supabase database

export const ingredientCategories = [
  { name: 'Bread', displayOrder: 1 },
  { name: 'Proteins', displayOrder: 2 },
  { name: 'Cheeses', displayOrder: 3 },
  { name: 'Veggies', displayOrder: 4 },
  { name: 'Sauces', displayOrder: 5 },
  { name: 'Extras', displayOrder: 6 },
];

export const ingredientsData = [
  // Bread Category
  {
    category: 'Bread',
    name: 'Sourdough',
    svgPath: '/ingredients/bread/sourdough.svg',
    displayOrder: 1,
    priceModifier: 0
  },
  {
    category: 'Bread',
    name: 'Ciabatta',
    svgPath: '/ingredients/bread/ciabatta.svg',
    displayOrder: 2,
    priceModifier: 0
  },
  {
    category: 'Bread',
    name: 'Kaiser Roll',
    svgPath: '/ingredients/bread/roll.svg',
    displayOrder: 3,
    priceModifier: 0
  },
  {
    category: 'Bread',
    name: 'Croissant',
    svgPath: '/ingredients/bread/croissant.svg',
    displayOrder: 4,
    priceModifier: 0.50
  },
  {
    category: 'Bread',
    name: 'Whole Wheat',
    svgPath: '/ingredients/bread/whole-wheat.svg',
    displayOrder: 5,
    priceModifier: 0
  },

  // Proteins Category
  {
    category: 'Proteins',
    name: 'Taylor Ham',
    svgPath: '/ingredients/proteins/taylor-ham.svg',
    displayOrder: 1,
    priceModifier: 2.00
  },
  {
    category: 'Proteins',
    name: 'Bacon',
    svgPath: '/ingredients/proteins/bacon.svg',
    displayOrder: 2,
    priceModifier: 1.50
  },
  {
    category: 'Proteins',
    name: 'Chicken Cutlet',
    svgPath: '/ingredients/proteins/chicken-cutlet.svg',
    displayOrder: 3,
    priceModifier: 3.00
  },
  {
    category: 'Proteins',
    name: 'Turkey',
    svgPath: '/ingredients/proteins/turkey.svg',
    displayOrder: 4,
    priceModifier: 2.50
  },
  {
    category: 'Proteins',
    name: 'Pastrami',
    svgPath: '/ingredients/proteins/pastrami.svg',
    displayOrder: 5,
    priceModifier: 3.50
  },
  {
    category: 'Proteins',
    name: 'Ham',
    svgPath: '/ingredients/proteins/ham.svg',
    displayOrder: 6,
    priceModifier: 2.00
  },
  {
    category: 'Proteins',
    name: 'Roast Beef',
    svgPath: '/ingredients/proteins/roast-beef.svg',
    displayOrder: 7,
    priceModifier: 3.00
  },

  // Cheeses Category
  {
    category: 'Cheeses',
    name: 'American',
    svgPath: '/ingredients/cheeses/american.svg',
    displayOrder: 1,
    priceModifier: 0.75
  },
  {
    category: 'Cheeses',
    name: 'Cheddar',
    svgPath: '/ingredients/cheeses/cheddar.svg',
    displayOrder: 2,
    priceModifier: 0.75
  },
  {
    category: 'Cheeses',
    name: 'Provolone',
    svgPath: '/ingredients/cheeses/provolone.svg',
    displayOrder: 3,
    priceModifier: 1.00
  },
  {
    category: 'Cheeses',
    name: 'Mozzarella',
    svgPath: '/ingredients/cheeses/mozzarella.svg',
    displayOrder: 4,
    priceModifier: 1.00
  },
  {
    category: 'Cheeses',
    name: 'Brie',
    svgPath: '/ingredients/cheeses/brie.svg',
    displayOrder: 5,
    priceModifier: 1.50
  },
  {
    category: 'Cheeses',
    name: 'Swiss',
    svgPath: '/ingredients/cheeses/swiss.svg',
    displayOrder: 6,
    priceModifier: 1.00
  },

  // Veggies Category
  {
    category: 'Veggies',
    name: 'Lettuce',
    svgPath: '/ingredients/veggies/lettuce.svg',
    displayOrder: 1,
    priceModifier: 0
  },
  {
    category: 'Veggies',
    name: 'Tomato',
    svgPath: '/ingredients/veggies/tomato.svg',
    displayOrder: 2,
    priceModifier: 0
  },
  {
    category: 'Veggies',
    name: 'Red Onion',
    svgPath: '/ingredients/veggies/onion.svg',
    displayOrder: 3,
    priceModifier: 0
  },
  {
    category: 'Veggies',
    name: 'Pickles',
    svgPath: '/ingredients/veggies/pickles.svg',
    displayOrder: 4,
    priceModifier: 0
  },
  {
    category: 'Veggies',
    name: 'Arugula',
    svgPath: '/ingredients/veggies/arugula.svg',
    displayOrder: 5,
    priceModifier: 0.50
  },
  {
    category: 'Veggies',
    name: 'Avocado',
    svgPath: '/ingredients/veggies/avocado.svg',
    displayOrder: 6,
    priceModifier: 1.50
  },
  {
    category: 'Veggies',
    name: 'Roasted Peppers',
    svgPath: '/ingredients/veggies/peppers.svg',
    displayOrder: 7,
    priceModifier: 0.75
  },
  {
    category: 'Veggies',
    name: 'Cucumber',
    svgPath: '/ingredients/veggies/cucumber.svg',
    displayOrder: 8,
    priceModifier: 0
  },

  // Sauces Category
  {
    category: 'Sauces',
    name: 'Mayo',
    svgPath: '/ingredients/sauces/mayo.svg',
    displayOrder: 1,
    priceModifier: 0
  },
  {
    category: 'Sauces',
    name: 'Chat Sauce',
    svgPath: '/ingredients/sauces/chat-sauce.svg',
    displayOrder: 2,
    priceModifier: 0
  },
  {
    category: 'Sauces',
    name: 'Chipotle Mayo',
    svgPath: '/ingredients/sauces/chipotle-mayo.svg',
    displayOrder: 3,
    priceModifier: 0.50
  },
  {
    category: 'Sauces',
    name: 'Basil Pesto',
    svgPath: '/ingredients/sauces/basil-pesto.svg',
    displayOrder: 4,
    priceModifier: 0.75
  },
  {
    category: 'Sauces',
    name: 'Balsamic Glaze',
    svgPath: '/ingredients/sauces/balsamic.svg',
    displayOrder: 5,
    priceModifier: 0.50
  },
  {
    category: 'Sauces',
    name: 'Honey Mustard',
    svgPath: '/ingredients/sauces/honey-mustard.svg',
    displayOrder: 6,
    priceModifier: 0
  },
  {
    category: 'Sauces',
    name: 'Hot Sauce',
    svgPath: '/ingredients/sauces/hot-sauce.svg',
    displayOrder: 7,
    priceModifier: 0
  },

  // Extras Category
  {
    category: 'Extras',
    name: 'Fried Egg',
    svgPath: '/ingredients/extras/fried-egg.svg',
    displayOrder: 1,
    priceModifier: 1.50
  },
  {
    category: 'Extras',
    name: 'Hash Brown',
    svgPath: '/ingredients/extras/hash-brown.svg',
    displayOrder: 2,
    priceModifier: 1.00
  },
  {
    category: 'Extras',
    name: 'Chips',
    svgPath: '/ingredients/extras/chips.svg',
    displayOrder: 3,
    priceModifier: 1.00
  },
  {
    category: 'Extras',
    name: 'Onion Strings',
    svgPath: '/ingredients/extras/onion-strings.svg',
    displayOrder: 4,
    priceModifier: 1.25
  },
  {
    category: 'Extras',
    name: 'Jalapeños',
    svgPath: '/ingredients/extras/jalapenos.svg',
    displayOrder: 5,
    priceModifier: 0.50
  },
];
