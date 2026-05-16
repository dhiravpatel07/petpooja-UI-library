'use client';
import * as React from 'react';
import {
  Table,
  TableRoot,
  TableHeader,
  TableBody,
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
  Checkbox,
  Button,
} from '@petpooja/ui';

// ─── Sample data ────────────────────────────────────────────────────────────
//
// Twelve rows of fixture data — enough to exercise pagination, sorting,
// selection, and expanded-row behaviour without overwhelming the docs page.

interface Row {
  id: string;
  header: string;
  secondary: string;
  long: string;
  status: 'Active' | 'Pending' | 'Paused' | 'Failed';
  number: number;
  children?: Array<Pick<Row, 'id' | 'header' | 'secondary' | 'long' | 'number'>>;
}

const STATUS_TONES: Record<Row['status'], React.ComponentProps<typeof TableStatus>['tone']> = {
  Active: 'info',
  Pending: 'warning',
  Paused: 'neutral',
  Failed: 'danger',
};

const DATA: Row[] = [
  {
    id: '1',
    header: 'Alpha kitchen',
    secondary: 'Andheri East',
    long: 'Primary dispatch lane · daily',
    status: 'Active',
    number: 4325,
    children: [
      {
        id: '1-a',
        header: 'Counter 1',
        secondary: 'Lane A',
        long: 'Hot food window',
        number: 1450,
      },
      {
        id: '1-b',
        header: 'Counter 2',
        secondary: 'Lane B',
        long: 'Bakery window',
        number: 980,
      },
    ],
  },
  {
    id: '2',
    header: 'Beta kitchen',
    secondary: 'Bandra West',
    long: 'Secondary dispatch lane',
    status: 'Pending',
    number: 3120,
  },
  {
    id: '3',
    header: 'Gamma kitchen',
    secondary: 'Powai',
    long: 'Cloud-only · breakfast hours',
    status: 'Active',
    number: 2890,
  },
  {
    id: '4',
    header: 'Delta kitchen',
    secondary: 'Lower Parel',
    long: 'Express bar · 24×7',
    status: 'Active',
    number: 5125,
  },
  {
    id: '5',
    header: 'Epsilon kitchen',
    secondary: 'Worli',
    long: 'Weekend specials only',
    status: 'Paused',
    number: 740,
  },
  {
    id: '6',
    header: 'Zeta kitchen',
    secondary: 'Goregaon',
    long: 'Family meal counter',
    status: 'Active',
    number: 1985,
  },
  {
    id: '7',
    header: 'Eta kitchen',
    secondary: 'Malad',
    long: 'Late-night dispatch',
    status: 'Failed',
    number: 0,
  },
  {
    id: '8',
    header: 'Theta kitchen',
    secondary: 'Borivali',
    long: 'Catering only',
    status: 'Pending',
    number: 3300,
  },
  {
    id: '9',
    header: 'Iota kitchen',
    secondary: 'Kandivali',
    long: 'Daily lunch window',
    status: 'Active',
    number: 2120,
  },
  {
    id: '10',
    header: 'Kappa kitchen',
    secondary: 'Mira Road',
    long: 'New launch · ramp-up',
    status: 'Pending',
    number: 540,
  },
  {
    id: '11',
    header: 'Lambda kitchen',
    secondary: 'Vashi',
    long: 'Festival pop-up',
    status: 'Paused',
    number: 220,
  },
  {
    id: '12',
    header: 'Mu kitchen',
    secondary: 'Nerul',
    long: 'Catering · corporate',
    status: 'Active',
    number: 4400,
  },
];

// Inter-style action glyphs — kept inline so the demo has zero icon-lib deps.

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3.5v9M3.5 8h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 4.5h10M6 4.5V3a1 1 0 011-1h2a1 1 0 011 1v1.5M4.5 4.5l.6 8.1a1 1 0 001 .9h3.8a1 1 0 001-.9l.6-8.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── 1. Default — sortable, selectable, paginated ─────────────────────────

