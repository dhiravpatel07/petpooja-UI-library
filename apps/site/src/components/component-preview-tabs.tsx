'use client';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComponentPreviewTabsProps {
  preview: ReactNode;
  codeHtml: string;
  codeText: string;
  language: string;
  className?: string;
  previewClassName?: string;
}

export function ComponentPreviewTabs({
  preview,
  codeHtml,
  codeText,
  language,
  className,
  previewClassName,
}: ComponentPreviewTabsProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      className={cn(
        'not-prose group/preview my-6 overflow-hidden rounded-xl border border-border',
        className,
      )}
    >
      <div className="relative z-10 flex items-center justify-between border-b border-border bg-muted/40 px-2 py-1.5">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setTab('preview')}
            aria-pressed={tab === 'preview'}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors',
              tab === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab('code')}
            aria-pressed={tab === 'code'}
            className={cn(
              'cursor-pointer rounded-md px-3 py-1 text-xs font-medium transition-colors',
              tab === 'code'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            Code
          </button>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            'cursor-pointer rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground',
            tab === 'code' ? 'visible' : 'invisible',
          )}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Both panels are always mounted — we toggle visibility via `hidden`
          rather than conditional rendering. That isolates the Preview/Code
          buttons from any event or reconciliation quirks coming from the
          rendered preview component (e.g. nested Tabs or modals). */}
      <div
        className={cn(
          'relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--color-border))_1px,_transparent_0)] [background-size:20px_20px] p-8',
          previewClassName,
          tab !== 'preview' && 'hidden',
        )}
      >
        {preview}
      </div>
      <div className={cn('bg-[#1e1e1e]', tab !== 'code' && 'hidden')}>
        <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {language}
          </span>
        </div>
        <div
          className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      </div>
    </div>
  );
}
