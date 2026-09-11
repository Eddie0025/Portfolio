// Interactive logic for Florence Portfolio Replica

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom cursor follower
  const cursor = document.querySelector('.cursor-dot');
  if (cursor) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }

  // 2. Navigation scroll & dark-mode observer
  const nav = document.querySelector('.site-nav');
  const darkSections = document.querySelectorAll('.intro-section, .featured-work-section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Check if nav is over a dark section
    const navRect = nav.getBoundingClientRect();
    let isOverDark = false;

    darkSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navRect.bottom && rect.bottom >= navRect.top) {
        isOverDark = true;
      }
    });

    if (isOverDark) {
      nav.classList.add('dark-active');
      if (cursor) cursor.classList.add('dark-mode');
    } else {
      nav.classList.remove('dark-active');
      if (cursor) cursor.classList.remove('dark-mode');
    }
  });

  // 3. Interactive Services switcher ("What I Do")
  const serviceItems = document.querySelectorAll('.service-item');
  const serviceTitle = document.getElementById('service-detail-title');
  const serviceDesc = document.getElementById('service-detail-desc');
  const serviceImg = document.getElementById('service-detail-img');

  const servicesData = {
    web: {
      tag: 'Web Design',
      desc: 'Transforming ideas into fully functional websites using best web design practices.',
      img: 'assets/service_preview.jpg'
    },
    pm: {
      tag: 'Product Management',
      desc: 'Leading cross-functional teams from ideation to launch, optimizing metrics and user impact.',
      img: 'assets/bio_speaking.jpg'
    }
  };

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      serviceItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const key = item.getAttribute('data-service');
      const data = servicesData[key];
      if (data) {
        serviceTitle.textContent = data.tag;
        serviceDesc.textContent = data.desc;
        serviceImg.src = data.img;
      }
    });
  });

  // 4. Modal Overlays (About, Work, Contact, Project Case Studies)
  const overlays = {
    about: document.getElementById('overlay-about'),
    work: document.getElementById('overlay-work'),
    contact: document.getElementById('overlay-contact'),
    casestudy: document.getElementById('overlay-casestudy')
  };

  function openOverlay(id) {
    Object.values(overlays).forEach(ov => ov && ov.classList.remove('active'));
    if (overlays[id]) {
      overlays[id].classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeAllOverlays() {
    Object.values(overlays).forEach(ov => ov && ov.classList.remove('active'));
    document.body.style.overflow = '';
  }

  // Close buttons
  document.querySelectorAll('.overlay-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllOverlays);
  });

  // Escape key closes overlay
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });

  // Nav link clicks
  document.querySelectorAll('[data-open-overlay]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-open-overlay');
      if (target === 'home') {
        closeAllOverlays();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        openOverlay(target);
      }
    });
  });

  // Project cards trigger case study overlay
  const caseStudies = {
    good: {
      title: 'Good',
      subtitle: 'A Curated E-Commerce Platform for Exceptional Products',
      role: 'Founding Product Manager',
      timeline: '2025 • Ongoing',
      img: 'assets/project_good.png',
      overview: 'As the founding Product Manager at Good, I led the product vision and execution for a new kind of e-commerce platform, one designed to elevate everyday life by connecting customers with exceptional products from Nigeria\'s top independent creators. From launching curated discovery experiences to managing offline-to-online shopping flows, I worked cross-functionally with design, engineering, operations, and marketing to bring Good from 0 to live.'
    },
    okien: {
      title: 'Shop Okien',
      subtitle: 'Modern E-Commerce Experience for Ready-to-Wear Fashion',
      role: 'E-Commerce & Web Development',
      timeline: '2025 • Shipped',
      img: 'assets/project_okien.png',
      overview: 'Built a high-performance fashion shopping storefront focusing on conversion optimization, fluid mobile shopping, and visual brand identity. Seamlessly integrated cart workflows, inventory management, and fast-checkout experiences.'
    },
    devfest: {
      title: 'DevFest Lagos 2025',
      subtitle: 'One of the Largest Developer Gatherings in Sub-Saharan Africa',
      role: 'Product Lead / Organizer',
      timeline: '2025 • Completed',
      img: 'assets/project_devfest.png',
      overview: 'Led the digital experience and attendee platform for DevFest Lagos, coordinating schedule discovery, speaker logistics, and community engagement for over 3,000 attendees.'
    },
    tope: {
      title: 'Official Tope Alabi',
      subtitle: 'Official Artist Portfolio and Music Discovery Platform',
      role: 'Web Development & UI Design',
      timeline: '2024 • Shipped',
      img: 'assets/project_tope.png',
      overview: 'Engineered an immersive media website featuring discography streaming links, concert tour scheduling, press kit distribution, and mobile-first responsiveness.'
    }
  };

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const pKey = card.getAttribute('data-project');
      const cs = caseStudies[pKey];
      if (cs) {
        document.getElementById('cs-title').textContent = cs.title;
        document.getElementById('cs-subtitle').textContent = cs.subtitle;
        document.getElementById('cs-role').textContent = cs.role;
        document.getElementById('cs-timeline').textContent = cs.timeline;
        document.getElementById('cs-img').src = cs.img;
        document.getElementById('cs-overview').textContent = cs.overview;
        openOverlay('casestudy');
      }
    });
  });

  // Copy email feature
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = 'adityavir0025@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied to Clipboard! ✓</span>';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }
});
