'use client';

import { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiBookOpen, FiAward, FiCalendar, FiTag } from 'react-icons/fi';

const KEYWORDS = [
  'Chatbot',
  'Human Resource Management',
  'Large Language Model',
  'Retrieval-Augmented Generation',
  'Waterfall Method',
];

const TECH_STACK = [
  { label: 'LLM', value: 'Qwen3 via Ollama' },
  { label: 'RAG', value: 'ChromaDB' },
  { label: 'Database', value: 'Oracle Database' },
  { label: 'Protocol', value: 'Model Context Protocol' },
  { label: 'Testing', value: '100% Blackbox · 90% UAT' },
];

export default function Thesis() {
  const sectionRef = useRef(null);
  const [coverHover, setCoverHover] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));
    return () => els?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="thesis"
      ref={sectionRef}
      className="relative z-10 px-6 py-16 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Heading ── */}
      <div className="reveal">
        <h2 className="section-title">Undergraduate Thesis</h2>
        <hr className="section-divider" />
      </div>

      {/* ── Two-column layout ── */}
      <div className="reveal flex flex-col lg:flex-row gap-10 lg:gap-14 mt-8 items-start">

        <div className="w-full lg:w-[50%] flex flex-col gap-6">
          {/* Title section */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest
                         bg-[rgba(255,196,81,0.1)] text-[var(--color-gold)] border border-[rgba(255,196,81,0.2)]
                         mb-4"
            >
              Final Thesis · 2026 (Indonesia)
            </span>
            <h3
              className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Rancang Bangun Chatbot Berbasis Web Aplikasi untuk Manajemen
              Sumber Daya Manusia dengan Metode Waterfall pada{' '}
              <span className="text-[var(--color-gold)]">
                PT. Prima Integrasi Network
              </span>
            </h3>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <a
              href="http://eprints.upj.ac.id/id/eprint/13661"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm
                         border border-[var(--color-border-glass)] text-[var(--color-text-secondary)]
                         hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]
                         hover:shadow-[0_0_15px_rgba(255,196,81,0.15)]
                         transition-all duration-300"
            >
              <FiExternalLink className="w-4 h-4" />
              View on Repository
            </a>
          </div>

          {/* Abstract */}
          <div
            className="relative rounded-2xl p-5 md:p-6"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,196,81,0.03) 100%)',
              border: '1px solid var(--color-border-glass)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <FiBookOpen className="w-4 h-4 text-[var(--color-gold)]" />
              <span className="text-sm font-bold uppercase tracking-wider text-[var(--color-gold)]">
                Abstract
              </span>
            </div>

            {/* Collapsible abstract text */}
            <div className="relative">
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: showAbstract ? '600px' : '4.8em' }}
              >
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Human resource management efficiency is a critical challenge for
                  growing organizations. At PT. Prima Integrasi Network, HR staff
                  frequently spent unproductive time answering repetitive routine
                  inquiries from managers and supervisors regarding employee
                  attendance, leave balances, and personnel data, while managers
                  lacked real-time access to HR information for operational
                  decision-making. This research aimed to design and develop a web
                  application-based chatbot named{' '}
                  <strong className="text-[var(--color-text-primary)]">
                    Primasistant
                  </strong>{' '}
                  to automate HR information management using the{' '}
                  <strong className="text-[var(--color-text-primary)]">
                    Waterfall method
                  </strong>
                  , encompassing requirements analysis, system design,
                  implementation, and testing phases. Primasistant integrates a
                  locally deployed Large Language Model via Ollama (Qwen3), a
                  Retrieval-Augmented Generation system using ChromaDB, and a Model
                  Context Protocol server for direct Oracle Database access, all
                  orchestrated through a five-stage agentic pipeline:{' '}
                  <em className="text-[var(--color-text-primary)]">
                    Intent Escalation, Planning, Execution, Verification, and
                    Response Generation
                  </em>
                  . System validation through blackbox testing on 12 functional
                  scenarios yielded a{' '}
                  <strong className="text-[var(--color-gold)]">
                    100% success rate
                  </strong>
                  , and User Acceptance Testing involving 10 respondents
                  demonstrated a very high acceptance level, with{' '}
                  <strong className="text-[var(--color-gold)]">
                    90% of respondents strongly agreeing
                  </strong>{' '}
                  that the system improved HR department operational efficiency.
                </p>
              </div>

              {/* Fade overlay when collapsed */}
              {!showAbstract && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, transparent, rgba(10,10,15,0.85))',
                  }}
                />
              )}
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setShowAbstract((prev) => !prev)}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold
                         text-[var(--color-gold)] hover:text-[var(--color-gold-light)]
                         transition-colors duration-200 cursor-pointer"
              suppressHydrationWarning
            >
              {showAbstract ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                  See less
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  See more
                </>
              )}
            </button>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Technology Stack
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.label}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300
                             hover:bg-[rgba(255,255,255,0.04)]"
                  style={{
                    border: '1px solid var(--color-border-glass)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <span className="text-xs font-bold text-[var(--color-gold)] uppercase tracking-wider whitespace-nowrap">
                    {tech.label}
                  </span>
                  <span className="w-px h-4 bg-[var(--color-border-glass)]" />
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {tech.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiTag className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Keywords
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300
                             text-[var(--color-text-secondary)] hover:text-[var(--color-gold)]
                             hover:border-[rgba(255,196,81,0.25)]"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--color-border-glass)',
                  }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--color-text-muted)]"
          >
            <span className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5" />
              Deposited 09 July 2026
            </span>
            <span>
              Faculty of Technology & Design · Information Systems
            </span>
            <span>
              Universitas Pembangunan Jaya
            </span>
          </div>


        </div>

        {/* Left — Cover Image */}
        <div className="w-full lg:w-[50%] flex flex-col items-center gap-5">
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setCoverHover(true)}
            onMouseLeave={() => setCoverHover(false)}
          >
            {/* Ambient glow behind the cover */}
            <div
              className="absolute -inset-3 rounded-3xl transition-all duration-700 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(255,196,81,0.12) 0%, transparent 70%)',
              }}
            />

            {/* Cover card wrapper with repository link */}
            <a
              href="http://eprints.upj.ac.id/id/eprint/13661"
              target="_blank"
              rel="noopener noreferrer"
              className="relative block rounded-2xl overflow-hidden border transition-all duration-500"
              style={{
                borderColor: coverHover
                  ? 'rgba(255,196,81,0.3)'
                  : 'var(--color-border-glass)',
                boxShadow: coverHover
                  ? '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,196,81,0.08)'
                  : '0 8px 40px rgba(0,0,0,0.4)',
                transform: coverHover ? 'translateY(-4px)' : 'translateY(0)',
                background: 'var(--color-surface-glass)',
              }}
            >
              <img
                src="/img/thesis-cover.png"
                alt="Thesis Cover — Rancang Bangun Chatbot Berbasis Web Aplikasi untuk Manajemen Sumber Daya Manusia"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                draggable={false}
              />
              
              {/* Dark overlay & view repository overlay */}
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,196,81,0.1)] border border-[var(--color-gold)] text-[var(--color-gold)]">
                  <FiExternalLink className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-white tracking-wider uppercase">
                  View Repository
                </span>
              </div>
            </a>
          </div>

          {/* Type badge */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <FiAward className="w-4 h-4 text-[var(--color-gold)]" />
            <span>
              Karya Tulis Ilmiah (KTI) ·{' '}
              <span className="text-[var(--color-text-primary)] font-semibold">
                Undergraduate
              </span>
            </span>
          </div>
        </div>

        {/* Right — Details */}

      </div>
    </section>
  );
}
