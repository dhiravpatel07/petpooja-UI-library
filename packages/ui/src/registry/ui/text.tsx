'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 66:686 (Pantheon › Typography).
//
// The Figma frame catalogues a 12-tier ramp (Display / Title / Body / Label,
// each in Large / Medium / Small) × four weights (Regular / Medium /
// SemiBold / Bold) — 48 styles total — that all collapse into one
// polymorphic primitive driven by `variant`, `size`, and `weight`:
//
//   <Text variant="title" size="lg">Inbox</Text>
//   <Text variant="body" weight="semibold">Heads up</Text>
//   <Text variant="display" size="md" as="h1">Welcome back</Text>
//
// Convenience aliases lock the variant so call-sites read naturally:
//
//   <Display size="lg">…</Display>
//   <Title size="md">…</Title>
//   <Body>…</Body>          // body × medium × regular
//   <Label size="sm">…</Label>
//
// Tokens from Figma (size / line-height in px):
//
//   Display                 Title                  Body                   Label
//   ─────────────────       ─────────────────      ─────────────────      ─────────────────
//   Large   32 / 40         Large   20 / 26        Large   16 / 24        Large   14 / 22
//   Medium  24 / 32         Medium  18 / 24        Medium  14 / 22        Medium  12 / 20
//   Small   20 / 28         Small   16 / 22        Small   12 / 20        Small   10 / 18
//
// Weights map to numeric `font-weight` values:
//
//   regular   400  ·  medium   500  ·  semibold   600  ·  bold   700
//
// Per-variant default weight (matches the Figma `Regular` column):
//
//   display    regular
//   title      regular
//   body       regular
//   label      medium    (Labels default to medium per the Pantheon spec)
//
// Per-variant default HTML element (overrideable via `as`):
//
//   display    <h1>      title × lg   <h2>      title × md   <h3>      title × sm   <h4>
//   body       <p>       label        <span>

// ─── Size + line-height tokens ─────────────────────────────────────────────

const VARIANT_SIZE_CLASS = {
  display: {
    lg: 'text-[32px] leading-[40px] tracking-[-0.01em]',
    md: 'text-[24px] leading-[32px] tracking-[-0.005em]',
    sm: 'text-[20px] leading-[28px]',
  },
  title: {
    lg: 'text-[20px] leading-[26px]',
    md: 'text-[18px] leading-[24px]',
    sm: 'text-[16px] leading-[22px]',
  },
  body: {
    lg: 'text-[16px] leading-[24px]',
    md: 'text-[14px] leading-[22px]',
    sm: 'text-[12px] leading-[20px]',
  },
  label: {
    lg: 'text-[14px] leading-[22px]',
    md: 'text-[12px] leading-[20px]',
    sm: 'text-[10px] leading-[18px]',
  },
} as const satisfies Record<TextVariant, Record<TextSize, string>>;

const WEIGHT_CLASS = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const satisfies Record<TextWeight, string>;

const VARIANT_DEFAULT_WEIGHT: Record<TextVariant, TextWeight> = {
  display: 'regular',
  title: 'regular',
  body: 'regular',
  // Pantheon labels carry more weight by default — the leftmost ("Regular")
  // column in the Figma spec already shows label rows in Medium.
  label: 'medium',
};

