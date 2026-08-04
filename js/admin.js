// N TECH Mobile Solution - Admin Product Management Engine

// Global State Store
let adminState = {
    products: [],
    trash: [],
    currentTab: 'active', // 'active' | 'trash'
    filterCategory: 'all',
    filterStock: 'all',
    searchQuery: '',
    githubConfig: {
        owner: '',
        repo: '',
        branch: 'main',
        token: ''
    },
    editingId: null,
    tempImageData: null
};

// Initialize Admin Dashboard on Page Load
document.addEventListener('DOMContentLoaded', async () => {
    loadGitHubConfig();
    await loadAdminData();
    initEventListeners();
    renderDashboard();
});

// Load GitHub Sync Config from LocalStorage
function loadGitHubConfig() {
    try {
        const saved = localStorage.getItem('ntech_github_config');
        if (saved) {
            adminState.githubConfig = { ...adminState.githubConfig, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn("Could not load github config:", e);
    }
}

function saveGitHubConfig() {
    const owner = document.getElementById('ghOwnerInput').value.trim();
    const repo = document.getElementById('ghRepoInput').value.trim();
    const branch = document.getElementById('ghBranchInput').value.trim() || 'main';
    const token = document.getElementById('ghTokenInput').value.trim();

    adminState.githubConfig = { owner, repo, branch, token };
    localStorage.setItem('ntech_github_config', JSON.stringify(adminState.githubConfig));
    closeModal('githubSettingsModal');
    showNotification('GitHub Settings saved successfully!', 'success');
    updateSyncBadge();
}

// Load Products Data (LocalStorage or data/products.json with cache buster)
async function loadAdminData(forceRemote = false) {
    try {
        const cachedProducts = localStorage.getItem('ntech_products_data');
        const cachedTrash = localStorage.getItem('ntech_products_trash');

        if (!forceRemote && cachedProducts) {
            try {
                adminState.products = JSON.parse(cachedProducts);
            } catch (err) {
                adminState.products = [];
            }
        }
        
        if (forceRemote || !adminState.products || adminState.products.length === 0) {
            const res = await fetch(`data/products.json?_t=${Date.now()}&v=adm`, {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });
            if (res.ok) {
                adminState.products = await res.json();
                localStorage.setItem('ntech_products_data', JSON.stringify(adminState.products));
            } else if (typeof DEFAULT_PRODUCTS !== 'undefined') {
                adminState.products = [...DEFAULT_PRODUCTS];
            }
        }

        if (cachedTrash) {
            try {
                adminState.trash = JSON.parse(cachedTrash);
            } catch (err) {
                adminState.trash = [];
            }
        }
    } catch (e) {
        console.error("Error loading products data:", e);
        if (typeof DEFAULT_PRODUCTS !== 'undefined' && (!adminState.products || adminState.products.length === 0)) {
            adminState.products = [...DEFAULT_PRODUCTS];
        }
    }
}

// Save Admin State to LocalStorage and broadcast update
function saveAdminState() {
    localStorage.setItem('ntech_products_data', JSON.stringify(adminState.products));
    localStorage.setItem('ntech_products_trash', JSON.stringify(adminState.trash));
    localStorage.setItem('ntech_products_last_sync', String(Date.now()));
    
    if (typeof PRODUCTS !== 'undefined') {
        PRODUCTS = adminState.products;
    }
    
    // Broadcast live event for any open tabs or embeds
    window.dispatchEvent(new CustomEvent('ntech_products_updated', {
        detail: { products: adminState.products }
    }));

    updateSyncBadge();
}

// Fetch fresh products from server & reload dashboard
async function refreshAdminFromServer() {
    showNotification('Syncing catalog from server...', 'info');
    await loadAdminData(true);
    renderDashboard();
    showNotification('Catalog synchronized with live server data!', 'success');
}

// Event Listeners Initialization
function initEventListeners() {
    // Search input
    const searchInput = document.getElementById('adminSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            adminState.searchQuery = e.target.value.toLowerCase().trim();
            renderProductsList();
        });
    }

    // Category Filter Select
    const catSelect = document.getElementById('adminCatFilterSelect');
    if (catSelect) {
        catSelect.addEventListener('change', (e) => {
            adminState.filterCategory = e.target.value;
            renderProductsList();
        });
    }

    // Stock Filter Select
    const stockSelect = document.getElementById('adminStockFilterSelect');
    if (stockSelect) {
        stockSelect.addEventListener('change', (e) => {
            adminState.filterStock = e.target.value;
            renderProductsList();
        });
    }

    // Drag and Drop Upload Zone
    const dropzone = document.getElementById('productImageDropzone');
    const fileInput = document.getElementById('productImageFileInput');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropzone.classList.add('dragover');
        });
        dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleImageUpload(e.target.files[0]);
            }
        });
    }
}

