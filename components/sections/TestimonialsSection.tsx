'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { business } from '@/lib/content'
import { Quote } from 'lucide-react'

type TestimonialsData = {
  title?: string
  subtitle?: string
  _placeholder?: boolean
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

const placeholderTestimonials = [
  {
    id: '1',
    quote:
      `${business.name} built an AI chatbot for our business that handles 80% of customer inquiries automatically. Our team now focuses on actual work instead of answering the same questions all day.`,
    author: 'Ravi Sharma',
    role: 'Owner',
    company: 'Sharma Enterprises, Sonipat',
  },
  {
    id: '2',
    quote:
      'The automation system they built for our order processing saved us 15 hours a week from day one. The ROI was obvious within the first month.',
    author: 'Priya Mehta',
    role: 'Operations Head',
    company: 'Local E-commerce Brand',
  },
  {
    id: '3',
    quote:
      `Working with ${business.name} was different — they actually understand business problems, not just tech. The AI voice assistant they built picks up our overflow calls 24/7.`,
    author: 'Amit Goyal',
    role: 'Director',
    company: 'Healthcare Clinic, Delhi NCR',
  },
]

export default function TestimonialsSection({ data }: Props) {
  const d = (data ?? {}) as TestimonialsData
  const ref = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="testimonials"
      aria-label="Client testimonials"
      className="section"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto 72px',
          }}
        >
          <p className="label-text" data-animate style={{ marginBottom: '20px' }}>
            Client Stories
          </p>
          <h2
            data-animate
            className="section-title"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              marginBottom: '16px',
            }}
          >
            {d.title ?? 'What Our Clients Say'}
          </h2>
          <p
            data-animate
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}
          >
            {d.subtitle ??
              `See how ${business.name} has transformed businesses with intelligent automation.`}
          </p>
        </div>

        {/* Testimonial cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {placeholderTestimonials.map((t) => (
            <blockquote
              key={t.id}
              className="card"
              data-animate
              style={{ margin: 0 }}
            >
              <div
                style={{
                  color: 'var(--color-primary)',
                  marginBottom: '20px',
                  opacity: 0.6,
                }}
              >
                <Quote size={24} strokeWidth={1} aria-hidden="true" />
              </div>
              <p
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.75,
                  color: 'var(--color-text-muted)',
                  marginBottom: '28px',
                  fontStyle: 'italic',
                }}
              >
                {t.quote}
              </p>
              <footer
                style={{
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '20px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                  }}
                >
                  {t.author}
                </p>
                <p
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-primary)',
                  }}
                >
                  {t.role} · {t.company}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
