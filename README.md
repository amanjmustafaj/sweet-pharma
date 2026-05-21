# Sweet Pharma Pharmacy - Professional Multi-Language Website

A modern, production-ready pharmaceutical website with complete content management system (CMS), featuring trilingual support (English, Kurdish, Arabic) with automatic RTL/LTR layout switching, dark mode, and professional design.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [File Structure](#file-structure)
- [Content Management](#content-management)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Maintenance](#maintenance)

---

## 🎯 Project Overview

### Purpose
Sweet Pharma is a comprehensive pharmaceutical website designed to showcase pharmacy services, multiple branch locations, and provide easy customer contact. The site includes a powerful admin panel for non-technical users to manage all website content without coding knowledge.

### Key Highlights
- **Trilingual**: English, Kurdish Sorani (کوردی), Arabic (العربية)
- **RTL/LTR Support**: Automatic layout direction based on language
- **Admin Panel**: Complete content management system
- **Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- **Modern Design**: Clean, professional UI with smooth animations
- **SEO Optimized**: Meta tags, Open Graph, structured data ready

---

## ✨ Features

### Frontend Features

#### 1. **Splash Screen**
- Elegant intro animation on first load
- Company logo with smooth fade-in/fade-out
- Cream background (#FBF4EC)
- 4-second duration
- Automatic dismissal

#### 2. **Navigation**
- Sticky header with scroll effect
- Logo (clickable, returns to home)
- Multi-language switcher (EN/KU/AR)
- Dark/Light mode toggle
- Mobile-responsive menu
- Smooth scroll to sections

#### 3. **Hero Section**
- Dynamic background image/video support
- Customizable title and subtitle
- Fully editable from admin panel
- Responsive text sizing

#### 4. **Services Section**
- Icon-based service cards
- Add/Edit/Delete from admin
- Icon library integration
- Trilingual descriptions
- Grid layout (responsive)

#### 5. **Branches Section**
- **Smart Display Logic**:
  - ≤3 branches: Grid layout
  - >3 branches: 3-item carousel with center focus
- **3-Item Carousel Features**:
  - Shows 3 branches at a time
  - Center branch is larger and highlighted
  - Infinite looping (continuous navigation)
  - Left/Right arrow controls
  - Dot indicators for navigation
  - Branch counter display
- **Each Branch Includes**:
  - Up to 3 images (gallery with navigation)
  - Title, address, phone (trilingual)
  - Email address
  - Laboratory services info
  - Google Maps link
  - All fields fully customizable

#### 6. **About Section**
- Company description
- Mission statement
- Vision statement
- Core values
- All trilingual and editable

#### 7. **Contact Section**
- Professional contact form
- Contact information display
- Social media links
- Responsive layout

#### 8. **Footer**
- Company logo
- Quick links navigation
- Social media icons
- Copyright notice
- Multi-column responsive layout

### Admin Panel Features

#### Access
- **URL**: `/secret-admin-panel-2025/login`
- **Hidden**: No visible link on frontend (security)
- **Credentials**: admin / admin123

#### Capabilities
1. **Hero Section Editor**
   - Edit title, subtitle (EN/KU/AR)
   - Upload background image
   - Set background video URL

2. **Services Manager**
   - Add/Edit/Delete services
   - Choose from 20+ icons
   - Trilingual titles and descriptions
   - Reorder services

3. **Branches Manager**
   - Add/Edit/Delete branches
   - Upload 3 images per branch
   - Set title, address (trilingual)
   - Add email address
   - Add laboratory info (trilingual)
   - Phone number
   - Google Maps link
   - Image gallery preview with delete option

4. **Social Media Manager**
   - Add/Edit/Delete social links
   - Platform selection (Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, WhatsApp, Telegram, Snapchat)
   - Auto icon assignment
   - URL validation

5. **About Section Editor**
   - Edit description (trilingual)
   - Edit mission (trilingual)
   - Edit vision (trilingual)
   - Edit values (trilingual)

6. **SEO Manager**
   - Meta title (60 char limit, trilingual)
   - Meta description (160 char limit, trilingual)
   - Keywords (trilingual)
   - Open Graph image

#### Real-time Updates
- All changes save to localStorage
- Website updates immediately via event listeners
- No page refresh needed to see changes
- "Save All Changes" button with success notification

---

## 🛠️ Technology Stack

### Core Framework
- **Next.js 14.2.0** - React framework with App Router
- **React 18.3.0** - UI library
- **TypeScript 5.3.0** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **PostCSS 8.4.0** - CSS processing
- **Autoprefixer 10.4.0** - CSS vendor prefixing
- **React Icons 5.0.0** - Icon library (FontAwesome)
- **Framer Motion 11.0.0** - Animation library

### Backend & Data (Production-Ready)
- **MongoDB (Mongoose 8.0.0)** - Database
- **NextAuth.js 4.24.0** - Authentication
- **bcryptjs 2.4.3** - Password hashing
- **jsonwebtoken 9.0.0** - JWT tokens
- **Zod 3.22.0** - Schema validation

### Security & Performance
- **CSRF Protection** (csrf 3.1.0)
- **Rate Limiting** (express-rate-limit 7.0.0)
- **Cookie Management** (cookie 0.6.0)

### File Management
- **Cloudinary 2.0.0** - Image hosting/optimization
- **Multer 1.4.5** - File uploads

### Utilities
- **nanoid 5.0.0** - Unique ID generation
- **React Hot Toast 2.4.0** - Toast notifications
- **React Swipeable 7.0.0** - Touch gestures
- **Swiper 11.0.0** - Carousel library

### Development Tools
- **ESLint 8.56.0** - Code linting
- **TypeScript Compiler** - Type checking
- **tsx 4.7.0** - TypeScript execution

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB**: Local or cloud instance (MongoDB Atlas recommended)

### Step 1: Install Dependencies

```bash
# Navigate to project directory
cd sweet-platform

# Install all dependencies
npm install
```

### Step 2: Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your settings:
```env
# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/sweet-pharma
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-pharma

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password
```

### Step 3: Initialize Database (Optional)

```bash
# Run database initialization script
npm run db:init
```

### Step 4: Start Development Server

```bash
npm run dev
```

The application will run on: `http://localhost:3000`

### Step 5: Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

---

## 📁 File Structure

```
sweet-platform/
│
├── public/                          # Static assets
│   ├── fonts/                       # Custom fonts
│   │   └── NRT-Reg.ttf             # NRT font for Kurdish/Arabic
│   ├── images/                      # Image assets
│   │   ├── logo.png                # Main logo (navigation/footer)
│   │   └── sweet-logo.png          # Splash screen logo
│   ├── favicon.ico                  # Browser tab icon
│   └── favicon.png                  # Browser tab icon (PNG)
│
├── src/                             # Source code
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── secret-admin-panel-2025/ # Admin panel
│   │   │   ├── login/              # Login page
│   │   │   │   └── page.tsx        # Login UI
│   │   │   └── dashboard/          # Admin dashboard
│   │   │       └── page.tsx        # Dashboard with all editors
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout (providers, fonts, metadata)
│   │   └── page.tsx                # Home page (all sections)
│   │
│   ├── components/                  # React components
│   │   ├── admin/                  # Admin panel components
│   │   │   ├── AboutEditor.tsx     # Edit about section
│   │   │   ├── BranchesEditor.tsx  # Manage branches
│   │   │   ├── HeroEditor.tsx      # Edit hero section
│   │   │   ├── ImageUpload.tsx     # Image upload component
│   │   │   ├── SEOEditor.tsx       # SEO settings
│   │   │   ├── ServicesEditor.tsx  # Manage services
│   │   │   └── SocialEditor.tsx    # Manage social media
│   │   ├── About.tsx               # About section
│   │   ├── Branches.tsx            # Branches section with carousel
│   │   ├── Contact.tsx             # Contact form and info
│   │   ├── ContentWrapper.tsx      # Content blocker during splash
│   │   ├── Footer.tsx              # Footer component
│   │   ├── Hero.tsx                # Hero section
│   │   ├── Navigation.tsx          # Header/navigation
│   │   ├── Services.tsx            # Services grid
│   │   └── SplashScreen.tsx        # Intro animation
│   │
│   ├── contexts/                    # React Context providers
│   │   ├── LanguageContext.tsx     # Language state (EN/KU/AR)
│   │   └── ThemeContext.tsx        # Theme state (light/dark)
│   │
│   ├── data/                        # Data and translations
│   │   ├── translations.ts         # All UI translations (EN/KU/AR)
│   │   └── websiteData.ts          # Initial content data
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useWebsiteContent.ts    # Content fetching hook
│   │
│   ├── lib/                         # Utilities and helpers
│   │   ├── db.ts                   # MongoDB connection
│   │   ├── initDB.ts               # Database initialization
│   │   └── auth.ts                 # Authentication helpers
│   │
│   ├── middleware/                  # Next.js middleware
│   │   ├── auth.ts                 # Auth middleware
│   │   ├── csrf.ts                 # CSRF protection
│   │   └── rateLimit.ts            # Rate limiting
│   │
│   └── models/                      # MongoDB schemas
│       └── WebsiteContent.ts       # Content schema
│
├── .env.example                     # Environment variables template
├── .env.local                       # Local environment (not in git)
├── .gitignore                       # Git ignore rules
├── next.config.js                   # Next.js configuration
├── package.json                     # Dependencies and scripts
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

### Key Files Explained

#### Configuration Files
- **next.config.js**: Next.js settings (image optimization, i18n, etc.)
- **tailwind.config.js**: Tailwind theme (colors, fonts, breakpoints)
- **tsconfig.json**: TypeScript compiler options
- **postcss.config.js**: CSS processing plugins

#### Core Application Files
- **src/app/layout.tsx**: Root layout wrapper (fonts, metadata, providers)
- **src/app/page.tsx**: Home page with all sections
- **src/app/globals.css**: Global CSS (fonts, utilities, animations)

#### Context Files
- **LanguageContext.tsx**: Manages language state and translations
- **ThemeContext.tsx**: Manages dark/light mode

#### Data Files
- **translations.ts**: All UI text in 3 languages
- **websiteData.ts**: Default content (fallback if localStorage empty)

---

## 🎛️ Content Management

### Accessing Admin Panel

1. Navigate to: `http://your-domain.com/secret-admin-panel-2025/login`
2. Enter credentials:
   - Username: `admin`
   - Password: `admin123`

**Security Note**: This URL is hidden. There is NO link to it on the frontend.

### Managing Content

#### Hero Section
1. Click "Hero" in sidebar
2. Switch language tabs (EN/KU/AR)
3. Edit title and subtitle for each language
4. Upload background image or enter video URL
5. Click "Save All Changes"

#### Services
1. Click "Services" in sidebar
2. Click "Add Service" button
3. Fill in modal form:
   - Switch language tabs for multilingual input
   - Choose icon from dropdown
   - Enter title and description
4. Edit existing: Click "Edit" on service card
5. Delete: Click "Delete" (with confirmation)
6. Click "Save All Changes"

#### Branches
1. Click "Branches" in sidebar
2. Click "Add Branch" button
3. Fill in all fields:
   - Branch name (EN/KU/AR)
   - Address (EN/KU/AR)
   - Phone number
   - **Email address** (new field)
   - **Laboratory** (EN/KU/AR) (new field)
   - Google Maps link
   - Upload up to 3 images
4. Edit existing: Click "Edit" on branch card
5. Delete images: Hover over image thumbnail, click X
6. Delete branch: Click "Delete" (with confirmation)
7. Click "Save All Changes"

**Important**: Branches display logic:
- 1-3 branches: Grid layout
- 4+ branches: Carousel with center focus (shows 3 at a time)

#### Social Media
1. Click "Social Media" in sidebar
2. Click "Add Social Link"
3. Enter platform name and URL
4. Select icon from dropdown
5. Click "Save All Changes"

#### About Us
1. Click "About" in sidebar
2. Edit four sections (each trilingual):
   - Description
   - Mission
   - Vision
   - Values
3. Switch language tabs
4. Click "Save All Changes"

#### SEO Settings
1. Click "SEO" in sidebar
2. For each language:
   - Meta Title (60 characters max)
   - Meta Description (160 characters max)
   - Keywords (comma separated)
3. Upload Open Graph image
4. Click "Save All Changes"

### How Changes Work

1. **Edit in Admin**: Make changes in admin panel
2. **Save**: Click "Save All Changes" button
3. **localStorage**: Data saves to browser localStorage
4. **Event Dispatch**: System triggers 'contentUpdated' event
5. **Frontend Update**: All components listening reload data
6. **Instant Preview**: Changes appear immediately on website

**Note**: Changes are stored in localStorage until you implement backend saving to MongoDB.

---

## 🎨 Customization Guide

### Changing Colors

#### Primary Color
Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#B48C64',        // Main color
        'primary-dark': '#9A7553', // Darker shade
        'primary-light': '#C9A178', // Lighter shade
      }
    }
  }
}
```

#### Background Color
Edit `src/components/SplashScreen.tsx` for splash background:
```javascript
backgroundColor: '#FBF4EC'  // Change this hex code
```

### Changing Fonts

#### Main Font
1. Add font file to `public/fonts/`
2. Edit `src/app/globals.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/YourFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'YourFont', sans-serif;
}
```

### Changing Logo

1. Replace `public/images/logo.png` - Navigation/footer logo
2. Replace `public/images/sweet-logo.png` - Splash screen logo
3. Replace `public/favicon.png` - Browser tab icon

Recommended sizes:
- Logo: 200x60px (transparent PNG)
- Splash logo: 500x500px (transparent PNG)
- Favicon: 512x512px (PNG)

### Changing Admin Credentials

1. Generate password hash:
```bash
npm install -g bcryptjs
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-password', 10));"
```

2. Update `.env.local`:
```env
ADMIN_USERNAME=your-new-username
ADMIN_PASSWORD_HASH=your-bcrypt-hash
```

### Adding New Language

1. Edit `src/data/translations.ts`:
```typescript
export const translations = {
  // Existing languages...
  
  fr: {  // French example
    home: 'Accueil',
    services: 'Services',
    // Add all keys...
  }
}
```

2. Edit `src/contexts/LanguageContext.tsx`:
```typescript
type Language = 'en' | 'ku' | 'ar' | 'fr';
```

3. Add language switcher button in `Navigation.tsx`

### Modifying Sections

To add/remove/reorder sections, edit `src/app/page.tsx`:

```typescript
export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Services />
      <Branches />
      {/* Add your new section here */}
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
```

---

## 🚀 Deployment

### Option 1: Vercel (Recommended - Free & Easy)

#### One-Click Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Add environment variables
6. Click "Deploy"

#### CLI Deploy
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables in Vercel
1. Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy if variables change

### Option 2: Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy --prod --dir=.next
```

