'use client';
import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2382:278 (Pantheon › Switch).
//
// Sixteen documented variants: Selected × Type × Size × Icon. They're
// handled by the `size`, `icon`, and `disabled` props plus Radix Switch's
// `checked` state — no separate components needed.
//
// Tokens from Figma:
//   • Large: 52×32 track, 24×24 thumb, px-1 py-0.5
//   • Small: 44×24 track, 16×16 thumb, p-1
//   • Off enabled track:  #f0f0f0 + 16% black overlay ≈ #c9c9c9
//   • On enabled track:   #1770ee (buttons/primary)
//   • Disabled track:     #f0f0f0 + 8% black overlay ≈ #dddddd (either state)
//   • Thumb:              white, fully rounded
//   • Icon (when on):     #1770ee check inside the thumb

const switchTrack = cva(
  cn(
    'peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors',
    // Default (off, enabled) — dark gray
    'bg-[#c9c9c9]',
    // On, enabled — primary blue
    'data-[state=checked]:bg-[#1770ee]',
    // Disabled — overrides both (always lighter gray)
    'disabled:cursor-not-allowed disabled:bg-[#dddddd]',
    'data-[state=checked]:disabled:bg-[#dddddd]',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  ),
  {
    variants: {
      size: {
        large: 'h-8 w-[52px] px-1 py-0.5',
        small: 'h-6 w-11 p-1',
      },
    },
    defaultVariants: { size: 'large' },
  },
);

const switchThumb = cva(
  cn(
    'pointer-events-none flex items-center justify-center rounded-full bg-white shadow-sm transition-transform',
    // Translate 20px when on — same for both sizes because the math works out
    'data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5',
  ),
  {
    variants: {
      size: {
        large: 'h-6 w-6',
        small: 'h-4 w-4',
      },
    },
    defaultVariants: { size: 'large' },
  },
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchTrack> {
  /** Show a check icon inside the thumb when on. Matches the Figma `Icon=True` variant. */
  icon?: boolean;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = 'large', icon = false, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(switchTrack({ size }), className)}
    {...props}
  >
    <SwitchPrimitive.Thumb className={switchThumb({ size })}>
      {icon && (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={cn(
            // Only render visibly when track is checked — fades in/out
            'opacity-0 transition-opacity text-[#1770ee] group-data-[state=checked]/switch:opacity-100',
            size === 'small' ? 'h-2.5 w-2.5' : 'h-4 w-4',
          )}
        >
          <path
            d="M3 8.5l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </SwitchPrimitive.Thumb>
  </SwitchPrimitive.Root>
));
Switch.displayName = 'Switch';

export { Switch };