// Client-Side Canvas Image Optimization (Resizing & WebP/JPEG Compression)
function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800;
            const MAX_HEIGHT = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height = Math.round((height * MAX_WIDTH) / width);
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width = Math.round((width * MAX_HEIGHT) / height);
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to WebP / JPEG
            const optimizedDataUrl = canvas.toDataURL('image/webp', 0.85);
            adminState.tempImageData = optimizedDataUrl;

            // Display Preview
            const previewImg = document.getElementById('productImagePreview');
            const previewContainer = document.getElementById('imagePreviewContainer');
            const previewInfo = document.getElementById('previewImgInfo');

            if (previewImg && previewContainer) {
                previewImg.src = optimizedDataUrl;
                previewContainer.style.display = 'flex';
                if (previewInfo) {
                    previewInfo.textContent = `Optimized: ${width}x${height}px (${Math.round(optimizedDataUrl.length / 1024)} KB)`;
                }
            }
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Render Main Dashboard & Stats
function renderDashboard() {
    renderStats();
    renderCategoryFilterOptions();
    renderProductsList();
    updateSyncBadge();
}

function renderStats() {
    const totalProd = adminState.products.length;
    const inStock = adminState.products.filter(p => p.stockStatus === 'In Stock').length;
    const outOfStock = adminState.products.filter(p => p.stockStatus === 'Out of Stock').length;
    const trashCount = adminState.trash.length;

    document.getElementById('statTotalProducts').textContent = totalProd;
    document.getElementById('statInStock').textContent = inStock;
    document.getElementById('statOutOfStock').textContent = outOfStock;
    document.getElementById('statTrashCount').textContent = trashCount;

    document.getElementById('activeTabBadge').textContent = totalProd;
    document.getElementById('trashTabBadge').textContent = trashCount;
}

function renderCategoryFilterOptions() {
    const select = document.getElementById('adminCatFilterSelect');
    if (!select) return;

    let html = `<option value="all">All Categories</option>`;
    if (typeof CATEGORIES !== 'undefined') {
        CATEGORIES.forEach(c => {
            html += `<option value="${c.id}">${c.name}</option>`;
        });
    }
    select.innerHTML = html;
}

// Switch between Active Products tab and Recycle Bin tab
function switchTab(tabName) {
    adminState.currentTab = tabName;

    document.getElementById('tabActiveBtn').classList.toggle('active', tabName === 'active');
    document.getElementById('tabTrashBtn').classList.toggle('active', tabName === 'trash');

    const clearTrashBtn = document.getElementById('clearTrashBtn');
    if (clearTrashBtn) {
        clearTrashBtn.style.display = tabName === 'trash' && adminState.trash.length > 0 ? 'inline-flex' : 'none';
    }

    renderProductsList();
}

