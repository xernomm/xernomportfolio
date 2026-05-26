'use client';

import { useState, useEffect, useRef } from 'react';

const CATEGORIES = {
  'Technology & Systems': [
    { name: 'Enterprise Systems', file: 'certificate4.pdf' },
    { name: 'Information Systems Operations and Business Resiliency', file: 'certificate10.pdf' },
    { name: 'Understanding the Enterprise Systems Environment', file: 'certificate16.pdf' },
    { name: 'IBM Introduction to Data Engineering', file: 'certificate8.pdf' },
  ],
  'Business & Entrepreneurship': [
    { name: 'Financial Accounting: Foundations', file: 'certificate1.pdf' },
    { name: 'Entrepreneurship Strategy: From Ideation to Exit', file: 'certificate5.pdf' },
    { name: 'Identifying Social Entrepreneurship Opportunities', file: 'certificate9.pdf' },
    { name: 'Intellectual Property for Entrepreneurs', file: 'certificate11.pdf' },
  ],
  'Project & Marketing': [
    { name: 'Foundations of Project Management', file: 'certificate7.pdf' },
    { name: 'Project Initiation: Starting a Successful Project', file: 'certificate15.pdf' },
    { name: 'Foundations of Digital Marketing and E-commerce', file: 'certificate6.pdf' },
  ],
  'Creative & Ethics': [
    { name: 'Cracking the Creativity Code: Discovering Ideas', file: 'certificate3.pdf' },
    { name: 'Computing, Ethics, and Society Foundations', file: 'certificate2.pdf' },
    { name: 'Leading transformations: Manage change', file: 'certificate13.pdf' },
  ],
  'Intellectual Skills': [
    { name: 'Introduction to Intellectual Property', file: 'certificate12.pdf' },
    { name: 'Linear Algebra: Linear Systems and Matrix Equations', file: 'certificate14.pdf' },
  ],
};

const CATEGORY_KEYS = Object.keys(CATEGORIES);

function getPreviewImage(pdfFile) {
  const base = pdfFile.replace('.pdf', '');
  return `/certificates/previews/${base}_page-0001.jpg`;
}

export default function Certificates() {
  const [activeCategory, setActiveCategory] = useState('Technology & Systems');
  const [visibleCards, setVisibleCards] = useState(new Set());
  const sectionRef = useRef(null);
  const pillsRef = useRef(null);

  const certificates = CATEGORIES[activeCategory];

  // Scroll reveal for section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Animate cards when category changes
  useEffect(() => {
    setVisibleCards(new Set());
    const timers = certificates.map((_, i) =>
      setTimeout(() => {
        setVisibleCards((prev) => new Set([...prev, i]));
      }, i * 80)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeCategory, certificates]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="reveal relative z-10 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h2 className="section-title">Certificates</h2>
        <hr className="section-divider" />

        {/* Two-column layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left: Category pills */}
          <div className="shrink-0 lg:w-64">
            {/* Mobile: horizontal scroll */}
            <div
              ref={pillsRef}
              className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin lg:flex-col lg:overflow-x-visible lg:pb-0"
            >
              {CATEGORY_KEYS.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`category-pill ${
                    activeCategory === category ? 'active' : ''
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs opacity-60">
                    ({CATEGORIES[category].length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Certificate cards grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {certificates.map((cert, index) => (
                <a
                  key={cert.file}
                  href={`/certificates/${cert.file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card group cursor-pointer overflow-hidden transition-all duration-500 ${
                    visibleCards.has(index)
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  }`}
                >
                  {/* Preview image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                    <img
                      src={getPreviewImage(cert.file)}
                      alt={cert.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                      <span className="translate-y-4 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-surface opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        View Certificate
                      </span>
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium leading-snug text-text-primary transition-colors group-hover:text-gold">
                      {cert.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            {/* Certificate count */}
            <p className="mt-6 text-center text-sm text-text-muted">
              Showing {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} in{' '}
              <span className="text-gold">{activeCategory}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
