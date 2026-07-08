'use client';

import { useState, useEffect, useRef } from 'react';

export const educationData = [
  {
    id: 1,
    school: 'Lithan Academy',
    degree: "Bachelor's Degree in Software Engineering (BDSE)",
    date: 'Sept 2022 – Oct 2023',
    image: '/img/lithan.png',
    details: [
      'Focused on full-stack web development',
      'Frontend: ReactJs, NextJs, Tailwind CSS, HTML, CSS, JavaScript, jQuery, Bootstrap',
      'Backend: NodeJs, Flask, Spring Boot, Java',
      'Database: SQL, SQLite',
      'Tools: GitHub, Power BI, AppSheet, Axure, Liferay',
    ],
  },
  {
    id: 2,
    school: 'Universitas Pembangunan Jaya',
    degree: 'Sarjana Komputer (S.Kom) Sistem Informasi',
    date: 'Sept 2022 – Graduated',
    image: '/img/upj.jpg',
    details: [
      'Graduated / Lulus (GPA: 3.33)',
      'Focused on project management skills, documentation, and system analysis',
      'Tools: Vscode, Microsoft Word',
    ],
  },
];

export default function Education() {
  const [selectedEdu, setSelectedEdu] = useState(null);
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
    if (selectedEdu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedEdu]);

  return (
    <section
      id="educations"
      ref={sectionRef}
      className="relative z-10 px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Heading ── */}
      <div className="reveal">
        <h2 className="section-title">Education</h2>
        <hr className="section-divider" />
      </div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {educationData.map((edu, idx) => (
          <div
            key={edu.id}
            className="reveal glass-card p-6 cursor-pointer group"
            style={{ transitionDelay: `${idx * 120}ms` }}
            onClick={() => setSelectedEdu(edu)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedEdu(edu);
              }
            }}
          >
            {/* School image */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                <img
                  src={edu.image}
                  alt={edu.school}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors truncate">
                  {edu.school}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] mt-0.5 truncate">
                  {edu.degree}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
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
              {edu.date}
            </div>

            {/* Hint */}
            <p className="mt-4 text-xs text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view details →
            </p>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {selectedEdu && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedEdu(null)}
        >
          <div
            className="modal-content p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedEdu(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] hover:bg-white/10 transition-all"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                <img
                  src={selectedEdu.image}
                  alt={selectedEdu.school}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[var(--color-gold)]">
                  {selectedEdu.school}
                </h3>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  {selectedEdu.degree}
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
                  {selectedEdu.date}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-white/10 mb-6" />

            {/* Details */}
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-4">
              Highlights
            </h4>
            <ul className="space-y-3">
              {selectedEdu.details.map((detail, i) => (
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
