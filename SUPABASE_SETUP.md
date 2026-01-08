# Supabase Setup Guide for Sandwich Builder Feature

This guide will walk you through setting up Supabase for your Sandwich Builder feature.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up (use GitHub for easiest setup)
3. Once logged in, click "New Project"
4. Fill in the project details:
   - **Name**: Chat & Griddle Sandwiches (or any name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to you
   - **Pricing Plan**: Free tier is perfect to start

## Step 2: Create Database Tables

1. In your Supabase project dashboard, click on the **SQL Editor** in the left sidebar
2. Click "New Query"
3. Copy and paste the following SQL script:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ingredient_categories table
CREATE TABLE ingredient_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES ingredient_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  svg_path TEXT NOT NULL,
  price_modifier DECIMAL(4,2) DEFAULT 0.00,
  is_available BOOLEAN DEFAULT true,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sandwich_submissions table
CREATE TABLE sandwich_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sandwich_name TEXT NOT NULL,
  creator_name TEXT NOT NULL,
  creator_email TEXT,
  description TEXT,
  image_url TEXT,
  is_winner BOOLEAN DEFAULT false,
  winner_month TEXT,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sandwich_ingredients junction table
CREATE TABLE sandwich_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES sandwich_submissions(id) ON DELETE CASCADE,
  ingredient_id UUID REFERENCES ingredients(id) ON DELETE CASCADE,
  layer_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_ingredients_category ON ingredients(category_id);
CREATE INDEX idx_sandwich_ingredients_submission ON sandwich_ingredients(submission_id);
CREATE INDEX idx_sandwich_submissions_winner ON sandwich_submissions(is_winner);
CREATE INDEX idx_sandwich_submissions_month ON sandwich_submissions(winner_month);
```

4. Click "Run" to execute the query

## Step 3: Set Up Row Level Security (RLS)

1. In the SQL Editor, create a new query and paste the following:

```sql
-- Enable RLS on all tables
ALTER TABLE ingredient_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE sandwich_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sandwich_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can read ingredient categories
CREATE POLICY "Anyone can view categories"
  ON ingredient_categories FOR SELECT
  USING (true);

-- Public can read ingredients
CREATE POLICY "Anyone can view ingredients"
  ON ingredients FOR SELECT
  USING (true);

-- Public can view all sandwich submissions
CREATE POLICY "Anyone can view submissions"
  ON sandwich_submissions FOR SELECT
  USING (true);

-- Public can create sandwich submissions
CREATE POLICY "Anyone can create submissions"
  ON sandwich_submissions FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can update submissions (mark as winner)
CREATE POLICY "Only admins can update submissions"
  ON sandwich_submissions FOR UPDATE
  USING (
    auth.uid() IN (SELECT auth.uid() FROM admin_users WHERE auth.uid() = admin_users.id)
  );

-- Public can view sandwich ingredients
CREATE POLICY "Anyone can view sandwich ingredients"
  ON sandwich_ingredients FOR SELECT
  USING (true);

-- Public can create sandwich ingredients
CREATE POLICY "Anyone can create sandwich ingredients"
  ON sandwich_ingredients FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can view admin_users
CREATE POLICY "Authenticated users can view admin users"
  ON admin_users FOR SELECT
  USING (auth.uid() IS NOT NULL);
```

2. Click "Run"

## Step 4: Seed Ingredient Data

1. Create a new query and paste:

```sql
-- Insert ingredient categories
INSERT INTO ingredient_categories (name, display_order) VALUES
  ('Bread', 1),
  ('Proteins', 2),
  ('Cheeses', 3),
  ('Veggies', 4),
  ('Sauces', 5),
  ('Extras', 6);

-- Get category IDs (we'll use these in the next step)
-- Run this to see your category IDs:
SELECT * FROM ingredient_categories ORDER BY display_order;
```

2. Click "Run"
3. Copy the UUIDs for each category (you'll need these for the next step)
4. Create a new query and insert ingredients (replace the UUID placeholders):

```sql
-- Insert bread ingredients (replace 'BREAD_CATEGORY_UUID' with actual UUID)
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('BREAD_CATEGORY_UUID', 'Sourdough', '/ingredients/bread/sourdough.svg', 1, 0),
  ('BREAD_CATEGORY_UUID', 'Ciabatta', '/ingredients/bread/ciabatta.svg', 2, 0),
  ('BREAD_CATEGORY_UUID', 'Kaiser Roll', '/ingredients/bread/roll.svg', 3, 0),
  ('BREAD_CATEGORY_UUID', 'Croissant', '/ingredients/bread/croissant.svg', 4, 0.50),
  ('BREAD_CATEGORY_UUID', 'Whole Wheat', '/ingredients/bread/whole-wheat.svg', 5, 0);

-- Insert protein ingredients (replace 'PROTEINS_CATEGORY_UUID')
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('PROTEINS_CATEGORY_UUID', 'Taylor Ham', '/ingredients/proteins/taylor-ham.svg', 1, 2.00),
  ('PROTEINS_CATEGORY_UUID', 'Bacon', '/ingredients/proteins/bacon.svg', 2, 1.50),
  ('PROTEINS_CATEGORY_UUID', 'Chicken Cutlet', '/ingredients/proteins/chicken-cutlet.svg', 3, 3.00),
  ('PROTEINS_CATEGORY_UUID', 'Turkey', '/ingredients/proteins/turkey.svg', 4, 2.50),
  ('PROTEINS_CATEGORY_UUID', 'Pastrami', '/ingredients/proteins/pastrami.svg', 5, 3.50),
  ('PROTEINS_CATEGORY_UUID', 'Ham', '/ingredients/proteins/ham.svg', 6, 2.00),
  ('PROTEINS_CATEGORY_UUID', 'Roast Beef', '/ingredients/proteins/roast-beef.svg', 7, 3.00);

-- Insert cheese ingredients (replace 'CHEESES_CATEGORY_UUID')
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('CHEESES_CATEGORY_UUID', 'American', '/ingredients/cheeses/american.svg', 1, 0.75),
  ('CHEESES_CATEGORY_UUID', 'Cheddar', '/ingredients/cheeses/cheddar.svg', 2, 0.75),
  ('CHEESES_CATEGORY_UUID', 'Provolone', '/ingredients/cheeses/provolone.svg', 3, 1.00),
  ('CHEESES_CATEGORY_UUID', 'Mozzarella', '/ingredients/cheeses/mozzarella.svg', 4, 1.00),
  ('CHEESES_CATEGORY_UUID', 'Brie', '/ingredients/cheeses/brie.svg', 5, 1.50),
  ('CHEESES_CATEGORY_UUID', 'Swiss', '/ingredients/cheeses/swiss.svg', 6, 1.00);

-- Insert veggie ingredients (replace 'VEGGIES_CATEGORY_UUID')
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('VEGGIES_CATEGORY_UUID', 'Lettuce', '/ingredients/veggies/lettuce.svg', 1, 0),
  ('VEGGIES_CATEGORY_UUID', 'Tomato', '/ingredients/veggies/tomato.svg', 2, 0),
  ('VEGGIES_CATEGORY_UUID', 'Red Onion', '/ingredients/veggies/onion.svg', 3, 0),
  ('VEGGIES_CATEGORY_UUID', 'Pickles', '/ingredients/veggies/pickles.svg', 4, 0),
  ('VEGGIES_CATEGORY_UUID', 'Arugula', '/ingredients/veggies/arugula.svg', 5, 0.50),
  ('VEGGIES_CATEGORY_UUID', 'Avocado', '/ingredients/veggies/avocado.svg', 6, 1.50),
  ('VEGGIES_CATEGORY_UUID', 'Roasted Peppers', '/ingredients/veggies/peppers.svg', 7, 0.75),
  ('VEGGIES_CATEGORY_UUID', 'Cucumber', '/ingredients/veggies/cucumber.svg', 8, 0);

-- Insert sauce ingredients (replace 'SAUCES_CATEGORY_UUID')
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('SAUCES_CATEGORY_UUID', 'Mayo', '/ingredients/sauces/mayo.svg', 1, 0),
  ('SAUCES_CATEGORY_UUID', 'Chat Sauce', '/ingredients/sauces/chat-sauce.svg', 2, 0),
  ('SAUCES_CATEGORY_UUID', 'Chipotle Mayo', '/ingredients/sauces/chipotle-mayo.svg', 3, 0.50),
  ('SAUCES_CATEGORY_UUID', 'Basil Pesto', '/ingredients/sauces/basil-pesto.svg', 4, 0.75),
  ('SAUCES_CATEGORY_UUID', 'Balsamic Glaze', '/ingredients/sauces/balsamic.svg', 5, 0.50),
  ('SAUCES_CATEGORY_UUID', 'Honey Mustard', '/ingredients/sauces/honey-mustard.svg', 6, 0),
  ('SAUCES_CATEGORY_UUID', 'Hot Sauce', '/ingredients/sauces/hot-sauce.svg', 7, 0);

-- Insert extra ingredients (replace 'EXTRAS_CATEGORY_UUID')
INSERT INTO ingredients (category_id, name, svg_path, display_order, price_modifier) VALUES
  ('EXTRAS_CATEGORY_UUID', 'Fried Egg', '/ingredients/extras/fried-egg.svg', 1, 1.50),
  ('EXTRAS_CATEGORY_UUID', 'Hash Brown', '/ingredients/extras/hash-brown.svg', 2, 1.00),
  ('EXTRAS_CATEGORY_UUID', 'Chips', '/ingredients/extras/chips.svg', 3, 1.00),
  ('EXTRAS_CATEGORY_UUID', 'Onion Strings', '/ingredients/extras/onion-strings.svg', 4, 1.25),
  ('EXTRAS_CATEGORY_UUID', 'Jalapeños', '/ingredients/extras/jalapenos.svg', 5, 0.50);
```

5. Replace each `'CATEGORY_UUID'` with the actual UUIDs from step 3, then run the query

## Step 5: Set Up Admin User

1. First, go to **Authentication** → **Users** in the Supabase dashboard
2. Click "Add user" → "Create new user"
3. Enter your admin email and a strong password
4. Click "Create user"
5. Copy the UUID of the user you just created
6. In SQL Editor, run:

```sql
-- Add your admin user (replace with the UUID from the authentication user)
INSERT INTO admin_users (id, email) VALUES
  ('e72f7cda-e7e9-4484-b0e4-497913d4315a', 'aapsantos07@gmail.com');
```

## Step 6: Configure Environment Variables

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the **Project URL** and **anon/public key**
3. Open `.env.local` in your project root
4. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

5. Save the file
6. Restart your dev server:
   ```bash
   npm run dev
   ```

## Step 7: Test the Application

1. Navigate to `http://localhost:8080/sandwich-builder` (or whatever port is shown)
2. Try building a sandwich
3. Submit it with your details
4. Navigate to `/sandwich-gallery` to see your submission
5. Go to `/admin/dashboard` and log in with your admin credentials
6. Try marking a sandwich as "Sandwich of the Month"

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists in the project root
- Verify the variable names start with `VITE_`
- Restart the dev server after changing environment variables

### "Failed to fetch ingredients"
- Check that your Supabase project is active
- Verify the RLS policies were created correctly
- Check that ingredients were inserted successfully

### Admin login not working
- Verify the user was created in Supabase Authentication
- Make sure the user UUID was added to the `admin_users` table
- Check that the email matches exactly

### Submissions not appearing
- Check browser console for errors
- Verify RLS policies allow public INSERT on sandwich_submissions
- Make sure the ingredients were inserted with correct category IDs

## Next Steps

- Customize ingredient prices in the database
- Add more ingredients as needed
- Update the SVG graphics with your own designs
- Configure email notifications (Supabase Auth can send emails)
- Set up image upload for sandwich photos (Supabase Storage)

## Database Management

To view/edit data:
1. Go to **Table Editor** in Supabase dashboard
2. Select any table to view and edit records
3. Use SQL Editor for bulk operations

To backup your database:
1. Go to **Database** → **Backups**
2. Supabase automatically backs up daily on the free tier
3. You can also export tables manually

## Support

If you run into issues:
- Check the Supabase documentation: https://supabase.com/docs
- Review the console errors in your browser's developer tools
- Check the Supabase dashboard logs for database errors