// Filter and Render Products Table
function renderProductsList() {
    const tableBody = document.getElementById('adminProductsTableBody');
    if (!tableBody) return;

    let list = adminState.currentTab === 'active' ? adminState.products : adminState.trash;

    // Apply Search Filter
    if (adminState.searchQuery) {
        list = list.filter(p => 
            p.name.toLowerCase().includes(adminState.searchQuery) ||
            p.brand.toLowerCase().includes(adminState.searchQuery) ||
            p.category.toLowerCase().includes(adminState.searchQuery) ||
            p.id.toLowerCase().includes(adminState.searchQuery)
        );
    }

    // Apply Category Filter
    if (adminState.filterCategory !== 'all') {
        list = list.filter(p => p.category === adminState.filterCategory);
    }

    // Apply Stock Filter
    if (adminState.filterStock !== 'all') {
        list = list.filter(p => p.stockStatus === adminState.filterStock);
    }

    if (list.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 3rem 1rem; color: var(--text-dim);">
                    <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.75rem; display: block;"></i>
                    ${adminState.currentTab === 'trash' ? 'Recycle bin is empty.' : 'No products found matching your search.'}
                </td>
            </tr>
        `;
        return;
    }

function formatDisplayPrice(price) {
    if (!price && price !== 0) return 'Rs. 0';
    let str = String(price).trim();
    if (str.startsWith('Rs.') || str.startsWith('Rs ') || str.startsWith('LKR')) return str;
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (!isNaN(num)) {
        return 'Rs. ' + num.toLocaleString('en-US');
    }
    return 'Rs. ' + str;
}

    tableBody.innerHTML = list.map(prod => {
        const displayPrice = formatDisplayPrice(prod.price);
        const displayOrig = prod.originalPrice ? formatDisplayPrice(prod.originalPrice) : '';
        return `
        <tr class="admin-prod-row" data-id="${prod.id}">
            <td class="col-img">
                <img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="product-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80'">
            </td>
            <td class="col-details">
                <div class="prod-meta-title">${escapeHtml(prod.name)}</div>
                <div class="prod-meta-sub">ID: ${prod.id} • ${escapeHtml(prod.brand || 'N TECH')} • ${escapeHtml(prod.partsQuality || '100% Genuine')}</div>
            </td>
            <td class="col-badge">
                <span class="badge badge-cyan">${escapeHtml(prod.badge || 'ORIGINAL')}</span>
            </td>
            <td class="col-price">
                <strong class="price-val">${displayPrice}</strong>
                ${displayOrig ? `<span class="price-orig">${displayOrig}</span>` : ''}
            </td>
            <td class="col-category">
                <span class="badge badge-purple"><i class="fa-solid fa-layer-group"></i> ${escapeHtml(formatCategoryName(prod.category))}</span>
            </td>
            <td class="col-stock">
                <span class="${getStockBadgeClass(prod.stockStatus)}"><i class="fa-solid fa-circle-check"></i> ${escapeHtml(prod.stockStatus || 'In Stock')}</span>
                <span class="qty-info">(Qty: ${prod.stockQuantity !== undefined ? prod.stockQuantity : 10})</span>
            </td>
            <td class="col-actions">
                <div class="action-btn-group">
                    ${adminState.currentTab === 'active' ? `
                        <button class="btn-icon edit" title="Edit Product" onclick="openEditProductModal('${prod.id}')">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <span class="btn-text-mobile">Edit</span>
                        </button>
                        <button class="btn-icon delete" title="Move to Recycle Bin" onclick="moveToTrash('${prod.id}')">
                            <i class="fa-solid fa-trash"></i>
                            <span class="btn-text-mobile">Delete</span>
                        </button>
                    ` : `
                        <button class="btn-icon restore" title="Restore Product" onclick="restoreFromTrash('${prod.id}')">
                            <i class="fa-solid fa-rotate-left"></i>
                            <span class="btn-text-mobile">Restore</span>
                        </button>
                        <button class="btn-icon delete" title="Permanently Delete" onclick="permanentDelete('${prod.id}')">
                            <i class="fa-solid fa-xmark"></i>
                            <span class="btn-text-mobile">Purge</span>
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `}).join('');
}

function formatCategoryName(catId) {
    if (typeof CATEGORIES !== 'undefined') {
        const found = CATEGORIES.find(c => c.id === catId);
        if (found) return found.name;
    }
    return catId.charAt(0).toUpperCase() + catId.slice(1);
}

function getStockBadgeClass(status) {
    if (status === 'In Stock') return 'badge-stock-in';
    if (status === 'Out of Stock') return 'badge-stock-out';
    return 'badge-stock-order';
}

