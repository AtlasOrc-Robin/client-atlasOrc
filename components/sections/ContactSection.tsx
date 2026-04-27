'use client'

import { useState, useRef } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { business, featureFlags } from '@/lib/content'
import { submitContactForm, subscribeNewsletter } from '@/app/actions'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

type ContactData = {
  title?: string
  subtitle?: string
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ContactSection({ data }: Props) {
  const d = (data ?? {}) as ContactData
  const ref = useScrollAnimation()
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<SubmitStatus>('idle')
  const firstErrorRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const result = await submitContactForm(form)
    if (result.success) {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Something went wrong.')
      firstErrorRef.current?.focus()
    }
  }

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus('loading')
    const result = await subscribeNewsletter({ email: newsletterEmail })
    setNewsletterStatus(result.success ? 'success' : 'error')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body), system-ui, sans-serif',
    fontSize: '0.9375rem',
    padding: '12px 16px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    minHeight: '48px',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      aria-label="Contact us"
      className="section"
      style={{
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p className="label-text" data-animate style={{ marginBottom: '20px' }}>
            Get In Touch
          </p>
          <h2
            data-animate
            className="section-title"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              marginBottom: '16px',
            }}
          >
            {d.title ?? "Let's Build Your AI Future"}
          </h2>
          <p
            data-animate
            style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: '480px',
              margin: '0 auto',
            }}
          >
            {d.subtitle ??
              'Ready to transform your business with intelligent automation? Get in touch today.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left: contact details */}
          <div>
            <h3
              data-animate
              style={{
                fontFamily: 'var(--font-heading), Georgia, serif',
                fontWeight: 300,
                fontSize: '1.25rem',
                letterSpacing: '0.04em',
                color: 'var(--color-text)',
                marginBottom: '32px',
              }}
            >
              Contact Information
            </h3>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                marginBottom: '48px',
              }}
            >
              <li data-animate style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }}
                  aria-hidden="true"
                />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Phone</p>
                  <a
                    href={`tel:${business.phone}`}
                    style={{ color: 'var(--color-text)', fontSize: '0.9375rem', textDecoration: 'none' }}
                  >
                    {business.phone}
                  </a>
                </div>
              </li>

              <li data-animate style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }}
                  aria-hidden="true"
                />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Location</p>
                  <p style={{ color: 'var(--color-text)', fontSize: '0.9375rem' }}>
                    {business.address.street}, {business.address.city}, India
                  </p>
                </div>
              </li>

              <li data-animate style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Clock
                  size={16}
                  strokeWidth={1.5}
                  style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '3px' }}
                  aria-hidden="true"
                />
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Hours</p>
                  <p style={{ color: 'var(--color-text)', fontSize: '0.9375rem' }}>{business.hours}</p>
                </div>
              </li>
            </ul>

            {/* Newsletter */}
            {featureFlags.newsletter && (
              <div
                data-animate
                style={{
                  padding: '28px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    marginBottom: '8px',
                  }}
                >
                  AI Insights
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}
                >
                  Monthly tips on AI automation for your business.
                </p>

                {newsletterStatus === 'success' ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-primary)',
                      fontSize: '0.875rem',
                    }}
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle size={16} aria-hidden="true" />
                    Subscribed successfully!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} noValidate>
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        id="newsletter-email"
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        aria-required="true"
                        style={{
                          ...inputStyle,
                          flex: 1,
                          fontSize: '0.875rem',
                          minHeight: '44px',
                        }}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-primary)')
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-border)')
                        }
                      />
                      <button
                        type="submit"
                        className="btn-ghost"
                        disabled={newsletterStatus === 'loading'}
                        aria-label="Subscribe to newsletter"
                        style={{ padding: '0 16px', minHeight: '44px', flexShrink: 0 }}
                      >
                        <Mail size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right: contact form */}
          {featureFlags.contactForm && (
            <div data-animate>
              {status === 'success' ? (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    textAlign: 'center',
                    padding: '64px 32px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius)',
                  }}
                >
                  <CheckCircle
                    size={40}
                    style={{ color: 'var(--color-primary)', margin: '0 auto 20px' }}
                    aria-hidden="true"
                  />
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading), Georgia, serif',
                      fontWeight: 300,
                      fontSize: '1.5rem',
                      letterSpacing: '0.04em',
                      color: 'var(--color-text)',
                      marginBottom: '12px',
                    }}
                  >
                    Message Received
                  </h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  {status === 'error' && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      style={{
                        padding: '12px 16px',
                        border: '1px solid rgba(255,80,80,0.4)',
                        borderRadius: 'var(--radius)',
                        color: '#ff8080',
                        fontSize: '0.875rem',
                        marginBottom: '24px',
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px',
                    }}
                    className="form-two-col"
                  >
                    <div>
                      <label htmlFor="name" style={labelStyle}>
                        Name <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        ref={firstErrorRef}
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        aria-required="true"
                        style={inputStyle}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-primary)')
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-border)')
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="email" style={labelStyle}>
                        Email <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        aria-required="true"
                        style={inputStyle}
                        onFocus={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-primary)')
                        }
                        onBlur={(e) =>
                          ((e.target as HTMLInputElement).style.borderColor =
                            'var(--color-border)')
                        }
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="phone" style={labelStyle}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      style={inputStyle}
                      onFocus={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor =
                          'var(--color-primary)')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLInputElement).style.borderColor =
                          'var(--color-border)')
                      }
                    />
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="message" style={labelStyle}>
                      Message <span aria-hidden="true" style={{ color: 'var(--color-primary)' }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      rows={5}
                      placeholder="Tell us about your business and what you'd like to automate..."
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        minHeight: '140px',
                      }}
                      onFocus={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor =
                          'var(--color-primary)')
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLTextAreaElement).style.borderColor =
                          'var(--color-border)')
                      }
                    />
                  </div>

                  {featureFlags.reviewCollection && (
                    <p
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-muted)',
                        marginBottom: '24px',
                        lineHeight: 1.5,
                      }}
                    >
                      Had a great experience?{' '}
                      <a
                        href="https://g.page/r/atlasorc/review"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
                      >
                        Leave us a Google review
                      </a>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-ghost"
                    disabled={status === 'loading'}
                    aria-label={status === 'loading' ? 'Sending message...' : 'Send message'}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {status === 'loading' ? (
                      'Sending…'
                    ) : (
                      <>
                        Send Message
                        <Send size={14} aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .form-two-col {
            grid-template-columns: 1fr !important;
          }
        }
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
    </section>
  )
}
