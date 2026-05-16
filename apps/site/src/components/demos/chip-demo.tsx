'use client';
import { Fragment, useState } from 'react';
import { Chip } from '@petpooja/ui';

type Shape = 'square' | 'round';
type Size = 'xs' | 'sm' | 'md' | 'lg';

const RavenIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 18c2.5 0 4-1 5-3-1.5-1-2-2.5-2-4 0-2 1.5-4 4-4 1.5 0 2.5.5 3.5 1.5L17 6l1 1-1 1c.5 1 1 2 1 3 0 3.5-3 6-6.5 6H4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx="13" cy="9" r="0.75" fill="currentColor" />
  </svg>
);

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg'];
const SHAPES: Shape[] = ['round', 'square'];

export function ChipAllVariants() {
  return (
    <div className="flex flex-col gap-10">
      {SHAPES.map((shape) => (
        <div key={shape} className="flex flex-col gap-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {shape}
          </span>
          <div className="grid grid-cols-[64px_repeat(4,_minmax(0,_1fr))] items-center gap-x-6 gap-y-4">
            <span />
            {SIZES.map((size) => (
              <span
                key={size}
                className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
              >
                {size}
              </span>
            ))}
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              No icons
            </span>
            {SIZES.map((size) => (
              <div key={size}>
                <Chip shape={shape} size={size}>
                  Label
                </Chip>
              </div>
            ))}
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Leading
            </span>
            {SIZES.map((size) => (
              <div key={size}>
                <Chip shape={shape} size={size} leadingIcon={<RavenIcon />}>
                  Label
                </Chip>
              </div>
            ))}
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Trailing
            </span>
            {SIZES.map((size) => (
              <div key={size}>
                <Chip shape={shape} size={size} trailingIcon={<RavenIcon />}>
                  Label
                </Chip>
              </div>
            ))}
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Both
            </span>
            {SIZES.map((size) => (
              <div key={size}>
                <Chip
                  shape={shape}
                  size={size}
                  leadingIcon={<RavenIcon />}
                  trailingIcon={<RavenIcon />}
                >
                  Label
                </Chip>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChipStates() {
  return (
    <div className="grid grid-cols-3 items-center gap-x-10 gap-y-4">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Active
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Pressed (try clicking)
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Selected
      </span>
      <Chip>Label</Chip>
      <Chip>Click &amp; hold</Chip>
      <Chip selected>Label</Chip>
      <Chip leadingIcon={<RavenIcon />}>Label</Chip>
      <Chip leadingIcon={<RavenIcon />}>Click &amp; hold</Chip>
      <Chip selected leadingIcon={<RavenIcon />}>
        Label
      </Chip>
      <Chip shape="square">Label</Chip>
      <Chip shape="square">Click &amp; hold</Chip>
      <Chip shape="square" selected>
        Label
      </Chip>
    </div>
  );
}

const FILTERS = ['All', 'Veg', 'Non-veg', 'Spicy', 'Bestseller'] as const;
type Filter = (typeof FILTERS)[number];

export function ChipFilterDemo() {
  const [active, setActive] = useState<Filter>('All');
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map((filter) => (
        <Chip
          key={filter}
          size="sm"
          selected={active === filter}
          onClick={() => setActive(filter)}
        >
          {filter}
        </Chip>
      ))}
    </div>
  );
}

const TAGS = ['Hot Coffee', 'Iced Coffee', 'Pastries', 'Sandwiches'] as const;
type Tag = (typeof TAGS)[number];

export function ChipMultiSelectDemo() {
  const [picked, setPicked] = useState<Set<Tag>>(new Set(['Hot Coffee']));
  const toggle = (tag: Tag) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  return (
    <div className="flex flex-wrap items-center gap-2">
      {TAGS.map((tag) => (
        <Chip
          key={tag}
          shape="square"
          selected={picked.has(tag)}
          leadingIcon={<RavenIcon />}
          onClick={() => toggle(tag)}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
}

export function ChipDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Chip disabled>Label</Chip>
      <Chip disabled leadingIcon={<RavenIcon />}>
        Label
      </Chip>
      <Chip disabled selected>
        Label
      </Chip>
      <Chip disabled shape="square">
        Label
      </Chip>
    </div>
  );
}
