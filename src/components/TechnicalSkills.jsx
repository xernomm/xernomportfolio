'use client';

import { useState, useMemo, useEffect, useRef } from 'react';

const skillsData = {
  'AI Development': [
    { name: 'Ollama LLM', image: '/img/ollama.png', rate: 75 },
    { name: 'Langchain', image: '/img/langchain-seeklogo.svg', rate: 75 },
    { name: 'Model Context Protocol', image: '/img/mcp.png', rate: 75 },
  ],
  Frontend: [
    { name: 'ReactJs', image: '/img/reactlogo.png', rate: 85 },
    { name: 'NextJs', image: '/img/nextjs-icon-svgrepo-com.svg', rate: 75 },
    { name: 'Tailwind CSS', image: '/img/tailwind-svgrepo-com.svg', rate: 75 },
    { name: 'HTML', image: '/img/html.svg', rate: 95 },
    { name: 'CSS', image: '/img/css.svg', rate: 92 },
    { name: 'JavaScript', image: '/img/js.png', rate: 83 },
    { name: 'jQuery', image: '/img/jquery.svg', rate: 80 },
    { name: 'Bootstrap', image: '/img/bootstrap-logo.svg', rate: 97 },
    { name: 'Liferay', image: '/img/liferay.svg', rate: 75 },
    { name: 'Axure', image: '/img/axure-2.svg', rate: 85 },
  ],
  Backend: [
    { name: 'NodeJs', image: '/img/nodejslogo.svg', rate: 75 },
    { name: 'Spring Boot', image: '/img/springlogo.svg', rate: 85 },
    { name: 'Java', image: '/img/java.svg', rate: 80 },
    { name: 'Flask', image: '/img/flask.png', rate: 75 },
    { name: 'PHP', image: '/img/php-logo-svgrepo-com.svg', rate: 75 },
  ],
  'Database & Pipelines': [
    { name: 'SQL', image: '/img/sql.png', rate: 75 },
    { name: 'SQLite', image: '/img/sqlite_logo_icon_169724.svg', rate: 75 },
    { name: 'MongoDB', image: '/img/mongodb_original_logo_icon_146424.svg', rate: 75 },
    { name: 'Couchbase', image: '/img/couchbase_logo_icon_170319.svg', rate: 75 },
    { name: 'DBT Pipelines', image: '/img/dbt-seeklogo.svg', rate: 75 },
  ],
  'Automation & Tools': [
    { name: 'TagUI', image: '/img/Tagui.png', rate: 75 },
    { name: 'GitHub', image: '/img/iconmonstr-github-1.svg', rate: 80 },
    { name: 'Streamlit', image: '/img/streamlit-seeklogo.png', rate: 78 },
    { name: 'AppSheet', image: '/img/appsheet-vector-logo-2022.svg', rate: 75 },
    { name: 'Power BI', image: '/img/powerbi.svg', rate: 80 },
  ],
};

const categories = Object.keys(skillsData);

export default function TechnicalSkills() {
  const [activeCategory, setActiveCategory] = useState('AI Development');
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedBars, setAnimatedBars] = useState(false);
  const sectionRef = useRef(null);

  // Trigger progress bar animation on mount and category change
  useEffect(() => {
    setAnimatedBars(false);
    const timeout = setTimeout(() => setAnimatedBars(true), 100);
    return () => clearTimeout(timeout);
  }, [activeCategory]);

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
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => reveals?.forEach((el) => observer.unobserve(el));
  }, []);

  const filteredSkills = useMemo(() => {
    const skills = skillsData[activeCategory] || [];
    if (!searchQuery.trim()) return skills;
    return skills.filter((skill) =>
      skill.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 px-6 py-24 max-w-6xl mx-auto"
    >
      <div className="reveal">
        <h2 className="section-title">Skills</h2>
        <hr className="section-divider" />
      </div>

      <div className="reveal flex flex-col lg:flex-row gap-8 mt-4">
        {/* ── Category Sidebar / Horizontal Scroll ── */}
        <div className="lg:w-56 shrink-0">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
                className={`category-pill ${
                  activeCategory === cat ? 'active' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Skills Grid ── */}
        <div className="flex-1 min-w-0">
          {/* Search Input */}
          <div className="relative mb-6">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder={`Search ${activeCategory} skills...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-glass pl-11"
            />
          </div>

          {/* Skills List */}
          {filteredSkills.length === 0 ? (
            <p className="text-text-muted text-center py-12">
              No skills found matching &ldquo;{searchQuery}&rdquo;
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="glass-card p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-lg bg-surface-raised flex items-center justify-center overflow-hidden">
                      <img
                        src={skill.image}
                        alt={skill.name}
                        width={32}
                        height={32}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <span className="font-medium text-text-primary text-sm">
                      {skill.name}
                    </span>
                    <span className="ml-auto text-xs font-mono text-gold">
                      {skill.rate}%
                    </span>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: animatedBars ? `${skill.rate}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
