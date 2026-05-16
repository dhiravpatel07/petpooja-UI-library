'use client';
import * as React from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipHeader,
  TooltipTitle,
  TooltipIcon,
  TooltipDescription,
  TooltipClose,
  TooltipActions,
  TooltipAction,
  TooltipArrow,
  SimpleTooltip,
  Button,
} from '@petpooja/ui';

// Outline raven glyph — the canonical Pantheon system icon used in the Figma
// header example.
function RavenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M7 9c0-2 1.5-3.5 3.5-3.5S14 7 14 9c3 0.5 5.5 3 6 7l-2.5 0.5-2.5-1-3 1.5-3-1-3-1.5z" />
      <path d="M4 9.5l-2.5-0.5L4 10.5" />
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9 12c1.6 1 3.6 1.2 5.5 0.5" />
      <path d="M11 17v3.5M9 20.5l2-0.5 2 0.5" />
      <path d="M15 17v3.5M13 20.5l2-0.5 2 0.5" />
    </svg>
  );
}

function Centered({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex w-full items-center justify-center ${className ?? ''}`}>{children}</div>
  );
}

// ─── 1. Default — title + icon + description ──────────────────────────────

export function TooltipDefaultDemo() {
  return (
    <Centered className="!min-h-[260px]">
      <SimpleTooltip
        defaultOpen
        title="Title"
        icon={<RavenIcon />}
        description="Supporting line text lorem ipsum dolor sit amet, consectetur blah blah blah blah blah blah blah."
        side="bottom"
      >
        <Button variant="outline" size="sm">
          Open tooltip
        </Button>
      </SimpleTooltip>
    </Centered>
  );
}

// ─── 2. Minimal — description only ────────────────────────────────────────

export function TooltipMinimalDemo() {
  return (
    <Centered className="!min-h-[180px]">
      <SimpleTooltip
        defaultOpen
        description="Supporting line text lorem ipsum dolor sit amet, consectetur blah blah blah blah blah blah blah."
        side="bottom"
      >
        <Button variant="outline" size="sm">
          Hint
        </Button>
      </SimpleTooltip>
    </Centered>
  );
}

// ─── 3. With actions — confirm dialog style ───────────────────────────────

export function TooltipWithActionsDemo() {
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState(false);

  return (
    <Centered className="!min-h-[260px] flex-col gap-3">
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Delete record
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <TooltipHeader>
            <TooltipTitle>Delete record</TooltipTitle>
            <TooltipClose />
          </TooltipHeader>
          <TooltipDescription>
            This will permanently remove the record. You can&apos;t undo this action.
          </TooltipDescription>
          <TooltipActions>
            <TooltipAction closeOnClick>Cancel</TooltipAction>
            <TooltipAction
              variant="primary"
              closeOnClick
              onClick={() => setConfirmed(true)}
            >
              Confirm
            </TooltipAction>
          </TooltipActions>
          <TooltipArrow />
        </TooltipContent>
      </Tooltip>
      {confirmed ? (
        <p className="text-[12px] text-[#666]">Confirmed (demo only — nothing was deleted).</p>
      ) : null}
    </Centered>
  );
}

// ─── 4. All 12 placements ─────────────────────────────────────────────────

const PLACEMENTS = [
  { side: 'top', align: 'start', label: 'Top-left' },
  { side: 'top', align: 'center', label: 'Top-center' },
  { side: 'top', align: 'end', label: 'Top-right' },
  { side: 'right', align: 'start', label: 'Right-top' },
  { side: 'right', align: 'center', label: 'Right-center' },
  { side: 'right', align: 'end', label: 'Right-bottom' },
  { side: 'bottom', align: 'start', label: 'Bottom-left' },
  { side: 'bottom', align: 'center', label: 'Bottom-center' },
  { side: 'bottom', align: 'end', label: 'Bottom-right' },
  { side: 'left', align: 'start', label: 'Left-top' },
  { side: 'left', align: 'center', label: 'Left-center' },
  { side: 'left', align: 'end', label: 'Left-bottom' },
] as const;

export function TooltipPlacementsDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-x-6 gap-y-8 py-8 sm:grid-cols-3 lg:grid-cols-4">
      {PLACEMENTS.map((p) => (
        <div key={p.label} className="flex items-center justify-center">
          <SimpleTooltip
            side={p.side}
            align={p.align}
            title={p.label}
            description="Anchored to this trigger."
          >
            <Button variant="outline" size="sm">
              {p.label}
            </Button>
          </SimpleTooltip>
        </div>
      ))}
    </div>
  );
}

// ─── 5. Hover (CSS-only) — opens on pointer enter, closes on leave ────────

export function TooltipHoverDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <Centered className="!min-h-[180px]">
      <span
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <TooltipDescription>
              Hover tooltip — closes when the pointer leaves the trigger.
            </TooltipDescription>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </span>
    </Centered>
  );
}
