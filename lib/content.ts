import rawContent from '@/content.json'

export const content = rawContent

export type Section = {
  id: string
  enabled: boolean
  order: number
  _placeholder?: boolean
  data: Record<string, unknown> | null
}

export type Service = {
  id: string
  name: string
  description: string
  icon: string
  featured: boolean
}

export type FAQ = {
  id: string
  question: string
  answer: string
}

export type SocialLinks = {
  instagram: string | null
  facebook: string | null
  youtube: string | null
  linkedin: string | null
  twitter: string | null
  tiktok: string | null
}

export const business = content.business
export const theme = content.theme
export const seo = content.seo
export const services = content.services as Service[]
export const faqs = content.faqs as FAQ[]
export const social = content.social as SocialLinks
export const featureFlags = content.featureFlags
export const sections = (content.sections as Section[])
  .filter((s) => s.enabled)
  .sort((a, b) => a.order - b.order)
