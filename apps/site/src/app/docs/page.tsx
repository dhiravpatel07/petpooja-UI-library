import Link from 'next/link';

export default function DocsHomePage() {
  return (
    <article>
      <h1 className="mb-3 text-4xl font-bold tracking-tight">Introduction</h1>
      <p className="mb-6 text-lg leading-7 text-muted-foreground">
        Petpooja UI is the React component library for Petpooja products. It mirrors the Pantheon
        design system in Figma — each component is generated from the design file, then wrapped
        in pixel-perfect React + Tailwind code.
      </p>

      <h2 className="mb-3 mt-10 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Two ways to use it
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/installation#npm-package"
          className="rounded-xl border border-border p-5 transition-colors hover:bg-accent/30"
        >
          <h3 className="mb-1 text-base font-semibold">npm package</h3>
          <p className="text-sm text-muted-foreground">
            <code className="rounded bg-muted px-1 py-0.5 text-xs">pnpm add @petpooja/ui</code>{' '}
            and import directly. Components stay version-locked.
          </p>
        </Link>
        <Link
          href="/docs/installation#copy-paste"
          className="rounded-xl border border-border p-5 transition-colors hover:bg-accent/30"
        >
          <h3 className="mb-1 text-base font-semibold">Copy-paste</h3>
          <p className="text-sm text-muted-foreground">
            Use the shadcn CLI to copy source files into your repo. You own the code, full
            customisation.
          </p>
        </Link>
      </div>

      <h2 className="mb-3 mt-10 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        Next steps
      </h2>
      <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/80">
        <li>
          <Link
            href="/docs/installation"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Set up your project
          </Link>{' '}
          — install peer deps, configure Tailwind, add the CSS variables.
        </li>
        <li>
          <Link
            href="/docs/cli"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Use the CLI
          </Link>{' '}
          — add components by URL with{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">shadcn add</code>.
        </li>
        <li>
          <Link
            href="/docs/components/badge"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Browse components
          </Link>{' '}
          — start with Badge.
        </li>
      </ul>
    </article>
  );
}
