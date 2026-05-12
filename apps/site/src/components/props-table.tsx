import type { ReactNode } from 'react';
import { highlight } from '@/lib/highlight';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: ReactNode;
}

interface PropsTableProps {
  rows: PropRow[];
}

export async function PropsTable({ rows }: PropsTableProps) {
  const highlighted = await Promise.all(
    rows.map(async (r) => ({
      ...r,
      typeHtml: await highlight(r.type, 'ts'),
      defaultHtml: r.default ? await highlight(r.default, 'ts') : null,
    })),
  );

  return (
    <div className="not-prose my-6 grid gap-3">
      {highlighted.map((row) => (
        <div
          key={row.name}
          className="group relative overflow-hidden rounded-xl border border-border bg-background transition-colors hover:border-foreground/20"
        >
          <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#7e00d2] to-[#7e00d2]/30" />
          <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/30 px-5 py-3">
            <code className="font-mono text-sm font-semibold text-foreground">{row.name}</code>
            {row.required && (
              <span className="inline-flex h-5 items-center rounded-full bg-red-100 px-2 text-[10px] font-semibold uppercase tracking-wide text-red-700">
                required
              </span>
            )}
            <span
              className="ml-auto rounded-md bg-[#1e1e1e] px-2 py-1 font-mono text-[12px] [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0"
              dangerouslySetInnerHTML={{ __html: row.typeHtml }}
            />
          </div>
          <div className="px-5 py-4">
            <div className="text-sm leading-6 text-foreground/80">{row.description}</div>
            {row.defaultHtml && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Default
                </span>
                <span
                  className="rounded-md bg-[#1e1e1e] px-2 py-0.5 font-mono text-[12px] [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0"
                  dangerouslySetInnerHTML={{ __html: row.defaultHtml }}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
