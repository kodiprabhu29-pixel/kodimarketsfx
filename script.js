// ============================================
// KODI MARKETS FX - Main JavaScript
// Premium Trading Platform Functionality
// ============================================

// ============================================
// LOADING SCREEN
// ============================================

window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 2500);
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================

const updateScrollProgress = () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;
    
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
};

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// NAVIGATION BAR SCROLL EFFECT
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
// HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

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

if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMATED COUNTERS
// ============================================

const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCount, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCount();
    });
};

// Trigger counters when performance section comes into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'performance') {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const performanceSection = document.getElementById('performance');
if (performanceSection) {
    observer.observe(performanceSection);
}

// ============================================
// PARTICLE ANIMATION CANVAS
// ============================================

const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
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
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animateParticles);
    };
    
    animateParticles();
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Save to localStorage
        localStorage.setItem('contactForm', JSON.stringify(data));
        
        alert('Thank you! Your message has been sent. We will respond shortly.');
        contactForm.reset();
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = entry.target.getAttribute('data-animation');
        }
    });
}, { threshold: 0.1 });

const animatedElements = document.querySelectorAll('[data-animation]');
animatedElements.forEach(element => {
    animationObserver.observe(element);
});

// ============================================
// LOGO VALIDATION & OPTIMIZATION
// ============================================

const validateLogos = () => {
    const logos = document.querySelectorAll('img[alt*="KODI MARKETS FX"]');
    const loadedLogos = [];
    const failedLogos = [];
    
    logos.forEach(logo => {
        logo.addEventListener('load', () => {
            loadedLogos.push({
                location: logo.className,
                src: logo.src,
                status: 'loaded'
            });
            console.log(`✅ Logo loaded: ${logo.className}`);
        });
        
        logo.addEventListener('error', () => {
            failedLogos.push({
                location: logo.className,
                src: logo.src,
                status: 'failed'
            });
            console.error(`❌ Logo failed to load: ${logo.className}`);
        });
    });
};

validateLogos();

// ============================================
// PERFORMANCE MONITORING
// ============================================

const supportsWebGL = () => {
    try {
        const canvas = document.createElement('canvas');
        return !!canvas.getContext('webgl') || !!canvas.getContext('experimental-webgl');
    } catch (e) {
        return false;
    }
};

const supportsLocalStorage = () => {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
    } catch (e) {
        return false;
    }
};

// Log browser capabilities
console.log('Browser Capabilities:', {
    webGL: supportsWebGL(),
    localStorage: supportsLocalStorage(),
    userAgent: navigator.userAgent
});

// ============================================
// SOCIAL MEDIA LINKS
// ============================================

const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.href === '#') {
            e.preventDefault();
            console.log('Social link:', link.textContent);
        }
    });
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('KODI MARKETS FX - Website Loaded Successfully');
console.log('Logo Integration: Active');
console.log('Branding Effects: Enabled');
