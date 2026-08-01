// N TECH Mobile Solution - Product Showroom & Modal Management

let activeCategoryFilter = "all";
let activeBrandFilter = "all";

document.addEventListener('DOMContentLoaded', () => {
    initShopSection();
});

function initShopSection() {
    // Read ?cat= URL query param for cross-page category navigation
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) activeCategoryFilter = catParam;

    renderCategoryTabs();
    renderProductsGrid();
}

function renderCategoryTabs() {
    const container = document.getElementById('categoryTabsBar');
    if (!container) return;

    let html = `
        <button class="category-tab-btn ${activeCategoryFilter === 'all' ? 'active' : ''}" onclick="filterProductsByCategory('all')">
            <i class="fa-solid fa-border-all"></i> All Products
        </button>
    `;

    html += CATEGORIES.map(cat => `
        <button class="category-tab-btn ${activeCategoryFilter === cat.id ? 'active' : ''}" onclick="filterProductsByCategory('${cat.id}')">
            <i class="fa-solid ${cat.icon}"></i> ${cat.name}
        </button>
    `).join('');

    container.innerHTML = html;
}

function filterProductsByCategory(catId) {
    activeCategoryFilter = catId;
    renderCategoryTabs();
    renderProductsGrid();
}

function renderProductsGrid() {
    const grid = document.getElementById('productsGridContainer');
    if (!grid) return;

    let filtered = PRODUCTS;

    if (activeCategoryFilter !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategoryFilter);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 4rem 1rem; text-align: center;" class="glass-card">
                <i class="fa-solid fa-box-open" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
                <h3>No Products Found</h3>
                <p class="text-muted" style="margin-top: 0.5rem;">We carry all accessories & replacement parts. Inquire via WhatsApp for custom stock.</p>
                <a href="https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent('Hi N TECH, I am looking for mobile accessories in this category.')}" target="_blank" class="btn btn-whatsapp btn-sm" style="margin-top: 1.5rem;">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp Custom Order
                </a>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(prod => `
        <div class="glass-card product-card shimmer-effect">
            <div class="product-img-wrapper">
                <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'">
                <div class="product-badge-overlay">
                    <span class="badge ${prod.badge === 'Original' || prod.badge === 'Best Seller' ? 'badge-cyan' : 'badge-green'}">${prod.badge}</span>
                </div>
            </div>
            
            <div class="product-info-body">
                <div class="product-brand">${prod.brand} • ${prod.partsQuality}</div>
                <div class="product-title">${prod.name}</div>
                <div class="product-desc">${prod.desc}</div>

                <div class="product-price-row">
                    <div>
                        <div class="product-price" style="font-size: 0.95rem; font-weight: 700; color: var(--accent-cyan); display: flex; align-items: center;"><i class="fa-brands fa-whatsapp" style="margin-right: 0.35rem; color: #25D366;"></i> Ask Price via WhatsApp</div>
                    </div>
                    <span class="badge badge-purple"><i class="fa-solid fa-circle-check"></i> ${prod.stockStatus}</span>
                </div>

                <div class="product-actions">
                    <button class="btn-view-details" onclick="openProductModal('${prod.id}')">
                        <i class="fa-solid fa-eye"></i> Details
                    </button>
                    <button class="btn-order-whatsapp shimmer-effect" onclick="orderProductWhatsApp('${prod.id}')">
                        <i class="fa-brands fa-whatsapp"></i> Ask Price
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function openProductModal(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById('productModal');
    const content = document.getElementById('productModalContent');
    if (!modal || !content) return;

    const whatsappOrderMsg = `Hi N TECH Mobile Solution,\n\nI would like to inquire about the price of:\n\n• Product: ${prod.name}\n• Brand: ${prod.brand}\n• Quality: ${prod.partsQuality}\n\nPlease let me know the current price, availability, and ordering details. Thanks!`;
    const whatsappUrl = `https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(whatsappOrderMsg)}`;

    content.innerHTML = `
        <button class="modal-close-btn" onclick="closeProductModal()"><i class="fa-solid fa-xmark"></i></button>

        <div class="modal-grid-inner">
            <div>
                <div style="width: 100%; height: 320px; border-radius: var(--radius-lg); overflow: hidden; background: #000; border: 1px solid var(--border-glass-light);">
                    <img src="${prod.image}" alt="${prod.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div style="margin-top: 1rem; display: flex; gap: 0.8rem; flex-wrap: wrap;">
                    <span class="badge badge-cyan"><i class="fa-solid fa-shield-halved"></i> Genuine Warranty</span>
                    <span class="badge badge-green"><i class="fa-solid fa-truck-fast"></i> Express Delivery</span>
                    <span class="badge badge-purple"><i class="fa-solid fa-star"></i> ${prod.rating} / 5.0 Rating</span>
                </div>
            </div>

            <div style="display: flex; flex-direction: column;">
                <div class="product-brand" style="font-size: 0.9rem;">${prod.brand} • ${prod.partsQuality}</div>
                <h2 style="font-size: 1.8rem; margin-bottom: 0.8rem;">${prod.name}</h2>
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fa-brands fa-whatsapp" style="color: #25D366; font-size: 1.5rem;"></i> Ask Price via WhatsApp
                </div>

                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">
                    ${prod.desc}
                </p>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); padding: 1rem 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
                    <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.6rem; color: var(--accent-purple);">Key Specifications:</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.88rem; color: var(--text-muted);">
                        ${(prod.specs || []).map(s => `<li><i class="fa-solid fa-check" style="color: var(--accent-emerald); margin-right: 0.5rem;"></i> ${s}</li>`).join('')}
                    </ul>
                </div>

                <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 1.5rem;">
                    <strong>Compatibility:</strong> ${prod.compatibility || 'Universal'}
                </div>

                <div style="margin-top: auto; display: flex; gap: 1rem; flex-wrap: wrap;">
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg shimmer-effect" style="flex: 1;">
                        <i class="fa-brands fa-whatsapp"></i> Ask Price & Order via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.remove('active');
}

function orderProductWhatsApp(productId) {
    openProductModal(productId);
}
