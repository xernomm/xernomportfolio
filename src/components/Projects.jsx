'use client';

import { useState, useEffect, useRef } from 'react';

const projects = [
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
  const isFinished = status === 'Finished';
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

  const isFinished = project.status === 'Finished';

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

          {/* Action Button */}
          <div className="pt-2">
            {isFinished && project.link ? (
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
            ) : (
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
  const sectionRef = useRef(null);

  // Scroll reveal
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

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative z-10 px-6 py-24 max-w-6xl mx-auto"
      >
        <div className="reveal">
          <h2 className="section-title">Projects</h2>
          <hr className="section-divider" />
          <p className="text-text-secondary max-w-xl mb-10">
            These are a few projects I&apos;ve been working on as a full-stack
            web developer.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="reveal glass-card overflow-hidden cursor-pointer group"
              style={{ transitionDelay: `${idx * 60}ms` }}
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
