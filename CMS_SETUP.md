# ESET Creatives CMS Setup Guide

## Overview
This CMS is built with Supabase (PostgreSQL database + Authentication) and provides a complete content management system for the ESET Creatives website.

## Features
- ✅ Case Study Management (Create, Read, Update, Delete)
- ✅ Contact Form Submissions Management
- ✅ Website Settings Management
- ✅ User Authentication
- ✅ Row Level Security (RLS)
- ✅ Real-time Updates

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project Name**: ESET Creatives CMS
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

### 2. Configure Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste into the SQL Editor
5. Click "Run" to execute the schema

This will create:
- `case_studies` table
- `contact_submissions` table
- `site_settings` table
- All necessary indexes and security policies

### 3. Create Admin User

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter:
   - **Email**: your-admin@email.com
   - **Password**: (create a strong password)
   - **Auto Confirm User**: ✅ (check this)
4. Click "Create user"

### 4. Get API Credentials

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 5. Configure Environment Variables

1. Open `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 6. Install Dependencies & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3010`

### 7. Access Admin Panel

1. Navigate to `http://localhost:3010/admin.html`
2. Login with the admin credentials you created in Step 3
3. You can now:
   - Add/Edit/Delete case studies
   - View contact form submissions
   - Update website settings

## Database Tables

### case_studies
- `id` - Auto-incrementing ID
- `title` - Case study title
- `category` - Primary category (development, identity, social, production)
- `tags` - Array of tags
- `description` - Short description
- `image` - Image URL
- `metrics` - JSON object with metrics (roi, conversion, etc.)
- `challenge` - The challenge section
- `solution` - The solution section
- `results` - The results section
- `published` - Boolean (show on website or not)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### contact_submissions
- `id` - Auto-incrementing ID
- `name` - Contact name
- `email` - Contact email
- `budget` - Selected budget range
- `message` - Contact message
- `created_at` - Timestamp

### site_settings
- `id` - Always 1 (single row)
- `site_title` - Website title
- `site_description` - Website description
- `contact_email` - Contact email
- `contact_phone` - Contact phone
- `updated_at` - Timestamp

## Security

### Row Level Security (RLS)
All tables have RLS enabled with the following policies:

**case_studies**:
- Public can view published case studies
- Authenticated users can do everything

**contact_submissions**:
- Anyone can insert (for contact form)
- Authenticated users can view all submissions

**site_settings**:
- Public can view settings
- Authenticated users can update settings

## Color Changes Applied

All instances of `#589d0e` have been replaced with `#bde513`:
- ✅ Tailwind config
- ✅ CSS files
- ✅ JavaScript particle effects
- ✅ All accent colors throughout the site

## Design Changes Applied

### Services Section
- ✅ Removed horizontal scroll
- ✅ Redesigned as a responsive grid layout
- ✅ Added feature lists to each service card
- ✅ Improved hover effects

### Case Study Cards
- ✅ Removed hover preview element
- ✅ Redesigned with professional card layout
- ✅ Added metrics display on cards
- ✅ Improved modal design for case study details
- ✅ Added "View Case Study" button

### About Section
- ✅ Complete redesign with modern layout
- ✅ Added stats grid (4 key metrics)
- ✅ Split content into problem/solution/differentiators
- ✅ Added values section
- ✅ Improved visual hierarchy

## Deployment

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist` folder.

### Deploy to Hosting

You can deploy to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag & drop the `dist` folder
- **Your own server**: Upload `dist` folder contents

### Environment Variables in Production

Make sure to set these environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env` file has the correct Supabase URL and anon key
- Make sure there are no extra spaces or quotes
- Restart the dev server after changing `.env`

### Can't login to admin panel
- Verify the user was created in Supabase Authentication
- Make sure "Auto Confirm User" was checked
- Check browser console for error messages

### Case studies not showing
- Check if they're marked as "Published" in the admin panel
- Verify RLS policies are set up correctly
- Check browser console for errors

### Contact form not working
- Verify the `contact_submissions` table exists
- Check RLS policies allow public inserts
- Check browser console for errors

## Support

For issues or questions:
- Email: esetcreatives@gmail.com
- Check Supabase documentation: https://supabase.com/docs

## Next Steps

1. Add your own case studies through the admin panel
2. Customize the website content
3. Add your own images
4. Configure email notifications for contact form submissions (Supabase Edge Functions)
5. Set up analytics (Google Analytics, Plausible, etc.)
