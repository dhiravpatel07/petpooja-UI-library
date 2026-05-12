'use client';
import { useState } from 'react';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { Checkbox } from '@petpooja/ui';

export function CheckboxControlledDemo() {
  const [agreed, setAgreed] = useState(false);
  return (
    <label className="flex cursor-pointer select-none items-center gap-3">
      <Checkbox
        id="terms"
        checked={agreed}
        onCheckedChange={(v) => setAgreed(v === true)}
      />
      <span className="text-[16px] leading-6 text-foreground">
        I agree to the terms and conditions
      </span>
    </label>
  );
}

const ITEMS = ['Eggs', 'Milk', 'Bread'] as const;

export function CheckboxIndeterminateDemo() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    Eggs: true,
    Milk: false,
    Bread: false,
  });

  const total = ITEMS.length;
  const checkedCount = ITEMS.filter((i) => selected[i]).length;
  const parent: CheckedState =
    checkedCount === 0 ? false : checkedCount === total ? true : 'indeterminate';

  const toggleAll = (next: CheckedState) => {
    const value = next === true;
    setSelected({ Eggs: value, Milk: value, Bread: value });
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex cursor-pointer select-none items-center gap-3">
        <Checkbox checked={parent} onCheckedChange={toggleAll} />
        <span className="text-[16px] font-medium leading-6 text-foreground">
          Select all
        </span>
      </label>
      <div className="ml-7 flex flex-col gap-2 border-l border-border pl-4">
        {ITEMS.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <Checkbox
              checked={selected[item]}
              onCheckedChange={(v) =>
                setSelected((prev) => ({ ...prev, [item]: v === true }))
              }
            />
            <span className="text-[16px] leading-6 text-foreground/80">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function CheckboxAllStates() {
  return (
    <div className="grid grid-cols-[auto_repeat(3,_minmax(0,_1fr))] items-center gap-x-10 gap-y-6">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground" />
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Unselected
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Indeterminate
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Selected
      </span>

      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Enabled
      </span>
      <Checkbox />
      <Checkbox checked="indeterminate" />
      <Checkbox defaultChecked />

      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Disabled
      </span>
      <Checkbox disabled />
      <Checkbox disabled checked="indeterminate" />
      <Checkbox disabled defaultChecked />
    </div>
  );
}
