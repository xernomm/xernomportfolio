'use client';

import { useState, useEffect, useRef } from 'react';

export const projects = [
  {
    title: 'Zero No Limits (ZNL)',
    image: '/img/zeronolimits.png',
    description:
      'A production full-stack mobile application and backend service architecture designed for high-performance scalability. Developed independently using React Native for the mobile app, Node.js Express for the robust API gateway, and SQL database systems.',
    tools: ['React Native', 'NodeJs', 'Express', 'SQL'],
    status: 'Production',
    playstore: 'https://play.google.com/store/apps/details?id=com.rakai.ZNL',
    website: 'https://znlapi.com/',
    link: null,
  },
  {
    title: 'MCP WhatsApp AI',
    image: '/img/whatsappmcp.jpg',
    description:
      'AI Agent connected to MCP server and integrated to whatsapp chat.',
    tools: ['MCP', 'Ollama', 'OracleDB', 'Typescript baileys', 'Flask'],
    status: 'In development',
    link: null,
  },
  {
    title: 'HR-Admin Chatbot Assistant',
    image: '/img/primadmin.png',
    description:
      'AI Agent connected to MCP server and ReactJS frontend, able to manipulate and filter employee data.',
    tools: ['MCP', 'Ollama', 'OracleDB', 'ReactJs', 'Flask'],
    status: 'In development',
    link: null,
  },
  {
    title: 'RAG LLM WhatsApp AI',
    image: '/img/whatsappai.jpg',
    description: 'RAG based chatbot connected to whatsapp chat.',
    tools: ['Ollama', 'Flask', 'ChromaDB', 'Typescript baileys'],
    status: 'Finished',
    link: 'https://github.com/xernomm/whatsappai.git',
  },
  {
    title: 'Vanka AI Assistant',
    image: '/img/vankaai.jpg',
    description: 'Customer Service AI Assistant',
    tools: ['Ollama', 'Flask', 'OracleDB', 'ReactJs'],
    status: 'Finished',
    link: 'https://github.com/xernomm/askrindo.git',
  },
  {
    title: 'ABC Jobs',
    image: '/img/aj.png',
    description:
      'Social media job platform with posting, comments, job application and admin approval system.',
    tools: ['ReactJs', 'Spring Boot', 'SQL'],
    status: 'Finished',
    link: 'https://github.com/xernomm/abccommunityjob.git',
  },
  {
    title: 'Shopp',
    image: '/img/shopp.png',
    description:
      'E-commerce system with cart, checkout, payment integration, supplier audit, etc.',
    tools: ['ReactJs', 'Spring Boot', 'SQL', 'Leaflet.js'],
    status: 'Finished',
    link: 'https://github.com/xernomm/ShoppCommerce.git',
  },
  {
    title: 'ABC Learning',
    image: '/img/abclearning.png',
    description: 'Front-end for online LMS.',
    tools: ['HTML', 'CSS', 'JS'],
    status: 'In development',
    link: null,
  },
  {
    title: 'News Portal CMS',
    image: '/img/lifecms.png',
    description: 'Built using Liferay template.',
    tools: ['HTML', 'CSS', 'JS', 'Liferay'],
    status: 'In development',
    link: null,
  },
  {
    title: 'Emobuddy',
    image: '/img/ytpProject.png',
    description: 'Youth learning portal with Stripe subscriptions.',
    tools: ['ReactJS', 'NodeJS', 'SQL', 'Stripe API'],
    status: 'In development',
    link: null,
  },
  {
    title: 'Meals on Wheels',
    image: '/img/mow.png',
    description: 'Online meal service with map API.',
    tools: ['ReactJs', 'Spring Boot', 'SQL', 'Leaflet.js'],
    status: 'In development',
    link: null,
  },
  {
    title: 'XYZ Cars',
    image: '/img/abccar.png',
    description: 'Used car marketplace with test drive, bidding.',
    tools: ['ReactJs', 'Spring Boot', 'SQL'],
    status: 'In development',
    link: null,
  },
  {
    title: 'Know Your Neighborhood',
    image: '/img/kyn.png',
    description: 'Neighborhood-based store listing.',
    tools: ['ReactJs', 'Spring Boot', 'SQL'],
    status: 'In development',
    link: null,
  },
];

