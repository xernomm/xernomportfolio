'use client';

import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Education', href: '#educations' },
  { label: 'Experience', href: '#experiences' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certifications' },
  { label: 'Rafael-AI', href: '#about' },
  { label: 'Connect', href: '#connect' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for shrink effect and forcing activeSection 'home' at the top
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 50) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force scroll to top on first mount / reload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers = [];

    const handleIntersect = (entries) => {
      // Force 'home' active section if scrolled to top
      if (typeof window !== 'undefined' && window.scrollY < 50) {
        setActiveSection('home');
        return;
      }
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      setMobileOpen(false);
      if (href === '#about') {
        window.dispatchEvent(new CustomEvent('open-rafael-ai'));
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <header
        className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 shadow-lg shadow-black/30' : 'py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-2xl font-bold tracking-tight select-none transition-all duration-300"
            style={{ color: 'var(--color-gold)' }}
          >
            Rafael<span className="text-white/40">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.slice(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={sectionId}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-[var(--color-gold)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {label}
                    {/* Active indicator dot */}
                    <span
                      className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[var(--color-gold)] transition-all duration-300 ${
                        isActive ? 'w-4 opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden relative z-[60] flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-white/5"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-0.5 w-5 rounded bg-[var(--color-text-primary)] transition-all duration-300 ${
                mobileOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-[var(--color-text-primary)] transition-all duration-300 mt-1 ${
                mobileOpen ? 'opacity-0 scale-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded bg-[var(--color-text-primary)] transition-all duration-300 mt-1 ${
                mobileOpen ? '-translate-y-[9px] -rotate-45' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 flex flex-col pt-20 px-6 pb-8 transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(24px)',
          borderLeft: '1px solid var(--color-border-glass)',
        }}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }, idx) => {
            const sectionId = href.slice(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={sectionId}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--color-gold)] bg-[rgba(255,196,81,0.08)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${idx * 40}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease, color 0.2s, background 0.2s',
                }}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                )}
                {label}
              </a>
            );
          })}
        </nav>

        {/* Mobile bottom accent */}
        <div className="mt-auto pt-6 border-t border-white/5">
          <p className="text-xs text-[var(--color-text-muted)] text-center">
            © {new Date().getFullYear()} Rafael Richie
          </p>
        </div>
      </aside>
    </>
  );
}
