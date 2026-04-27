import './style.css'
import { injectSpeedInsights } from '@vercel/speed-insights'
import { inject } from '@vercel/analytics'
import { createClient } from '@supabase/supabase-js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'
import SplitType from 'split-type'

// Initialize Vercel Services
injectSpeedInsights()
inject()

gsap.registerPlugin(ScrollTrigger)

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// ==================== SMOOTH SCROLL ====================
// ==================== SITE SETTINGS ====================
async function loadSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error && error.code !== 'PGRST116') throw error

    if (data) {
      // Update Title
      if (data.site_title) {
        document.title = data.site_title
      }

      // Update Meta Description
      if (data.site_description) {
        const metaDesc = document.querySelector('meta[name="description"]')
        if (metaDesc) metaDesc.setAttribute('content', data.site_description)
      }

      // Update Footer Contact
      const footerEmail = document.getElementById('footer-email')
      if (footerEmail && data.contact_email) {
        footerEmail.href = `mailto:${data.contact_email}`
        footerEmail.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          ${data.contact_email}
        `
      }

      const footerPhone = document.getElementById('footer-phone')
      if (footerPhone && data.contact_phone) {
        footerPhone.href = `tel:${data.contact_phone.replace(/\s+/g, '')}`
        footerPhone.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round">
              <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          ${data.contact_phone}
        `
      }
    }
  } catch (error) {
    console.error('Error loading site settings:', error)
  }
}

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
})

// Sync ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// ==================== BACKGROUND CANVAS ====================
const canvas = document.getElementById('bg-canvas')
if (canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = Math.random() * 0.5 - 0.25
      this.speedY = Math.random() * 0.5 - 0.25
      this.alpha = Math.random() * 0.5 + 0.2
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x > canvas.width) this.x = 0
      if (this.x < 0) this.x = canvas.width
      if (this.y > canvas.height) this.y = 0
      if (this.y < 0) this.y = canvas.height
    }
    draw() {
      ctx.globalAlpha = this.alpha
      ctx.fillStyle = '#b8e11e'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const particles = []
  const isMobile = window.innerWidth < 768
  const particleCount = isMobile ? 15 : 40 // Further reduced for performance
  for (let i = 0; i < particleCount; i++) particles.push(new Particle())

  let animationFrameId
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
    }
    animationFrameId = requestAnimationFrame(animateParticles)
  }
  
  // Only animate when tab is active
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId)
    } else {
      animateParticles()
    }
  })
  
  animateParticles()

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// ==================== ENTRANCE ANIMATION ====================
const entrance = document.getElementById('entrance')
const brandName = document.getElementById('brand-name')
const dustCanvas = document.getElementById('dustCanvas')

if (entrance && brandName && dustCanvas) {
  const dustCtx = dustCanvas.getContext('2d')
  dustCanvas.width = window.innerWidth
  dustCanvas.height = window.innerHeight

  class DustParticle {
    constructor() {
      this.x = Math.random() * dustCanvas.width
      this.y = Math.random() * dustCanvas.height
      this.size = Math.random() * 3 + 1
      this.speedX = Math.random() * 2 - 1
      this.speedY = Math.random() * 2 - 1
      this.alpha = Math.random() * 0.5 + 0.3
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.alpha -= 0.005
    }
    draw() {
      dustCtx.globalAlpha = this.alpha
      dustCtx.fillStyle = '#b8e11e'
      dustCtx.beginPath()
      dustCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      dustCtx.fill()
    }
  }

  const dustParticles = []
  const dustCount = (window.innerWidth < 768) ? 80 : 200
  for (let i = 0; i < dustCount; i++) dustParticles.push(new DustParticle())

  function animateDust() {
    dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height)
    dustParticles.forEach((p, i) => {
      p.update()
      p.draw()
      if (p.alpha <= 0) dustParticles.splice(i, 1)
    })
    if (dustParticles.length > 0) requestAnimationFrame(animateDust)
  }

  const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
  if (hasSeenIntro) {
    entrance.style.display = 'none'
    animateHeroElements()
  } else {
    // DRATICALLY SPEED UP INTRO FOR LCP (Total ~1s instead of ~3s)
    gsap.timeline()
      .to(brandName, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', onStart: animateDust })
      .to(brandName, { scale: 1.05, duration: 0.2, ease: 'power1.inOut' })
      .to(entrance, { opacity: 0, duration: 0.4, ease: 'power2.inOut', onComplete: () => {
        entrance.style.display = 'none'
        sessionStorage.setItem('hasSeenIntro', 'true')
        animateHeroElements()
      }})
  }
}

