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
        curtain: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-100%)' },
        },
        // Solo opacidad y sin fill-mode final: un transform, o una animación que se queda aplicada, crea un
        // contexto de apilamiento que deja la cabecera por encima del visor y de la vista previa.
        'page-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        progress: 'progress linear forwards',
        curtain: 'curtain 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.1s forwards',
        'page-in': 'page-in 0.6s ease-out 0.35s backwards',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
