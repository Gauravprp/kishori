document.addEventListener('DOMContentLoaded', () => {
    // ---- Mobile Menu Toggle ----
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        mobileMenuBtn.classList.toggle('is-active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('is-active');
            }
        });
    });

    // ---- Sticky Header on Scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            navbar.style.padding = '10px 0'; // slightly sleeker
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            navbar.style.padding = '0'; // reset
        }
    });

    // ---- Budget Calculator Logic ----
    const guestInput = document.getElementById('guests');
    const venueSelect = document.getElementById('venue');
    const cateringInput = document.getElementById('catering');
    const cateringVal = document.getElementById('catering-val');
    const decorInput = document.getElementById('decor');
    const decorVal = document.getElementById('decor-val');
    const photoInput = document.getElementById('photo');
    const photoVal = document.getElementById('photo-val');
    const totalAmount = document.getElementById('total-amount');
    const getPlanBtn = document.getElementById('get-plan-btn');

    // Update range slider values visually
    cateringInput.addEventListener('input', (e) => cateringVal.innerText = `₹${e.target.value}`);
    decorInput.addEventListener('input', (e) => decorVal.innerText = `₹${Number(e.target.value).toLocaleString('en-IN')}`);
    photoInput.addEventListener('input', (e) => photoVal.innerText = `₹${Number(e.target.value).toLocaleString('en-IN')}`);

    function calculateBudget() {
        const guests = parseInt(guestInput.value) || 0;
        const venueType = venueSelect.value;
        const cateringCost = parseInt(cateringInput.value);
        const decorCost = parseInt(decorInput.value);
        const photoCost = parseInt(photoInput.value);

        let venueCost = 0;
        // Basic estimations based on venue type (fixed cost approximation)
        if (venueType === 'banquet') venueCost = 50000;
        if (venueType === 'outdoor') venueCost = 150000;
        if (venueType === 'destination') venueCost = 500000;

        // Total = (Guests * Catering) + Venue + Decor + Photo
        const total = (guests * cateringCost) + venueCost + decorCost + photoCost;

        // Format to Indian Currency
        totalAmount.innerText = `₹${total.toLocaleString('en-IN')}`;
    }

    // Recalculate on any change
    [guestInput, venueSelect, cateringInput, decorInput, photoInput].forEach(el => {
        el.addEventListener('input', calculateBudget);
    });

    // Initial calculation (if default values exist)
    calculateBudget();

    // Scroll to contact form with pre-filled budget range (roughly) on button click
    getPlanBtn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });


    // ---- Smooth Scrolling for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for fixed header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---- Form Submission (Visual Feedback) ----
    const leadForm = document.getElementById('lead-capture-form');
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple success simulation
        const btn = leadForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        
        btn.innerText = 'Request Sent!';
        btn.style.backgroundColor = '#28a745';
        btn.style.borderColor = '#28a745';
        
        setTimeout(() => {
            alert('Thank you! We will contact you shortly to plan your event.');
            leadForm.reset();
            btn.innerText = originalText;
            btn.style.backgroundColor = ''; // revert to CSS default
            btn.style.borderColor = '';
        }, 1000);
    });
    
    // ---- Reveal Animations on Scroll ----
    const revealElements = document.querySelectorAll('.service-card, .section-title, .gallery-item');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

});
