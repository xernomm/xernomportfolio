'use client';

import { useState, useEffect, useCallback } from 'react';

const FULL_TEXT = 'Hello! I am Rafael Richie.';
const ROLES = [
  'Fullstack Web Developer',
  'Frontend Developer',
  'Backend Developer',
  'UI/UX Developer',
  'LLM Developer',
  'AI Developer',
  'Software Engineer',
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/rafael-richie-502360250',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/xernomm',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/6281284300979',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rafael_rchiee/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@raf_rchiee',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.28a8.28 8.28 0 0 0 4.76 1.5V7.33a4.85 4.85 0 0 1-1-.64z" />
      </svg>
    ),
  },
];

export default function Welcome() {
  /* ---------- Typing animation ---------- */
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText((current) => {
          const nextLength = current.length + 1;
          if (nextLength > FULL_TEXT.length) {
            timer = setTimeout(() => {
              setIsDeleting(true);
            }, 4000);
            return current;
          }
          timer = setTimeout(handleTyping, 150);
          return FULL_TEXT.slice(0, nextLength);
        });
      } else {
        setDisplayText((current) => {
          const nextLength = current.length - 1;
          if (nextLength < 0) {
            timer = setTimeout(() => {
              setIsDeleting(false);
            }, 1200);
            return '';
          }
          timer = setTimeout(handleTyping, 80);
          return FULL_TEXT.slice(0, nextLength);
        });
      }
    };

    timer = setTimeout(handleTyping, isDeleting ? 0 : 600);

    return () => clearTimeout(timer);
  }, [isDeleting]);

  /* ---------- Role rotation ---------- */
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleFade, setRoleFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleFade(false); // fade out
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setRoleFade(true); // fade in
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- Smooth scroll & Chat trigger ---------- */
  const scrollToConnect = useCallback((e) => {
    e.preventDefault();
    const el = document.getElementById('connect');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const openChat = useCallback((e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-rafael-ai'));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-20 lg:py-0 overflow-hidden"
    >
      {/* Decorative ambient blurs — positioned far from card to avoid overlap */}
      <div className="pointer-events-none absolute -top-60 -left-60 w-[420px] h-[420px] rounded-full bg-gold/[0.06] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-60 -right-60 w-[350px] h-[350px] rounded-full bg-gold/[0.04] blur-[100px]" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl w-full mx-auto">

        {/* ========== Left — Content ========== */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl w-full">
          {/* Typing text */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-tight min-h-[1.2em]">
            <span className="inline">
              {displayText || '\u00A0'}
              <span
                className="inline-block w-[3.5px] h-[0.85em] bg-gold ml-0.5 animate-typing-cursor rounded-sm align-middle"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Rotating role */}
          <p className="h-8 flex items-center justify-center">
            <span
              className={`text-lg sm:text-xl font-semibold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent transition-opacity duration-400 ${roleFade ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {ROLES[roleIndex]}
            </span>
          </p>

          {/* Subtitle */}
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            Crafting elegant digital experiences with modern web technologies,
            artificial intelligence, and a passion for clean code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
            <a
              href="/downloads/RafaelRichieCurriculumVitae.pdf"
              download
              className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download my CV
            </a>

            <a
              href="#connect"
              onClick={scrollToConnect}
              className="btn-secondary inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Contact Me
            </a>
          </div>
        </div>

        {/* ========== Right — Profile Card ========== */}
        <div className="flex-shrink-0 w-full max-w-[630px] animate-float">
          <div className="ux-parent ux-parent--gold">
            <div className="ux-card">
              {/* Profile image — sleek design with gradient edge-fade to blend yellow bg */}
              <div
                className="absolute right-10 top-1/2 w-[250px] h-[310px] pointer-events-none select-none z-1"
                style={{
                  transform: 'translate3d(0, -55%, 30px)',
                }}
              >
                {/* Outer glow ring */}
                <div
                  className="absolute -inset-[3px] rounded-[28px] opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,196,81,0.5), rgba(255,196,81,0.05) 50%, rgba(255,196,81,0.3))',
                  }}
                />
                {/* Image container with gradient mask to fade yellow edges into dark card */}
                <div
                  className="relative w-full h-full rounded-[24px] overflow-hidden"
                  style={{
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,196,81,0.15)',
                  }}
                >
                  <img
                    src="/img/chiechat.png"
                    alt="Rafael Richie"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Bottom gradient fade — blends yellow into card dark bg */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.4) 25%, transparent 50%),
                        linear-gradient(to right, rgba(10,10,15,0.7) 0%, transparent 30%),
                        linear-gradient(to left, rgba(10,10,15,0.5) 0%, transparent 20%),
                        linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, transparent 25%)
                      `,
                    }}
                  />
                </div>
              </div>

              {/* Coding syntax decorative blocks (floating 3D parallax) */}
              <code
                className="absolute left-8 top-6 font-mono text-[9px] text-gold/30 select-none pointer-events-none z-2 whitespace-nowrap"
                style={{ transform: 'translate3d(0, 0, 35px)' }}
              >
                const richie = new Developer();
              </code>

              <code
                className="absolute left-8 top-[140px] font-mono text-[8px] text-blue-400/20 select-none pointer-events-none z-2 whitespace-nowrap"
                style={{ transform: 'translate3d(0, 0, 20px)' }}
              >
                await richie.deploy();
              </code>

              <code
                className="absolute right-12 top-6 font-mono text-[8px] text-emerald-400/20 select-none pointer-events-none z-2 whitespace-nowrap"
                style={{ transform: 'translate3d(0, 0, 25px)' }}
              >
                import {'{'} AI, RPA {'}'} from 'skills';
              </code>

              <code
                className="absolute left-8 top-[230px] font-mono text-[8px] text-white/10 select-none pointer-events-none z-2 leading-relaxed"
                style={{ transform: 'translate3d(0, 0, 10px)' }}
              >
                {`{`}
                <br />
                &nbsp;&nbsp;status: 'coding',
                <br />
                &nbsp;&nbsp;coffee: true
                <br />
                {`}`}
              </code>

              <code
                className="absolute right-12 top-[160px] font-mono text-[8px] text-rose-400/15 select-none pointer-events-none z-2 whitespace-nowrap"
                style={{ transform: 'translate3d(0, 0, 15px)' }}
              >
                npm run dev
              </code>

              {/* Orbits background decoration */}
              <div className="ux-logo" aria-hidden="true">
                <span className="ux-circle"></span>
                <span className="ux-circle"></span>
                <span className="ux-circle"></span>
                <span className="ux-circle"></span>
              </div>

              <div className="ux-glass"></div>

              {/* Card content text — absolute positioned to align perfectly with the image's vertical center */}
              <div
                className="absolute left-12 top-1/2 max-w-[220px] z-3"
                style={{
                  transform: 'translate3d(0, -20%, 30px)',
                }}
              >
                <span className="ux-title">Rafael Richie</span>
                <span className="ux-text text-white/90">Software Engineer</span>
                <p className="text-xs text-text-secondary mt-2 max-w-[190px] leading-relaxed">
                  Specializing in Fullstack web development, agentic AI, and process automation (RPA).
                </p>
              </div>

              {/* Bottom bar inside card */}
              <div className="ux-bottom">
                <div className="ux-social">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ux-social-btn"
                      aria-label={s.label}
                      title={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>

                 <div className="ux-more">
                   <button
                     onClick={openChat}
                     className="ux-more-btn no-underline flex items-center gap-1.5 cursor-pointer"
                     style={{ background: 'none', border: 'none', padding: 0 }}
                   >
                     <span>Ask AI</span>
                     <svg
                       xmlns="http://www.w3.org/2000/svg"
                       width="14"
                       height="14"
                       viewBox="0 0 24 24"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="2.5"
                       strokeLinecap="round"
                       strokeLinejoin="round"
                     >
                       <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                     </svg>
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>




      </div>
    </section>
  );
}
