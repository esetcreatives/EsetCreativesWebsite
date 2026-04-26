import './style.css'
import { inject } from '@vercel/speed-insights'
import { createClient } from '@supabase/supabase-js'

// Initialize Speed Insights
inject()

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// DOM Elements
const loginScreen = document.getElementById('login-screen')
const adminPanel = document.getElementById('admin-panel')
const loginForm = document.getElementById('login-form')
const loginError = document.getElementById('login-error')
const logoutBtn = document.getElementById('logout-btn')
const userEmail = document.getElementById('user-email')

// Mobile Sidebar Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn')
const adminSidebar = document.getElementById('admin-sidebar')
const sidebarBackdrop = document.getElementById('sidebar-backdrop')

// Tab Elements
const tabBtns = document.querySelectorAll('.tab-btn')
const tabContents = document.querySelectorAll('.tab-content')

// Project Elements
const caseStudiesList = document.getElementById('case-studies-list')
const addCaseStudyBtn = document.getElementById('add-case-study-btn')
const projectModal = document.getElementById('project-modal')
const projectForm = document.getElementById('project-form')
const closeModalBtn = document.getElementById('close-modal-btn')
const cancelModalBtn = document.getElementById('cancel-modal-btn')

// Contact Elements
const contactsList = document.getElementById('contacts-list')

// Settings Elements
const saveSettingsBtn = document.getElementById('save-settings-btn')

// ==================== AUTH ====================
async function checkAuth() {

    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
        showAdminPanel(session.user)
    } else {
        showLoginScreen()
    }
}

function showLoginScreen() {
    loginScreen.classList.remove('hidden')
    adminPanel.classList.add('hidden')
}

function showAdminPanel(user) {
    loginScreen.classList.add('hidden')
    adminPanel.classList.remove('hidden')
    userEmail.textContent = user.email
    
    // Check if user is Superadmin (This would ideally come from a separate 'admins' lookup in a real app)
    // For now, we load everything but hide restricted tabs if they are not in the 'admins' table as superadmin
    checkUserRole(user.email)
    
    loadCaseStudies()
    loadContacts()
    loadSettings()
    loadBioLinks()
    loadAdmins()
}

async function checkUserRole(email) {
    const { data } = await supabase.from('admins').select('role').eq('email', email).single()
    const isSuperadmin = data?.role === 'superadmin'
    
    const settingsBtn = document.querySelector('[data-tab="settings"]')
    const adminsBtn = document.querySelector('[data-tab="admins"]')
    
    if (!isSuperadmin) {
        if (settingsBtn) settingsBtn.classList.add('hidden')
        if (adminsBtn) adminsBtn.classList.add('hidden')
    } else {
        if (settingsBtn) settingsBtn.classList.remove('hidden')
        if (adminsBtn) adminsBtn.classList.remove('hidden')
    }
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('login-email').value
    const password = document.getElementById('login-password').value
    
    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        
        if (error) throw error
        
        showAdminPanel(data.user)
    } catch (error) {
        loginError.textContent = error.message
        loginError.classList.remove('hidden')
    }
})

logoutBtn.addEventListener('click', async () => {
    await supabase.auth.signOut()
    showLoginScreen()
})

// Toggle Password Visibility
const togglePassword = document.getElementById('toggle-password')
if (togglePassword) {
    togglePassword.addEventListener('click', () => {
        const passwordInput = document.getElementById('login-password')
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password'
        passwordInput.setAttribute('type', type)
        
        // Update Icon
        togglePassword.innerHTML = type === 'password' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" /></svg>`
    })
}

