// Interactive logic for Portfolio — Adityavir

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
  const pageRevealEls = document.querySelectorAll('.scroll-content-wrapper .scroll-reveal, .scroll-content-wrapper .scroll-reveal-stagger');

  function checkPageReveals() {
    const windowH = window.innerHeight;
    pageRevealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowH - 60 && rect.bottom > 20) {
        el.classList.add('revealed');
      }
    });
  }

  // Initial check on load
  setTimeout(checkPageReveals, 100);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    const navRect = nav.getBoundingClientRect();
    let isOverDark = false;
    darkSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navRect.bottom && rect.bottom >= navRect.top) isOverDark = true;
    });
    if (isOverDark) {
      nav.classList.add('dark-active');
      if (cursor) cursor.classList.add('dark-mode');
    } else {
      nav.classList.remove('dark-active');
      if (cursor) cursor.classList.remove('dark-mode');
    }

    checkPageReveals();
  }, { passive: true });

  // 3. Interactive "What I Do" Service Switcher
  const serviceItems = document.querySelectorAll('.service-item');
  const serviceDetailTitle = document.getElementById('service-detail-title');
  const serviceDetailDesc = document.getElementById('service-detail-desc');
  const serviceDetailImg = document.getElementById('service-detail-img');

  const servicesData = {
    pm: {
      tag: 'Product Management',
      desc: 'Turning complex problems into clear products through strategy, planning, and execution.',
      img: 'assets/service_purple_art.jpg'
    },
    aiml: {
      tag: 'AI / ML',
      desc: 'Building products around AI and machine learning to solve complex real-world problems.',
      img: 'assets/service_preview.jpg'
    },
    tech: {
      tag: 'Technical Products',
      desc: 'Bridging product goals and technical systems to turn ideas into practical solutions.',
      img: 'assets/service_3d_sphere.jpg'
    }
  };

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      serviceItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const key = item.getAttribute('data-service');
      const data = servicesData[key];
      if (data) {
        if (serviceDetailTitle) serviceDetailTitle.textContent = data.tag;
        if (serviceDetailDesc) serviceDetailDesc.textContent = data.desc;
        if (serviceDetailImg) {
          serviceDetailImg.style.opacity = '0';
          setTimeout(() => {
            serviceDetailImg.src = data.img;
            serviceDetailImg.alt = data.tag;
            serviceDetailImg.style.opacity = '1';
          }, 150);
        }
      }
    });
  });

  // 4. Modal Overlays
  const overlays = {
    about: document.getElementById('overlay-about'),
    work: document.getElementById('overlay-work'),
    contact: document.getElementById('overlay-contact'),
    skills: document.getElementById('overlay-skills'),
    casestudy: document.getElementById('overlay-casestudy')
  };

  function setupOverlayScrollObserver(overlayEl) {
    if (!overlayEl) return;
    const revealEls = overlayEl.querySelectorAll('.scroll-reveal, .scroll-reveal-stagger');
    
    // Check elements immediately and on scroll
    function checkVisibility() {
      const parentRect = overlayEl.getBoundingClientRect();
      revealEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < parentRect.bottom - 40 && rect.bottom > parentRect.top) {
          el.classList.add('revealed');
        }
      });
    }

    // Reset scroll & trigger initial
    overlayEl.scrollTop = 0;
    setTimeout(() => {
      checkVisibility();
    }, 100);

    overlayEl.addEventListener('scroll', checkVisibility, { passive: true });
  }

  function openOverlay(id) {
    Object.values(overlays).forEach(ov => ov && ov.classList.remove('active'));
    if (overlays[id]) {
      overlays[id].classList.add('active');
      document.body.style.overflow = 'hidden';
      setupOverlayScrollObserver(overlays[id]);
    }
  }

  function closeAllOverlays() {
    Object.values(overlays).forEach(ov => {
      if (ov) {
        ov.classList.remove('active');
        ov.querySelectorAll('.revealed').forEach(el => el.classList.remove('revealed'));
      }
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.overlay-close-btn').forEach(btn => {
    btn.addEventListener('click', closeAllOverlays);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
  });

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

  // Open skills overlay when clicking on any animated skill ticker item
  document.querySelectorAll('.skill-item').forEach(skillEl => {
    skillEl.addEventListener('click', () => {
      openOverlay('skills');
    });
  });

  // ─────────────────────────────────────────────────────────────
  // PROJECT CASE STUDY DATA
  // ─────────────────────────────────────────────────────────────

  const caseStudies = {
    cerebx: {
      title: 'CerebX',
      subtitle: 'Sovereign Multi-Agent Cybersecurity Platform',
      role: 'Founder & Product Lead',
      timeline: '2026',
      domain: 'AI / Cybersecurity / Multi-Agent Systems',
      number: '01',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>CerebX</strong> is a sovereign multi-agent cybersecurity platform designed for high-security environments where data sovereignty, reliability, and operation without external connectivity are critical.</p>
            <p class="cs-prose">As Founder and Product Lead, I owned the product definition and delivery planning across requirements gathering, scope definition, system workflows, technical and compliance requirements, and roadmap development.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Founder & Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI/ML · Cybersecurity · Multi-Agent Systems</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Deployment Scope</div>
                <div class="cs-card-desc">Sovereign, air-gapped, and mission-critical enterprise environments</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Modern cybersecurity environments generate large volumes of security information that require continuous analysis, correlation, and response. For high-security organizations, the challenge extends beyond detection and response: security systems must operate within environments where external connectivity may be restricted or completely unavailable.</p>
            <p class="cs-prose">CerebX was conceived to address this problem through a sovereign, multi-agent architecture capable of operating in air-gapped and high-security environments while maintaining resilient operation through multiple levels of failover.</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build a sovereign AI cybersecurity platform that can coordinate specialized AI agents to support security operations without requiring dependence on external infrastructure or connectivity.</p>
            <p class="cs-prose">The product is designed around three core principles:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Sovereignty</div>
                <div class="cs-card-desc">Security data and AI processing remain strictly within the customer's controlled, private environment.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Reliability</div>
                <div class="cs-card-desc">The system is designed with multiple levels of failover so that individual component or agent failures do not compromise the overall system.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Controlled Intelligence</div>
                <div class="cs-card-desc">AI-driven security operations remain observable, verifiable, and subject to appropriate human oversight.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">As Founder and Product Lead, I was responsible for:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Translating an ambiguous cybersecurity opportunity into a defined product direction</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Gathering and documenting product and technical requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining product scope and priorities</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating technical and compliance requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Designing product workflows</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the delivery plan</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining milestones and dependencies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Developing the feature roadmap</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating work across research, engineering, and design</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Tracking risks and resolving delivery blockers</span></li>
            </ul>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <p class="cs-prose">The product requirements were shaped by the operating environment rather than simply by the desired feature set.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Sovereign deployment</div>
                <div class="cs-card-desc">The platform must support environments where external cloud connectivity cannot be relied upon.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Air-gapped operation</div>
                <div class="cs-card-desc">Core functionality must remain viable within completely isolated, offline networks.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Hierarchical intelligence</div>
                <div class="cs-card-desc">Multiple specialized agents need to operate within a structured hierarchy rather than functioning as independent, disconnected components.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Fault tolerance</div>
                <div class="cs-card-desc">The system requires multiple levels of failover to maintain operational resilience under failure conditions.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Security and compliance</div>
                <div class="cs-card-desc">Security and compliance requirements must be incorporated into product definition rather than treated as post-development additions.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Human oversight</div>
                <div class="cs-card-desc">AI-driven decisions need robust mechanisms for verification, traceability, and human involvement.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <p class="cs-prose">CerebX uses a hierarchical multi-agent model designed around specialized responsibilities and multiple levels of resilience.</p>
            <div class="cs-flow-container">
              <div class="cs-flow-node">Security Environment</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">CerebX</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Hierarchical Agent System</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Specialized Security Agents</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Analysis & Reasoning</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Verification / Decision</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Security Action</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Fallback / Recovery</div>
            </div>
            <p class="cs-prose">The architecture was defined with multi-tier failover as a core product requirement, allowing the system to remain resilient when individual components or agents fail.</p>
          `
        },
        {
          id: 'planning',
          title: 'Product Planning',
          htmlContent: `
            <p class="cs-prose">I translated the product requirements into a structured delivery plan covering:</p>
            <div class="cs-flow-container" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px;">
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Problem Definition</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Requirements</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">System & Workflow</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Architecture</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Prototype</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Evaluation</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">MVP</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Deployment</span>
            </div>
            <p class="cs-prose">The roadmap was organized around dependencies between technical, product, and compliance workstreams rather than treating features as isolated development tasks.</p>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Sovereignty over cloud dependency</div>
              <div class="cs-decision-meta"><strong>Constraint:</strong> Target customers may operate in air-gapped or highly restricted environments.</div>
              <div class="cs-decision-meta"><strong>Product implication:</strong> The product cannot depend on external connectivity as a fundamental requirement.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Design CerebX around sovereign deployment requirements from the beginning rather than adapting a cloud-first product later.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Hierarchical agents over independent agents</div>
              <div class="cs-decision-meta"><strong>Problem:</strong> A complex cybersecurity platform requires different types of analysis and expertise.</div>
              <div class="cs-decision-meta"><strong>Product implication:</strong> A collection of independent agents would make coordination and control more difficult.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Use a hierarchical multi-agent model in which specialized agents operate within a structured system.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Failover as a product requirement</div>
              <div class="cs-decision-meta"><strong>Problem:</strong> Failure of a single AI component should not result in failure of the overall security workflow.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Make multi-tier failover part of the product architecture and requirements rather than treating reliability as an engineering optimization.</div>
            </div>
          `
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Product Definition</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Problem and customer environment definition</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Requirements gathering</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Product scope</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Technical and compliance requirements</li>
                </ul>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — System Definition</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Multi-agent hierarchy</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Product workflows</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Failover architecture</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Deployment requirements</li>
                </ul>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Prototype</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Core platform</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Agent coordination</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Initial workflows</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Resilience mechanisms</li>
                </ul>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Evaluation</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>System reliability</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Agent performance</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Workflow validation</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Security and compliance validation</li>
                </ul>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — MVP</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Integrated platform</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Production-oriented workflows</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Operational monitoring</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Enterprise deployment readiness</li>
                </ul>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 6 — Expansion</span>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Additional security capabilities</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Broader agent specialization</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Advanced enterprise functionality</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & Success Criteria',
          htmlContent: `
            <p class="cs-prose">CerebX is evaluated across four product dimensions:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">AI Performance</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Task success</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Detection quality</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Reasoning quality</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>False-positive / false-negative performance</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Reliability</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Agent failure rate</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Recovery success</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>System availability</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Failover effectiveness</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Security</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Vulnerability detection</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Security-event coverage</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Auditability</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Compliance coverage</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Product Value</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Analyst intervention reduction</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Investigation time reduction</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Time to actionable insight</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Operational efficiency</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">The product required coordination across research, engineering, and design, with dependencies between system architecture, AI capabilities, compliance requirements, and deployment constraints.</p>
            <p class="cs-prose">I managed the work by:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Breaking the product into defined workstreams</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Sequencing dependent activities</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Establishing milestones</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Tracking progress</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Identifying risks</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Resolving blockers</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Maintaining alignment between technical and product requirements</span></li>
            </ul>
          `
        }
      ]
    },

    nexus: {
      title: 'Nexus',
      subtitle: 'Custom AI Models Trained on Client Data',
      role: 'Product Lead',
      timeline: '2026',
      domain: 'AI/ML · Enterprise AI',
      number: '02',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>Nexus</strong> is an AI platform designed to help organizations develop and deploy custom AI models trained on their own data.</p>
            <p class="cs-prose">The product spans the complete model lifecycle—from data ingestion and preparation through training, fine-tuning, evaluation, and deployment—while supporting different enterprise deployment environments, including cloud, on-premise, and air-gapped infrastructure.</p>
            <p class="cs-prose">As Product Lead, I owned the product scope and sequencing across the different workstreams, translating environment-specific requirements into a structured end-to-end delivery plan.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI/ML · Enterprise AI</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Environments</div>
                <div class="cs-card-desc">Cloud, On-Premise, and Air-Gapped Infrastructure</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Organizations increasingly want AI systems that understand and work with their proprietary data, but deploying customized models introduces challenges that don't exist with off-the-shelf AI products.</p>
            <p class="cs-prose">The product needs to account for the complete lifecycle:</p>
            <div class="cs-flow-container" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px;">
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Data</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Training</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Fine-tuning</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Evaluation</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Deployment</span>
            </div>
            <p class="cs-prose">while also adapting to fundamentally different infrastructure environments. A model deployment that works in the cloud cannot simply be assumed to work the same way in an on-premise or air-gapped environment.</p>
            <p class="cs-prose">Nexus was designed around this problem: how can organizations build and deploy customized AI models while retaining control over their data and deployment environment?</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build a flexible enterprise AI platform that enables organizations to train, customize, evaluate, and deploy AI models using their own data, without forcing every customer into a single infrastructure model.</p>
            <p class="cs-prose">The product is structured around three core principles:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Data Ownership</div>
                <div class="cs-card-desc">Customer data remains strictly within the organization's controlled environment.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Deployment Flexibility</div>
                <div class="cs-card-desc">The product natively supports cloud, on-premise, and air-gapped deployment requirements.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">End-to-End Model Lifecycle</div>
                <div class="cs-card-desc">Training, fine-tuning, evaluation, and deployment are treated as one connected product workflow rather than isolated capabilities.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">As Product Lead, I was responsible for:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining product scope</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Gathering and translating requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the end-to-end product workflow</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Sequencing work across data, training, fine-tuning, evaluation, and deployment</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Accounting for environment-specific requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Aligning milestones across multiple workstreams</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Managing dependencies between product and technical requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Developing the delivery roadmap</span></li>
            </ul>
          `
        },
        {
          id: 'workflow',
          title: 'Product Workflow',
          htmlContent: `
            <p class="cs-prose">Nexus follows an end-to-end AI development lifecycle:</p>
            <div class="cs-flow-container">
              <div class="cs-flow-node">Client Data</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Data Ingestion</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Data Preparation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Model Training</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Fine-Tuning</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Model Evaluation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Deployment</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Monitoring & Iteration</div>
            </div>
            <p class="cs-prose">This workflow provides a common product structure while allowing individual stages to adapt to the customer's infrastructure and security requirements.</p>
          `
        },
        {
          id: 'deployment',
          title: 'Deployment Strategy',
          htmlContent: `
            <p class="cs-prose">One of the central product challenges was supporting multiple deployment environments:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Cloud</div>
                <div class="cs-card-desc">Designed for organizations that can use managed infrastructure and external connectivity.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">On-Premise</div>
                <div class="cs-card-desc">Designed for organizations that require their AI workloads and data to remain within their own private infrastructure.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Air-Gapped</div>
                <div class="cs-card-desc">Designed for highly restricted environments where external connectivity is unavailable or strictly prohibited.</div>
              </div>
            </div>
            <p class="cs-prose">The product therefore needed to distinguish between core capabilities that should remain consistent across environments and requirements that must change based on the deployment context.</p>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Data</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Secure data ingestion</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Customer-controlled datasets</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Data preparation & transformation</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Data processing workflows</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Model Development</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Model training</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Fine-tuning</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Model configuration</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Standardized evaluation</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Deployment</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Cloud deployment</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>On-premise deployment</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Air-gapped deployment</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Environment-specific configuration</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Enterprise Requirements</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Data security & encryption</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Infrastructure compatibility</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Deployment reliability</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Environment isolation & control</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <p class="cs-prose">At the product level, Nexus is structured around a connected model lifecycle rather than treating model development and deployment as separate products.</p>
            <div class="cs-flow-container">
              <div class="cs-flow-node"><strong>Data Layer:</strong> Customer datasets and ingestion</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node"><strong>Model Development Layer:</strong> Training and fine-tuning</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node"><strong>Evaluation Layer:</strong> Model performance and validation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node"><strong>Deployment Layer:</strong> Cloud / On-Premise / Air-Gapped</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node"><strong>Operational Layer:</strong> Monitoring and iteration</div>
            </div>
            <p class="cs-prose">This structure allows the product roadmap to evolve each layer independently while preserving the end-to-end workflow.</p>
          `
        },
        {
          id: 'prioritization',
          title: 'Prioritization',
          htmlContent: `
            <p class="cs-prose">The product roadmap was prioritized around the dependencies between the stages of the AI lifecycle.</p>
            <p class="cs-prose">The core sequence was: <strong>Data Infrastructure → Training → Fine-Tuning → Evaluation → Deployment</strong></p>
            <p class="cs-prose">Capabilities that depended on earlier stages were sequenced accordingly rather than developed as isolated features. Deployment requirements were also treated differently depending on the target environment.</p>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. One lifecycle, multiple deployment environments</div>
              <div class="cs-decision-meta"><strong>Challenge:</strong> Cloud, on-premise, and air-gapped customers have different infrastructure constraints.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Maintain a common product lifecycle while defining environment-specific deployment requirements.</div>
              <div class="cs-decision-meta"><strong>Rationale:</strong> This preserves a consistent product experience without pretending that every deployment environment has identical technical requirements.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Evaluation as a dedicated lifecycle stage</div>
              <div class="cs-decision-meta"><strong>Challenge:</strong> A trained model is not automatically a production-ready model.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Treat evaluation as a dedicated stage between model development and deployment.</div>
              <div class="cs-decision-meta"><strong>Rationale:</strong> Models need to be rigorously validated before being introduced into customer environments.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Environment requirements influence product scope upstream</div>
              <div class="cs-decision-meta"><strong>Challenge:</strong> Deployment constraints can affect upstream product decisions.</div>
              <div class="cs-decision-meta"><strong>Decision:</strong> Consider deployment requirements during product planning rather than only at the final deployment stage.</div>
              <div class="cs-decision-meta"><strong>Rationale:</strong> Infrastructure constraints directly influence data handling, training workflows, model packaging, and operational requirements.</div>
            </div>
          `
        },
        {
          id: 'roadmap',
          title: 'Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Data</span>
                <p class="cs-card-desc">Data ingestion and preparation infrastructure.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — Model Development</span>
                <p class="cs-card-desc">Training and fine-tuning workflows.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Evaluation</span>
                <p class="cs-card-desc">Model validation and performance evaluation.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Deployment</span>
                <p class="cs-card-desc">Environment-specific deployment capabilities.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — Enterprise Operations</span>
                <p class="cs-card-desc">Monitoring, iteration, and broader enterprise capabilities.</p>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & KPIs',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Model Performance</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Model accuracy</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Task performance</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Evaluation score</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Fine-tuning improvement</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Development Efficiency</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Training time</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Fine-tuning time</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Time from dataset to evaluated model</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Deployment</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Deployment success rate</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Deployment time</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Environment compatibility</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Deployment reliability</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Product & Adoption</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Customer adoption</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Active models</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Model iteration frequency</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Time-to-production</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">The project required coordination across multiple connected workstreams spanning data ingestion, model training, fine-tuning, evaluation, and deployment.</p>
            <p class="cs-prose">I managed the sequencing of these workstreams while accounting for dependencies between the different deployment environments. The product plan was structured so that technical work could progress toward clearly defined milestones rather than treating the project as one large development effort.</p>
          `
        },
        {
          id: 'outcome',
          title: 'Outcome',
          htmlContent: `
            <p class="cs-prose">Nexus established an end-to-end product framework for custom AI model development and deployment, with the product strategy accounting for cloud, on-premise, and air-gapped environments from the outset.</p>
            <p class="cs-prose">The resulting product definition connected the complete AI lifecycle with the infrastructure requirements needed to deliver it in different enterprise environments.</p>
          `
        }
      ]
    },

    saber: {
      title: 'SABER',
      subtitle: 'Specialist Agent Based Expert Reasoning',
      role: 'Product Lead',
      timeline: '2026',
      domain: 'AI/ML · Multi-Agent Systems · Evaluation',
      number: '03',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>SABER</strong> is a hierarchical multi-agent reasoning system designed to solve complex tasks by distributing reasoning across specialized agents.</p>
            <p class="cs-prose">I managed the product planning and evaluation strategy for the system, translating the technical concept into a structured product plan covering task decomposition, agent coordination, evaluation, milestones, and resource requirements.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI/ML · Multi-Agent Systems · Evaluation</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Core Innovation</div>
                <div class="cs-card-desc">Hierarchical agent coordination & custom multi-domain evaluation benchmark</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Complex reasoning tasks often require multiple types of expertise rather than a single reasoning process.</p>
            <p class="cs-prose">A monolithic AI system can struggle when tasks involve:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Multiple domains of knowledge</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Different reasoning strategies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Complex task dependencies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>The need to verify intermediate outputs</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Measuring performance across heterogeneous tasks</span></li>
            </ul>
            <p class="cs-prose">SABER approached this by structuring reasoning as a <strong>hierarchical system of specialized agents</strong>, with tasks broken down and routed according to the capabilities required.</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build a multi-agent reasoning system that can tackle complex, multi-domain problems by combining specialized agents within a coordinated hierarchical architecture.</p>
            <p class="cs-prose">The product was designed around three principles:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Specialization</div>
                <div class="cs-card-desc">Different agents can focus on different reasoning or domain requirements.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Hierarchical Coordination</div>
                <div class="cs-card-desc">A higher-level reasoning process coordinates and sequences the work performed by specialized agents.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Measurable Reliability</div>
                <div class="cs-card-desc">The system must be evaluated systematically rather than relying solely on qualitative impressions of model outputs.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">I managed the product planning for SABER, including:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining the overall project scope</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the product and system workflow</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Breaking the project into development milestones</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Sequencing tasks and dependencies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Planning resource requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating the evaluation strategy</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Using evaluation results to inform product priorities and roadmap decisions</span></li>
            </ul>
            <p class="cs-prose">My role focused on turning the underlying AI research direction into an executable product plan with measurable evaluation criteria.</p>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <p class="cs-prose">The product needed to support:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Task Decomposition</div>
                <div class="cs-card-desc">Complex problems needed to be broken into manageable reasoning tasks.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Specialized Agents</div>
                <div class="cs-card-desc">Individual agents needed to perform domain- or task-specific reasoning.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Hierarchical Coordination</div>
                <div class="cs-card-desc">A mechanism for coordinating specialized agents and combining their outputs.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Multi-Domain Reasoning</div>
                <div class="cs-card-desc">The architecture needed to support tasks spanning different knowledge domains.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Evaluation Framework</div>
                <div class="cs-card-desc">A structured evaluation framework capable of comparing performance across tasks and against a baseline.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <div class="cs-flow-container">
              <div class="cs-flow-node">Complex User Task</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Task Decomposition</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Hierarchical Coordinator</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Specialized Agents</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Agent Outputs</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Reasoning / Result Aggregation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Final Result</div>
            </div>
            <p class="cs-prose">The architecture separates <strong>coordination from specialization</strong>, allowing individual agents to focus on specific reasoning requirements while the higher-level system manages how those capabilities are combined.</p>
          `
        },
        {
          id: 'eval-strategy',
          title: 'Evaluation Strategy',
          htmlContent: `
            <p class="cs-prose">A major part of my product responsibility was structuring the evaluation approach.</p>
            <p class="cs-prose">Rather than evaluating SABER through isolated examples, I directed the creation of a <strong>custom multi-domain evaluation suite</strong> designed to test the system across different reasoning requirements.</p>
            <p class="cs-prose">The evaluation framework considered:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Task-level performance</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Performance across different domains</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Reliability of reasoning</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Comparison against a baseline system</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Consistency across evaluation tasks</span></li>
            </ul>
            <p class="cs-prose">The results were then used to identify areas of strength and weakness and inform subsequent product priorities.</p>
          `
        },
        {
          id: 'prioritization',
          title: 'Product Prioritization',
          htmlContent: `
            <p class="cs-prose">The roadmap was driven by the relationship between <strong>system capability and evaluation results</strong>.</p>
            <p class="cs-prose">Instead of treating every possible capability as equally important, evaluation results provided evidence for deciding where additional development effort would have the greatest product impact.</p>
            <div class="cs-flow-container" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px;">
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Build</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Evaluate</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Identify Gaps</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Prioritize</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Improve</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Re-evaluate</span>
            </div>
            <p class="cs-prose">This evaluation-driven approach helped connect the research process directly to product planning.</p>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Use hierarchical coordination rather than a flat collection of agents</div>
              <div class="cs-decision-meta">A hierarchical structure provides a clearer mechanism for decomposing complex tasks and coordinating specialized reasoning.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Treat evaluation as a core product capability</div>
              <div class="cs-decision-meta">Evaluation was designed into the project from day one rather than being treated as a final post-launch validation step.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Use a custom multi-domain evaluation suite</div>
              <div class="cs-decision-meta">A broad evaluation framework was necessary to understand how the system performed across varied reasoning tasks.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">4. Use evaluation results to influence the roadmap</div>
              <div class="cs-decision-meta">Performance data became a continuous input into prioritization rather than simply an end-of-project metric.</div>
            </div>
          `
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — System Definition</span>
                <p class="cs-card-desc">Define multi-agent architecture, agent responsibilities, task flow, and coordination model.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — Agent & Workflow Development</span>
                <p class="cs-card-desc">Develop specialized reasoning components and establish the hierarchical workflow connecting them.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Evaluation Framework</span>
                <p class="cs-card-desc">Develop custom multi-domain evaluation suite and establish baseline comparisons.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Evaluation & Iteration</span>
                <p class="cs-card-desc">Run evaluations, identify system weaknesses, and prioritize improvements based on observed performance.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — Product Refinement</span>
                <p class="cs-card-desc">Iterate on system capabilities and reasoning workflows based on evaluation findings.</p>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & Success Criteria',
          htmlContent: `
            <p class="cs-prose">The primary success criterion was <strong>improved reasoning performance relative to the baseline</strong>.</p>
            <p class="cs-prose">The evaluation framework focused on:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Overall task performance</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Performance across domains</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Reliability and consistency</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Improvement over baseline</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Performance of the multi-agent approach on complex reasoning tasks</span></li>
            </ul>
            <p class="cs-prose">The evaluation produced <strong>measurable gains over the baseline</strong>, providing quantitative evidence for the effectiveness of the approach.</p>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">I translated the product direction into an executable project plan by defining workstreams, milestones, task dependencies, resource requirements, evaluation activities, and development sequencing.</p>
            <p class="cs-prose">I also coordinated the relationship between system development and evaluation so that evaluation findings could feed back into prioritization rather than remaining isolated from the product roadmap.</p>
          `
        }
      ]
    },

    agrosense: {
      title: 'Agrosense',
      subtitle: 'AI-Assisted Platform for Farmers',
      role: 'Product Lead',
      timeline: '2026',
      domain: 'AI/ML · Marketplace · Multi-Sided Platform',
      number: '04',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>Agrosense</strong> is an AI-assisted platform designed to support farmers through a combination of agricultural data, personalized recommendations, marketplace capabilities, and community-driven information.</p>
            <p class="cs-prose">I oversaw the product scope and delivery planning for the platform, structuring the product around the needs of multiple user groups and prioritizing features across the farmer, vendor, and community sides of the platform.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI/ML · Marketplace · Multi-Sided Platform</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Core Ecosystem</div>
                <div class="cs-card-desc">Farmer Intelligence, Vendor Marketplace & Farming Community</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Farmers often need to make critical operational decisions using information spread across multiple disconnected sources:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Soil conditions & nutrient metrics</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Weather forecasts and micro-climate data</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Government agricultural advisories</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Crop-related recommendations & treatment protocols</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Agricultural products, equipment, and services</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Experiences and real-world tips from peer farmers</span></li>
            </ul>
            <p class="cs-prose">The product opportunity was to bring these capabilities into a unified platform rather than treating agricultural information, recommendations, commerce, and community interaction as separate experiences.</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build an integrated agricultural platform that combines <strong>data, AI-assisted recommendations, commerce, and community</strong> to help farmers make more informed decisions.</p>
            <p class="cs-prose">The product was structured around four core capabilities:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Agricultural Intelligence</div>
                <div class="cs-card-desc">Use available soil, weather, and government data as foundational inputs for decision-making.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Personalized Recommendations</div>
                <div class="cs-card-desc">Translate complex agricultural information into actionable recommendations tailored for individual farmers.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Marketplace</div>
                <div class="cs-card-desc">Connect farmers with vetted vendors and authentic agricultural products or services.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Community</div>
                <div class="cs-card-desc">Enable farmers and agricultural contributors to share localized knowledge, experiences, and advice.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">I oversaw product scope and planning across the platform, including:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining the overall product scope</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Identifying major user groups across the ecosystem</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring workflows around farmer, vendor, and community needs</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Prioritizing features across different sides of the platform</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Breaking the product into structured delivery phases</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Determining feature sequencing and dependencies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating overall product direction across cross-functional teams</span></li>
            </ul>
            <p class="cs-prose">The key product challenge was balancing the needs of <strong>multiple user groups</strong> while maintaining a coherent core experience for farmers.</p>
          `
        },
        {
          id: 'ecosystem',
          title: 'User Ecosystem',
          htmlContent: `
            <p class="cs-prose">Agrosense was designed as a multi-sided platform involving three primary groups:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Farmers (Primary)</div>
                <div class="cs-card-desc">Utilize agricultural data, personalized recommendations, marketplace discovery, and peer community forums.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Vendors</div>
                <div class="cs-card-desc">Provide agricultural products, equipment, seeds, fertilizers, or services through the marketplace.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Community Contributors</div>
                <div class="cs-card-desc">Agronomists, researchers, and experienced farmers sharing knowledge and field insights.</div>
              </div>
            </div>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">1. Agricultural Data</div>
                <div class="cs-card-desc">Integration of soil data, hyper-local weather feeds, and government agronomy bulletins.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">2. AI Recommendations</div>
                <div class="cs-card-desc">Personalized crop management, irrigation, pest control, and harvesting guidance.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">3. Marketplace</div>
                <div class="cs-card-desc">Vendor catalog, verified listings, order inquiries, and secure product discovery.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">4. Community</div>
                <div class="cs-card-desc">Discussion boards, image-based diagnostic Q&A, and localized farming tips.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <p class="cs-prose">The high-level product structure was organized around the relationship between data, intelligence, and user-facing capabilities:</p>
            <div class="cs-flow-container">
              <div class="cs-flow-node">Agricultural Data</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Data Processing & Intelligence</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Personalized Recommendations</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Farmer Experience</div>
              <div class="cs-flow-arrow" style="font-size: 1.2rem;">↙︎    ↘︎</div>
              <div style="display: flex; gap: 20px; width: 100%; justify-content: center;">
                <div class="cs-flow-node" style="max-width: 180px;">Marketplace</div>
                <div class="cs-flow-node" style="max-width: 180px;">Community</div>
              </div>
            </div>
            <p class="cs-prose">The marketplace and community components extend the core agricultural intelligence experience into commerce and knowledge-sharing workflows.</p>
          `
        },
        {
          id: 'prioritization',
          title: 'Product Prioritization',
          htmlContent: `
            <p class="cs-prose">Because Agrosense served multiple user groups, prioritization required balancing <strong>core farmer value</strong> with the capabilities needed to make the wider platform useful.</p>
            <p class="cs-prose">The product was therefore structured into phased delivery rather than attempting to launch every capability simultaneously.</p>
            <p class="cs-prose">The prioritization approach considered: value to farmers, dependencies between capabilities, data availability, complexity of implementation, requirements of other platform participants, and the need to establish the core experience before expanding the ecosystem.</p>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Build around the farmer rather than the marketplace</div>
              <div class="cs-decision-meta">The marketplace was treated as a supporting capability rather than defining the entire product.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Combine data with actionable recommendations</div>
              <div class="cs-decision-meta">Raw agricultural data alone does not provide full user value. The platform needed to translate information into clear actions for farmers.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Treat community as a core product capability</div>
              <div class="cs-decision-meta">Community interaction was included as part of the overall agricultural experience rather than an unrelated social feature.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">4. Design for multiple stakeholders simultaneously</div>
              <div class="cs-decision-meta">The product accounted for farmers, vendors, and contributors simultaneously while keeping the farmer experience central.</div>
            </div>
          `
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Core Agricultural Data</span>
                <p class="cs-card-desc">Establish underlying agricultural information layer using soil, weather, and government data.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — Personalized Intelligence</span>
                <p class="cs-card-desc">Build recommendation experience around available agricultural data.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Farmer Platform</span>
                <p class="cs-card-desc">Develop primary farmer-facing experience and connect intelligence layer to user workflows.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Marketplace</span>
                <p class="cs-card-desc">Introduce vendor participation and marketplace functionality.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — Community</span>
                <p class="cs-card-desc">Expand platform with community-driven information sharing and interaction.</p>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & Success Criteria',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Farmer Engagement</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Adoption of core farmer experience</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Usage of recommendations</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Repeat usage & retention</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Recommendation Value</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Interaction with recommendations</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Adoption of recommended actions</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Marketplace & Community</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Vendor engagement & discovery</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Community participation & posts</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Platform Growth</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Cross-platform usage between data, marketplace, and community</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">I translated the broad platform concept into a structured product plan by breaking the system into major capabilities, defining the relationships between them, and planning phased delivery.</p>
            <p class="cs-prose">The primary execution challenge was managing dependencies between the <strong>data layer, recommendation system, farmer experience, marketplace, and community</strong>, while also accounting for the requirements of different user groups.</p>
          `
        }
      ]
    },

    athena: {
      title: 'ATHENA',
      subtitle: 'AI Governance & Decision-Support Research',
      role: 'Product Lead',
      timeline: '2026',
      domain: 'AI Governance · Decision Support · AI Systems',
      number: '05',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>ATHENA</strong> is an AI governance and decision-support research project focused on building a system that supports AI-assisted decision-making while maintaining <strong>verification, auditability, and human oversight</strong> as core product requirements.</p>
            <p class="cs-prose">I led the requirements definition and project scope, translating the research direction into a structured product plan and coordinating research, documentation, milestones, and project risks.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI Governance · Decision Support · AI Systems</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Core Mandate</div>
                <div class="cs-card-desc">Verification, auditability, and human-in-the-loop oversight for high-stakes AI decisions</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">As AI systems become increasingly involved in decision-making, simply producing an answer is not enough.</p>
            <p class="cs-prose">A useful decision-support system needs to provide confidence that its outputs can be:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Verified systematically against ground truth or formal constraints</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Audited comprehensively across all decision pathways</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Traced back to their underlying reasoning or evidence</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Reviewed and intervened upon by humans when necessary</span></li>
            </ul>
            <p class="cs-prose">The product challenge was therefore to design AI decision support around <strong>trust and accountability</strong>, rather than treating model output as inherently reliable.</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build an AI governance and decision-support system where AI-generated recommendations can be <strong>verified, reviewed, and audited</strong> before being relied upon for consequential decisions.</p>
            <p class="cs-prose">The product was structured around three core principles:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Verification</div>
                <div class="cs-card-desc">AI outputs should be subject to rigorous verification mechanisms rather than accepted without scrutiny.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Auditability</div>
                <div class="cs-card-desc">Decision processes and outputs must provide complete, immutable records for retrospective review.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Human Oversight</div>
                <div class="cs-card-desc">Humans must remain empowered to review, override, and intervene in AI-assisted processes.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">I led product requirements and project scope for ATHENA, including:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining the product requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Translating governance requirements into system constraints</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the overall project scope</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating research and documentation milestones</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Identifying and tracking project risks</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Aligning research activities with the broader product direction</span></li>
            </ul>
            <p class="cs-prose">The central product responsibility was ensuring that <strong>governance requirements were treated as product requirements</strong>, rather than being added after the AI system was designed.</p>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Verification</div>
                <div class="cs-card-desc">Mechanisms for assessing and validating AI-generated outputs against policy rules.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Auditability</div>
                <div class="cs-card-desc">Complete immutable logs enabling examination of how and why a decision was reached.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Human Oversight</div>
                <div class="cs-card-desc">Explicit approval gates and intervention checkpoints for high-risk decisions.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Traceability</div>
                <div class="cs-card-desc">Direct linkage between model conclusions, intermediate reasoning, and source evidence.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <div class="cs-flow-container">
              <div class="cs-flow-node">Input / Decision Context</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">AI Analysis</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">AI Recommendation / Output</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Verification Layer</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Human Review</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Decision</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Audit Trail</div>
            </div>
            <p class="cs-prose">This structure separates <strong>AI generation from decision authorization</strong>, creating explicit points where outputs can be evaluated and reviewed.</p>
          `
        },
        {
          id: 'governance',
          title: 'Governance Model',
          htmlContent: `
            <p class="cs-prose">Rather than treating governance as a separate compliance layer, ATHENA incorporated governance directly into the product lifecycle:</p>
            <div class="cs-flow-container" style="flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px;">
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">AI Output</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Verification</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Review</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Decision</span>
              <span class="cs-flow-arrow">→</span>
              <span class="cs-flow-node" style="max-width: fit-content; padding: 6px 14px;">Audit</span>
            </div>
            <p class="cs-prose">This creates a controlled pathway between an AI-generated recommendation and its eventual use in decision-making, maintaining a human decision point rather than allowing AI output to automatically become the final decision.</p>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Make verification a mandatory product constraint</div>
              <div class="cs-decision-meta">Verification was incorporated into requirements from the beginning rather than treated as an optional enhancement.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Separate AI recommendation from final decision</div>
              <div class="cs-decision-meta">ATHENA was designed as decision support rather than autonomous decision-making, preserving human oversight over consequential outputs.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Treat auditability as a system requirement</div>
              <div class="cs-decision-meta">The ability to examine decisions after the fact was considered part of the core product architecture.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">4. Integrate governance into product design</div>
              <div class="cs-decision-meta">Governance requirements were translated into concrete system workflows rather than handled independently as legal compliance.</div>
            </div>
          `
        },
        {
          id: 'prioritization',
          title: 'Product Prioritization',
          htmlContent: `
            <p class="cs-prose">The product priorities were driven by requirements necessary to make AI-assisted decision support trustworthy:</p>
            <p class="cs-prose"><strong>AI Decision Support → Verification → Human Oversight → Auditability</strong></p>
            <p class="cs-prose">These capabilities formed the foundational MVP before considering additional platform capabilities.</p>
          `
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Requirements & Governance Definition</span>
                <p class="cs-card-desc">Define decision-support use case; establish verification, auditability, and human oversight requirements.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — Decision-Support Workflow</span>
                <p class="cs-card-desc">Design interaction between AI recommendations and human decision-makers.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Verification Layer</span>
                <p class="cs-card-desc">Define mechanisms for validating and reviewing AI outputs.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Auditability</span>
                <p class="cs-card-desc">Establish information pipelines required to examine AI decisions after execution.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — System Refinement</span>
                <p class="cs-card-desc">Iterate on governance and decision-support framework based on empirical findings.</p>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & Success Criteria',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Governance Metrics</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Verification coverage</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Ability to audit AI-assisted decisions</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Traceability of AI outputs</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Human Oversight</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Human review and intervention points</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Decision turnaround time</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Intervention rate</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'risk',
          title: 'Risk Management & Execution',
          htmlContent: `
            <p class="cs-prose">Because ATHENA focused on AI-assisted decision-making, risk management was integrated directly into the project planning process.</p>
            <p class="cs-prose">I tracked project risks alongside research and documentation milestones, ensuring that governance considerations remained connected to execution:</p>
            <p class="cs-prose"><strong>Research → Requirements → System Design → Governance Constraints → Documentation</strong></p>
          `
        }
      ]
    },

    redvector: {
      title: 'Red Vector AI',
      subtitle: 'AI-Powered Offensive Security & Attack Simulation Platform',
      role: 'Product Lead',
      timeline: '2026',
      domain: 'AI/ML · Cybersecurity · Security Testing',
      number: '06',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose"><strong>Red Vector AI</strong> is an AI-powered offensive security and attack simulation platform designed to help enterprise organizations evaluate their systems against realistic adversarial scenarios.</p>
            <p class="cs-prose">The product uses controlled AI-driven attack simulations to identify vulnerabilities and security weaknesses, then translates those findings into prioritized remediation guidance.</p>
            <p class="cs-prose">I designed the product concept and defined its core product workflow, focusing on how simulated attacks could be structured, evaluated, reported, and converted into actionable security improvements.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Product Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · AI/ML · Cybersecurity · Security Testing</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Focus</div>
                <div class="cs-card-desc">Controlled AI attack simulation & prioritized remediation intelligence</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Traditional security assessments can identify vulnerabilities, but organizations also need to understand <strong>how those weaknesses could be exploited in realistic attack scenarios</strong>.</p>
            <p class="cs-prose">A security team needs more than an endless list of vulnerabilities. It needs to understand:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Which weaknesses are actually exploitable</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>How vulnerabilities could be chained together by an adversary</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>What an attacker could potentially achieve</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Which weaknesses represent the greatest actual risk</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>What remediation actions should be prioritized first</span></li>
            </ul>
            <p class="cs-prose">Red Vector AI was designed around this gap between <strong>finding vulnerabilities</strong> and <strong>understanding realistic attack paths and their impact</strong>.</p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Build a controlled AI-driven security testing platform that simulates realistic adversarial behavior against enterprise systems, identifies weaknesses, and converts the results into prioritized security intelligence.</p>
            <p class="cs-prose">The product is built around three principles:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Realistic Simulation</div>
                <div class="cs-card-desc">Test systems against realistic adversarial scenarios rather than isolated vulnerability scans.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Controlled Execution</div>
                <div class="cs-card-desc">Keep attack simulation strictly within explicitly defined, controlled testing environments.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Actionable Intelligence</div>
                <div class="cs-card-desc">Translate complex technical findings into prioritized remediation guidance that teams can act on immediately.</div>
              </div>
            </div>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">I designed the product concept and structured the product around the end-to-end security testing workflow. My responsibilities included:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining the product problem and scope</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Designing the AI-driven attack simulation concept</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the attack-testing workflow</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining how vulnerabilities and weaknesses would be identified</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Designing the reporting framework</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Defining how findings would be translated into remediation priorities</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the product around controlled enterprise security testing</span></li>
            </ul>
          `
        },
        {
          id: 'workflow',
          title: 'Product Workflow',
          htmlContent: `
            <p class="cs-prose">The core product workflow was structured as:</p>
            <div class="cs-flow-container">
              <div class="cs-flow-node">Target System</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Attack Scenario Definition</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">AI-Driven Attack Simulation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">System Response & Observation</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Vulnerability / Weakness Identification</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Finding Analysis</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Risk Prioritization</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Remediation Guidance</div>
            </div>
            <p class="cs-prose">This creates a complete loop from <strong>simulated attack → security finding → prioritized action</strong>.</p>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Controlled Attack Simulation</div>
                <div class="cs-card-desc">Operate within explicitly bounded testing environments with safety shutoffs.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">AI-Driven Testing</div>
                <div class="cs-card-desc">Generate and execute realistic adversarial tactics, techniques, and procedures (TTPs).</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">System Observation</div>
                <div class="cs-card-desc">Continuously observe responses and capture forensic telemetry during simulated attacks.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Risk Prioritization & Reporting</div>
                <div class="cs-card-desc">Rank vulnerabilities by exploitability and business risk, paired with actionable fix guidance.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <div class="cs-flow-container">
              <div class="cs-flow-node">Enterprise System</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Security Testing Environment</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">AI Attack Simulation Engine</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Observation & Analysis Layer</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Finding Detection</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Risk Analysis</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Security Report</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Prioritized Remediation</div>
            </div>
            <p class="cs-prose">The separation between simulation, analysis, and reporting allows the system to move seamlessly from offensive testing to actionable defensive outcomes.</p>
          `
        },
        {
          id: 'strategy',
          title: 'Attack Simulation Strategy',
          htmlContent: `
            <p class="cs-prose">The product was designed around <strong>scenario-based adversarial testing</strong>.</p>
            <p class="cs-prose">Instead of simply asking whether an individual vulnerability exists, the system evaluates how weaknesses could potentially be encountered and exploited within a broader attack scenario.</p>
            <p class="cs-prose">This allows security testing to focus on: attack paths, system weaknesses, interactions between vulnerabilities, potential business impact, and remediation priorities.</p>
          `
        },
        {
          id: 'reporting',
          title: 'Reporting Framework',
          htmlContent: `
            <p class="cs-prose">A core product requirement was converting technical testing output into information that security teams could act on. The reporting framework was structured around:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Finding & Evidence</div>
                <div class="cs-card-desc">What weakness was identified, and what exact events occurred during simulation?</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Risk & Impact</div>
                <div class="cs-card-desc">Why does the finding matter, and what could an attacker achieve if exploited?</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Priority & Remediation</div>
                <div class="cs-card-desc">How urgently should it be addressed, and what concrete actions should engineers take?</div>
              </div>
            </div>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Focus on attack simulation rather than vulnerability scanning alone</div>
              <div class="cs-decision-meta">Explore realistic adversarial scenarios rather than simply producing an overwhelming vulnerability inventory.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Keep simulation strictly controlled</div>
              <div class="cs-decision-meta">AI-driven offensive capabilities were positioned within carefully controlled testing environments.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Make remediation part of the core product</div>
              <div class="cs-decision-meta">The product does not stop at identifying weaknesses; findings are transformed into prioritized remediation tasks.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">4. Separate technical findings from executive decision-making</div>
              <div class="cs-decision-meta">Raw observations are refined through risk analysis before reaching final security reports.</div>
            </div>
          `
        },
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Security Testing Definition</span>
                <p class="cs-card-desc">Define target environments, attack scenarios, testing boundaries, and expected outputs.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — AI Attack Simulation</span>
                <p class="cs-card-desc">Develop AI-driven simulation workflow for controlled adversarial testing.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Observation & Finding Detection</span>
                <p class="cs-card-desc">Capture system behavior and identify weaknesses exposed during simulated scenarios.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Risk Analysis & Reporting</span>
                <p class="cs-card-desc">Structure findings into security reports with risk and impact analysis.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — Remediation Prioritization</span>
                <p class="cs-card-desc">Translate findings into prioritized recommendations for security teams.</p>
              </div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Metrics & Success Criteria',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Testing Effectiveness</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Meaningful weaknesses identified</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Coverage of attack scenarios</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Reproducibility of findings</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Risk & Remediation</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Quality of risk prioritization</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>% of prioritized findings resolved</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Reduction in security exposure</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">I structured Red Vector AI as an end-to-end security product rather than treating AI attack simulation as an isolated technical capability.</p>
            <p class="cs-prose">The product planning connected: <strong>Security Testing → AI Simulation → Finding Analysis → Risk Prioritization → Enterprise Reporting</strong></p>
          `
        }
      ]
    },

    sensingbandage: {
      title: 'Wireless Sensing Bandage',
      subtitle: 'Wireless Sensing Bandage for Chronic Wound Monitoring',
      role: 'Research Project Lead',
      timeline: '2025 / 26',
      domain: 'Healthcare Technology · IoT · Sensor Systems',
      number: '07',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          htmlContent: `
            <p class="cs-prose">The <strong>Wireless Sensing Bandage</strong> is an academic research project exploring a smart wound-monitoring system designed to measure wound-site parameters <strong>without requiring removal of the dressing</strong>.</p>
            <p class="cs-prose">The system combines multiple sensing capabilities with wireless communication to enable continuous monitoring of wound conditions over time.</p>
            <p class="cs-prose">I helped steer the research and product planning, structuring the literature review and research direction around the sensing requirements, system architecture, and feasibility of continuous wound monitoring.</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Role</div>
                <div class="cs-card-desc">Research Project Lead</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Domain</div>
                <div class="cs-card-desc">Product Management · Healthcare Technology · IoT · Sensor Systems</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Key Innovation</div>
                <div class="cs-card-desc">Multi-parameter wound monitoring without disturbing dressing</div>
              </div>
            </div>
          `
        },
        {
          id: 'problem',
          title: 'The Problem',
          htmlContent: `
            <p class="cs-prose">Chronic wounds require regular monitoring to understand how the wound is progressing and whether conditions are changing.</p>
            <p class="cs-prose">However, conventional monitoring can require removing or disturbing the dressing to inspect the wound. This disrupts tissue healing, introduces infection risk, and causes patient discomfort.</p>
            <p class="cs-prose">This creates a product opportunity for a sensing system that can monitor relevant wound parameters <strong>while the dressing remains in place</strong>.</p>
            <p class="cs-prose">The system therefore needed to address: <em>What should be measured?</em> and <em>How can those measurements be collected wirelessly without disturbing the wound?</em></p>
          `
        },
        {
          id: 'vision',
          title: 'Product Vision',
          htmlContent: `
            <p class="cs-prose">Develop a wireless sensing bandage capable of monitoring multiple wound-site parameters without requiring dressing removal.</p>
            <p class="cs-prose">The sensing concept focuses on four key measurements:</p>
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">pH Sensing</div>
                <div class="cs-card-desc">Provides crucial diagnostic information about the biochemical environment and healing state of the wound.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Temperature</div>
                <div class="cs-card-desc">Tracks localized temperature changes to provide early warning signs of infection and inflammation.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Moisture</div>
                <div class="cs-card-desc">Assesses exudate levels and the moisture conditions critical for optimal cellular recovery.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Bioimpedance</div>
                <div class="cs-card-desc">Provides an additional physiological measurement tracking cellular integrity and healing progression.</div>
              </div>
            </div>
            <p class="cs-prose">Together, these measurements provide a far broader picture of wound health than relying on any single sensor.</p>
          `
        },
        {
          id: 'role',
          title: 'My Role',
          htmlContent: `
            <p class="cs-prose">I steered the research plan and helped structure the project around requirements needed for a practical wireless sensing system. My work included:</p>
            <ul class="cs-section-list">
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the research direction</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Identifying key wound parameters to monitor</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Organizing the literature review into a structured framework</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Building an author-wise literature comparison framework</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Comparing existing approaches and sensing technologies</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Structuring the research around sensing and wireless architecture requirements</span></li>
              <li class="cs-section-item"><span class="cs-item-dot"></span><span>Coordinating research milestones and deliverables</span></li>
            </ul>
          `
        },
        {
          id: 'requirements',
          title: 'Product Requirements',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Multi-Parameter Sensing</div>
                <div class="cs-card-desc">Synchronous measurement of pH, temperature, moisture, and bioimpedance.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Non-Invasive Monitoring</div>
                <div class="cs-card-desc">Measurements taken without requiring removal or disturbance of the wound dressing.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Wireless Communication</div>
                <div class="cs-card-desc">Reliable low-power telemetry transmitting data to caregiver devices for analysis.</div>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">Wearable Integration</div>
                <div class="cs-card-desc">Flexible, biocompatible components integrated into a bandage form factor.</div>
              </div>
            </div>
          `
        },
        {
          id: 'architecture',
          title: 'Product Architecture',
          htmlContent: `
            <div class="cs-flow-container">
              <div class="cs-flow-node">Wound Site</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node"><strong>Sensing Layer:</strong> pH · Temperature · Moisture · Bioimpedance</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Signal Acquisition</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">Wireless Communication</div>
              <div class="cs-flow-arrow">↓</div>
              <div class="cs-flow-node">External Monitoring / Analysis</div>
            </div>
            <p class="cs-prose">This architecture separates the sensing layer from wireless transmission and downstream monitoring, allowing the system to collect multiple measurements while keeping the dressing intact.</p>
          `
        },
        {
          id: 'sensor-selection',
          title: 'Sensor Selection & Literature Review',
          htmlContent: `
            <p class="cs-prose">A major research requirement was determining which sensing approaches were most appropriate for the four target parameters.</p>
            <p class="cs-prose">I organized the literature into an <strong>author-wise comparison framework</strong>, allowing different approaches to be evaluated against sensing principles, operating characteristics, and clinical suitability for wearable integration.</p>
            <p class="cs-prose">This provided a rigorous, structured basis for narrowing down the sensing architecture rather than selecting sensors arbitrarily.</p>
          `
        },
        {
          id: 'wireless',
          title: 'Wireless Architecture',
          htmlContent: `
            <p class="cs-prose">Wireless communication was treated as a distinct system-level requirement connecting the sensing layer to external monitoring.</p>
            <p class="cs-prose">Key constraints included: sensor integration, data transmission rate, battery life and power management, wearable form-factor limitations, and physical flexibility.</p>
          `
        },
        {
          id: 'roadmap',
          title: 'Research & Development Roadmap',
          htmlContent: `
            <div class="cs-roadmap-timeline">
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 1 — Literature Review</span>
                <p class="cs-card-desc">Review existing research covering wound monitoring, sensing technologies, and wireless telemetry systems.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 2 — Sensor Design & Selection</span>
                <p class="cs-card-desc">Evaluate sensing approaches for pH, temperature, moisture, and bioimpedance.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 3 — Wireless Architecture</span>
                <p class="cs-card-desc">Define how sensor measurements are acquired and transmitted from the wearable system.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 4 — Prototype Fabrication</span>
                <p class="cs-card-desc">Integrate selected sensing components into a prototype bandage form factor.</p>
              </div>
              <div class="cs-roadmap-phase">
                <span class="cs-phase-tag">Phase 5 — Sensor Validation</span>
                <p class="cs-card-desc">Evaluate sensing accuracy and validate multi-parameter capture under simulated wound conditions.</p>
              </div>
            </div>
          `
        },
        {
          id: 'decisions',
          title: 'Key Product Decisions',
          htmlContent: `
            <div class="cs-decision-block">
              <div class="cs-decision-title">1. Use multi-parameter sensing</div>
              <div class="cs-decision-meta">A combination of pH, temperature, moisture, and bioimpedance provides a much richer diagnostic picture than any single measurement alone.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">2. Prioritize monitoring without dressing removal</div>
              <div class="cs-decision-meta">The fundamental patient and clinical value comes from preserving the dressing and avoiding disruption to the wound bed.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">3. Treat sensor selection as a system-level decision</div>
              <div class="cs-decision-meta">Sensors cannot be chosen independently of wearable integration, wireless communication, and biocompatibility constraints.</div>
            </div>
            <div class="cs-decision-block">
              <div class="cs-decision-title">4. Structure comparative research before prototype development</div>
              <div class="cs-decision-meta">A thorough literature comparison informed sensor choices before committing resources to physical fabrication.</div>
            </div>
          `
        },
        {
          id: 'metrics',
          title: 'Success Criteria',
          htmlContent: `
            <div class="cs-cards-grid">
              <div class="cs-content-card">
                <div class="cs-card-title">Sensing Performance</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Accuracy of individual measurements</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Reliability over time</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Sensitivity to pathological changes</li>
                </ul>
              </div>
              <div class="cs-content-card">
                <div class="cs-card-title">System & Wireless</div>
                <ul class="cs-phase-items">
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Bandage form-factor compatibility</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Reliable packet transmission</li>
                  <li class="cs-phase-item"><span class="cs-item-dot"></span>Zero dressing removal required</li>
                </ul>
              </div>
            </div>
          `
        },
        {
          id: 'execution',
          title: 'Execution',
          htmlContent: `
            <p class="cs-prose">I structured the research as a progression from <strong>literature → sensor selection → system architecture → prototype → validation</strong>.</p>
            <p class="cs-prose">The literature review was organized into a comparative framework to identify suitable sensing approaches and establish the technical basis for design decisions, connecting research directly to the eventual product architecture.</p>
          `
        }
      ]
    }
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER CASE STUDY
  // ─────────────────────────────────────────────────────────────

  function renderCaseStudy(cs) {
    document.getElementById('cs-title').textContent = cs.title;
    document.getElementById('cs-subtitle').textContent = cs.subtitle;
    document.getElementById('cs-role').textContent = cs.role;
    document.getElementById('cs-timeline').textContent = cs.timeline;
    document.getElementById('cs-domain').textContent = cs.domain;
    document.getElementById('cs-domain-badge').textContent = cs.number + ' — ' + cs.domain;

    // TOC
    const toc = document.getElementById('cs-toc');
    toc.innerHTML = '<p class="cs-toc-label">Contents</p>';
    cs.sections.forEach(sec => {
      const a = document.createElement('a');
      a.href = '#cs-sec-' + sec.id;
      a.className = 'cs-toc-link';
      a.textContent = sec.title.replace(' ⭐', '');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('cs-sec-' + sec.id);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.cs-toc-link').forEach(l => l.classList.remove('active'));
        a.classList.add('active');
      });
      toc.appendChild(a);
    });


    // Main content sections
    const main = document.getElementById('cs-main-content');
    main.innerHTML = '';
    main.scrollTop = 0;

    cs.sections.forEach(sec => {
      const section = document.createElement('section');
      section.className = 'cs-section';
      section.id = 'cs-sec-' + sec.id;
      const isStarred = sec.title.includes('⭐');
      let contentHtml = '';
      if (sec.htmlContent) {
        contentHtml = sec.htmlContent;
      } else if (sec.items && sec.items.length) {
        contentHtml = '<ul class="cs-section-list">' +
          sec.items.map(item =>
            '<li class="cs-section-item"><span class="cs-item-dot"></span><span>' + item + '</span></li>'
          ).join('') +
        '</ul>';
      }
      section.innerHTML =
        '<div class="cs-section-header">' +
          '<h3 class="cs-section-title' + (isStarred ? ' starred' : '') + '">' + sec.title + '</h3>' +
        '</div>' +
        contentHtml;
      main.appendChild(section);
    });

    // Scrollspy & Scroll Reveal for Case Study Content
    const mainEl = document.getElementById('cs-main-content');
    const sectionEls = mainEl.querySelectorAll('.cs-section');
    const tocLinks = toc.querySelectorAll('.cs-toc-link');

    function checkSectionReveal() {
      const mainRect = mainEl.getBoundingClientRect();
      let current = '';
      sectionEls.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < mainRect.bottom - 40 && rect.bottom > mainRect.top) {
          sec.classList.add('cs-revealed');
        }
        if (rect.top - mainRect.top <= 100) current = sec.id;
      });
      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }

    // Trigger initial reveal
    setTimeout(checkSectionReveal, 80);
    mainEl.addEventListener('scroll', checkSectionReveal, { passive: true });
  }

  // Project card click -> case study
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const pKey = card.getAttribute('data-project');
      const cs = caseStudies[pKey];
      if (cs) {
        renderCaseStudy(cs);
        openOverlay('casestudy');
      }
    });
  });

  // Copy email
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('adityavir0025@gmail.com').then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span>Copied to Clipboard! ✓</span>';
        setTimeout(() => { copyBtn.innerHTML = orig; }, 2000);
      });
    });
  }
});