function animateHeroElements() {
  const heroElements = document.querySelectorAll('.hero-el')
  heroElements.forEach(el => el.style.willChange = 'transform, opacity')
  gsap.to(heroElements, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    onComplete: () => {
      heroElements.forEach(el => el.style.willChange = 'auto')
    }
  })
}

// ==================== MOBILE MENU ====================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')
const mobileMenuClose = document.getElementById('mobile-menu-close')

if (mobileMenuToggle && mobileMenu) {
  let isMobileMenuOpen = false
  const toggleMenu = (open) => {
    isMobileMenuOpen = open
    gsap.to(mobileMenu, { x: isMobileMenuOpen ? '0%' : '100%', duration: 0.5, ease: 'power3.inOut' })
    const spans = mobileMenuToggle.querySelectorAll('span')
    if (isMobileMenuOpen) {
      gsap.to(spans[0], { rotation: 45, y: 8, duration: 0.3 })
      gsap.to(spans[1], { opacity: 0, duration: 0.3 })
      gsap.to(spans[2], { rotation: -45, y: -8, duration: 0.3 })
    } else {
      gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 })
      gsap.to(spans[1], { opacity: 1, duration: 0.3 })
      gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 })
    }
  }
  mobileMenuToggle.addEventListener('click', () => toggleMenu(!isMobileMenuOpen))
  mobileMenuClose?.addEventListener('click', () => toggleMenu(false))
  mobileNavLinks.forEach(l => l.addEventListener('click', () => toggleMenu(false)))
}

// ==================== SCROLL ANIMATIONS ====================
gsap.utils.toArray('.fade-up').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { 
      trigger: el, 
      start: 'top 85%', // Slightly later start for smoother feel
      toggleActions: 'play none none reverse',
      fastScrollEnd: true // Performance optimization for fast scrolling
    },
    opacity: 0, 
    y: 30, // Reduced distance for smoother look
    duration: 0.8, 
    ease: 'power2.out'
  })
})

// ==================== PROJECTS ====================
const portfolioGrid = document.getElementById('portfolio-grid')
const filterButtons = document.querySelectorAll('.filter-btn')
let allProjects = []

async function fetchCaseStudies() {
  try {
    const { data, error } = await supabase.from('projects').select('*').eq('published', true).order('created_at', { ascending: false })
    if (error) throw error
    allProjects = data || []
    renderProjects(allProjects)
  } catch (error) {
    console.error('Error:', error)
    if (portfolioGrid) {
      portfolioGrid.innerHTML = `<div class="col-span-full text-center py-12"><p class="text-red-500 font-bold mb-2">Database Error: ${error.message}</p><p class="text-slate-500 text-sm">Please ensure you have run the supabase-schema.sql script.</p></div>`
    }
  }
}

function renderProjects(projects) {
  if (!portfolioGrid) return
  if (projects.length === 0) {
    portfolioGrid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-slate-500">No projects to show yet. Check back soon!</p></div>'
    return
  }
  
  portfolioGrid.innerHTML = projects.map(p => {
    const tagsHtml = (p.tags || []).map(t => `<span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full capitalize">${t}</span>`).join('')
    const metricsHtml = Object.entries(p.metrics || {}).slice(0, 3).map(([k, v]) => `<div><div class="text-xl md:text-2xl font-bold text-brand-mid">${v}</div><div class="text-[10px] md:text-xs text-slate-500 uppercase tracking-wide truncate">${k}</div></div>`).join('')
    
    // Fallback for description if it doesn't exist yet
    const description = p.description || (p.challenge ? p.challenge.substring(0, 100) + '...' : 'No description available.');

    return `
      <div class="case-study-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer" data-project-slug="${p.slug}">
        <div class="relative h-56 md:h-72 overflow-hidden">
          <img src="${p.hero_image}" alt="${p.title}" class="case-study-image w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" width="800" height="600">
          <div class="absolute top-4 right-4 flex gap-2 flex-wrap justify-end">${tagsHtml}</div>
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        <div class="p-5 md:p-6 space-y-3 md:space-y-4">
          <h3 class="text-xl md:text-2xl font-heading font-bold text-slate-950 group-hover:text-brand-mid transition-colors">${p.title}</h3>
          <p class="text-slate-600 text-sm md:text-base line-clamp-2">${description}</p>
          <div class="grid grid-cols-3 gap-2 md:gap-4 pt-4 border-t border-slate-100">${metricsHtml}</div>
          <button class="w-full mt-4 py-3 bg-slate-950 text-white rounded-xl font-semibold hover:bg-accent hover:text-slate-950 transition-all shadow-sm">View Case Study</button>
        </div>
      </div>`
  }).join('')

  document.querySelectorAll('.case-study-card').forEach(card => {
    card.addEventListener('click', () => {
      openCaseStudyModal(card.dataset.projectSlug)
    })
  })
}

