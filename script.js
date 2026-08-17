/**
 * Portfolio Dynamic Script & Interactions
 * Driven by PORTFOLIO_DATA from data.js
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────────────────────────────
     Custom Interactive Cursor Animation (Lerp Spring Motion)
     ───────────────────────────────────────────────────────────── */
  const cursorDot = document.getElementById('cursorDot');
  const cursorCircle = document.getElementById('cursorCircle');

  if (cursorDot && cursorCircle && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      // Smooth lerp lag for outer spring circle
      circleX += (mouseX - circleX) * 0.18;
      circleY += (mouseY - circleY) * 0.18;
      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const addHoverEffect = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, .btn, .filter-btn, .ticker-item, .feature-card, .project-card, .timeline-card, .social-circle, .brand-logo');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
      });
    };

    addHoverEffect();

    // Re-bind hover effect on dynamically rendered elements
    const observer = new MutationObserver(() => addHoverEffect());
    observer.observe(document.body, { childList: true, subtree: true });
  }
  /* ─────────────────────────────────────────────────────────────
     VFX Particle Canvas & Preloader Logic
     ───────────────────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const vfxPercent = document.getElementById('vfxPercent');
  const canvas = document.getElementById('preloaderCanvas');

  if (canvas && preloader) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // VFX Particle System
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2.5 + 1,
        color: Math.random() > 0.3 ? '#e8394a' : '#ffffff',
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    let animationId;
    function renderVfx() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232, 57, 74, ${0.25 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render & update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      animationId = requestAnimationFrame(renderVfx);
    }

    renderVfx();

    // Progress counter
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 18) + 12;

      if (currentProgress >= 100) {
        currentProgress = 100;
        if (preloaderProgress) preloaderProgress.style.width = '100%';
        if (vfxPercent) vfxPercent.textContent = '100%';
        clearInterval(progressInterval);

        setTimeout(() => {
          preloader.classList.add('fade-out');
          setTimeout(() => {
            cancelAnimationFrame(animationId);
            preloader.style.display = 'none';
          }, 850);
        }, 350);
      } else {
        if (preloaderProgress) preloaderProgress.style.width = `${currentProgress}%`;
        if (vfxPercent) vfxPercent.textContent = `${currentProgress}%`;
      }
    }, 90);
  }

  // Check if PORTFOLIO_DATA exists
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.error('PORTFOLIO_DATA not loaded!');
    return;
  }

  const { personal, stats, skills, categorizedSkills, services, experience, education, projects, achievements, testimonials } = PORTFOLIO_DATA;

  /* ─────────────────────────────────────────────────────────────
     1. Populate Personal Info & Hero Section
     ───────────────────────────────────────────────────────────── */
  if (document.getElementById('personalName')) document.getElementById('personalName').textContent = personal.name;
  if (document.getElementById('heroRole')) document.getElementById('heroRole').textContent = personal.role;
  if (document.getElementById('heroTagline')) document.getElementById('heroTagline').textContent = personal.tagline;
  if (document.getElementById('aboutBio')) document.getElementById('aboutBio').textContent = personal.bio;
  if (document.getElementById('resumeBtn')) document.getElementById('resumeBtn').href = personal.resume;
  if (document.getElementById('heroAvatar')) document.getElementById('heroAvatar').src = personal.avatar;

  // Phone & Email contact details
  const contactPhone = document.getElementById('contactPhone');
  if (contactPhone) contactPhone.textContent = personal.phone;
  const contactEmail = document.getElementById('contactEmail');
  if (contactEmail) {
    contactEmail.textContent = personal.email;
    contactEmail.href = `mailto:${personal.email}`;
  }

  /* ─────────────────────────────────────────────────────────────
     2. Populate Categorized Technical Skills
     ───────────────────────────────────────────────────────────── */
  const categorizedSkillsGrid = document.getElementById('categorizedSkillsGrid');
  if (categorizedSkillsGrid && categorizedSkills) {
    const categoryIcons = {
      "Development": "💻",
      "Testing": "🧪",
      "Data & AI": "📊",
      "Cloud & Tools": "☁️",
      "Databases": "🗄️"
    };

    categorizedSkillsGrid.innerHTML = Object.entries(categorizedSkills).map(([categoryName, skillList]) => `
      <div class="achievement-card" style="background: rgba(24, 27, 34, 0.6); border-color: rgba(255,255,255,0.08);">
        <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${categoryIcons[categoryName] || '🚀'}</div>
        <h3 style="font-family: var(--font-display); font-size: 1.15rem; color: var(--text-white); margin-bottom: 1rem; font-weight: 700;">${categoryName}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${skillList.map(skill => `
            <span class="tag-badge" style="font-size: 0.8rem; padding: 0.25rem 0.7rem; background: rgba(232, 57, 74, 0.12); color: #fff; border-color: rgba(232, 57, 74, 0.25);">${skill}</span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     2. Populate Tech Stack Marquee (Duplicated for infinite scroll)
     ───────────────────────────────────────────────────────────── */
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    // Duplicate array to ensure seamless infinite looping
    const fullSkills = [...skills, ...skills];
    tickerTrack.innerHTML = fullSkills.map(skill => `
      <div class="ticker-item">
        <span style="color: var(--accent-red); font-size: 1rem;">⚡</span>
        <span>${skill}</span>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     3. Populate Features / What I Do Cards
     ───────────────────────────────────────────────────────────── */
  const featuresGrid = document.getElementById('featuresGrid');
  if (featuresGrid) {
    featuresGrid.innerHTML = services.map(service => `
      <div class="feature-card ${service.featured ? 'featured' : ''}">
        <div class="feature-icon">${service.icon}</div>
        <h3 class="feature-title">${service.title}</h3>
        <p class="feature-desc">${service.description}</p>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     4. Populate Professional Experience & Education Timeline
     ───────────────────────────────────────────────────────────── */
  const experienceGrid = document.getElementById('experienceGrid');
  if (experienceGrid && experience) {
    experienceGrid.innerHTML = experience.map(exp => `
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">${exp.company}</div>
          </div>
          <span class="timeline-period">${exp.period}</span>
        </div>
        <p class="timeline-desc">${exp.description}</p>
      </div>
    `).join('');
  }

  const educationGrid = document.getElementById('educationGrid');
  if (educationGrid && education) {
    educationGrid.innerHTML = education.map(edu => `
      <div class="timeline-card" style="border-left-color: #60a5fa;">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${edu.degree}</h3>
            <div class="timeline-company" style="color: #60a5fa;">${edu.institution}</div>
          </div>
          <span class="timeline-period">${edu.period}</span>
        </div>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     5. Populate Achievements & Certifications
     ───────────────────────────────────────────────────────────── */
  const achievementsGrid = document.getElementById('achievementsGrid');
  if (achievementsGrid && achievements) {
    achievementsGrid.innerHTML = achievements.map(ach => `
      <div class="achievement-card">
        <div class="achievement-badge">🏆</div>
        <h3 class="achievement-title">${ach.title}</h3>
        <div class="achievement-issuer">${ach.issuer}</div>
        <p class="achievement-desc">${ach.description}</p>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     4. Populate About Highlights & Stats
     ───────────────────────────────────────────────────────────── */
  const aboutHighlightsContainer = document.getElementById('aboutHighlights');
  if (aboutHighlightsContainer && typeof aboutHighlights !== 'undefined' && Array.isArray(aboutHighlights)) {
    aboutHighlightsContainer.innerHTML = aboutHighlights.map(item => `
      <div class="highlight-item">
        <div class="highlight-icon">${item.icon}</div>
        <div class="highlight-text">
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid && stats) {
    statsGrid.innerHTML = stats.map(stat => `
      <div class="stat-box">
        <div class="stat-number" data-count="${stat.number}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     6. Populate Projects & Records Section (Achievement Card Style)
     ───────────────────────────────────────────────────────────── */
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid && projects) {
    const getProjectIcon = (category) => {
      const cat = category || '';
      if (cat.includes('IoT')) return '⚡';
      if (cat.includes('Analytics')) return '📊';
      if (cat.includes('AI')) return '🤖';
      return '💻';
    };

    projectsGrid.innerHTML = projects.map(p => `
      <div class="achievement-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
          <div class="achievement-badge" style="font-size: 1.6rem; margin-bottom: 0;">${getProjectIcon(p.category)}</div>
          ${p.period ? `<span style="font-size: 0.78rem; color: var(--accent-red); font-weight: 700; background: rgba(232, 57, 74, 0.12); padding: 0.2rem 0.6rem; border-radius: 12px; border: 1px solid rgba(232, 57, 74, 0.25);">📅 ${p.period}</span>` : ''}
        </div>

        <h3 class="achievement-title" style="margin-bottom: 0.3rem;">${p.title}</h3>
        <div class="achievement-issuer" style="margin-bottom: 0.8rem;">${p.category}</div>
        
        <p class="achievement-desc" style="margin-bottom: 1rem; font-size: 0.9rem; line-height: 1.55;">${p.description}</p>
        
        <div class="project-tags" style="margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${p.tags.map(t => `<span class="tag-badge" style="font-size: 0.75rem; padding: 0.15rem 0.5rem;">${t}</span>`).join('')}
        </div>

        ${p.snippet ? `<div class="project-preview" style="font-size: 0.78rem; margin-bottom: 1rem;">${p.snippet}</div>` : ''}

        <div class="project-actions" style="margin-top: auto; display: flex; gap: 0.6rem;">
          <a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="flex: 1; text-align: center; font-size: 0.8rem; padding: 0.4rem 0.6rem;">View Github</a>
          <a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="flex: 1; text-align: center; font-size: 0.8rem; padding: 0.4rem 0.6rem;">View Project ↗</a>
        </div>
      </div>
    `).join('');
  }

  /* ─────────────────────────────────────────────────────────────
     6. Testimonials Slider
     ───────────────────────────────────────────────────────────── */
  let currentTestimonial = 0;
  const testimonialContainer = document.getElementById('testimonialContainer');

  function renderTestimonial(index) {
    if (!testimonialContainer || !testimonials[index]) return;
    const t = testimonials[index];
    testimonialContainer.innerHTML = `
      <div class="rating-stars">${'★'.repeat(t.rating)}</div>
      <p class="quote-text">"${t.quote}"</p>
      <div class="client-name">${t.name}</div>
      <div class="client-role">${t.role}</div>
    `;
  }

  renderTestimonial(0);

  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      renderTestimonial(currentTestimonial);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     7. Contact Form Handler
     ───────────────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.style.display = 'block';
      status.style.color = '#4ade80';
      status.textContent = 'Thank you! Your message has been sent successfully.';
      contactForm.reset();
      setTimeout(() => { status.style.display = 'none'; }, 4000);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     8. Navbar Scroll Effect & Active Highlight
     ───────────────────────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────
     9. Mobile Menu Toggle
     ───────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     10. Animated Counter Numbers
     ───────────────────────────────────────────────────────────── */
  function animateCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    counterElements.forEach(el => {
      const target = +el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = Math.ceil(target / 40);
      const update = () => {
        count += speed;
        if (count >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = count + suffix;
          setTimeout(update, 30);
        }
      };
      update();
    });
  }

  // Trigger counters when scrolled into view
  let counted = false;
  window.addEventListener('scroll', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection && !counted) {
      const top = aboutSection.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        animateCounters();
        counted = true;
      }
    }
  });
});
