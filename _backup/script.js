/* ═══════════════════════════════════════════════
   PORTFOLIO — ADVANCED VFX & INTERACTION ENGINE
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── DOM References ────────────────────────────
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const yearNode = document.getElementById('year');
  const navLinks = [...document.querySelectorAll('.site-nav a')];
  const header = document.querySelector('.site-header');

  // ── Preloader ─────────────────────────────────
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
      }, 3000);
    });
  }

  // ── Year ──────────────────────────────────────
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  // ── Mobile Menu ───────────────────────────────
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Active Nav Link ───────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── Header Scroll Effect ──────────────────────
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 60);
      lastScroll = y;
    }, { passive: true });
  }

  // ── Scroll Reveal ─────────────────────────────
  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealItems.forEach(el => revealObs.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add('in'));
  }

  // ── Animated Counters ─────────────────────────
  const counters = [...document.querySelectorAll('[data-count]')];
  if (counters.length && 'IntersectionObserver' in window) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObs.observe(el));
  }

  function animateCounter(el) {
    const target = el.getAttribute('data-count');
    const suffix = el.getAttribute('data-suffix') || '';
    const isNum = /^\d+$/.test(target);
    if (!isNum) {
      el.textContent = target;
      return;
    }
    const end = parseInt(target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Skill Progress Bars ───────────────────────
  const progressBars = [...document.querySelectorAll('.skill-progress-bar')];
  if (progressBars.length && 'IntersectionObserver' in window) {
    const barObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.getAttribute('data-width') + '%';
          bar.classList.add('animated');
          barObs.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });
    progressBars.forEach(bar => barObs.observe(bar));
  }

  // ── Typed Text Effect ─────────────────────────
  const typedEl = document.querySelector('[data-typed]');
  if (typedEl) {
    const text = typedEl.getAttribute('data-typed');
    typedEl.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    typedEl.parentNode.insertBefore(cursor, typedEl.nextSibling);
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        typedEl.textContent += text[i];
        i++;
        setTimeout(typeChar, 40 + Math.random() * 30);
      }
    }
    // Start after a small delay
    setTimeout(typeChar, 800);
  }

  // ── 3D Card Tilt ──────────────────────────────
  const tiltCards = [...document.querySelectorAll('[data-tilt]')];
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * 10;
      const ry = (x - 0.5) * 10;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ── Particle System ───────────────────────────
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    const PARTICLE_COUNT = Math.min(80, Math.floor(window.innerWidth / 18));
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 200;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.02;
            this.vx += dx * force;
            this.vy += dy * force;
          }
        }

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      drawConnections();
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ── Custom Cursor Glow ────────────────────────
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let cx = 0, cy = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', e => {
      tx = e.clientX;
      ty = e.clientY;
    });

    function updateCursor() {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      cursorGlow.style.left = cx + 'px';
      cursorGlow.style.top = cy + 'px';
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Magnetic hover on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .card, .project-card, .skill-card, .timeline-item, .contact-method');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursorGlow.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hovering'));
    });
  }

  // ── Page Transitions ──────────────────────────
  const transitionOverlay = document.querySelector('.page-transition');
  if (transitionOverlay) {
    // Fade in on load
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });

    // Fade out on navigating to internal pages
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('mailto')) {
          e.preventDefault();
          transitionOverlay.classList.add('active');
          setTimeout(() => { window.location.href = href; }, 400);
        }
      });
    });
  }

  // ── Parallax on Hero Elements ─────────────────
  const heroSection = document.querySelector('.hero');
  if (heroSection && window.matchMedia('(min-width: 769px)').matches) {
    const heroCopy = heroSection.querySelector('.hero-copy');
    const heroPanel = heroSection.querySelector('.hero-panel');

    window.addEventListener('mousemove', e => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;

      if (heroCopy) {
        heroCopy.style.transform = `translate(${mx * 8}px, ${my * 5}px)`;
      }
      if (heroPanel) {
        heroPanel.style.transform = `translate(${mx * -5}px, ${my * -3}px)`;
      }
    });
  }

})();
