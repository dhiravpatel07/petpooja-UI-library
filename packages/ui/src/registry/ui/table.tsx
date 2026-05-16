'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 2436:798 (Pantheon › Data Table).
//
// The Figma frame documents a composable data-table system. Every variation
// shown on the canvas — sortable headers, selectable rows, expandable rows,
// status/badge cells, link cells, numeric cells, a selection toolbar, and a
// pagination footer — collapses into one composable primitive set:
//
//   <Table>
//     <TableToolbar>…</TableToolbar>          {/* optional selection bar */}
//     <TableRoot>                              {/* the actual <table>    */}
//       <TableHeader>
//         <TableRow>
//           <TableHead sortable sortDirection="asc">Header</TableHead>
//           …
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <TableRow selected expandable expanded onExpandedChange={…}>
//           <TableCell>…</TableCell>
//           …
//         </TableRow>
//       </TableBody>
//     </TableRoot>
//     <TablePagination total={200} page={1} pageSize={10} … />
//   </Table>
//
// Figma variable map (selected highlights):
//   Surface/Primary    #FFFFFF   row bg
//   Surface/Secondary  #FAFAFA   hover wash / muted footer
//   Surface/Brand      #E8F1FD   selected row + selection toolbar
//   Border/Primary     #E5E5E5   hairline rules + outer border
//   Border/Brand       #1770EE   selected row left rail (1.5 px)
//   Text/Primary       #000000   header + body cell text
//   Text/Secondary     #666666   muted captions (pagination, "of 200")
//   Text/Brand         #1770EE   sortable header active, link cells, CTAs
//   Status/Info        #E8F1FD / #1770EE  default Badge fill + label
//
// Layout tokens:
//   • Outer container  10 px radius · 1 px `#E5E5E5` border · overflow hidden
//   • Row height       48 px (md, default) · 56 px (lg)
//   • Cell padding     16 px horizontal · auto vertical (height owns spacing)
//   • Header height    44 px
//   • Toolbar height   48 px · 12 px H padding
//   • Pagination       48 px · 16 px H padding
//   • Typography       Inter · 14 / 22 body · 12 / 20 caption · 500 weight headers
//
// The component is unstyled by default for column widths — callers either let
// the browser auto-size columns or pin them with `<col>` elements / utility
// classes. Sort and expansion are controlled-only so the host owns state.

// ─── Outer wrapper ─────────────────────────────────────────────────────────
// Renders the bordered, rounded, overflow-hidden chrome that wraps the table,
// toolbar, and pagination. Use this as the top-level component.

export type TableProps = React.HTMLAttributes<HTMLDivElement>;

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Container chrome — matches the outer card on every Figma frame.
        'flex w-full flex-col overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white',
        "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        className,
      )}
      {...props}
    />
  ),
);
Table.displayName = 'Table';

// ─── <table> root ──────────────────────────────────────────────────────────
// The scrollable <table> element. Sits between the toolbar and the pagination
// footer; `overflow-x-auto` lets wide tables scroll horizontally without
// breaking the surrounding chrome.

export interface TableRootProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Wrap the table in an `overflow-x-auto` scroll container. Defaults to `true`. */
  scrollable?: boolean;
}

const TableRoot = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, scrollable = true, ...props }, ref) => {
    const table = (
      <table
        ref={ref}
        className={cn(
          'w-full caption-bottom border-collapse text-[14px] leading-[22px] text-black',
          className,
        )}
        {...props}
      />
    );
    return scrollable ? <div className="w-full overflow-x-auto">{table}</div> : table;
  },
);
TableRoot.displayName = 'TableRoot';

// ─── <thead> ───────────────────────────────────────────────────────────────

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      // Header rows sit on white and rule off from the body with a 1 px hairline.
      '[&_tr]:border-b [&_tr]:border-[#E5E5E5]',
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

