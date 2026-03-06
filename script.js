const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const yearNode = document.getElementById('year');
const navLinks = [...document.querySelectorAll('.site-nav a')];
const searchForms = [...document.querySelectorAll('.header-search')];
const revealItems = [...document.querySelectorAll('.reveal')];
const tiltCards = [...document.querySelectorAll('[data-tilt]')];

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach((link) => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
  }
});

const searchRoutes = [
  { page: 'skills.html', terms: ['skill', 'skills', 'tech', 'technology', 'java', 'react', 'aws', 'docker', 'cloud'] },
  { page: 'projects.html', terms: ['project', 'projects', 'iot', 'dashboard', 'power bi', 'covid', 'attrition'] },
  { page: 'experience.html', terms: ['experience', 'internship', 'internships', 'certification', 'certifications', 'leadership'] },
  { page: 'contact.html', terms: ['contact', 'email', 'phone', 'linkedin', 'github', 'fiverr', 'hire'] },
  { page: 'index.html', terms: ['home', 'about', 'profile', 'resume'] }
];

searchForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = form.querySelector('input[name="q"]');
    if (!input) {
      return;
    }

    const query = input.value.trim().toLowerCase();
    if (!query) {
      window.location.href = 'index.html';
      return;
    }

    const matched = searchRoutes.find((route) =>
      route.terms.some((term) => query.includes(term))
    );

    window.location.href = matched ? matched.page : 'index.html';
  });
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('in'));
}

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 6;
    const ry = (x - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});
