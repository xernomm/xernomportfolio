'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

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
          className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
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
    <div className="modal-overlay z-[150]" onClick={onClose}>
      <div
        className="glass-card mx-4 max-w-sm p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-4xl">⏳</div>
        <h3 className="mb-1 text-lg font-bold text-gold">Rate Limit Reached</h3>
        <p className="mb-5 text-xs leading-relaxed text-text-secondary">
          You&apos;ve sent too many messages in a short time. Please wait a moment before
          trying again.
        </p>
        <button onClick={onClose} className="btn-primary w-full py-2.5 text-xs font-semibold">
          Got it
        </button>
      </div>
    </div>
  );
}

// User avatar icon
function UserAvatar() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold select-none">
      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
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
      className="h-7 w-7 shrink-0 rounded-full object-cover select-none ring-1 ring-gold/20"
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRateLimit, setShowRateLimit] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate chat history from sessionStorage
  useEffect(() => {
    setMessages(loadChatHistory());
    setHydrated(true);
  }, []);

  // Listen for custom event to open the chat window
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    };
    window.addEventListener('open-rafael-ai', handleOpen);
    return () => window.removeEventListener('open-rafael-ai', handleOpen);
  }, []);

  // Save to session storage when messages change
  useEffect(() => {
    if (hydrated && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, hydrated]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      if (messages.length > prevMessagesLength.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isLoading, isOpen]);

  // Listen to open-rafael-ai event to open the chat window
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    };

    window.addEventListener('open-rafael-ai', handleOpen);
    return () => {
      window.removeEventListener('open-rafael-ai', handleOpen);
    };
  }, []);

  const sendMessage = useCallback(
    async (messageText) => {
      const text = messageText.trim();
      if (!text || isLoading) return;

      const userMessage = { role: 'user', content: text };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      const aiPlaceholder = { role: 'ai', content: '' };
      setMessages((prev) => [...prev, aiPlaceholder]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: text }),
        });

        if (res.status === 429) {
          setShowRateLimit(true);
          setMessages((prev) => prev.slice(0, -1));
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          setMessages((prev) => {
            const updated = [...prev];
            if (updated.length > 0) {
              updated[updated.length - 1] = {
                role: 'ai',
                content: accumulated,
              };
            }
            return updated;
          });
        }
      } catch (error) {
        console.error('Chat error:', error);
        setMessages((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = {
              role: 'ai',
              content: 'Sorry, something went wrong. Please try again later.',
            };
          }
          return updated;
        });
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
    <>
      {/* Floating Chat Window */}
      <div className={`rafael-chat-window ${isOpen ? 'open' : ''} ${isMaximized ? 'maximized' : ''}`}>
        {/* Header */}
        <div className="rafael-chat-header">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/img/chiechat.png"
                alt="Rafael-AI"
                className="h-9 w-9 rounded-full object-cover ring-1 ring-gold/30 select-none"
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-green-500 ring-2 ring-[#0a0a0f]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
            <div className="text-left select-none">
              <h3 className="text-xs font-bold text-text-primary tracking-wide leading-none mb-0.5">
                Rafael-AI
              </h3>
              <span className="text-[9px] text-green-400 font-semibold flex items-center gap-1 leading-none">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Maximize/Minimize Toggle Button */}
            <button
              onClick={() => setIsMaximized((prev) => !prev)}
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-white/5"
              aria-label={isMaximized ? 'Minimize Chat' : 'Maximize Chat'}
            >
              {isMaximized ? (
                /* Minimize Icon (arrows pointing in) */
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v3m0 0H6m3 0L4 4m11-1v3m0 0h3m-3 0l5-5M9 21v-3m0 0H6m3 0l-5 5m11-5v-3m0 0h3m-3 0l5 5" />
                </svg>
              ) : (
                /* Maximize Icon (arrows pointing out) */
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4M4 20l5-5m11 5v-4m0 0h-4m4 0l-5-5" />
                </svg>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsMaximized(false);
              }}
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-white/5"
              aria-label="Close Chat"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="rafael-chat-messages"
        >
          {isEmpty && hydrated ? (
            /* Empty State */
            <div className="flex flex-1 flex-col items-center justify-center gap-5 py-6 text-center">
              <div className="relative">
                <img
                  src="/img/chiechat.png"
                  alt="Rafael-AI"
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/30 select-none"
                />
                <span className="absolute -bottom-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 ring-2 ring-[#0a0a0f]">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </div>
              <div className="px-4 select-none">
                <p className="text-xs font-semibold text-text-primary">
                  Ask me a question or start a conversation!
                </p>
                <p className="mt-1 text-[11px] text-text-muted max-w-[220px] mx-auto leading-relaxed">
                  I can tell you about Rafael&apos;s experience, skills, and more.
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full max-w-[260px] px-4">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className="rounded-xl border border-border-glass bg-surface-glass px-3.5 py-2 text-[11px] text-text-secondary transition-all hover:border-gold/30 hover:bg-surface-glass-hover hover:text-gold text-left leading-snug font-medium"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages List */
            <>
              {messages.map((msg, index) => {
                const isLast = index === messages.length - 1;
                const showTyping = isLast && msg.role === 'ai' && msg.content === '' && isLoading;

                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 animate-fade-in ${
                      msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {msg.role === 'user' ? <UserAvatar /> : <AIAvatar />}
                    <div
                      className={
                        msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                      }
                    >
                      {msg.role === 'ai' ? (
                        <div className="text-sm leading-relaxed text-text-primary">
                          {showTyping ? <TypingDots /> : <MessageContent content={msg.content} />}
                        </div>
                      ) : (
                        <span className="text-sm leading-relaxed">{msg.content}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border-glass p-3 bg-surface-raised/10"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Rafael-AI..."
            className="input-glass flex-1 py-2 px-3 text-xs"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold-dark text-[#0a0a0f] transition-all hover:shadow-md hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="rafael-chat-toggle animate-float"
        aria-label="Toggle Chat"
      >
        <span className="pulse-ring" />
        {isOpen ? (
          <svg className="h-6 w-6 text-[#0a0a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6 text-[#0a0a0f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Rate limit dialog */}
      {showRateLimit && <RateLimitDialog onClose={() => setShowRateLimit(false)} />}
    </>
  );
}
