'use client';

import { useState, useEffect, useRef } from 'react';

import { educationData } from "@/data/EducationData";

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
    <>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {educationData.map((edu, idx) => (
            <div
              key={edu.id}
              className="reveal glass-card p-5 cursor-pointer group flex flex-col justify-between"
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
              <div>
                {/* School image */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                    <img
                      src={edu.image}
                      alt={edu.school}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-gold)] transition-colors truncate">
                      {edu.school}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">
                      {edu.degree}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
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
                  {edu.date}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                {/* Hint */}
                <p className="text-xs text-[var(--color-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Details →
                </p>
                
                {edu.link && (
                  <a
                    href={edu.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-[var(--color-gold)] hover:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Modal ── */}
      {selectedEdu && (
        <div
          className="modal-overlay z-[150]"
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
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-[var(--color-gold)] truncate">
                  {selectedEdu.school}
                </h3>
                <p className="text-[var(--color-text-secondary)] mt-1">
                  {selectedEdu.degree}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
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
                  {selectedEdu.link && (
                    <a
                      href={selectedEdu.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-[var(--color-gold)] hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Website
                    </a>
                  )}
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
    </>
  );
}
