'use client';
import * as React from 'react';
import {
  Text,
  Display,
  Title,
  Body,
  Label,
  TYPOGRAPHY_TOKENS,
  type TextVariant,
  type TextSize,
  type TextWeight,
} from '@petpooja/ui';

// ─── 1. Full ramp — every variant × size at the default weight ────────────

const RAMP: Array<{ variant: TextVariant; size: TextSize; label: string }> = [
  { variant: 'display', size: 'lg', label: 'Display Large' },
  { variant: 'display', size: 'md', label: 'Display Medium' },
  { variant: 'display', size: 'sm', label: 'Display Small' },
  { variant: 'title', size: 'lg', label: 'Title Large' },
  { variant: 'title', size: 'md', label: 'Title Medium' },
  { variant: 'title', size: 'sm', label: 'Title Small' },
  { variant: 'body', size: 'lg', label: 'Body Large' },
  { variant: 'body', size: 'md', label: 'Body Medium' },
  { variant: 'body', size: 'sm', label: 'Body Small' },
  { variant: 'label', size: 'lg', label: 'Label Large' },
  { variant: 'label', size: 'md', label: 'Label Medium' },
  { variant: 'label', size: 'sm', label: 'Label Small' },
];

export function TextRampDemo() {
  return (
    <div className="flex w-full flex-col gap-6">
      {RAMP.map((row) => {
        const t = TYPOGRAPHY_TOKENS[row.variant][row.size];
        return (
          <div key={row.label} className="flex flex-col gap-1">
            <Text variant={row.variant} size={row.size}>
              {row.label}
            </Text>
            <Text
              variant="label"
              size="sm"
              color="secondary"
              className="font-mono"
            >
              {row.variant} / {row.size === 'lg' ? 'Large' : row.size === 'md' ? 'Medium' : 'Small'}
              {' · '}
              Inter {t.fontSize}/{t.lineHeight} {t.defaultWeight}
            </Text>
          </div>
        );
      })}
    </div>
  );
}

// ─── 2. Weights ────────────────────────────────────────────────────────────

const WEIGHTS: TextWeight[] = ['regular', 'medium', 'semibold', 'bold'];

export function TextWeightsDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      {WEIGHTS.map((w) => (
        <div key={w} className="flex items-baseline gap-4">
          <Text
            variant="label"
            size="sm"
            color="secondary"
            className="w-20 font-mono"
          >
            {w}
          </Text>
          <Text variant="title" size="md" weight={w}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </div>
      ))}
    </div>
  );
}

// ─── 3. Semantic colours ──────────────────────────────────────────────────

const COLORS = [
  { token: 'primary', hex: '#000000' },
  { token: 'secondary', hex: '#666666' },
  { token: 'tertiary', hex: '#999999' },
  { token: 'disabled', hex: '#CCCCCC' },
  { token: 'brand', hex: '#1770EE' },
  { token: 'success', hex: '#1E7E34' },
  { token: 'warning', hex: '#A35E00' },
  { token: 'danger', hex: '#D03A3A' },
] as const;

export function TextColorsDemo() {
  return (
    <div className="flex w-full flex-col gap-2">
      {COLORS.map((c) => (
        <div key={c.token} className="flex items-center gap-4">
          <Text
            variant="label"
            size="sm"
            color="secondary"
            className="w-20 font-mono"
          >
            {c.token}
          </Text>
          <Text variant="body" color={c.token}>
            Tomorrow&apos;s dispatch window opens at 6:00 AM.
          </Text>
          <Text
            variant="label"
            size="sm"
            color="tertiary"
            className="ml-auto font-mono"
          >
            {c.hex}
          </Text>
        </div>
      ))}
      <div className="mt-2 rounded-md bg-black px-4 py-3">
        <Text variant="body" color="inverse">
          Inverse on a dark surface.
        </Text>
      </div>
    </div>
  );
}

// ─── 4. Truncation + clamp ────────────────────────────────────────────────

export function TextTruncateDemo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-6">
      <div className="rounded-md border border-[#E5E5E5] p-3">
        <Label color="secondary">Truncate (single line)</Label>
        <Body truncate className="mt-1">
          Tomorrow&apos;s dispatch window opens at 6:00 AM across every kitchen in the Western
          region — please confirm your headcount by midnight.
        </Body>
      </div>
      <div className="rounded-md border border-[#E5E5E5] p-3">
        <Label color="secondary">numLines = 2</Label>
        <Body numLines={2} className="mt-1">
          Tomorrow&apos;s dispatch window opens at 6:00 AM across every kitchen in the Western
          region — please confirm your headcount by midnight, otherwise the slot will roll
          over to the next eligible team in the queue.
        </Body>
      </div>
      <div className="rounded-md border border-[#E5E5E5] p-3">
        <Label color="secondary">numLines = 3</Label>
        <Body numLines={3} className="mt-1">
          Tomorrow&apos;s dispatch window opens at 6:00 AM across every kitchen in the Western
          region — please confirm your headcount by midnight, otherwise the slot will roll
          over to the next eligible team in the queue. We need a final number locked in
          before the prep schedule is published.
        </Body>
      </div>
    </div>
  );
}

// ─── 5. Polymorphic `as` ──────────────────────────────────────────────────

export function TextPolymorphicDemo() {
  return (
    <article className="flex w-full flex-col gap-4">
      <Display size="md" as="h1">
        Daily kitchen report
      </Display>
      <Title size="md" as="h2" color="secondary">
        Western region · 16 May
      </Title>
      <Body>
        Service ran without incident. The express bar handled 5,125 orders — a 12% lift over
        yesterday — and SLA was met on{' '}
        <Text as="a" href="#" color="brand" underline>
          every dispatch lane
        </Text>
        .
      </Body>
      <Body color="secondary">
        Note: a planned maintenance window starts at{' '}
        <Text as="time" weight="semibold">
          02:00
        </Text>{' '}
        tomorrow.
      </Body>
    </article>
  );
}
