'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2400:18 (Pantheon › Side Drawer).
//
// A right-anchored (or left-anchored) dialog that slides in from the edge
// of the viewport, fills the full height, and is 550 px wide on desktop.
// Three documented Figma states map to composition rather than props:
//   • Default    — header + scrolling body (sections, dividers, lists) + CTA footer
//   • Zero State — header + centered media + centered title/description + CTA footer
//   • Custom     — header + an arbitrary body slot (no built-in spacing)
//
// Built on Radix Dialog for focus trap, ESC dismissal, scroll lock, and ARIA
// roles. The black/40 overlay fades; the panel slides from the chosen edge.
//
// Figma variable map (node 2421:169):
//   Surface/Primary   #FFFFFF — panel + footer bg
//   Surface/Tertiary  #F0F0F0 — Zero State media fallback
//   Border/Primary    #E5E5E5 — footer top border, ActionCTA border
//   Text/Primary      #000000 — title, body, secondary button label
//   Text/Secondary    #666666 — subtitle, supporting text
//   Text/Invert       #FFFFFF — primary button label
//   Buttons/Primary   #1770EE — primary button fill
//   Buttons/Tertiary  #FFFFFF — secondary / close-icon-button bg
//   Square/Small      8 px    — Action CTA radius
//   Square/Medium     10 px   — Panel + close-icon-button radius
//   Square/Large      12 px   — Footer button radius
//
// Typography:
//   Display Small · Inter SemiBold 20 / 28  — Title
//   Body Medium   · Inter Medium    14 / 22 — Subtitle
//   Body Large    · Inter Regular   16 / 24 — Body text + buttons
//   Title Small   · Inter Medium    14 / 22 — Action CTA chip
//
// Layout tokens:
//   • Panel             550 px wide · h-full · 10 px corner radius on the
//                       outer edge only (right-anchored: rounded-l;
//                       left-anchored: rounded-r)
//   • Header padding    24 px all sides · sticky to top
//   • Body              flex-1 · scrollable · 24 px gap between default
//                       sections · 24 px horizontal section padding
//   • Section divider   1 px · #D9D9D9 · full width
//   • Footer padding    16 px · 16 px gap between buttons
//   • Buttons           h-12 · 12 px radius · flex-1 · max-w-200

const SideDrawer = DialogPrimitive.Root;
const SideDrawerTrigger = DialogPrimitive.Trigger;
const SideDrawerPortal = DialogPrimitive.Portal;
const SideDrawerClose = DialogPrimitive.Close;

// ─── Overlay ───────────────────────────────────────────────────────────────

const SideDrawerOverlay = React.forwardRef<
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
SideDrawerOverlay.displayName = 'SideDrawerOverlay';

// ─── Content (panel) ───────────────────────────────────────────────────────

type SideDrawerSide = 'right' | 'left';

interface SideDrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /** Which edge the drawer anchors and slides in from. Default `'right'`. */
  side?: SideDrawerSide;
  /** Suppress the dim overlay. Useful for inline drawer demos. */
  hideOverlay?: boolean;
}

const SideDrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SideDrawerContentProps
>(({ className, children, side = 'right', hideOverlay = false, ...props }, ref) => (
  <SideDrawerPortal>
    {!hideOverlay && <SideDrawerOverlay />}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-y-0 z-50 flex h-full w-full max-w-[550px] flex-col bg-white',
        "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        'shadow-[0_1px_1px_0_rgba(0,0,0,0.05)] focus:outline-none',
        // Anchor + corner radius — rounded only on the inner-facing edge
        side === 'right'
          ? 'right-0 rounded-l-[10px] data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right'
          : 'left-0 rounded-r-[10px] data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left',
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </SideDrawerPortal>
));
SideDrawerContent.displayName = 'SideDrawerContent';

// ─── Header ────────────────────────────────────────────────────────────────

const SideDrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // 24 px padding all sides, flex-row with title on the left and close
      // on the right. `sticky top-0` keeps it pinned when the body scrolls.
      'sticky top-0 z-10 flex w-full shrink-0 items-center justify-between gap-3 bg-white p-6',
      className,
    )}
    {...props}
  />
));
SideDrawerHeader.displayName = 'SideDrawerHeader';

