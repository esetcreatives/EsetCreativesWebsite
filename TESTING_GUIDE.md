# Testing Guide - ESET Creatives Website

Comprehensive testing checklist to ensure everything works perfectly.

---

## 🧪 Testing Overview

This guide covers:
1. Functional Testing
2. Visual Testing
3. Performance Testing
4. Accessibility Testing
5. Browser Compatibility Testing
6. Mobile Testing
7. CMS Testing

---

## ✅ 1. Functional Testing

### Navigation

- [ ] **Header Navigation**
  - [ ] Logo links to home
  - [ ] All nav links work (Home, Services, Methodology, Case Studies, Team, About)
  - [ ] "Contact Us" button works
  - [ ] Smooth scroll to sections
  - [ ] Active section highlighting (if implemented)

- [ ] **Mobile Menu**
  - [ ] Hamburger icon toggles menu
  - [ ] Menu slides in/out smoothly
  - [ ] All links work in mobile menu
  - [ ] Menu closes when link clicked
  - [ ] Menu closes when clicking outside

- [ ] **Footer Navigation**
  - [ ] All footer links work
  - [ ] Social media links open in new tab
  - [ ] Contact links work (email, phone, Telegram)
  - [ ] Privacy/Terms links work (if added)

### Hero Section

- [ ] **Entrance Animation**
  - [ ] Brand logo fades in
  - [ ] Dust particles animate
  - [ ] Entrance overlay fades out
  - [ ] Hero elements fade in sequentially
  - [ ] No animation glitches

- [ ] **Hero Content**
  - [ ] All text visible and readable
  - [ ] "Book a Discovery Call" button works
  - [ ] Button hover effect works
  - [ ] Magnetic button effect works (desktop)

### Services Section

- [ ] **Layout**
  - [ ] Grid displays correctly (2 columns desktop, 1 mobile)
  - [ ] All 4 services visible
  - [ ] Icons display correctly
  - [ ] Feature lists show checkmarks

- [ ] **Interactions**
  - [ ] Cards lift on hover (desktop)
  - [ ] Shadow appears on hover
  - [ ] Smooth transitions
  - [ ] No layout shifts

### Methodology Section

- [ ] **Content**
  - [ ] All 3 methodology cards visible
  - [ ] Icons display correctly
  - [ ] Text readable
  - [ ] Fade-up animation works

### Case Studies Section

- [ ] **Filtering**
  - [ ] "All" button shows all case studies
  - [ ] "Development" filter works
  - [ ] "Identity" filter works
  - [ ] "Social" filter works
  - [ ] "Production" filter works
  - [ ] Active filter highlighted
  - [ ] Smooth filter transitions

- [ ] **Case Study Cards**
  - [ ] All cards display correctly
  - [ ] Images load properly
  - [ ] Tags display correctly
  - [ ] Metrics show properly
  - [ ] "View Case Study" button visible
  - [ ] Card hover effect works
  - [ ] Image scales on hover

- [ ] **Case Study Modal**
  - [ ] Modal opens when card clicked
  - [ ] Hero image displays
  - [ ] Close button works
  - [ ] Clicking outside closes modal
  - [ ] All content sections visible (Challenge, Solution, Results)
  - [ ] Metrics grid displays correctly
  - [ ] "Start Your Project" button works
  - [ ] Modal scrolls if content long
  - [ ] Smooth open/close animations

### Team Section

- [ ] **Team Cards**
  - [ ] All team members visible
  - [ ] Images display (or placeholders)
  - [ ] Names and titles visible
  - [ ] Hover effect reveals details
  - [ ] Social links work (if added)

### About Section

- [ ] **Stats Grid**
  - [ ] All 4 stats visible
  - [ ] Numbers display correctly
  - [ ] Labels readable
  - [ ] Grid responsive

- [ ] **Content Grid**
  - [ ] Image displays correctly
  - [ ] Quote overlay visible
  - [ ] All content sections visible
  - [ ] Checkmarks display
  - [ ] Responsive layout works

- [ ] **Values Section**
  - [ ] All 3 value cards visible
  - [ ] Icons display correctly
  - [ ] Text readable
  - [ ] Responsive grid

### Contact Section

- [ ] **Form Display**
  - [ ] All form fields visible
  - [ ] Labels clear
  - [ ] Placeholders helpful
  - [ ] Budget dropdown works

- [ ] **Form Validation**
  - [ ] Name field required
  - [ ] Email field required and validates format
  - [ ] Message field required
  - [ ] Budget field required
  - [ ] Error messages display (if validation fails)

