import { injectSpeedInsights } from '@vercel/speed-insights'
import { createClient } from '@supabase/supabase-js'

// Initialize Speed Insights
injectSpeedInsights()

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Official Brand SVGs for a "Realistic" look
const BRAND_ICONS = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.303 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.204 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.374 20.071 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.927 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.162 12 18.162C15.403 18.162 18.162 15.403 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="url(#ig-grad)"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#229ED9"/><path d="M5.49405 11.9687L18.8248 6.82909C19.4431 6.58611 19.9814 6.95371 19.7828 7.89311L17.5117 18.5901C17.3409 19.3592 16.8841 19.5492 16.2396 19.1873L12.7801 16.6384L11.1105 18.2449C10.9254 18.43 10.771 18.5851 10.4137 18.5851L10.6622 15.0592L17.0818 9.25555C17.3609 9.00683 17.0221 8.86877 16.6508 9.11634L8.71181 14.1147L5.30058 13.048C4.55836 12.8157 4.54471 12.3045 5.45506 11.9472L5.49405 11.9687Z" fill="white"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.223 0H1.771C0.792 0 0 0.774 0 1.729V22.27C0 23.226 0.792 24 1.771 24H22.223C23.201 24 24 23.226 24 22.271V1.729C24 0.774 23.201 0 22.223 0ZM7.12 20.452H3.558V8.995H7.12V20.452ZM5.339 7.433C4.198 7.433 3.273 6.507 3.273 5.37C3.273 4.232 4.198 3.307 5.339 3.307C6.477 3.307 7.403 4.232 7.403 5.37C7.403 6.507 6.477 7.433 5.339 7.433ZM20.451 20.452H16.89V14.877C16.89 13.548 16.864 11.838 15.039 11.838C13.188 11.838 12.903 13.284 12.903 14.78V20.452H9.342V8.995H12.76V10.561H12.808C13.284 9.658 14.446 8.71 16.176 8.71C19.774 8.71 20.452 11.078 20.452 14.162V20.452H20.451Z" fill="#0077B5"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.525 0H8.334v16.143c0 2.622-2.126 4.748-4.748 4.748-2.622 0-4.748-2.126-4.748-4.748 0-2.622 2.126-4.748 4.748-4.748.173 0 .341.014.506.035V7.129a8.91 8.91 0 0 0-5.254 1.706C-0.34 9.774-0.34 14.226 2.66 17.226c3 3 7.452 3 10.391 0.062V12.525h4.191v-4.191h-4.191V4.143C16.666 4.143 20 7.477 20 11.619v1.443h4V11.619c0-6.417-5.202-11.619-11.619-11.619h-0.381V0h0.525z" fill="white"/></svg>`
};

const IG_GRADIENT = `
<svg width="0" height="0" style="position: absolute;">
  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color:#f09433" />
    <stop offset="25%" style="stop-color:#e6683c" />
    <stop offset="50%" style="stop-color:#dc2743" />
    <stop offset="75%" style="stop-color:#cc2366" />
    <stop offset="100%" style="stop-color:#bc1888" />
  </linearGradient>
</svg>`;

async function initializeLinksPage() {
    // Add the gradient definition to the body
    document.body.insertAdjacentHTML('beforeend', IG_GRADIENT);

    try {
        const { data: profile, error: pError } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single()

        if (pError && pError.code !== 'PGRST116') throw pError

        const { data: links, error: lError } = await supabase
            .from('bio_links')
            .select('*')
            .eq('is_active', true)
            .order('priority', { ascending: true })

        if (lError) throw lError

        renderProfile(profile)
        renderSocials(profile)
        renderLinks(links)
        
    } catch (error) {
        console.error('Error initializing links page:', error)
    }
}

function renderProfile(profile) {
    if (!profile) return
    const bioImg = document.getElementById('bio-img')
    if (profile.bio_image) {
        bioImg.src = profile.bio_image
    } else {
        bioImg.removeAttribute('src')
    }
    document.getElementById('bio-name').textContent = profile.bio_name || 'ESET Creatives'
    document.getElementById('bio-desc').textContent = profile.bio_description || 'Architecting Visual Authority'
}

function renderSocials(profile) {
    const row = document.getElementById('social-row')
    if (!profile) return

    const socialsList = [
        { key: 'social_instagram', type: 'instagram', label: 'Instagram' },
        { key: 'social_telegram', type: 'telegram', label: 'Telegram' },
        { key: 'social_linkedin', type: 'linkedin', label: 'LinkedIn' },
        { key: 'social_tiktok', type: 'tiktok', label: 'TikTok' }
    ]

    const activeSocials = socialsList.filter(s => profile[s.key] && profile[s.key].trim() !== '')

    if (activeSocials.length === 0) {
        row.style.display = 'none'
        return
    }

    row.style.display = 'flex'
    row.innerHTML = activeSocials.map(s => `
        <a href="${profile[s.key]}" target="_blank" class="social-btn" aria-label="${s.label}" style="padding: 10px;">
            <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
                ${BRAND_ICONS[s.type]}
            </div>
        </a>
    `).join('')
}

function renderLinks(links) {
    const stack = document.getElementById('link-stack')
    if (!links) return
    stack.innerHTML = links.map(link => `
        <a href="${link.url}" 
           class="link-bar ${link.is_featured ? 'featured' : ''}" 
           onclick="trackClick(${link.id})">
            ${link.label}
        </a>
    `).join('')
}

window.trackClick = async (id) => {
    await supabase.rpc('increment_link_clicks', { link_id: id })
}

initializeLinksPage()
