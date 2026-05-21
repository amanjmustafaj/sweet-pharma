# 🚀 Production Deployment Checklist

## Pre-Deployment

### Code & Build
- [ ] Run `npm install` - All dependencies installed
- [ ] Run `npm run lint` - No linting errors
- [ ] Run `npm run build` - Build successful
- [ ] Test production build locally: `npm start`
- [ ] All pages load without errors
- [ ] No console errors in browser (F12)

### Environment Configuration
- [ ] `.env.production` file created
- [ ] All environment variables set
- [ ] MongoDB connection string configured
- [ ] JWT_SECRET set (minimum 32 characters)
- [ ] NEXTAUTH_SECRET set
- [ ] Cloudinary credentials configured (if using)
- [ ] Admin password changed from default

### Content Review
- [ ] Logo uploaded (`public/images/logo.png`)
- [ ] Favicon set (`public/favicon.png`)
- [ ] Splash screen logo added (`public/images/sweet-logo.png`)
- [ ] All sections have content
- [ ] Contact information correct
- [ ] Social media links added
- [ ] Branch locations complete with images
- [ ] Services listed
- [ ] About section filled
- [ ] SEO meta tags configured

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Test on mobile (iOS)
- [ ] Test on mobile (Android)
- [ ] Test all language modes (EN/KU/AR)
- [ ] Test dark/light mode
- [ ] Test admin panel login
- [ ] Test admin panel all editors
- [ ] Test form submissions
- [ ] Test splash screen
- [ ] Test carousel (if 4+ branches)
- [ ] Test all navigation links
- [ ] Test social media links

### Security
- [ ] Change admin username from "admin"
- [ ] Change admin password from "admin123"
- [ ] Generate strong JWT_SECRET
- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Review CORS settings
- [ ] Enable rate limiting
- [ ] Enable CSRF protection
- [ ] Secure cookie settings
- [ ] HTTPS/SSL configured

### Performance
- [ ] Images optimized (< 200KB each)
- [ ] Lighthouse score > 90
- [ ] Page load time < 3 seconds
- [ ] No unnecessary dependencies
- [ ] Bundle size optimized

## Deployment

### Platform-Specific (Choose One)

#### Vercel
- [ ] GitHub repository created
- [ ] Vercel account created
- [ ] Project imported
- [ ] Environment variables added
- [ ] Custom domain configured
- [ ] SSL auto-configured
- [ ] Deployment successful

#### VPS (DigitalOcean, AWS, etc.)
- [ ] Server provisioned
- [ ] Node.js 18+ installed
- [ ] MongoDB installed/configured
- [ ] PM2 installed
- [ ] Nginx installed
- [ ] Project uploaded to server
- [ ] Dependencies installed
- [ ] Production build created
- [ ] PM2 process started
- [ ] Nginx configured
- [ ] SSL certificate installed
- [ ] Firewall configured
- [ ] Domain DNS pointed to server

## Post-Deployment

### Verification
- [ ] Website accessible via domain
- [ ] HTTPS working (green padlock)
- [ ] Admin panel accessible
- [ ] Login working
- [ ] All pages loading
- [ ] Images displaying
- [ ] Forms working
- [ ] Language switcher working
- [ ] Dark mode working
- [ ] Mobile responsive
- [ ] Fast loading times

### Monitoring Setup
- [ ] Error tracking enabled (Sentry, etc.)
- [ ] Analytics configured (Google Analytics, etc.)
- [ ] Uptime monitoring (UptimeRobot, etc.)
- [ ] Performance monitoring
- [ ] Backup schedule configured

### Documentation
- [ ] README.md updated with production details
- [ ] Team briefed on admin panel
- [ ] Credentials securely shared
- [ ] Support contacts documented

## Final Steps

- [ ] Test complete user journey
- [ ] Share preview with stakeholders
- [ ] Marketing materials ready
- [ ] Social media announcement ready
- [ ] Launch! 🚀

---

## Quick Deploy Commands

### Vercel
```bash
vercel --prod
```

### VPS
```bash
npm run build
pm2 restart sweet-platform
```

### Health Check
```bash
# Check if site is up
curl -I https://your-domain.com

# Check admin panel
curl -I https://your-domain.com/secret-admin-panel-2025/login
```

---

**Once all items are checked, your site is ready to go live!**
