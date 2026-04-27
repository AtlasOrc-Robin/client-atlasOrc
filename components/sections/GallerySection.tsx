'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { business } from '@/lib/content'

type GalleryData = {
  title?: string
  subtitle?: string
  _placeholder?: boolean
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

const placeholderItems = [
  {
    id: '1',
    label: 'AI Chatbot System',
    description: `Built for a ${business.industry} firm in Sonipat — handles 200+ daily inquiries automatically`,
    tag: 'AI Automation',
    size: 'large',
  },
  {
    id: '2',
    label: 'Lead Generation Pipeline',
    description: 'Automated outreach system generating 50+ qualified leads per week',
    tag: 'AI Agent',
    size: 'small',
  },
  {
    id: '3',
    label: 'Internal Dashboard',
    description: 'Real-time operations dashboard with AI-powered analytics',
    tag: 'Web App',
    size: 'small',
  },
  {
    id: '4',
    label: 'Voice AI Receptionist',
    description: 'AI phone assistant booking 30+ appointments weekly, 24/7 availability',
    tag: 'Voice AI',
    size: 'medium',
  },
  {
    id: '5',
    label: 'E-commerce Automation',
    description: 'Order processing, inventory alerts, and customer follow-ups — all automated',
    tag: 'Automation',
    size: 'medium',
  },
]

export default function GallerySection({ data }: Props) {
  const d = (data ?? {}) as GalleryData
  const ref = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="gallery"
      aria-label="Work gallery"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            maxWidth: '560px',
            marginBottom: '64px',
          }}
        >
          <p className="label-text" data-animate style={{ marginBottom: '20px' }}>
            Our Work
          </p>
          <h2
            data-animate
            className="section-title"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              marginBottom: '16px',
            }}
          >
            {d.title ?? 'Our Work in Action'}
          </h2>
          <p
            data-animate
            style={{
              fontSize: '1.0625rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}
          >
            {d.subtitle ??
              `See the AI systems and automation solutions ${business.name} has built for businesses like yours.`}
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          style={{
            columns: 'auto 320px',
            gap: '16px',
          }}
        >
          {placeholderItems.map((item) => (
            <div
              key={item.id}
              data-animate
              style={{
                breakInside: 'avoid',
                marginBottom: '16px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'var(--color-primary-dim)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  'var(--color-border)')
              }
            >
              {/* Visual placeholder */}
              <div
                aria-hidden="true"
                style={{
                  height: item.size === 'large' ? '200px' : item.size === 'medium' ? '160px' : '120px',
                  background: `linear-gradient(135deg, var(--color-bg) 0%, rgba(205,173,109,0.06) 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      background: 'var(--color-primary)',
                      opacity: 0.4,
                    }}
                  />
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {item.tag}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontWeight: 500,
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                    marginBottom: '8px',
                  }}
                >
                  {item.label}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div data-animate style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="#contact" className="btn-ghost">
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
