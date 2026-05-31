'use client';

import { useState, useEffect, useRef } from 'react';

const experienceData = [
  {
    id: 1,
    company: 'PT Prima Integrasi Network',
    position: 'Full Stack Developer',
    date: 'June 2024 – Present',
    image: '/img/jne.jpg',
    details: [
      'Developed LLM-powered chatbot using Streamlit Python and Ollama LLM for internal automation use cases',
      'Built agentic AI systems using Model Context Protocol (MCP) for advanced AI-driven process automation',
      'Engineered RAG (Retrieval-Augmented Generation) pipeline with Langchain, Ollama, ChromaDB, and VectorDB integrated with ReactJs frontend',
      'Developed social media super-app using ReactJs and Python Flask',
      'Implemented Robotic Process Automation (RPA) workflows using TagUI to streamline business processes',
      'Built and maintained applications across multiple databases: Couchbase, SQLite, MySQL, SinglestoreDB, MongoDB',
      'Implemented application security with JWT token authentication, 2FA via Google and Microsoft',
      'Developed responsive UI with Bootstrap, TailwindCSS, PrimeReact, and VantaJS',
      'Built conference meeting integration using Jitsi Meet',
      'Developed company profile websites and internal tools',
    ],
  },
  {
    id: 2,
    company: 'PT Rakai Digital',
    position: 'Full Stack Developer (Freelance)',
    date: 'June 2025 – Present',
    image: '/img/rakai.jpg',
    details: [
      'Developed Android transportation app using React Native featuring ticket booking system, real-time GPS tracking, payment gateway integration, and support for both public transit and private taxi services',
      'Built a tenant ticketing system for maintenance requests using React Native (Android), integrated with WhatsApp via Model Context Protocol (MCP) for automated notifications and workflow updates',
      'Developed a healthcare platform for nurses and doctors comprising a React Vite web app and React Native mobile app, with payment gateway and real-time online consultation chat (prototype)',
      'Developed a cooperative inter-store integration application to synchronize inventory and operations across multiple cooperative branches (prototype)',
    ],
  },
  {
    id: 3,
    company: 'Youthopia, Malaysia',
    position: 'Full Stack Developer (Internship)',
    date: 'February 2024 – March 2024',
    image: '/img/youthopia.jpg',
    details: [
      'Developed company profile web application with ReactJs frontend and NodeJs backend server',
      'Integrated Stripe payment system using NodeJs for online transactions',
      'Implemented UI/UX design based on client requirements',
    ],
  },
  {
    id: 4,
    company: 'RPG Ventures, Malaysia',
    position: 'Data Analyst & Frontend Developer (Apprenticeship)',
    date: 'November 2023 – December 2023',
    image: '/img/RPG.png',
    details: [
      'Built internal applications using Google AppSheet',
      'Performed data cleansing and transformation using DBT (Data Build Tool) pipelines',
      'Explored and implemented Python automation scripts for operational workflows',
    ],
  },
];

export default function Experiences() {
  const [selectedExp, setSelectedExp] = useState(null);
  const sectionRef = useRef(null);

  /* Scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => els?.forEach((el) => observer.unobserve(el));
  }, []);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExp]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative z-10 px-6 py-24 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Heading ── */}
      <div className="reveal">
        <h2 className="section-title">Experiences</h2>
        <hr className="section-divider" />
      </div>

      {/* ── Timeline ── */}
      <div className="relative mt-4">
        {/* Gold vertical line */}
        <div className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-gold)] via-[var(--color-gold)]/40 to-transparent" />

        <div className="flex flex-col gap-8">
          {experienceData.map((exp, idx) => (
            <div
              key={exp.id}
              className="reveal relative pl-16 md:pl-20"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Timeline dot — company image */}
              <div className="absolute left-[11px] md:left-[15px] top-4 w-[34px] h-[34px] rounded-full border-2 border-[var(--color-gold)] overflow-hidden bg-[var(--color-surface)] z-10 shadow-[0_0_12px_rgba(255,196,81,0.25)]">
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card */}
              <div className="glass-card p-6 group">
                {/* Company & position */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-[var(--color-gold)] font-medium mt-0.5">
                      {exp.position}
                    </p>
                  </div>

                  {/* Date badge */}
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-white/5 px-3 py-1.5 rounded-full w-fit flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5 text-[var(--color-gold)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {exp.date}
                  </div>
                </div>

                {/* Quick preview — first 2 items */}
                <ul className="mt-3 space-y-1.5">
                  {exp.details.slice(0, 2).map((detail, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]/60 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* View Details button */}
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-light)] transition-colors group/btn"
                >
                  View Details
                  <svg
                    className="w-4 h-4 transition-transform group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      {selectedExp && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedExp(null)}
        >
          <div
            className="modal-content p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:bg-white/10 transition-all"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-gold)] flex-shrink-0 bg-white/5 shadow-[0_0_16px_rgba(255,196,81,0.2)]">
                <img
                  src={selectedExp.image}
                  alt={selectedExp.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-gold)]">
                  {selectedExp.company}
                </h3>
                <p className="text-[var(--color-text-primary)] font-medium mt-0.5">
                  {selectedExp.position}
                </p>
                <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mt-2">
                  <svg
                    className="w-4 h-4 text-[var(--color-gold)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {selectedExp.date}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/10 mb-6" />

            {/* Details */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-4">
              Key Contributions
            </h4>
            <ul className="space-y-3">
              {selectedExp.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
