/* ============================================
   MithunERP - JavaScript Functionality
   (moved to assets/js)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
    initializeScrollEffects();
    initializeSmoothScroll();
});

/* ============================================
   Navigation Toggle for Mobile
   ============================================ */

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ============================================
   Contact Form Handling
   ============================================ */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            subject: this.querySelectorAll('input[type="text"]')[1].value,
            message: this.querySelector('textarea').value
        };

        // Validate form
        if (!validateForm(data)) {
            showNotification('Please fill all fields correctly.', 'error');
            return;
        }

        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();

        // Here you would normally send the data to a server
        // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    });
}

/* ============================================
   Form Validation
   ============================================ */

function validateForm(data) {
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        return false;
    }

    // Validate subject
    if (!data.subject || data.subject.trim().length < 3) {
        return false;
    }

    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        return false;
    }

    return true;
}

/* ============================================
   Notification System
   ============================================ */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease-in-out;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* ============================================
   Scroll Effects
   ============================================ */

function initializeScrollEffects() {
    // Add animation class when sections come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-in-out';
        observer.observe(section);
    });
}

/* ============================================
   Smooth Scroll Enhancement
   ============================================ */

function initializeSmoothScroll() {
    // Additional smooth scroll handling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;

            // Adjust scroll position to account for sticky navbar
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   Chatbot Integration Point
   ============================================ */

// Placeholder for future chatbot integration
function initializeChatbot() {
    // This function will be called when chatbot is ready to integrate
    // Example structure for chatbot initialization:
    /*
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer) {
        // Initialize your chatbot library here
        // Example: new YourChatbotLibrary({ container: chatbotContainer });
    }
    */
    console.log('Chatbot container is ready for integration');
}

/* ============================================
   Animations
   ============================================ */

// Add animations to stylesheet dynamically if needed
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);

/* ============================================
   Utility Functions
   ============================================ */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll and resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ============================================
   Active Section Highlighting in Navigation
   ============================================ */

function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const scrollHandler = throttle(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').slice(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', scrollHandler);
}

// Initialize active section highlighting when document is ready
document.addEventListener('DOMContentLoaded', highlightActiveSection);

/* ============================================
   Service Worker Registration (Optional)
   ============================================ */

// Uncomment to enable service worker for offline support
/*
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed: ', err);
    });
}
*/

/* ============================================
   Performance Monitoring (Optional)
   ============================================ */

// Log performance metrics to console
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

console.log('%cMithunERP Website', 'color: #2d5016; font-size: 16px; font-weight: bold;');
console.log('Professional ERP Solutions and Customized Software');

