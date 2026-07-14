'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const EMAIL_SERVICE_ID = 'service_hzzmmlu';
const EMAIL_TEMPLATE_ID = 'contact_form';
const EMAIL_PUBLIC_KEY = 'uLdq0bm78OWZqxnrd';

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed right-6 top-6 z-50 animate-slide-down rounded-2xl border px-6 py-4 shadow-2xl backdrop-blur-xl transition-all ${
        type === 'success'
          ? 'border-green-500/30 bg-green-900/40 text-green-300'
          : 'border-red-500/30 bg-red-900/40 text-red-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{type === 'success' ? '✓' : '✕'}</span>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-lg opacity-60 transition-opacity hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) section.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Dynamically import EmailJS
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAIL_PUBLIC_KEY
      );

      setToast({ message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setToast({ message: 'Failed to send message. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="reveal relative z-10 px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto"
    >
      <div className="w-full">
        {/* Header */}
        <h2 className="section-title">Connect Me</h2>
        <hr className="section-divider" />

        <p className="mb-12 max-w-xl text-text-secondary">
          Feel free to connect me! I&apos;ll be waiting for our cooperation.
        </p>

        {/* Two-column layout */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-stretch lg:gap-16">
          {/* Left: Visual / Decorative */}
          <div className="flex flex-1 items-center justify-center">
            <div className="glass-card flex w-full flex-col items-center justify-center gap-6 p-12 text-center">
              {/* Large envelope emoji */}
              <div className="animate-float text-8xl md:text-9xl">✉️</div>

              <h3 className="text-2xl font-bold text-text-primary">
                Let&apos;s Build Something
                <span className="block text-gold">Amazing Together</span>
              </h3>

              <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                Whether it&apos;s a project collaboration, a job opportunity, or just a friendly hello
                — I&apos;d love to hear from you. Drop me a message and I&apos;ll respond promptly!
              </p>

              {/* Decorative dots */}
              <div className="mt-4 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-gold"
                    style={{ opacity: 0.3 + i * 0.175 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="flex-1">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="glass-card space-y-6 p-8 md:p-10"
            >
              {/* Name field */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input-glass"
                  required
                  suppressHydrationWarning
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email field */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="input-glass"
                  required
                  suppressHydrationWarning
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or say hello..."
                  className="input-glass"
                  rows={5}
                  required
                  suppressHydrationWarning
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs font-medium text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                suppressHydrationWarning
              >
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-surface border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
