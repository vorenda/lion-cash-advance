import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d5c3d',
          light: '#10734a',
          dark: '#094a31',
        },
        accent: {
          DEFAULT: '#d4a853',
          light: '#e8c77b',
          dark: '#b8923f',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1a1a1a',
        },
        background: {
          DEFAULT: '#fafaf8',
          alt: '#f4f4f1',
        },
      },
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(13, 92, 61, 0.08)',
        'md': '0 4px 20px rgba(13, 92, 61, 0.12)',
        'lg': '0 8px 32px rgba(13, 92, 61, 0.16)',
        'glow': '0 0 40px rgba(212, 168, 83, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