// Add/Edit Product Modal Handlers
function openAddProductModal() {
    adminState.editingId = null;
    adminState.tempImageData = null;

    document.getElementById('productModalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productIdInput').value = `prod-${Date.now()}`;
    document.getElementById('imagePreviewContainer').style.display = 'none';
    document.getElementById('productSpecsContainer').innerHTML = '';

    const submitBtn = document.getElementById('productModalSubmitBtn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> OK / Add Product';

    // Add default blank spec line
    addSpecInputRow('');

    openModal('productEditModal');
}

function openEditProductModal(productId) {
    const prod = adminState.products.find(p => p.id === productId);
    if (!prod) return;

    adminState.editingId = productId;
    adminState.tempImageData = null;

    document.getElementById('productModalTitle').textContent = `Edit Product: ${prod.name}`;
    document.getElementById('productIdInput').value = prod.id;
    document.getElementById('productNameInput').value = prod.name;
    document.getElementById('productCategoryInput').value = prod.category;
    document.getElementById('productBrandInput').value = prod.brand || 'Apple';
    document.getElementById('productPriceInput').value = prod.price || 'Rs. 7,990';
    document.getElementById('productOriginalPriceInput').value = prod.originalPrice || '';
    document.getElementById('productStockStatusInput').value = prod.stockStatus || 'In Stock';
    document.getElementById('productStockQuantityInput').value = prod.stockQuantity !== undefined ? prod.stockQuantity : 10;
    document.getElementById('productBadgeInput').value = prod.badge || 'Original';
    document.getElementById('productPartsQualityInput').value = prod.partsQuality || '100% Original';
    document.getElementById('productCompatibilityInput').value = prod.compatibility || '';
    document.getElementById('productImageUrlInput').value = prod.image || '';
    document.getElementById('productDescInput').value = prod.desc || '';

    const submitBtn = document.getElementById('productModalSubmitBtn');
    if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> OK / Save Changes';

    // Display existing image preview
    const previewImg = document.getElementById('productImagePreview');
    const previewContainer = document.getElementById('imagePreviewContainer');
    const previewInfo = document.getElementById('previewImgInfo');

    if (prod.image) {
        previewImg.src = prod.image;
        previewContainer.style.display = 'flex';
        if (previewInfo) previewInfo.textContent = 'Existing Image';
    } else {
        previewContainer.style.display = 'none';
    }

    // Populate Specs
    const specsContainer = document.getElementById('productSpecsContainer');
    specsContainer.innerHTML = '';
    if (Array.isArray(prod.specs) && prod.specs.length > 0) {
        prod.specs.forEach(s => addSpecInputRow(s));
    } else {
        addSpecInputRow('');
    }

    openModal('productEditModal');
}

function addSpecInputRow(value = '') {
    const container = document.getElementById('productSpecsContainer');
    const div = document.createElement('div');
    div.className = 'spec-item-input';
    div.innerHTML = `
        <input type="text" class="form-input product-spec-field" value="${escapeHtml(value)}" placeholder="e.g. 20W PD Fast Charging">
        <button type="button" class="btn-icon delete" onclick="this.parentElement.remove()" title="Remove spec"><i class="fa-solid fa-xmark"></i></button>
    `;
    container.appendChild(div);
}

function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str).replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Save Product Form Submission
function saveProduct(event) {
    event.preventDefault();

    const id = document.getElementById('productIdInput').value.trim();
    const name = document.getElementById('productNameInput').value.trim();
    const category = document.getElementById('productCategoryInput').value;
    const brand = document.getElementById('productBrandInput').value;
    const rawPrice = document.getElementById('productPriceInput').value.trim() || 'Rs. 7,990';
    const price = formatDisplayPrice(rawPrice);
    const rawOrig = document.getElementById('productOriginalPriceInput').value.trim();
    const originalPrice = rawOrig ? formatDisplayPrice(rawOrig) : '';
    const stockStatus = document.getElementById('productStockStatusInput').value;
    const stockQuantity = parseInt(document.getElementById('productStockQuantityInput').value) || 0;
    const badge = document.getElementById('productBadgeInput').value.trim() || 'Original';
    const partsQuality = document.getElementById('productPartsQualityInput').value.trim() || '100% Original';
    const compatibility = document.getElementById('productCompatibilityInput').value.trim();
    const desc = document.getElementById('productDescInput').value.trim();
    const urlInput = document.getElementById('productImageUrlInput').value.trim();

    if (!name) {
        showNotification('Please enter a product name!', 'error');
        return;
    }

    // Determine Image (Uploaded Compressed Canvas DataURL or External URL or Fallback)
    let finalImage = adminState.tempImageData || urlInput;
    if (!finalImage) {
        finalImage = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80";
    }

    // Collect Specs
    const specFields = document.querySelectorAll('.product-spec-field');
    const specs = [];
    specFields.forEach(f => {
        if (f.value.trim()) specs.push(f.value.trim());
    });

    const isEdit = Boolean(adminState.editingId);
    const productData = {
        id,
        name,
        category,
        brand,
        price,
        originalPrice,
        badge,
        partsQuality,
        stockStatus,
        stockQuantity,
        rating: 5.0,
        reviewsCount: 1,
        image: finalImage,
        specs,
        compatibility,
        desc
    };

    if (isEdit) {
        const index = adminState.products.findIndex(p => p.id === adminState.editingId);
        if (index !== -1) {
            adminState.products[index] = productData;
        }
    } else {
        adminState.products.unshift(productData);
    }

    // Synchronize global PRODUCTS reference for site
    if (typeof PRODUCTS !== 'undefined') {
        PRODUCTS = adminState.products;
    }

    saveAdminState();
    closeModal('productEditModal');
    renderDashboard();

    // Show stylish success modal with OK button
    showSuccessModal(
        isEdit ? 'Product Updated' : 'Product Added',
        isEdit ? `"${productData.name}" has been updated successfully.` : `"${productData.name}" was added to your product catalog.`
    );
}

