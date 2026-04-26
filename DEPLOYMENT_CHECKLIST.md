# Deployment Checklist - ESET Creatives Website

Use this checklist to ensure a smooth deployment to production.

## 📋 Pre-Deployment Checklist

### ✅ Development Environment

- [x] All dependencies installed (`npm install`)
- [x] Build completes successfully (`npm run build`)
- [x] Development server runs without errors (`npm run dev`)
- [x] No console errors in browser
- [x] All animations working smoothly
- [x] Mobile responsive design verified

### ✅ Supabase Setup

- [ ] Supabase project created
- [ ] Database schema executed (`supabase-schema.sql`)
- [ ] Admin user created in Authentication
- [ ] Admin user email confirmed
- [ ] RLS policies verified
- [ ] Sample data loaded (optional)
- [ ] API credentials copied

### ✅ Environment Configuration

- [ ] `.env` file configured with Supabase credentials
- [ ] `VITE_SUPABASE_URL` set correctly
- [ ] `VITE_SUPABASE_ANON_KEY` set correctly
- [ ] Environment variables tested locally

### ✅ Content Preparation

- [ ] Admin panel accessible (`/admin.html`)
- [ ] Can login to admin panel
- [ ] At least 3-4 case studies added
- [ ] All case studies have images
- [ ] All case studies marked as "Published"
- [ ] Contact form tested and working
- [ ] Website settings updated

### ✅ Visual Verification

- [ ] Logo images displaying correctly
- [ ] All sections visible and styled
- [ ] New color scheme (#bde513) applied everywhere
- [ ] Services section grid layout working
- [ ] Case study cards displaying properly
- [ ] About section redesign looks good
- [ ] Footer information correct

### ✅ Functionality Testing

- [ ] Navigation links work
- [ ] Mobile menu opens/closes
- [ ] Smooth scrolling works
- [ ] Hero animations play
- [ ] Services cards hover effects work
- [ ] Case study filtering works (All, Development, Identity, Social, Production)
- [ ] Case study modals open and close
- [ ] Contact form submits successfully
- [ ] Form submissions appear in admin panel

### ✅ Performance & SEO

- [ ] Images optimized
- [ ] Meta tags updated in `index.html`
- [ ] Page title correct
- [ ] Meta description accurate
- [ ] Favicon added (if available)
- [ ] Build size reasonable (<200KB for main JS)

### ✅ Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### ✅ Accessibility

- [ ] Color contrast verified (see COLOR_CONTRAST_REPORT.md)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Semantic HTML used

---

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Apply to: Production, Preview, Development

5. **Redeploy**
   ```bash
   vercel --prod
   ```

6. **Verify**
   - Visit your Vercel URL
   - Test all functionality
   - Check admin panel works

### Option 2: Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Drop**
   - Go to [netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Wait for deployment

3. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Redeploy**
   - Trigger a new deploy from Netlify dashboard

5. **Configure Domain** (optional)
   - Go to Domain settings
   - Add custom domain

### Option 3: Traditional Hosting (cPanel, etc.)

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Upload all files from `dist/` folder to your server
   - Typically to `public_html` or `www` directory

3. **Configure .htaccess** (if needed)
   - Copy `.htaccess` from project root
   - Ensure it's in the same directory as `index.html`

4. **Environment Variables**
   - Some hosts allow setting env vars in control panel
   - Or hardcode them (not recommended for security)

---

## ✅ Post-Deployment Checklist

### Immediate Verification

- [ ] Website loads at production URL
- [ ] No 404 errors in browser console
- [ ] All images load correctly
- [ ] CSS styles applied
- [ ] JavaScript working
- [ ] Animations playing

### Functionality Testing

- [ ] Navigation works
- [ ] All sections scroll correctly
- [ ] Case studies load from database
- [ ] Case study filtering works
- [ ] Modals open and close
- [ ] Contact form submits
- [ ] Form data appears in Supabase

### Admin Panel

- [ ] Admin panel accessible at `/admin.html`
- [ ] Can login with credentials
- [ ] Can view case studies
- [ ] Can add new case study
- [ ] Can edit existing case study
- [ ] Can delete case study
- [ ] Can view contact submissions
- [ ] Can update settings

### Performance

- [ ] Run Lighthouse audit
  - Performance: Target 90+
  - Accessibility: Target 95+
  - Best Practices: Target 95+
  - SEO: Target 95+
- [ ] Page loads in < 3 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shifts

### SEO & Analytics

- [ ] Google Search Console setup
- [ ] Google Analytics installed (if desired)
- [ ] Sitemap generated (optional)
- [ ] robots.txt configured (optional)

### Security

- [ ] HTTPS enabled
- [ ] Supabase RLS policies active
- [ ] No sensitive data in client code
- [ ] Environment variables not exposed
- [ ] Admin panel requires authentication

---

## 🔧 Common Issues & Solutions

### Issue: Case studies not loading

**Solution:**
1. Check browser console for errors
2. Verify Supabase credentials in environment variables
3. Check RLS policies in Supabase
4. Ensure case studies are marked "Published"

### Issue: Contact form not submitting

**Solution:**
1. Check browser console for errors
2. Verify Supabase connection
3. Check `contact_submissions` table exists
4. Verify RLS policy allows public inserts

### Issue: Admin panel login fails

**Solution:**
1. Verify user exists in Supabase Authentication
2. Check "Auto Confirm User" was enabled
3. Try password reset in Supabase
4. Check browser console for auth errors

### Issue: Styles not loading

**Solution:**
1. Clear browser cache
2. Check CSS file path in HTML
3. Verify build completed successfully
4. Check for 404 errors in Network tab

### Issue: Environment variables not working

**Solution:**
1. Ensure variables start with `VITE_`
2. Restart dev server after changing `.env`
3. In production, set in hosting platform
4. Redeploy after setting variables

---

## 📊 Monitoring & Maintenance

### Weekly

- [ ] Check contact form submissions
- [ ] Review analytics (if installed)
- [ ] Check for broken links
- [ ] Verify all images loading

### Monthly

- [ ] Update case studies
- [ ] Review and respond to inquiries
- [ ] Check performance metrics
- [ ] Update dependencies (`npm update`)

### Quarterly

- [ ] Content audit
- [ ] SEO review
- [ ] Performance optimization
- [ ] Security updates

---

## 🆘 Emergency Contacts

**Technical Issues:**
- Developer: [Your contact]
- Hosting Support: [Hosting provider]
- Supabase Support: support@supabase.io

**Content Updates:**
- Admin Panel: [Your domain]/admin.html
- Login: [Admin email]

---

## 📝 Deployment Log

| Date | Version | Changes | Deployed By |
|------|---------|---------|-------------|
| [Date] | 2.0.0 | Initial deployment with new design | [Name] |
|  |  |  |  |

---

## ✅ Final Sign-Off

- [ ] All checklist items completed
- [ ] Website tested and verified
- [ ] Admin panel working
- [ ] Client/stakeholder approval received
- [ ] Documentation provided
- [ ] Training completed (if needed)

**Deployed By:** ___________________

**Date:** ___________________

**Production URL:** ___________________

**Admin URL:** ___________________

---

## 🎉 Congratulations!

Your ESET Creatives website is now live! 

**Next Steps:**
1. Share the URL with your team
2. Start adding real case studies
3. Monitor contact form submissions
4. Gather user feedback
5. Iterate and improve

For ongoing support, refer to:
- `README.md` - Full documentation
- `CMS_SETUP.md` - CMS management
- `QUICK_START.md` - Quick reference

---

**Need Help?**
- Email: esetcreatives@gmail.com
- Phone: +251 98 244 5758
