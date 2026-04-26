import './style.css'
import { createClient } from '@supabase/supabase-js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from '@studio-freight/lenis'

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// GSAP ScrollTrigger Integration with Lenis
gsap.registerPlugin(ScrollTrigger)

async function fetchProjectBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

function renderProject(project) {
  const container = document.getElementById('project-container')
  
  if (!project) {
    container.innerHTML = `
      <div class="max-w-4xl mx-auto px-6 text-center py-32">
        <h1 class="text-4xl font-heading font-bold text-slate-900 mb-4">Project Not Found</h1>
        <p class="text-slate-600 mb-8">The project you are looking for does not exist or is not published yet.</p>
        <a href="/" class="bg-[#CCFF00] text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-[#b3e600] transition-colors">Return to Home</a>
      </div>
    `
    container.classList.remove('hidden')
    return
  }

  // SEO Injection
  document.title = project.meta_title ? project.meta_title : `${project.title} | ESET Creatives`
  const metaDesc = document.getElementById('meta-description')
  if (metaDesc) {
    metaDesc.content = project.meta_desc ? project.meta_desc : (project.challenge || '').substring(0, 160)
  }

  // Hero Background
  let heroBackgroundHtml = ''
  if (project.youtube_id) {
    heroBackgroundHtml = `
      <div class="absolute inset-0 z-0 w-full h-full overflow-hidden bg-slate-100">
        <iframe 
          class="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 mix-blend-multiply object-cover"
          src="https://www.youtube.com/embed/${project.youtube_id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${project.youtube_id}&modestbranding=1" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen>
        </iframe>
        <div class="absolute inset-0 bg-slate-50/80 backdrop-blur-sm"></div>
      </div>
    `
  } else {
    heroBackgroundHtml = `
      <div class="absolute inset-0 z-0 w-full h-full overflow-hidden bg-slate-100">
        <img src="${project.hero_image}" alt="${project.title}" class="w-full h-full object-cover opacity-20 mix-blend-multiply scale-105">
        <div class="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/50 to-slate-50"></div>
      </div>
    `
  }

  // Client Quote
  let quoteHtml = ''
  if (project.client_quote) {
    quoteHtml = `
      <div class="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 border-y border-slate-200 my-24 bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm">
        <blockquote class="text-3xl md:text-5xl font-heading font-bold text-brand-dark text-center leading-tight mb-8">
          "${project.client_quote}"
        </blockquote>
        ${project.client_name ? `
          <div class="text-center">
            <div class="text-slate-900 font-bold text-xl uppercase tracking-widest">${project.client_name}</div>
            ${project.client_role ? `<div class="text-slate-500 mt-2">${project.client_role}</div>` : ''}
          </div>
        ` : ''}
      </div>
    `
  }

  // Gallery
  let galleryHtml = ''
  if (project.gallery && project.gallery.length > 0) {
    galleryHtml = `
      <div class="w-full py-24">
        <div class="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          ${project.gallery.map(img => `
            <div class="gallery-item w-full px-4 md:px-12">
              <img src="${img}" alt="Project Showcase" class="w-full h-auto object-cover rounded-3xl shadow-xl border border-slate-100">
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  // Metrics
  let metricsHtml = ''
  if (project.metrics && Object.keys(project.metrics).length > 0) {
    metricsHtml = `
      <div id="sticky-metrics" class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl">
        <h4 class="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Measurable Impact</h4>
        <div class="space-y-8">
          ${Object.entries(project.metrics).map(([key, value]) => `
            <div class="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
              <div class="text-4xl md:text-5xl font-bold text-brand-mid mb-2">${value}</div>
              <div class="text-sm text-slate-500 font-semibold uppercase tracking-widest">${key}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `
  }

  // Make sure body is light
  document.body.classList.add('bg-slate-50', 'text-slate-900')
  document.body.classList.remove('bg-[#0F172A]', 'text-white')

  container.innerHTML = `
    <!-- The Hero -->
    <div class="relative w-full h-[100vh] flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 -mt-24">
      ${heroBackgroundHtml}
      
      <div class="relative z-10 max-w-7xl mx-auto w-full">
        <div class="flex flex-wrap gap-2 mb-6 hero-anim">
          <span class="px-4 py-1.5 bg-white/90 text-slate-700 text-xs font-bold rounded-full uppercase tracking-widest border border-slate-200 shadow-sm backdrop-blur-md">
            ${project.category.replace('-', ' ')}
          </span>
        </div>
        
        <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-slate-950 leading-[1.05] tracking-tight mb-8 max-w-5xl">
          ${project.title}
        </h1>
        
        <p class="hero-motto text-xl md:text-2xl text-slate-600 font-medium tracking-wide uppercase">
          <span class="text-brand-mid font-bold">Deep Craft.</span> Distinct Value.
        </p>
      </div>
    </div>

    <!-- The Narrative -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
      
      <!-- Left Column: Storytelling -->
      <div class="lg:col-span-7 space-y-20">
        <!-- The Challenge -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-slate-950 mb-8">
            <span class="w-12 h-1 bg-accent"></span> 
            The Challenge
          </h3>
          <p class="text-slate-600 text-xl leading-relaxed font-light whitespace-pre-wrap">${project.challenge}</p>
        </div>

        <!-- The Solution -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-slate-950 mb-8">
            <span class="w-12 h-1 bg-brand-mid"></span> 
            The Solution
          </h3>
          <p class="text-slate-600 text-xl leading-relaxed font-light whitespace-pre-wrap">${project.solution}</p>
        </div>

        <!-- The Results -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-slate-950 mb-8">
            <span class="w-12 h-1 bg-brand-light"></span> 
            The Results
          </h3>
          <p class="text-slate-600 text-xl leading-relaxed font-light whitespace-pre-wrap">${project.results}</p>
        </div>
      </div>

      <!-- Right Column: Sticky Metrics Sidebar -->
      <div class="lg:col-span-5 relative">
        <div class="sticky top-32" id="metrics-sidebar-container">
          ${metricsHtml}
        </div>
      </div>
    </div>

    ${quoteHtml}
    ${galleryHtml}

    <!-- CTA Footer -->
    <div class="w-full bg-accent py-32 mt-24">
      <div class="max-w-4xl mx-auto px-6 text-center text-slate-950">
        <h2 class="text-5xl md:text-7xl font-heading font-bold mb-8 tracking-tight">Ready to engineer growth?</h2>
        <a href="/#contact" class="inline-flex items-center justify-center gap-3 bg-slate-950 hover:bg-slate-800 text-white px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105">
          Start a Project
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  `
  container.classList.remove('hidden')

  // Animations
  initAnimations()
}

function initAnimations() {
  // Hero Animations
  const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })
  
  tl.fromTo('.hero-anim', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, delay: 0.2 }
  )
  .fromTo('.hero-title',
    { y: 50, opacity: 0, scale: 0.98 },
    { y: 0, opacity: 1, scale: 1 },
    '-=0.8'
  )
  .fromTo('.hero-motto',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1 },
    '-=1.0'
  )

  // Story Blocks fade in
  gsap.utils.toArray('.story-block').forEach(block => {
    gsap.fromTo(block, 
      { y: 50, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Sticky Metrics Animation
  const metrics = document.getElementById('sticky-metrics')
  if (metrics) {
    gsap.fromTo(metrics,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: metrics,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Gallery Images Fade-and-Scale Entrance
  gsap.utils.toArray('.gallery-item img').forEach(img => {
    gsap.fromTo(img,
      { scale: 0.9, opacity: 0, y: 50 },
      {
        scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power3.out',
        scrollTrigger: {
          trigger: img,
          start: 'top 90%',
          end: 'top 30%',
          scrub: 0.5
        }
      }
    )
  })
}

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const slug = urlParams.get('p')

  if (!slug) {
    window.location.href = '/'
    return
  }

  const loader = document.getElementById('loader')
  const project = await fetchProjectBySlug(slug)
  
  loader.style.display = 'none'
  renderProject(project)
})
