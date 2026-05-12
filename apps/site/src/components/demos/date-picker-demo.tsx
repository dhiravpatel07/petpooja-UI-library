'use client';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar, DatePicker } from '@petpooja/ui';

// Anchor "today" so the demo screenshots are deterministic. Matches the
// Figma sample data (selected range 22-29 Jan 2026).
const ANCHOR = new Date(2026, 0, 25);

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return '—';
  if (!range.to || range.to.getTime() === range.from.getTime()) {
    return format(range.from, 'd MMM yyyy');
  }
  return `${format(range.from, 'd MMM yyyy')} – ${format(range.to, 'd MMM yyyy')}`;
}

export function DatePickerStandaloneDemo() {
  const [committed, setCommitted] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 22),
    to: new Date(2026, 0, 29),
  });
  const [resetKey, setResetKey] = useState(0);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-[375px] overflow-hidden rounded-[30px] border border-[#e5e5e5] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
        <DatePicker
          // `key` forces a remount when Cancel fires, which resets the
          // internal draft back to `value`.
          key={resetKey}
          today={ANCHOR}
          value={committed}
          onChange={(range) => {
            setCommitted(range);
            setLastAction(`Confirmed: ${formatRange(range)}`);
          }}
          onCancel={() => {
            setResetKey((k) => k + 1);
            setLastAction('Cancelled — draft reset to the committed range');
          }}
        />
      </div>
      <div className="flex w-full max-w-[375px] flex-col items-start gap-2 rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm">
        <div className="flex w-full items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Committed value
          </span>
          <span className="font-mono font-semibold text-foreground">
            {formatRange(committed)}
          </span>
        </div>
        {lastAction && (
          <p className="text-xs italic text-muted-foreground">{lastAction}</p>
        )}
      </div>
    </div>
  );
}

export function CalendarSingleDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 0, 25));
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={ANCHOR}
      className="w-[343px]"
    />
  );
}

export function CalendarRangeDemo() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 22),
    to: new Date(2026, 0, 29),
  });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={ANCHOR}
      className="w-[343px]"
    />
  );
}
