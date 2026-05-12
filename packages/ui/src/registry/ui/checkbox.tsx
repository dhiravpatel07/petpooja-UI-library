'use client';
import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2331:76 (Pantheon › Checkbox).
//
// Figma frame is 24×24 (the Material Design icon canvas). The visible box is
// inset 14.58% on each side → 17×17 px, centered. That structure is preserved
// here: the Radix Root is the 24×24 hit area, and an inner <span> renders the
// 17×17 visible box with the actual styling.
//
// Three types (Unselected / Selected / Indeterminate) × two states
// (Enabled / Disabled) — driven via Radix Checkbox so the indeterminate
// state, ARIA roles, focus, and keyboard activation are handled for us.

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // 24×24 hit area — matches the Figma frame size exactly.
      'peer group/checkbox inline-flex h-6 w-6 shrink-0 items-center justify-center outline-none disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className={cn(
        // 17×17 visible box centered in the 24×24 hit area (Figma inset 14.58%).
        'flex h-[17px] w-[17px] items-center justify-center rounded-[2px] border-2 border-black bg-white transition-colors',
        // Selected + Indeterminate — fill with primary blue
        'group-data-[state=checked]/checkbox:border-[#1770ee] group-data-[state=checked]/checkbox:bg-[#1770ee]',
        'group-data-[state=indeterminate]/checkbox:border-[#1770ee] group-data-[state=indeterminate]/checkbox:bg-[#1770ee]',
        // Disabled (unselected) — light gray border
        'group-disabled/checkbox:border-[#cccccc]',
        // Disabled + Selected/Indeterminate — full gray fill
        'group-disabled/checkbox:group-data-[state=checked]/checkbox:border-[#cccccc] group-disabled/checkbox:group-data-[state=checked]/checkbox:bg-[#cccccc]',
        'group-disabled/checkbox:group-data-[state=indeterminate]/checkbox:border-[#cccccc] group-disabled/checkbox:group-data-[state=indeterminate]/checkbox:bg-[#cccccc]',
        // Focus ring on the visible box (not the surrounding hit area)
        'group-focus-visible/checkbox:ring-2 group-focus-visible/checkbox:ring-ring group-focus-visible/checkbox:ring-offset-2',
      )}
    >
      <CheckboxPrimitive.Indicator className="flex h-full w-full items-center justify-center text-white">
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className="hidden h-[13px] w-[13px] group-data-[state=checked]/checkbox:block"
          aria-hidden="true"
        >
          <path
            d="M2.5 7.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg
          viewBox="0 0 14 14"
          fill="none"
          className="hidden h-[13px] w-[13px] group-data-[state=indeterminate]/checkbox:block"
          aria-hidden="true"
        >
          <path
            d="M3 7h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </span>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

export { Checkbox };
