'use client';
import { useRef, useState, type HTMLAttributes } from 'react';

interface MdxPreProps extends HTMLAttributes<HTMLPreElement> {
  // rehype-pretty-code adds these data attrs on <pre>
  'data-language'?: string;
  'data-theme'?: string;
}

export function MdxPre({ children, ...props }: MdxPreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  // rehype-pretty-code sets data-language on the inner <code> element;
  // it propagates up via the child's props.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = (children as any)?.props ?? {};
  const language: string =
    props['data-language'] ?? childProps['data-language'] ?? 'text';

  const onCopy = async () => {
    if (!preRef.current) return;
    const text = preRef.current.innerText;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="not-prose group/code my-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/40 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-zinc-700/60 bg-zinc-900/60 px-2 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        ref={preRef}
        className="overflow-x-auto py-4 text-[13px] leading-relaxed [&>code]:bg-transparent"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
