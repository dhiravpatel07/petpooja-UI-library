'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 66:685 (Pantheon › Text Input).
//
// The Figma frame catalogues 250+ variants — three sizes × five states ×
// three types × leading-icon / trailing-icon / supporting-text / CTA — that
// all collapse into one composable primitive:
//
//   <TextInput
//     size="md"
//     label="Name"
//     helperText="As it appears on your ID"
//     leadingIcon={<UserIcon />}
//     trailingIcon={<XIcon />}      // shown as a clear affordance
//     prefix={<CurrencyDropdown />} // left-attached slot
//     suffix={<UnitDropdown />}     // right-attached slot
//     cta="Apply"                   // right-attached button
//     onCtaClick={…}
//     error="That username is taken"
//     disabled
//   />
//
// State mapping (Figma → component):
//   • Default  — empty, unfocused → label sits centered as placeholder
//   • Active   — focused          → label floats into a notch, brand border
//   • Input    — has value        → label floats into a notch (neutral)
//   • Error    — `error` prop     → red border, red label, red supporting text
//   • Disabled — `disabled` prop  → `#F5F5F5` wash, gray text
//
// Tokens from Figma:
//   • Heights:        36 / 40 / 48 px (sm / md / lg)
//   • Radius:         8 / 10 / 10 px (square/small/medium)
//   • Border:         1 px enabled · `#E5E5E5`/`#1770EE`/`#D03A3A`
//                     focus + error get an additional 1 px ring of the same
//                     colour so the field reads as "active" without nudging
//                     surrounding layout.
//   • Padding:        12 px horizontal
//   • Icon size:      18 / 20 / 20 px
//   • Body type:      14 / 22 (sm/md) · 16 / 24 (lg) · Inter Regular
//   • Label type:     14 / 22 collapsed · 12 / 16 floated · Inter Medium
//   • Supporting:     12 / 20 Inter Regular
//   • Disabled bg:    `#F5F5F5`
//   • Placeholder fg: `#999999`
//
// The notched outline is rendered without a `<fieldset>`/`<legend>` so we can
// hand a real `<input>` to the consumer — the cutout effect comes from a
// `bg-white` slice on the floated label that overlays the border line.

const SIZES = {
  sm: {
    height: 'h-9', // 36 px
    radius: 'rounded-[8px]',
    radiusRight: 'rounded-r-[8px]',
    text: 'text-[14px] leading-[22px]',
    iconBox: 'h-[18px] w-[18px]',
    pad: 'px-3',
    gap: 'gap-2',
    floatedTop: '-top-[8px]',
    restingLeftWithIcon: 'left-[38px]', // 12 px pad + 18 px icon + 8 px gap
  },
  md: {
    height: 'h-10', // 40 px
    radius: 'rounded-[10px]',
    radiusRight: 'rounded-r-[10px]',
    text: 'text-[14px] leading-[22px]',
    iconBox: 'h-5 w-5',
    pad: 'px-3',
    gap: 'gap-2',
    floatedTop: '-top-[8px]',
    restingLeftWithIcon: 'left-10', // 12 px pad + 20 px icon + 8 px gap = 40 px
  },
  lg: {
    height: 'h-12', // 48 px
    radius: 'rounded-[10px]',
    radiusRight: 'rounded-r-[10px]',
    text: 'text-[16px] leading-[24px]',
    iconBox: 'h-5 w-5',
    pad: 'px-3',
    gap: 'gap-2',
    floatedTop: '-top-[10px]',
    restingLeftWithIcon: 'left-10',
  },
} as const;

type TextInputSize = keyof typeof SIZES;

type NativeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'prefix'
>;

