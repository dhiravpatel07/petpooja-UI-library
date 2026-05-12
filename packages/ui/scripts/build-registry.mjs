#!/usr/bin/env node
// Compiles each component in src/registry/ into a shadcn-compatible
// registry-item JSON file consumable by `npx shadcn@latest add <url>`.
// Output: apps/site/public/r/*.json (served at /r/* by the Next.js docs site).

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, '..');
const REGISTRY_SRC = path.join(PKG_ROOT, 'src/registry');
const OUT_DIR = path.resolve(PKG_ROOT, '../../apps/site/public/r');

const REGISTRY_ITEMS = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'cn',
    description: 'Tailwind class merge utility built on clsx + tailwind-merge.',
    files: [{ source: 'lib/utils.ts', target: 'lib/utils.ts', type: 'registry:lib' }],
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [],
  },
  {
    name: 'badge',
    type: 'registry:ui',
    title: 'Badge',
    description:
      'Status indicator with Large (pill) and Small (dot) sizes. Pixel-perfect port of Figma node 50:155 (Pantheon › Badges).',
    files: [{ source: 'ui/badge.tsx', target: 'components/ui/badge.tsx', type: 'registry:ui' }],
    dependencies: ['class-variance-authority'],
    registryDependencies: ['utils'],
  },
  {
    name: 'bottom-sheet',
    type: 'registry:ui',
    title: 'Bottom Sheet',
    description:
      'Mobile-style modal sheet anchored to the bottom of the viewport. Built on Radix Dialog for accessibility (focus trap, ESC key, ARIA). Composable Header / TitleGroup / Footer slots. Pixel-perfect port of Figma node 66:687 (Pantheon › Bottom Sheets).',
    files: [
      {
        source: 'ui/bottom-sheet.tsx',
        target: 'components/ui/bottom-sheet.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@radix-ui/react-dialog', 'class-variance-authority'],
    registryDependencies: ['utils'],
  },
  {
    name: 'card',
    type: 'registry:ui',
    title: 'Card',
    description:
      'Container with Stacked and Horizontal layout variants. Composable Title, Subtitle, Description, Media, Content, and Footer slots. Optional interactive mode with keyboard support and a Pressed (#fafafa) active state. Pixel-perfect port of Figma node 2:113 (Pantheon › Cards).',
    files: [{ source: 'ui/card.tsx', target: 'components/ui/card.tsx', type: 'registry:ui' }],
    dependencies: ['class-variance-authority'],
    registryDependencies: ['utils'],
  },
  {
    name: 'checkbox',
    type: 'registry:ui',
    title: 'Checkbox',
    description:
      'Three-state checkbox (Unselected / Selected / Indeterminate) with Enabled and Disabled variants. Built on Radix Checkbox so the indeterminate state, ARIA, keyboard, and focus management are handled. Pixel-perfect port of Figma node 2331:76 (Pantheon › Checkbox).',
    files: [
      { source: 'ui/checkbox.tsx', target: 'components/ui/checkbox.tsx', type: 'registry:ui' },
    ],
    dependencies: ['@radix-ui/react-checkbox'],
    registryDependencies: ['utils'],
  },
  {
    name: 'calendar',
    type: 'registry:ui',
    title: 'Calendar',
    description:
      'Date grid built on react-day-picker. Styled to match the Pantheon calendar exactly (34×34 cells, 8px radius, brand-secondary range strip). Supports single and range selection, keyboard navigation, locales, and disabled dates.',
    files: [
      { source: 'ui/calendar.tsx', target: 'components/ui/calendar.tsx', type: 'registry:ui' },
    ],
    dependencies: ['react-day-picker', 'date-fns'],
    registryDependencies: ['utils'],
  },
  {
    name: 'date-picker',
    type: 'registry:ui',
    title: 'Date Picker',
    description:
      'Full date-range picker UX: header with close, large range display, calendar, quick-pick preset chips (Today / Yesterday / Last 7 days / Last 30 days / This Month / Last Month / Custom), and Cancel / Confirm actions. Pixel-perfect port of Figma node 3980:641 (Pantheon › Date Picker). Drop into a BottomSheet or any modal container.',
    files: [
      {
        source: 'ui/date-picker.tsx',
        target: 'components/ui/date-picker.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['react-day-picker', 'date-fns'],
    registryDependencies: ['utils', 'calendar'],
  },
  {
    name: 'popup',
    type: 'registry:ui',
    title: 'Popup',
    description:
      'Centered modal dialog with Default (header + body + footer) and Image (media + body + footer) variants. Built on Radix Dialog for ARIA, focus trap, ESC key, and scroll lock. Composable Header / Body / Footer / Media slots. Pixel-perfect port of Figma node 66:688 (Pantheon › Pop Up).',
    files: [
      { source: 'ui/popup.tsx', target: 'components/ui/popup.tsx', type: 'registry:ui' },
    ],
    dependencies: ['@radix-ui/react-dialog'],
    registryDependencies: ['utils'],
  },
  {
    name: 'radio-group',
    type: 'registry:ui',
    title: 'Radio Group',
    description:
      'Single-select group of radio buttons. Selected × Enabled / Disabled variants. Built on Radix RadioGroup so ARIA roles, focus, arrow-key navigation, and form integration are handled. Pixel-perfect port of Figma node 2381:1299 (Pantheon › Radio Buttons).',
    files: [
      {
        source: 'ui/radio-group.tsx',
        target: 'components/ui/radio-group.tsx',
        type: 'registry:ui',
      },
    ],
    dependencies: ['@radix-ui/react-radio-group'],
    registryDependencies: ['utils'],
  },
  {
    name: 'search',
    type: 'registry:ui',
    title: 'Search',
    description:
      'Search input with a magnifying-glass icon and an auto-revealing clear (×) button that appears once the input has a value. Controlled or uncontrolled. Pixel-perfect port of Figma node 5376:906 (Pantheon › Search).',
    files: [
      { source: 'ui/search.tsx', target: 'components/ui/search.tsx', type: 'registry:ui' },
    ],
    dependencies: [],
    registryDependencies: ['utils'],
  },
  {
    name: 'switch',
    type: 'registry:ui',
    title: 'Switch',
    description:
      'Toggle switch with Large (52×32) and Small (44×24) sizes, optional check icon, and Disabled state. 16 documented variants (Selected × Type × Size × Icon). Built on Radix Switch for ARIA, focus, and keyboard support. Pixel-perfect port of Figma node 2382:278 (Pantheon › Switch).',
    files: [
      { source: 'ui/switch.tsx', target: 'components/ui/switch.tsx', type: 'registry:ui' },
    ],
    dependencies: ['@radix-ui/react-switch'],
    registryDependencies: ['utils'],
  },
  {
    name: 'tabs',
    type: 'registry:ui',
    title: 'Tabs',
    description:
      'Horizontal tab navigation with four sizes (xs / sm / md / lg) and three compositions (text + icon / text only / icon only). Selected tab gets a 1.5px brand underline. Built on Radix Tabs for ARIA roles, focus, and keyboard arrow navigation. Pixel-perfect port of Figma node 47:626 (Pantheon › Tabs).',
    files: [
      { source: 'ui/tabs.tsx', target: 'components/ui/tabs.tsx', type: 'registry:ui' },
    ],
    dependencies: ['@radix-ui/react-tabs'],
    registryDependencies: ['utils'],
  },
];

async function buildItem(item) {
  const files = await Promise.all(
    item.files.map(async (f) => ({
      path: `registry/${f.source}`,
      content: await fs.readFile(path.join(REGISTRY_SRC, f.source), 'utf8'),
      type: f.type,
      target: f.target,
    })),
  );

  return {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files,
  };
}

function buildIndex(items) {
  return {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'petpooja',
    homepage: 'https://petpooja-ui.vercel.app',
    items: items.map(({ name, type, title, description }) => ({
      name,
      type,
      title,
      description,
    })),
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const built = [];
  for (const item of REGISTRY_ITEMS) {
    const out = await buildItem(item);
    const file = path.join(OUT_DIR, `${item.name}.json`);
    await fs.writeFile(file, JSON.stringify(out, null, 2) + '\n');
    console.log(`  ✓ ${path.relative(process.cwd(), file)}`);
    built.push(out);
  }

  const indexFile = path.join(OUT_DIR, 'index.json');
  await fs.writeFile(indexFile, JSON.stringify(buildIndex(built), null, 2) + '\n');
  console.log(`  ✓ ${path.relative(process.cwd(), indexFile)}`);
  console.log(`\nBuilt ${built.length} registry items.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
