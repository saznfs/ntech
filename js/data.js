// N TECH Mobile Solution - Central Data Store

const SHOP_INFO = {
    name: "N TECH Mobile Solution",
    tagline: "Premium Digital Showroom & Precision Mobile Repair Center",
    address: "No. 96, Negombo Road, Ihala Kottaramulla 61154, Sri Lanka",
    phone: "+94 71 230 9934",
    whatsapp: "94712309934",
    googleRating: "5.0",
    reviewCount: 3,
    hours: "8:30 AM – 10:00 PM (Daily)",
    googleMapUrl: "https://maps.app.goo.gl/EK1Euto6gXmWAENE9"
};

const CATEGORIES = [
    { id: "phones", name: "Mobile Phones", icon: "fa-mobile-screen-button", count: "15+ Models", desc: "Flagship & Budget Smartphone Sales" },
    { id: "chargers", name: "Fast Chargers & Adapters", icon: "fa-bolt-lightning", count: "25+ Products", desc: "PD, GaN & Quick Charge 4.0 Adapters" },
    { id: "cases", name: "Cases & Covers", icon: "fa-shield-halved", count: "50+ Designs", desc: "MagSafe, Armor & Silicone Covers" },
    { id: "earbuds", name: "Earbuds & Audio", icon: "fa-headphones", count: "30+ Models", desc: "ANC Wireless Earbuds & Headphones" },
    { id: "displays", name: "Original Displays", icon: "fa-desktop", count: "40+ Brands", desc: "OLED, AMOLED & FHD Original Displays" },
    { id: "tempered-glass", name: "Tempered Glass & Protectors", icon: "fa-glass-water", count: "100+ Models", desc: "9D Curved Privacy & UV Glass" },
    { id: "memory-cards", name: "Memory & Storage", icon: "fa-sd-card", count: "15+ Sizes", desc: "High Speed MicroSD & OTG Drives" },
    { id: "power-banks", name: "Power Banks", icon: "fa-battery-full", count: "20+ Capacities", desc: "10000mAh to 30000mAh Power Banks" },
    { id: "cables", name: "Charging & Data Cables", icon: "fa-cable-car", count: "40+ Types", desc: "Type-C, Lightning & Braided Cables" },
    { id: "repairs", name: "Repair Services", icon: "fa-screwdriver-wrench", count: "20+ Services", desc: "Hardware Repairs & Software Unlocking" }
];

