'use client';
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2380:1293 (Pantheon › Tooltip).
//
// The Figma frame catalogues 72 variants — 12 placements × Title on/off ×
// Icon on/off × CTA on/off — that all collapse into one composable primitive:
//
//   <Tooltip>
//     <TooltipTrigger asChild>
//       <Button variant="text">Help</Button>
//     </TooltipTrigger>
//     <TooltipContent side="top" align="center">
//       <TooltipHeader>
//         <TooltipIcon><RavenIcon /></TooltipIcon>
//         <TooltipTitle>Title</TooltipTitle>
//         <TooltipClose />
//       </TooltipHeader>
//       <TooltipDescription>Supporting line text…</TooltipDescription>
//       <TooltipActions>
//         <TooltipAction>Cancel</TooltipAction>
//         <TooltipAction variant="primary">Confirm</TooltipAction>
//       </TooltipActions>
//       <TooltipArrow />
//     </TooltipContent>
//   </Tooltip>
//
// Position mapping (Figma → Radix `side` + `align`):
//   Top-left      → top + start          Bottom-left   → bottom + start
//   Top-center    → top + center         Bottom-center → bottom + center
//   Top-right     → top + end            Bottom-right  → bottom + end
//   Left-top      → left + start         Right-top     → right + start
//   Left-center   → left + center        Right-center  → right + center
//   Left-bottom   → left + end           Right-bottom  → right + end
//
// Built on Radix Popover (not Radix Tooltip) so the panel can hold interactive
// content — Close affordance, CTAs, links. Anchored positioning, click-outside,
// ESC dismissal, and focus management come for free.
//
// Tokens from Figma:
//   • Surface       `#F0F0F0` (Surface/Tertiary)
//   • Radius        12 px (square/large)
//   • Padding       16 px
//   • Width         296 px (default; override via className)
//   • Title         Inter Medium 16/24 #000
//   • Description   Inter Regular 14/22 #000
//   • Close icon    16×16  #000
//   • Leading icon  20×20  #000 (a Pantheon `raven` glyph in Figma examples)
//   • CTA           Text Buttons · Inter Medium 14/22 · #1770EE
//   • Arrow         12 × 6 px triangle in the same Surface/Tertiary fill
//   • Gap (title→description) 8 px · (description→actions) 16 px
//   • Header gap (icon→title) 8 px · (title→close) auto (space-between)

// ─── Root primitives ──────────────────────────────────────────────────────
// Direct re-exports of Radix Popover — wrapping them would just shadow the
// controlled / uncontrolled API (`open`, `defaultOpen`, `onOpenChange`).

const Tooltip = PopoverPrimitive.Root;
const TooltipTrigger = PopoverPrimitive.Trigger;
const TooltipAnchor = PopoverPrimitive.Anchor;
const TooltipPortal = PopoverPrimitive.Portal;
const TooltipClosePrimitive = PopoverPrimitive.Close;

// ─── Content panel ────────────────────────────────────────────────────────

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Drop the default 296 px max-width when you want a fluid tooltip. */
  fluid?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 8, align = 'center', fluid, children, ...props }, ref) => (
  <TooltipPortal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      collisionPadding={8}
      className={cn(
        'z-50 outline-none',
        // Surface + radius + base padding match Figma's outer panel exactly.
        'rounded-[12px] bg-[#F0F0F0] p-4',
        "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        'text-[14px] leading-[22px] text-black',
        // Default 296 px panel width — override with `fluid` or a custom class.
        !fluid && 'w-[296px] max-w-[calc(100vw-1rem)]',
        // Subtle elevation so the panel reads as floating over the page.
        'shadow-[0_2px_8px_0_rgba(0,0,0,0.12)]',
        // Open/close animations — match the Pantheon `fade-in` keyframes.
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
        className,
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </TooltipPortal>
));
TooltipContent.displayName = 'TooltipContent';

// ─── Header row (icon + title + close) ────────────────────────────────────
// Auto-spreads its children with `justify-between` so the close icon hugs
// the right edge while the icon+title cluster sits on the left.

const TooltipHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex w-full items-start justify-between gap-2',
      className,
    )}
    {...props}
  />
));
TooltipHeader.displayName = 'TooltipHeader';

// ─── Title ─────────────────────────────────────────────────────────────────
// Inter Medium 16/24 #000. Auto-grows to fill the header row.

const TooltipTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'flex-1 min-w-0 text-[16px] font-medium leading-[24px] text-black',
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
TooltipTitle.displayName = 'TooltipTitle';

// ─── Leading icon (raven glyph in Figma) ─────────────────────────────────

export type TooltipIconProps = React.HTMLAttributes<HTMLSpanElement>;

const TooltipIcon = React.forwardRef<HTMLSpanElement, TooltipIconProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'inline-flex h-5 w-5 shrink-0 items-center justify-center text-black',
        '[&_svg]:h-full [&_svg]:w-full',
        className,
      )}
      {...props}
    />
  ),
);
TooltipIcon.displayName = 'TooltipIcon';

// ─── Close affordance ─────────────────────────────────────────────────────
// 16×16 button rendered as the Radix `Popover.Close` so it dismisses the
// panel for free. Pass `children` to override the default × glyph.

export type TooltipCloseProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>,
  'asChild'
>;

const TooltipClose = React.forwardRef<HTMLButtonElement, TooltipCloseProps>(
  ({ className, children, ...props }, ref) => (
    <TooltipClosePrimitive
      ref={ref}
      aria-label="Close"
      className={cn(
        'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] text-black outline-none transition-colors',
        'hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-full w-full">
          <path
            d="M4 4l8 8M12 4l-8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </TooltipClosePrimitive>
  ),
);
TooltipClose.displayName = 'TooltipClose';

// ─── Description ──────────────────────────────────────────────────────────
// Inter Regular 14/22 #000. 8 px gap from the title row above, 16 px gap to
// the actions row below.

const TooltipDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'mt-2 text-[14px] font-normal leading-[22px] text-black',
      // When rendered as a *first* child (no header above), drop the top margin.
      'first:mt-0',
      className,
    )}
    {...props}
  />
));
TooltipDescription.displayName = 'TooltipDescription';

