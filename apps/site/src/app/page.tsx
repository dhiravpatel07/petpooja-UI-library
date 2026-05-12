import Link from 'next/link';
import { Badge } from '@petpooja/ui';
import { highlight } from '@/lib/highlight';
import { FloatingCluster } from '@/components/landing/floating-cluster';
import { ComponentMarquee } from '@/components/landing/marquee';
import {
  LiveSearch,
  LiveSwitchPanel,
  LiveTabs,
  LiveCard,
} from '@/components/landing/bento';
import { InstallCommand } from '@/components/install-command';

const SAMPLE_CODE = `import { Switch, Tabs, TabsList, TabsTrigger } from '@petpooja/ui';

export function Settings() {
  return (
    <Tabs defaultValue="general">
      <TabsList size="md">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="alerts">Alerts</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}`;

export default async function HomePage() {
  const codeHtml = await highlight(SAMPLE_CODE, 'tsx');

  return (
    <main className="overflow-hidden">
      {/* ────────────── HERO ────────────── */}
      <section className="relative">
        {/* Mesh + dot grid background */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-mesh opacity-80" />
          <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-16 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-32 lg:pt-24">
          {/* Headline column */}
          <div className="flex flex-col items-start">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Badge size="small" />
              <span className="font-mono">v0.0.0 · Pantheon</span>
              <span className="text-foreground/30">·</span>
              <span>Generated from Figma</span>
            </div>

            <h1 className="text-[44px] font-bold leading-[0.95] tracking-tight sm:text-[64px] lg:text-[80px]">
              Petpooja UI,
              <br />
              <span className="bg-gradient-to-br from-[#1770ee] via-[#7e00d2] to-[#1770ee] bg-clip-text text-transparent">
                ship-ready.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Pixel-perfect React components, generated straight from the Figma design file.
              Install as an npm package or copy-paste source via the shadcn CLI — the components
              you see here are the ones you ship.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/docs/installation"
                className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg active:scale-100"
              >
                Get started
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
                  <path d="M4 8h8m0 0L8 4m4 4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/docs/components/badge"
                className="rounded-xl border border-border bg-background/70 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
              >
                Browse 12 components
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-8 border-t border-border pt-8">
              <Stat label="Components" value="12" />
              <Stat label="Figma fidelity" value="1:1" />
              <Stat label="Lock-in" value="0" />
            </dl>
          </div>

          {/* Floating cluster column */}
          <div className="relative">
            <FloatingCluster />
          </div>
        </div>
      </section>

      {/* ────────────── MARQUEE ────────────── */}
      <ComponentMarquee />

      {/* ────────────── BENTO ────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#7e00d2]">
            Live, not screenshots
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            Every component is real.
            <br />
            <span className="text-muted-foreground">Click anything below.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
          {/* Switches — 2 cols */}
          <BentoCell className="lg:col-span-2" title="Switch" badge="form">
            <LiveSwitchPanel />
          </BentoCell>

          {/* Search — 2 cols */}
          <BentoCell className="lg:col-span-2" title="Search" badge="input">
            <LiveSearch />
          </BentoCell>

          {/* Install command — 2 cols, dark */}
          <BentoCell className="lg:col-span-2 lg:row-span-2 !bg-[#0d1117] !text-zinc-100" title="Install with shadcn" badge="cli" badgeTone="dark">
            <p className="-mt-1 mb-1 text-sm leading-relaxed text-zinc-400">
              Drop any component into your repo with one command.
            </p>
            <InstallCommand name="badge" />
            <p className="mt-2 text-xs text-zinc-500">
              The CLI installs deps, copies source, and wires it into your <code className="rounded bg-zinc-800 px-1 font-mono text-[11px] text-zinc-300">components.json</code>.
            </p>
          </BentoCell>

          {/* Tabs — 2 cols */}
          <BentoCell className="lg:col-span-2" title="Tabs" badge="navigation">
            <div className="flex items-center justify-center py-6">
              <LiveTabs />
            </div>
          </BentoCell>

          {/* Card — 2 cols */}
          <BentoCell className="lg:col-span-2" title="Card" badge="surface">
            <div className="flex items-center justify-center py-2">
              <LiveCard />
            </div>
          </BentoCell>
        </div>
      </section>

      {/* ────────────── HOW IT WORKS ────────────── */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#1770ee]">
              The pipeline
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
              Figma → MCP → React
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              No designer-developer handoff drift. The Figma file is the source; components are
              generated and wrapped in production-ready React.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Step
              n="01"
              title="Designer ships in Figma"
              body="Each component lives in the Pantheon file with documented variants, tokens, and Code Connect mappings."
            />
            <Step
              n="02"
              title="Claude reads the design"
              body="The Figma MCP fetches the spec — frame sizes, colors, typography, every variant — straight from the file."
            />
            <Step
              n="03"
              title="React lands in repo"
              body="A pixel-perfect Tailwind component, registered in the shadcn-compatible registry. Install or copy-paste."
            />
          </div>

          {/* Code preview */}
          <div className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#1e1e1e] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                settings.tsx
              </span>
            </div>
            <div
              className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
              dangerouslySetInnerHTML={{ __html: codeHtml }}
            />
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-mesh absolute inset-0 opacity-90" />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
          <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">
            12 components.
            <br />
            <span className="bg-gradient-to-br from-[#7e00d2] to-[#1770ee] bg-clip-text text-transparent">
              All open. All yours.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            No subscription, no rate limits, no telemetry. Read the install guide or jump straight
            into the component library.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/installation"
              className="rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              Read installation guide
            </Link>
            <Link
              href="/docs/components/badge"
              className="rounded-xl border border-border bg-background/70 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
            >
              Browse components →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dd className="font-mono text-3xl font-bold tracking-tight text-foreground">{value}</dd>
      <dt className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
    </div>
  );
}

interface BentoCellProps {
  title: string;
  badge: string;
  badgeTone?: 'light' | 'dark';
  className?: string;
  children: React.ReactNode;
}

function BentoCell({
  title,
  badge,
  badgeTone = 'light',
  className,
  children,
}: BentoCellProps) {
  return (
    <div
      className={
        'group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.15)] ' +
        (className ?? '')
      }
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span
          className={
            'rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ' +
            (badgeTone === 'dark'
              ? 'border-zinc-700 bg-zinc-800/60 text-zinc-400'
              : 'border-border bg-muted/40 text-muted-foreground')
          }
        >
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7e00d2]">
        {n}
      </span>
      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
