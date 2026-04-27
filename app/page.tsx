import { sections, featureFlags } from '@/lib/content'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import BookingSection from '@/components/sections/BookingSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import GallerySection from '@/components/sections/GallerySection'
import ContactSection from '@/components/sections/ContactSection'
import FooterSection from '@/components/sections/FooterSection'
import GoogleReviewsWidget from '@/components/GoogleReviewsWidget'

type SectionData = Record<string, unknown>

const SectionRegistry: Record<
  string,
  React.ComponentType<{ data: SectionData | null; placeholder?: boolean }>
> = {
  hero: HeroSection,
  services: ServicesSection,
  booking: BookingSection,
  testimonials: TestimonialsSection,
  faq: FAQSection,
  gallery: GallerySection,
  contact: ContactSection,
  footer: FooterSection,
}

export default function Home() {
  return (
    <>
      {sections.map((section) => {
        const Component = SectionRegistry[section.id]
        if (!Component) return null
        return (
          <Component
            key={section.id}
            data={section.data as SectionData | null}
            placeholder={section._placeholder}
          />
        )
      })}
      {featureFlags.googleReviewsWidget && <GoogleReviewsWidget />}
    </>
  )
}