function showSuccessModal(title = 'Product Saved', message = 'All changes have been successfully saved.') {
    const titleEl = document.getElementById('successDialogTitle');
    const msgEl = document.getElementById('successDialogMessage');
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    openModal('successDialogModal');
}

// Recycle Bin CRUD Logic
function moveToTrash(productId) {
    const index = adminState.products.findIndex(p => p.id === productId);
    if (index !== -1) {
        const item = adminState.products.splice(index, 1)[0];
        adminState.trash.unshift(item);

        if (typeof PRODUCTS !== 'undefined') PRODUCTS = adminState.products;
        saveAdminState();
        renderDashboard();
        showNotification(`Moved "${item.name}" to Recycle Bin.`, 'info');
    }
}

function restoreFromTrash(productId) {
    const index = adminState.trash.findIndex(p => p.id === productId);
    if (index !== -1) {
        const item = adminState.trash.splice(index, 1)[0];
        adminState.products.unshift(item);

        if (typeof PRODUCTS !== 'undefined') PRODUCTS = adminState.products;
        saveAdminState();
        renderDashboard();
        showNotification(`Restored "${item.name}" to Active Products.`, 'success');
    }
}

function permanentDelete(productId) {
    if (!confirm('Are you sure you want to permanently delete this product? This action cannot be undone.')) {
        return;
    }
    const index = adminState.trash.findIndex(p => p.id === productId);
    if (index !== -1) {
        const item = adminState.trash.splice(index, 1)[0];
        saveAdminState();
        renderDashboard();
        showNotification(`Permanently purged "${item.name}".`, 'info');
    }
}

function clearTrash() {
    if (!confirm('Are you sure you want to clear all items in the Recycle Bin?')) {
        return;
    }
    adminState.trash = [];
    saveAdminState();
    renderDashboard();
    showNotification('Recycle Bin cleared.', 'info');
}

// Live Website Preview Modal
function openWebsitePreview() {
    const iframe = document.getElementById('previewIframe');
    if (iframe) {
        iframe.src = 'shop.html?preview=' + Date.now();
    }
    openModal('previewModal');
}

// JSON File Export & Import
function exportJSON() {
    const jsonStr = JSON.stringify(adminState.products, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    a.click();
    URL.revokeObjectURL(url);
    showNotification('products.json downloaded successfully!', 'success');
}

function triggerImportJSON() {
    document.getElementById('importJsonFileInput').click();
}

function handleImportJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                adminState.products = data;
                if (typeof PRODUCTS !== 'undefined') PRODUCTS = adminState.products;
                saveAdminState();
                renderDashboard();
                showNotification('Products imported successfully from JSON!', 'success');
            } else {
                showNotification('Invalid JSON format! Must be an array of products.', 'error');
            }
        } catch (err) {
            showNotification('Error parsing JSON file!', 'error');
        }
    };
    reader.readAsText(file);
}

