import{n as e,r as t,t as n}from"./dist--ngpHRUZ.js";/* empty css              */import{n as r,r as i,t as a}from"./lenis-B1cd2kmr.js";t(),e();var o=n(`https://nojgcsocmocwegfxtxse.supabase.co`,`sb_publishable_jYg3PjN-4vZJlaOvWHIr1w_dh8ubWlD`),s=new a({duration:1.2,easing:e=>Math.min(1,1.001-2**(-10*e)),direction:`vertical`,gestureDirection:`vertical`,smooth:!0,mouseMultiplier:1,smoothTouch:!1,touchMultiplier:2,infinite:!1});s.on(`scroll`,r.update),i.ticker.add(e=>{s.raf(e*1e3)}),i.ticker.lagSmoothing(0),i.registerPlugin(r);async function c(e){try{let{data:t,error:n}=await o.from(`projects`).select(`*`).eq(`slug`,e).eq(`published`,!0).single();if(n)throw n;return t}catch(e){return console.error(`Error fetching project:`,e),null}}function l(e){let t=document.getElementById(`project-container`);if(!e){t.innerHTML=`
      <div class="max-w-4xl mx-auto px-6 text-center py-32">
        <h1 class="text-4xl font-heading font-bold text-slate-900 mb-4">Project Not Found</h1>
        <p class="text-slate-600 mb-8">The project you are looking for does not exist or is not published yet.</p>
        <a href="/" class="bg-[#CCFF00] text-slate-950 px-8 py-3 rounded-full font-bold hover:bg-[#b3e600] transition-colors">Return to Home</a>
      </div>
    `,t.classList.remove(`hidden`);return}document.title=e.meta_title?e.meta_title:`${e.title} | ESET Creatives`;let n=document.getElementById(`meta-description`);n&&(n.content=e.meta_desc?e.meta_desc:(e.challenge||``).substring(0,160));let r=``;r=e.youtube_id?`
      <div class="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[#0d362e]">
        <iframe 
          class="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 mix-blend-screen object-cover"
          src="https://www.youtube.com/embed/${e.youtube_id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${e.youtube_id}&modestbranding=1" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen>
        </iframe>
        <div class="absolute inset-0 bg-gradient-to-b from-[#0d362e]/80 via-[#0d362e]/50 to-[#0d362e]"></div>
      </div>
    `:`
      <div class="absolute inset-0 z-0 w-full h-full overflow-hidden bg-[#0d362e]">
        <img src="${e.hero_image}" alt="${e.title}" class="w-full h-full object-cover opacity-50 scale-105" fetchpriority="high">
        <div class="absolute inset-0 bg-gradient-to-t from-[#0d362e] via-[#0d362e]/40 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#0d362e] via-transparent to-transparent opacity-80"></div>
      </div>
    `;let i=``;e.client_quote&&(i=`
      <div class="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 border-y border-white/10 my-24 bg-white/5 backdrop-blur-sm rounded-3xl shadow-sm">
        <blockquote class="text-3xl md:text-5xl font-heading font-bold text-white text-center leading-tight mb-8">
          "${e.client_quote}"
        </blockquote>
        ${e.client_name?`
          <div class="text-center">
            <div class="text-white font-bold text-xl uppercase tracking-widest">${e.client_name}</div>
            ${e.client_role?`<div class="text-accent mt-2">${e.client_role}</div>`:``}
          </div>
        `:``}
      </div>
    `);let a=``;e.gallery&&e.gallery.length>0&&(a=`
      <div class="w-full py-24">
        <div class="space-y-12 md:space-y-24 max-w-7xl mx-auto">
          ${e.gallery.map(e=>`
            <div class="gallery-item w-full px-4 md:px-12">
              <img src="${e}" alt="Project Showcase" class="w-full h-auto object-cover rounded-3xl shadow-2xl border border-white/10" loading="lazy" width="1600" height="900">
            </div>
          `).join(``)}
        </div>
      </div>
    `);let o=``;e.metrics&&Object.keys(e.metrics).length>0&&(o=`
      <div id="sticky-metrics" class="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
        <h4 class="text-sm font-bold text-white/50 uppercase tracking-widest mb-8">Measurable Impact</h4>
        <div class="space-y-8">
          ${Object.entries(e.metrics).map(([e,t])=>`
            <div class="border-b border-white/10 pb-8 last:border-0 last:pb-0">
              <div class="text-4xl md:text-5xl font-bold text-accent mb-2">${t}</div>
              <div class="text-sm text-white/70 font-semibold uppercase tracking-widest">${e}</div>
            </div>
          `).join(``)}
        </div>
      </div>
    `),t.innerHTML=`
    <!-- The Hero -->
    <div class="relative w-full h-[100vh] flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-12 -mt-24">
      ${r}
      
      <div class="relative z-10 max-w-7xl mx-auto w-full">
        <div class="flex flex-wrap gap-2 mb-6 hero-anim">
          <span class="px-4 py-1.5 bg-white/10 text-white text-xs font-bold rounded-full uppercase tracking-widest border border-white/20 backdrop-blur-md">
            ${e.category.replace(`-`,` `)}
          </span>
        </div>
        
        <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.05] tracking-tight mb-8 max-w-5xl">
          ${e.title}
        </h1>
        
        <p class="hero-motto text-xl md:text-2xl text-white/70 font-medium tracking-wide uppercase">
          <span class="text-accent font-bold">Deep Craft.</span> Distinct Value.
        </p>
      </div>
    </div>

    <!-- The Narrative -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
      
      <!-- Left Column: Storytelling -->
      <div class="lg:col-span-7 space-y-20">
        <!-- The Challenge -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-white mb-8">
            <span class="w-12 h-1 bg-accent"></span> 
            The Challenge
          </h3>
          <p class="text-white/70 text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap">${e.challenge}</p>
        </div>

        <!-- The Solution -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-white mb-8">
            <span class="w-12 h-1 bg-brand-mid"></span> 
            The Solution
          </h3>
          <p class="text-white/70 text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap">${e.solution}</p>
        </div>

        <!-- The Results -->
        <div class="story-block">
          <h3 class="flex items-center gap-4 text-3xl md:text-4xl font-heading font-bold text-white mb-8">
            <span class="w-12 h-1 bg-white"></span> 
            The Results
          </h3>
          <p class="text-white/70 text-lg md:text-xl leading-relaxed font-light whitespace-pre-wrap">${e.results}</p>
        </div>
      </div>

      <!-- Right Column: Sticky Metrics Sidebar -->
      <div class="lg:col-span-5 relative">
        <div class="sticky top-32" id="metrics-sidebar-container">
          ${o}
        </div>
      </div>
    </div>

    ${i}
    ${a}

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
  `,t.classList.remove(`hidden`),u()}function u(){i.timeline({defaults:{ease:`power4.out`,duration:1.2}}).fromTo(`.hero-anim`,{y:30,opacity:0},{y:0,opacity:1,delay:.2}).fromTo(`.hero-title`,{y:50,opacity:0,scale:.98},{y:0,opacity:1,scale:1},`-=0.8`).fromTo(`.hero-motto`,{y:30,opacity:0},{y:0,opacity:1},`-=1.0`),i.utils.toArray(`.story-block`).forEach(e=>{i.fromTo(e,{y:30,opacity:0},{y:0,opacity:1,duration:.8,ease:`power2.out`,scrollTrigger:{trigger:e,start:`top 85%`,toggleActions:`play none none reverse`,fastScrollEnd:!0}})});let e=document.getElementById(`sticky-metrics`);e&&i.fromTo(e,{x:50,opacity:0},{x:0,opacity:1,duration:1,ease:`power3.out`,scrollTrigger:{trigger:e,start:`top 80%`,toggleActions:`play none none reverse`}}),i.utils.toArray(`.gallery-item img`).forEach(e=>{i.fromTo(e,{scale:.9,opacity:0,y:50},{scale:1,opacity:1,y:0,duration:1.5,ease:`power3.out`,scrollTrigger:{trigger:e,start:`top 90%`,end:`top 30%`,scrub:.5}})})}document.addEventListener(`DOMContentLoaded`,async()=>{let e=new URLSearchParams(window.location.search).get(`p`);if(!e){window.location.href=`/`;return}let t=document.getElementById(`loader`),n=await c(e);t.style.display=`none`,l(n)});