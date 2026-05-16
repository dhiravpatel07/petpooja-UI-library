import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 3461:3 (Pantheon › List).
//
// A list row is a horizontal slot system:
//
//   ┌────────────────────────────────────────────────────┐
//   │ [leading]   [Label]              [trailing]        │
//   │             [Title]                                │
//   │             [Description]                          │
//   └────────────────────────────────────────────────────┘
//
// The leading slot can be: nothing, a 20px icon, a 56×56 avatar/image,
// or any control component (Checkbox, RadioGroupItem, Switch).
// The trailing slot can be: nothing, a 20px icon, or any control.
//
// Text is 1 / 2 / 3 lines depending on which of {Label, Title, Description}
// are provided. Title is the required line; Label sits above, Description
// sits below.
//
// Figma variable map (node 3463:7538):
//   Surface/Primary    #FFFFFF — row bg
//   Surface/Tertiary   #F0F0F0 — avatar fallback bg
//   Text/Primary       #000000 — Title
//   Text/Secondary     #666666 — Label + Description
//   Title Medium       16 / 24 Inter Regular     — title
//   Label Medium       12 / 20 Inter SemiBold    — label
//   Body Medium        14 / 22 Inter Regular     — description
//
// Layout tokens:
//   • Row padding         16 px horizontal · 8 px vertical
//   • Leading → content   16 px gap (8 px when leading is a control;
//                                    spec varies — override via `leadingGap`)
//   • Title row min       24 px (Title 16/24)        → 40 px row for 1 line
//   • Three-line + image  uses items-start so the avatar sits at the top

// ─── Root ──────────────────────────────────────────────────────────────────

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Hairline divider between items (Border/Primary `#E5E5E5`). */
  divided?: boolean;
}

const List = React.forwardRef<HTMLUListElement, ListProps>(
  ({ className, divided, ...props }, ref) => (
    <ul
      ref={ref}
      role="list"
      data-divided={divided ? '' : undefined}
      className={cn(
        'flex w-full flex-col',
        "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        // Dividers between rows when `divided` is set
        '[&[data-divided]>li+li]:border-t [&[data-divided]>li+li]:border-[#E5E5E5]',
        className,
      )}
      {...props}
    />
  ),
);
List.displayName = 'List';

// ─── Row ───────────────────────────────────────────────────────────────────

type LeadingGap = 'sm' | 'md';
type LeadingAlign = 'center' | 'start';

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title' | 'onClick'> {
  /** Small caps line that sits above the title (Inter SemiBold 12/20 #666). */
  label?: React.ReactNode;
  /** Required primary line (Inter Regular 16/24 #000). */
  title?: React.ReactNode;
  /** Supporting line that sits below the title (Inter Regular 14/22 #666). */
  description?: React.ReactNode;
  /** Left slot — icon, avatar, checkbox, radio, switch, etc. */
  leading?: React.ReactNode;
  /** Right slot — icon or control. */
  trailing?: React.ReactNode;
  /**
   * Gap between leading slot and text content.
   * `'md'` (16 px, default) matches icon + 3-line-image variants;
   * `'sm'` (8 px) matches control + 1/2-line-image variants.
   */
  leadingGap?: LeadingGap;
  /**
   * Vertical alignment between leading slot and content.
   * Auto-defaults to `'start'` when a `description` is provided AND a leading
   * slot is present (Figma's 3-line + image rule); otherwise `'center'`.
   */
  alignLeading?: LeadingAlign;
  /**
   * Render the row as an interactive `<button>` inside the `<li>`. Adds the
   * Surface/Secondary hover wash and keyboard focus ring. Combine with
   * `onClick` / `onKeyDown` for selection patterns.
   */
  interactive?: boolean;
  /** Disabled state for the interactive row (50% opacity, no pointer events). */
  disabled?: boolean;
  /** Forwarded to the inner `<button>` when `interactive` is true. */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Replace the row contents entirely. Bypasses every text/slot prop. */
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      className,
      label,
      title,
      description,
      leading,
      trailing,
      leadingGap = 'md',
      alignLeading,
      interactive,
      disabled,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const hasDescription = description !== undefined && description !== null;
    const effectiveAlign: LeadingAlign =
      alignLeading ?? (hasDescription && leading ? 'start' : 'center');

    const rowInner = children ?? (
      <>
        {leading ? (
          <ListItemLeading data-list-leading="" align={effectiveAlign}>
            {leading}
          </ListItemLeading>
        ) : null}
        <ListItemContent>
          {label !== undefined && label !== null ? (
            <ListItemLabel>{label}</ListItemLabel>
          ) : null}
          {title !== undefined && title !== null ? (
            <ListItemTitle>{title}</ListItemTitle>
          ) : null}
          {hasDescription ? (
            <ListItemDescription>{description}</ListItemDescription>
          ) : null}
        </ListItemContent>
        {trailing ? <ListItemTrailing>{trailing}</ListItemTrailing> : null}
      </>
    );

    const row = (
      <div
        className={cn(
          // Surface/Primary bg, 16px horizontal + 8px vertical padding, overflow clip.
          'flex w-full items-stretch overflow-hidden bg-white px-4 py-2',
          // Slot row: leading + content + trailing
          // Gap between leading and content is controlled by `leadingGap`;
          // content → trailing always uses gap-4 (16px) per Figma.
          effectiveAlign === 'start' ? 'items-start' : 'items-center',
          'gap-4',
          // For interactive rows, expose a hover wash and keyboard focus ring.
          interactive &&
            'cursor-pointer transition-colors hover:bg-[#FAFAFA] focus-visible:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1770EE]/40',
          interactive && disabled && 'cursor-not-allowed opacity-50 hover:bg-white',
        )}
        data-leading-gap={leadingGap}
      >
        {rowInner}
      </div>
    );

    return (
      <li
        ref={ref}
        className={cn('flex w-full flex-col', className)}
        {...props}
      >
        {interactive ? (
          <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className="block w-full text-left outline-none"
          >
            {row}
          </button>
        ) : (
          row
        )}
      </li>
    );
  },
);
ListItem.displayName = 'ListItem';

