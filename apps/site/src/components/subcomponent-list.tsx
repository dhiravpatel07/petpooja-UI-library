import type { ReactNode } from 'react';

export interface SubcomponentRow {
  name: string;
  description: ReactNode;
  forwardsTo?: string;
}

interface SubcomponentListProps {
  title?: string;
  rows: SubcomponentRow[];
}

export function SubcomponentList({ title = 'Also exports', rows }: SubcomponentListProps) {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-5 py-2.5">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {rows.length}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((row) => (
          <li
            key={row.name}
            className="flex flex-col gap-1.5 px-5 py-3.5 sm:flex-row sm:items-start sm:gap-6"
          >
            <div className="flex shrink-0 items-center gap-2 sm:min-w-[220px]">
              <code className="font-mono text-sm font-semibold text-foreground">{row.name}</code>
              {row.forwardsTo && (
                <span className="rounded bg-[#1e1e1e] px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                  {row.forwardsTo}
                </span>
              )}
            </div>
            <span className="text-sm leading-6 text-foreground/70">{row.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
