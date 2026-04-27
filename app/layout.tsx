import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { seo, business } from '@/lib/content'
import NavBar from '@/components/NavBar'
import ChatWidget from '@/components/ChatWidget'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasorc.com'
  ),
  openGraph: {
    title: seo.metaTitle,
    description: seo.metaDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasorc.com',
    siteName: business.name,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: seo.metaTitle,
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.metaTitle,
    description: seo.metaDescription,
    images: [seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://atlasorc.com',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1a1a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NavBar />
        <main id="main-content">{children}</main>
        <ChatWidget />
      </body>
    </html>
  )
}
