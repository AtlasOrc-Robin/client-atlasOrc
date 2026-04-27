'use client'

import { useState, useRef, useEffect } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { faqs } from '@/lib/content'
import { Plus, Minus } from 'lucide-react'

type FAQData = {
  title?: string
  subtitle?: string
}

type Props = {
  data: Record<string, unknown> | null
  placeholder?: boolean
}

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
          id={`faq-question-${index}`}
          onClick={onToggle}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            padding: '24px 0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: 'var(--color-text)',
            fontFamily: 'var(--font-body), system-ui, sans-serif',
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
            minHeight: '44px',
          }}
        >
          <span>{question}</span>
          <span
            style={{
              flexShrink: 0,
              color: 'var(--color-primary)',
              transition: 'transform 0.3s ease',
            }}
            aria-hidden="true"
          >
            {isOpen ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </button>
      </h3>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.35s ease',
        }}
      >
        <div ref={contentRef}>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.75,
              paddingBottom: '24px',
              paddingRight: '32px',
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection({ data }: Props) {
  const d = (data ?? {}) as FAQData
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const ref = useScrollAnimation()

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="faq"
      aria-label="Frequently asked questions"
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
            gridTemplateColumns: '1fr 2fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="faq-grid"
        >
          {/* Left: header */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <p
              className="label-text"
              data-animate
              style={{ marginBottom: '20px' }}
            >
              FAQ
            </p>
            <h2
              data-animate
              className="section-title"
              style={{
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                marginBottom: '16px',
              }}
            >
              {d.title ?? 'Common Questions'}
            </h2>
            <p
              data-animate
              style={{
                fontSize: '0.9375rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              {d.subtitle ??
                'Everything you need to know about AI automation for your business.'}
            </p>
            <a href="#contact" className="btn-ghost btn-ghost-sm" data-animate>
              Ask a Question
            </a>
          </div>

          {/* Right: accordion */}
          <div data-animate>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  )
}
