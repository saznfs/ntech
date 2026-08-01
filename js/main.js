// N TECH Mobile Solution - Main Application Orchestrator

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initVideoControls();
    initBusinessHours();
    renderCategoriesHomeGrid();
    renderWhyChooseUs();
    renderCustomerReviews();
    renderFaqAccordion();
    initMobileNav();
    initBackToTop();
});

// Sticky Navbar Scroll
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Video Controls for Ambient Intro Video
function initVideoControls() {
    const video = document.getElementById('heroBgVideo');
    const toggleBtn = document.getElementById('videoToggleBtn');
    if (!video || !toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        if (video.muted) {
            video.muted = false;
            toggleBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        } else {
            video.muted = true;
            toggleBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
}

// Live Business Hours Calculator
function initBusinessHours() {
    const badge = document.getElementById('liveHoursBadge');
    if (!badge) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTimeVal = currentHour * 60 + currentMinute;

    const openTimeVal = 8 * 60 + 30;   // 8:30 AM = 510 mins
    const closeTimeVal = 22 * 60;      // 10:00 PM = 1320 mins

    if (currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal) {
        badge.innerHTML = `<span class="badge badge-green"><i class="fa-solid fa-circle" style="font-size: 0.6rem;"></i> Open Now • 8:30 AM – 10:00 PM</span>`;
    } else {
        badge.innerHTML = `<span class="badge badge-amber"><i class="fa-solid fa-circle" style="font-size: 0.6rem;"></i> Closed Now • Opens 8:30 AM</span>`;
    }
}

// Categories Grid on Home Landing
function renderCategoriesHomeGrid() {
    const container = document.getElementById('categoriesHomeGrid');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => `
        <div class="glass-card category-card shimmer-effect" onclick="scrollToShopCategory('${cat.id}')">
            <div class="category-icon-box">
                <i class="fa-solid ${cat.icon}"></i>
            </div>
            <div class="category-title">${cat.name}</div>
            <div class="category-count">${cat.count}</div>
            <div class="category-desc">${cat.desc}</div>
        </div>
    `).join('');
}

function scrollToShopCategory(catId) {
    const shopSec = document.getElementById('shop');
    if (shopSec) {
        shopSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            if (window.filterProductsByCategory) window.filterProductsByCategory(catId);
        }, 400);
    } else {
        // Cross-page: navigate to shop.html with category pre-selected
        window.location.href = 'shop.html?cat=' + catId;
    }

// Why Choose Us Section
function renderWhyChooseUs() {
    const container = document.getElementById('whyChooseUsGrid');
    if (!container) return;

    const features = [
        { icon: "fa-certificate", title: "100% Original Products", desc: "Guaranteed authentic accessories & parts sourced directly from brand suppliers." },
        { icon: "fa-user-gear", title: "Professional Technicians", desc: "Certified hardware micro-soldering experts with years of smartphone repair experience." },
        { icon: "fa-bolt-lightning", title: "Express 30-60 Min Repairs", desc: "Fast turnarounds for display, battery, and port repairs while you wait." },
        { icon: "fa-tags", title: "Affordable Transparency", desc: "Clear upfront quotes with quality choices (Original vs Compatible) with zero hidden fees." },
        { icon: "fa-shield-heart", title: "Data Safety Guarantee", desc: "Your personal data, photos, and files remain 100% confidential and intact." },
        { icon: "fa-comments", title: "Instant WhatsApp Service", desc: "Automatic WhatsApp pre-filled inquiry generator for fast customer responses." }
    ];

    container.innerHTML = features.map(f => `
        <div class="glass-card" style="padding: 2rem; text-align: left;">
            <div style="width: 52px; height: 52px; border-radius: 16px; background: rgba(56,189,248,0.12); border: 1px solid rgba(56,189,248,0.3); color: var(--accent-cyan); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 1.2rem;">
                <i class="fa-solid ${f.icon}"></i>
            </div>
            <h3 style="font-size: 1.2rem; margin-bottom: 0.6rem;">${f.title}</h3>
            <p class="text-muted" style="font-size: 0.9rem; line-height: 1.6;">${f.desc}</p>
        </div>
    `).join('');
}

// Customer Reviews Section
function renderCustomerReviews() {
    const container = document.getElementById('customerReviewsGrid');
    if (!container) return;

    container.innerHTML = REVIEWS.map(r => `
        <div class="glass-card review-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div class="review-stars">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(r.rating)}
                </div>
                <span class="badge badge-cyan"><i class="fa-brands fa-google"></i> Verified</span>
            </div>
            <p style="font-size: 0.95rem; color: var(--text-main); font-style: italic; margin-bottom: 1.2rem; line-height: 1.6;">
                "${r.comment}"
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="font-size: 0.95rem; color: var(--accent-cyan);">${r.name}</strong>
                <span style="font-size: 0.8rem; color: var(--text-dim);">${r.date}</span>
            </div>
        </div>
    `).join('');
}

// FAQ Accordion
function renderFaqAccordion() {
    const container = document.getElementById('faqAccordionContainer');
    if (!container) return;

    container.innerHTML = FAQS.map((faq, index) => `
        <div class="faq-item ${index === 0 ? 'active' : ''}">
            <div class="faq-question" onclick="toggleFaq(${index})">
                <span>${faq.q}</span>
                <i class="fa-solid fa-chevron-down" style="transition: transform 0.3s ease;"></i>
            </div>
            <div class="faq-answer">
                ${faq.a}
            </div>
        </div>
    `).join('');
}

function toggleFaq(index) {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.toggle('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Mobile Nav Toggle (Global Function for bulletproof inline + JS invocation)
window.toggleMobileNav = function(e) {
    if (e) e.stopPropagation();
    const toggle = document.getElementById('mobileMenuToggleBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    const isActive = navMenu.classList.toggle('active');
    if (toggle) {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
    }
};

function initMobileNav() {
    const toggle = document.getElementById('mobileMenuToggleBtn');
    const navMenu = document.querySelector('.nav-menu');
    if (!toggle || !navMenu) return;

    // Attach click listener calling toggleMobileNav
    toggle.addEventListener('click', window.toggleMobileNav);

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = toggle.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        }
    });
}

// Back to top button
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    const checkScroll = () => {
        if (window.scrollY > 400 && window.innerWidth > 768) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    };

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
