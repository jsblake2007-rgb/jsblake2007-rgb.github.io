module.exports = {
  content: ["../jvde/index.html"],
  theme: {
    extend: {
      colors: {
        ink: '#1c1530', plum: '#6d28d9', grape: '#7c3aed', coral: '#fb7185',
        ember: '#f97316', amber: '#f59e0b', sand: '#fbf7f2',
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(76, 29, 149, 0.25)',
        lift: '0 20px 50px -18px rgba(124, 58, 237, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.5s ease-out both' },
    },
  },
};
