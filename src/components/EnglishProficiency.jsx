'use client';

import { useEffect, useRef, useState } from 'react';

const SKILLS = [
  { label: 'Grammar', score: 502, max: 600 },
  { label: 'Vocabulary', score: 533, max: 600 },
  { label: 'Reading', score: 520, max: 600 },
  { label: 'Listening', score: 520, max: 600 },
];

export default function EnglishProficiency() {
  const sectionRef = useRef(null);
  const [activePreview, setActivePreview] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setBarsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => els?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="english"
      ref={sectionRef}
      className="relative z-10 px-6 py-16 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Heading ── */}
      <div className="reveal">
        <h2 className="section-title">English Proficiency</h2>
        <hr className="section-divider" />
      </div>

      {/* ── Two-column layout ── */}
      <div className="reveal flex flex-col lg:flex-row gap-10 lg:gap-14 mt-8 items-start">
        {/* Left — Certificate Preview */}
        <div className="w-full lg:w-[55%] flex flex-col gap-4">
          {/* Main preview image */}
          <div
            className="relative rounded-3xl overflow-hidden border border-[var(--color-border-glass)] 
                        bg-[var(--color-surface-glass)] backdrop-blur-sm
                        shadow-[0_8px_40px_rgba(0,0,0,0.4)]
                        transition-all duration-500"
          >
            <img
              src={
                activePreview === 0
                  ? '/downloads/englishscore/englishscore_certificate-page-1.png'
                  : '/downloads/englishscore/englishscore_certificate-page-2.png'
              }
              alt={`EnglishScore Certificate — Page ${activePreview + 1}`}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>

          {/* Thumbnail switcher */}
          <div className="flex gap-3 justify-center">
            {[0, 1].map((i) => (
              <button
                key={i}
                onClick={() => setActivePreview(i)}
                className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer
                  ${
                    activePreview === i
                      ? 'border-[var(--color-gold)] shadow-[0_0_12px_rgba(255,196,81,0.25)]'
                      : 'border-[var(--color-border-glass)] opacity-50 hover:opacity-80'
                  }`}
                suppressHydrationWarning
              >
                <img
                  src={`/downloads/englishscore/englishscore_certificate-page-${i + 1}.png`}
                  alt={`Page ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right — Details & Score Breakdown */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center gap-6">
          {/* Bold statement */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest
                             bg-[rgba(255,196,81,0.1)] text-[var(--color-gold)] border border-[rgba(255,196,81,0.2)]
                             mb-3">
              C1 Advanced · Certified
            </span>
            <h3
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              I am{' '}
              <span className="text-[var(--color-gold)]">CEFR C1</span>{' '}
              Certified!
            </h3>
            <p className="mt-3 text-[var(--color-text-secondary)] text-base leading-relaxed">
              Internationally recognized English proficiency at the{' '}
              <strong className="text-[var(--color-text-primary)]">Advanced</strong> level, 
              certified by the{' '}
              <strong className="text-[var(--color-text-primary)]">British Council</strong>{' '}
              through EnglishScore Core Skills assessment. Ready to collaborate 
              and communicate in global professional environments.
            </p>
          </div>

          {/* Overall Score Badge */}
          <div className="flex items-center gap-5">
            <div
              className="relative flex items-center justify-center w-24 h-24 rounded-2xl
                          border border-[rgba(255,196,81,0.15)]
                          bg-gradient-to-br from-[rgba(255,196,81,0.08)] to-transparent"
            >
              <span className="text-4xl font-black text-[var(--color-gold)]">519</span>
            </div>
            <div>
              <span className="block text-lg font-bold text-[var(--color-text-primary)]">
                Overall Score
              </span>
              <span className="block text-sm text-[var(--color-text-secondary)] mt-0.5">
                EnglishScore Core Skills
              </span>
              <span className="block text-xs text-[var(--color-text-muted)] mt-1">
                Valid from 21 Jan 2026
              </span>
            </div>
          </div>

          {/* Skill Breakdown Bars */}
          <div className="flex flex-col gap-3">
            {SKILLS.map((skill, idx) => {
              const pct = Math.round((skill.score / skill.max) * 100);
              return (
                <div key={skill.label}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                      {skill.label}
                    </span>
                    <span className="text-xs font-bold text-[var(--color-gold)]">
                      {skill.score}/{skill.max}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                      style={{
                        width: barsVisible ? `${pct}%` : '0%',
                        transitionDelay: `${idx * 150 + 300}ms`,
                        background:
                          'linear-gradient(90deg, var(--color-gold-dark), var(--color-gold))',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mt-2">
            <a
              href="/downloads/englishscore/englishscore_certificate.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
                         bg-[var(--color-gold)] text-[#0a0a0f] 
                         hover:shadow-[0_0_20px_rgba(255,196,81,0.3)]
                         transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Certificate
            </a>
            <a
              href="https://www.englishscore.com/verify"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
                         border border-[var(--color-border-glass)] text-[var(--color-text-secondary)]
                         hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                         transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Verify Online
            </a>
          </div>

          {/* Verification code */}
          <p className="text-xs text-[var(--color-text-muted)]">
            Verification code:{' '}
            <code className="font-mono text-[var(--color-text-secondary)]">cea7aaba39aa</code>
          </p>
        </div>
      </div>
    </section>
  );
}
