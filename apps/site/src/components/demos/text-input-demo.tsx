'use client';
import * as React from 'react';
import { TextInput } from '@petpooja/ui';

// ─── Inline icon library — kept here so demos have zero icon-lib dependencies.

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 5l7 6 7-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6 6l8 8M14 6l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2 10s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      {open ? null : (
        <path
          d="M3 3l14 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="h-3 w-3">
      <path
        d="M3 4.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-start justify-center">
      <div className="w-full max-w-[320px]">{children}</div>
    </div>
  );
}

// ─── 1. Default — empty resting state ──────────────────────────────────────

export function TextInputDefaultDemo() {
  return (
    <Centered>
      <TextInput label="Label" />
    </Centered>
  );
}

// ─── 2. Sizes — sm / md / lg ───────────────────────────────────────────────

export function TextInputSizesDemo() {
  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4">
      <TextInput size="sm" label="Small" />
      <TextInput size="md" label="Medium" />
      <TextInput size="lg" label="Large" />
    </div>
  );
}

// ─── 3. States — Default / Active / Input / Error / Disabled ───────────────

export function TextInputStatesDemo() {
  // The Active state is just "focused", which we can't fake in static markup;
  // instead we render one input pre-filled so the floated-label treatment is
  // visible at rest.
  return (
    <div className="mx-auto flex w-full max-w-[320px] flex-col gap-4">
      <TextInput label="Default" />
      <TextInput label="Input" defaultValue="ravi@petpooja.com" />
      <TextInput label="Error" defaultValue="invalid-email" error="Please enter a valid email." />
      <TextInput label="Disabled" defaultValue="Locked field" disabled />
    </div>
  );
}

// ─── 4. Leading + trailing icons ───────────────────────────────────────────

export function TextInputIconsDemo() {
  const [value, setValue] = React.useState('ravi@petpooja.com');
  return (
    <Centered>
      <TextInput
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leadingIcon={<MailIcon />}
        trailingIcon={<CloseIcon />}
        onTrailingIconClick={() => setValue('')}
        helperText="We'll send a verification link."
      />
    </Centered>
  );
}

// ─── 5. Prefix slot — phone country code ───────────────────────────────────

export function TextInputPrefixDemo() {
  return (
    <Centered>
      <TextInput
        label="Phone"
        placeholder="98765 43210"
        type="tel"
        prefix={
          <button
            type="button"
            className="inline-flex h-7 items-center gap-1 rounded-[6px] text-[14px] leading-[22px] text-black focus:outline-none"
          >
            <span aria-hidden="true" className="text-[16px]">🇮🇳</span>
            <span>+91</span>
            <ChevronDown />
          </button>
        }
      />
    </Centered>
  );
}

// ─── 6. Suffix slot — unit indicator ───────────────────────────────────────

export function TextInputSuffixDemo() {
  return (
    <Centered>
      <TextInput
        label="Order value"
        type="number"
        defaultValue="1250"
        suffix={<span className="text-[14px] leading-[22px] text-[#666666]">INR</span>}
      />
    </Centered>
  );
}

// ─── 7. Inline CTA — Apply / Subscribe pattern ─────────────────────────────

export function TextInputCtaDemo() {
  const [code, setCode] = React.useState('');
  const [applied, setApplied] = React.useState<string | null>(null);
  return (
    <Centered>
      <TextInput
        label="Promo code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        cta="Apply"
        ctaDisabled={code.trim().length === 0}
        onCtaClick={() => setApplied(code.trim())}
        helperText={applied ? `Applied: ${applied}` : 'Enter a promo code to see the discount.'}
      />
    </Centered>
  );
}

// ─── 8. Password reveal — clickable trailing icon ──────────────────────────

export function TextInputPasswordDemo() {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState('petpooja-2024');
  return (
    <Centered>
      <TextInput
        label="Password"
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        trailingIcon={<EyeIcon open={show} />}
        onTrailingIconClick={() => setShow((s) => !s)}
        helperText="At least 8 characters."
      />
    </Centered>
  );
}

// ─── 9. Search — leading icon, no label ────────────────────────────────────

export function TextInputSearchDemo() {
  const [q, setQ] = React.useState('');
  return (
    <Centered>
      <TextInput
        placeholder="Search outlets"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        leadingIcon={<SearchIcon />}
        trailingIcon={q ? <CloseIcon /> : null}
        onTrailingIconClick={q ? () => setQ('') : undefined}
      />
    </Centered>
  );
}
