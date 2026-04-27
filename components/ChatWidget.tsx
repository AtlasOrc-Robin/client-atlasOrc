'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { business } from '@/lib/content'

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  text: `Hi there! I'm the ${business.name} AI assistant. I can answer questions about our AI automation services. How can I help you today?`,
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text }
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: `Thanks for reaching out! To get the best answer about "${text}", I recommend booking a free consultation — we can discuss exactly how AI automation can help your business.`,
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label={`${business.name} chat assistant`}
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: '96px',
            right: '24px',
            width: '340px',
            maxWidth: 'calc(100vw - 48px)',
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius)',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                }}
              >
                {business.name} AI
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'inline-block',
                  }}
                  aria-hidden="true"
                />
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-muted)',
                cursor: 'pointer',
                padding: '4px',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius)',
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              padding: '16px',
              maxHeight: '300px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
            aria-live="polite"
            aria-atomic="false"
            role="log"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent:
                    msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    background:
                      msg.role === 'user'
                        ? 'var(--color-primary)'
                        : 'var(--color-bg)',
                    color:
                      msg.role === 'user'
                        ? 'var(--color-bg)'
                        : 'var(--color-text-muted)',
                    border:
                      msg.role === 'assistant'
                        ? '1px solid var(--color-border)'
                        : 'none',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={sendMessage}
            style={{
              borderTop: '1px solid var(--color-border)',
              padding: '12px 16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your message
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              aria-label="Chat message"
              style={{
                flex: 1,
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                color: 'var(--color-text)',
                fontFamily: 'var(--font-body), system-ui, sans-serif',
                fontSize: '0.875rem',
                padding: '8px 12px',
                outline: 'none',
                minHeight: '44px',
              }}
            />
            <button
              type="submit"
              aria-label="Send message"
              style={{
                background: 'var(--color-primary)',
                border: 'none',
                borderRadius: 'var(--radius)',
                color: 'var(--color-bg)',
                cursor: 'pointer',
                padding: '0 12px',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
            >
              <Send size={14} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : `Chat with ${business.name} AI assistant`}
        aria-expanded={open}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--color-primary)',
          border: 'none',
          color: 'var(--color-bg)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 201,
          transition: 'transform 0.2s ease, background 0.2s ease',
          boxShadow: '0 4px 20px rgba(205,173,109,0.3)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform = 'scale(1.05)'
          el.style.background = 'var(--color-accent)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform = 'scale(1)'
          el.style.background = 'var(--color-primary)'
        }}
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <MessageCircle size={20} aria-hidden="true" />
        )}
      </button>

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  )
}
