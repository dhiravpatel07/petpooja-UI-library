'use client';
import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2381:1299 (Pantheon › Radio Buttons).
//
// Figma frame is 24×24 (the Material Design icon canvas). The visible
// circle is inset 10.42% on each side → 19×19 px, centered. That
// structure is preserved here: the Radix Item is the 24×24 hit area,
// and an inner <span> renders the 19×19 visible circle with the actual
// border and selected-state indicator.
//
// Four documented states: Selected × Disabled — driven via Radix
// RadioGroup so ARIA roles, focus, keyboard arrows, and form
// integration are handled for us.

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
));
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      // 24×24 hit area — matches the Figma frame size exactly.
      'peer group/radio inline-flex h-6 w-6 shrink-0 items-center justify-center outline-none disabled:cursor-not-allowed',
      className,
    )}
    {...props}
  >
    <span
      aria-hidden="true"
      className={cn(
        // 19×19 visible circle centered in the 24×24 hit area
        'flex h-[19px] w-[19px] items-center justify-center rounded-full border-2 border-black bg-white transition-colors',
        // Selected — fill the border with primary blue
        'group-data-[state=checked]/radio:border-[#1770ee]',
        // Disabled — overrides both unselected (black) and selected (blue) → gray
        'group-disabled/radio:border-[#cccccc]',
        // Focus ring on the visible circle (not the surrounding hit area)
        'group-focus-visible/radio:ring-2 group-focus-visible/radio:ring-ring group-focus-visible/radio:ring-offset-2',
      )}
    >
      <RadioGroupPrimitive.Indicator
        className={cn(
          // 9×9 inner dot — only rendered when the item is checked
          'block h-[9px] w-[9px] rounded-full bg-[#1770ee] transition-colors',
          // Disabled checked — gray dot to match the gray border
          'group-disabled/radio:bg-[#cccccc]',
        )}
      />
    </span>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
