// Basic interactivity: theme toggle, mobile nav, smooth scroll, modal, contact form validation
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const yearEl = document.getElementById('year');
  const projectCards = document.querySelectorAll('.project-card');
  const modal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Theme: persist using localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.documentElement.classList.add('light');

  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    const isLight = document.documentElement.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '🌞' : '🌙';
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      nav.style.display = 'flex';
      nav.style.flexDirection = 'column';
    } else {
      nav.style.display = '';
    }
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // close mobile nav if open
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          nav.style.display = '';
        }
      }
    });
  });

  // Project modal
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.dataset.img || '';
      const title = card.dataset.title || '';
      const desc = card.dataset.desc || '';
      modalImg.src = img;
      modalImg.alt = title;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalClose.addEventListener('click', () => {
    modal.setAttribute('aria-hidden', 'true');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
  });

  // Simple form handling (no backend). Replace with email API or Google Forms integration.
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill in all required fields.';
      formMsg.style.color = '#ff8080';
      return;
    }
    // Simple email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      formMsg.textContent = 'Please enter a valid email.';
      formMsg.style.color = '#ff8080';
      return;
    }

    // Simulate success (replace with real submit to API)
    formMsg.textContent = 'Thanks! Your message has been recorded locally — integrate with a backend to send it.';
    formMsg.style.color = '';
    contactForm.reset();
  });
});