**Build Settings**:
- Build command: `npm run build`
- Publish directory: `.next`

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

#### Server Requirements
- Ubuntu 20.04+ or similar Linux
- Node.js 18+
- MongoDB
- Nginx (web server)
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

#### Step 1: Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
# Follow: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

#### Step 2: Upload Project
```bash
# From your local machine
rsync -avz --exclude 'node_modules' \
  ./ user@your-server-ip:/var/www/sweet-platform/
```

#### Step 3: Install & Build
```bash
# On server
cd /var/www/sweet-platform
npm install
npm run build
```

#### Step 4: Start with PM2
```bash
# Start application
pm2 start npm --name "sweet-platform" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 startup on boot
pm2 startup
```

#### Step 5: Configure Nginx
Create `/etc/nginx/sites-available/sweet-platform`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/sweet-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: SSL Certificate
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is configured automatically
```

### Post-Deployment Checklist

- [ ] Website accessible via domain
- [ ] SSL certificate working (HTTPS)
- [ ] Admin panel accessible
- [ ] All sections loading properly
- [ ] Images displaying correctly
- [ ] Language switcher working
- [ ] Dark mode toggle working
- [ ] Contact form working
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Meta tags set correctly
- [ ] Favicon showing in browser tab
- [ ] Google Analytics/tracking (if configured)

---

## 🔧 Maintenance

### Regular Updates

#### Update Dependencies
```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm install package-name@latest
```

#### Security Updates
```bash
# Check for security vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Fix with breaking changes
npm audit fix --force
```

### Backup

#### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb://localhost:27017/sweet-pharma" --out=/path/to/backup

# Restore
mongorestore --uri="mongodb://localhost:27017/sweet-pharma" /path/to/backup
```

