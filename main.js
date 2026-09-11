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
    cerebx: {
      title: 'CerebX',
      subtitle: 'Advanced AI/ML Decision Intelligence Platform',
      role: 'Product Management · AI/ML',
      timeline: '2026',
      img: 'assets/project_good.png',
      overview: 'Led product definition and strategy for CerebX, an AI/ML powered platform designed to optimize decision workflows and complex data processing.'
    },
    nexus: {
      title: 'Nexus',
      subtitle: 'Multi-Agent Intelligence & Coordination Engine',
      role: 'Product Management · AI/ML',
      timeline: '2026',
      img: 'assets/project_okien.png',
      overview: 'Spearheaded product discovery and architecture requirements for Nexus, a sovereign multi-agent coordination system.'
    },
    saber: {
      title: 'SABER',
      subtitle: 'AI Research & Synthetic Data Benchmark Platform',
      role: 'Product Management · AI Research',
      timeline: '2026',
      img: 'assets/project_devfest.png',
      overview: 'Directed product strategy for SABER, translating cutting-edge AI research into scalable model evaluation benchmarks.'
    },
    agrosense: {
      title: 'Agrosense',
      subtitle: 'Smart Agriculture & Sensor Analytics AI Platform',
      role: 'Product Management · AI / Platform',
      timeline: '2026',
      img: 'assets/project_tope.png',
      overview: 'Defined product roadmaps and platform capabilities for Agrosense, combining IoT sensor data with predictive AI modeling.'
    },
    athena: {
      title: 'ATHENA',
      subtitle: 'AI Governance & Compliance Assurance Framework',
      role: 'Product Management · AI Governance',
      timeline: '2026',
      img: 'assets/about_team.jpg',
      overview: 'Built product requirements and governance standards for ATHENA to ensure reliable, audit-ready AI system deployments.'
    },
    redvector: {
      title: 'Red Vector AI',
      subtitle: 'Autonomous Threat Detection & Sovereign Cybersecurity',
      role: 'Product Management · Cybersecurity',
      timeline: '2026',
      img: 'assets/about_white_shirt.jpg',
      overview: 'Managed product development for Red Vector AI, driving automated threat vector analysis and cybersecurity intelligence.'
    },
    sensingbandage: {
      title: 'Wireless Sensing Bandage',
      subtitle: 'Flexible Biomedical Sensing & Real-Time Monitoring System',
      role: 'Product / Research · IoT',
      timeline: '2025/26',
      img: 'assets/about_cap.jpg',
      overview: 'Researched and managed hardware-software integration for a wireless biomedical sensing bandage for non-invasive health tracking.'
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
