'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    let gsap: typeof import('gsap').gsap
    let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger

    async function init() {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      const targets = ref.current.querySelectorAll('[data-animate]')
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        }
      )
    }

    init()

    return () => {
      if (ScrollTrigger) ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return ref
}

export function useHeroAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    async function init() {
      const gsapModule = await import('gsap')
      const gsap = gsapModule.gsap

      if (!ref.current) return

      const targets = ref.current.querySelectorAll('[data-animate]')
      if (!targets.length) return

      gsap.fromTo(
        targets,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.2,
        }
      )
    }

    init()
  }, [])

  return ref
}
