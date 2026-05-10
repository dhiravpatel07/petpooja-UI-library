import type { Config } from 'tailwindcss';
import preset from '@petpooja/ui/tailwind-preset';

export default {
  ...preset,
  content: [
    '../../packages/ui/src/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
} satisfies Config;
