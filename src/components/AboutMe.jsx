'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

const SAMPLE_PROMPTS = [
  'Ceritakan tentang pengalaman kerja Anda',
  'Teknologi apa yang paling Anda kuasai?',
  'Bagaimana cara Anda menangani deadline?',
];

const SESSION_KEY = 'rafael-ai-chat-history';

function loadChatHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveChatHistory(messages) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  } catch {
    // Storage full, silently fail
  }
}

// Animated typing dots for loading state
function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-gold"
          style={{
            animation: 'typing-bounce 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes typing-bounce {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// Rate limit dialog
function RateLimitDialog({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-card mx-4 max-w-md p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-5xl">⏳</div>
        <h3 className="mb-2 text-xl font-bold text-gold">Rate Limit Reached</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
          You&apos;ve sent too many messages in a short time. Please wait a moment before
          trying again.
        </p>
        <button onClick={onClose} className="btn-primary px-8">
          Got it
        </button>
      </div>
    </div>
  );
}

// User avatar icon
function UserAvatar() {
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    </div>
  );
}

// AI avatar
function AIAvatar() {
  return (
    <img
      src="/img/chiechat.png"
      alt="Rafael-AI"
      className="h-8 w-8 shrink-0 rounded-full object-cover"
    />
  );
}

// Markdown renderer - dynamically imports react-markdown or falls back
function MessageContent({ content }) {
  const [MarkdownComponent, setMarkdownComponent] = useState(null);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    let cancelled = false;
    import('react-markdown')
      .then((mod) => {
        if (!cancelled) setMarkdownComponent(() => mod.default);
      })
      .catch(() => {
        if (!cancelled) setTried(true);
      });
    return () => { cancelled = true; };
  }, []);

  if (MarkdownComponent) {
    return <MarkdownComponent>{content}</MarkdownComponent>;
  }

  if (tried) {
    // Fallback: render with basic line break support
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br />'),
        }}
      />
    );
  }

  // Still loading the markdown module
  return <span>{content}</span>;
}

export default function AboutMe() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRateLimit, setShowRateLimit] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const sectionRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate chat history from sessionStorage
  useEffect(() => {
    setMessages(loadChatHistory());
    setHydrated(true);
  }, []);

  // Save to session storage when messages change
  useEffect(() => {
    if (hydrated && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, hydrated]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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

  const sendMessage = useCallback(
    async (messageText) => {
      const text = messageText.trim();
      if (!text || isLoading) return;

      const userMessage = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: text }),
        });

        if (res.status === 429) {
          setShowRateLimit(true);
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        const aiMessage = { role: 'ai', content: data.answer || 'Sorry, I couldn\'t generate a response.' };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = {
          role: 'ai',
          content: 'Sorry, something went wrong. Please try again later.',
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="reveal relative z-10 px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <h2 className="section-title">Rafael-AI</h2>
        <hr className="section-divider" />

        {/* Chat container */}
        <div className="glass-card flex min-h-[70vh] flex-col overflow-hidden">
          {/* Chat messages area */}
          <div
            ref={chatContainerRef}
            className="flex flex-1 flex-col gap-4 overflow-y-auto p-6"
          >
            {isEmpty && hydrated ? (
              /* Empty state placeholder */
              <div className="flex flex-1 flex-col items-center justify-center gap-8 py-12">
                {/* AI avatar large */}
                <div className="relative">
                  <img
                    src="/img/chiechat.png"
                    alt="Rafael-AI"
                    className="h-20 w-20 rounded-full object-cover ring-2 ring-gold/30"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 ring-2 ring-surface">
                    <span className="h-2 w-2 rounded-full bg-white" />
                  </span>
                </div>

                {/* Animated prompt text */}
                <div className="text-center">
                  <p className="animate-fade-in text-lg font-medium text-text-primary">
                    Ask me a question or start a conversation!
                  </p>
                  <p className="mt-2 text-sm text-text-muted">
                    I can tell you about Rafael&apos;s experience, skills, and more.
                  </p>
                </div>

                {/* Sample prompt buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                  {SAMPLE_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handlePromptClick(prompt)}
                      className="rounded-xl border border-border-glass bg-surface-glass px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-gold/30 hover:bg-surface-glass-hover hover:text-gold"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat messages */
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-3 animate-fade-in ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    {msg.role === 'user' ? <UserAvatar /> : <AIAvatar />}

                    {/* Message bubble */}
                    <div
                      className={
                        msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                      }
                    >
                      {msg.role === 'ai' ? (
                        <MessageContent content={msg.content} />
                      ) : (
                        <span>{msg.content}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-end gap-3 animate-fade-in">
                    <AIAvatar />
                    <div className="chat-bubble-ai">
                      <TypingDots />
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 border-t border-border-glass p-4"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="input-glass flex-1"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark text-surface transition-all hover:shadow-lg hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Rate limit dialog */}
      {showRateLimit && <RateLimitDialog onClose={() => setShowRateLimit(false)} />}
    </section>
  );
}