#### Code Backup
```bash
# Push to Git regularly
git add .
git commit -m "Backup: $(date)"
git push origin main
```

### Monitoring

#### Check Application Status (PM2)
```bash
# View running processes
pm2 list

# View logs
pm2 logs sweet-platform

# Restart application
pm2 restart sweet-platform

# Stop application
pm2 stop sweet-platform
```

#### Monitor Server Resources
```bash
# CPU and Memory
htop

# Disk usage
df -h

# Check Nginx
sudo systemctl status nginx
```

### Common Issues & Solutions

#### Website Not Loading
1. Check PM2: `pm2 list`
2. Check Nginx: `sudo systemctl status nginx`
3. Check logs: `pm2 logs sweet-platform`
4. Check port 3000: `sudo lsof -i:3000`

#### Admin Panel Not Accessible
1. Verify URL: `/secret-admin-panel-2025/login`
2. Check credentials in `.env.local`
3. Clear browser cache
4. Try incognito mode

#### Images Not Showing
1. Check file paths in code
2. Verify files exist in `public/images/`
3. Check file permissions: `chmod 644 public/images/*`
4. Clear CDN cache if using one

#### Language Not Switching
1. Check localStorage in browser (F12 → Application → Local Storage)
2. Clear localStorage and refresh
3. Check translations.ts for missing keys

