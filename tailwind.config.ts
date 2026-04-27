import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dim': 'var(--color-primary-dim)',
        accent: 'var(--color-accent)',
        bg: 'var(--color-bg)',
        'bg-card': 'var(--color-bg-card)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'var(--radius)',
      },
      spacing: {
        section: 'var(--section-spacing)',
      },
      letterSpacing: {
        heading: 'var(--letter-spacing)',
      },
      maxWidth: {
        site: '1280px',
      },
    },
  },
  plugins: [],
}

export default config
