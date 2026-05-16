'use client';
import * as React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownSearch,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownFooter,
  DropdownCancelButton,
  DropdownConfirmButton,
  DropdownList,
  DropdownSeparator,
} from '@petpooja/ui';

// Reused trigger styling so every demo opens from the same Pantheon button.
const triggerBtn =
  "inline-flex h-10 min-w-[180px] items-center justify-between gap-2 rounded-[10px] border border-[#E5E5E5] bg-white px-3 py-2 text-[14px] leading-[22px] text-black outline-none transition-colors hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40 font-['Inter',ui-sans-serif,system-ui,sans-serif]";

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0 text-black/70"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Outline raven glyph — same one used across the Pantheon design system.
function RavenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M7 9c0-2 1.5-3.5 3.5-3.5S14 7 14 9c3 0.5 5.5 3 6 7l-2.5 0.5-2.5-1-3 1.5-3-1-3-1.5z" />
      <path d="M4 9.5l-2.5-0.5L4 10.5" />
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9 12c1.6 1 3.6 1.2 5.5 0.5" />
      <path d="M11 17v3.5M9 20.5l2-0.5 2 0.5" />
      <path d="M15 17v3.5M13 20.5l2-0.5 2 0.5" />
    </svg>
  );
}

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig'];

// ─── 1. Default (with search, no CTA) ──────────────────────────────────────
// Mirrors Figma variant Search=True · CTA=False.
export function DropdownDefaultDemo() {
  const [query, setQuery] = React.useState('');
  const [selected, setSelected] = React.useState('Banana');
  const visible = FRUITS.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dropdown>
      <DropdownTrigger className={triggerBtn}>
        <span className="flex items-center gap-2">
          <span className="size-4 text-black">
            <RavenIcon />
          </span>
          {selected || 'Select fruit'}
        </span>
        <ChevronDown />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownSearch value={query} onValueChange={setQuery} />
        <DropdownList>
          {visible.length === 0 ? (
            <div className="px-4 py-3 text-[14px] leading-[22px] text-[#666]">
              No matches
            </div>
          ) : (
            visible.map((fruit) => (
              <DropdownItem
                key={fruit}
                leadingIcon={<RavenIcon />}
                selected={fruit === selected}
                onClick={() => setSelected(fruit)}
              >
                {fruit}
              </DropdownItem>
            ))
          )}
        </DropdownList>
      </DropdownContent>
    </Dropdown>
  );
}

// ─── 2. No search, no CTA ──────────────────────────────────────────────────
// Mirrors Figma variant Search=False · CTA=False.
export function DropdownBareDemo() {
  const [selected, setSelected] = React.useState('Cherry');
  return (
    <Dropdown>
      <DropdownTrigger className={triggerBtn}>
        <span>{selected}</span>
        <ChevronDown />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownList>
          {FRUITS.slice(0, 5).map((fruit) => (
            <DropdownItem
              key={fruit}
              leadingIcon={<RavenIcon />}
              selected={fruit === selected}
              onClick={() => setSelected(fruit)}
            >
              {fruit}
            </DropdownItem>
          ))}
        </DropdownList>
      </DropdownContent>
    </Dropdown>
  );
}

// ─── 3. Checkbox items + CTA footer ────────────────────────────────────────
// Mirrors Figma variant Search=True · CTA=True with checkbox items.
export function DropdownMultiSelectDemo() {
  const [query, setQuery] = React.useState('');
  const [draft, setDraft] = React.useState<Set<string>>(new Set(['Apple']));
  const [confirmed, setConfirmed] = React.useState<string[]>(['Apple']);
  const [open, setOpen] = React.useState(false);

  const visible = FRUITS.filter((f) =>
    f.toLowerCase().includes(query.toLowerCase()),
  );

  const reset = () => setDraft(new Set(confirmed));

  return (
    <Dropdown
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(new Set(confirmed));
        setOpen(next);
      }}
    >
      <DropdownTrigger className={triggerBtn}>
        <span>
          {confirmed.length === 0
            ? 'Select fruits'
            : `${confirmed.length} selected`}
        </span>
        <ChevronDown />
      </DropdownTrigger>
      <DropdownContent className="h-[288px]">
        <DropdownSearch value={query} onValueChange={setQuery} />
        <DropdownList className="flex-1 overflow-y-auto py-1">
          {visible.map((fruit) => (
            <DropdownCheckboxItem
              key={fruit}
              checked={draft.has(fruit)}
              onCheckedChange={(checked) => {
                const next = new Set(draft);
                if (checked) next.add(fruit);
                else next.delete(fruit);
                setDraft(next);
              }}
            >
              {fruit}
            </DropdownCheckboxItem>
          ))}
        </DropdownList>
        <DropdownFooter>
          <DropdownCancelButton
            onClick={() => {
              reset();
              setOpen(false);
            }}
          >
            Cancel
          </DropdownCancelButton>
          <DropdownConfirmButton
            onClick={() => {
              setConfirmed(Array.from(draft));
              setOpen(false);
            }}
          >
            Apply
          </DropdownConfirmButton>
        </DropdownFooter>
      </DropdownContent>
    </Dropdown>
  );
}

// ─── 4. CTA footer without search ──────────────────────────────────────────
// Mirrors Figma variant Search=False · CTA=True.
export function DropdownCtaDemo() {
  const [open, setOpen] = React.useState(false);
  const [confirmed, setConfirmed] = React.useState('Apple');
  const [draft, setDraft] = React.useState(confirmed);

  return (
    <Dropdown
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(confirmed);
        setOpen(next);
      }}
    >
      <DropdownTrigger className={triggerBtn}>
        <span>{confirmed}</span>
        <ChevronDown />
      </DropdownTrigger>
      <DropdownContent className="h-[240px]">
        <DropdownList className="flex-1 overflow-y-auto py-1">
          {FRUITS.slice(0, 4).map((fruit) => (
            <DropdownItem
              key={fruit}
              leadingIcon={<RavenIcon />}
              selected={fruit === draft}
              closeOnSelect={false}
              onClick={() => setDraft(fruit)}
            >
              {fruit}
            </DropdownItem>
          ))}
        </DropdownList>
        <DropdownFooter>
          <DropdownCancelButton onClick={() => setOpen(false)}>
            Cancel
          </DropdownCancelButton>
          <DropdownConfirmButton
            onClick={() => {
              setConfirmed(draft);
              setOpen(false);
            }}
          >
            Confirm
          </DropdownConfirmButton>
        </DropdownFooter>
      </DropdownContent>
    </Dropdown>
  );
}

// re-export so the docs page can render a separator example if needed
export { DropdownSeparator };
