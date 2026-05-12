# Petpooja UI

A React component library for Petpooja products, built end-to-end like [shadcn/ui](https://ui.shadcn.com): the design source of truth is Figma, components are generated from the design file, and they're distributed in **two formats**:

1. **`@petpooja/ui` npm package** — `pnpm add @petpooja/ui` and import.
2. **shadcn-style copy-paste** — `npx shadcn@latest add https://petpooja-ui.vercel.app/r/<name>.json` writes the source into the consumer's repo.

Both formats share a single source of truth: `packages/ui/src/registry/`.

---

## Repo layout

```
petpooja_ui_library/
├── apps/
│   └── site/                                   # Next.js + MDX docs site (the public site)
│       ├── public/r/*.json                     # Compiled registry items (consumed by shadcn CLI)
│       └── src/app/                            # Routes: / and /docs/**
├── packages/
│   ├── ui/                                     # The library itself
│   │   ├── src/
│   │   │   ├── registry/
│   │   │   │   ├── lib/utils.ts                # cn() — the @/lib/utils import target
│   │   │   │   └── ui/badge.tsx                # Components, one file each (shadcn convention)
│   │   │   ├── styles/globals.css              # CSS tokens
│   │   │   └── index.ts                        # npm-package public API
│   │   ├── scripts/build-registry.mjs          # Compiles registry/ into apps/site/public/r/*.json
│   │   ├── tailwind.preset.ts                  # Reusable Tailwind preset
│   │   └── vite.config.ts                      # Library build (ESM + CJS + d.ts)
│   ├── eslint-config/                          # Shared ESLint flat configs
│   └── typescript-config/                      # Shared tsconfig presets
└── pnpm-workspace.yaml
```

### How distribution works

| Channel | Source file | Build step | What ships |
| --- | --- | --- | --- |
| npm (`@petpooja/ui`) | `packages/ui/src/registry/**` | `pnpm --filter @petpooja/ui build` (Vite library mode + d.ts rollup) | `packages/ui/dist/` |
| shadcn CLI | `packages/ui/src/registry/**` | `pnpm --filter @petpooja/ui build:registry` (reads sources, writes JSON) | `apps/site/public/r/*.json` (served by Next.js) |

Adding a new component means writing one source file in `src/registry/ui/`, listing it in `scripts/build-registry.mjs`, exporting it from `src/index.ts`, and writing an MDX page in `apps/site/src/app/docs/components/<name>/page.mdx`. Both distribution channels update on the next build.

---

## Getting started (contributors)

```bash
pnpm install
pnpm --filter @petpooja/ui build      # builds library + emits registry JSON
pnpm --filter @petpooja/site dev      # docs site on http://localhost:3000
```

### Common scripts (from repo root)

| Script | Effect |
| --- | --- |
| `pnpm build` | Turbo: builds every workspace |
| `pnpm dev` | Turbo: runs every workspace's dev script |
| `pnpm typecheck` | `tsc --noEmit` across the monorepo |
| `pnpm lint` | ESLint across the monorepo |
| `pnpm test` | Vitest |
| `pnpm format` | Prettier write |

### Per-workspace

```bash
pnpm --filter @petpooja/ui build              # library + registry
pnpm --filter @petpooja/ui build:registry     # registry JSON only (fast iteration)
pnpm --filter @petpooja/site dev              # Next.js dev server
pnpm --filter @petpooja/site build            # production Next.js build
```

---

## Using Petpooja UI in a consumer app

Full guide: [petpooja-ui.vercel.app/docs/installation](https://petpooja-ui.vercel.app/docs/installation).

### Option A — npm

```bash
pnpm add @petpooja/ui
```

```tsx
import { Badge } from '@petpooja/ui';

export function Demo() {
  return <Badge size="large">New</Badge>;
}
```

### Option B — shadcn CLI

```bash
pnpm dlx shadcn@latest init   # one-time per project
pnpm dlx shadcn@latest add https://petpooja-ui.vercel.app/r/badge.json
```

The CLI writes `lib/utils.ts` and `components/ui/badge.tsx` into your repo. From there it's your code — edit freely.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Monorepo | Turborepo + pnpm workspaces |
| Library framework | React 18 |
| Library build | Vite (library mode) + `vite-plugin-dts` |
| Docs site | Next.js 14 (App Router) + MDX |
| Styling | Tailwind CSS 3 + `clsx` + `tailwind-merge` |
| Variants | `class-variance-authority` (CVA) |
| Distribution | npm package + shadcn-compatible registry |
| Language | TypeScript 5 (strict) |
| Versioning | Changesets |
| Hosting (planned) | Vercel |
| Design source | Figma → Claude Figma MCP |

---

## Figma-driven workflow

Components are not hand-authored. The flow is:

1. Designer selects a component in the Figma desktop app (Pantheon file).
2. You paste the Figma URL to Claude and confirm the selection.
3. Claude calls the Figma MCP (`get_design_context`) and adapts the output to:
   - Write `src/registry/ui/<name>.tsx` with `@/lib/utils` imports (consumer-ready).
   - Register the new item in `scripts/build-registry.mjs`.
   - Export it from `src/index.ts`.
   - Write an MDX docs page at `apps/site/src/app/docs/components/<name>/page.mdx`.
4. Build and review: `pnpm --filter @petpooja/ui build && pnpm --filter @petpooja/site dev`.

The Figma MCP only sees what is currently selected in the desktop app — opening a link is not enough.

---

## Workspaces

| Workspace | Path | Published |
| --- | --- | --- |
| `@petpooja/ui` | `packages/ui` | yes |
| `@petpooja/site` | `apps/site` | no |
| `@petpooja/eslint-config` | `packages/eslint-config` | no |
| `@petpooja/typescript-config` | `packages/typescript-config` | no |

---

## Roadmap

- More components from the Pantheon file (Button, Cards, Chips, etc.).
- Dark mode for the docs site.
- Search across components (cmd-k).
- Auto-deploy `apps/site` to Vercel on every merge to `main`.
- Code Connect mappings for every component in Figma.
