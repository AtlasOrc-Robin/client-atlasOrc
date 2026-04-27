'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { business } from '@/lib/content'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#booking' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'var(--color-bg)' : 'transparent',
        borderBottom: scrolled
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label={`${business.name} — Home`}
          style={{
            fontFamily: 'var(--font-heading), Georgia, serif',
            fontWeight: 400,
            fontSize: '1.375rem',
            letterSpacing: '0.06em',
            color: 'var(--color-primary)',
            textDecoration: 'none',
          }}
        >
          {business.name}
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <ul
            style={{
              display: 'flex',
              gap: '36px',
              listStyle: 'none',
              margin: 0,
              padding: 0,
            }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body), system-ui, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--color-text)')
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

          <a href="#contact" className="btn-ghost btn-ghost-sm hidden md:inline-flex">
            Book a Call
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text)',
              cursor: 'pointer',
              padding: '8px',
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-bg)',
          zIndex: 101,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        className="md:hidden"
      >
        <button
          aria-label="Close menu"
          onClick={closeMenu}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'none',
            border: 'none',
            color: 'var(--color-text)',
            cursor: 'pointer',
            padding: '8px',
            minWidth: '44px',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={24} />
        </button>
        <nav aria-label="Mobile navigation">
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              padding: 0,
              margin: 0,
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  style={{
                    fontFamily: 'var(--font-heading), Georgia, serif',
                    fontWeight: 300,
                    fontSize: '2rem',
                    letterSpacing: '0.06em',
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      'var(--color-primary)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = 'var(--color-text)')
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contact"
          onClick={closeMenu}
          className="btn-ghost"
          style={{ marginTop: '16px' }}
        >
          Book a Call
        </a>
      </div>
    </header>
  )
}
