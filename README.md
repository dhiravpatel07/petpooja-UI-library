# Petpooja UI Component Library

A production-ready React component library for Petpooja products, organized as a **Turborepo monorepo** built fully from scratch — no third-party showcase frameworks. Components are **generated directly from Figma** using the Claude Figma MCP server, and previewed in a hand-built Vite + React playground.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Repo Layout](#repo-layout)
4. [Getting Started](#getting-started)
5. [Workspaces](#workspaces)
6. [Figma-Driven Workflow](#figma-driven-workflow)
7. [Component Conventions](#component-conventions)
8. [Design Tokens & Theming](#design-tokens--theming)
9. [Testing](#testing)
10. [Playground](#playground)
11. [Build & Publish](#build--publish)
12. [Accessibility](#accessibility)
13. [Contributing](#contributing)

---

## Overview

### Goals
- **Single source of truth**: Figma drives the design; code is generated, not hand-authored.
- **Consistency**: Uniform tokens, spacing, and behavior across every Petpooja product.
- **Accessibility**: WCAG 2.1 AA by default — keyboard, ARIA, focus, contrast.
- **DX**: Strict TypeScript, tree-shakeable exports, fast HMR via Turbo, hand-built playground we control end to end.
- **Performance**: ESM-first, side-effect-free, per-component entry points.

### Non-Goals
- Hand-rolling components when a Figma frame already exists.
- Pulling in heavy showcase frameworks (Storybook, Ladle, etc.) — the playground is just a Vite + React app.
- Re-implementing primitives that headless libraries (Radix) already solve.
- Premature abstractions — components stay flat until a real second use case appears.

---

## Tech Stack

| Concern         | Choice                                             |
| --------------- | -------------------------------------------------- |
| Monorepo        | Turborepo + pnpm workspaces                        |
| Framework       | React 18                                           |
| Language        | TypeScript 5 (strict)                              |
| Styling         | Tailwind CSS 3 + `clsx` + `tailwind-merge`         |
| Build           | Vite (library mode) + `vite-plugin-dts`            |
| Headless prims  | Radix UI (added per component as needed)           |
| Variants        | `class-variance-authority` (CVA)                   |
| Forms           | `react-hook-form` + `zod` (added when needed)      |
| Testing         | Vitest + React Testing Library + jest-dom          |
| Playground      | Hand-built Vite + React app (`apps/docs`)          |
| Lint / Format   | ESLint 9 (flat config) + Prettier                  |
| Versioning      | Changesets                                         |
| Package mgr     | pnpm 9                                             |
| CI              | GitHub Actions                                     |
| Design source   | Figma (via Claude Figma MCP server)                |

---

## Repo Layout

```
petpooja_ui_library/
├── apps/
│   └── docs/                         # Vite + React playground
│       ├── src/
│       │   ├── demos/                # One demo file per component (added with the component)
│       │   ├── App.tsx               # Top-level layout: sidebar + main panel
│       │   ├── main.tsx              # Vite entry
│       │   ├── registry.ts           # List of demos to render in the sidebar
│       │   └── styles.css            # Imports library globals
│       ├── eslint.config.js
│       ├── index.html
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── vite.config.ts            # Aliases @petpooja/ui -> packages/ui/src for HMR
├── packages/
│   ├── ui/                           # The component library (@petpooja/ui)
│   │   ├── src/
│   │   │   ├── components/           # One folder per component (added from Figma)
│   │   │   ├── hooks/                # Shared hooks (added on real demand)
│   │   │   ├── lib/
│   │   │   │   └── cn.ts             # clsx + tailwind-merge helper
│   │   │   ├── tokens/               # Design tokens mirrored from Figma
│   │   │   │   ├── colors.ts
│   │   │   │   ├── spacing.ts
│   │   │   │   ├── typography.ts
│   │   │   │   └── index.ts
│   │   │   ├── styles/
│   │   │   │   └── globals.css       # Tailwind directives + CSS vars
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── index.ts              # Public barrel export
│   │   ├── tests/
│   │   │   └── setup.ts              # Vitest setup
│   │   ├── eslint.config.js
│   │   ├── package.json
│   │   ├── postcss.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tailwind.preset.ts        # Reusable Tailwind preset (consumed by apps/docs)
│   │   ├── tsconfig.json
│   │   ├── tsconfig.build.json
│   │   └── vite.config.ts
│   ├── eslint-config/                # Shared ESLint flat configs (@petpooja/eslint-config)
│   │   ├── base.js
│   │   ├── react.js
│   │   └── package.json
│   └── typescript-config/            # Shared tsconfig presets (@petpooja/typescript-config)
│       ├── base.json
│       ├── react-library.json
│       ├── vite-app.json
│       └── package.json
├── .changeset/
│   └── config.json
├── .github/
│   └── workflows/
│       ├── ci.yml                    # lint + typecheck + test + build
│       └── release.yml               # changesets-driven publish
├── .gitignore
├── .nvmrc
├── .prettierrc
├── .prettierignore
├── package.json                      # Root: workspaces + turbo scripts
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

### Why this layout
- **`apps/` vs `packages/`** — `apps` are runtime targets (the playground here, future docs/landing sites), `packages` are publishable or internally-consumed libraries.
- **Shared `eslint-config` and `typescript-config`** — every workspace extends them, so lint/TS rules can never drift between `ui` and `docs`.
- **`tailwind.preset.ts`** in `packages/ui` is the source of truth for the theme; `apps/docs` imports it so the playground always renders with the library's exact theme.
- **Vite alias for HMR** — `apps/docs/vite.config.ts` aliases `@petpooja/ui` to `packages/ui/src/index.ts`, so the playground hot-reloads on library edits without rebuilding `dist/`.
- **Flat `src/components`** in `packages/ui` — no premature category folders.
- **Co-located tests/types/variants** — everything for a component lives in its folder; deletion is one `rm -rf`.

---

## Getting Started

### Prerequisites
- Node.js >= 20 (an `.nvmrc` is provided)
- pnpm >= 9

### Install
```bash
pnpm install
```

### Common scripts (run from repo root)
```bash
pnpm dev           # Turbo: starts the playground at http://localhost:5173
pnpm build         # Turbo: builds @petpooja/ui then @petpooja/docs
pnpm test          # Turbo: runs Vitest in every workspace that has tests
pnpm lint          # Turbo: ESLint across all workspaces
pnpm typecheck     # Turbo: tsc --noEmit across all workspaces
pnpm format        # Prettier write across the repo
pnpm clean         # Remove dist/.turbo and node_modules
```

Turbo caches task outputs locally in `.turbo/`; second runs of `build`/`test`/`lint` are near-instant when inputs haven't changed.

### Targeting a single workspace
```bash
pnpm --filter @petpooja/ui build
pnpm --filter @petpooja/ui test
pnpm --filter @petpooja/docs dev
```

### Consuming the library (in a host app)
```bash
pnpm add @petpooja/ui
```
```tsx
import { Button } from '@petpooja/ui';
import '@petpooja/ui/styles.css';

export default function App() {
  return <Button variant="primary">Click me</Button>;
}
```

To inherit the library's Tailwind theme in a host app:
```ts
// tailwind.config.ts
import preset from '@petpooja/ui/tailwind-preset';

export default {
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}', './node_modules/@petpooja/ui/dist/**/*.js'],
};
```

---

## Workspaces

| Workspace                      | Path                          | Type             | Published |
| ------------------------------ | ----------------------------- | ---------------- | --------- |
| `@petpooja/ui`                 | `packages/ui`                 | Library          | yes       |
| `@petpooja/docs`               | `apps/docs`                   | Playground app   | no        |
| `@petpooja/eslint-config`      | `packages/eslint-config`      | Shared config    | no        |
| `@petpooja/typescript-config`  | `packages/typescript-config`  | Shared config    | no        |

Only `@petpooja/ui` is publishable. The rest are `private: true` and ignored by Changesets.

---

## Figma-Driven Workflow

Components are **not hand-written**. They are generated from Figma frames using the Claude Figma MCP server, then adapted to project conventions.

### The loop (per component)

1. **Designer publishes** the component in Figma with a stable node id and design tokens applied.
2. **You paste the Figma URL** to Claude (e.g. `https://figma.com/design/<fileKey>/...?node-id=<nodeId>`).
3. **Claude calls `get_design_context`** — returns reference React+Tailwind code, a screenshot, tokens, and any Code Connect mappings.
4. **Claude adapts** the reference output to this repo:
   - Maps Figma variables → entries in `packages/ui/src/tokens/` and the Tailwind preset.
   - Wraps interactive primitives in Radix where applicable.
   - Extracts variants into a `*.variants.ts` file using CVA.
   - Writes the component, types, and tests in `packages/ui/src/components/<Name>/`.
   - Adds the export to `packages/ui/src/index.ts`.
   - Adds a demo file at `apps/docs/src/demos/<Name>.tsx` and registers it in `apps/docs/src/registry.ts`.
5. **You review** in the playground (`pnpm dev`) — flip between the rendered component and the Figma frame.

### What Claude needs from you
- The Figma file URL (and node id for the specific component, when applicable).
- Confirmation when a component should wrap an existing Radix primitive vs. be built from scratch.
- Sign-off on token names before they propagate into the Tailwind preset.

### What Claude will not do
- Invent components that don't exist in Figma.
- Drift from Figma tokens (no raw hex values in components — always tokens).
- Skip tests or playground demos for generated components.

### Code Connect (recommended)
Once a component lands, register it via `add_code_connect_map` so future Figma → code generations use the canonical implementation instead of regenerating from scratch.

---

## Component Conventions

Every component in `packages/ui/src/components/<Name>/` follows this shape:

```
Button/
├── Button.tsx
├── Button.types.ts
├── Button.variants.ts     # CVA variants
├── Button.test.tsx
└── index.ts
```

### `Button.variants.ts`
```ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

### `Button.tsx`
```tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { buttonVariants } from './Button.variants';
import type { ButtonProps } from './Button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
```

### Rules
- `forwardRef` on every interactive component.
- `className` always merges through `cn()` — never overwrite, always append.
- Variants live in `*.variants.ts`, never inline in the component.
- `displayName` set explicitly.
- Public types exported from `index.ts`.

---

## Design Tokens & Theming

Tokens are mirrored from Figma variables into `packages/ui/src/tokens/` and exposed to Tailwind via CSS variables in `packages/ui/src/styles/globals.css`. The shared Tailwind preset at `packages/ui/tailwind.preset.ts` references those CSS variables, and is consumed by both `packages/ui/tailwind.config.ts` and `apps/docs/tailwind.config.ts`.

### Dark mode
Toggle by adding `class="dark"` on `<html>`. No JS theming hook ships in this library — host apps own the toggle.

---

## Testing

Vitest + React Testing Library + jest-dom. Every component ships with a co-located `*.test.tsx` covering:

- Renders without crashing
- Forwards `ref`
- Merges `className`
- Variant prop combinations
- Keyboard interaction for interactive components
- ARIA attributes (role, aria-disabled, aria-expanded, etc.)

Test setup lives at `packages/ui/tests/setup.ts`.

---

## Playground

The playground at [apps/docs](apps/docs/) is a plain Vite + React app — no Storybook, no Ladle, no abstractions. We own every line.

How it's wired:
- [apps/docs/vite.config.ts](apps/docs/vite.config.ts) aliases `@petpooja/ui` → `packages/ui/src/index.ts` so library edits hot-reload instantly.
- [apps/docs/src/registry.ts](apps/docs/src/registry.ts) holds an array of demos. Each demo has an `id`, `name`, optional `description`, and a `render` component.
- [apps/docs/src/App.tsx](apps/docs/src/App.tsx) renders a sidebar of registry entries and a main panel for the active one.
- Each component gets a demo file at `apps/docs/src/demos/<Name>.tsx` that imports from `@petpooja/ui`, renders example states (default / variants / disabled / etc.), and is appended to `registry.ts`.

Adding a demo (when a component lands):

```tsx
// apps/docs/src/demos/Button.tsx
import { Button } from '@petpooja/ui';

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  );
}
```

Then register it:

```ts
// apps/docs/src/registry.ts
import { ButtonDemo } from './demos/Button';

export const demos: Demo[] = [
  { id: 'button', name: 'Button', render: ButtonDemo },
];
```

Run with `pnpm dev` — opens at `http://localhost:5173`.

---

## Build & Publish

### `vite.config.ts` (library mode)
- Entry: `src/index.ts`
- Formats: `es`, `cjs`
- `react`, `react-dom`, `react/jsx-runtime` marked external
- `vite-plugin-dts` emits a single rolled-up `.d.ts` to `dist/`

### Release flow (Changesets)
1. Land changes via PR (CI: lint + typecheck + test + build must pass).
2. Run `pnpm changeset` to record the change & bump.
3. Merge to `main`. The `release.yml` workflow either:
   - Opens/updates a "Version Packages" PR with all queued changesets, **or**
   - If that PR is already merged, runs `pnpm release` to publish `@petpooja/ui` to npm and create a GitHub release.

Only `@petpooja/ui` publishes — `apps/docs`, `eslint-config`, and `typescript-config` are ignored in `.changeset/config.json`.

---

## Accessibility

Hard requirements for every component:

- Semantic HTML first; ARIA only where semantics fall short.
- Visible focus ring (`focus-visible:ring-2`).
- Color contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text & UI elements.
- Keyboard parity with mouse — no mouse-only interactions.
- Respects `prefers-reduced-motion`.
- Tested with screen readers (VoiceOver / NVDA) for any component announcing state.

---

## Contributing

1. **Find or create the Figma frame** for the component.
2. **Ask Claude** to generate it: paste the Figma URL and the target component name.
3. **Review** the generated files in `packages/ui/src/components/<Name>/` and the demo in `apps/docs/src/demos/`.
4. **Run** `pnpm lint && pnpm typecheck && pnpm test` locally.
5. **Verify in the playground**: `pnpm dev` and visually compare against Figma.
6. **Add a changeset**: `pnpm changeset` and describe the change.
7. **Open a PR** with the Figma URL in the description and screenshots of the demo.

### Component checklist (PR template)
- [ ] Generated from a Figma frame (URL in PR description)
- [ ] Uses tokens from `packages/ui/src/tokens/` — no raw hex / px values for design properties
- [ ] `forwardRef` + `displayName`
- [ ] Variants extracted to `*.variants.ts`
- [ ] Tests cover keyboard + ARIA where interactive
- [ ] Demo file added under `apps/docs/src/demos/` and registered in `registry.ts`
- [ ] Exported from `packages/ui/src/index.ts`
- [ ] Code Connect mapping registered (if the design system uses Code Connect)
- [ ] Changeset added (`pnpm changeset`)

---

## License

Proprietary — Petpooja. All rights reserved.
