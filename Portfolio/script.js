document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // 1. LIGHT/DARK THEME SWITCHING SYSTEM
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (currentTheme === 'dark') {
            newTheme = 'light';
            themeIcon.className = 'ri-sun-line';
        } else {
            newTheme = 'dark';
            themeIcon.className = 'ri-moon-line';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // Load saved client theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'light' ? 'ri-sun-line' : 'ri-moon-line';
    }

    // MOBILE NAVIGATION TOGGLE
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuToggle.querySelector('i').className = navLinksContainer.classList.contains('active') ? 'ri-close-line' : 'ri-menu-line';
        });
    }

    // CONTACT FORM WHATSAPP SENDING
    const portfolioForm = document.getElementById('portfolio-form');
    if (portfolioForm) {
        portfolioForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const phoneNumber = '919503838360';

            const whatsappText = `Hello Tanmay, my name is ${name}. Email: ${email}. Subject: ${subject}. Message: ${message}`;
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;

            window.open(whatsappUrl, '_blank');
        });
    }

    // 2. ACTIVE NAVIGATION LINKS HIGHLIGHT ON SCROLL
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});