const BRANDS = [
    { id: "apple", name: "Apple", logoIcon: "fa-apple", svgLogo: `<svg viewBox="0 0 170 170" width="28" height="28" fill="currentColor"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.9.13-9.74-1.93-14.54-6.19-3.32-2.88-7.23-7.6-11.74-14.17-6.04-8.73-10.9-18.49-14.57-29.28-3.67-10.79-5.51-21.2-5.51-31.23 0-14.73 3.75-26.68 11.25-35.85 7.5-9.17 16.9-13.89 28.21-14.17 4.8 0 10.05 1.15 15.75 3.44 5.7 2.29 9.6 3.44 11.69 3.44 1.83 0 5.86-1.22 12.09-3.66 6.23-2.44 11.61-3.56 16.14-3.36 8.52.54 15.82 3.39 21.91 8.55 4.3 3.65 7.74 8.08 10.32 13.3-11.89 7.18-17.72 17.2-17.48 30.06.24 10.15 4.12 18.57 11.63 25.26 4.31 3.86 9.3 6.64 14.97 8.35-2.7 7.75-6.27 15.35-10.71 22.8zM119.22 31.85c0-6.72 2.45-13.14 7.35-19.26 4.9-6.12 11.08-10.12 18.53-12 0 .86.04 1.58.04 2.15 0 6.6-2.52 13.12-7.56 19.55-5.04 6.43-11.23 10.45-18.36 12.06z"/></svg>` },
    { id: "samsung", name: "Samsung", logoIcon: "fa-mobile", svgLogo: `<svg viewBox="0 0 520 90" width="58" height="22" fill="currentColor"><path d="M78.6 34.6c-9.8-3.7-15.1-6.5-15.1-11.6 0-4.3 4.2-7.1 11.3-7.1 8 0 16.8 3.5 22.9 7.4l6.1-12.8C96.2 5.5 84.8 1.9 73.7 1.9c-17.5 0-29.2 9-29.2 22.5 0 15 13.6 19.9 26.6 24.8 10.4 3.9 15.6 7.4 15.6 12.6 0 5.1-4.9 8.1-12.7 8.1-10.2 0-20.7-4.6-27.4-9.3l-6.2 13.3C48 80.1 60.8 84.5 73.1 84.5c18.8 0 31.5-9.3 31.5-24.1 0-14.7-12.8-20.5-26-25.8zM157.9 2.9l-22.3 80.7h17.1l4.9-18.5h26.7l5 18.5h17.2L184.2 2.9h-26.3zm4.5 48.7l8.4-31.9 8.6 31.9h-17zM250.7 2.9l-19 55.4-18.8-55.4h-21l-3 80.7h16.2l1.6-48.4 17.6 48.4h13.2l17.7-48.4 1.5 48.4h16.1l-3-80.7h-22.1zM342.3 34.6c-9.8-3.7-15.1-6.5-15.1-11.6 0-4.3 4.2-7.1 11.3-7.1 8 0 16.8 3.5 22.9 7.4l6.1-12.8C359.9 5.5 348.5 1.9 337.4 1.9c-17.5 0-29.2 9-29.2 22.5 0 15 13.6 19.9 26.6 24.8 10.4 3.9 15.6 7.4 15.6 12.6 0 5.1-4.9 8.1-12.7 8.1-10.2 0-20.7-4.6-27.4-9.3l-6.2 13.3c7.6 6.2 20.4 10.6 32.7 10.6 18.8 0 31.5-9.3 31.5-24.1 0-14.7-12.8-20.5-26-25.8zM418.5 2.9v50c0 10.7-5.5 17-15.3 17s-15.3-6.3-15.3-17v-50h-17.1v50.9c0 19.9 12.8 30.7 32.4 30.7 19.6 0 32.4-10.8 32.4-30.7V2.9h-17.1zM460 2.9v80.7h16.8V42.8l26.4 40.8H519V2.9h-16.7v40.3L476 2.9H460z"/></svg>` },
    { id: "xiaomi", name: "Xiaomi / Redmi / POCO", logoIcon: "fa-microchip", svgLogo: `<svg viewBox="0 0 200 200" width="28" height="28" fill="currentColor"><rect width="200" height="200" rx="45" fill="none" stroke="currentColor" stroke-width="14"/><path d="M52 65h32v38c0 9 7 16 16 16s16-7 16-16V65h32v70h-32v-30c0-3-2-5-5-5s-5 2-5 5v30H52V65zm74 0h22v70h-22V65z" fill="currentColor"/></svg>` },
    { id: "vivo", name: "Vivo", logoIcon: "fa-cellphone", svgLogo: `<svg viewBox="0 0 500 140" width="56" height="20" fill="currentColor"><path d="M78 12L37 124 0 12h32l19 72L70 12h8zm138 0L175 124h-32L106 12h32l19 72L176 12h40zm38 112V42h30v82h-30zm0-96V12h30v16h-30zm88 96c-35 0-54-23-54-57s21-57 54-57 54 23 54 57-21 57-54 57zm0-26c17 0 24-14 24-31s-7-31-24-31-24 14-24 31 7 31 24 31z"/></svg>` },
    { id: "oppo", name: "Oppo", logoIcon: "fa-mobile", svgLogo: `<svg viewBox="0 0 500 140" width="56" height="20" fill="currentColor"><path d="M68 12C30 12 0 37 0 70s30 58 68 58 68-25 68-58-30-58-68-58zm0 88C45 100 28 87 28 70s17-30 40-30 40 13 40 30-17 30-40 30zm114-88c-38 0-68 25-68 58s30 58 68 58 68-25 68-58-30-58-68-58zm0 88c-23 0-40-13-40-30s17-30 40-30 40 13 40 30-17 30-40 30zm182-88c-38 0-68 25-68 58s30 58 68 58v30h28V95c11 8 26 13 40 13 38 0 68-25 68-58s-30-58-68-58zm0 88c-23 0-40-13-40-30s17-30 40-30 40 13 40 30-17 30-40 30zm114-88c-38 0-68 25-68 58s30 58 68 58v30h28V95c11 8 26 13 40 13 38 0 68-25 68-58s-30-58-68-58zm0 88c-23 0-40-13-40-30s17-30 40-30 40 13 40 30-17 30-40 30z"/></svg>` },
    { id: "realme", name: "Realme", logoIcon: "fa-mobile", svgLogo: `<svg viewBox="0 0 500 130" width="56" height="18" fill="currentColor"><path d="M0 12h55c20 0 35 12 35 30 0 13-8 23-20 27l24 43H64L43 72H28v40H0V12zm28 38h25c7 0 11-4 11-10s-4-10-11-10H28v20zm106-38v100h28V72h30V50h-30V34h36V12h-64zm102 38c-18 0-30 12-30 30s12 32 30 32c14 0 25-8 28-20h-25c-2 4-6 6-10 6-7 0-11-4-12-10h68c1-4 1-8 1-12 0-20-13-36-40-36zm-11 20c1-5 5-8 11-8s10 3 11 8h-22zm103-20c-15 0-25 7-30 18v-14h-26v100h28V70c0-12 8-18 18-18s15 6 15 18v42h28V66c0-22-12-38-33-38zm74 0c-25 0-42 16-42 40s17 40 42 40c12 0 23-4 30-12v10h26V12h-28v38c-7-8-18-12-28-12zm4 60c-14 0-22-10-22-22s8-22 22-22 22 10 22 22-8 22-22 22zm64-60c-18 0-30 12-30 30s12 32 30 32c14 0 25-8 28-20h-25c-2 4-6 6-10 6-7 0-11-4-12-10h68c1-4 1-8 1-12 0-20-13-36-40-36zm-11 20c1-5 5-8 11-8s10 3 11 8h-22z"/></svg>` },
    { id: "google", name: "Google Pixel", logoIcon: "fa-g", svgLogo: `<svg viewBox="0 0 24 24" width="28" height="28"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>` },
    { id: "oneplus", name: "OnePlus", logoIcon: "fa-plus", svgLogo: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M2 2h20v20H2V2zm2 2v16h16V4H4zm7.5 3h3v3.5H18v3h-3.5V17h-3v-3.5H8v-3h3.5V7zm-2.8 7.5h-1.5V11h-1.2v-1.2h2.7v4.7z"/></svg>` },
    { id: "anker", name: "Anker", logoIcon: "fa-plug", svgLogo: `<svg viewBox="0 0 400 100" width="56" height="20" fill="currentColor"><path d="M45 10L5 90h25l8-17h34l8 17h25L75 10H45zm4 24l11 25H48l11-25zM120 10v80h22V55l28 35h27L167 48l28-38h-27l-26 35V10h-22zm90 0v80h65V70h-43V55h38V35h-38V30h43V10h-65zm80 0v80h22V55h15l16 35h24l-19-39c12-4 19-14 19-25 0-14-11-26-29-26h-48zm22 18h22c6 0 10 3 10 8s-4 8-10 8h-22V28z"/></svg>` },
    { id: "jbl", name: "JBL", logoIcon: "fa-music", svgLogo: `<svg viewBox="0 0 300 120" width="48" height="24" fill="currentColor"><path d="M20 10h40v60c0 22-16 38-38 38H10V88h12c10 0 18-6 18-18V10H20zm70 0h55c20 0 32 10 32 24 0 10-6 18-16 21 12 3 20 12 20 24 0 17-14 29-36 29H90V10zm36 34c8 0 14-4 14-10s-6-10-14-10h-16v20h16zm2 44c9 0 16-5 16-12s-7-12-16-12h-18v24h18zm72-78h26v78h48v20h-74V10z"/></svg>` },
    { id: "baseus", name: "Baseus", logoIcon: "fa-bolt", svgLogo: `<svg viewBox="0 0 450 100" width="56" height="20" fill="currentColor"><path d="M30 10C12 10 0 22 0 40v20c0 18 12 30 30 30h40V10H30zm18 60H30c-8 0-12-4-12-10V40c0-6 4-10 12-10h18v40zm62-60c-16 0-28 10-28 26v34h22V40c0-4 4-8 10-8s10 4 10 8v30h22V36c0-16-12-26-36-26zm70 0c-18 0-30 12-30 30s12 30 30 30 30-12 30-30-12-30-30-30zm0 40c-6 0-10-4-10-10s4-10 10-10 10 4 10 10-4 10-10 10zm65-40v40c0 6-4 10-10 10s-10-4-10-10V10h-22v40c0 18 14 30 32 30s32-12 32-30V10h-22zm75 0c-15 0-26 8-29 20h22c2-3 5-5 9-5 4 0 7 2 7 5 0 2-2 4-6 5l-14 3c-13 3-19 9-19 18 0 12 10 19 24 19 12 0 21-5 26-14v12h20V42c0-20-14-32-40-32zm4 52c-5 0-8-3-8-6 0-3 3-5 8-6l10-2v3c0 7-4 11-10 11z"/></svg>` }
];

const REPAIR_SERVICES = [
    {
        id: "display-replacement",
        name: "Display Replacement",
        icon: "fa-desktop",
        desc: "Cracked glass, black screen, touch issue or lines on display.",
        timeEstimate: "30 – 60 Mins",
        badge: "Most Requested",
        qualityOptions: ["Original Super AMOLED / OLED", "OEM Grade Display", "High Copy Compatible"]
    },
    {
        id: "battery-replacement",
        name: "Battery Replacement",
        icon: "fa-battery-quarter",
        desc: "Fast draining, slow charging, battery swelling, or low health.",
        timeEstimate: "20 – 40 Mins",
        badge: "Express Repair",
        qualityOptions: ["Original Grade Battery", "High Capacity OEM Battery"]
    },
    {
        id: "charging-port",
        name: "Charging Port Repair",
        icon: "fa-plug-circle-bolt",
        desc: "Loose connector, port not working, moisture detected error.",
        timeEstimate: "30 – 45 Mins",
        badge: "Same Day",
        qualityOptions: ["Original Flex Cable Assembly", "Port Solder Repair"]
    },
    {
        id: "water-damage",
        name: "Water Damage Cleanup",
        icon: "fa-droplet-slash",
        desc: "Ultrasonic cleaning, corrosion removal & full board diagnostic.",
        timeEstimate: "2 – 4 Hours",
        badge: "Diagnostic Required",
        qualityOptions: ["Complete Deep Clean & Resoldering"]
    },
    {
        id: "software-unlock",
        name: "Software & FRP / iCloud Unlock",
        icon: "fa-key",
        desc: "Forgot passcode, FRP Google bypass, iCloud lock or stuck on logo.",
        timeEstimate: "1 – 3 Hours",
        badge: "100% Safe",
        qualityOptions: ["Official Firmware Flashing & Security Unlock"]
    },
    {
        id: "back-glass",
        name: "Back Glass Replacement",
        icon: "fa-layer-group",
        desc: "Laser precision back glass panel replacement for iPhone & flagship Androids.",
        timeEstimate: "1 – 2 Hours",
        badge: "Laser Technology",
        qualityOptions: ["Original Glass with Logo", "High Grade Back Panel"]
    },
    {
        id: "camera-repair",
        name: "Camera Repair / Replacement",
        icon: "fa-camera",
        desc: "Blurry focus, camera shaking, glass lens crack or black camera screen.",
        timeEstimate: "30 – 60 Mins",
        badge: "Genuine Sensor",
        qualityOptions: ["Original Module", "Lens Glass Only"]
    },
    {
        id: "motherboard-repair",
        name: "Motherboard & Chipset Repair",
        icon: "fa-microchip",
        desc: "Dead boot, short circuit, no power, audio IC or charging IC replacement.",
        timeEstimate: "Same Day / 24 Hours",
        badge: "Micro-soldering",
        qualityOptions: ["Component Level Repair"]
    },
    {
        id: "speaker-mic",
        name: "Speaker & Microphone Repair",
        icon: "fa-volume-high",
        desc: "Low ear speaker volume, distorted audio, or caller can't hear you.",
        timeEstimate: "30 Mins",
        badge: "Express Repair",
        qualityOptions: ["Original Speaker Module", "Mic Mesh Cleaning"]
    },
    {
        id: "fingerprint-faceid",
        name: "Face ID & Fingerprint Repair",
        icon: "fa-fingerprint",
        desc: "Face ID disabled message, dot projector repair or home button touch ID fix.",
        timeEstimate: "2 – 3 Hours",
        badge: "Specialized Fix",
        qualityOptions: ["Tag-on Flex Soldering & Calibration"]
    }
];

const DEVICE_MODELS = {
    apple: [
        "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
        "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
        "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
        "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 11 Pro Max",
        "iPhone 11", "iPhone XS Max", "iPhone XR", "iPhone X", "iPhone 8 / 8 Plus", "iPhone 7 / 7 Plus"
    ],
    samsung: [
        "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23 FE",
        "Galaxy S22 Ultra", "Galaxy S22", "Galaxy S21 Ultra", "Galaxy S21 FE", "Galaxy A55 5G", "Galaxy A54 5G",
        "Galaxy A35 5G", "Galaxy A25 5G", "Galaxy A15 5G", "Galaxy A05s", "Galaxy M54 5G", "Galaxy Z Fold 5", "Galaxy Z Flip 5"
    ],
    xiaomi: [
        "Xiaomi 14 Ultra", "Xiaomi 14", "Xiaomi 13T Pro", "Xiaomi 13T",
        "Redmi Note 13 Pro+ 5G", "Redmi Note 13 Pro 5G", "Redmi Note 13 4G/5G", "Redmi Note 12 Pro 5G",
        "Redmi Note 12", "Redmi 13C", "POCO X6 Pro 5G", "POCO X6", "POCO F5 Pro", "POCO M6 Pro"
    ],
    vivo: [
        "Vivo X100 Pro", "Vivo X90 Pro", "Vivo V30 Pro", "Vivo V30", "Vivo V29 5G", "Vivo V29e",
        "Vivo Y200 5G", "Vivo Y100", "Vivo Y36", "Vivo Y27 5G", "Vivo Y17s"
    ],
    oppo: [
        "Oppo Find X6 Pro", "Oppo Reno 11 Pro 5G", "Oppo Reno 11 5G", "Oppo Reno 10 Pro",
        "Oppo A98 5G", "Oppo A78 5G", "Oppo A58", "Oppo A38", "Oppo A18"
    ],
    realme: [
        "Realme 12 Pro+ 5G", "Realme 12 Pro 5G", "Realme 12 5G", "Realme 11 Pro+ 5G",
        "Realme 11 5G", "Realme C67 5G", "Realme C55", "Realme C53", "Realme C35"
    ],
    google: [
        "Google Pixel 8 Pro", "Google Pixel 8", "Google Pixel 8a", "Google Pixel 7 Pro",
        "Google Pixel 7", "Google Pixel 7a", "Google Pixel 6 Pro", "Google Pixel 6a"
    ],
    oneplus: [
        "OnePlus 12", "OnePlus 12R", "OnePlus 11 5G", "OnePlus Nord 3 5G", "OnePlus Nord CE 3 Lite",
        "OnePlus 10 Pro", "OnePlus 9 Pro", "OnePlus 8T"
    ],
    huawei: [
        "Huawei P60 Pro", "Huawei Mate 50 Pro", "Huawei Nova 11 Pro", "Huawei Nova 10", "Huawei Y9a"
    ],
    honor: [
        "Honor Magic 6 Pro", "Honor 90 5G", "Honor 70", "Honor X9b 5G", "Honor X8b", "Honor X7b"
    ],
    nokia: [
        "Nokia G42 5G", "Nokia G22", "Nokia C32", "Nokia X30 5G"
    ],
    motorola: [
        "Motorola Edge 40 Neo", "Motorola Edge 30 Ultra", "Moto G84 5G", "Moto G54 5G"
    ],
    infinix: [
        "Infinix Note 40 Pro+ 5G", "Infinix Note 30 VIP", "Infinix Zero 30 5G", "Infinix Hot 40 Pro", "Infinix Smart 8"
    ],
    tecno: [
        "Tecno Camon 30 Pro 5G", "Tecno Pova 6 Pro 5G", "Tecno Spark 20 Pro+", "Tecno Pop 8"
    ]
};

const PRODUCTS = [
    {
        id: "prod-1",
        name: "Anker Soundcore R50i NC True Wireless Earbuds",
        category: "earbuds",
        brand: "Anker",
        price: "LKR 7,990",
        originalPrice: "LKR 9,500",
        badge: "Best Seller",
        partsQuality: "100% Original",
        stockStatus: "In Stock",
        rating: 4.9,
        reviewsCount: 42,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
        specs: ["42dB Hybrid Active Noise Cancellation", "10mm Big Bass Drivers", "45 Hours Total Playtime with Fast Charge", "IPX5 Water Resistant", "Dual Mic AI Call Clarity"],
        compatibility: "Universal (iOS, Android, Windows, Mac)",
        desc: "Experience incredible clarity and rich bass with Anker Soundcore R50i NC. Features adaptive active noise cancellation and ergonomic glass design."
    },
    {
        id: "prod-2",
        name: "Apple 20W USB-C Fast Power Adapter",
        category: "chargers",
        brand: "Apple",
        price: "LKR 5,800",
        originalPrice: "LKR 7,200",
        badge: "Original",
        partsQuality: "100% Original Apple",
        stockStatus: "In Stock",
        rating: 5.0,
        reviewsCount: 88,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
        specs: ["20W USB Power Delivery 3.0", "Fast charges iPhone 8 or later to 50% in 30 mins", "Compact white finish", "Multiple circuit protection"],
        compatibility: "iPhone 15 Series, 14, 13, 12, 11, iPad Air/Pro",
        desc: "Genuine Apple 20W Power Adapter provides fast, efficient charging at home, in the office, or on the go."
    },
    {
        id: "prod-3",
        name: "Samsung 45W Super Fast Charging Wall Charger",
        category: "chargers",
        brand: "Samsung",
        price: "LKR 6,950",
        originalPrice: "LKR 8,500",
        badge: "Super Fast",
        partsQuality: "Original Samsung OEM",
        stockStatus: "In Stock",
        rating: 4.9,
        reviewsCount: 35,
        image: "https://images.unsplash.com/photo-1622445268465-843d61408afe?w=600&auto=format&fit=crop&q=80",
        specs: ["45W USB-C Power Delivery with PPS", "Super Fast Charging 2.0 compatible", "Includes 5A Type-C to Type-C cable", "Adaptive Fast Charging"],
        compatibility: "Samsung Galaxy S24 Ultra, S23 Ultra, S22 Ultra, Tab S9",
        desc: "Give your Samsung flagship the maximum speed it deserves with Super Fast Charging 2.0 technology."
    },
    {
        id: "prod-4",
        name: "Baseus Bipow 20000mAh 20W Power Bank",
        category: "power-banks",
        brand: "Baseus",
        price: "LKR 8,450",
        originalPrice: "LKR 9,990",
        badge: "High Capacity",
        partsQuality: "Original Baseus",
        stockStatus: "In Stock",
        rating: 4.8,
        reviewsCount: 29,
        image: "https://images.unsplash.com/photo-1609592424074-8848d7990145?w=600&auto=format&fit=crop&q=80",
        specs: ["20000mAh Polymer Battery", "20W PD Fast Charging", "Dual USB + Type-C Output", "Digital LED Battery Display", "Multi-layer Safety Protection"],
        compatibility: "Smartphones, Tablets, Smartwatches, Earbuds",
        desc: "Reliable power bank with digital display for precise power management during long trips."
    },
    {
        id: "prod-5",
        name: "iPhone 15 Pro Max Premium MagSafe Clear Armor Case",
        category: "cases",
        brand: "Apple",
        price: "LKR 2,850",
        originalPrice: "LKR 3,500",
        badge: "MagSafe Ready",
        partsQuality: "Premium Grade",
        stockStatus: "In Stock",
        rating: 4.9,
        reviewsCount: 54,
        image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=600&auto=format&fit=crop&q=80",
        specs: ["N52 Strong Magnetic Ring", "Anti-Yellowing German TPU", "3m Military Drop Protection", "Raised Camera Bumper", "Crystal Clear Transparency"],
        compatibility: "iPhone 15 Pro Max",
        desc: "Showcase the Titanium finish of your iPhone 15 Pro Max while securing strong magnetic snap charging."
    },
    {
        id: "prod-6",
        name: "Samsung Galaxy S24 Ultra Original Dynamic AMOLED 2X Display",
        category: "displays",
        brand: "Samsung",
        price: "Inquire via WhatsApp",
        originalPrice: "Genuine Part",
        badge: "Original Assembly",
        partsQuality: "100% Original Factory Display",
        stockStatus: "Available on Order",
        rating: 5.0,
        reviewsCount: 12,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
        specs: ["Original 120Hz LTPO Dynamic AMOLED 2X", "2600 nits Peak Brightness", "Includes Outer Frame Assembly", "Touch Digitizer & Gorilla Glass Armor"],
        compatibility: "Samsung Galaxy S24 Ultra",
        desc: "Original factory service display replacement. Solves broken glass, touch unresponsiveness, or display lines."
    },
    {
        id: "prod-7",
        name: "9D Curved UV Tempered Glass Screen Protector",
        category: "tempered-glass",
        brand: "Universal",
        price: "LKR 1,200",
        originalPrice: "LKR 1,800",
        badge: "Free Installation",
        partsQuality: "9H Hardness",
        stockStatus: "In Stock",
        rating: 4.9,
        reviewsCount: 110,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
        specs: ["Liquid UV Optical Glue", "Edge-to-Edge 9D Curve Coverage", "Under-display Fingerprint Compatible", "Oleophobic Anti-Fingerprint Coating"],
        compatibility: "Curved Display Models (Samsung S Ultra, Vivo V, Oppo Reno, Xiaomi)",
        desc: "Includes professional bubble-free UV installation at N TECH Mobile Solution shop."
    },
    {
        id: "prod-8",
        name: "Baseus 65W GaN Fast Charger 3-Port Desktop Hub",
        category: "chargers",
        brand: "Baseus",
        price: "LKR 9,800",
        originalPrice: "LKR 11,500",
        badge: "GaN V Tech",
        partsQuality: "Original Baseus",
        stockStatus: "In Stock",
        rating: 5.0,
        reviewsCount: 22,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
        specs: ["GaN V Technology", "65W High Power Output", "Dual Type-C + USB-A ports", "Charges Laptops, MacBooks & Phones simultaneously"],
        compatibility: "MacBook, Laptops, iPhone, Samsung, Xiaomi, iPad",
        desc: "All-in-one ultra compact charger for laptop and mobile fast charging."
    },
    {
        id: "prod-9",
        name: "JBL Wave 200TWS True Wireless Earbuds",
        category: "earbuds",
        brand: "JBL",
        price: "LKR 14,500",
        originalPrice: "LKR 16,900",
        badge: "Deep Bass",
        partsQuality: "Original JBL",
        stockStatus: "In Stock",
        rating: 4.8,
        reviewsCount: 38,
        image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80",
        specs: ["JBL Deep Bass Sound", "20 Hours Combined Playback", "Dual Connect Tech (Use Either Ear)", "Touch Controls"],
        compatibility: "Universal Bluetooth 5.0",
        desc: "Punchy deep bass with 20 hours of music freedom. Comfortable ergonomics for everyday wear."
    },
    {
        id: "prod-10",
        name: "SanDisk Ultra 128GB MicroSDXC Class 10 Memory Card",
        category: "memory-cards",
        brand: "Universal",
        price: "LKR 3,450",
        originalPrice: "LKR 4,200",
        badge: "140MB/s Speed",
        partsQuality: "Original SanDisk",
        stockStatus: "In Stock",
        rating: 4.9,
        reviewsCount: 74,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80",
        specs: ["Up to 140MB/s Transfer Speed", "A1 Rated for Faster App Performance", "UHS-I Speed Class U1", "Waterproof & Temperature proof"],
        compatibility: "Android Phones, Dashcams, Security Cameras, Tablets",
        desc: "High-speed reliable storage expansion for photos, 4K videos, and heavy mobile apps."
    },
    {
        id: "prod-11",
        name: "Anker 322 USB-C to USB-C Heavy Duty Braided Cable 6FT",
        category: "cables",
        brand: "Anker",
        price: "LKR 2,900",
        originalPrice: "LKR 3,500",
        badge: "Heavy Duty",
        partsQuality: "Original Anker",
        stockStatus: "In Stock",
        rating: 5.0,
        reviewsCount: 41,
        image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80",
        specs: ["60W PD Fast Charge", "12,000+ Bend Lifespan", "Double Braided Nylon Exterior", "Tangle-Free Design"],
        compatibility: "Type-C Phones, MacBooks, iPad Pro, Laptops",
        desc: "Built to last. Superior nylon braiding prevents fraying and delivers high speed power delivery."
    },
    {
        id: "prod-12",
        name: "Apple iPhone 15 Original Battery Replacement Module",
        category: "repairs",
        brand: "Apple",
        price: "Inquire via WhatsApp",
        originalPrice: "Genuine Repair",
        badge: "0 Cycle Battery",
        partsQuality: "100% Original Capacity",
        stockStatus: "In Stock",
        rating: 5.0,
        reviewsCount: 19,
        image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&auto=format&fit=crop&q=80",
        specs: ["Original Battery Cell", "0 Battery Cycles", "Restores 100% Health Status", "Includes 6 Months Warranty"],
        compatibility: "iPhone 15 / 15 Plus / 15 Pro / 15 Pro Max",
        desc: "Restore factory battery backup with zero battery degradation. Includes express 30-minute installation."
    }
];

const REVIEWS = [
    {
        name: "Kasun Pathirana",
        rating: 5,
        date: "2 weeks ago",
        comment: "Fixed my iPhone 13 Pro display in under 45 minutes! Original display quality and very reasonable repair cost. Highly recommended mobile shop in Negombo Road!"
    },
    {
        name: "Mohamed Rizan",
        rating: 5,
        date: "1 month ago",
        comment: "Bought Anker R50i NC earbuds and 45W charger. 100% original items with genuine warranty. Quick response via WhatsApp."
    },
    {
        name: "Dilshan Fernando",
        rating: 5,
        date: "2 months ago",
        comment: "Excellent service. My Samsung S22 Ultra had a severe water damage issue. Technicians micro-soldered the board and saved all my photos! 5 Stars for N TECH."
    }
];

const FAQS = [
    {
        q: "How long does a display or battery replacement take?",
        a: "Most display and battery replacements are completed within 30 to 60 minutes. We maintain express parts inventory for Apple, Samsung, Xiaomi, Vivo, and Oppo."
    },
    {
        q: "Are the replacement parts original?",
        a: "Yes! We stock 100% Original Factory parts as well as High-Grade OEM compatible parts. We always give customers full transparency and option choices before repair."
    },
    {
        q: "Do I get a warranty on repairs and product purchases?",
        a: "Yes, all original products come with company warranty, and repair services include 3 to 6 months shop warranty covering functionality."
    },
    {
        q: "Will my data be safe during the repair process?",
        a: "Absolutely. Hardware repairs like display, battery, charging port, and back glass replacements do not affect your phone storage or personal data."
    },
    {
        q: "How can I check product prices or get a repair quotation?",
        a: "You can use our website's automated 'Ask Price' or 'Repair Quotation Wizard' buttons! It generates an instant pre-filled message directly to our WhatsApp (+94 71 230 9934)."
    }
];
