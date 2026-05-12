'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import type { DayPickerProps } from 'react-day-picker';

// Pixel-perfect port of the calendar grid from Figma node 3980:641
// (Pantheon › Date Picker). Built on react-day-picker so we get date math,
// month navigation, keyboard a11y, locale handling, and range-selection
// state for free. All visual chrome (cell sizes, colours, range strip) is
// styled in Tailwind to match the Figma.
//
// Tokens from Figma:
//   • Day cell:       34×34, rounded-[8px]
//   • Range strip bg: #ebf3fd (surface/brand-secondary)
//   • Range start/end:#3a84ec (button/secondary), white text
//   • Outside-month:  #666 text (text/secondary)
//   • Weekday label:  Inter Semi-Bold 14/20, #666
//
// react-day-picker is loaded lazily because its top-level `createContext`
// breaks when our barrel re-export is walked by the RSC build for pages
// that don't actually use the Calendar. Lazy import defers evaluation
// until the component renders on the client.

const DayPickerLazy = React.lazy(() =>
  import('react-day-picker').then((mod) => ({ default: mod.DayPicker })),
);

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <React.Suspense fallback={<CalendarFallback />}>
      <DayPickerLazy
        showOutsideDays={showOutsideDays}
        className={cn("font-['Inter',ui-sans-serif,system-ui,sans-serif]", className)}
        classNames={{
          months: 'flex flex-col gap-4',
          month: 'flex flex-col gap-2',
          month_caption: 'flex justify-center items-center h-6 relative',
          caption_label: 'text-[14px] font-semibold leading-[22px] text-black',
          nav: 'flex w-full justify-between items-center absolute inset-x-0',
          button_previous: cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-[4px] p-[2px]',
            'text-black/80 transition-colors hover:bg-zinc-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-40',
          ),
          button_next: cn(
            'inline-flex h-6 w-6 items-center justify-center rounded-[4px] p-[2px]',
            'text-black/80 transition-colors hover:bg-zinc-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            'disabled:cursor-not-allowed disabled:opacity-40',
          ),
          chevron: 'h-5 w-5',
          month_grid: 'w-full border-collapse',
          weekdays: 'flex justify-between mb-2',
          weekday:
            'flex h-[34px] w-[34px] items-center justify-center text-[14px] font-semibold leading-5 text-[#666666]',
          weeks: 'flex flex-col gap-2',
          week: 'flex justify-between',
          day: 'group/day relative flex h-[34px] w-[34px] items-center justify-center text-[14px] font-normal leading-5 text-black',
          // `relative` on the button ensures it paints above the cell's ::before
          // range strip (which sits at z-auto). No negative z-index needed →
          // works regardless of ancestor background colours.
          day_button: cn(
            'relative inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px]',
            'transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-40',
          ),
          outside: 'text-[#666666]',
          disabled: 'opacity-40',
          hidden: 'invisible',
          selected: '',
          // Range strip extends past each cell on both sides to bridge the
          // 17.5px gap between cells in a row (cells use justify-between).
          // At row edges (first/last child), the strip clamps to the cell and
          // gains a rounded corner — matching Figma's row-end strip caps.
          range_start: cn(
            '[&_button]:bg-[#3a84ec] [&_button]:text-white [&_button]:hover:bg-[#3a84ec]',
            'before:absolute before:inset-y-0 before:left-1/2 before:right-[-10px] before:bg-[#ebf3fd] before:rounded-l-[10px]',
            // Range starts at row's last cell → strip can't extend further right
            '[&:last-child]:before:right-0 [&:last-child]:before:rounded-r-[10px]',
          ),
          range_end: cn(
            '[&_button]:bg-[#3a84ec] [&_button]:text-white [&_button]:hover:bg-[#3a84ec]',
            'before:absolute before:inset-y-0 before:left-[-10px] before:right-1/2 before:bg-[#ebf3fd] before:rounded-r-[10px]',
            // Range ends at row's first cell → strip can't extend further left
            '[&:first-child]:before:left-0 [&:first-child]:before:rounded-l-[10px]',
          ),
          range_middle: cn(
            'before:absolute before:inset-y-0 before:left-[-10px] before:right-[-10px] before:bg-[#ebf3fd]',
            // First cell of a week row in the middle of a range (range wraps from prior row)
            '[&:first-child]:before:left-0 [&:first-child]:before:rounded-l-[10px]',
            // Last cell of a week row in the middle of a range (range continues to next row)
            '[&:last-child]:before:right-0 [&:last-child]:before:rounded-r-[10px]',
            '[&_button]:bg-transparent [&_button]:hover:bg-[#3a84ec]/10 [&_button]:text-black',
          ),
          today: '[&_button]:font-semibold',
          ...classNames,
        }}
        {...props}
      />
    </React.Suspense>
  );
}
Calendar.displayName = 'Calendar';

// Loading skeleton — same dimensions as a 1-month grid so layout doesn't jump.
function CalendarFallback() {
  return (
    <div className="flex w-[343px] flex-col gap-2" aria-hidden="true">
      <div className="h-6 w-full animate-pulse rounded bg-zinc-100" />
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 42 }).map((_, i) => (
          <div key={i} className="h-[34px] rounded-[8px] bg-zinc-50" />
        ))}
      </div>
    </div>
  );
}

export { Calendar };
