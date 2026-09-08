/**
 * Portfolio Dynamic Script & Interactions
 * Driven by PORTFOLIO_DATA from data.js
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ─────────────────────────────────────────────────────────────
     1. Automatic Copyright Year Population
     ───────────────────────────────────────────────────────────── */
  const yearElements = document.querySelectorAll('#year, .current-year');
  yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ─────────────────────────────────────────────────────────────
     2. Custom Interactive Cursor Animation (Lerp Spring Motion)
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
      circleX += (mouseX - circleX) * 0.18;
      circleY += (mouseY - circleY) * 0.18;
      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const addHoverEffect = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, .btn, .filter-btn, .ticker-item, .feature-card, .project-card, .timeline-card, .social-circle, .brand-logo');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
      });
    };

    addHoverEffect();

    const observer = new MutationObserver(() => addHoverEffect());
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────────────────────────
     3. VFX Particle Canvas & Preloader Logic
     ───────────────────────────────────────────────────────────── */
  const preloader = document.getElementById('preloader') || document.querySelector('.preloader, .vfx-preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  const vfxPercent = document.getElementById('vfxPercent');
  const canvas = document.getElementById('preloaderCanvas');

  if (preloader) {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

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
      }, 70);
    } else {
      // Fallback fade-out for non-canvas preloader
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 400);
    }
  }

  /* ─────────────────────────────────────────────────────────────
     4. Dynamic Content Population from PORTFOLIO_DATA (if available)
     ───────────────────────────────────────────────────────────── */
  if (typeof PORTFOLIO_DATA !== 'undefined') {
    const { personal, stats, skills, categorizedSkills, services, experience, education, projects, achievements, testimonials } = PORTFOLIO_DATA;

    // Personal Info & Hero Section
    if (personal) {
      if (document.getElementById('personalName')) document.getElementById('personalName').textContent = personal.name;
      if (document.getElementById('heroRole')) document.getElementById('heroRole').textContent = personal.role;
      if (document.getElementById('heroTagline')) document.getElementById('heroTagline').textContent = personal.tagline;
      if (document.getElementById('aboutBio')) document.getElementById('aboutBio').textContent = personal.bio;
      if (document.getElementById('resumeBtn')) document.getElementById('resumeBtn').href = personal.resume;
      if (document.getElementById('heroAvatar')) document.getElementById('heroAvatar').src = personal.avatar;

      const hiringProfileGrid = document.getElementById('hiringProfileGrid');
      if (hiringProfileGrid && personal.hiringProfile) {
        const profile = personal.hiringProfile;
        hiringProfileGrid.innerHTML = `
          <div class="hiring-profile-card hiring-profile-card-featured">
            <span class="profile-card-label">WHY HIRE ME</span>
            <p>${profile.whyHireMe}</p>
          </div>
          <div class="hiring-profile-card"><span class="profile-card-label">AVAILABILITY</span><strong>${profile.availability}</strong><span>${profile.noticePeriod}</span></div>
          <div class="hiring-profile-card"><span class="profile-card-label">TARGET ROLES</span><div class="profile-tags">${profile.targetRoles.map(role => `<span>${role}</span>`).join('')}</div></div>
          <div class="hiring-profile-card"><span class="profile-card-label">WORK PREFERENCE</span><strong>${profile.workPreference}</strong><span>${profile.graduation}</span></div>
        `;
      }

      const contactPhone = document.getElementById('contactPhone');
      if (contactPhone) contactPhone.textContent = personal.phone;
      const contactEmail = document.getElementById('contactEmail');
      if (contactEmail) {
        contactEmail.textContent = personal.email;
        contactEmail.href = `mailto:${personal.email}`;
      }
    }

    // Categorized Technical Skills
    const categorizedSkillsGrid = document.getElementById('categorizedSkillsGrid');
    if (categorizedSkillsGrid && categorizedSkills) {
      const categoryIcons = {
        "Development": "💻",
        "Testing": "🧪",
        "Hardware & Embedded": "⚙️",
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

    // Tech Stack Marquee
    const tickerTrack = document.getElementById('tickerTrack');
    if (tickerTrack && skills) {
      const fullSkills = [...skills, ...skills];
      tickerTrack.innerHTML = fullSkills.map(skill => `
        <div class="ticker-item">
          <span style="color: var(--accent-red); font-size: 1rem;">⚡</span>
          <span>${skill}</span>
        </div>
      `).join('');
    }

    // Features / Services
    const featuresGrid = document.getElementById('featuresGrid');
    if (featuresGrid && services) {
      featuresGrid.innerHTML = services.map(service => `
        <div class="feature-card ${service.featured ? 'featured' : ''}">
          <div class="feature-icon">${service.icon}</div>
          <h3 class="feature-title">${service.title}</h3>
          <p class="feature-desc">${service.description}</p>
        </div>
      `).join('');
    }

    // Experience Timeline
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
          ${exp.tools ? `<div class="timeline-meta"><strong>Tools:</strong> ${exp.tools}</div>` : ''}
          ${exp.impact ? `<div class="timeline-meta"><strong>Contribution:</strong> ${exp.impact}</div>` : ''}
        </div>
      `).join('');
    }

    // Education Timeline
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

    // Achievements
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (achievementsGrid && achievements) {
      achievementsGrid.innerHTML = achievements.map(ach => `
        <article class="achievement-card">
          <div class="achievement-card-top">
            <div class="achievement-badge" aria-hidden="true">🏆</div>
            ${ach.date ? `<time class="achievement-date">${ach.date}</time>` : ''}
          </div>
          <h3 class="achievement-title">${ach.title}</h3>
          <div class="achievement-issuer">${ach.issuer}</div>
          ${ach.eventName || ach.organizer ? `<div class="achievement-context">${ach.eventName ? `<span>${ach.eventName}</span>` : ''}${ach.organizer ? `<span>${ach.organizer}</span>` : ''}</div>` : ''}
          <p class="achievement-desc">${ach.description}</p>
          <div class="achievement-actions">
            ${ach.evidenceUrl ? `<a class="achievement-action" href="${ach.evidenceUrl}" target="_blank" rel="noopener noreferrer">View evidence <span>↗</span></a>` : ''}
            ${ach.certificateUrl ? `<a class="achievement-action" href="${ach.certificateUrl}" target="_blank" rel="noopener noreferrer">View certificate <span>↗</span></a>` : ''}
            ${ach.proceedingsUrl ? `<a class="achievement-action" href="${ach.proceedingsUrl}" target="_blank" rel="noopener noreferrer">View proceedings <span>↗</span></a>` : ''}
          </div>
          ${!ach.evidenceUrl && !ach.certificateUrl && !ach.proceedingsUrl && ach.evidenceLabel ? `<span class="achievement-proof-note">${ach.evidenceLabel}</span>` : ''}
        </article>
      `).join('');
    }

    // Stats Grid
    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid && stats) {
      statsGrid.innerHTML = stats.map(stat => `
        <div class="stat-box">
          <div class="stat-number" data-count="${stat.number}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    }

    // Projects Grid
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
            ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="flex: 1; text-align: center; font-size: 0.8rem; padding: 0.4rem 0.6rem;">View Github</a>` : '<span class="link-pending">Repository link pending</span>'}
          </div>
        </div>
      `).join('');
    }

    // Full project case studies
    const caseStudiesGrid = document.getElementById('caseStudiesGrid');
    if (caseStudiesGrid && projects) {
      caseStudiesGrid.innerHTML = projects.map(project => `
        <article class="case-study-card">
          <div class="case-study-header">
            <div>
              <span class="case-study-category">${project.category}</span>
              <h3>${project.title}</h3>
            </div>
            <span class="case-study-period">${project.period}</span>
          </div>
          <div class="case-study-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
          <div class="case-study-grid">
            <div><span>Problem & users</span><p>${project.problem} ${project.users}</p></div>
            <div><span>Architecture / workflow</span><p>${project.workflow}</p></div>
            <div><span>Technologies used</span><p>${project.technologies || project.tags.join(', ')}</p></div>
            <div><span>My role & contribution</span><p>${project.role}. ${project.contribution}</p></div>
            <div><span>Result</span><p>${project.result}</p></div>
          </div>
          <div class="case-study-links">
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">GitHub repository ↗</a>` : '<span class="link-pending">GitHub repository pending</span>'}
            ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer">Live demo ↗</a>` : '<span class="link-pending">Live demo not available</span>'}
            ${project.documentationUrl ? `<a href="${project.documentationUrl}" target="_blank" rel="noopener noreferrer">Documentation ↗</a>` : '<span class="link-pending">Documentation link pending</span>'}
            ${project.image ? `<a href="${project.image}" target="_blank" rel="noopener noreferrer">Screenshots ↗</a>` : '<span class="link-pending">Screenshots pending</span>'}
          </div>
        </article>
      `).join('');
    }

    const responseTime = document.getElementById('contactResponseTime');
    if (responseTime && personal.hiringProfile) responseTime.textContent = personal.hiringProfile.responseTime;

    // Testimonials Slider
    if (testimonials && testimonials.length > 0) {
      let currentTestimonial = 0;
      const testimonialContainer = document.getElementById('testimonialContainer');

      function renderTestimonial(index) {
        if (!testimonialContainer || !testimonials[index]) return;
        const t = testimonials[index];
        testimonialContainer.innerHTML = `
          <div class="testimonial-card-topline">
            <span class="testimonial-kicker">${t.label || 'VERIFIED FEEDBACK'}</span>
            <span class="testimonial-count">${String(index + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}</span>
          </div>
          <div class="testimonial-quote-mark" aria-hidden="true">“</div>
          <div class="rating-row"><div class="rating-stars" aria-label="${t.rating} out of 5 stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div><span>${t.rating}.0 / 5.0</span></div>
          <blockquote class="quote-text">${t.quote}</blockquote>
          <div class="testimonial-attribution">
            <div class="client-avatar" aria-hidden="true">${t.name.charAt(0)}</div>
            <div><div class="client-name">${t.name}</div><div class="client-role">${t.role}</div></div>
          </div>
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
    }
  }

  /* ─────────────────────────────────────────────────────────────
     5. Contact Form Handler (Supports all form IDs & classes)
     ───────────────────────────────────────────────────────────── */
  const contactForms = document.querySelectorAll('#contactForm, .contact-form');
  contactForms.forEach(contactForm => {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const status = contactForm.querySelector('#formStatus, .form-status') || document.getElementById('formStatus');
      const nameInput = contactForm.querySelector('#name, [name="name"]');
      const emailInput = contactForm.querySelector('#email, [name="email"]');
      const phoneInput = contactForm.querySelector('#phone, [name="phone"]');
      const serviceInput = contactForm.querySelector('#service, [name="service"]');
      const subjectInput = contactForm.querySelector('#subject, [name="subject"]');
      const messageInput = contactForm.querySelector('#message, [name="message"]');

      if (!nameInput || !emailInput || !messageInput) return;

      const payload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput ? phoneInput.value.trim() : '',
        service: serviceInput ? serviceInput.value.trim() : '',
        subject: serviceInput && serviceInput.value
          ? `Project Enquiry for Shri Pathi G — ${serviceInput.value}`
          : (subjectInput ? subjectInput.value.trim() : 'Project Enquiry for Shri Pathi G'),
        message: messageInput.value.trim()
      };

      if (!payload.name || !payload.email || !payload.message) {
        if (status) {
          status.style.display = 'block';
          status.style.color = '#fbbf24';
          status.textContent = 'Please fill in your name, email, and message.';
        }
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email)) {
        if (status) {
          status.style.display = 'block';
          status.style.color = '#fbbf24';
          status.textContent = 'Please enter a valid email address.';
        }
        return;
      }

      if (status) {
        status.style.display = 'block';
        status.style.color = '#f3f4f6';
        status.textContent = 'Sending your message...';
      }

      let sentSuccessfully = false;

      // 1. Try local Node backend API
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            sentSuccessfully = true;
          }
        }
      } catch (err) {
        console.log('Backend API request skipped or offline');
      }

      // 2. Direct real email delivery via Web3Forms API to shrisekar3@gmail.com
      try {
        const w3Res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: 'ee50058b-0e40-4b35-8ea5-d912e56e0771', // Instant delivery key to shrisekar3@gmail.com
            name: payload.name,
            email: payload.email,
            phone: payload.phone || 'Not provided',
            service: payload.service || 'General Inquiry',
            subject: `Project Enquiry for Shri Pathi G — ${payload.service || 'General Collaboration'}`,
            message: [
              'Hello Shri Pathi,', '',
              `${payload.name} has submitted a new project enquiry through your portfolio.`, '',
              'CONTACT DETAILS', `Name: ${payload.name}`, `Email: ${payload.email}`,
              `WhatsApp: ${payload.phone || 'Not provided'}`,
              `Service requested: ${payload.service || 'General enquiry'}`, '',
              'MESSAGE', payload.message, '',
              'Please reply directly to this email to continue the conversation.', '',
              '— Shri Pathi G Portfolio Contact System'
            ].join('\n')
          })
        });

        const w3Data = await w3Res.json();
        if (w3Res.ok && w3Data.success) {
          sentSuccessfully = true;
        }
      } catch (err) {
        console.log('Web3Forms email delivery attempt finished');
      }

      if (sentSuccessfully) {
        if (status) {
          status.style.color = '#4ade80';
          status.textContent = '🚀 Thank you! Your message has been sent directly to Shri Pathi.';
        }
        contactForm.reset();
      } else {
        // Fallback: Mailto link if all APIs fail
        const mailtoUrl = `mailto:shrisekar3@gmail.com?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(`Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\nService: ${payload.service}\n\nMessage:\n${payload.message}`)}`;
        window.location.href = mailtoUrl;

        if (status) {
          status.style.color = '#4ade80';
          status.textContent = 'Opening your mail application to complete delivery...';
        }
        contactForm.reset();
      }

      if (status) {
        setTimeout(() => {
          status.style.display = 'none';
        }, 7000);
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────
     6. Navbar Scroll Effect & Active Highlight
     ───────────────────────────────────────────────────────────── */
  const navbar = document.querySelector('.navbar, .site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .site-nav a');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
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
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.classList.remove('active');
        if (href === `#${current}`) {
          link.classList.add('active');
        }
      }
    });
  });

  /* ─────────────────────────────────────────────────────────────
     7. Mobile Menu Toggle with Visual Icon Feedback (☰ / ✕)
     ───────────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('navToggle') || document.querySelector('.nav-toggle, .menu-toggle');
  const navMenu = document.getElementById('navMenu') || document.querySelector('.nav-menu, .site-nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.textContent = isOpen ? '✕' : '☰';
    });

    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────
     8. Animated Counter Numbers
     ───────────────────────────────────────────────────────────── */
  function animateCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    counterElements.forEach(el => {
      const target = +el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;
      let count = 0;
      const speed = Math.ceil(target / 40) || 1;
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

  /* ─────────────────────────────────────────────────────────────
     INTERVIEW APPOINTMENT MODAL
     ───────────────────────────────────────────────────────────── */
  (function initInterviewModal() {
    const backdrop   = document.getElementById('interviewModalBackdrop');
    const form       = document.getElementById('interviewForm');
    const statusBox  = document.getElementById('imStatus');
    const submitBtn  = document.getElementById('imSubmitBtn');
    const openBtns   = document.querySelectorAll('[data-open-interview], #openInterviewModal, .openInterviewBtn');
    const closeBtn   = document.getElementById('closeInterviewModal');
    const cancelBtn  = document.getElementById('cancelInterviewModal');
    const dateInput  = document.getElementById('imDate');
    const modeInput  = document.getElementById('imMode');
    const linkInput  = document.getElementById('imLink');
    const linkLabel  = document.querySelector('label[for="imLink"]');
    const linkField  = linkInput?.closest('.im-field');

    if (!backdrop || !form) return;

    // Set min date to today
    if (dateInput) {
      const today = new Date();
      // Interviews must be booked for a future calendar day.
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const pad = (value) => String(value).padStart(2, '0');
      dateInput.min = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
    }

    let previousBodyOverflow = '';

    function openModal() {
      backdrop.style.display = 'flex';
      // Force reflow so transition triggers
      backdrop.offsetHeight;
      backdrop.classList.add('im-open');
      backdrop.setAttribute('aria-hidden', 'false');
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      backdrop.scrollTop = 0;
      const modalCard = backdrop.querySelector('.im-card');
      if (modalCard) modalCard.scrollTop = 0;
      hideStatus();
      closeBtn?.focus();
    }

    function closeModal() {
      backdrop.classList.remove('im-open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = previousBodyOverflow;
      setTimeout(() => { backdrop.style.display = 'none'; }, 340);
    }

    function showStatus(msg, type) {
      if (!statusBox) return;
      statusBox.textContent = msg;
      statusBox.className = 'im-status ' + type;
      statusBox.style.display = 'block';
    }

    function hideStatus() {
      if (statusBox) { statusBox.style.display = 'none'; statusBox.textContent = ''; }
    }

    function syncMeetingLinkRequirement() {
      const mode = modeInput?.value || 'Google Meet';
      const online = ['Google Meet', 'Zoom', 'Microsoft Teams'].includes(mode);
      const inPerson = mode === 'In Person';
      const visible = online || inPerson;
      const required = online || inPerson;
      if (linkField) {
        linkField.hidden = !visible;
        linkField.style.display = visible ? '' : 'none';
      }
      if (linkInput) {
        linkInput.required = required;
        linkInput.type = online ? 'url' : 'text';
        linkInput.placeholder = online ? 'https://meet.google.com/xxx-xxxx-xxx' : 'Enter the interview venue';
        if (!visible) linkInput.value = '';
      }
      if (linkLabel) linkLabel.innerHTML = `${online ? 'MEETING LINK' : 'VENUE'} <span class="im-req">*</span>`;
    }
    modeInput?.addEventListener('change', syncMeetingLinkRequirement);
    syncMeetingLinkRequirement();

    function meetingLinkError(data) {
      const onlineModes = ['Google Meet', 'Zoom', 'Microsoft Teams'];
      if (data.mode === 'Phone Call') return '';
      if (data.mode === 'In Person' && !data.meetingLink) return 'In-person interviews require a venue.';
      if (!onlineModes.includes(data.mode)) return '';
      if (onlineModes.includes(data.mode) && !data.meetingLink) {
        return `${data.mode} interviews require a meeting link.`;
      }
      try {
        const url = new URL(data.meetingLink);
        if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) {
          return 'Enter a complete meeting link beginning with https://.';
        }
      } catch (_) {
        return 'Enter a valid meeting link beginning with https://.';
      }
      return '';
    }

    // Build Google Calendar URL
    function buildCalendarUrl(data) {
      const dur      = parseInt(data.duration, 10) || 60;
      const startDate = new Date(`${data.date}T${data.time}:00`);
      const endDate = new Date(startDate.getTime() + dur * 60 * 1000);
      const calendarDate = (value) => {
        const pad = (number) => String(number).padStart(2, '0');
        return `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}T${pad(value.getHours())}${pad(value.getMinutes())}00`;
      };
      const start = calendarDate(startDate);
      const end = calendarDate(endDate);

      const title   = encodeURIComponent(`Interview with Shri Pathi G — ${data.role} @ ${data.company}`);
      const details = encodeURIComponent(
        `Interviewer: Shri Pathi G\nMode: ${data.mode}\n${data.meetingLink ? (data.mode === 'In Person' ? 'Venue: ' : 'Meeting link: ') + data.meetingLink : ''}\n${data.notes ? '\nNotes: ' + data.notes : ''}`
      );
      const loc = encodeURIComponent(data.meetingLink || data.mode || '');

      // Add Shri Pathi as a Calendar attendee so Google sends an invitation
      // when the employer saves the event.
      const attendee = encodeURIComponent('shrisekar3@gmail.com');
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${loc}&add=${attendee}`;
    }

    // Send email notification to portfolio owner
    async function sendEmailNotification(data) {
      // Local server delivery (works when the portfolio is run with `npm run dev`).
      try {
        const res = await fetch('/api/interview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.delivery === 'email-sent') return true;
      } catch (e) {
        console.warn('Local interview email endpoint is unavailable:', e.message);
      }

      // Static hosts such as Netlify do not run server.js. Web3Forms sends the
      // appointment to the email account associated with this access key.
      try {
        const message = [
          'SCHEDULED INTERVIEW FOR SHRI PATHI G',
          '',
          `Hello Shri Pathi, ${data.name} from ${data.company} has requested an interview.`, '',
          'APPOINTMENT DETAILS',
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Company: ${data.company}`,
          `Role: ${data.role}`,
          `Date: ${data.date}`,
          `Time: ${data.time}`,
          `Duration: ${data.duration} minutes`,
          `Interview mode: ${data.mode}`,
          `${data.mode === 'In Person' ? 'Venue' : 'Meeting link'}: ${data.meetingLink || 'Not provided'}`,
          '',
          `Notes: ${data.notes || 'None'}`, '',
          'Please review the details and reply directly to the employer if any changes are needed.', '',
          '— Shri Pathi G Interview Scheduling System'
        ].join('\n');

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: 'ee50058b-0e40-4b35-8ea5-d912e56e0771',
            name: data.name,
            email: data.email,
            replyto: data.email,
            subject: `Scheduled Interview for Shri Pathi G — ${data.role} at ${data.company}`,
            message
          })
        });
        const result = await response.json();
        return response.ok && result.success === true;
      } catch (e) {
        console.warn('Web3Forms interview email failed:', e.message);
        return false;
      }
    }

    // Form submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = {
        name:        document.getElementById('imName')?.value.trim()    || '',
        email:       document.getElementById('imEmail')?.value.trim()   || '',
        company:     document.getElementById('imCompany')?.value.trim() || '',
        role:        document.getElementById('imRole')?.value           || '',
        date:        document.getElementById('imDate')?.value           || '',
        time:        document.getElementById('imTime')?.value           || '',
        duration:    document.getElementById('imDuration')?.value       || '60',
        mode:        document.getElementById('imMode')?.value           || 'Google Meet',
        meetingLink: document.getElementById('imLink')?.value.trim()    || '',
        notes:       document.getElementById('imNotes')?.value.trim()   || ''
      };

      // Validate required
      if (!data.name || !data.email || !data.company || !data.role || !data.date || !data.time) {
        showStatus('⚠ Please fill in all required fields.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        showStatus('⚠ Please enter a valid email address.', 'error');
        return;
      }

      const appointmentTime = new Date(`${data.date}T${data.time}:00`);
      if (Number.isNaN(appointmentTime.getTime()) || appointmentTime <= new Date()) {
        showStatus('⚠ Choose a future date and time for the interview.', 'error');
        return;
      }

      const linkError = meetingLinkError(data);
      if (linkError) {
        showStatus(`⚠ ${linkError}`, 'error');
        document.getElementById('imLink')?.focus();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Opening Calendar…';

      // Open Google Calendar
      const calUrl = buildCalendarUrl(data);
      window.open(calUrl, '_blank');

      // Send email in background
      showStatus('✓ Calendar opened! Sending email notification…', 'success');
      const emailSent = await sendEmailNotification(data);

      if (emailSent) {
        showStatus('✅ Done! Calendar opened and email sent to Shri Pathi G.', 'success');
      } else {
        showStatus('⚠ Calendar opened, but the email could not be delivered. Please try again.', 'error');
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Confirm &amp; Open Calendar';

      // Auto-close after 3s
      setTimeout(() => {
        closeModal();
        form.reset();
        hideStatus();
      }, 3200);
    });

    // Wire buttons
    openBtns.forEach((button) => button.addEventListener('click', openModal));
    if (closeBtn)  closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('im-open')) closeModal();
    });
  })();

});