function StatusBadge({ status }) {
  const isFinished = status === 'Finished' || status === 'Production';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
        isFinished
          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isFinished ? 'bg-green-400' : 'bg-amber-400 animate-pulse'
        }`}
      />
      {status}
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Image */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden rounded-t-[20px]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:text-gold hover:border-gold/50 transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-text-primary">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>

          <p className="text-text-secondary leading-relaxed">
            {project.description}
          </p>

          {/* Tools */}
          <div>
            <span className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-2 block">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-surface-glass border border-border-glass text-text-secondary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3">
            {project.playstore && (
              <a
                href={project.playstore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 border border-green-500/30 text-white shadow-lg shadow-green-500/10 hover:shadow-green-500/25 hover:from-green-500 hover:to-emerald-400"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.783 12 3.609 22.186A2.22 2.22 0 0 1 3 20.613V3.387c0-.624.22-1.192.609-1.573zm11.39 8.985l2.766 1.572c.907.515.907 1.357 0 1.872l-2.766 1.572L12.213 12l2.786-2.201zM11.01 10.822L4.695 4.507c.39-.236.879-.272 1.354.002l7.747 4.402-2.786 1.911zm0 2.356l2.786 1.911-7.747 4.402a1.623 1.623 0 0 1-1.354.002l6.315-6.315z"/>
                </svg>
                Play Store
              </a>
            )}
            {project.appstore && (
              <a
                href={project.appstore}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 border border-blue-500/30 text-white shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-400"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.57 2.95-1.39z"/>
                </svg>
                App Store
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-yellow-500 border border-amber-500/30 text-white shadow-lg shadow-amber-500/10 hover:shadow-amber-500/25 hover:from-amber-500 hover:to-yellow-400"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Visit Site
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            )}
            {!project.playstore && !project.appstore && !project.website && !project.link && (
              <button
                disabled
                className="btn-primary inline-flex items-center gap-2 opacity-40 cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                In Development
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(projects);
  const sectionRef = useRef(null);

  // Scroll reveal (for title/header elements)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => reveals?.forEach((el) => observer.unobserve(el));
  }, []);

  // GSAP ScrollTrigger Batch Animation
  useEffect(() => {
    let ctx;

    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // Set initial animation state
          gsap.set(".project-card", { y: 30, opacity: 0 });

          // Initialize ScrollTrigger batch animations
          ScrollTrigger.batch(".project-card", {
            scroller: ".projects-scroll-container",
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: { each: 0.05, grid: [1, 3] },
                overwrite: true,
                duration: 0.4,
                ease: "power3.out",
              }),
            onLeave: (batch) =>
              gsap.set(batch, { opacity: 0, y: -30, overwrite: true }),
            onEnterBack: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                stagger: 0.05,
                overwrite: true,
                duration: 0.4,
                ease: "power3.out",
              }),
            onLeaveBack: (batch) =>
              gsap.set(batch, { opacity: 0, y: 30, overwrite: true }),
          });

          // Refresh ScrollTrigger to compute new card positions
          ScrollTrigger.refresh();
        });
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, [visibleProjects]);

  // Infinite Scroll Handler
  const handleScroll = (e) => {
    const container = e.target;
    // Check if scrolled near the bottom (within 150px)
    if (container.scrollHeight - container.scrollTop <= container.clientHeight + 150) {
      setVisibleProjects((prev) => [...prev, ...projects]);
    }
  };

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative z-10 px-6 py-12 max-w-6xl mx-auto"
      >
        <div className="reveal">
          <h2 className="section-title">Projects</h2>
          <hr className="section-divider" />
          <p className="text-text-secondary max-w-xl mb-10">
            These are a few projects I&apos;ve been working on as a full-stack
            web developer. Feel free to scroll infinitely to explore!
          </p>
        </div>

        {/* Projects Scroll Container */}
        <div
          className="projects-scroll-container reveal"
          onScroll={handleScroll}
        >
          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
            {visibleProjects.map((project, idx) => (
              <div
                key={`${project.title}-${idx}`}
                className="project-card glass-card overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Card Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 right-3">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-text-primary group-hover:text-gold transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                    {project.tools.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

