import type { MDXComponents } from 'mdx/types';
import { MdxPre } from '@/components/mdx-pre';
import { InstallCommand } from '@/components/install-command';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-3 text-4xl font-bold tracking-tight">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-10 border-b border-border pb-2 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-6 text-xl font-semibold tracking-tight">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="my-4 leading-7 text-foreground/80">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2 text-foreground/80">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2 text-foreground/80">{children}</ol>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:no-underline"
      >
        {children}
      </a>
    ),
    code: ({ children, className }) => {
      // Inline `code` — rehype-pretty-code doesn't process these by default,
      // so we keep simple styling. Fenced code blocks go through `pre` below.
      if (className?.startsWith('language-')) {
        return <code className={className}>{children}</code>;
      }
      return (
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">
          {children}
        </code>
      );
    },
    pre: MdxPre,
    InstallCommand,
    ...components,
  };
}
