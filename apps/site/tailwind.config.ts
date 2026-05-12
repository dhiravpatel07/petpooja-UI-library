import type { Config } from 'tailwindcss';
import preset from '@petpooja/ui/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{ts,tsx,md,mdx}',
    './mdx-components.tsx',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
} satisfies Config;
