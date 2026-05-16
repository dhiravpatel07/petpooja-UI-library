'use client';
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2768:141 (Pantheon › Dropdown).
//
// Composable dropdown menu with:
//   • Optional search row (top, divider underneath)
//   • Selectable items (leading + trailing icon slots, Default / Hover / Selected)
//   • Checkbox items (multi-select; hover bg is Surface/Secondary)
//   • Optional CTA footer (Secondary + Primary buttons)
//
// Built on Radix Popover so anchoring, ESC, click-outside, focus return,
// and portaling come for free.
//
// Figma variable map (node 2991:245):
//   Surface/Primary   #FFFFFF — panel bg
//   Surface/Secondary #FAFAFA — checkbox-row hover bg
//   Surface/Tertiary  #F0F0F0 — label-row hover bg
//   Surface/Brand     #E8F1FD — selected bg              (Primary 100)
//   Border/Primary    #E5E5E5 — search divider, outline border
//   Text/Primary      #000000 — default label
//   Text/Brand        #1770EE — selected label           (Primary 500)
//   Buttons/Primary   #1770EE — primary CTA fill
//   Square/Medium     10 px   — panel + inner pill radius
//   Body Medium       14 / 22 Inter Regular  — labels
//   Title Small       14 / 22 Inter Medium   — button text + selected label
//   Elevation/3       0 1 3 0 rgba(0,0,0,0.30) + 0 4 8 3 rgba(0,0,0,0.15)

// ─── Root ──────────────────────────────────────────────────────────────────
// Direct re-exports of the Radix Popover primitives. Radix already handles
// controlled / uncontrolled open state via `open` + `defaultOpen` +
// `onOpenChange`, so wrapping it would just shadow that API.

type DropdownProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>;

const Dropdown = PopoverPrimitive.Root;
const DropdownTrigger = PopoverPrimitive.Trigger;
const DropdownAnchor = PopoverPrimitive.Anchor;
const DropdownPortal = PopoverPrimitive.Portal;
const DropdownClose = PopoverPrimitive.Close;

// ─── Content (panel) ───────────────────────────────────────────────────────

interface DropdownContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

const DropdownContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  DropdownContentProps
>(
  (
    { className, sideOffset = 6, align = 'start', onKeyDown, children, ...props },
    ref,
  ) => (
    <DropdownPortal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 flex w-[250px] flex-col overflow-hidden rounded-[10px] bg-white outline-none',
          "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
          // Elevation/3 — verbatim Figma shadow set
          'shadow-[0_1px_3px_0_rgba(0,0,0,0.3),0_4px_8px_3px_rgba(0,0,0,0.15)]',
          'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
          className,
        )}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          rovingArrowNav(e);
        }}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </DropdownPortal>
  ),
);
DropdownContent.displayName = 'DropdownContent';

// Arrow-up/down moves focus between focusable items. Home/End jump to ends.
function rovingArrowNav(e: React.KeyboardEvent<HTMLDivElement>) {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
  const items = Array.from(
    e.currentTarget.querySelectorAll<HTMLElement>(
      '[data-dropdown-item]:not([disabled])',
    ),
  );
  if (!items.length) return;
  const active = document.activeElement as HTMLElement | null;
  const idx = active ? items.indexOf(active) : -1;
  let next: HTMLElement | undefined;
  if (e.key === 'ArrowDown') next = items[(idx + 1) % items.length];
  else if (e.key === 'ArrowUp')
    next = items[(idx - 1 + items.length) % items.length];
  else if (e.key === 'Home') next = items[0];
  else if (e.key === 'End') next = items[items.length - 1];
  if (next) {
    next.focus();
    e.preventDefault();
  }
}

// ─── Search row ────────────────────────────────────────────────────────────

interface DropdownSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onValueChange?: (value: string) => void;
}