// ─── <tbody> ───────────────────────────────────────────────────────────────

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      // Hairline rule between body rows, none after the last row (the outer
      // border of <Table /> draws that one).
      '[&_tr]:border-b [&_tr]:border-[#E5E5E5] [&_tr:last-child]:border-0',
      className,
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

// ─── <tfoot> ───────────────────────────────────────────────────────────────

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t border-[#E5E5E5] bg-[#FAFAFA] font-medium text-black',
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

// ─── <tr> ──────────────────────────────────────────────────────────────────

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Persistent selected state — paints the row with the `Surface/Brand` wash. */
  selected?: boolean;
  /** Sub-row of an expanded parent — adds a soft `#FAFAFA` background. */
  sub?: boolean;
  /** Render the hover wash + cursor-pointer. Combine with `onClick`. */
  interactive?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, sub, interactive, ...props }, ref) => (
    <tr
      ref={ref}
      data-state={selected ? 'selected' : undefined}
      data-sub={sub ? '' : undefined}
      className={cn(
        'transition-colors',
        // Selected row — Surface/Brand wash + brand left rail (drawn with
        // box-shadow inset so it doesn't disturb cell padding).
        selected && 'bg-[#E8F1FD] shadow-[inset_3px_0_0_0_#1770EE]',
        // Sub / nested row — sits on Surface/Secondary so the visual hierarchy
        // is obvious even without indenting cell contents.
        !selected && sub && 'bg-[#FAFAFA]',
        // Interactive rows (e.g. row-as-link) — keyboard-friendly hover wash.
        interactive &&
          !selected &&
          'cursor-pointer hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1770EE]/40',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

// ─── <th> ──────────────────────────────────────────────────────────────────

type CellAlign = 'left' | 'center' | 'right';
type SortDirection = 'asc' | 'desc' | false;

const alignClass = (align: CellAlign | undefined) =>
  align === 'right'
    ? 'text-right'
    : align === 'center'
      ? 'text-center'
      : 'text-left';

export interface TableHeadProps
  extends Omit<React.ThHTMLAttributes<HTMLTableCellElement>, 'onClick'> {
  /** Render a sort affordance (chevron icon) and toggle the underlying button. */
  sortable?: boolean;
  /** Current sort direction. `false` means inactive (unsorted). */
  sortDirection?: SortDirection;
  /** Fired when the sort affordance is activated. */
  onSort?: () => void;
  /** Horizontal alignment of the cell contents. Defaults to `"left"`. */
  align?: CellAlign;
  /** Visually compact header — drops to 36 px / 12 px font for dense tables. */
  compact?: boolean;
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  (
    {
      className,
      children,
      sortable,
      sortDirection = false,
      onSort,
      align = 'left',
      compact,
      scope = 'col',
      ...props
    },
    ref,
  ) => {
    const content = sortable ? (
      <button
        type="button"
        onClick={onSort}
        className={cn(
          // Hug content button — keeps the sort affordance keyboard-accessible.
          'inline-flex items-center gap-1 select-none whitespace-nowrap',
          'rounded-[4px] outline-none transition-colors',
          'focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
          // Active sort takes the brand colour so the column is unmistakable.
          sortDirection
            ? 'text-[#1770EE]'
            : 'text-black hover:text-[#1770EE]',
        )}
        aria-label={
          sortDirection === 'asc'
            ? 'Sorted ascending'
            : sortDirection === 'desc'
              ? 'Sorted descending'
              : 'Sort column'
        }
      >
        <span>{children}</span>
        <SortIndicator direction={sortDirection} />
      </button>
    ) : (
      <span className="inline-flex items-center select-none">{children}</span>
    );

    return (
      <th
        ref={ref}
        scope={scope}
        aria-sort={
          sortDirection === 'asc'
            ? 'ascending'
            : sortDirection === 'desc'
              ? 'descending'
              : sortable
                ? 'none'
                : undefined
        }
        className={cn(
          // Header row height + padding tracks the Figma "Header" frame.
          compact ? 'h-9 text-[12px] leading-[20px]' : 'h-11 text-[14px] leading-[22px]',
          'px-4 font-medium text-black align-middle',
          alignClass(align),
          className,
        )}
        {...props}
      >
        {content}
      </th>
    );
  },
);
TableHead.displayName = 'TableHead';

// ─── <td> ──────────────────────────────────────────────────────────────────

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Horizontal alignment of the cell contents. */
  align?: CellAlign;
  /** Right-align + tabular-nums for numeric columns. */
  numeric?: boolean;
  /** Drop the horizontal padding — handy for slot cells (checkbox / chevron). */
  flush?: boolean;
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align, numeric, flush, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'h-12 px-4 align-middle text-[14px] leading-[22px] text-black',
        alignClass(numeric ? 'right' : align),
        numeric && 'tabular-nums',
        flush && 'px-0 first:pl-3 last:pr-3',
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

// ─── Sort indicator ────────────────────────────────────────────────────────
// Renders the up / down chevron stack used in sortable headers. `direction`
// drives which arrow gets the brand color so the sorted state is unambiguous.

interface SortIndicatorProps {
  direction: SortDirection;
}

const SortIndicator = ({ direction }: SortIndicatorProps) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
    className="h-3 w-3 shrink-0"
  >
    <path
      d="M6 2.5L8.5 5H3.5L6 2.5Z"
      fill="currentColor"
      opacity={direction === 'desc' ? 0.25 : 1}
    />
    <path
      d="M6 9.5L3.5 7H8.5L6 9.5Z"
      fill="currentColor"
      opacity={direction === 'asc' ? 0.25 : 1}
    />
  </svg>
);

// ─── Expand toggle ─────────────────────────────────────────────────────────
// 24×24 hit area with a 12 px chevron; rotates when the parent row is open.
// Place inside a flush <TableCell> to act as the row's expand control.

export interface TableExpandToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'aria-expanded'> {
  expanded: boolean;
}

const TableExpandToggle = React.forwardRef<
  HTMLButtonElement,
  TableExpandToggleProps
>(({ className, expanded, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    aria-expanded={expanded}
    aria-label={expanded ? 'Collapse row' : 'Expand row'}
    className={cn(
      'inline-flex h-6 w-6 items-center justify-center rounded-[4px] text-black outline-none transition-colors',
      'hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      className,
    )}
    {...props}
  >
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn('h-3 w-3 transition-transform', expanded ? 'rotate-180' : 'rotate-0')}
    >
      <path
        d="M3 4.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
));
TableExpandToggle.displayName = 'TableExpandToggle';

// ─── Link cell ─────────────────────────────────────────────────────────────
// "Body ↗" link variant from the Figma building blocks — body text in brand
// color with the outbound arrow glyph.

export interface TableLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Hide the trailing arrow icon. */
  noIcon?: boolean;
}

const TableLink = React.forwardRef<HTMLAnchorElement, TableLinkProps>(
  ({ className, children, noIcon, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 text-[14px] leading-[22px] text-[#1770EE]',
        'hover:underline focus-visible:outline-none focus-visible:underline',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {noIcon ? null : (
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="h-3 w-3 shrink-0"
        >
          <path
            d="M4 8l4-4M5 4h3v3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  ),
);
TableLink.displayName = 'TableLink';

// ─── Toolbar ───────────────────────────────────────────────────────────────
// The horizontal bar that sits above the table when rows are selected.
// Matches both Figma variants:
//   • Selection actions     — Primary / Secondary buttons + "Clear Selection"
//   • Select-all info       — "Select all N items" / "Clear All" link cluster
//
// Compose using the `TableToolbarInfo` and `TableToolbarActions` slots.

export interface TableToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Force the brand wash variant. Defaults to `true` so the toolbar always
   *  matches the "selection in progress" appearance from Figma. */
  active?: boolean;
}

const TableToolbar = React.forwardRef<HTMLDivElement, TableToolbarProps>(
  ({ className, active = true, ...props }, ref) => (
    <div
      ref={ref}
      role="toolbar"
      className={cn(
        'flex w-full items-center gap-3 border-b border-[#E5E5E5] px-3',
        'h-12 text-[14px] leading-[22px]',
        active ? 'bg-[#E8F1FD] text-[#1770EE]' : 'bg-white text-black',
        className,
      )}
      {...props}
    />
  ),
);
TableToolbar.displayName = 'TableToolbar';

const TableToolbarInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex min-w-0 flex-1 items-center gap-2 font-medium',
      className,
    )}
    {...props}
  />
));
TableToolbarInfo.displayName = 'TableToolbarInfo';

const TableToolbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex shrink-0 items-center gap-2', className)}
    {...props}
  />
));
TableToolbarActions.displayName = 'TableToolbarActions';

