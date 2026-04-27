'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { services } from '@/lib/content'
import {
  Zap,
  Bot,
  MessageSquare,
  Code2,
  LayoutDashboard,
  Search,
  Mic,
  Video,
  Film,
  Users,
  PenLine,
  Image,
  Target,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  automation: Zap,
  robot: Bot,
  chat: MessageSquare,
  code: Code2,
  dashboard: LayoutDashboard,
  search: Search,
  microphone: Mic,
  video: Video,
  film: Film,
  users: Users,
  edit: PenLine,
  image: Image,
  target: Target,
}

type ServicesData = {
  title?: string
  subtitle?: string
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

export default function ServicesSection({ data }: Props) {
  const d = (data ?? {}) as ServicesData
  const ref = useScrollAnimation()

  const featured = services.filter((s) => s.featured)
  const rest = services.filter((s) => !s.featured)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="services"
      aria-label="Services"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 80px',
          }}
        >
          <p className="label-text" data-animate style={{ marginBottom: '20px' }}>
            What We Build
          </p>
          <h2
            data-animate
            className="section-title"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '20px' }}
          >
            {d.title ?? 'AI Solutions That Transform Your Business'}
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
              'We build intelligent systems that automate your workflows and accelerate your growth.'}
          </p>
        </div>

        {/* Featured services — large grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            marginBottom: '1px',
          }}
        >
          {featured.map((service) => {
            const Icon = iconMap[service.icon] ?? Zap
            return (
              <article
                key={service.id}
                data-animate
                style={{
                  background: 'var(--color-bg)',
                  padding: '40px 32px',
                  transition: 'background 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'var(--color-bg-card)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'var(--color-bg)')
                }
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    marginBottom: '24px',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Icon size={32} strokeWidth={1} aria-hidden="true" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading), Georgia, serif',
                    fontWeight: 300,
                    fontSize: '1.25rem',
                    letterSpacing: '0.04em',
                    color: 'var(--color-text)',
                    marginBottom: '12px',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  {service.description}
                </p>
              </article>
            )
          })}
        </div>

        {/* Rest of services — compact list */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            background: 'var(--color-border)',
            border: '1px solid var(--color-border)',
            marginBottom: '64px',
          }}
        >
          {rest.map((service) => {
            const Icon = iconMap[service.icon] ?? Zap
            return (
              <article
                key={service.id}
                data-animate
                style={{
                  background: 'var(--color-bg)',
                  padding: '28px 24px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'var(--color-bg-card)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    'var(--color-bg)')
                }
              >
                <div
                  style={{
                    flexShrink: 0,
                    color: 'var(--color-primary)',
                    marginTop: '2px',
                  }}
                >
                  <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body), system-ui, sans-serif',
                      fontWeight: 500,
                      fontSize: '0.9375rem',
                      color: 'var(--color-text)',
                      marginBottom: '4px',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8125rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div data-animate style={{ textAlign: 'center' }}>
          <a href="#contact" className="btn-ghost">
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
