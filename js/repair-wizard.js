// N TECH Mobile Solution - Repair Service Quotation Wizard

let wizardState = {
    step: 1,
    issue: null,
    brand: null,
    model: null,
    quality: "100% Original Grade"
};

document.addEventListener('DOMContentLoaded', () => {
    initRepairWizard();
});

function initRepairWizard() {
    // Read URL hash for cross-page navigation (e.g., repair.html#issue=display-replacement)
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('issue=')) {
        const issueId = hash.replace('issue=', '');
        const foundIssue = REPAIR_SERVICES.find(s => s.id === issueId);
        if (foundIssue) {
            wizardState.issue = foundIssue;
            wizardState.step = 2;
            renderWizardStep2();
            return;
        }
    } else if (hash.startsWith('brand=')) {
        try {
            const parts = hash.split('&');
            const brandKey = decodeURIComponent(parts[0].replace('brand=', ''));
            const modelName = decodeURIComponent((parts[1] || '').replace('model=', ''));
            if (!wizardState.issue) wizardState.issue = REPAIR_SERVICES[0];
            const brandObj = BRANDS.find(b => b.id === brandKey);
            wizardState.brand = brandObj ? brandObj.name : brandKey.toUpperCase();
            wizardState.brandKey = brandKey;
            wizardState.model = modelName;
            wizardState.step = 4;
            renderWizardStep4();
            return;
        } catch(e) {}
    }
    renderWizardStep1();
}

// Global hook for search system integration
window.selectWizardIssue = function(issueId) {
    const foundIssue = REPAIR_SERVICES.find(s => s.id === issueId);
    if (foundIssue) {
        wizardState.issue = foundIssue;
        wizardState.step = 2;
        renderWizardStep2();
    }
};

window.selectWizardBrandAndModel = function(brandKey, modelName) {
    const brandObj = BRANDS.find(b => b.id === brandKey);
    if (!wizardState.issue) {
        wizardState.issue = REPAIR_SERVICES[0]; // Default to display replacement if not set
    }
    wizardState.brand = brandObj ? brandObj.name : brandKey.toUpperCase();
    wizardState.model = modelName;
    wizardState.step = 4;
    renderWizardStep4();
};

function setWizardStepHeader(currentStep) {
    const headerHtml = `
        <div class="wizard-steps-header">
            <div class="wizard-step-indicator ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}" onclick="goToWizardStep(1)">
                <div class="step-num">1</div>
                <div class="step-label">Choose Issue</div>
            </div>
            <div class="wizard-step-indicator ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}" onclick="goToWizardStep(2)">
                <div class="step-num">2</div>
                <div class="step-label">Select Brand</div>
            </div>
            <div class="wizard-step-indicator ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}" onclick="goToWizardStep(3)">
                <div class="step-num">3</div>
                <div class="step-label">Select Model</div>
            </div>
            <div class="wizard-step-indicator ${currentStep >= 4 ? 'active' : ''}" onclick="goToWizardStep(4)">
                <div class="step-num">4</div>
                <div class="step-label">Get Quote</div>
            </div>
        </div>
    `;
    return headerHtml;
}

function goToWizardStep(stepNum) {
    if (stepNum === 1) renderWizardStep1();
    else if (stepNum === 2 && wizardState.issue) renderWizardStep2();
    else if (stepNum === 3 && wizardState.brand) renderWizardStep3();
    else if (stepNum === 4 && wizardState.model) renderWizardStep4();
}

/* Step 1: Select Repair Issue */
function renderWizardStep1() {
    wizardState.step = 1;
    const container = document.getElementById('repairWizardBody');
    if (!container) return;

    let html = setWizardStepHeader(1);
    html += `
        <div style="text-align: center; margin-bottom: 2rem;">
            <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Select Your Repair Service</h3>
            <p class="text-muted">What issue are you experiencing with your smartphone?</p>
        </div>
        <div class="repair-cards-grid">
            ${REPAIR_SERVICES.map(service => `
                <div class="repair-issue-card ${wizardState.issue && wizardState.issue.id === service.id ? 'selected' : ''}" onclick="onSelectRepairIssue('${service.id}')">
                    <div style="font-size: 2rem; color: var(--accent-cyan); margin-bottom: 0.8rem;">
                        <i class="fa-solid ${service.icon}"></i>
                    </div>
                    <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 0.4rem;">${service.name}</div>
                    <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.8rem;">${service.desc}</div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="badge badge-cyan"><i class="fa-regular fa-clock"></i> ${service.timeEstimate}</span>
                        <span class="badge badge-amber">${service.badge}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    container.innerHTML = html;
}

