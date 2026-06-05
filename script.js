/* ============================================
   KODI MARKETS FX - JavaScript Functionality
   Interactive Features & Animations
   ============================================ */

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ============================================
// PARTICLE BACKGROUND ANIMATION
// ============================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MOBILE NAVIGATION
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    hamburger.style.gap = navMenu.style.display === 'flex' ? '5px' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.style.display = 'none';
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const counters = document.querySelectorAll('.counter');

function startCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const increment = target / 50;
    let current = 0;

    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            setTimeout(updateCount, 30);
        } else {
            counter.textContent = target;
        }
    };

    updateCount();
}

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('counter')) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealElements = document.querySelectorAll('.market-card, .insight-card, .performance-card, .value');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slide-up 0.6s ease-out forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// BACK TO TOP BUTTON
// ============================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Log form data (in production, send to backend)
        console.log('Form submitted:', { name, email, message });

        // Show success message
        alert('Thank you for reaching out! We will get back to you soon.');

        // Reset form
        contactForm.reset();
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// INTERACTIVE MARKET CARDS
// ============================================

const marketCards = document.querySelectorAll('.market-card');

marketCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// ============================================
// ANIMATED COUNTERS FOR PERFORMANCE SECTION
// ============================================

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// DYNAMIC MARKET UPDATES (SIMULATION)
// ============================================

function updateMarketData() {
    const marketStats = document.querySelectorAll('.stat-value');
    marketStats.forEach(stat => {
        // Simulate market data changes
        const currentValue = parseFloat(stat.textContent);
        const change = (Math.random() - 0.5) * 0.1;
        const newValue = (currentValue + change).toFixed(2);
        stat.textContent = newValue;
    });
}

// Update market data every 5 seconds
setInterval(updateMarketData, 5000);

// ============================================
// FLOATING ANIMATION FOR CHARTS
// ============================================

const chartSvg = document.querySelector('.chart-svg');
if (chartSvg) {
    chartSvg.style.animation = 'float 6s ease-in-out infinite';
}

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

function adjustForMobile() {
    if (window.innerWidth < 768) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.fontSize = '14px';
        });
    }
}

window.addEventListener('resize', adjustForMobile);
adjustForMobile();

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.style.display = 'none';
    }

    // Ctrl/Cmd + K for quick navigation (can be extended)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Quick nav opened');
    }
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// ============================================
// THEME PERSISTENCE (Future dark/light mode)
// ============================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

initTheme();

// ============================================
// PAGE VISIBILITY API
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time: ' + pageLoadTime + 'ms');
        }, 0);
    });
}

// ============================================
// SEO STRUCTURED DATA INJECTION
// ============================================

function injectStructuredData() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "KODI MARKETS FX",
        "url": "https://kodiprabhu29-pixel.github.io/kodimarketsfx/",
        "description": "Premium financial markets content and trading insights",
        "sameAs": [
            "https://instagram.com/kodi_markets_fx"
        ],
        "contact": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "hello@kodimarketsfx.com"
        }
    };

    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
}

injectStructuredData();

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add focus indicators
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ============================================
// SERVICE WORKER REGISTRATION (PWA)
// ============================================

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registered'))
        .catch(err => console.log('Service Worker registration failed:', err));
}

// ============================================
// LOCAL STORAGE UTILITIES
// ============================================

const storageUtils = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage quota exceeded:', e);
        }
    },
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error reading from storage:', e);
            return null;
        }
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Throttle function
const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// ============================================
// FEATURE DETECTION
// ============================================

const supportsWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
                  (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
        return false;
    }
};

const supportsLocalStorage = () => {
    try {
        const test = '__localstorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
};

console.log('WebGL Support:', supportsWebGL());
console.log('LocalStorage Support:', supportsLocalStorage());

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('KODI MARKETS FX website initialized');
    
    // Add any initialization code here
    adjustForMobile();
    initTheme();
});

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        supportsWebGL,
        supportsLocalStorage,
        storageUtils
    };
}