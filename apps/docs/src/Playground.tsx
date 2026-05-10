import { useState, type SVGProps } from 'react';
import { demos, type Demo } from './registry';

interface PlaygroundProps {
  onBack: () => void;
}

export function Playground({ onBack }: PlaygroundProps) {
  const [activeId, setActiveId] = useState<string | null>(demos[0]?.id ?? null);
  const active: Demo | undefined = demos.find((d) => d.id === activeId);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </button>
            <span className="h-4 w-px bg-border" />
            <h1 className="text-sm font-semibold">Playground</h1>
          </div>
          <span className="text-xs text-muted-foreground">
            {demos.length} {demos.length === 1 ? 'component' : 'components'}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-[240px_1fr]">
        <aside className="min-h-[calc(100vh-3.5rem)] border-r border-border p-4">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Components
          </h2>
          {demos.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No components yet. The first one will appear here once it&apos;s generated from
              Figma.
            </p>
          ) : (
            <nav className="flex flex-col gap-1">
              {demos.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={
                    'rounded-md px-3 py-2 text-left text-sm transition-colors ' +
                    (d.id === activeId
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent/50')
                  }
                >
                  {d.name}
                </button>
              ))}
            </nav>
          )}
        </aside>

        <main className="p-8">
          {active ? (
            <section>
              <h2 className="mb-1 text-2xl font-semibold tracking-tight">{active.name}</h2>
              {active.description && (
                <p className="mb-6 text-sm text-muted-foreground">{active.description}</p>
              )}
              <div className="rounded-xl border border-border bg-background p-8">
                <active.render />
              </div>
            </section>
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mx-auto max-w-xl pt-16 text-center">
      <h2 className="mb-2 text-xl font-semibold">No components yet</h2>
      <p className="text-sm text-muted-foreground">
        Generate the first component from Figma. Once it lands in{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          packages/ui/src/components/
        </code>
        , register it in{' '}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          apps/docs/src/registry.ts
        </code>{' '}
        and it will appear in the sidebar.
      </p>
    </div>
  );
}

function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M19 12H5M11 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
