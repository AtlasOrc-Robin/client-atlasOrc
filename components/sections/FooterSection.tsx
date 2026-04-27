'use client'

import { useState, useEffect } from 'react'
import { business, social, featureFlags } from '@/lib/content'
import { Instagram, Linkedin } from 'lucide-react'

type FooterData = {
  tagline?: string
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

export default function FooterSection({ data }: Props) {
  const d = (data ?? {}) as FooterData
  const [year, setYear] = useState<number | null>(null)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Book a Call', href: '#booking' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer
      id="footer"
      aria-label="Site footer"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '64px',
        paddingBottom: '40px',
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '48px',
            alignItems: 'start',
            marginBottom: '64px',
          }}
          className="footer-top"
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <a
              href="/"
              aria-label={`${business.name} — Home`}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-heading), Georgia, serif',
                fontWeight: 400,
                fontSize: '1.375rem',
                letterSpacing: '0.06em',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                marginBottom: '16px',
              }}
            >
              {business.name}
            </a>
            <p
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              {d.tagline ?? 'Premium AI automation that actually delivers results.'}
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                alignItems: 'flex-end',
              }}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-body), system-ui, sans-serif',
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'inline-block',
                      minHeight: '44px',
                      lineHeight: '44px',
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        'var(--color-text)')
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        'var(--color-text-muted)')
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--color-border)',
            marginBottom: '32px',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {year !== null ? `© ${year} ${business.name}. All rights reserved.` : `© ${business.name}. All rights reserved.`}
          </p>

          {/* Social links */}
          <div
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
            aria-label="Social media links"
          >
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${business.name} on Instagram`}
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '44px',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'var(--color-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'var(--color-text-muted)')
                }
              >
                <Instagram size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${business.name} on LinkedIn`}
                style={{
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '44px',
                  minHeight: '44px',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'var(--color-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    'var(--color-text-muted)')
                }
              >
                <Linkedin size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            )}
          </div>

          {/* Appointment reminders note */}
          {featureFlags.appointmentReminders && (
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-border)',
                letterSpacing: '0.04em',
              }}
            >
              {business.website}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr !important;
          }
          .footer-top nav ul {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