// Inline "Select all 456 items" / "Clear All" / "Clear Selection" buttons.
// Plain text-brand affordance — no border, no fill.

export interface TableToolbarLinkProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Native button `type` — defaults to `"button"` to avoid accidental form submits. */
  type?: 'button' | 'submit' | 'reset';
}

const TableToolbarLink = React.forwardRef<
  HTMLButtonElement,
  TableToolbarLinkProps
>(({ className, type = 'button', ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(
      'inline-flex h-8 items-center rounded-[4px] px-2 text-[14px] font-medium leading-[22px] text-[#1770EE]',
      'transition-colors hover:bg-[#D1E2FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      className,
    )}
    {...props}
  />
));
TableToolbarLink.displayName = 'TableToolbarLink';

// ─── Pagination ────────────────────────────────────────────────────────────
// The pagination footer that sits below the table. Matches the Figma frame:
//   ┌────────────────────────────────────────────────────────────────────┐
//   │ < 1-10 of 200 >                          Rows per page:  10 ⌄      │
//   └────────────────────────────────────────────────────────────────────┘
//
// The component is controlled — host owns `page` and `pageSize` state and is
// notified via `onPageChange` / `onPageSizeChange`. The rows-per-page picker
// renders as a native <select> so it works on every platform without pulling
// in a popover dependency.

