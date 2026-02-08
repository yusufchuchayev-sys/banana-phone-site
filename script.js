document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
            }
        });
    }

    // Scroll Animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos="fade-up"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    document.querySelectorAll('[data-aos="fade-right"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    document.querySelectorAll('[data-aos="fade-left"]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.padding = '1rem 5%';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.padding = '1.5rem 5%';
            }
        }
    });

    // --- PARALLAX EFFECT ---
    document.addEventListener('mousemove', (e) => {
        const visual = document.querySelector('.hero-visual');
        if (visual) {
            const x = (window.innerWidth - e.pageX * 5) / 100;
            const y = (window.innerHeight - e.pageY * 5) / 100;
            visual.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }
    });

    // --- MANUAL ROTATION LOGIC 3D ---
    const phone = document.querySelector('.phone-3d');
    const heroVisual = document.querySelector('.hero-visual');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentRotationY = -20; // Initial rotation matches CSS
    let currentRotationX = 10;

    if (phone && heroVisual) {
        // Mouse Events
        heroVisual.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX;
            startY = e.pageY;
            phone.style.cursor = 'grabbing';
            phone.style.transition = 'none'; // Instant follow
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;

            // X axis movement rotates around Y axis
            // Y axis movement rotates around X axis
            const newRotationY = currentRotationY + (deltaX * 0.5);
            const newRotationX = currentRotationX - (deltaY * 0.5); // Invert Y for natural feel

            phone.style.transform = `rotateY(${newRotationY}deg) rotateX(${newRotationX}deg)`;
        });

        window.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            phone.style.cursor = 'grab';
            phone.style.transition = 'transform 0.1s linear';

            const deltaX = e.pageX - startX;
            const deltaY = e.pageY - startY;
            currentRotationY += (deltaX * 0.5);
            currentRotationX -= (deltaY * 0.5);
        });

        // Touch Events
        heroVisual.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            phone.style.transition = 'none';
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault(); // Prevent scrolling while rotating phone
            const deltaX = e.touches[0].pageX - startX;
            const deltaY = e.touches[0].pageY - startY;

            const newRotationY = currentRotationY + (deltaX * 0.5);
            const newRotationX = currentRotationX - (deltaY * 0.5);

            phone.style.transform = `rotateY(${newRotationY}deg) rotateX(${newRotationX}deg)`;
        });

        window.addEventListener('touchend', (e) => {
            if (isDragging) {
                const deltaX = e.changedTouches[0].pageX - startX;
                const deltaY = e.changedTouches[0].pageY - startY;
                currentRotationY += (deltaX * 0.5);
                currentRotationX -= (deltaY * 0.5);
                isDragging = false;
                phone.style.transition = 'transform 0.1s linear';
            }
        });
    }

    // --- COLOR PICKER LOGIC ---
    const colorBtns = document.querySelectorAll('.color-btn');
    const phoneBack = document.querySelector('.face.back');
    const bananaLogo = document.querySelector('.banana-logo-bg');

    if (phoneBack) {
        colorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                colorBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const color = btn.getAttribute('data-color');
                const type = btn.classList.contains('yellow') ? 'yellow' :
                    btn.classList.contains('black') ? 'black' : 'white';

                // Change Back Color
                phoneBack.style.background = color;

                // Update Logo Color for consistency
                if (bananaLogo) {
                    bananaLogo.style.color = color;
                    bananaLogo.style.filter = `drop-shadow(0 0 10px ${color})`;
                }

                // Update Frames (Sides)
                const sides = document.querySelectorAll('.face.right, .face.left, .face.top, .face.bottom');
                if (type === 'yellow') {
                    document.documentElement.style.setProperty('--primary-yellow', '#FFE135');
                    sides.forEach(side => side.style.background = 'linear-gradient(to right, #eebb44, #ccaa33)');
                } else if (type === 'black') {
                    // Dark frames for black phone
                    sides.forEach(side => side.style.background = '#333');
                } else if (type === 'white') {
                    // Silver frames for white phone
                    sides.forEach(side => side.style.background = '#e0e0e0');
                }
            });
        });
    }
});
