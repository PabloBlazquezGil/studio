import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-headline)', 'Arial Narrow', 'sans-serif'],
      },
      colors: {
        canopy: '#1C2826',
        linen: '#F9F8F6',
        gold: '#D4AF37',
        basalt: '#4A4E51',

        // Tokens usados por las notificaciones (toast)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: '0px',
        md: '0px',
        sm: '0px',
      },
      keyframes: {
        progress: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
      animation: {
        progress: 'progress linear forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
