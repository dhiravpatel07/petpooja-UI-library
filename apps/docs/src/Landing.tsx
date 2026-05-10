import { useState, type ComponentType, type SVGProps } from 'react';

interface LandingProps {
  onBrowse: () => void;
}

export function Landing({ onBrowse }: LandingProps) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header onBrowse={onBrowse} />
      <Hero onBrowse={onBrowse} />
      <Features />
      <CodeShowcase />
      <CallToAction onBrowse={onBrowse} />
      <Footer />
    </div>
  );
}

/* ─────────────────────────── sections ─────────────────────────── */

function Header({ onBrowse }: { onBrowse: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <Logo className="h-7 w-7" />
          <span className="tracking-tight">Petpooja UI</span>
        </a>
        <nav className="hidden items-center gap-1 text-sm sm:flex">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#install">Install</NavLink>
          <NavLink href="#example">Example</NavLink>
        </nav>
        <button
          type="button"
          onClick={onBrowse}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Browse Components
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

function Hero({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <GridBackdrop />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <Badge>
          <PulseDot />
          Generated from Figma · powered by Claude
        </Badge>

        <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
          Components designed in Figma,
          <span className="block bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text pb-1 text-transparent">
            generated in code.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
          A production-ready React component library for Petpooja. Pixel-accurate,
          type-safe, accessible, and always in sync with the design system.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse Components
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="#install"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Get Started
          </a>
        </div>

        <div id="install" className="mt-10 flex justify-center">
          <CopyableCommand command="pnpm add @petpooja/ui" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items: Array<{
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    title: string;
    desc: string;
  }> = [
    {
      icon: WandIcon,
      title: 'Figma-driven',
      desc: 'Every component is generated from a Figma frame and stays in sync. No drift between design and code.',
    },
    {
      icon: TypeIcon,
      title: 'Strict TypeScript',
      desc: 'Full type inference across props, variants, and refs. Strict mode, zero implicit any.',
    },
    {
      icon: PaletteIcon,
      title: 'Tailwind theme',
      desc: 'A shared preset of CSS-variable tokens. Themeable, dark-mode ready, no hex values in components.',
    },
    {
      icon: AccessibilityIcon,
      title: 'Accessible by default',
      desc: 'WCAG 2.1 AA baseline. Keyboard parity, ARIA, focus rings, and reduced-motion respect.',
    },
    {
      icon: PackageIcon,
      title: 'Tree-shakeable',
      desc: 'ESM-first, side-effect-free. Import only what you use; the rest never enters your bundle.',
    },
    {
      icon: SparklesIcon,
      title: 'Built with Claude',
      desc: 'Each component is generated, reviewed, and tested through the Claude Figma MCP server.',
    },
  ];

  return (
    <section id="features" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 text-center">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Production guarantees, baked in
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Everything Petpooja products need on day one — and nothing they don&apos;t.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="group bg-background p-8 transition-colors hover:bg-accent/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeShowcase() {
  return (
    <section id="example" className="relative border-t border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="mb-12 text-center">
          <SectionLabel>Example</SectionLabel>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Drop it into any React app
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            No configuration. Inherit the theme through the shared Tailwind preset.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-lg shadow-black/5">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-destructive/50" />
            <span className="h-3 w-3 rounded-full bg-primary/50" />
            <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">App.tsx</span>
          </div>
          <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-foreground">
            <code>
              <Token kind="keyword">import</Token> {'{ '}
              <Token kind="symbol">Button</Token>
              {' } '}
              <Token kind="keyword">from</Token>{' '}
              <Token kind="string">{"'@petpooja/ui'"}</Token>;{'\n'}
              <Token kind="keyword">import</Token>{' '}
              <Token kind="string">{"'@petpooja/ui/styles.css'"}</Token>;{'\n\n'}
              <Token kind="keyword">export function</Token>{' '}
              <Token kind="symbol">App</Token>() {'{'}
              {'\n  '}
              <Token kind="keyword">return</Token> (
              {'\n    <'}
              <Token kind="symbol">Button</Token> <Token kind="prop">variant</Token>={'"'}
              <Token kind="string">primary</Token>
              {'" '}
              <Token kind="prop">size</Token>={'"'}
              <Token kind="string">lg</Token>
              {'">'}
              {'\n      Get started'}
              {'\n    </'}
              <Token kind="symbol">Button</Token>
              {'>'}
              {'\n  );'}
              {'\n}'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function CallToAction({ onBrowse }: { onBrowse: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at center, hsl(var(--color-primary) / 0.12), transparent 60%)',
        }}
      />
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to build?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Browse every component in the library or grab the package and start shipping.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onBrowse}
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse Components
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href="https://figma.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Open Figma File
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo className="h-5 w-5" />
          <span>Petpooja UI · {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Designed in Figma</span>
          <span>Built with Claude</span>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── primitives ─────────────────────────── */

function GridBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, hsl(var(--color-border) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--color-border) / 0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top, hsl(var(--color-primary) / 0.18), transparent 55%)',
        }}
      />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
      {children}
    </div>
  );
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}

function CopyableCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-border bg-background/70 px-4 py-2 font-mono text-sm shadow-sm backdrop-blur">
      <span className="text-muted-foreground">$</span>
      <span className="select-all">{command}</span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy install command'}
        className="ml-1 rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Token({
  kind,
  children,
}: {
  kind: 'keyword' | 'string' | 'symbol' | 'prop';
  children: React.ReactNode;
}) {
  const cls = {
    keyword: 'text-primary',
    string: 'text-foreground/80',
    symbol: 'text-foreground',
    prop: 'text-muted-foreground',
  }[kind];
  return <span className={cls}>{children}</span>;
}

/* ─────────────────────────── icons ────────────────────────────── */

function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="6" fill="hsl(var(--color-primary))" />
      <path
        d="M8 8h5a3 3 0 0 1 0 6H8V8Zm0 6v3"
        stroke="hsl(var(--color-primary-foreground))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="m4 20 12-12M14 8l2 2M9 3v3M5 5h3M19 13v3M17 15h3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 6h14M12 6v14M8 20h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PaletteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="M12 22a10 10 0 1 1 10-10c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.4 3.4l.4.4A2 2 0 0 1 14 22h-2Z"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
      <circle cx="16.5" cy="10.5" r="1" fill="currentColor" />
    </svg>
  );
}

function AccessibilityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="4" r="2" />
      <path
        d="M19 8a8 8 0 0 1-7 4 8 8 0 0 1-7-4M9 12l-1 9M15 12l1 9M12 12v3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="m21 8-9-5-9 5 9 5 9-5ZM3 8v8l9 5 9-5V8M12 13v8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path
        d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5ZM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2ZM5 5l.7 1.7L7.4 7.4 5.7 8.1 5 9.8 4.3 8.1 2.6 7.4 4.3 6.7 5 5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
