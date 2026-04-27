'use client'

import { Star } from 'lucide-react'
import { business } from '@/lib/content'

const placeholderReviews = [
  {
    id: '1',
    author: 'Sandeep K.',
    rating: 5,
    text: `${business.name} automated our entire customer onboarding — what took 3 hours now takes 10 minutes.`,
    date: '2 weeks ago',
  },
  {
    id: '2',
    author: 'Neha T.',
    rating: 5,
    text: 'Best AI agency in Sonipat. They actually delivered what they promised and the system runs perfectly.',
    date: '1 month ago',
  },
  {
    id: '3',
    author: 'Rajesh M.',
    rating: 5,
    text: 'The AI chatbot handles our leads 24/7. We stopped missing inquiries completely.',
    date: '3 weeks ago',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      style={{ display: 'flex', gap: '2px' }}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? 'var(--color-primary)' : 'none'}
          style={{
            color:
              i < rating
                ? 'var(--color-primary)'
                : 'var(--color-border)',
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function GoogleReviewsWidget() {
  return (
    <section
      aria-label="Google reviews"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '64px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p className="label-text" style={{ marginBottom: '8px' }}>
              Google Reviews
            </p>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <StarRating rating={5} />
              <span
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                5.0 · {placeholderReviews.length} reviews
              </span>
            </div>
          </div>
          <a
            href="https://g.page/r/atlasorc/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-ghost-sm"
          >
            Leave a Review
          </a>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {placeholderReviews.map((review) => (
            <div key={review.id} className="card" style={{ padding: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}
                >
                  {review.author}
                </p>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {review.date}
                </span>
              </div>
              <StarRating rating={review.rating} />
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginTop: '12px',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
