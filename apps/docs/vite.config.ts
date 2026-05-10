import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const uiSrc = resolve(__dirname, '../../packages/ui/src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Resolve @petpooja/ui to source so the playground gets HMR on library edits
    // without needing to rebuild packages/ui first.
    alias: [
      { find: /^@petpooja\/ui\/styles\.css$/, replacement: resolve(uiSrc, 'styles/globals.css') },
      { find: /^@petpooja\/ui$/, replacement: resolve(uiSrc, 'index.ts') },
    ],
  },
  server: {
    port: 5173,
    open: true,
  },
});