const DropdownSearch = React.forwardRef<HTMLInputElement, DropdownSearchProps>(
  (
    {
      className,
      placeholder = 'Search',
      value,
      defaultValue,
      onValueChange,
      onChange,
      ...props
    },
    forwardedRef,
  ) => {
    const [internal, setInternal] = React.useState<string>(
      defaultValue !== undefined ? String(defaultValue) : '',
    );
    const isControlled = value !== undefined;
    const current = String(isControlled ? value : internal);
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLInputElement);

    const set = (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    return (
      <div className="flex h-12 w-full shrink-0 items-center gap-2 border-b border-[#E5E5E5] px-4 py-2">
        <SearchIcon className="size-4 shrink-0 text-black" />
        <input
          ref={innerRef}
          type="text"
          placeholder={placeholder}
          value={current}
          onChange={(e) => {
            set(e.target.value);
            onChange?.(e);
          }}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-[14px] leading-[22px] text-black placeholder:text-black outline-none',
            className,
          )}
          {...props}
        />
        {current ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              set('');
              innerRef.current?.focus();
            }}
            className="shrink-0 text-black outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60"
          >
            <CloseIcon className="size-4" />
          </button>
        ) : null}
      </div>
    );
  },
);
DropdownSearch.displayName = 'DropdownSearch';

// ─── Item ──────────────────────────────────────────────────────────────────

interface DropdownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  leadingIcon?: React.ReactNode;
  /** Trailing slot. Defaults to a 16px chevron-right; pass `null` to hide. */
  trailingIcon?: React.ReactNode;
  selected?: boolean;
  /** Auto-close the menu after click. Defaults to true. */
  closeOnSelect?: boolean;
}

const DEFAULT_TRAILING = <ChevronRightIcon className="size-4" />;

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    {
      className,
      children,
      leadingIcon,
      trailingIcon = DEFAULT_TRAILING,
      selected,
      disabled,
      closeOnSelect = true,
      onClick,
      ...props
    },
    ref,
  ) => {
    const button = (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        data-dropdown-item=""
        data-selected={selected ? '' : undefined}
        disabled={disabled}
        onClick={onClick}
        className={cn(
          'group flex h-12 w-full shrink-0 items-center p-1 outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            // Inner pill — fills 40px tall × full width minus 4px outer pad.
            'flex h-full w-full items-center justify-between rounded-[10px] px-3',
            'transition-colors',
            // Hover / keyboard-focus pill (Surface/Tertiary)
            'group-hover:bg-[#F0F0F0] group-focus-visible:bg-[#F0F0F0]',
            // Selected (Surface/Brand) — wins over hover
            'group-data-[selected]:bg-[#E8F1FD] group-data-[selected]:group-hover:bg-[#E8F1FD] group-data-[selected]:group-focus-visible:bg-[#E8F1FD]',
          )}
        >
          <span
            className={cn(
              'flex min-w-0 items-center gap-2',
              'text-[14px] leading-[22px] font-normal text-black',
              // Selected: switch to Inter Medium + Text/Brand
              'group-data-[selected]:font-medium group-data-[selected]:text-[#1770EE]',
            )}
          >
            {leadingIcon ? (
              <span
                aria-hidden="true"
                className="flex size-4 shrink-0 items-center justify-center text-black group-data-[selected]:text-[#1770EE]"
              >
                {leadingIcon}
              </span>
            ) : null}
            <span className="truncate">{children}</span>
          </span>
          {trailingIcon ? (
            <span
              aria-hidden="true"
              className="ml-2 flex size-4 shrink-0 items-center justify-center text-black group-data-[selected]:text-[#1770EE]"
            >
              {trailingIcon}
            </span>
          ) : null}
        </span>
      </button>
    );

    // When `closeOnSelect` is true, wrap with Radix's Close so the Popover
    // dismisses itself on click — no consumer state plumbing needed.
    return closeOnSelect ? (
      <PopoverPrimitive.Close asChild>{button}</PopoverPrimitive.Close>
    ) : (
      button
    );
  },
);
DropdownItem.displayName = 'DropdownItem';

// ─── Checkbox item ─────────────────────────────────────────────────────────

interface DropdownCheckboxItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  closeOnSelect?: boolean;
  /** Trailing slot. Defaults to a 16px chevron-right; pass `null` to hide. */
  trailingIcon?: React.ReactNode;
}

const DropdownCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  DropdownCheckboxItemProps
>(
  (
    {
      className,
      children,
      checked,
      defaultChecked,
      onCheckedChange,
      closeOnSelect = false,
      onClick,
      disabled,
      trailingIcon = DEFAULT_TRAILING,
      ...props
    },
    ref,
  ) => {
    const [internal, setInternal] = React.useState<boolean>(!!defaultChecked);
    const isControlled = checked !== undefined;
    const current = isControlled ? !!checked : internal;

    const button = (
      <button
        ref={ref}
        type="button"
        role="menuitemcheckbox"
        aria-checked={current}
        data-dropdown-item=""
        data-state={current ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          const next = !current;
          if (!isControlled) setInternal(next);
          onCheckedChange?.(next);
        }}
        className={cn(
          'group flex h-12 w-full shrink-0 items-center p-1 outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            // Hover pill uses Surface/Secondary (#FAFAFA) per Figma.
            'flex h-full w-full items-center justify-between rounded-[10px] px-2',
            'transition-colors',
            'group-hover:bg-[#FAFAFA] group-focus-visible:bg-[#FAFAFA]',
          )}
        >
          <span className="flex min-w-0 items-center gap-2 text-[14px] leading-[22px] text-black">
            <span
              aria-hidden="true"
              className={cn(
                // 24px hit area to match the standalone Checkbox; 17px visible box.
                'flex size-6 shrink-0 items-center justify-center',
              )}
            >
              <span
                className={cn(
                  'flex size-[17px] items-center justify-center rounded-[2px] border-2 transition-colors',
                  current
                    ? 'border-[#1770EE] bg-[#1770EE] text-white'
                    : 'border-black bg-white',
                )}
              >
                {current ? <CheckIcon className="size-[13px]" /> : null}
              </span>
            </span>
            <span className="truncate">{children}</span>
          </span>
          {trailingIcon ? (
            <span
              aria-hidden="true"
              className="ml-2 flex size-4 shrink-0 items-center justify-center text-black"
            >
              {trailingIcon}
            </span>
          ) : null}
        </span>
      </button>
    );

    return closeOnSelect ? (
      <PopoverPrimitive.Close asChild>{button}</PopoverPrimitive.Close>
    ) : (
      button
    );
  },
);
DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

// ─── Footer (CTA row) ──────────────────────────────────────────────────────

const DropdownFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-14 w-full shrink-0 items-center justify-center gap-2 px-4',
      className,
    )}
    {...props}
  />
));
DropdownFooter.displayName = 'DropdownFooter';

const DropdownCancelButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      // Secondary / Outline preset — white bg + Border/Primary, 36px tall.
      'flex h-9 min-w-0 flex-1 items-center justify-center rounded-[10px] border border-[#E5E5E5] bg-white px-4 py-2',
      "font-['Inter',ui-sans-serif,system-ui,sans-serif] text-[14px] font-medium leading-[22px] text-black",
      'outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
DropdownCancelButton.displayName = 'DropdownCancelButton';

const DropdownConfirmButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      // Primary preset — Buttons/Primary fill, white text, 36px tall.
      'flex h-9 min-w-[88px] flex-1 items-center justify-center rounded-[10px] bg-[#1770EE] px-4 py-2',
      "font-['Inter',ui-sans-serif,system-ui,sans-serif] text-[14px] font-medium leading-[22px] text-white",
      'outline-none transition-colors hover:bg-[#125ABE] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
DropdownConfirmButton.displayName = 'DropdownConfirmButton';

// ─── Optional layout helpers ───────────────────────────────────────────────

const DropdownList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="menu"
    className={cn('flex w-full flex-col py-1', className)}
    {...props}
  />
));
DropdownList.displayName = 'DropdownList';

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn('mx-2 my-1 h-px bg-[#E5E5E5]', className)}
    {...props}
  />
));
DropdownSeparator.displayName = 'DropdownSeparator';

const DropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center px-4 text-[11px] font-medium uppercase tracking-wider text-[#666666]',
      className,
    )}
    {...props}
  />
));
DropdownLabel.displayName = 'DropdownLabel';

// ─── Icons ─────────────────────────────────────────────────────────────────
// Inline 16-grid glyphs — keeps the component self-contained (no icon dep).

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      className={className}
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
  );
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownAnchor,
  DropdownPortal,
  DropdownClose,
  DropdownContent,
  DropdownSearch,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownFooter,
  DropdownCancelButton,
  DropdownConfirmButton,
  DropdownList,
  DropdownSeparator,
  DropdownLabel,
};

export type {
  DropdownProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownCheckboxItemProps,
  DropdownSearchProps,
};