- [ ] **Form Submission**
  - [ ] Form submits successfully
  - [ ] Success message displays
  - [ ] Form resets after submission
  - [ ] Data appears in Supabase
  - [ ] Data appears in admin panel
  - [ ] No console errors

### Footer

- [ ] **Content**
  - [ ] Logo displays
  - [ ] Company description visible
  - [ ] Social links work
  - [ ] Service links work
  - [ ] Contact information correct
  - [ ] Copyright year correct

---

## 🎨 2. Visual Testing

### Color Scheme

- [ ] **Accent Color (#bde513)**
  - [ ] Used consistently throughout
  - [ ] Good contrast on dark backgrounds
  - [ ] Not used for text on light backgrounds
  - [ ] Hover states use brand-mid (#a0c910)

### Typography

- [ ] **Fonts**
  - [ ] General Sans loads correctly
  - [ ] Space Grotesk loads correctly
  - [ ] Font sizes appropriate
  - [ ] Line heights comfortable
  - [ ] Letter spacing correct

- [ ] **Hierarchy**
  - [ ] Headings clearly distinguished
  - [ ] Body text readable
  - [ ] Proper contrast ratios
  - [ ] Consistent sizing

### Spacing

- [ ] **Sections**
  - [ ] Consistent padding
  - [ ] Proper margins between sections
  - [ ] No overlapping elements
  - [ ] Breathing room around content

### Images

- [ ] **Display**
  - [ ] All images load
  - [ ] Proper aspect ratios
  - [ ] No distortion
  - [ ] Alt text present
  - [ ] Lazy loading works (if implemented)

### Animations

- [ ] **Entrance**
  - [ ] Smooth and professional
  - [ ] Not too fast or slow
  - [ ] No janky movements

- [ ] **Scroll Animations**
  - [ ] Fade-up effects work
  - [ ] Trigger at right scroll position
  - [ ] Smooth transitions
  - [ ] No performance issues

- [ ] **Hover Effects**
  - [ ] Smooth transitions
  - [ ] Appropriate timing
  - [ ] No flickering
  - [ ] Magnetic buttons work

### Responsive Design

- [ ] **Mobile (< 768px)**
  - [ ] Layout stacks properly
  - [ ] Text readable
  - [ ] Images scale correctly
  - [ ] No horizontal scroll
  - [ ] Touch targets large enough (44x44px minimum)

- [ ] **Tablet (768px - 1024px)**
  - [ ] Layout adapts appropriately
  - [ ] Grid columns adjust
  - [ ] Images scale correctly
  - [ ] Navigation works

- [ ] **Desktop (> 1024px)**
  - [ ] Full layout displays
  - [ ] Proper use of space
  - [ ] Max-width containers work
  - [ ] No excessive whitespace

---

## ⚡ 3. Performance Testing

### Load Time

- [ ] **Initial Load**
  - [ ] Page loads in < 3 seconds
  - [ ] First Contentful Paint < 1.5s
  - [ ] Time to Interactive < 3s
  - [ ] No render-blocking resources

### Lighthouse Audit

Run Lighthouse in Chrome DevTools:

- [ ] **Performance**: 90+ score
  - [ ] First Contentful Paint
  - [ ] Speed Index
  - [ ] Largest Contentful Paint
  - [ ] Time to Interactive
  - [ ] Total Blocking Time
  - [ ] Cumulative Layout Shift

- [ ] **Accessibility**: 95+ score
  - [ ] Color contrast
  - [ ] ARIA attributes
  - [ ] Alt text
  - [ ] Form labels
  - [ ] Heading hierarchy

- [ ] **Best Practices**: 95+ score
  - [ ] HTTPS
  - [ ] No console errors
  - [ ] Image aspect ratios
  - [ ] No deprecated APIs

- [ ] **SEO**: 95+ score
  - [ ] Meta description
  - [ ] Title tag
  - [ ] Crawlable links
  - [ ] Mobile-friendly

### Network

- [ ] **Assets**
  - [ ] CSS minified
  - [ ] JavaScript minified
  - [ ] Images optimized
  - [ ] Gzip compression enabled
  - [ ] Proper caching headers

- [ ] **Requests**
  - [ ] Minimal HTTP requests
  - [ ] No 404 errors
  - [ ] No failed requests
  - [ ] Efficient loading order

---

## ♿ 4. Accessibility Testing

### Keyboard Navigation

- [ ] **Tab Order**
  - [ ] Logical tab order
  - [ ] All interactive elements reachable
  - [ ] Focus indicators visible
  - [ ] No keyboard traps

- [ ] **Keyboard Shortcuts**
  - [ ] Enter activates buttons/links
  - [ ] Escape closes modals
  - [ ] Arrow keys work (if applicable)

### Screen Reader

Test with NVDA (Windows) or VoiceOver (Mac):

- [ ] **Content**
  - [ ] All text read correctly
  - [ ] Images have alt text
  - [ ] Links descriptive
  - [ ] Headings announced
  - [ ] Form labels associated

- [ ] **Navigation**
  - [ ] Landmarks identified
  - [ ] Skip links work (if added)
  - [ ] Modal focus management
  - [ ] Proper ARIA labels

### Color Contrast

Use WebAIM Contrast Checker:

- [ ] **Text**
  - [ ] Body text: 4.5:1 minimum
  - [ ] Large text: 3:1 minimum
  - [ ] Accent on dark: 12.5:1 ✅
  - [ ] All text passes WCAG AA

- [ ] **Interactive Elements**
  - [ ] Buttons have sufficient contrast
  - [ ] Links distinguishable
  - [ ] Focus indicators visible

### Visual Impairments

- [ ] **Zoom**
  - [ ] Page usable at 200% zoom
  - [ ] No horizontal scroll at 200%
  - [ ] Text doesn't overlap

- [ ] **Color Blindness**
  - [ ] Information not conveyed by color alone
  - [ ] Test with color blindness simulator
  - [ ] Icons/text provide context

---

## 🌐 5. Browser Compatibility Testing

### Desktop Browsers

- [ ] **Chrome (latest)**
  - [ ] Layout correct
  - [ ] Animations smooth
  - [ ] All features work
  - [ ] No console errors

- [ ] **Firefox (latest)**
  - [ ] Layout correct
  - [ ] Animations smooth
  - [ ] All features work
  - [ ] No console errors

- [ ] **Safari (latest)**
  - [ ] Layout correct
  - [ ] Animations smooth
  - [ ] All features work
  - [ ] No console errors

- [ ] **Edge (latest)**
  - [ ] Layout correct
  - [ ] Animations smooth
  - [ ] All features work
  - [ ] No console errors

### Mobile Browsers

- [ ] **Mobile Safari (iOS)**
  - [ ] Layout correct
  - [ ] Touch interactions work
  - [ ] Smooth scrolling
  - [ ] No viewport issues

- [ ] **Mobile Chrome (Android)**
  - [ ] Layout correct
  - [ ] Touch interactions work
  - [ ] Smooth scrolling
  - [ ] No viewport issues

---

## 📱 6. Mobile Testing

### Devices to Test

- [ ] **iPhone (iOS)**
  - [ ] iPhone SE (small screen)
  - [ ] iPhone 12/13/14 (standard)
  - [ ] iPhone 14 Pro Max (large)

- [ ] **Android**
  - [ ] Small device (< 5.5")
  - [ ] Standard device (5.5" - 6.5")
  - [ ] Large device (> 6.5")

### Mobile-Specific Tests

- [ ] **Touch Interactions**
  - [ ] Tap targets large enough
  - [ ] Swipe gestures work (if any)
  - [ ] No accidental taps
  - [ ] Smooth scrolling

- [ ] **Viewport**
  - [ ] No horizontal scroll
  - [ ] Content fits screen
  - [ ] Proper scaling
  - [ ] No zoom issues

- [ ] **Performance**
  - [ ] Fast load on 3G/4G
  - [ ] Smooth animations
  - [ ] No lag or jank
  - [ ] Battery efficient

---

## 💾 7. CMS Testing

### Admin Panel Access

- [ ] **Login**
  - [ ] Admin panel accessible at `/admin.html`
  - [ ] Login form displays
  - [ ] Can login with credentials
  - [ ] Invalid credentials show error
  - [ ] Session persists on refresh

- [ ] **Logout**
  - [ ] Logout button works
  - [ ] Redirects to login
  - [ ] Session cleared

### Case Studies Management

- [ ] **View Case Studies**
  - [ ] All case studies listed
  - [ ] Published/draft status visible
  - [ ] Images display
  - [ ] Sorted by date (newest first)

- [ ] **Add Case Study**
  - [ ] "Add New" button works
  - [ ] Modal opens
  - [ ] All form fields present
  - [ ] Can fill in all fields
  - [ ] Image URL field works
  - [ ] Tags input works (comma-separated)
  - [ ] Metrics fields work
  - [ ] Published toggle works
  - [ ] Save button works
  - [ ] New case study appears in list
  - [ ] New case study appears on website (if published)

- [ ] **Edit Case Study**
  - [ ] Edit button works
  - [ ] Modal opens with existing data
  - [ ] Can modify all fields
  - [ ] Save button updates data
  - [ ] Changes reflect in list
  - [ ] Changes reflect on website

- [ ] **Delete Case Study**
  - [ ] Delete button works
  - [ ] Confirmation dialog appears
  - [ ] Can cancel deletion
  - [ ] Can confirm deletion
  - [ ] Case study removed from list
  - [ ] Case study removed from website

- [ ] **Publish/Unpublish**
  - [ ] Can toggle published status
  - [ ] Published case studies appear on website
  - [ ] Unpublished case studies hidden from website
  - [ ] Status updates immediately

### Contact Submissions

- [ ] **View Submissions**
  - [ ] All submissions listed
  - [ ] Table displays correctly
  - [ ] Sorted by date (newest first)
  - [ ] All columns visible (Name, Email, Budget, Date)

- [ ] **View Details**
  - [ ] "View Details" button works
  - [ ] Full message displayed
  - [ ] All information visible
  - [ ] Can close details

### Website Settings

- [ ] **View Settings**
  - [ ] Settings tab accessible
  - [ ] All fields display current values
  - [ ] Fields editable

- [ ] **Update Settings**
  - [ ] Can modify site title
  - [ ] Can modify site description
  - [ ] Can modify contact email
  - [ ] Can modify contact phone
  - [ ] Save button works
  - [ ] Success message displays
  - [ ] Changes persist on refresh

---

## 🔍 8. Database Testing

### Supabase Connection

- [ ] **Connection**
  - [ ] Website connects to Supabase
  - [ ] Admin panel connects to Supabase
  - [ ] No connection errors in console
  - [ ] Proper error handling if offline

### Data Integrity

- [ ] **Case Studies**
  - [ ] Data saves correctly
  - [ ] Data retrieves correctly
  - [ ] Filtering works
  - [ ] Sorting works
  - [ ] No data loss

- [ ] **Contact Submissions**
  - [ ] Form data saves correctly
  - [ ] All fields captured
  - [ ] Timestamps correct
  - [ ] No duplicate submissions

### Security

- [ ] **Row Level Security**
  - [ ] Public can view published case studies only
  - [ ] Public cannot view unpublished case studies
  - [ ] Public can submit contact forms
  - [ ] Public cannot view contact submissions
  - [ ] Authenticated users have full access

- [ ] **Authentication**
  - [ ] Cannot access admin without login
  - [ ] Session expires appropriately
  - [ ] Logout clears session
  - [ ] No sensitive data exposed

---

## 📋 Testing Checklist Summary

### Critical (Must Pass)

- [ ] Website loads without errors
- [ ] All navigation works
- [ ] Contact form submits
- [ ] Case studies display
- [ ] Admin panel accessible
- [ ] Can add/edit case studies
- [ ] Mobile responsive
- [ ] No console errors

### Important (Should Pass)

- [ ] Animations smooth
- [ ] Lighthouse score 90+
- [ ] All browsers work
- [ ] Accessibility WCAG AA
- [ ] Performance good
- [ ] CMS fully functional

### Nice to Have (Can Improve Later)

- [ ] Perfect Lighthouse scores
- [ ] Advanced animations
- [ ] Additional features
- [ ] Performance optimizations

---

## 🐛 Bug Reporting Template

When you find a bug, report it using this format:

```
**Bug Title**: [Short description]

**Severity**: Critical / High / Medium / Low

**Steps to Reproduce**:
1. Go to...
2. Click on...
3. See error...

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happens]

**Screenshots**:
[If applicable]

**Environment**:
- Browser: [e.g., Chrome 120]
- Device: [e.g., iPhone 14]
- OS: [e.g., iOS 17]
- Screen Size: [e.g., 390x844]

**Console Errors**:
[Any errors from browser console]
```

---

## ✅ Sign-Off

Once all tests pass:

- [ ] All critical tests passed
- [ ] All important tests passed
- [ ] Bugs documented and prioritized
- [ ] Performance acceptable
- [ ] Accessibility compliant
- [ ] Ready for deployment

**Tested By**: ___________________

**Date**: ___________________

**Status**: ☐ Pass ☐ Fail ☐ Pass with Minor Issues

**Notes**:
_______________________________________
_______________________________________
_______________________________________

---

## 🎉 Testing Complete!

If all tests pass, the website is ready for production deployment!

For deployment instructions, see `DEPLOYMENT_CHECKLIST.md`
