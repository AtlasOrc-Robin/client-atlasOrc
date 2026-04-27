'use client'

import { useHeroAnimation } from '@/hooks/useScrollAnimation'
import { featureFlags } from '@/lib/content'
import { ArrowRight } from 'lucide-react'

type HeroData = {
  title?: string
  subtitle?: string
  cta?: { label: string; href: string }
  image?: string
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

export default function HeroSection({ data }: Props) {
  const d = (data ?? {}) as HeroData
  const ref = useHeroAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="hero"
      aria-label="Hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Decorative background grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(205,173,109,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          paddingTop: '80px',
          paddingBottom: '80px',
        }}
      >
        {/* Label */}
        <p
          className="label-text"
          data-animate
          style={{ marginBottom: '32px' }}
        >
          AI Automation & Development
        </p>

        {/* Headline */}
        <h1
          data-animate
          style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
            letterSpacing: 'var(--letter-spacing)',
            lineHeight: 1.1,
            color: 'var(--color-text)',
            marginBottom: '32px',
          }}
        >
          {d.title ?? 'AI That Actually Works'}
        </h1>

        {/* Divider line */}
        <div
          data-animate
          style={{
            width: '60px',
            height: '1px',
            background: 'var(--color-primary)',
            marginBottom: '32px',
          }}
        />

        {/* Subtitle */}
        <p
          data-animate
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            maxWidth: '560px',
            marginBottom: '48px',
          }}
        >
          {d.subtitle ??
            'We build automation systems that handle your repetitive tasks while you focus on growth.'}
        </p>

        {/* CTAs */}
        <div
          data-animate
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <a
            href={d.cta?.href ?? '#contact'}
            className="btn-ghost"
            aria-label={d.cta?.label ?? 'Get Started'}
          >
            {d.cta?.label ?? 'Get Started'}
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a
            href="#services"
            style={{
              fontFamily: 'var(--font-body), system-ui, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '44px',
              padding: '0 4px',
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
            Explore Services
          </a>
        </div>

        {/* Review collection micro-copy */}
        {featureFlags.reviewCollection && (
          <p
            data-animate
            style={{
              marginTop: '64px',
              fontSize: '0.8125rem',
              color: 'var(--color-border)',
              letterSpacing: '0.06em',
            }}
          >
            Trusted by businesses in Sonipat & beyond ·{' '}
            <a
              href="https://g.page/r/atlasorc/review"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-primary)',
                textDecoration: 'none',
              }}
            >
              Leave us a review
            </a>
          </p>
        )}
      </div>

      {/* Scroll indicator */}
      <div
        data-animate
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '60px',
            background:
              'linear-gradient(to bottom, var(--color-primary), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes scrollPulse { 0%, 100% { opacity: 0.5; } }
        }
      `}</style>
    </section>
  )
}