function onSelectRepairIssue(issueId) {
    wizardState.issue = REPAIR_SERVICES.find(s => s.id === issueId);
    renderWizardStep2();
}

/* Step 2: Choose Brand */
function renderWizardStep2() {
    wizardState.step = 2;
    const container = document.getElementById('repairWizardBody');
    if (!container) return;

    let html = setWizardStepHeader(2);
    html += `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="glass-pill" style="margin-bottom: 0.8rem;"><i class="fa-solid fa-screwdriver-wrench"></i> ${wizardState.issue.name}</div>
            <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Choose Device Brand</h3>
            <p class="text-muted">Select the brand of your smartphone</p>
        </div>
        <div class="brand-select-grid">
            ${Object.keys(DEVICE_MODELS).map(brandKey => {
                const brandObj = BRANDS.find(b => b.id === brandKey);
                const brandName = brandObj ? brandObj.name : brandKey.toUpperCase();
                const iconClass = (brandObj && brandObj.logoIcon) ? brandObj.logoIcon : 'fa-mobile-screen-button';
                return `
                    <div class="brand-select-card ${wizardState.brand === brandName ? 'selected' : ''}" onclick="onSelectBrand('${brandKey}', '${brandName}')">
                        <i class="fa-solid ${iconClass}"></i>
                        <span style="font-weight: 600; font-size: 0.95rem;">${brandName}</span>
                    </div>
                `;
            }).join('')}
        </div>
        <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary btn-sm" onclick="renderWizardStep1()"><i class="fa-solid fa-arrow-left"></i> Back</button>
        </div>
    `;
    container.innerHTML = html;
}

function onSelectBrand(brandKey, brandName) {
    wizardState.brandKey = brandKey;
    wizardState.brand = brandName;
    renderWizardStep3();
}

/* Step 3: Choose Model */
function renderWizardStep3() {
    wizardState.step = 3;
    const container = document.getElementById('repairWizardBody');
    if (!container) return;

    const modelsList = DEVICE_MODELS[wizardState.brandKey] || [];

    let html = setWizardStepHeader(3);
    html += `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.8rem;">
                <span class="glass-pill"><i class="fa-solid fa-screwdriver-wrench"></i> ${wizardState.issue.name}</span>
                <span class="glass-pill"><i class="fa-solid fa-mobile-screen"></i> ${wizardState.brand}</span>
            </div>
            <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Select ${wizardState.brand} Model</h3>
            <p class="text-muted">Type or pick your specific smartphone model</p>
        </div>

        <div class="wizard-search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="modelFilterInput" placeholder="Filter ${wizardState.brand} models (e.g. S24, iPhone 15, Note 13)..." oninput="filterModelList(this.value)">
        </div>

        <div class="model-list-grid" id="modelListGrid">
            ${modelsList.map(model => `
                <button class="model-item-btn ${wizardState.model === model ? 'selected' : ''}" onclick="onSelectModel('${model}')">
                    <i class="fa-solid fa-mobile-screen" style="margin-right: 0.5rem; color: var(--accent-cyan);"></i> ${model}
                </button>
            `).join('')}
        </div>

        <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
            <button class="btn btn-secondary btn-sm" onclick="renderWizardStep2()"><i class="fa-solid fa-arrow-left"></i> Back</button>
            <div style="font-size: 0.85rem; color: var(--text-muted);">Can't find model? Pick closest or ask directly.</div>
        </div>
    `;
    container.innerHTML = html;
}

