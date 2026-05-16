'use client';
import { Fragment } from 'react';
import { Button } from '@petpooja/ui';

type Variant = 'primary' | 'tonal' | 'outline' | 'text';
type Shape = 'square' | 'round';
type Size = 'xs' | 'sm' | 'md' | 'lg';

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M7 5l11 7-11 7V5z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VARIANTS: { label: string; value: Variant }[] = [
  { label: 'Primary', value: 'primary' },
  { label: 'Tonal', value: 'tonal' },
  { label: 'Outline', value: 'outline' },
  { label: 'Text', value: 'text' },
];

const SIZES: Size[] = ['xs', 'sm', 'md', 'lg'];

export function ButtonAllVariants() {
  return (
    <div className="flex flex-col gap-10">
      {VARIANTS.map((variant) => (
        <div key={variant.value} className="flex flex-col gap-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {variant.label}
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
            {(['square', 'round'] as Shape[]).map((shape) => (
              <Fragment key={shape}>
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {shape}
                </span>
                {SIZES.map((size) => (
                  <div key={size}>
                    <Button
                      variant={variant.value}
                      shape={shape}
                      size={size}
                      leadingIcon={<PlayIcon />}
                    >
                      Label
                    </Button>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ButtonIconPlacement() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Label</Button>
      <Button leadingIcon={<PlayIcon />}>Label</Button>
      <Button trailingIcon={<ArrowRightIcon />}>Label</Button>
      <Button shape="round" leadingIcon={<PlayIcon />} trailingIcon={<ArrowRightIcon />}>
        Label
      </Button>
    </div>
  );
}

export function ButtonStates() {
  return (
    <div className="grid grid-cols-3 items-center gap-x-10 gap-y-4">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Enabled
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Pressed (try clicking)
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Disabled
      </span>
      <Button>Primary</Button>
      <Button>Click & hold</Button>
      <Button disabled>Primary</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="tonal">Click & hold</Button>
      <Button variant="tonal" disabled>
        Tonal
      </Button>
      <Button variant="outline">Outline</Button>
      <Button variant="outline">Click & hold</Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="text">Text</Button>
      <Button variant="text">Click & hold</Button>
      <Button variant="text" disabled>
        Text
      </Button>
    </div>
  );
}

export function ButtonIconOnly() {
  return (
    <div className="flex flex-col gap-6">
      {(['square', 'round'] as Shape[]).map((shape) => (
        <div key={shape} className="flex items-center gap-4">
          <span className="w-16 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {shape}
          </span>
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="primary"
              shape={shape}
              size={size}
              iconOnly
              aria-label={`Add (${size})`}
            >
              <PlusIcon />
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
}
