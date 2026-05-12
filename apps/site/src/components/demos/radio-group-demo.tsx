'use client';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@petpooja/ui';

export function RadioGroupAllStates() {
  return (
    <div className="grid grid-cols-[auto_repeat(2,_minmax(0,_1fr))] items-center gap-x-12 gap-y-8">
      <span />
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Unselected
      </span>
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Selected
      </span>

      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Enabled
      </span>
      <RadioGroup>
        <RadioGroupItem value="a" />
      </RadioGroup>
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" />
      </RadioGroup>

      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Disabled
      </span>
      <RadioGroup>
        <RadioGroupItem value="a" disabled />
      </RadioGroup>
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" disabled />
      </RadioGroup>
    </div>
  );
}

export function RadioGroupControlledDemo() {
  const [value, setValue] = useState('email');
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={value} onValueChange={setValue} className="flex flex-col gap-3">
        {[
          { id: 'email', label: 'Email' },
          { id: 'sms', label: 'SMS' },
          { id: 'push', label: 'Push notification' },
        ].map((opt) => (
          <label
            key={opt.id}
            htmlFor={opt.id}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <RadioGroupItem value={opt.id} id={opt.id} />
            <span className="text-[16px] leading-6 text-foreground">{opt.label}</span>
          </label>
        ))}
      </RadioGroup>
      <p className="text-xs text-muted-foreground">
        Selected: <code className="font-mono font-semibold text-foreground">{value}</code>
      </p>
    </div>
  );
}

export function RadioGroupHorizontalDemo() {
  const [size, setSize] = useState('medium');
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={size} onValueChange={setSize} className="flex flex-row gap-6">
        {['small', 'medium', 'large'].map((opt) => (
          <label
            key={opt}
            htmlFor={`size-${opt}`}
            className="flex cursor-pointer select-none items-center gap-2"
          >
            <RadioGroupItem value={opt} id={`size-${opt}`} />
            <span className="text-[16px] leading-6 capitalize text-foreground">{opt}</span>
          </label>
        ))}
      </RadioGroup>
      <p className="text-xs text-muted-foreground">
        Selected size: <code className="font-mono font-semibold text-foreground">{size}</code>
      </p>
    </div>
  );
}
