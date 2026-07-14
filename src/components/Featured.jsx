'use client';

import { useState, useEffect, useRef } from 'react';
import { projects } from '@/data/ProjectsData';
import { CATEGORIES } from '@/data/CertificatesData';
import styles from './Featured.module.css';

export default function Featured() {
  const sectionRef = useRef(null);

  // Filter featured items from data sources
  const featuredProjects = projects.filter((p) => p.isFeatured);
  
  const featuredCertificates = Object.values(CATEGORIES)
    .flat()
    .filter((c) => c.isFeatured);

  // Assemble featured items with styling attributes
  const featuredItems = [
    ...featuredProjects.map((p) => ({
      id: `proj-${p.title}`,
      title: p.title,
      description: p.description,
      type: 'project',
      themeClass: p.title.includes('Primassistant') ? styles.themeMint : styles.themeGold,
      sectionLink: '#projects',
      linkText: 'View Project',
      icon: p.title.includes('Primassistant') ? 'ai' : 'mobile',
      github: p.link,
      website: p.website,
    })),
    ...featuredCertificates.map((c) => ({
      id: `cert-${c.name}`,
      title: c.name,
      description: 'Professional certification demonstrating core systems engineering, databases, and data engineering practices.',
      type: 'certificate',
      themeClass: styles.themeOcean,
      sectionLink: '#certifications',
      linkText: 'View Certificate',
      icon: 'certificate',
      file: `/certificates/${c.file}`,
    })),
  ];

  /* Scroll reveal animation */
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

  const renderIcon = (type) => {
    if (type === 'ai') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.3-6.3l-.7.7M6.7 17.3l-.7.7m12.6 0l-.7-.7M6.7 6.7l-.7-.7M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
        </svg>
      );
    }
    if (type === 'mobile') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12.01" y2="18"/>
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"/>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
      </svg>
    );
  };

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // Adjust for header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative z-10 px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      {/* ── Heading ── */}
      <div className="reveal">
        <h2 className="section-title">Featured Works</h2>
        <hr className="section-divider" />
        <p className="text-[var(--color-text-secondary)] mt-2 max-w-2xl">
          Highlights of my key projects and professional certifications. Hover over the cards to explore the 3D dimensions.
        </p>
      </div>

      {/* ── 3D Cards Grid ── */}
      <div className={`${styles.shapeGrid} mt-8`}>
        {featuredItems.map((item, idx) => (
          <div
            key={item.id}
            className={`${styles.uxParent} ${item.themeClass} reveal`}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <div className={styles.uxCard}>
              {/* Concentric Floating Orbits */}
              <div className={styles.uxLogo} aria-hidden="true">
                <span className={styles.uxCircle} />
                <span className={styles.uxCircle} />
                <span className={styles.uxCircle} />
                <span className={styles.uxCircle} />
                <span className={styles.uxCircle}>
                  {renderIcon(item.icon)}
                </span>
              </div>

              {/* Glass overlay */}
              <div className={styles.uxGlass} />

              {/* Content */}
              <div className={styles.uxContent}>
                <span className={styles.uxTitle}>{item.title}</span>
                <span className={styles.uxText}>{item.description}</span>
              </div>

              {/* Bottom bar with action links */}
              <div className={styles.uxBottom}>
                <div className={styles.uxSocial}>
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.uxSocialBtn}
                      aria-label="GitHub Repository"
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.uxSocialBtn}
                      aria-label="Website Link"
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                      </svg>
                    </a>
                  )}
                  {item.file && (
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.uxSocialBtn}
                      aria-label="View Certificate PDF"
                    >
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                      </svg>
                    </a>
                  )}
                </div>
                
                <div className={styles.uxMore}>
                  <a
                    href={item.sectionLink}
                    onClick={(e) => handleScrollToSection(e, item.sectionLink)}
                    className={styles.uxMoreBtn}
                  >
                    {item.linkText}
                  </a>
                  <svg viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
