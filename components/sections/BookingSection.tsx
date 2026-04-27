'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { featureFlags } from '@/lib/content'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { useEffect, useRef } from 'react'

type BookingData = {
  title?: string
  subtitle?: string
  cta?: { label: string; href: string }
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

function CalEmbed() {
  const calUsername =
    process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? 'atlasorc'
  const embedRef = useRef<HTMLDivElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current || !embedRef.current) return
    initialized.current = true

    const script = document.createElement('script')
    script.src = 'https://app.cal.com/embed/embed.js'
    script.async = true
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).Cal) {
        const Cal = (window as unknown as Record<string, unknown>).Cal as (cmd: string, ...args: unknown[]) => void
        Cal('init', { origin: 'https://app.cal.com' })
        Cal('inline', {
          elementOrSelector: '#cal-embed',
          calLink: `${calUsername}/consultation`,
          config: {
            layout: 'month_view',
            theme: 'dark',
          },
        })
        Cal('ui', {
          styles: {
            branding: { brandColor: '#cdad6d' },
          },
          hideEventTypeDetails: false,
        })
      }
    }
    document.body.appendChild(script)
  }, [calUsername])

  return (
    <div
      id="cal-embed"
      ref={embedRef}
      style={{
        width: '100%',
        minHeight: '500px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
      }}
      aria-label="Booking calendar"
    />
  )
}

export default function BookingSection({ data }: Props) {
  const d = (data ?? {}) as BookingData
  const ref = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="booking"
      aria-label="Book a consultation"
      className="section"
      style={{
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: featureFlags.booking ? '1fr 1.5fr' : '1fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="booking-grid"
        >
          {/* Left: copy */}
          <div>
            <p
              className="label-text"
              data-animate
              style={{ marginBottom: '20px' }}
            >
              Free Consultation
            </p>
            <h2
              data-animate
              className="section-title"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                marginBottom: '24px',
              }}
            >
              {d.title ?? 'Ready to Automate Your Business?'}
            </h2>
            <p
              data-animate
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              {d.subtitle ??
                'Book a free consultation and discover exactly what we can automate for you.'}
            </p>

            {/* What to expect */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '40px',
              }}
            >
              {[
                'Audit of your current workflows',
                'Identify automation opportunities',
                'Custom implementation roadmap',
                'Clear timeline and cost estimate',
              ].map((item) => (
                <li
                  key={item}
                  data-animate
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'flex-start',
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-primary)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                    aria-hidden="true"
                  >
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {!featureFlags.booking && (
              <a href="#contact" className="btn-ghost" data-animate>
                {d.cta?.label ?? 'Get Started'}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            )}

            {featureFlags.paymentLink && (
              <div data-animate style={{ marginTop: '24px' }}>
                <a
                  href="#contact"
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.2s ease',
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
                  <CalendarDays size={14} aria-hidden="true" />
                  Pay after your consultation
                </a>
              </div>
            )}
          </div>

          {/* Right: Cal.com embed or CTA fallback */}
          {featureFlags.booking && (
            <div data-animate>
              <CalEmbed />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
