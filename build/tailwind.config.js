module.exports = {
  content: ["../jvde/index.html"],
  theme: {
    extend: {
      colors: {
        // Dark, premium base
        night:  '#0a0612',   // deepest background
        ink:    '#0d0a17',   // panel base
        panel:  '#15101f',   // raised panel
        plum:   '#7c3aed',   // deep purple accent
        grape:  '#9333ea',
        coral:  '#fb7185',
        ember:  '#f97316',   // warm orange accent
        amber:  '#f59e0b',
        sand:   '#fbf7f2',   // light text-on-dark base
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(124, 58, 237, 0.35)',
        lift: '0 24px 60px -18px rgba(124, 58, 237, 0.55)',
        glow: '0 0 40px -6px rgba(251, 113, 133, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%':     { transform: 'translateY(-22px) translateX(10px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        aurora: {
          '0%,100%': { transform: 'translate(0,0) scale(1)', opacity: '0.55' },
          '33%':     { transform: 'translate(40px,-30px) scale(1.15)', opacity: '0.8' },
          '66%':     { transform: 'translate(-30px,20px) scale(0.95)', opacity: '0.6' },
        },
        gradient: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-ring': {
          '0%':   { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        gradient: 'gradient 8s ease infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
      },
    },
  },
};
