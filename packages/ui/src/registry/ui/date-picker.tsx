'use client';
import * as React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfDay,
  subDays,
  subMonths,
} from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 3980:641 (Pantheon › Date Picker).
// Full date-range picker UX: header, range display, calendar, quick-pick
// chips, and Cancel / Confirm actions. Designed to be dropped into a
// BottomSheet (or any modal container) by the consumer.
//
// State model:
//   • Internal "draft" range that the user manipulates via Calendar / chips.
//   • Committed to the consumer's `onChange` only when Confirm is pressed.
//   • Cancel discards the draft.

const PRESET_IDS = [
  'today',
  'yesterday',
  'last7',
  'last30',
  'thisMonth',
  'lastMonth',
  'custom',
] as const;
export type DatePickerPresetId = (typeof PRESET_IDS)[number];

interface Preset {
  id: DatePickerPresetId;
  label: string;
  resolve: (now: Date) => DateRange;
}

const DEFAULT_PRESETS: Preset[] = [
  {
    id: 'today',
    label: 'Today',
    resolve: (now) => ({ from: startOfDay(now), to: startOfDay(now) }),
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    resolve: (now) => {
      const y = startOfDay(subDays(now, 1));
      return { from: y, to: y };
    },
  },
  {
    id: 'last7',
    label: 'Last 7 days',
    resolve: (now) => ({ from: startOfDay(subDays(now, 6)), to: startOfDay(now) }),
  },
  {
    id: 'last30',
    label: 'Last 30 days',
    resolve: (now) => ({ from: startOfDay(subDays(now, 29)), to: startOfDay(now) }),
  },
  {
    id: 'thisMonth',
    label: 'This Month',
    resolve: (now) => ({ from: startOfMonth(now), to: endOfMonth(now) }),
  },
  {
    id: 'lastMonth',
    label: 'Last Month',
    resolve: (now) => {
      const lm = subMonths(now, 1);
      return { from: startOfMonth(lm), to: endOfMonth(lm) };
    },
  },
  { id: 'custom', label: 'Custom', resolve: () => ({ from: undefined, to: undefined }) },
];

export interface DatePickerProps {
  /** Initial / committed range. */
  value?: DateRange;
  /** Called with the committed range when the user clicks Confirm. */
  onChange?: (range: DateRange | undefined) => void;
  /** Called when the user clicks Cancel or the close icon. */
  onCancel?: () => void;
  /** Title shown in the header. Defaults to "Select Date". */
  title?: string;
  /** Override the quick-pick chips. Pass an empty array to hide them. */
  presets?: Preset[];
  /** Anchor "today" — used by presets and the calendar default month. */
  today?: Date;
  className?: string;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    { value, onChange, onCancel, title = 'Select Date', presets = DEFAULT_PRESETS, today, className },
    ref,
  ) => {
    const anchor = React.useMemo(() => today ?? new Date(), [today]);
    const [draft, setDraft] = React.useState<DateRange | undefined>(value);
    const [activePreset, setActivePreset] = React.useState<DatePickerPresetId | null>(null);

    // Sync external `value` changes back to draft.
    React.useEffect(() => {
      setDraft(value);
    }, [value]);

    const onPreset = (preset: Preset) => {
      const next = preset.id === 'custom' ? draft : preset.resolve(anchor);
      setDraft(next);
      setActivePreset(preset.id);
    };

    const onRangeChange = (next: DateRange | undefined) => {
      setDraft(next);
      setActivePreset(null);
    };

    const yearLabel = draft?.from ? format(draft.from, 'yyyy') : format(anchor, 'yyyy');
    const rangeLabel = formatRange(draft);

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-[375px] flex-col bg-white font-['Inter',ui-sans-serif,system-ui,sans-serif]",
          className,
        )}
      >
        {/* Header */}
        <div className="relative flex h-14 items-center justify-center px-4">
          <h2 className="text-[16px] font-semibold leading-6 text-black">{title}</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="absolute right-4 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-black/80 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Range display */}
        <div className="flex flex-col items-start px-4 pt-2 pb-4">
          <span className="text-[14px] font-medium leading-[22px] text-[#666666]">
            {yearLabel}
          </span>
          <span className="text-[24px] font-medium leading-[32px] text-black">
            {rangeLabel}
          </span>
        </div>

        {/* Calendar */}
        <div className="px-4">
          <Calendar
            mode="range"
            selected={draft}
            onSelect={onRangeChange}
            defaultMonth={draft?.from ?? anchor}
            numberOfMonths={1}
          />
        </div>

        {/* Preset chips */}
        {presets.length > 0 && (
          <div className="flex flex-wrap gap-4 px-4 pt-4 pb-4">
            {presets.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPreset(preset)}
                  className={cn(
                    'inline-flex h-10 min-w-[103.67px] flex-1 items-center justify-center rounded-full border px-4 py-[6px] text-[12px] leading-5 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
                    isActive
                      ? 'border-[#3a84ec] bg-[#ebf3fd] font-semibold text-[#3a84ec]'
                      : 'border-[#e5e5e5] bg-white font-medium text-black hover:bg-zinc-50',
                  )}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center gap-4 px-4 pt-2 pb-4">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-[9px] text-[14px] font-medium leading-[22px] text-black transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onChange?.(draft)}
            disabled={!draft?.from}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-[10px] bg-[#3a84ec] px-4 py-[9px] text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-[#2a74dc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-[#3a84ec]/40"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  },
);
DatePicker.displayName = 'DatePicker';

function formatRange(range: DateRange | undefined): string {
  if (!range?.from) return 'Select a date';
  if (!range.to || range.to.getTime() === range.from.getTime()) {
    return format(range.from, 'd MMM');
  }
  // Same year, same month → "22 - 29 Jan". Different month → "22 Jan - 5 Feb".
  if (
    range.from.getFullYear() === range.to.getFullYear() &&
    range.from.getMonth() === range.to.getMonth()
  ) {
    return `${format(range.from, 'd')} - ${format(range.to, 'd MMM')}`;
  }
  return `${format(range.from, 'd MMM')} - ${format(range.to, 'd MMM')}`;
}

export { DatePicker, DEFAULT_PRESETS };
export type { Preset as DatePickerPreset };