export interface TablePaginationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current 1-indexed page. */
  page: number;
  /** Rows per page. Drives the displayed `start-end` range. */
  pageSize: number;
  /** Total row count across all pages. */
  total: number;
  /** Available page-size options. Defaults to `[10, 25, 50, 100]`. */
  pageSizeOptions?: number[];
  /** Fires when the user navigates to a different page. */
  onPageChange?: (page: number) => void;
  /** Fires when the user picks a different rows-per-page value. */
  onPageSizeChange?: (pageSize: number) => void;
  /** Override the label text. Defaults to `"Rows per page:"`. */
  rowsPerPageLabel?: string;
  /** Custom range formatter. Defaults to `"start-end of total"`. */
  formatRange?: (start: number, end: number, total: number) => string;
}

const defaultFormat = (start: number, end: number, total: number) =>
  `${start}-${end} of ${total}`;

const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      className,
      page,
      pageSize,
      total,
      pageSizeOptions = [10, 25, 50, 100],
      onPageChange,
      onPageSizeChange,
      rowsPerPageLabel = 'Rows per page:',
      formatRange = defaultFormat,
      ...props
    },
    ref,
  ) => {
    const pageCount = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(page, 1), pageCount);
    const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
    const end = Math.min(safePage * pageSize, total);

    const goPrev = () => onPageChange?.(Math.max(1, safePage - 1));
    const goNext = () => onPageChange?.(Math.min(pageCount, safePage + 1));

    return (
      <div
        ref={ref}
        className={cn(
          // Footer chrome — sits on white inside the rounded container so the
          // outer border owns the bottom edge.
          'flex h-12 w-full items-center gap-3 border-t border-[#E5E5E5] bg-white px-4',
          'text-[14px] leading-[22px] text-black',
          className,
        )}
        {...props}
      >
        {/* Range cluster — chevron / range / chevron */}
        <div className="flex items-center gap-1">
          <PaginationStep
            direction="prev"
            disabled={safePage <= 1}
            onClick={goPrev}
          />
          <span className="select-none px-1 text-[14px] leading-[22px] text-black">
            {formatRange(start, end, total)}
          </span>
          <PaginationStep
            direction="next"
            disabled={safePage >= pageCount}
            onClick={goNext}
          />
        </div>

        <div className="ml-auto flex items-center gap-2 text-[14px] leading-[22px] text-[#666666]">
          <span className="select-none">{rowsPerPageLabel}</span>
          <PaginationPageSize
            value={pageSize}
            options={pageSizeOptions}
            onChange={onPageSizeChange}
          />
        </div>
      </div>
    );
  },
);
TablePagination.displayName = 'TablePagination';