// ==================== TABS ====================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab
        const tabTitle = btn.dataset.title || 'Dashboard'
        
        // Update page title
        const pageTitleEl = document.getElementById('page-title')
        if (pageTitleEl) pageTitleEl.textContent = tabTitle
        
        // Update buttons
        tabBtns.forEach(b => {
            b.classList.remove('active', 'bg-slate-900', 'text-white', 'shadow-sm')
            b.classList.add('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900')
            
            const icon = b.querySelector('svg')
            if (icon) {
                icon.classList.remove('opacity-90')
                icon.classList.add('opacity-70')
            }
        })
        
        btn.classList.add('active', 'bg-slate-900', 'text-white', 'shadow-sm')
        btn.classList.remove('text-slate-600', 'hover:bg-slate-50', 'hover:text-slate-900')
        
        const btnIcon = btn.querySelector('svg')
        if (btnIcon) {
            btnIcon.classList.remove('opacity-70')
            btnIcon.classList.add('opacity-90')
        }
        
        // Update content
        tabContents.forEach(content => content.classList.add('hidden'))
        document.getElementById(`${tabName}-tab`).classList.remove('hidden')
        
        // Load data for the tab
        if (tabName === 'case-studies') {
            loadCaseStudies()
        } else if (tabName === 'contacts') {
            loadContacts()
        } else if (tabName === 'links') {
            loadLinktreeSettings()
        } else if (tabName === 'settings') {
            loadSettings()
        } else if (tabName === 'admins') {
            loadAdmins()
        }
        
        // Close sidebar on mobile after clicking a tab
        if (window.innerWidth < 768) {
            closeSidebar()
        }
    })
})

// ==================== MOBILE MENU ====================
function openSidebar() {
    sidebarBackdrop.classList.remove('hidden')
    // small delay to allow display:block to apply before animating opacity
    setTimeout(() => {
        sidebarBackdrop.classList.remove('opacity-0')
        adminSidebar.classList.remove('-translate-x-full')
    }, 10)
}

function closeSidebar() {
    sidebarBackdrop.classList.add('opacity-0')
    adminSidebar.classList.add('-translate-x-full')
    setTimeout(() => {
        sidebarBackdrop.classList.add('hidden')
    }, 300)
}

mobileMenuBtn?.addEventListener('click', openSidebar)
sidebarBackdrop?.addEventListener('click', closeSidebar)

// ==================== PROJECTS ====================
let currentProject = null;

// Slug generator
document.getElementById('proj-title').addEventListener('input', (e) => {
    if (!document.getElementById('project-id').value) {
        document.getElementById('proj-slug').value = e.target.value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
});

// Metrics Builder
const metricsContainer = document.getElementById('metrics-container');
document.getElementById('add-metric-btn').addEventListener('click', () => {
    addMetricRow();
});

function addMetricRow(label = '', value = '') {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3 metric-row';
    row.innerHTML = `
        <div class="flex-1">
            <input type="text" placeholder="Label (e.g. ROI)" value="${label}" class="metric-label w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">
        </div>
        <div class="flex-1">
            <input type="text" placeholder="Value (e.g. 300%)" value="${value}" class="metric-value w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm">
        </div>
        <button type="button" class="text-red-500 hover:text-red-700 remove-metric-btn px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    `;
    row.querySelector('.remove-metric-btn').addEventListener('click', () => row.remove());
    metricsContainer.appendChild(row);
}

// Image Preview Logic
const heroInput = document.getElementById('proj-hero-image');
const heroPreviewContainer = document.getElementById('hero-preview-container');
const heroPreview = document.getElementById('hero-preview');
const removeHeroBtn = document.getElementById('remove-hero-btn');

const galleryInput = document.getElementById('proj-gallery');
const galleryPreviewContainer = document.getElementById('gallery-preview-container');

if (heroInput) {
    heroInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                heroPreview.src = e.target.result;
                heroPreviewContainer.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });
}

removeHeroBtn?.addEventListener('click', () => {
    heroInput.value = '';
    heroPreview.src = '';
    heroPreviewContainer.classList.add('hidden');
    if (currentProject) currentProject.hero_image = '';
});

