'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 66:688 (Pantheon › Pop Up).
//
// Two documented variants from Figma — Default (header + body + footer)
// and Image (media + title + description + footer) — handled by
// composition: consumers pick which subcomponents to include.
//
// Built on Radix Dialog for ARIA semantics, focus trap, ESC key, and
// scroll lock. Centered on the viewport at 500px wide, with a subtle
// zoom-in animation on open and zoom-out on close.

const Popup = DialogPrimitive.Root;
const PopupTrigger = DialogPrimitive.Trigger;
const PopupPortal = DialogPrimitive.Portal;
const PopupClose = DialogPrimitive.Close;

const PopupOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/40',
      'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      className,
    )}
    {...props}
  />
));
PopupOverlay.displayName = 'PopupOverlay';

interface PopupContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideOverlay?: boolean;
}

const PopupContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  PopupContentProps
>(({ className, children, hideOverlay = false, ...props }, ref) => (
  <PopupPortal>
    {!hideOverlay && <PopupOverlay />}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
        'w-full max-w-[500px]',
        'flex max-h-[90vh] flex-col overflow-hidden bg-white',
        "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        'rounded-[10px] border border-[#e6e6e6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
        'focus:outline-none',
        'data-[state=open]:animate-popup-in data-[state=closed]:animate-popup-out',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </PopupPortal>
));
PopupContent.displayName = 'PopupContent';

// Top row for the Default variant. Holds the icon + title block on the
// left and the close button on the right. Padded so it sits inside the
// rounded corners with 16px breathing room.
const PopupHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex w-full items-center justify-between px-4 pt-4', className)}
      {...props}
    />
  ),
);
PopupHeader.displayName = 'PopupHeader';

// Body — vertical stack for Title + Description (or any free-form
// content). 8px gap between children matches the Figma title/desc gap.
const PopupBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex w-full flex-col gap-2 px-4 pt-4', className)}
      {...props}
    />
  ),
);
PopupBody.displayName = 'PopupBody';

// Action row pinned to the right. 24px top padding creates the gap from
// the body block; 16px bottom padding seats it inside the rounded corners.
const PopupFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex w-full items-center justify-end gap-4 px-4 pb-4 pt-6', className)}
      {...props}
    />
  ),
);
PopupFooter.displayName = 'PopupFooter';

// Edge-to-edge media area (used by the Image variant). 250px tall,
// `surface/tertiary` grey fill. The close icon should be positioned
// absolutely on top by the consumer.
const PopupMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative h-[250px] w-full overflow-hidden bg-[#f0f0f0]', className)}
      {...props}
    />
  ),
);
PopupMedia.displayName = 'PopupMedia';

const PopupTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-[18px] font-semibold leading-[26px] text-black', className)}
    {...props}
  />
));
PopupTitle.displayName = 'PopupTitle';

const PopupDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-[16px] font-normal leading-[24px] text-black', className)}
    {...props}
  />
));
PopupDescription.displayName = 'PopupDescription';

// Pre-styled close button with the X glyph (matching Figma 20×20 icon).
// Renders as a Radix Close so clicking dismisses the popup; positioned
// inline in PopupHeader by default, but accepts a className override for
// absolute positioning over PopupMedia in the Image variant.
const PopupCloseIcon = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'children'>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-black/80 transition-colors',
      'hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  </DialogPrimitive.Close>
));
PopupCloseIcon.displayName = 'PopupCloseIcon';

export {
  Popup,
  PopupTrigger,
  PopupClose,
  PopupPortal,
  PopupOverlay,
  PopupContent,
  PopupHeader,
  PopupBody,
  PopupFooter,
  PopupMedia,
  PopupTitle,
  PopupDescription,
  PopupCloseIcon,
};