const DEFAULT_ELEMENT: Record<TextVariant, Record<TextSize, React.ElementType>> = {
  display: { lg: 'h1', md: 'h1', sm: 'h2' },
  title: { lg: 'h2', md: 'h3', sm: 'h4' },
  body: { lg: 'p', md: 'p', sm: 'p' },
  label: { lg: 'span', md: 'span', sm: 'span' },
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const COLOR_CLASS = {
  primary: 'text-black',
  secondary: 'text-[#666666]',
  tertiary: 'text-[#999999]',
  disabled: 'text-[#CCCCCC]',
  brand: 'text-[#1770EE]',
  success: 'text-[#1E7E34]',
  warning: 'text-[#A35E00]',
  danger: 'text-[#D03A3A]',
  inverse: 'text-white',
} as const;

const ALIGN_CLASS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

// ─── Types ─────────────────────────────────────────────────────────────────

export type TextVariant = 'display' | 'title' | 'body' | 'label';
export type TextSize = 'lg' | 'md' | 'sm';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TextColor = keyof typeof COLOR_CLASS;
export type TextAlign = keyof typeof ALIGN_CLASS;

interface TextOwnProps {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  /** Semantic colour token. Maps to Pantheon `Text/*`. Overrideable via className. */
  color?: TextColor;
  /** Horizontal alignment shorthand. */
  align?: TextAlign;
  /** Single-line truncation with ellipsis. */
  truncate?: boolean;
  /** Multi-line clamp. Overrides `truncate`. */
  numLines?: number;
  /** Italic style. */
  italic?: boolean;
  /** Strikethrough decoration. */
  strikethrough?: boolean;
  /** Underline decoration. */
  underline?: boolean;
  /** Inherit `font-size`/`line-height` from the parent instead of applying the variant ramp. */
  inheritSize?: boolean;
}

// Polymorphic-as-element typing. `as` controls the rendered tag and pulls in
// that tag's native props so refs/attrs are typed correctly per element.

type PolymorphicProps<C extends React.ElementType> = TextOwnProps & {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof TextOwnProps | 'as'>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type TextComponent = <C extends React.ElementType = 'span'>(
  props: PolymorphicProps<C> & { ref?: PolymorphicRef<C> },
) => React.ReactElement | null;

// ─── Component ─────────────────────────────────────────────────────────────

// `React.forwardRef` can't fully express the polymorphic generic without
// a cast — every other library that ships a polymorphic primitive does the
// same dance. The render function itself is typed correctly; we just widen
// the outer signature so TS will accept the generic, then cast back to the
// public `TextComponent` type below.
type AnyPolymorphicProps = PolymorphicProps<React.ElementType>;

const TextInner = React.forwardRef<unknown, AnyPolymorphicProps>(
  (
    {
      as,
      variant: variantProp,
      size: sizeProp,
      weight,
      color,
      align,
      truncate,
      numLines,
      italic,
      strikethrough,
      underline,
      inheritSize,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const variant: TextVariant = variantProp ?? 'body';
    const size: TextSize = sizeProp ?? 'md';
    const Element = (as ?? DEFAULT_ELEMENT[variant][size]) as React.ElementType;
    const resolvedWeight: TextWeight = weight ?? VARIANT_DEFAULT_WEIGHT[variant];

    return (
      <Element
        ref={ref}
        className={cn(
          // Inter is the Pantheon system font; fall back gracefully.
          "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
          // Variant ramp — opted out via `inheritSize`.
          !inheritSize && VARIANT_SIZE_CLASS[variant][size],
          WEIGHT_CLASS[resolvedWeight],
          color && COLOR_CLASS[color as TextColor],
          align && ALIGN_CLASS[align as TextAlign],
          italic && 'italic',
          strikethrough && 'line-through',
          underline && 'underline underline-offset-2',
          // Truncation — `numLines` wins over single-line `truncate`.
          numLines && numLines > 0
            ? 'overflow-hidden'
            : truncate
              ? 'overflow-hidden text-ellipsis whitespace-nowrap'
              : null,
          className,
        )}
        style={
          numLines && numLines > 0
            ? {
                display: '-webkit-box',
                WebkitLineClamp: numLines,
                WebkitBoxOrient: 'vertical',
                ...style,
              }
            : style
        }
        {...rest}
      />
    );
  },
);
TextInner.displayName = 'Text';

export const Text = TextInner as unknown as TextComponent & {
  displayName?: string;
};

// ─── Variant aliases ───────────────────────────────────────────────────────
// Thin wrappers that lock `variant` so call-sites read naturally. Every other
// prop on `<Text>` is preserved.

interface AliasProps extends Omit<TextOwnProps, 'variant'> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

const makeAlias = (
  name: string,
  variant: TextVariant,
): React.FC<AliasProps & Record<string, unknown>> => {
  const Aliased: React.FC<AliasProps & Record<string, unknown>> = (props) => (
    <Text variant={variant} {...(props as React.ComponentProps<typeof Text>)} />
  );
  Aliased.displayName = name;
  return Aliased;
};

export const Display = makeAlias('Display', 'display');
export const Title = makeAlias('Title', 'title');
export const Body = makeAlias('Body', 'body');
export const Label = makeAlias('Label', 'label');

// ─── Token export ──────────────────────────────────────────────────────────
// Surface the raw ramp so callers can read tokens programmatically (e.g. to
// drive a design-tokens table in the docs site).

export const TYPOGRAPHY_TOKENS = {
  display: {
    lg: { fontSize: 32, lineHeight: 40, defaultWeight: 'regular' as const },
    md: { fontSize: 24, lineHeight: 32, defaultWeight: 'regular' as const },
    sm: { fontSize: 20, lineHeight: 28, defaultWeight: 'regular' as const },
  },
  title: {
    lg: { fontSize: 20, lineHeight: 26, defaultWeight: 'regular' as const },
    md: { fontSize: 18, lineHeight: 24, defaultWeight: 'regular' as const },
    sm: { fontSize: 16, lineHeight: 22, defaultWeight: 'regular' as const },
  },
  body: {
    lg: { fontSize: 16, lineHeight: 24, defaultWeight: 'regular' as const },
    md: { fontSize: 14, lineHeight: 22, defaultWeight: 'regular' as const },
    sm: { fontSize: 12, lineHeight: 20, defaultWeight: 'regular' as const },
  },
  label: {
    lg: { fontSize: 14, lineHeight: 22, defaultWeight: 'medium' as const },
    md: { fontSize: 12, lineHeight: 20, defaultWeight: 'medium' as const },
    sm: { fontSize: 10, lineHeight: 18, defaultWeight: 'medium' as const },
  },
} as const;