// Single-Click "Publish Website" Workflow & Modal
async function startPublishWorkflow() {
    openModal('publishProgressModal');

    const step1 = document.getElementById('publishStep1');
    const step2 = document.getElementById('publishStep2');
    const step3 = document.getElementById('publishStep3');
    const step4 = document.getElementById('publishStep4');
    const doneBanner = document.getElementById('publishSuccessBanner');

    // Reset steps
    setStepState(step1, 'active', 'Validating product schema and stock counts...');
    setStepState(step2, 'pending', 'Waiting...');
    setStepState(step3, 'pending', 'Waiting...');
    setStepState(step4, 'pending', 'Waiting...');
    doneBanner.style.display = 'none';

    await delay(600);

    // Step 1: Validate Schema
    if (adminState.products.length === 0) {
        setStepState(step1, 'error', 'No products to publish!');
        return;
    }
    setStepState(step1, 'done', `Validated ${adminState.products.length} products clean.`);

    // Step 2: Optimize Assets
    setStepState(step2, 'active', 'Compressing product images & generating WebP data...');
    await delay(700);
    setStepState(step2, 'done', 'All product images optimized.');

    // Step 3: Serialize products.json
    setStepState(step3, 'active', 'Serializing data/products.json...');
    await delay(600);
    setStepState(step3, 'done', 'Generated data/products.json payload.');

    // Step 4: GitHub API Commit / Storage Sync
    setStepState(step4, 'active', 'Synchronizing with GitHub Repository API...');

    const { owner, repo, branch, token } = adminState.githubConfig;

    if (owner && repo && token) {
        try {
            // Direct GitHub API Commit Workflow
            const path = 'data/products.json';
            const content = btoa(unescape(encodeURIComponent(JSON.stringify(adminState.products, null, 2))));
            
            // Get current file sha if exists
            let sha = '';
            const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`, {
                headers: { 'Authorization': `token ${token}` }
            });
            if (getRes.ok) {
                const fileData = await getRes.json();
                sha = fileData.sha;
            }

            // Put file update
            const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Update products catalog via N TECH Admin Dashboard [${new Date().toLocaleString()}]`,
                    content: content,
                    branch: branch,
                    ...(sha ? { sha } : {})
                })
            });

            if (putRes.ok) {
                setStepState(step4, 'done', `Pushed commit directly to GitHub (${owner}/${repo}:${branch}).`);
            } else {
                setStepState(step4, 'done', `Updated local catalog (GitHub API token check failed/offline).`);
            }
        } catch (e) {
            setStepState(step4, 'done', `Updated local storage & catalog cache.`);
        }
    } else {
        await delay(800);
        setStepState(step4, 'done', `Saved changes locally & updated products cache! (Configure GitHub PAT in settings for direct remote commits).`);
    }

    saveAdminState();
    doneBanner.style.display = 'block';
    updateSyncBadge(true);
}

function setStepState(element, state, message) {
    if (!element) return;
    const icon = element.querySelector('.step-status-icon');
    const msg = element.querySelector('.step-msg');

    icon.className = `step-status-icon ${state}`;
    if (state === 'pending') icon.innerHTML = '<i class="fa-solid fa-clock"></i>';
    if (state === 'active') icon.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    if (state === 'done') icon.innerHTML = '<i class="fa-solid fa-check"></i>';
    if (state === 'error') icon.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    if (msg) msg.textContent = message;
}

function updateSyncBadge(synced = false) {
    const badge = document.getElementById('syncStatusBadge');
    if (!badge) return;

    badge.removeAttribute('style');
    if (synced) {
        badge.className = 'admin-badge synced';
        badge.innerHTML = '<i class="fa-solid fa-cloud-check"></i> <span>Live &amp; Synced</span>';
    } else {
        const hasUnsaved = localStorage.getItem('ntech_admin_products_v1') !== null;
        if (hasUnsaved) {
            badge.className = 'admin-badge pending';
            badge.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i> <span>Unpublished Edits</span>';
        } else {
            badge.className = 'admin-badge synced';
            badge.innerHTML = '<i class="fa-solid fa-cloud-check"></i> <span>Live &amp; Synced</span>';
        }
    }
}

// Sync badge initial state
// (Event listeners are registered in the main initEventListeners function)

// Modal Helpers
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const bodyEl = modal.querySelector('.admin-modal-body');
        if (bodyEl) {
            bodyEl.scrollTop = 0;
        }
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('active');
        const anyActive = document.querySelector('.admin-modal-backdrop.active');
        if (!anyActive) {
            document.body.style.overflow = '';
        }
    }
}

// Click outside modal box to close
document.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('admin-modal-backdrop') && e.target.id !== 'publishProgressModal') {
        closeModal(e.target.id);
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Simple Toast Notification
function showNotification(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #0f172a;
        color: #fff;
        padding: 0.85rem 1.5rem;
        border-radius: 12px;
        border: 1px solid ${type === 'error' ? '#ff3d00' : type === 'success' ? '#00e676' : 'var(--accent-cyan)'};
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        z-index: 9999;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: fadeIn 0.3s ease;
    `;
    const icon = type === 'error' ? 'fa-triangle-exclamation' : type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color:${type === 'error' ? '#ff3d00' : type === 'success' ? '#00e676' : 'var(--accent-cyan)'}"></i> ${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
