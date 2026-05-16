import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 36:1881 (Pantheon › Buttons).
//
// Figma documents 200+ frames across three button "frames":
//   • Primary  (42:383)  — solid filled
//   • Tonal    (45:238)  — tinted background + brand border
//   • Outline  (45:303)  — neutral surface + neutral border
// plus Icon-Only and Text Button frames. They all collapse into one
// component driven by `variant`, `shape`, `size`, and `iconOnly`.
//
// Tokens from Figma:
//   • Heights:        32 / 36 / 40 / 48 px (xs / sm / md / lg)
//   • Square radius:  8 / 10 / 10 / 12 px (square/small/medium/medium/large)
//   • Round radius:   200 px (full pill)
//   • Icon sizes:     18 / 18 / 20 / 24 px
//   • Type sizes:     14/22 (xs/sm/md) and 16/24 (lg) · Inter Medium (500)
//   • Padding:        px-4 py-2 (all sizes)
//   • Gap (icon↔txt): 8 px
//   • Min width:      88 px on primary/tonal text labels (outline auto-hugs)
//
// Per-variant colors (Figma tokens shown in parentheses):
//   Primary   enabled bg #1770ee (buttons/primary)   text white
//             active  bg #125abe (buttons/primary-pressed)
//   Tonal     enabled bg #e8f1fd (buttons/tonal)     text #1770ee (text/brand)  border #1770ee
//             active  bg #d1e2fc (buttons/tonal-pressed)
//   Outline   enabled bg white   (buttons/tertiary)  text black                 border #e5e5e5
//             active  bg #fafafa (surface/secondary)
//   Text      enabled transparent                    text #1770ee
//             active  bg #fafafa
//   Disabled  bg #f5f5f5 (buttons/disabled)  text #999 (text/disabled)  border #ccc

const buttonVariants = cva(
  cn(
    'group/btn relative inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap',
    "font-medium font-['Inter',ui-sans-serif,system-ui,sans-serif]",
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1770ee] focus-visible:ring-offset-2',
    'disabled:pointer-events-none',
    '[&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'border border-transparent bg-[#1770ee] text-white',
          'active:bg-[#125abe]',
          'disabled:bg-[#f5f5f5] disabled:text-[#999] disabled:border-transparent',
        ),
        tonal: cn(
          'border border-[#1770ee] bg-[#e8f1fd] text-[#1770ee]',
          'active:bg-[#d1e2fc]',
          'disabled:bg-[#f5f5f5] disabled:text-[#999] disabled:border-[#cccccc]',
        ),
        outline: cn(
          'border border-[#e5e5e5] bg-white text-black',
          'active:bg-[#fafafa]',
          'disabled:bg-[#f5f5f5] disabled:text-[#999] disabled:border-[#cccccc]',
        ),
        text: cn(
          'border border-transparent bg-transparent text-[#1770ee]',
          'active:bg-[#fafafa]',
          'disabled:bg-transparent disabled:text-[#999]',
        ),
      },
      shape: {
        square: '',
        round: 'rounded-[200px]',
      },
      size: {
        xs: 'h-8 gap-2 px-4 text-[14px] leading-[22px] [&_svg]:size-[18px]',
        sm: 'h-9 gap-2 px-4 text-[14px] leading-[22px] [&_svg]:size-[18px]',
        md: 'h-10 gap-2 px-4 text-[14px] leading-[22px] [&_svg]:size-[20px]',
        lg: 'h-12 gap-2 px-4 text-[16px] leading-[24px] [&_svg]:size-[24px]',
      },
      iconOnly: {
        true: 'p-0',
        false: '',
      },
    },
    compoundVariants: [
      // Square radius per Figma `square/small|medium|large` tokens.
      { shape: 'square', size: 'xs', class: 'rounded-[8px]' },
      { shape: 'square', size: 'sm', class: 'rounded-[10px]' },
      { shape: 'square', size: 'md', class: 'rounded-[10px]' },
      { shape: 'square', size: 'lg', class: 'rounded-[12px]' },
      // Min-width applies to filled labels only (matches Figma: primary/tonal = 88px,
      // outline & text hug their content).
      { variant: 'primary', iconOnly: false, class: 'min-w-[88px]' },
      { variant: 'tonal', iconOnly: false, class: 'min-w-[88px]' },
      // Icon-only buttons become square: width = height, no min-width.
      { iconOnly: true, size: 'xs', class: 'w-8 min-w-0' },
      { iconOnly: true, size: 'sm', class: 'w-9 min-w-0' },
      { iconOnly: true, size: 'md', class: 'w-10 min-w-0' },
      { iconOnly: true, size: 'lg', class: 'w-12 min-w-0' },
    ],
    defaultVariants: {
      variant: 'primary',
      shape: 'square',
      size: 'md',
      iconOnly: false,
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    ButtonVariantProps {
  /** Optional icon rendered before the label. Ignored when `iconOnly`. */
  leadingIcon?: React.ReactNode;
  /** Optional icon rendered after the label. Ignored when `iconOnly`. */
  trailingIcon?: React.ReactNode;
  /** Native button `type` — defaults to `"button"` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      shape,
      size,
      iconOnly,
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
        className={cn(
          buttonVariants({ variant, shape, size, iconOnly }),
          className,
        )}
        {...props}
      >
        {iconOnly ? (
          children
        ) : (
          <>
            {leadingIcon}
            {children}
            {trailingIcon}
          </>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
