import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body:     ['Montserrat', 'sans-serif'],
        headline: ['Cinzel', 'serif'],
        code:     ['monospace'],
      },
      colors: {
        /* ── Brand palette ── */
        canopy: '#1C2826',
        linen:  '#F9F8F6',
        gold:   '#D4AF37',
        basalt: '#4A4E51',

        /* ── ShadCN / Tailwind tokens ── */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT:    'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT:    'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT:    'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT:    'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT:    'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT:    'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT:    'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input:  'hsl(var(--input))',
        ring:   'hsl(var(--ring))',
        sidebar: {
          DEFAULT:              'hsl(var(--sidebar-background))',
          foreground:           'hsl(var(--sidebar-foreground))',
          primary:              'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent:               'hsl(var(--sidebar-accent))',
          'accent-foreground':  'hsl(var(--sidebar-accent-foreground))',
          border:               'hsl(var(--sidebar-border))',
          ring:                 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg:  '0px',
        md:  '0px',
        sm:  '0px',
        full:'0px',
      },
      letterSpacing: {
        cinema:  '0.20em',
        wide:    '0.15em',
        brand:   '0.35em',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to':   { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee2': {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-slow': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gold-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'fade-in-up':     'fade-in-up 0.6s ease-out',
        'marquee':        'marquee 30s linear infinite',
        'marquee2':       'marquee2 30s linear infinite',
        'marquee-slow':   'marquee-slow 90s linear infinite',
        'gold-pulse':     'gold-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