// Optional 24×24 leading icon (defaults to a back arrow per Figma).
const SideDrawerLeadingIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    aria-hidden="true"
    className={cn(
      'flex size-6 shrink-0 items-center justify-center text-black',
      className,
    )}
    {...props}
  >
    {children ?? (
      <svg viewBox="0 0 24 24" fill="none" className="size-full">
        <path
          d="M20 12H4M10 6l-6 6 6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
));
SideDrawerLeadingIcon.displayName = 'SideDrawerLeadingIcon';

const SideDrawerTitleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // 8 px gap between leading icon and the title/subtitle stack
    className={cn('flex min-w-0 flex-1 items-start gap-2', className)}
    {...props}
  />
));
SideDrawerTitleGroup.displayName = 'SideDrawerTitleGroup';

const SideDrawerTitleStack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex min-w-0 flex-col items-start gap-1', className)}
    {...props}
  />
));
SideDrawerTitleStack.displayName = 'SideDrawerTitleStack';

const SideDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      // Display Small · Inter SemiBold · 20 / 28 · Text/Primary
      'truncate text-[20px] font-semibold leading-[28px] text-black',
      className,
    )}
    {...props}
  />
));
SideDrawerTitle.displayName = 'SideDrawerTitle';

const SideDrawerSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Body Medium · Inter Medium · 14 / 22 · Text/Secondary
      'truncate text-[14px] font-medium leading-[22px] text-[#666666]',
      className,
    )}
    {...props}
  />
));
SideDrawerSubtitle.displayName = 'SideDrawerSubtitle';

// 40×40 outline icon button in the top-right corner. Acts as Radix Close.
const SideDrawerCloseIcon = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'children'>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      // 40×40 hit area, 10 px radius, Buttons/Tertiary bg, neutral border.
      'inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-[#E5E5E5] bg-white text-black',
      'transition-colors hover:bg-[#FAFAFA]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1770EE]/40 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="size-5"
    >
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  </DialogPrimitive.Close>
));
SideDrawerCloseIcon.displayName = 'SideDrawerCloseIcon';

// ─── Body ──────────────────────────────────────────────────────────────────

interface SideDrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply the default 24-px section gap and 24-px horizontal section padding. */
  divided?: boolean;
}

const SideDrawerBody = React.forwardRef<HTMLDivElement, SideDrawerBodyProps>(
  ({ className, divided, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex min-h-0 w-full flex-1 flex-col overflow-y-auto',
        // When `divided` is set, sections separated by `<SideDrawerSeparator />`
        // pick up a 24 px gap and lose their inline horizontal padding (the
        // section helper applies its own).
        divided && 'gap-6',
        className,
      )}
      {...props}
    />
  ),
);
SideDrawerBody.displayName = 'SideDrawerBody';

// Section helper — wraps content with 24-px horizontal padding and a 16-px
// vertical gap between children. Use it for the typical 2-line / list /
// labelled-row sections from Figma. Optional, you can render raw children too.
const SideDrawerSection = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn('flex w-full flex-col items-start gap-4 px-6', className)}
    {...props}
  />
));
SideDrawerSection.displayName = 'SideDrawerSection';

const SideDrawerSectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      // Body Large · Inter Medium · 16 / 24 · Text/Primary
      'text-[16px] font-medium leading-[24px] text-black',
      className,
    )}
    {...props}
  />
));
SideDrawerSectionTitle.displayName = 'SideDrawerSectionTitle';

const SideDrawerText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Body Medium · Inter Regular · 14 / 22 · Text/Primary
      'text-[14px] font-normal leading-[22px] text-black',
      className,
    )}
    {...props}
  />
));
SideDrawerText.displayName = 'SideDrawerText';

const SideDrawerSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    aria-orientation="horizontal"
    className={cn('h-px w-full shrink-0 bg-[#D9D9D9]', className)}
    {...props}
  />
));
SideDrawerSeparator.displayName = 'SideDrawerSeparator';

// ─── Footer (CTA row) ──────────────────────────────────────────────────────

const SideDrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Top border, white bg, 16 px padding, 16 px gap, right-aligned by
      // default (justify-end) to mirror Figma.
      'flex w-full shrink-0 items-center justify-end gap-4 border-t border-[#E5E5E5] bg-white p-4',
      className,
    )}
    {...props}
  />
));
SideDrawerFooter.displayName = 'SideDrawerFooter';

const SideDrawerCancelButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      // Secondary / Outline — Buttons/Tertiary fill, Border/Primary stroke,
      // 48 px tall, 12 px radius (Square/Large), Title Medium label.
      'flex h-12 min-w-0 flex-1 max-w-[200px] items-center justify-center rounded-[12px] border border-[#E5E5E5] bg-white px-6 py-2',
      'text-[16px] font-medium leading-[24px] text-black',
      'outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
SideDrawerCancelButton.displayName = 'SideDrawerCancelButton';

const SideDrawerConfirmButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      // Primary — Buttons/Primary fill, white label, 48 px tall, 12 px radius.
      'flex h-12 min-w-[88px] flex-1 max-w-[200px] items-center justify-center rounded-[12px] bg-[#1770EE] px-6 py-2',
      'text-[16px] font-medium leading-[24px] text-white',
      'outline-none transition-colors hover:bg-[#125ABE] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
SideDrawerConfirmButton.displayName = 'SideDrawerConfirmButton';

// ─── Inline "Action CTA" chip ──────────────────────────────────────────────
// Small 32-px outline button used inside content sections (e.g. an "Edit"
// affordance next to a content title). Matches Figma's `Outline · sm` button.

const SideDrawerActionCta = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      'flex h-8 shrink-0 items-center justify-center rounded-[8px] border border-[#E5E5E5] bg-white px-4 py-2',
      // Title Small · Inter Medium · 14 / 22
      'text-[14px] font-medium leading-[22px] text-black',
      'outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
SideDrawerActionCta.displayName = 'SideDrawerActionCta';

// ─── Zero State media slot ─────────────────────────────────────────────────
// Full-width 250-px tall placeholder used in the "Zero State" Figma variant.
// Background is Surface/Tertiary; consumers can drop any child (image, SVG,
// illustration) inside.

interface SideDrawerMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override the default 250 px height. */
  height?: number | string;
}

const SideDrawerMedia = React.forwardRef<HTMLDivElement, SideDrawerMediaProps>(
  ({ className, children, height = 250, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative mx-6 w-[calc(100%-3rem)] shrink-0 overflow-hidden rounded-[10px] bg-[#F0F0F0]',
        className,
      )}
      style={{ height, ...style }}
      {...props}
    >
      {children}
    </div>
  ),
);
SideDrawerMedia.displayName = 'SideDrawerMedia';

const SideDrawerZeroStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      // Title Large · Inter SemiBold · 18 / 26 · Text/Primary
      'text-center text-[18px] font-semibold leading-[26px] text-black',
      className,
    )}
    {...props}
  />
));
SideDrawerZeroStateTitle.displayName = 'SideDrawerZeroStateTitle';

const SideDrawerZeroStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      // Body Large · Inter Regular · 16 / 24 · Text/Secondary, centered.
      'text-center text-[16px] font-normal leading-[24px] text-[#666666]',
      className,
    )}
    {...props}
  />
));
SideDrawerZeroStateDescription.displayName = 'SideDrawerZeroStateDescription';

// Common wrapper for the Zero State body (centered media + text block).
const SideDrawerZeroState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full flex-col items-center gap-6',
      className,
    )}
    {...props}
  />
));
SideDrawerZeroState.displayName = 'SideDrawerZeroState';

export {
  SideDrawer,
  SideDrawerTrigger,
  SideDrawerPortal,
  SideDrawerClose,
  SideDrawerOverlay,
  SideDrawerContent,
  SideDrawerHeader,
  SideDrawerLeadingIcon,
  SideDrawerTitleGroup,
  SideDrawerTitleStack,
  SideDrawerTitle,
  SideDrawerSubtitle,
  SideDrawerCloseIcon,
  SideDrawerBody,
  SideDrawerSection,
  SideDrawerSectionTitle,
  SideDrawerText,
  SideDrawerSeparator,
  SideDrawerFooter,
  SideDrawerCancelButton,
  SideDrawerConfirmButton,
  SideDrawerActionCta,
  SideDrawerMedia,
  SideDrawerZeroState,
  SideDrawerZeroStateTitle,
  SideDrawerZeroStateDescription,
};

export type {
  SideDrawerContentProps,
  SideDrawerSide,
  SideDrawerBodyProps,
  SideDrawerMediaProps,
};
