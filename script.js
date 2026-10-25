/**
 * managenius Society — Team Member Portfolio
 * Interactive Scripts, Custom Cursor, Dynamic Name Color-Shift, and Golden Accents
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PRELOADER (GOLDEN)
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const counterEl = document.getElementById('preloader-counter');
  const barEl = document.getElementById('preloader-bar');
  const statusEl = document.getElementById('preloader-status');

  let loadProgress = 0;
  const statusMessages = [
    'INITIALIZING SYSTEMS...',
    'CONNECTING MANAGENIUS...',
    'CONFIGURING GOLD & WHITE THEME...',
    'PREPARING SHOWCASE...',
    'WELCOME TO MANAGENIUS'
  ];

  const preloaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 8) + 4;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(preloaderInterval);

      if (counterEl) counterEl.textContent = '100%';
      if (barEl) barEl.style.width = '100%';
      if (statusEl) statusEl.textContent = 'PORTFOLIO READY';

      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = '0';
          preloader.style.visibility = 'hidden';
          setTimeout(() => preloader.remove(), 600);
        }
      }, 400);
    } else {
      if (counterEl) counterEl.textContent = `${loadProgress}%`;
      if (barEl) barEl.style.width = `${loadProgress}%`;
      
      const msgIndex = Math.floor((loadProgress / 100) * (statusMessages.length - 1));
      if (statusEl) statusEl.textContent = statusMessages[msgIndex];
    }
  }, 40);

  /* ==========================================================================
     2. DYNAMIC COLOR-CHANGING NAME (CORE REQUIREMENT)
     Whenever the cursor hovers or moves over the name, the color dynamically changes!
     Featuring luminous 24K gold, rose gold, solar champagne, and royal spectrum hues.
     ========================================================================== */
  const interactiveName = document.getElementById('interactive-name');

  const goldenPalettes = [
    { primary: '#D4AF37', secondary: '#F5D061', glow: 'rgba(212, 175, 55, 0.45)', name: 'Imperial 24K Gold' },
    { primary: '#E5A65E', secondary: '#FBD38D', glow: 'rgba(229, 166, 94, 0.45)', name: 'Sunburst Amber' },
    { primary: '#E0A96D', secondary: '#F3B0C3', glow: 'rgba(224, 169, 109, 0.45)', name: 'Royal Rose Gold' },
    { primary: '#D4AF37', secondary: '#FFF0A5', glow: 'rgba(255, 240, 165, 0.5)', name: 'Champagne Shimmer' },
    { primary: '#B8860B', secondary: '#F59E0B', glow: 'rgba(184, 134, 11, 0.45)', name: 'Deep Bronze Gold' },
    { primary: '#E6CA65', secondary: '#8C6D1F', glow: 'rgba(230, 202, 101, 0.45)', name: 'Gilded Crown' }
  ];

  let currentColorIndex = 0;

  if (interactiveName) {
    const firstSpan = interactiveName.querySelector('.name-first');
    const lastSpan = interactiveName.querySelector('.name-last');

    // Trigger color cycle on cursor entering the name
    interactiveName.addEventListener('mouseenter', () => {
      currentColorIndex = (currentColorIndex + 1) % goldenPalettes.length;
      applyDynamicColor(goldenPalettes[currentColorIndex]);
    });

    // Dynamic gradient angle & shimmer shift as cursor moves over the name
    interactiveName.addEventListener('mousemove', (e) => {
      const rect = interactiveName.getBoundingClientRect();
      const xPercent = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const angle = Math.round((e.clientX / window.innerWidth) * 360);

      const activePalette = goldenPalettes[currentColorIndex];

      if (firstSpan && lastSpan) {
        const gradientCss = `linear-gradient(${angle}deg, ${activePalette.primary} ${xPercent - 25}%, ${activePalette.secondary} ${xPercent + 35}%)`;
        firstSpan.style.background = gradientCss;
        firstSpan.style.webkitBackgroundClip = 'text';
        firstSpan.style.webkitTextFillColor = 'transparent';
        
        lastSpan.style.background = gradientCss;
        lastSpan.style.webkitBackgroundClip = 'text';
        lastSpan.style.webkitTextFillColor = 'transparent';

        // Radiant golden text shadow
        interactiveName.style.filter = `drop-shadow(0 10px 22px ${activePalette.glow})`;
      }
    });

    // Reset smoothly on cursor leave
    interactiveName.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (firstSpan && lastSpan) {
          firstSpan.style.background = '';
          firstSpan.style.webkitBackgroundClip = '';
          firstSpan.style.webkitTextFillColor = '';
          firstSpan.style.color = '#0F172A';

          lastSpan.style.background = '';
          lastSpan.style.webkitBackgroundClip = '';
          lastSpan.style.webkitTextFillColor = '';
          lastSpan.style.color = '#0F172A';

          interactiveName.style.filter = 'none';
        }
      }, 700);
    });

    function applyDynamicColor(palette) {
      if (!firstSpan || !lastSpan) return;
      
      const gradient = `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})`;
      firstSpan.style.background = gradient;
      firstSpan.style.webkitBackgroundClip = 'text';
      firstSpan.style.webkitTextFillColor = 'transparent';

      lastSpan.style.background = gradient;
      lastSpan.style.webkitBackgroundClip = 'text';
      lastSpan.style.webkitTextFillColor = 'transparent';

      interactiveName.style.filter = `drop-shadow(0 12px 26px ${palette.glow})`;
    }
  }

  /* ==========================================================================
     3. CUSTOM FLUID CURSOR (LIGHT THEME WITH GOLD ACCENT)
     ========================================================================== */
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let cursorActive = false;

  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (!isTouchDevice && cursor && ring) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursorActive) {
        cursorActive = true;
        ringX = mouseX;
        ringY = mouseY;
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
      }

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    // Smooth trailing ring physics
    function animateCursorRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      requestAnimationFrame(animateCursorRing);
    }
    requestAnimationFrame(animateCursorRing);

    // Click ripple effect
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-click-ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 550);
    });

    // Hover expansion over interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .hero-name, .about-card, .pillar-card, .social-card, .photo-card-wrapper, .role-item, .stat-pill'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  } else {
    if (cursor) cursor.style.display = 'none';
    if (ring) ring.style.display = 'none';
  }

  /* ==========================================================================
     4. SCROLL PROGRESS BAR & NAVBAR SHADOW
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('nav-scrolled');
      } else {
        navbar.classList.remove('nav-scrolled');
      }
    }

    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     5. 3D CARD PERSPECTIVE TILT
     ========================================================================== */
  const tiltCards = document.querySelectorAll('.about-card, .society-hero-card, .social-card, .pillar-card, .photo-card-wrapper');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ==========================================================================
     6. FADE-UP INTERSECTION OBSERVER
     ========================================================================== */
  const fadeUpElements = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  fadeUpElements.forEach((el) => fadeObserver.observe(el));

});