function filterModelList(query) {
    const grid = document.getElementById('modelListGrid');
    if (!grid) return;

    const modelsList = DEVICE_MODELS[wizardState.brandKey] || [];
    const q = query.toLowerCase().trim();

    const filtered = modelsList.filter(m => m.toLowerCase().includes(q));

    grid.innerHTML = filtered.map(model => `
        <button class="model-item-btn ${wizardState.model === model ? 'selected' : ''}" onclick="onSelectModel('${model}')">
            <i class="fa-solid fa-mobile-screen" style="margin-right: 0.5rem; color: var(--accent-cyan);"></i> ${model}
        </button>
    `).join('');

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--text-muted);">
                Model not listed? Click button below to request quote for custom model:
                <br><br>
                <button class="btn btn-primary btn-sm" onclick="onSelectModel('${query ? query.toUpperCase() : 'Custom Device'}')">
                    Request Quote for "${query || 'Unlisted Device'}"
                </button>
            </div>
        `;
    }
}

function onSelectModel(modelName) {
    wizardState.model = modelName;
    renderWizardStep4();
}

/* Step 4: Summary & Auto WhatsApp Quote Generator */
function renderWizardStep4() {
    wizardState.step = 4;
    const container = document.getElementById('repairWizardBody');
    if (!container) return;

    // Generate Auto WhatsApp Message
    const whatsappMsg = `Hi N TECH Mobile Solution,\n\nI need a quotation for repair service:\n\n• Service Issue: ${wizardState.issue.name}\n• Device Brand: ${wizardState.brand}\n• Model: ${wizardState.model}\n• Preferred Quality: ${wizardState.quality}\n\nPlease let me know the price, parts availability, and warranty details. Thank you!`;
    const encodedMsg = encodeURIComponent(whatsappMsg);
    const whatsappUrl = `https://wa.me/${SHOP_INFO.whatsapp}?text=${encodedMsg}`;

    let html = setWizardStepHeader(4);
    html += `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div class="badge badge-green" style="margin-bottom: 0.8rem;"><i class="fa-solid fa-circle-check"></i> Quote Ready</div>
            <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">Instant Repair Quotation Summary</h3>
            <p class="text-muted">Review your selection and request price directly on WhatsApp</p>
        </div>

        <div class="glass-card" style="padding: 2rem; max-width: 640px; margin: 0 auto 2rem auto;">
            <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.8rem;">
                    <span style="color: var(--text-muted);">Selected Repair:</span>
                    <strong style="color: var(--accent-cyan); font-size: 1.1rem;"><i class="fa-solid ${wizardState.issue.icon}"></i> ${wizardState.issue.name}</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.8rem;">
                    <span style="color: var(--text-muted);">Smartphone Brand:</span>
                    <strong style="color: #fff;">${wizardState.brand}</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.8rem;">
                    <span style="color: var(--text-muted);">Exact Model:</span>
                    <strong style="color: var(--accent-purple); font-size: 1.1rem;">${wizardState.model}</strong>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.8rem;">
                    <span style="color: var(--text-muted);">Est. Repair Duration:</span>
                    <span class="badge badge-cyan"><i class="fa-regular fa-clock"></i> ${wizardState.issue.timeEstimate}</span>
                </div>

                <div>
                    <label style="display: block; color: var(--text-muted); font-size: 0.88rem; margin-bottom: 0.5rem;">Select Parts Quality Preference:</label>
                    <select id="qualityOptionSelect" style="width: 100%; padding: 0.8rem 1rem; border-radius: var(--radius-md); background: rgba(0,0,0,0.5); border: 1px solid var(--border-glass-light); color: #fff;" onchange="updateQualityOption(this.value)">
                        ${(wizardState.issue.qualityOptions || ["100% Original Factory Part", "High Copy Compatible"]).map(opt => `
                            <option value="${opt}" ${wizardState.quality === opt ? 'selected' : ''}>${opt}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg shimmer-effect" style="width: 100%; max-width: 480px;">
                <i class="fa-brands fa-whatsapp" style="font-size: 1.6rem;"></i> Send Repair Inquiry via WhatsApp
            </a>
            <p style="font-size: 0.82rem; color: var(--text-dim); margin-top: 1rem;">
                <i class="fa-solid fa-lock"></i> Auto-generates clean Sri Lanka WhatsApp message for immediate shop response.
            </p>
        </div>

        <div style="margin-top: 2.5rem; display: flex; justify-content: space-between;">
            <button class="btn btn-secondary btn-sm" onclick="renderWizardStep3()"><i class="fa-solid fa-arrow-left"></i> Change Model</button>
            <button class="btn btn-secondary btn-sm" onclick="renderWizardStep1()"><i class="fa-solid fa-rotate-left"></i> Start Over</button>
        </div>
    `;
    container.innerHTML = html;
}

function updateQualityOption(val) {
    wizardState.quality = val;
    renderWizardStep4();
}
