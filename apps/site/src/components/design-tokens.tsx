import type { ReactNode } from 'react';

export interface TokenRow {
  label: string;
  value: string;
  visual: ReactNode;
  figmaName?: string;
}

interface DesignTokensProps {
  rows: TokenRow[];
}

export function DesignTokens({ rows }: DesignTokensProps) {
  return (
    <div className="not-prose my-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rows.map((row) => (
        <div
          key={row.label}
          className="group flex items-center gap-4 overflow-hidden rounded-xl border border-border bg-background p-4 transition-colors hover:border-foreground/20"
        >
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-muted/40 ring-1 ring-inset ring-border">
            {row.visual}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {row.label}
            </div>
            <div className="mt-0.5 truncate font-mono text-sm font-semibold text-foreground">
              {row.value}
            </div>
            {row.figmaName && (
              <div className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                figma: {row.figmaName}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