if (galleryInput) {
    galleryInput.addEventListener('change', (e) => {
        galleryPreviewContainer.innerHTML = '';
        galleryPreviewContainer.classList.remove('hidden');
        Array.from(e.target.files).forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'relative group h-24 rounded-lg overflow-hidden border border-slate-200';
                div.innerHTML = `
                    <img src="${e.target.result}" class="w-full h-full object-cover">
                    <button type="button" class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
                div.querySelector('button').onclick = () => div.remove();
                galleryPreviewContainer.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });
}

async function uploadProjectAsset(file, slug) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${slug}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
        .from('project-assets')
        .upload(filePath, file, { upsert: true });
        
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
        .from('project-assets')
        .getPublicUrl(filePath);
        
    return data.publicUrl;
}

async function loadCaseStudies() {
    try {

        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        renderCaseStudies(data || []);
    } catch (error) {
        console.error('Error loading projects:', error);
        caseStudiesList.innerHTML = '<p class="text-slate-600 col-span-full text-center py-8">Error loading projects</p>';
    }
}

function renderCaseStudies(studies) {
    if (studies.length === 0) {
        caseStudiesList.innerHTML = '<p class="text-slate-500 col-span-full text-center py-8">No projects yet. Add your first one!</p>';
        return;
    }
    
    caseStudiesList.innerHTML = studies.map(study => `
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-200 hover:shadow-md transition-all flex flex-col h-full group">
            <div class="relative overflow-hidden h-48 flex-shrink-0 bg-slate-100">
                ${study.hero_image ? `<img src="${study.hero_image}" alt="${study.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">` : ''}
                <div class="absolute top-3 right-3">
                    <span class="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm ${study.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}">
                        ${study.published ? 'Published' : 'Draft'}
                    </span>
                </div>
            </div>
            <div class="p-6 space-y-4 flex flex-col flex-grow">
                <div>
                    <h3 class="text-lg font-heading font-bold text-slate-900 mb-1 leading-tight">${study.title}</h3>
                    <p class="text-sm text-slate-500 truncate">/${study.slug}</p>
                </div>
                <div class="flex gap-2 pt-4 mt-auto border-t border-slate-100">
                    <button onclick="editCaseStudy(${study.id})" class="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl transition-colors">
                        Edit
                    </button>
                    <button onclick="deleteCaseStudy(${study.id})" class="px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-xl hover:bg-red-100 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

addCaseStudyBtn.addEventListener('click', () => {
    document.getElementById('modal-title').textContent = 'Add Project';
    projectForm.reset();
    document.getElementById('project-id').value = '';
    metricsContainer.innerHTML = '';
    heroPreviewContainer.classList.add('hidden');
    galleryPreviewContainer.innerHTML = '';
    currentProject = null;
    projectModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));
cancelModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById('save-project-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    try {
        const id = document.getElementById('project-id').value;
        const slug = document.getElementById('proj-slug').value;
        
        // Build metrics
        const metrics = {};
        document.querySelectorAll('.metric-row').forEach(row => {
            const label = row.querySelector('.metric-label').value.trim();
            const value = row.querySelector('.metric-value').value.trim();
            if (label && value) metrics[label] = value;
        });

        let heroImageUrl = currentProject?.hero_image || '';
        const heroInput = document.getElementById('proj-hero-image');
        if (heroInput.files.length > 0) {
            heroImageUrl = await uploadProjectAsset(heroInput.files[0], slug);
        } else if (!heroImageUrl) {
            throw new Error('Hero image is required');
        }

        let galleryUrls = currentProject?.gallery || [];
        const galleryInput = document.getElementById('proj-gallery');
        if (galleryInput.files.length > 0) {
            for (let i = 0; i < galleryInput.files.length; i++) {
                const url = await uploadProjectAsset(galleryInput.files[i], slug);
                galleryUrls.push(url);
            }
        }
        
        const projectData = {
            title: document.getElementById('proj-title').value,
            slug: slug,
            category: document.getElementById('proj-category').value,
            hero_image: heroImageUrl,
            gallery: galleryUrls,
            youtube_id: document.getElementById('proj-youtube').value,
            metrics: metrics,
            challenge: document.getElementById('proj-challenge').value,
            solution: document.getElementById('proj-solution').value,
            results: document.getElementById('proj-results').value,
            client_quote: document.getElementById('proj-client-quote').value,
            client_name: document.getElementById('proj-client-name').value,
            client_role: document.getElementById('proj-client-role').value,
            meta_title: document.getElementById('proj-meta-title').value,
            meta_desc: document.getElementById('proj-meta-desc').value,
            published: document.getElementById('proj-published').checked
        };
        
        if (id) {
            const { error } = await supabase.from('projects').update(projectData).eq('id', id);
            if (error) throw error;
        } else {
            const { error } = await supabase.from('projects').insert([projectData]);
            if (error) throw error;
        }
        
        projectModal.classList.add('hidden');
        loadCaseStudies();
        alert('Project saved successfully!');
    } catch (error) {
        console.error('Error saving project:', error);
        alert('Error saving project: ' + error.message);
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
});

window.editCaseStudy = async (id) => {
    try {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
        if (error) throw error;
        
        currentProject = data;
        document.getElementById('modal-title').textContent = 'Edit Project';
        document.getElementById('project-id').value = data.id;
        document.getElementById('proj-title').value = data.title || '';
        document.getElementById('proj-slug').value = data.slug || '';
        document.getElementById('proj-category').value = data.category || 'web-dev';
        
        document.getElementById('proj-youtube').value = data.youtube_id || '';
        
        metricsContainer.innerHTML = '';
        if (data.metrics) {
            Object.entries(data.metrics).forEach(([k, v]) => addMetricRow(k, v));
        }
        
        document.getElementById('proj-challenge').value = data.challenge || '';
        document.getElementById('proj-solution').value = data.solution || '';
        document.getElementById('proj-results').value = data.results || '';
        document.getElementById('proj-client-quote').value = data.client_quote || '';
        document.getElementById('proj-client-name').value = data.client_name || '';
        document.getElementById('proj-client-role').value = data.client_role || '';
        document.getElementById('proj-meta-title').value = data.meta_title || '';
        document.getElementById('proj-meta-desc').value = data.meta_desc || '';
        document.getElementById('proj-published').checked = data.published || false;
        
        // Setup Previews
        if (data.hero_image) {
            heroPreview.src = data.hero_image;
            heroPreviewContainer.classList.remove('hidden');
        } else {
            heroPreviewContainer.classList.add('hidden');
        }

        if (data.gallery && data.gallery.length > 0) {
            galleryPreviewContainer.innerHTML = '';
            galleryPreviewContainer.classList.remove('hidden');
            data.gallery.forEach(url => {
                const div = document.createElement('div');
                div.className = 'relative group h-24 rounded-lg overflow-hidden border border-slate-200';
                div.innerHTML = `
                    <img src="${url}" class="w-full h-full object-cover">
                    <button type="button" class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                `;
                div.querySelector('button').onclick = () => {
                    div.remove();
                    currentProject.gallery = currentProject.gallery.filter(u => u !== url);
                };
                galleryPreviewContainer.appendChild(div);
            });
        }
        
        // Reset file inputs
        document.getElementById('proj-hero-image').value = '';
        document.getElementById('proj-gallery').value = '';
        
        projectModal.classList.remove('hidden');
    } catch (error) {
        console.error('Error loading project:', error);
        alert('Error loading project');
    }
}

window.deleteCaseStudy = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
        loadCaseStudies();
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
    }
}

