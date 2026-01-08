-- Insert all ingredients with actual category UUIDs
-- Run this in the Supabase SQL Editor

-- Bread ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('992afa8b-ace3-4add-ab39-8220c9293541', 'Sourdough', '/ingredients/bread/sourdough.svg', 1, 0),
  ('992afa8b-ace3-4add-ab39-8220c9293541', 'Ciabatta', '/ingredients/bread/ciabatta.svg', 2, 0),
  ('992afa8b-ace3-4add-ab39-8220c9293541', 'Kaiser Roll', '/ingredients/bread/roll.svg', 3, 0),
  ('992afa8b-ace3-4add-ab39-8220c9293541', 'Croissant', '/ingredients/bread/croissant.svg', 4, 0.50),
  ('992afa8b-ace3-4add-ab39-8220c9293541', 'Whole Wheat', '/ingredients/bread/whole-wheat.svg', 5, 0);

-- Protein ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Taylor Ham', '/ingredients/proteins/taylor-ham.svg', 1, 2.00),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Bacon', '/ingredients/proteins/bacon.svg', 2, 1.50),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Chicken Cutlet', '/ingredients/proteins/chicken-cutlet.svg', 3, 3.00),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Turkey', '/ingredients/proteins/turkey.svg', 4, 2.50),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Pastrami', '/ingredients/proteins/pastrami.svg', 5, 3.50),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Ham', '/ingredients/proteins/ham.svg', 6, 2.00),
  ('fa7fb9d6-8085-45df-ad8e-488b9ce47a1e', 'Roast Beef', '/ingredients/proteins/roast-beef.svg', 7, 3.00);

-- Cheese ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'American', '/ingredients/cheeses/american.svg', 1, 0.75),
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'Cheddar', '/ingredients/cheeses/cheddar.svg', 2, 0.75),
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'Provolone', '/ingredients/cheeses/provolone.svg', 3, 1.00),
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'Mozzarella', '/ingredients/cheeses/mozzarella.svg', 4, 1.00),
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'Brie', '/ingredients/cheeses/brie.svg', 5, 1.50),
  ('2556a9c2-81e3-46da-b4bc-f59a0eae7b15', 'Swiss', '/ingredients/cheeses/swiss.svg', 6, 1.00);

-- Veggie ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Lettuce', '/ingredients/veggies/lettuce.svg', 1, 0),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Tomato', '/ingredients/veggies/tomato.svg', 2, 0),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Red Onion', '/ingredients/veggies/onion.svg', 3, 0),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Pickles', '/ingredients/veggies/pickles.svg', 4, 0),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Arugula', '/ingredients/veggies/arugula.svg', 5, 0.50),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Avocado', '/ingredients/veggies/avocado.svg', 6, 1.50),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Roasted Peppers', '/ingredients/veggies/peppers.svg', 7, 0.75),
  ('e7f6ded7-f465-43ef-90a0-33e15a9c4132', 'Cucumber', '/ingredients/veggies/cucumber.svg', 8, 0);

-- Sauce ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Mayo', '/ingredients/sauces/mayo.svg', 1, 0),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Chat Sauce', '/ingredients/sauces/chat-sauce.svg', 2, 0),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Chipotle Mayo', '/ingredients/sauces/chipotle-mayo.svg', 3, 0.50),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Basil Pesto', '/ingredients/sauces/basil-pesto.svg', 4, 0.75),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Balsamic Glaze', '/ingredients/sauces/balsamic.svg', 5, 0.50),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Honey Mustard', '/ingredients/sauces/honey-mustard.svg', 6, 0),
  ('9d0851d1-748e-417f-b97a-02556da2c620', 'Hot Sauce', '/ingredients/sauces/hot-sauce.svg', 7, 0);

-- Extra ingredients
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('0e45ddbd-b5ce-4762-90e9-3e6eb6ae6a45', 'Fried Egg', '/ingredients/extras/fried-egg.svg', 1, 1.50),
  ('0e45ddbd-b5ce-4762-90e9-3e6eb6ae6a45', 'Hash Brown', '/ingredients/extras/hash-brown.svg', 2, 1.00),
  ('0e45ddbd-b5ce-4762-90e9-3e6eb6ae6a45', 'Chips', '/ingredients/extras/chips.svg', 3, 1.00),
  ('0e45ddbd-b5ce-4762-90e9-3e6eb6ae6a45', 'Onion Strings', '/ingredients/extras/onion-strings.svg', 4, 1.25),
  ('0e45ddbd-b5ce-4762-90e9-3e6eb6ae6a45', 'Jalapeños', '/ingredients/extras/jalapenos.svg', 5, 0.50);

-- Verify the inserts
SELECT
  ic.name as category,
  COUNT(i.id) as ingredient_count
FROM ingredient_categories ic
LEFT JOIN ingredients i ON ic.id = i.category_id
GROUP BY ic.name, ic.display_order
ORDER BY ic.display_order;
