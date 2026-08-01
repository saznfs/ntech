// N TECH Mobile Solution - Smart Universal Search System

document.addEventListener('DOMContentLoaded', () => {
    initSearchSystem();
});

function initSearchSystem() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('universalSearchInput');
    const searchResults = document.getElementById('searchResultsList');
    const searchTriggers = document.querySelectorAll('.trigger-search-modal');
    const searchClose = document.getElementById('searchModalClose');

    if (!searchModal || !searchInput) return;

    // Open Search Modal
    searchTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 150);
        });
    });

    // Close Search Modal
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
    }

    // Keyboard shortcut (Cmd/Ctrl + K or Escape)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchModal.classList.add('active');
            setTimeout(() => searchInput.focus(), 150);
        } else if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            searchModal.classList.remove('active');
        }
    });

    // Close on backdrop click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    // Real-Time Search Handler
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            renderDefaultSearchSuggestions();
            return;
        }

        performUniversalSearch(query);
    });

    // Initial render
    renderDefaultSearchSuggestions();
}

function renderDefaultSearchSuggestions() {
    const searchResults = document.getElementById('searchResultsList');
    if (!searchResults) return;

    searchResults.innerHTML = `
        <div class="search-group-title">Popular Repairs</div>
        ${REPAIR_SERVICES.slice(0, 3).map(service => `
            <div class="search-item-card" onclick="selectSearchRepair('${service.id}')">
                <div class="search-item-icon"><i class="fa-solid ${service.icon}"></i></div>
                <div class="search-item-details">
                    <div class="search-item-title">${service.name}</div>
                    <div class="search-item-sub">${service.desc} • ${service.timeEstimate}</div>
                </div>
                <span class="badge badge-cyan">Repair</span>
            </div>
        `).join('')}

        <div class="search-group-title">Featured Products</div>
        ${PRODUCTS.slice(0, 3).map(prod => `
            <div class="search-item-card" onclick="openProductModal('${prod.id}')">
                <div class="search-item-icon"><i class="fa-solid fa-mobile-screen"></i></div>
                <div class="search-item-details">
                    <div class="search-item-title">${prod.name}</div>
                    <div class="search-item-sub">${prod.brand} • Ask Price via WhatsApp</div>
                </div>
                <span class="badge badge-green">${prod.badge}</span>
            </div>
        `).join('')}
    `;
}

function performUniversalSearch(query) {
    const searchResults = document.getElementById('searchResultsList');
    if (!searchResults) return;

    // Filter Products
    const matchedProducts = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.brand.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query)
    );

    // Filter Repairs
    const matchedRepairs = REPAIR_SERVICES.filter(r => 
        r.name.toLowerCase().includes(query) || 
        r.desc.toLowerCase().includes(query)
    );

    // Filter Brands & Models
    const matchedBrands = [];
    Object.keys(DEVICE_MODELS).forEach(brandKey => {
        const models = DEVICE_MODELS[brandKey];
        models.forEach(model => {
            if (model.toLowerCase().includes(query) || brandKey.includes(query)) {
                matchedBrands.push({ brand: brandKey, model: model });
            }
        });
    });

    let html = '';

    if (matchedRepairs.length > 0) {
        html += `<div class="search-group-title">Matching Repair Services (${matchedRepairs.length})</div>`;
        html += matchedRepairs.map(r => `
            <div class="search-item-card" onclick="selectSearchRepair('${r.id}')">
                <div class="search-item-icon"><i class="fa-solid ${r.icon}"></i></div>
                <div class="search-item-details">
                    <div class="search-item-title">${r.name}</div>
                    <div class="search-item-sub">${r.desc}</div>
                </div>
                <span class="badge badge-cyan">Get Quote</span>
            </div>
        `).join('');
    }

    if (matchedProducts.length > 0) {
        html += `<div class="search-group-title">Matching Products (${matchedProducts.length})</div>`;
        html += matchedProducts.map(p => `
            <div class="search-item-card" onclick="openProductModal('${p.id}')">
                <div class="search-item-icon"><i class="fa-solid fa-box-open"></i></div>
                <div class="search-item-details">
                    <div class="search-item-title">${p.name}</div>
                    <div class="search-item-sub">${p.brand} • Ask Price via WhatsApp</div>
                </div>
                <span class="badge badge-green">${p.stockStatus}</span>
            </div>
        `).join('');
    }

    if (matchedBrands.length > 0) {
        html += `<div class="search-group-title">Matching Device Models (${matchedBrands.length})</div>`;
        html += matchedBrands.slice(0, 5).map(b => `
            <div class="search-item-card" onclick="selectSearchModel('${b.brand}', '${b.model}')">
                <div class="search-item-icon"><i class="fa-solid fa-mobile"></i></div>
                <div class="search-item-details">
                    <div class="search-item-title">${b.model}</div>
                    <div class="search-item-sub">Request Repair or Parts for ${b.brand.toUpperCase()}</div>
                </div>
                <span class="badge badge-purple">Model</span>
            </div>
        `).join('');
    }

    if (matchedProducts.length === 0 && matchedRepairs.length === 0 && matchedBrands.length === 0) {
        html = `
            <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
                <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--text-dim);"></i>
                <p>No exact matches found for "<strong>${query}</strong>"</p>
                <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try searching for <em>"Display", "Battery", "Anker", "S24 Ultra", "iPhone"</em></p>
                <a href="https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(`Hi N TECH, I am searching for ${query}. Can you let me know if it's available?`)}" target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 1.2rem;">
                    <i class="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
            </div>
        `;
    }

    searchResults.innerHTML = html;
}

function selectSearchRepair(repairId) {
    document.getElementById('searchModal').classList.remove('active');
    const repairSec = document.getElementById('repair');
    if (repairSec) {
        repairSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            if (window.selectWizardIssue) window.selectWizardIssue(repairId);
        }, 400);
    } else {
        // Cross-page: navigate to repair.html with issue pre-selected via hash
        window.location.href = 'repair.html#issue=' + repairId;
    }
}

function selectSearchModel(brandKey, modelName) {
    document.getElementById('searchModal').classList.remove('active');
    const repairSec = document.getElementById('repair');
    if (repairSec) {
        repairSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            if (window.selectWizardBrandAndModel) window.selectWizardBrandAndModel(brandKey, modelName);
        }, 400);
    } else {
        // Cross-page: navigate to repair.html with brand+model pre-selected
        window.location.href = 'repair.html#brand=' + encodeURIComponent(brandKey) + '&model=' + encodeURIComponent(modelName);
    }
}