### Content Updates

#### Via Admin Panel
Use the admin panel for all content updates - no code changes needed.

#### Direct Database Updates (Advanced)
```bash
# Connect to MongoDB
mongosh mongodb://localhost:27017/sweet-pharma

# View collections
show collections

# Update content
db.websitecontent.findOne()
db.websitecontent.updateOne({...})
```

### Performance Optimization

#### Enable Image Optimization
Already configured in `next.config.js`. Images are automatically optimized.

#### Enable Caching
Add to `next.config.js`:
```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

#### Monitor Performance
- Use Google Lighthouse (Chrome DevTools)
- Check Core Web Vitals
- Monitor bundle size: `npm run build` shows size

---

## 📝 Additional Notes

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader compatible
- Color contrast compliance

### SEO Features
- Meta tags (configurable via admin)
- Open Graph tags
- Semantic HTML
- Mobile-friendly
- Fast loading times
- Sitemap ready

### Security Features
- CSRF protection
- Rate limiting
- SQL injection prevention (NoSQL)
- XSS protection (React escaping)
- Secure password hashing
- HTTPOnly cookies (when implemented)
- Environment variable secrets

---

## 🤝 Support & Contact

For technical support, bug reports, or feature requests, please contact the development team.

### Quick Links
- **Admin Panel**: `/secret-admin-panel-2025/login`
- **Default Credentials**: admin / admin123

---

## 📄 License

This project is proprietary software. All rights reserved.

Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

---

**Built with modern web technologies for performance, security, and scalability.**

**Last Updated**: February 2026
