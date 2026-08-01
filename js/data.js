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
    { id: "apple", name: "Apple", logoIcon: "fa-mobile-screen-button" },
    { id: "samsung", name: "Samsung", logoIcon: "fa-mobile-screen-button" },
    { id: "xiaomi", name: "Xiaomi / Redmi / POCO", logoIcon: "fa-mobile-screen-button" },
    { id: "vivo", name: "Vivo", logoIcon: "fa-mobile-screen-button" },
    { id: "oppo", name: "Oppo", logoIcon: "fa-mobile-screen-button" },
    { id: "realme", name: "Realme", logoIcon: "fa-mobile-screen-button" },
    { id: "google", name: "Google Pixel", logoIcon: "fa-mobile-screen-button" },
    { id: "oneplus", name: "OnePlus", logoIcon: "fa-mobile-screen-button" },
    { id: "anker", name: "Anker", logoIcon: "fa-mobile-screen-button" },
    { id: "jbl", name: "JBL", logoIcon: "fa-mobile-screen-button" },
    { id: "baseus", name: "Baseus", logoIcon: "fa-mobile-screen-button" }
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