// ─── Pagination atoms ──────────────────────────────────────────────────────

interface PaginationStepProps {
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}

const PaginationStep = ({ direction, disabled, onClick }: PaginationStepProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
    className={cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-[4px] text-black outline-none transition-colors',
      'hover:bg-[#FAFAFA] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      'disabled:cursor-not-allowed disabled:text-[#CCCCCC] disabled:hover:bg-transparent',
    )}
  >
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={cn('h-3 w-3', direction === 'next' && 'rotate-180')}
    >
      <path
        d="M7.5 3L4.5 6L7.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

interface PaginationPageSizeProps {
  value: number;
  options: number[];
  onChange?: (value: number) => void;
}

const PaginationPageSize = ({ value, options, onChange }: PaginationPageSizeProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={(event) => onChange?.(Number(event.target.value))}
      className={cn(
        // Use a native <select> with custom chevron — no popover dependency.
        'h-8 cursor-pointer appearance-none rounded-[4px] border border-[#E5E5E5] bg-white pl-2 pr-7',
        'text-[14px] font-medium leading-[22px] text-black outline-none transition-colors',
        'hover:border-[#1770EE] focus-visible:border-[#1770EE] focus-visible:ring-2 focus-visible:ring-[#1770EE]/40',
      )}
      aria-label="Rows per page"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {/* Custom chevron — `pointer-events-none` so clicks fall through to the <select>. */}
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-black"
    >
      <path
        d="M3 4.5l3 3 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// ─── Status badge ──────────────────────────────────────────────────────────
// The Figma "Status" column uses a light-blue pill that's distinct from the
// global `<Badge>` component (which is a hard-violet square). We surface it
// here so callers don't need to hand-roll the chip.

export type TableStatusTone = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const STATUS_TONES: Record<TableStatusTone, { bg: string; fg: string }> = {
  info: { bg: '#E8F1FD', fg: '#1770EE' },
  success: { bg: '#E6F4EA', fg: '#1E7E34' },
  warning: { bg: '#FFF4E0', fg: '#A35E00' },
  danger: { bg: '#FDECEC', fg: '#D03A3A' },
  neutral: { bg: '#F0F0F0', fg: '#666666' },
};

export interface TableStatusProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TableStatusTone;
}

const TableStatus = React.forwardRef<HTMLSpanElement, TableStatusProps>(
  ({ className, tone = 'info', style, ...props }, ref) => {
    const { bg, fg } = STATUS_TONES[tone];
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-[200px] px-2 py-0.5 text-[12px] font-medium leading-[20px]',
          className,
        )}
        style={{ backgroundColor: bg, color: fg, ...style }}
        {...props}
      />
    );
  },
);
TableStatus.displayName = 'TableStatus';

export {
  Table,
  TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableExpandToggle,
  TableLink,
  TableToolbar,
  TableToolbarInfo,
  TableToolbarActions,
  TableToolbarLink,
  TablePagination,
  TableStatus,
};
