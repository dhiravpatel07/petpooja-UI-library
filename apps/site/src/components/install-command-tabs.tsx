'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Manager } from './install-command';

interface Variant {
  manager: Manager;
  command: string;
  html: string;
}

interface InstallCommandTabsProps {
  variants: Variant[];
}

export function InstallCommandTabs({ variants }: InstallCommandTabsProps) {
  const [activeManager, setActiveManager] = useState<Manager>(variants[0]?.manager ?? 'pnpm');
  const [copied, setCopied] = useState(false);
  const active = variants.find((v) => v.manager === activeManager) ?? variants[0];

  if (!active) return null;

  const onCopy = async () => {
    await navigator.clipboard.writeText(active.command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/40 px-2 py-1.5">
        <div className="flex">
          {variants.map((v) => (
            <button
              key={v.manager}
              type="button"
              onClick={() => setActiveManager(v.manager)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                v.manager === activeManager
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-100',
              )}
            >
              {v.manager}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-zinc-700/60 bg-zinc-900/60 px-2 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div
        className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed [&_pre]:!bg-transparent [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: active.html }}
      />
    </div>
  );
}