// ==================== CONTACTS ====================
async function loadContacts() {
    try {

        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        
        renderContacts(data || [])
    } catch (error) {
        console.error('Error loading contacts:', error)
        contactsList.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-600">Error loading contacts</td></tr>'
    }
}

function renderContacts(contacts) {
    if (contacts.length === 0) {
        contactsList.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center text-slate-600">No contact submissions yet</td></tr>'
        return
    }
    
    contactsList.innerHTML = contacts.map(contact => {
        const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`.trim() || 'No Name';
        const companyRole = `${contact.company || 'Personal'} ${contact.role ? `(${contact.role})` : ''}`.trim();
        
        return `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                    <div class="text-sm font-semibold text-slate-900">${fullName}</div>
                    <div class="text-xs text-slate-500">${contact.phone || 'No Phone'}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="text-sm text-slate-600">${companyRole}</div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">${contact.email}</td>
                <td class="px-6 py-4 text-sm text-slate-600">${new Date(contact.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                <td class="px-6 py-4 text-right">
                    <button onclick="viewContact(${contact.id})" class="inline-flex items-center gap-2 px-5 py-2 bg-accent hover:bg-brand-mid text-slate-950 hover:text-white text-sm font-bold rounded-xl transition-all shadow-sm">
                        View Brief
                    </button>
                </td>
            </tr>
        `;
    }).join('')
}

window.viewContact = async (id) => {
    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .eq('id', id)
            .single()
        
        if (error) throw error
        
        // Populate Modal
        document.getElementById('modal-contact-name').textContent = `${data.first_name} ${data.last_name}`
        document.getElementById('modal-contact-email').textContent = data.email
        document.getElementById('modal-contact-phone').textContent = data.phone || 'N/A'
        document.getElementById('modal-contact-company').textContent = `${data.company || 'Personal'} ${data.role ? `(${data.role})` : ''}`
        document.getElementById('modal-contact-date').textContent = new Date(data.created_at).toLocaleString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
        })
        document.getElementById('modal-contact-message').textContent = data.message
        
        // Show Modal
        document.getElementById('contact-modal').classList.remove('hidden')
    } catch (error) {
        console.error('Error loading contact:', error)
        alert('Error loading contact details')
    }
}

// Close Contact Modal
document.getElementById('close-contact-modal-btn')?.addEventListener('click', () => {
    document.getElementById('contact-modal').classList.add('hidden')
})
document.getElementById('modal-contact-close-btn')?.addEventListener('click', () => {
    document.getElementById('contact-modal').classList.add('hidden')
})

// ==================== BIO LINKS MANAGER ====================
const bioLinkModal = document.getElementById('bio-link-modal')
const addBioLinkBtn = document.getElementById('add-bio-link-btn')
const bioLinkForm = document.getElementById('bio-link-form')
const bioLinksList = document.getElementById('bio-links-list')

if (addBioLinkBtn) {
    addBioLinkBtn.addEventListener('click', () => {
        document.getElementById('bio-modal-title').textContent = 'Add Bio Link'
        document.getElementById('bio-link-id').value = ''
        document.getElementById('bio-label').value = ''
        document.getElementById('bio-url').value = ''
        document.getElementById('bio-priority').value = '0'
        document.getElementById('bio-active').checked = true
        document.getElementById('bio-featured').checked = false
        bioLinkModal.classList.remove('hidden')
    })
}

if (bioLinkForm) {
    bioLinkForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const saveBtn = document.getElementById('save-bio-link-btn')
        const id = document.getElementById('bio-link-id').value
        
        const linkData = {
            label: document.getElementById('bio-label').value,
            url: document.getElementById('bio-url').value,
            priority: parseInt(document.getElementById('bio-priority').value) || 0,
            is_active: document.getElementById('bio-active').checked,
            is_featured: document.getElementById('bio-featured').checked
        }

        saveBtn.textContent = 'Saving...'
        saveBtn.disabled = true

        try {
            if (id) {
                const { error } = await supabase.from('bio_links').update(linkData).eq('id', id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('bio_links').insert([linkData])
                if (error) throw error
            }

            bioLinkModal.classList.add('hidden')
            loadBioLinks()
        } catch (error) {
            console.error('Error saving bio link:', error)
            alert('Error saving: ' + error.message)
        } finally {
            saveBtn.textContent = 'Save Bio Link'
            saveBtn.disabled = false
        }
    })
}

async function loadBioLinks() {
    if (!bioLinksList) return
    
    try {
        const { data, error } = await supabase
            .from('bio_links')
            .select('*')
            .order('priority', { ascending: true })

        if (error) throw error

        renderBioLinks(data || [])
    } catch (error) {
        console.error('Error loading bio links:', error)
    }
}

function renderBioLinks(links) {
    bioLinksList.innerHTML = links.map(link => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-slate-500">#${link.priority}</td>
            <td class="px-6 py-4">
                <div class="text-sm font-bold text-slate-900">${link.label}</div>
                <div class="text-xs text-slate-500 truncate max-w-xs">${link.url}</div>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${link.is_active ? 'bg-green-500' : 'bg-slate-300'}"></span>
                    <span class="text-xs font-semibold uppercase ${link.is_active ? 'text-green-600' : 'text-slate-500'}">
                        ${link.is_active ? 'Active' : 'Hidden'}
                    </span>
                    ${link.is_featured ? '<span class="px-2 py-0.5 bg-accent/20 text-accent text-[10px] font-bold rounded uppercase">Featured</span>' : ''}
                </div>
            </td>
            <td class="px-6 py-4 text-sm font-bold text-slate-700">${link.clicks_count || 0}</td>
            <td class="px-6 py-4 text-right space-x-2">
                <button onclick="editBioLink(${link.id})" class="text-accent hover:text-brand-mid font-bold text-sm">Edit</button>
                <button onclick="deleteBioLink(${link.id})" class="text-brand-danger hover:text-red-700 font-bold text-sm">Delete</button>
            </td>
        </tr>
    `).join('')
}

window.editBioLink = async (id) => {
    try {
        const { data, error } = await supabase.from('bio_links').select('*').eq('id', id).single()
        if (error) throw error

        document.getElementById('bio-modal-title').textContent = 'Edit Bio Link'
        document.getElementById('bio-link-id').value = data.id
        document.getElementById('bio-label').value = data.label
        document.getElementById('bio-url').value = data.url
        document.getElementById('bio-priority').value = data.priority
        document.getElementById('bio-active').checked = data.is_active
        document.getElementById('bio-featured').checked = data.is_featured

        bioLinkModal.classList.remove('hidden')
    } catch (error) {
        console.error('Error loading bio link:', error)
    }
}

window.deleteBioLink = async (id) => {
    if (!confirm('Are you sure you want to delete this link?')) return
    try {
        const { error } = await supabase.from('bio_links').delete().eq('id', id)
        if (error) throw error
        loadBioLinks()
    } catch (error) {
        console.error('Error deleting bio link:', error)
        alert('Error deleting link')
    }
}

// ==================== BIO PROFILE MODAL ====================
const bioProfileModal = document.getElementById('bio-profile-modal')
const openBioProfileBtn = document.getElementById('open-bio-profile-btn')
const saveBioProfileBtn = document.getElementById('save-bio-profile-btn')
const bioImageFile = document.getElementById('modal-bio-image-file')
const bioImagePreview = document.getElementById('modal-bio-image-preview')
const bioImagePlaceholder = document.getElementById('modal-bio-image-placeholder')
const bioImageUrlHidden = document.getElementById('modal-bio-image-url')

if (openBioProfileBtn) {
    openBioProfileBtn.addEventListener('click', () => {
        bioProfileModal.classList.remove('hidden')
    })
}

// Handle File Selection and Preview
if (bioImageFile) {
    bioImageFile.addEventListener('change', async (e) => {
        const file = e.target.files[0]
        if (!file) return

        // 1. Show immediate local preview
        const reader = new FileReader()
        reader.onload = (e) => {
            bioImagePreview.src = e.target.result
            bioImagePreview.classList.remove('hidden')
            bioImagePlaceholder.classList.add('hidden')
        }
        reader.readAsDataURL(file)

        // 2. Upload to Supabase Storage
        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `profile-${Date.now()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 3. Get Public URL
            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            bioImageUrlHidden.value = data.publicUrl
        } catch (error) {
            console.error('Error uploading image:', error)
            alert('Upload failed: ' + error.message)
        }
    })
}

if (saveBioProfileBtn) {
    saveBioProfileBtn.addEventListener('click', async () => {
        const bioData = {
            bio_name: document.getElementById('modal-bio-name').value,
            bio_image: bioImageUrlHidden.value,
            bio_description: document.getElementById('modal-bio-desc').value,
            social_instagram: document.getElementById('modal-social-instagram').value,
            social_telegram: document.getElementById('modal-social-telegram').value,
            social_linkedin: document.getElementById('modal-social-linkedin').value,
            social_tiktok: document.getElementById('modal-social-tiktok').value
        }

        saveBioProfileBtn.textContent = 'Saving...'
        saveBioProfileBtn.disabled = true

        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert([{ id: 1, ...bioData }])
            
            if (error) throw error
            bioProfileModal.classList.add('hidden')
            alert('Bio profile updated!')
        } catch (error) {
            console.error('Error saving bio profile:', error)
            alert('Error: ' + error.message)
        } finally {
            saveBioProfileBtn.textContent = 'Save Profile Changes'
            saveBioProfileBtn.disabled = false
        }
    })
}

// ==================== SETTINGS ====================
saveSettingsBtn.addEventListener('click', async () => {
    const settings = {
        site_title: document.getElementById('site-title').value,
        site_description: document.getElementById('site-description').value,
        contact_email: document.getElementById('contact-email').value,
        contact_phone: document.getElementById('contact-phone').value
    }
    
    try {
        const { error } = await supabase
            .from('site_settings')
            .upsert([{ id: 1, ...settings }])
        
        if (error) throw error
        
        alert('Settings saved successfully!')
    } catch (error) {
        console.error('Error saving settings:', error)
        alert('Error saving settings: ' + error.message)
    }
})

async function loadSettings() {
    try {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .eq('id', 1)
            .single()
        
        if (error && error.code !== 'PGRST116') throw error
        
        if (data) {
            document.getElementById('site-title').value = data.site_title || ''
            document.getElementById('site-description').value = data.site_description || ''
            document.getElementById('contact-email').value = data.contact_email || ''
            document.getElementById('contact-phone').value = data.contact_phone || ''
            
            // Populate Bio Modal fields too
            document.getElementById('modal-bio-name').value = data.bio_name || ''
            document.getElementById('modal-bio-image-url').value = data.bio_image || ''
            document.getElementById('modal-bio-desc').value = data.bio_description || ''
            document.getElementById('modal-social-instagram').value = data.social_instagram || ''
            document.getElementById('modal-social-telegram').value = data.social_telegram || ''
            document.getElementById('modal-social-linkedin').value = data.social_linkedin || ''
            document.getElementById('modal-social-tiktok').value = data.social_tiktok || ''

            // Preview image if it exists
            if (data.bio_image) {
                document.getElementById('modal-bio-image-preview').src = data.bio_image
                document.getElementById('modal-bio-image-preview').classList.remove('hidden')
                document.getElementById('modal-bio-image-placeholder').classList.add('hidden')
            }
        }
    } catch (error) {
        console.error('Error loading settings:', error)
    }
}

// ==================== ADMINS MANAGEMENT ====================
const adminModal = document.getElementById('admin-modal')
const addAdminBtn = document.getElementById('add-admin-btn')
const closeAdminModalBtn = document.getElementById('close-admin-modal-btn')
const adminForm = document.getElementById('admin-form')

if (addAdminBtn) {
    addAdminBtn.addEventListener('click', () => {
        document.getElementById('admin-id-input').value = ''
        document.getElementById('admin-name-input').value = ''
        document.getElementById('admin-email-input').value = ''
        document.getElementById('admin-role').value = 'manager'
        document.getElementById('admin-password').value = ''
        adminModal.classList.remove('hidden')
    })
}
if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', () => adminModal.classList.add('hidden'))

if (adminForm) {
    adminForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const saveBtn = document.getElementById('save-admin-btn')
        const id = document.getElementById('admin-id-input').value
        const name = document.getElementById('admin-name-input').value.trim()
        const email = document.getElementById('admin-email-input').value.trim()
        const role = document.getElementById('admin-role').value
        const password = document.getElementById('admin-password').value.trim()
        
        if (!email || !name) return
        
        saveBtn.textContent = 'Saving...'
        saveBtn.disabled = true
        
        try {
            const adminData = { name, email, role }
            
            if (id) {
                const { error } = await supabase.from('admins').update(adminData).eq('id', id)
                if (error) throw error
            } else {
                const { error } = await supabase.from('admins').insert([adminData])
                if (error) throw error
            }
            
            adminModal.classList.add('hidden')
            loadAdmins()
            alert(id ? 'Admin updated successfully!' : 'Admin added successfully!')
        } catch (error) {
            console.error('Error saving admin:', error)
            alert('Error saving admin: ' + error.message)
        } finally {
            saveBtn.textContent = 'Save Admin'
            saveBtn.disabled = false
        }
    })
}

async function loadAdmins() {
    const tableBody = document.getElementById('admins-table-body')
    if (!tableBody) return
    
    tableBody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center text-slate-500">Loading admins...</td></tr>'
    
    try {
        const { data, error } = await supabase.from('admins').select('*').order('created_at', { ascending: false })
        
        if (error) throw error
        
        if (!data || data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center text-slate-500">No admins found. Add one above.</td></tr>'
            return
        }
        
        tableBody.innerHTML = data.map(admin => `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 text-sm font-bold text-slate-900">${admin.name || 'No Name'}</td>
                <td class="px-6 py-4 text-sm">
                    <span class="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${admin.role === 'superadmin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}">
                        ${admin.role || 'manager'}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-600">${admin.email}</td>
                <td class="px-6 py-4 text-sm text-right space-x-2">
                    <button onclick="editAdmin(${admin.id})" class="text-accent hover:text-brand-mid font-bold px-2 py-1">
                        Edit
                    </button>
                    <button onclick="deleteAdmin(${admin.id}, '${admin.email}')" class="text-brand-danger hover:text-red-700 font-semibold px-2 py-1">
                        Remove
                    </button>
                </td>
            </tr>
        `).join('')
    } catch (error) {
        console.error('Error loading admins:', error)
        tableBody.innerHTML = '<tr><td colspan="2" class="px-6 py-4 text-center text-brand-danger">Error loading admins. Is the table created?</td></tr>'
    }
}

window.deleteAdmin = async (id, email) => {
    if (confirm(`Are you sure you want to remove ${email} from admins?`)) {
        try {
            const { error } = await supabase.from('admins').delete().eq('id', id)
            if (error) throw error
            loadAdmins()
        } catch (error) {
            console.error('Error deleting admin:', error)
            alert('Error deleting admin: ' + error.message)
        }
    }
}

window.editAdmin = async (id) => {
    try {
        const { data, error } = await supabase.from('admins').select('*').eq('id', id).single()
        if (error) throw error
        
        document.getElementById('admin-id-input').value = data.id
        document.getElementById('admin-name-input').value = data.name || ''
        document.getElementById('admin-email-input').value = data.email
        document.getElementById('admin-role').value = data.role || 'manager'
        document.getElementById('admin-password').value = '' // Clear password field on edit
        
        adminModal.classList.remove('hidden')
    } catch (error) {
        console.error('Error loading admin:', error)
        alert('Error loading admin details')
    }
}

// Initialize
checkAuth()
