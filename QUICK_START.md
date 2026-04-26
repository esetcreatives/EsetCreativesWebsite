# Quick Start Guide - ESET Creatives Website

Get your website up and running in 10 minutes!

## 🚀 Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

This installs all required packages including:
- Vite (build tool)
- Tailwind CSS (styling)
- GSAP (animations)
- Supabase (backend)
- And more...

## 🗄️ Step 2: Set Up Database (5 minutes)

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `ESET Creatives CMS`
   - Password: (create a strong password)
   - Region: (choose closest to you)
4. Click "Create new project"
5. Wait 2-3 minutes for setup

### 2.2 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open `supabase-schema.sql` from your project
4. Copy all contents and paste into SQL Editor
5. Click "Run"
6. You should see "Success. No rows returned"

### 2.3 Create Admin User

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. ✅ Check "Auto Confirm User"
5. Click "Create user"

### 2.4 Get API Credentials

1. Go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (long string under "Project API keys")

## ⚙️ Step 3: Configure Environment (1 minute)

1. Open `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

3. Save the file

## 🎬 Step 4: Run the Website (1 minute)

```bash
npm run dev
```

The website will open at: `http://localhost:3010`

## 🎨 Step 5: Access Admin Panel (1 minute)

1. Navigate to: `http://localhost:3010/admin.html`
2. Login with the credentials you created in Step 2.3
3. You're in! 🎉

## ✅ What You Can Do Now

### In the Admin Panel:

1. **Add Case Studies**
   - Click "+ Add New Case Study"
   - Fill in the form
   - Upload images (use URLs)
   - Add metrics and details
   - Toggle "Published" to show on website

2. **View Contact Submissions**
   - See all form submissions
   - View details of each inquiry

3. **Update Website Settings**
   - Change site title and description
   - Update contact information

### On the Website:

1. **Browse Case Studies**
   - Filter by category
   - Click cards to view details
   - See metrics and results

2. **Submit Contact Form**
   - Fill out the form at bottom
   - Submissions appear in admin panel

3. **Explore Sections**
   - Hero with animations
   - Services grid
   - Methodology
   - Team
   - About

## 🚀 Deploy to Production

When you're ready to go live:

```bash
# Build the site
npm run build

# Deploy to Vercel (recommended)
npm i -g vercel
vercel

# Or deploy to Netlify
# Just drag the 'dist' folder to netlify.com/drop
```

**Important**: Set environment variables in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🎯 Common Tasks

### Add a New Case Study

1. Go to admin panel
2. Click "+ Add New Case Study"
3. Fill in all required fields (marked with *)
4. Add image URL (use Unsplash or your own)
5. Add 3 metrics (ROI + 2 custom)
6. Write Challenge, Solution, Results
7. Check "Published" to make it live
8. Click "Save Case Study"

### Change Website Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  accent: '#bde513',      // Change this
  'brand-mid': '#a0c910', // And this
  'brand-dark': '#022c28', // And this
}
```

### Update Contact Information

1. Go to admin panel
2. Click "Settings" tab
3. Update email and phone
4. Click "Save Settings"

### Add Team Members

Edit `index.html` in the Team section:
```html
<!-- Copy and modify a team member card -->
<div class="group relative w-full md:w-80 h-96 rounded-2xl overflow-hidden fade-up">
  <!-- Update name, role, and links -->
</div>
```

## 🆘 Troubleshooting

### "Invalid API key" error
- Check `.env` file has correct values
- No extra spaces or quotes
- Restart dev server: `Ctrl+C` then `npm run dev`

### Can't login to admin
- Verify user exists in Supabase Authentication
- Check "Auto Confirm User" was enabled
- Try password reset in Supabase

### Case studies not showing
- Check they're marked "Published" in admin
- Verify database connection in browser console
- Check RLS policies in Supabase

### Build errors
```bash
# Clear everything and reinstall
rm -rf node_modules
rm -rf .vite
npm install
npm run dev
```

## 📚 More Help

- **Full Documentation**: See `README.md`
- **CMS Setup**: See `CMS_SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Color Info**: See `COLOR_CONTRAST_REPORT.md`

## 🎉 You're All Set!

Your website is now running with:
- ✅ Modern design with new color scheme
- ✅ Responsive layout
- ✅ Smooth animations
- ✅ Full CMS functionality
- ✅ Contact form
- ✅ Case study management

Start adding your content and make it your own!

---

Need help? Email: esetcreatives@gmail.com
