import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 57:165 (Pantheon › Chips).
//
// The Figma file documents 96 frames — 4 sizes × 2 shapes × 3 states ×
// 4 icon configurations — that all collapse into one component driven by
// `size`, `shape`, `selected`, plus optional `leadingIcon` / `trailingIcon`.
//
// State mapping:
//   • Active   → idle / default
//   • Pressed  → native `:active` pseudo (rendered while the pointer is held)
//   • Selected → controlled `selected` prop (persistent toggled state)
//
// Tokens from Figma:
//   • Heights:        32 / 36 / 40 / 48 px (xs / sm / md / lg)
//   • Square radius:  10 px (all sizes share the same `square/medium` token)
//   • Round radius:   200 px (full pill)
//   • Icon sizes:     18 / 18 / 20 / 24 px
//   • Type sizes:     14/22 (xs/sm/md) and 16/24 (lg) · Inter Medium (500)
//   • Padding:        px-4 (16) py-2 (8) — same across all sizes
//   • Gap (icon↔txt): 8 px
//
// Per-state colors (Figma tokens shown in parentheses):
//   Active    bg transparent              border 1px   #e5e5e5 (border/primary)   text #000 medium
//   Pressed   bg rgba(58,132,236,0.08)    border 1px   #e5e5e5                    text #000 medium
//             (surface-state/secondary/opacity-08)
//   Selected  bg #e8f1fd (buttons/tonal)  border 1.25px #1770ee (border/brand)    text #1770ee semibold
//   Disabled  bg #f5f5f5 (buttons/disabled)  text #999 (text/disabled)            border #ccc (border/disabled)

const chipVariants = cva(
  cn(
    'group/chip relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap',
    "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
    'px-4 py-2 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1770ee] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:pointer-events-none',
    '[&_svg]:shrink-0',
  ),
  {
    variants: {
      size: {
        xs: 'h-8 gap-2 text-[14px] leading-[22px] [&_svg]:size-[18px]',
        sm: 'h-9 gap-2 text-[14px] leading-[22px] [&_svg]:size-[18px]',
        md: 'h-10 gap-2 text-[14px] leading-[22px] [&_svg]:size-[20px]',
        lg: 'h-12 gap-2 text-[16px] leading-[24px] [&_svg]:size-6',
      },
      shape: {
        square: 'rounded-[10px]',
        round: 'rounded-[200px]',
      },
      selected: {
        // Idle/Pressed share the same neutral border + black label;
        // Pressed adds a subtle tinted overlay via native :active.
        false: cn(
          'border border-[#e5e5e5] bg-transparent font-medium text-black',
          'active:bg-[rgba(58,132,236,0.08)]',
          'disabled:bg-[#f5f5f5] disabled:text-[#999] disabled:border-[#cccccc]',
        ),
        // Selected uses the 1.25px brand border + tinted fill + semibold brand text.
        true: cn(
          'border-[1.25px] border-[#1770ee] bg-[#e8f1fd] font-semibold text-[#1770ee]',
          'active:bg-[#d1e2fc]',
          'disabled:bg-[#f5f5f5] disabled:text-[#999] disabled:border-[#cccccc]',
        ),
      },
    },
    defaultVariants: {
      size: 'md',
      shape: 'round',
      selected: false,
    },
  },
);

type ChipVariantProps = VariantProps<typeof chipVariants>;

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    Omit<ChipVariantProps, 'selected'> {
  /** Persistent toggled state. Maps to the Figma "Selected" frame. */
  selected?: boolean;
  /** Optional icon rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Optional icon rendered after the label. */
  trailingIcon?: React.ReactNode;
  /** Native button `type` — defaults to `"button"` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    {
      className,
      size,
      shape,
      selected = false,
      leadingIcon,
      trailingIcon,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={selected}
        data-state={selected ? 'selected' : 'active'}
        className={cn(chipVariants({ size, shape, selected }), className)}
        {...props}
      >
        {leadingIcon}
        {children}
        {trailingIcon}
      </button>
    );
  },
);
Chip.displayName = 'Chip';

export { chipVariants };