// ─── Action row ───────────────────────────────────────────────────────────
// Right-aligned cluster of text buttons. 16 px gap above the previous block.

const TooltipActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-4 flex items-center justify-end gap-2 first:mt-0',
      className,
    )}
    {...props}
  />
));
TooltipActions.displayName = 'TooltipActions';

// ─── Single action button (text variant) ──────────────────────────────────
// Matches the Pantheon `buttons/text` treatment — transparent fill, brand
// label, subtle hover wash. The `primary` variant just bumps the weight so
// the confirm-style action reads a touch stronger.

type TooltipActionVariant = 'secondary' | 'primary';

export interface TooltipActionProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: TooltipActionVariant;
  /** Render the action as the Radix close affordance — clicking it dismisses the tooltip. */
  closeOnClick?: boolean;
  /** Native button `type` — defaults to `"button"` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
}

const TooltipAction = React.forwardRef<HTMLButtonElement, TooltipActionProps>(
  (
    { className, variant = 'secondary', closeOnClick, type = 'button', children, ...props },
    ref,
  ) => {
    const buttonClass = cn(
      'inline-flex h-8 select-none items-center justify-center whitespace-nowrap rounded-[6px] px-2',
      'text-[14px] leading-[22px] text-[#1770EE] outline-none transition-colors',
      'hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:text-[#999999] disabled:hover:bg-transparent',
      variant === 'primary' ? 'font-semibold' : 'font-medium',
      className,
    );

    if (closeOnClick) {
      return (
        <TooltipClosePrimitive asChild>
          <button ref={ref} type={type} className={buttonClass} {...props}>
            {children}
          </button>
        </TooltipClosePrimitive>
      );
    }

    return (
      <button ref={ref} type={type} className={buttonClass} {...props}>
        {children}
      </button>
    );
  },
);
TooltipAction.displayName = 'TooltipAction';

// ─── Arrow ─────────────────────────────────────────────────────────────────
// 12 × 6 px triangle in the same Surface/Tertiary fill. Radix auto-rotates
// based on the chosen `side`, so the same component handles all 12
// placements. Use `<TooltipArrow />` inside `<TooltipContent>`.

export type TooltipArrowProps = Omit<
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>,
  'asChild'
>;

const TooltipArrow = React.forwardRef<SVGSVGElement, TooltipArrowProps>(
  ({ className, width = 12, height = 6, ...props }, ref) => (
    <PopoverPrimitive.Arrow
      ref={ref}
      width={width}
      height={height}
      className={cn('fill-[#F0F0F0]', className)}
      {...props}
    />
  ),
);
TooltipArrow.displayName = 'TooltipArrow';

// ─── Prop-driven convenience wrapper ──────────────────────────────────────
// Most callers want "show a title + supporting text on hover/click of a
// trigger" — this wrapper covers that flow without the slot ceremony.
// Drop down to the primitives when you need richer headers, custom layouts,
// or multi-button action rows.

export interface SimpleTooltipProps {
  /** Element that opens the tooltip. Rendered as the Radix Trigger. */
  children: React.ReactElement;
  /** Tooltip title — rendered with the leading icon + close affordance. */
  title?: React.ReactNode;
  /** Supporting paragraph — required for a meaningful tooltip. */
  description?: React.ReactNode;
  /** Optional leading icon (rendered next to the title). */
  icon?: React.ReactNode;
  /** Show the × close button in the header. Defaults to `true` when `title` is set. */
  closable?: boolean;
  /** Inline action buttons rendered at the bottom of the panel. */
  actions?: React.ReactNode;
  /** Which side of the trigger the panel anchors to. */
  side?: React.ComponentProps<typeof PopoverPrimitive.Content>['side'];
  /** Alignment along the anchored side. */
  align?: React.ComponentProps<typeof PopoverPrimitive.Content>['align'];
  /** Pixel offset between trigger and panel. */
  sideOffset?: number;
  /** Override the panel className. */
  contentClassName?: string;
  /** Hide the pointing arrow. */
  hideArrow?: boolean;
  /** Controlled open state — pair with `onOpenChange`. */
  open?: boolean;
  /** Default open state for uncontrolled usage. */
  defaultOpen?: boolean;
  /** Fires when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}

const SimpleTooltip = ({
  children,
  title,
  description,
  icon,
  closable,
  actions,
  side = 'top',
  align = 'center',
  sideOffset,
  contentClassName,
  hideArrow,
  open,
  defaultOpen,
  onOpenChange,
}: SimpleTooltipProps) => {
  const showClose = closable ?? Boolean(title);
  return (
    <Tooltip open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={contentClassName}
      >
        {title || showClose ? (
          <TooltipHeader>
            {icon ? <TooltipIcon>{icon}</TooltipIcon> : null}
            {title ? <TooltipTitle>{title}</TooltipTitle> : <span className="flex-1" />}
            {showClose ? <TooltipClose /> : null}
          </TooltipHeader>
        ) : null}
        {description ? <TooltipDescription>{description}</TooltipDescription> : null}
        {actions ? <TooltipActions>{actions}</TooltipActions> : null}
        {!hideArrow ? <TooltipArrow /> : null}
      </TooltipContent>
    </Tooltip>
  );
};

export {
  Tooltip,
  TooltipTrigger,
  TooltipAnchor,
  TooltipPortal,
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
};