export function TableDefaultDemo() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [sort, setSort] = React.useState<{
    column: 'header' | 'number';
    direction: 'asc' | 'desc';
  }>({ column: 'header', direction: 'asc' });
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  // Sort + paginate the fixture data inline.
  const sorted = React.useMemo(() => {
    const copy = [...DATA];
    copy.sort((a, b) => {
      const dir = sort.direction === 'asc' ? 1 : -1;
      if (sort.column === 'number') return (a.number - b.number) * dir;
      return a.header.localeCompare(b.header) * dir;
    });
    return copy;
  }, [sort]);

  const start = (page - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  const toggleSort = (column: typeof sort.column) => {
    setSort((prev) =>
      prev.column === column
        ? { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
        : { column, direction: 'asc' },
    );
  };

  const visibleIds = visible.map((row) => row.id);
  const allOnPageSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selected.has(id));
  const someOnPageSelected =
    visibleIds.some((id) => selected.has(id)) && !allOnPageSelected;

  const toggleAllOnPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        visibleIds.forEach((id) => next.delete(id));
      } else {
        visibleIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(DATA.map((row) => row.id)));
  const clearAll = () => setSelected(new Set());

  return (
    <div className="w-full">
      <Table>
        {selected.size > 0 ? (
          <TableToolbar>
            <TableToolbarInfo>{selected.size} items selected</TableToolbarInfo>
            <TableToolbarActions>
              <TableToolbarLink onClick={selectAll}>
                Select all {DATA.length} items
              </TableToolbarLink>
              <TableToolbarLink onClick={clearAll}>Clear All</TableToolbarLink>
            </TableToolbarActions>
          </TableToolbar>
        ) : null}

        <TableRoot>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" align="center">
                <Checkbox
                  checked={
                    allOnPageSelected
                      ? true
                      : someOnPageSelected
                        ? 'indeterminate'
                        : false
                  }
                  onCheckedChange={toggleAllOnPage}
                  aria-label="Select all rows on this page"
                />
              </TableHead>
              <TableHead
                sortable
                sortDirection={sort.column === 'header' ? sort.direction : false}
                onSort={() => toggleSort('header')}
              >
                Header
              </TableHead>
              <TableHead>Header</TableHead>
              <TableHead className="max-w-[180px]">Long Header…</TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                align="right"
                sortable
                sortDirection={sort.column === 'number' ? sort.direction : false}
                onSort={() => toggleSort('number')}
              >
                Numbers
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {visible.map((row) => (
              <TableRow key={row.id} selected={selected.has(row.id)}>
                <TableCell align="center" className="w-12">
                  <Checkbox
                    checked={selected.has(row.id)}
                    onCheckedChange={() => toggleOne(row.id)}
                    aria-label={`Select ${row.header}`}
                  />
                </TableCell>
                <TableCell>
                  <TableLink href="#">{row.header}</TableLink>
                </TableCell>
                <TableCell>{row.secondary}</TableCell>
                <TableCell className="max-w-[180px] truncate">{row.long}</TableCell>
                <TableCell>
                  <TableStatus tone={STATUS_TONES[row.status]}>{row.status}</TableStatus>
                </TableCell>
                <TableCell numeric>{row.number.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>

        <TablePagination
          page={page}
          pageSize={pageSize}
          total={DATA.length}
          pageSizeOptions={[5, 10, 25]}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
      </Table>
    </div>
  );
}

// ─── 2. Toolbar with action buttons ───────────────────────────────────────

export function TableToolbarActionsDemo() {
  const ids = ['1', '2', '3'];
  const [selected] = React.useState(new Set(ids));

  return (
    <div className="w-full">
      <Table>
        <TableToolbar>
          <TableToolbarInfo>{selected.size} items selected</TableToolbarInfo>
          <TableToolbarActions>
            <Button size="sm" leadingIcon={<PlusIcon />}>
              Primary
            </Button>
            <Button variant="outline" size="sm" leadingIcon={<TrashIcon />}>
              Secondary
            </Button>
            <TableToolbarLink>Clear Selection</TableToolbarLink>
          </TableToolbarActions>
        </TableToolbar>

        <TableRoot>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" align="center">
                <Checkbox checked="indeterminate" aria-label="Select all rows" />
              </TableHead>
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead align="right">Numbers</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {DATA.slice(0, 4).map((row) => (
              <TableRow key={row.id} selected={selected.has(row.id)}>
                <TableCell align="center" className="w-12">
                  <Checkbox
                    checked={selected.has(row.id)}
                    aria-label={`Select ${row.header}`}
                  />
                </TableCell>
                <TableCell>
                  <TableLink href="#">{row.header}</TableLink>
                </TableCell>
                <TableCell>{row.secondary}</TableCell>
                <TableCell numeric>{row.number.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Table>
    </div>
  );
}

// ─── 3. Expandable rows with sub-rows ─────────────────────────────────────

export function TableExpandableDemo() {
  const [expanded, setExpanded] = React.useState<Set<string>>(new Set(['1']));

  const toggleRow = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Only the first three rows (one has children) are interesting for this demo.
  const rows = DATA.slice(0, 3);

  return (
    <div className="w-full">
      <Table>
        <TableRoot>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12" aria-label="Expand" />
              <TableHead>Header</TableHead>
              <TableHead>Header</TableHead>
              <TableHead align="right">Numbers</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((row) => {
              const isOpen = expanded.has(row.id);
              return (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell align="center" className="w-12">
                      {row.children ? (
                        <TableExpandToggle
                          expanded={isOpen}
                          onClick={() => toggleRow(row.id)}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <TableLink href="#">{row.header}</TableLink>
                    </TableCell>
                    <TableCell>{row.secondary}</TableCell>
                    <TableCell numeric>{row.number.toLocaleString()}</TableCell>
                  </TableRow>

                  {isOpen && row.children
                    ? row.children.map((child) => (
                        <TableRow key={child.id} sub>
                          <TableCell className="w-12" />
                          <TableCell className="pl-10">{child.header}</TableCell>
                          <TableCell>{child.secondary}</TableCell>
                          <TableCell numeric>{child.number.toLocaleString()}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </TableRoot>
      </Table>
    </div>
  );
}

// ─── 4. Status tones reference ────────────────────────────────────────────

export function TableStatusDemo() {
  const rows: Array<{ label: string; tone: React.ComponentProps<typeof TableStatus>['tone'] }> = [
    { label: 'Active', tone: 'info' },
    { label: 'Completed', tone: 'success' },
    { label: 'Pending', tone: 'warning' },
    { label: 'Failed', tone: 'danger' },
    { label: 'Archived', tone: 'neutral' },
  ];
  return (
    <div className="w-full">
      <Table>
        <TableRoot>
          <TableHeader>
            <TableRow>
              <TableHead>Tone</TableHead>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-mono text-[13px] text-[#666666]">
                  {row.tone}
                </TableCell>
                <TableCell>
                  <TableStatus tone={row.tone}>{row.label}</TableStatus>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Table>
    </div>
  );
}

// ─── 5. Compact — no toolbar, no pagination ───────────────────────────────

export function TableCompactDemo() {
  return (
    <div className="w-full">
      <Table>
        <TableRoot>
          <TableHeader>
            <TableRow>
              <TableHead>Kitchen</TableHead>
              <TableHead>Location</TableHead>
              <TableHead align="right">Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DATA.slice(0, 5).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.header}</TableCell>
                <TableCell>{row.secondary}</TableCell>
                <TableCell numeric>{row.number.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableRoot>
      </Table>
    </div>
  );
}