// ─── Slots ─────────────────────────────────────────────────────────────────

interface ListItemLeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: LeadingAlign;
}

const ListItemLeading = React.forwardRef<HTMLDivElement, ListItemLeadingProps>(
  ({ className, align = 'center', ...props }, ref) => (
    <div
      ref={ref}
      data-list-leading=""
      className={cn(
        'flex shrink-0',
        align === 'start' ? 'items-start' : 'items-center',
        className,
      )}
      {...props}
    />
  ),
);
ListItemLeading.displayName = 'ListItemLeading';

const ListItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Content column — fills remaining space, vertically centered text rows.
      'flex min-w-0 flex-1 flex-col justify-center',
      className,
    )}
    {...props}
  />
));
ListItemContent.displayName = 'ListItemContent';

const ListItemLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // Label Medium · Inter SemiBold · 12 / 20 · Text/Secondary
      'truncate text-[12px] font-semibold leading-[20px] text-[#666666]',
      className,
    )}
    {...props}
  />
));
ListItemLabel.displayName = 'ListItemLabel';

const ListItemTitle = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // Title Medium · Inter Regular · 16 / 24 · Text/Primary
      'truncate text-[16px] font-normal leading-[24px] text-black',
      className,
    )}
    {...props}
  />
));
ListItemTitle.displayName = 'ListItemTitle';

const ListItemDescription = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      // Body Medium · Inter Regular · 14 / 22 · Text/Secondary
      // 4 px gap between (Label + Title block) and Description — matches Figma.
      'mt-1 truncate text-[14px] font-normal leading-[22px] text-[#666666]',
      className,
    )}
    {...props}
  />
));
ListItemDescription.displayName = 'ListItemDescription';

const ListItemTrailing = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex shrink-0 items-center self-center text-black',
      className,
    )}
    {...props}
  />
));
ListItemTrailing.displayName = 'ListItemTrailing';

// ─── Section divider ───────────────────────────────────────────────────────

const ListDivider = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    role="separator"
    aria-orientation="horizontal"
    className={cn('h-px w-full bg-[#E5E5E5]', className)}
    {...props}
  />
));
ListDivider.displayName = 'ListDivider';

// ─── Avatar helper ─────────────────────────────────────────────────────────
// Renders the 56×56 image slot — Surface/Tertiary fallback bg, 8 px radius,
// `mix-blend-luminosity` to match the Figma look on placeholder media.

export interface ListAvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Override the image element entirely (e.g. an SVG illustration). */
  children?: React.ReactNode;
  /** Drop the luminosity blend mode (use this for full-color avatars). */
  preserveColor?: boolean;
}

const ListAvatar = React.forwardRef<HTMLDivElement, ListAvatarProps>(
  ({ className, src, alt = '', children, preserveColor, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#F0F0F0]',
        className,
      )}
    >
      {children ??
        (src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={cn(
              'absolute inset-0 size-full object-cover',
              preserveColor ? '' : 'mix-blend-luminosity',
            )}
            {...props}
          />
        ) : null)}
    </div>
  ),
);
ListAvatar.displayName = 'ListAvatar';

// ─── Icon helper ───────────────────────────────────────────────────────────
// 20×20 icon container — matches the Figma `raven` glyph slot used in icon
// leading and trailing positions. Pass any 20×20 SVG (or an icon-set
// component sized to fill the box) as the child.

export interface ListIconProps extends React.HTMLAttributes<HTMLSpanElement> {}

const ListIcon = React.forwardRef<HTMLSpanElement, ListIconProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        'inline-flex size-5 shrink-0 items-center justify-center text-black',
        className,
      )}
      {...props}
    />
  ),
);
ListIcon.displayName = 'ListIcon';

export {
  List,
  ListItem,
  ListItemLeading,
  ListItemContent,
  ListItemLabel,
  ListItemTitle,
  ListItemDescription,
  ListItemTrailing,
  ListAvatar,
  ListIcon,
  ListDivider,
};