// ==================== CASE STUDY MODAL LOGIC ====================
const caseStudyModal = document.getElementById('case-study-modal')
const closeCaseStudyBtn = document.getElementById('close-case-study')
const modalProjectContent = document.getElementById('modal-project-content')
const modalLoader = document.getElementById('modal-loader')

async function openCaseStudyModal(slug) {
  if (!caseStudyModal) return

  // Show modal and loader
  caseStudyModal.classList.add('active')
  modalLoader.style.display = 'flex'
  modalProjectContent.innerHTML = ''
  modalProjectContent.classList.add('hidden')
  document.body.style.overflow = 'hidden' // Prevent background scroll

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error

    if (data) {
      renderModalProject(data)
    }
  } catch (error) {
    console.error('Error fetching project:', error)
    modalProjectContent.innerHTML = `
      <div class="p-12 text-center">
        <h3 class="text-2xl font-bold text-white mb-4">Error loading project</h3>
        <p class="text-white/60 mb-8">${error.message}</p>
        <button onclick="closeModal()" class="px-8 py-3 bg-accent text-slate-950 font-bold rounded-full">Close</button>
      </div>
    `
    modalLoader.style.display = 'none'
    modalProjectContent.classList.remove('hidden')
  }
}

function renderModalProject(project) {
  const metricsHtml = Object.entries(project.metrics || {}).map(([k, v]) => `
    <div class="metric-item border-b border-white/10 pb-6 last:border-0 last:pb-0">
      <div class="text-4xl md:text-5xl font-bold text-accent mb-1">${v}</div>
      <div class="text-xs text-white/50 uppercase tracking-widest font-semibold">${k}</div>
    </div>
  `).join('')

  const galleryHtml = (project.gallery || []).map(img => `
    <div class="modal-gallery-item overflow-hidden rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl">
      <img src="${img}" alt="Gallery image" class="w-full h-auto object-cover" loading="lazy">
    </div>
  `).join('')

  const heroBg = project.youtube_id ? `
    <div class="absolute inset-0 z-0">
      <iframe 
        class="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen object-cover"
        src="https://www.youtube.com/embed/${project.youtube_id}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${project.youtube_id}" 
        frameborder="0" allow="autoplay; encrypted-media"></iframe>
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark"></div>
    </div>
  ` : `
    <div class="absolute inset-0 z-0">
      <img src="${project.hero_image}" class="w-full h-full object-cover opacity-40">
      <div class="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark"></div>
    </div>
  `

  modalProjectContent.innerHTML = `
    <!-- Hero Section -->
    <div class="relative w-full min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end p-8 md:p-16 overflow-hidden">
      ${heroBg}
      <div class="relative z-10 space-y-4">
        <span class="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent">
          ${project.category.replace('-', ' ')}
        </span>
        <h2 class="modal-title text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight max-w-4xl">
          ${project.title}
        </h2>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-16">
      <div class="lg:col-span-7 space-y-16">
        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Challenge
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${project.challenge}</p>
        </div>

        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Solution
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${project.solution}</p>
        </div>

        <div class="narrative-block">
          <h4 class="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <span class="w-8 h-[1px] bg-accent"></span> The Results
          </h4>
          <p class="text-xl md:text-2xl text-white/80 font-light leading-relaxed whitespace-pre-wrap">${project.results}</p>
        </div>
      </div>

      <!-- Sidebar -->
      <aside class="lg:col-span-5">
        <div class="sticky top-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 space-y-10">
          <div>
            <h4 class="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Performance Data</h4>
            <div class="space-y-8">
              ${metricsHtml}
            </div>
          </div>
          
          ${project.client_quote ? `
            <div class="pt-10 border-t border-white/10">
              <blockquote class="text-xl italic text-white/90 leading-relaxed mb-6">
                "${project.client_quote}"
              </blockquote>
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  ${project.client_name ? project.client_name.charAt(0) : 'C'}
                </div>
                <div>
                  <div class="font-bold text-white">${project.client_name || 'Client'}</div>
                  <div class="text-xs text-white/50">${project.client_role || ''}</div>
                </div>
              </div>
            </div>
          ` : ''}
        </div>
      </aside>
    </div>

    <!-- Gallery -->
    <div class="p-8 md:p-16 space-y-8 md:space-y-16">
      <h4 class="text-center text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Project Showcase</h4>
      <div class="space-y-12 md:space-y-24 max-w-6xl mx-auto">
        ${galleryHtml}
      </div>
    </div>

    <!-- CTA -->
    <div class="bg-accent p-12 md:p-24 text-center">
      <h3 class="text-3xl md:text-5xl font-heading font-bold text-slate-950 mb-8 tracking-tight">Ready for similar impact?</h3>
      <button onclick="closeModalAndScrollToContact()" class="px-10 py-5 bg-slate-950 text-white font-bold rounded-full text-xl hover:scale-105 transition-transform">
        Start Your Project
      </button>
    </div>
  `

  modalLoader.style.display = 'none'
  modalProjectContent.classList.remove('hidden')

  // Animate Content
  gsap.from('.modal-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.2 })
  gsap.from('.narrative-block', { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', delay: 0.4 })
  gsap.from('.metric-item', { scale: 0.9, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.6 })
}

function closeModal() {
  caseStudyModal.classList.remove('active')
  document.body.style.overflow = ''
}

window.closeModalAndScrollToContact = () => {
  closeModal()
  setTimeout(() => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }, 400)
}

if (closeCaseStudyBtn) {
  closeCaseStudyBtn.addEventListener('click', closeModal)
}

caseStudyModal?.addEventListener('click', (e) => {
  if (e.target === caseStudyModal) closeModal()
})

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && caseStudyModal.classList.contains('active')) {
    closeModal()
  }
})

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter
    filterButtons.forEach(b => {
      b.classList.remove('active', 'bg-white', 'text-slate-950', 'shadow-sm')
      b.classList.add('text-slate-500')
    })
    btn.classList.add('active', 'bg-white', 'text-slate-950', 'shadow-sm')
    const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter)
    renderProjects(filtered)
  })
})

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalBtnText = submitBtn.innerHTML
    
    submitBtn.disabled = true
    submitBtn.innerHTML = '<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5 text-slate-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</span>'

    const formData = {
      first_name: document.getElementById('contact-first-name').value,
      last_name: document.getElementById('contact-last-name').value,
      email: document.getElementById('contact-email').value,
      phone: document.getElementById('contact-phone').value,
      company: document.getElementById('contact-company').value,
      role: document.getElementById('contact-role').value,
      message: document.getElementById('contact-message').value,
      created_at: new Date().toISOString()
    }
    try {
      const { error } = await supabase.from('contact_submissions').insert([formData])
      if (error) throw error
      alert('Thank you! We\'ll be in touch soon.')
      contactForm.reset()
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      submitBtn.disabled = false
      submitBtn.innerHTML = originalBtnText
    }
  })
}

// ==================== MAGNETIC BUTTONS ====================
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3
      gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
    })
  })
}

const splitHeading = document.querySelector('.split-heading')
if (splitHeading) {
  const split = new SplitType('.split-heading', { types: 'chars' })
  gsap.from(split.chars, {
    scrollTrigger: { trigger: '.split-heading', start: 'top 80%' },
    opacity: 0, y: 20, stagger: 0.05, duration: 0.8, ease: 'power3.out'
  })
}

// Initialize - Defer for better LCP
if (window.requestIdleCallback) {
  requestIdleCallback(() => {
    loadSiteSettings()
    fetchCaseStudies()
  })
} else {
  setTimeout(() => {
    loadSiteSettings()
    fetchCaseStudies()
  }, 100)
}
