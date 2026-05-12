'use client';
import { Fragment } from 'react';
import { Switch } from '@petpooja/ui';

const ROWS = [
  { label: 'Default', disabled: false, icon: false },
  { label: 'Default + Icon', disabled: false, icon: true },
  { label: 'Disabled', disabled: true, icon: false },
  { label: 'Disabled + Icon', disabled: true, icon: true },
] as const;

export function SwitchAllVariants() {
  return (
    <div className="flex flex-col gap-10">
      {(['large', 'small'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Size = {size}
          </span>
          <div className="grid grid-cols-[160px_repeat(2,_minmax(0,_1fr))] items-center gap-x-10 gap-y-5">
            <span />
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Off
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              On
            </span>
            {ROWS.map((row) => (
              <Fragment key={row.label}>
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {row.label}
                </span>
                <Switch size={size} icon={row.icon} disabled={row.disabled} />
                <Switch size={size} icon={row.icon} disabled={row.disabled} defaultChecked />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