export interface TextInputProps extends NativeInputProps {
  /** Field size — matches the Pantheon `sm/md/lg` heights (36/40/48 px). */
  size?: TextInputSize;
  /** Floating label. Renders the notched-outline animation when set. */
  label?: React.ReactNode;
  /** Helper text rendered below the field. Replaced by `error` when present. */
  helperText?: React.ReactNode;
  /** Error state — `true` toggles the red treatment; passing a string also
   *  uses it as the supporting message (replaces `helperText`). */
  error?: boolean | string;
  /** Icon rendered inside the left padding (after `prefix`, before the input). */
  leadingIcon?: React.ReactNode;
  /** Icon rendered inside the right padding (after the input, before `suffix` / `cta`). */
  trailingIcon?: React.ReactNode;
  /** Left-attached slot — typically a dropdown trigger. Renders with a 1 px right divider. */
  prefix?: React.ReactNode;
  /** Right-attached slot — typically a dropdown trigger or unit indicator. Renders with a 1 px left divider. */
  suffix?: React.ReactNode;
  /** Inline CTA — renders an attached primary button on the right edge. */
  cta?: React.ReactNode;
  /** Fires when the inline CTA is activated. */
  onCtaClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Disable the CTA independently of the input (e.g. when the input is empty). */
  ctaDisabled?: boolean;
  /** Override the wrapping `<div>` class. */
  containerClassName?: string;
  /** Make the trailing icon clickable — fires this callback on click. Use for clear / reveal affordances. */
  onTrailingIconClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      containerClassName,
      size = 'md',
      label,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      prefix,
      suffix,
      cta,
      onCtaClick,
      ctaDisabled,
      onTrailingIconClick,
      disabled,
      id,
      placeholder,
      value,
      defaultValue,
      onChange,
      ...inputProps
    },
    forwardedRef,
  ) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const helperId = `${fieldId}-helper`;

    const isControlled = value !== undefined;
    const [internal, setInternal] = React.useState<string>(
      defaultValue !== undefined ? String(defaultValue) : '',
    );
    const current = isControlled ? String(value ?? '') : internal;

    const [focused, setFocused] = React.useState(false);

    const hasValue = current.length > 0;
    const hasError = Boolean(error);
    const supportingText =
      typeof error === 'string' && error.length > 0 ? error : helperText;

    const tone: 'rest' | 'active' | 'error' | 'disabled' = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : focused
          ? 'active'
          : 'rest';

    const sz = SIZES[size];

    // ─── Wrapper border treatment ──────────────────────────────────────────
    // Border colour switches per state. Focus + error add an extra `ring-1`
    // of the same colour to mimic the 1.25 px Figma stroke without
    // displacing surrounding layout.

    const containerToneClass = {
      rest: 'border-[#E5E5E5] bg-white',
      active: 'border-[#1770EE] bg-white ring-1 ring-[#1770EE]',
      error: 'border-[#D03A3A] bg-white ring-1 ring-[#D03A3A]',
      disabled: 'border-[#E5E5E5] bg-[#F5F5F5] cursor-not-allowed',
    }[tone];

    // Label floats whenever the field is focused, has a value, or has a
    // prefix slot occupying the placeholder lane.
    const isFloated = focused || hasValue || Boolean(prefix);

    const labelColorClass = disabled
      ? 'text-[#999999]'
      : hasError
        ? 'text-[#D03A3A]'
        : focused
          ? 'text-[#1770EE]'
          : 'text-[#666666]';

    // Resting label horizontal anchor — needs to line up with where the input
    // text actually starts (after any leading icon).
    const restingLeftClass = leadingIcon
      ? sz.restingLeftWithIcon
      : prefix
        ? 'left-2' // never used (prefix forces floated), but keeps the type-tree simple
        : 'left-3';

    return (
      <div className={cn('w-full', containerClassName)}>
        <div
          className={cn(
            'relative flex items-stretch w-full transition-colors',
            "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
            'border',
            sz.radius,
            sz.height,
            containerToneClass,
            // CTA fuses to the right side — flatten the right radius.
            cta && 'rounded-r-none',
          )}
          data-state={tone}
        >
          {/* ─── Prefix slot ───────────────────────────────────────────── */}
          {prefix ? (
            <div
              className={cn(
                'flex items-center pl-3 pr-2 shrink-0',
                'border-r border-[#E5E5E5]',
                disabled && 'text-[#999999]',
              )}
            >
              {prefix}
            </div>
          ) : null}

          {/* ─── Field column ────────────────────────────────────────────── */}
          <div className={cn('relative flex flex-1 items-center min-w-0', sz.pad, sz.gap)}>
            {leadingIcon ? (
              <span
                aria-hidden="true"
                className={cn(
                  'flex shrink-0 items-center justify-center',
                  sz.iconBox,
                  disabled ? 'text-[#999999]' : 'text-black',
                  '[&_svg]:h-full [&_svg]:w-full',
                )}
              >
                {leadingIcon}
              </span>
            ) : null}

            <input
              ref={forwardedRef}
              id={fieldId}
              disabled={disabled}
              value={isControlled ? value : undefined}
              defaultValue={isControlled ? undefined : defaultValue}
              placeholder={
                // When a label is set we suppress the placeholder until the
                // label floats — the label *is* the placeholder at rest.
                label && !isFloated ? '' : placeholder
              }
              aria-invalid={hasError || undefined}
              aria-describedby={supportingText ? helperId : undefined}
              onFocus={(e) => {
                setFocused(true);
                inputProps.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                inputProps.onBlur?.(e);
              }}
              onChange={(e) => {
                if (!isControlled) setInternal(e.target.value);
                onChange?.(e);
              }}
              className={cn(
                'flex-1 min-w-0 bg-transparent outline-none',
                'placeholder:text-[#999999]',
                disabled
                  ? 'text-[#999999] cursor-not-allowed'
                  : 'text-black',
                sz.text,
                className,
              )}
              {...inputProps}
            />

            {trailingIcon ? (
              onTrailingIconClick ? (
                <button
                  type="button"
                  onClick={onTrailingIconClick}
                  disabled={disabled}
                  aria-label="Clear field"
                  className={cn(
                    'flex shrink-0 items-center justify-center rounded-[4px]',
                    sz.iconBox,
                    'outline-none transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
                    disabled ? 'text-[#999999] cursor-not-allowed' : 'text-black hover:bg-[#FAFAFA]',
                    '[&_svg]:h-full [&_svg]:w-full',
                  )}
                >
                  {trailingIcon}
                </button>
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex shrink-0 items-center justify-center',
                    sz.iconBox,
                    disabled ? 'text-[#999999]' : 'text-black',
                    '[&_svg]:h-full [&_svg]:w-full',
                  )}
                >
                  {trailingIcon}
                </span>
              )
            ) : null}
          </div>

          {/* ─── Suffix slot ───────────────────────────────────────────── */}
          {suffix ? (
            <div
              className={cn(
                'flex items-center pr-3 pl-2 shrink-0',
                'border-l border-[#E5E5E5]',
                disabled && 'text-[#999999]',
              )}
            >
              {suffix}
            </div>
          ) : null}

          {/* ─── Inline CTA ────────────────────────────────────────────── */}
          {cta ? (
            <button
              type="button"
              onClick={onCtaClick}
              disabled={disabled || ctaDisabled}
              className={cn(
                // Fuses to the right edge with a -1 px margin so the button
                // border sits flush with the field's outer border.
                'shrink-0 -m-px ml-0 inline-flex items-center justify-center',
                'px-4 font-medium transition-colors',
                sz.text,
                sz.radiusRight,
                'bg-[#1770EE] text-white',
                'hover:bg-[#125ABE] active:bg-[#125ABE]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1770EE]/40 focus-visible:ring-offset-2',
                'disabled:bg-[#F5F5F5] disabled:text-[#999999] disabled:cursor-not-allowed',
              )}
            >
              {cta}
            </button>
          ) : null}

          {/* ─── Floating label ─────────────────────────────────────────────
              Positioned relative to the wrapping flex row so the notch sits
              at the top-left of the field even when a prefix slot is present.
              The `bg-white` slice (or `bg-[#F5F5F5]` when disabled) overlays
              the border line, producing the notched-outline cutout. */}
          {label ? (
            <label
              htmlFor={fieldId}
              className={cn(
                'pointer-events-none absolute select-none transition-all duration-150',
                disabled ? 'bg-[#F5F5F5]' : 'bg-white',
                labelColorClass,
                isFloated
                  ? cn('left-2 px-1 text-[12px] leading-[16px] font-medium', sz.floatedTop)
                  : cn(restingLeftClass, 'top-1/2 -translate-y-1/2 px-0', sz.text),
              )}
            >
              {label}
            </label>
          ) : null}
        </div>

        {/* ─── Supporting text ──────────────────────────────────────────── */}
        {supportingText ? (
          <p
            id={helperId}
            className={cn(
              'mt-1 text-[12px] leading-[20px]',
              disabled
                ? 'text-[#999999]'
                : hasError
                  ? 'text-[#D03A3A]'
                  : 'text-[#666666]',
            )}
          >
            {supportingText}
          </p>
        ) : null}
      </div>
    );
  },
);
TextInput.displayName = 'TextInput';

// ─── Low-level icon helper ─────────────────────────────────────────────────
// Re-exported convenience for callers that need to render an icon inside a
// `prefix` or `suffix` slot with consistent sizing + currentColor inheritance.

export type TextInputIconProps = React.HTMLAttributes<HTMLSpanElement>;

export const TextInputIcon = React.forwardRef<HTMLSpanElement, TextInputIconProps>(
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
TextInputIcon.displayName = 'TextInputIcon';
