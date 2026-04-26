# ESET Creatives Website

A modern, high-performance website for ESET Creatives - an e-commerce growth agency specializing in creative services and digital transformation.

## 🎨 Recent Updates

### Color Scheme Update
- **Old Color**: `#589d0e` (dark green)
- **New Color**: `#bde513` (bright lime green)
- All accent colors, particles, and UI elements updated throughout the site

### Design Improvements

#### Services Section
- ✅ Removed horizontal scroll
- ✅ Redesigned as responsive grid layout
- ✅ Added detailed feature lists for each service
- ✅ Improved card hover effects and animations

#### Case Study Cards
- ✅ Removed hover preview element
- ✅ Professional card design with metrics display
- ✅ Enhanced modal for detailed case study view
- ✅ Better visual hierarchy and readability

#### About Section
- ✅ Complete redesign with modern layout
- ✅ Stats grid showcasing key metrics
- ✅ Problem/Solution/Differentiators structure
- ✅ Values section highlighting company principles
- ✅ Improved visual elements and spacing

### CMS Implementation
- ✅ Full-featured Content Management System
- ✅ Supabase backend with PostgreSQL
- ✅ Admin panel for managing case studies
- ✅ Contact form submissions management
- ✅ Website settings management
- ✅ Row Level Security (RLS) for data protection

## 🚀 Features

- **Cinematic Entrance Animation**: Engaging brand reveal with particle effects
- **Smooth Scrolling**: Lenis smooth scroll for buttery navigation
- **GSAP Animations**: Professional scroll-triggered animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Content**: Case studies loaded from Supabase CMS
- **Contact Form**: Integrated with database for lead capture
- **Admin Panel**: Full CMS for content management

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Lenis Smooth Scroll, SplitType
- **Backend**: Supabase (PostgreSQL + Authentication)
- **Build Tool**: Vite
- **Deployment**: Static hosting ready

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd EsetCreativesWebsite
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Supabase credentials
# VITE_SUPABASE_URL=https://your-project-id.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

4. **Set up Supabase database**
- Follow the instructions in `CMS_SETUP.md`
- Run the SQL schema from `supabase-schema.sql`

5. **Run development server**
```bash
npm run dev
```

The site will be available at `http://localhost:3010`

## 🎯 Project Structure

```
├── index.html              # Main website
├── admin.html              # CMS admin panel
├── src/
│   ├── main.js            # Main website JavaScript
│   ├── admin.js           # Admin panel JavaScript
│   └── style.css          # Global styles
├── public/                 # Static assets
├── supabase-schema.sql    # Database schema
├── CMS_SETUP.md           # CMS setup guide
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## 🎨 Color Palette

- **Accent**: `#bde513` (Bright Lime Green)
- **Brand Mid**: `#a0c910` (Medium Green)
- **Brand Dark**: `#022c28` (Dark Teal)
- **Slate Shades**: Various slate colors for text and backgrounds

## 📱 Sections

1. **Hero**: Eye-catching introduction with animated elements
2. **Services**: Four core services in grid layout
3. **Methodology**: Three-step process (Strategy, Creation, Optimization)
4. **Case Studies**: Filterable portfolio with detailed modals
5. **Team**: Leadership team showcase
6. **About**: Company story and values
7. **Contact**: Lead capture form with budget selection

## 🔐 Admin Panel

Access the admin panel at `/admin.html`

**Features**:
- Case study management (CRUD operations)
- Contact submissions viewer
- Website settings editor
- Secure authentication

**Default Admin Setup**:
1. Create admin user in Supabase Authentication
2. Login with credentials at `/admin.html`
3. Manage all website content

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates optimized files in the `dist` folder.

### Deploy Options

**Vercel** (Recommended):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify**:
1. Drag & drop `dist` folder to Netlify
2. Or connect GitHub repo for auto-deployment

**Traditional Hosting**:
1. Upload contents of `dist` folder to your server
2. Configure environment variables in hosting panel

### Environment Variables

Set these in your hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Optimized Assets**: Lazy loading, code splitting, minification

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style

- ES6+ JavaScript
- Tailwind CSS utility classes
- Semantic HTML5
- Mobile-first responsive design

## 🐛 Troubleshooting

### Supabase Connection Issues
- Verify `.env` file has correct credentials
- Check Supabase project is active
- Ensure RLS policies are set up correctly

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Admin Panel Login Issues
- Verify user exists in Supabase Authentication
- Check "Auto Confirm User" was enabled
- Clear browser cache and cookies

## 📄 License

Proprietary - ESET Creatives © 2026

## 📞 Contact

- **Email**: esetcreatives@gmail.com
- **Phone**: +251 98 244 5758
- **Telegram**: @EsetCreativesContact

## 🙏 Credits

- **Design & Development**: ESET Creatives Team
- **Animations**: GSAP, Lenis
- **Backend**: Supabase
- **Images**: Unsplash (placeholder images)

---

Built with ❤️ by ESET Creatives
