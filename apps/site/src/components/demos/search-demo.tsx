'use client';
import { useState } from 'react';
import { Search } from '@petpooja/ui';

export function SearchStatesDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Empty
        </span>
        <Search />
      </div>
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Typed
        </span>
        <Search defaultValue="cheese pizza" />
      </div>
      <div className="flex w-full max-w-[400px] flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Disabled
        </span>
        <Search defaultValue="cheese pizza" disabled />
      </div>
    </div>
  );
}

const ITEMS = [
  'Margherita pizza',
  'Pepperoni pizza',
  'Mushroom risotto',
  'Caesar salad',
  'Garlic bread',
  'Tiramisu',
  'Espresso',
  'Cappuccino',
];

export function SearchControlledDemo() {
  const [query, setQuery] = useState('');
  const filtered = query
    ? ITEMS.filter((i) => i.toLowerCase().includes(query.toLowerCase()))
    : ITEMS;

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-4">
      <Search
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search menu items"
      />
      <ul className="flex max-h-[220px] flex-col gap-1 overflow-y-auto rounded-md border border-border bg-background p-2">
        {filtered.length === 0 ? (
          <li className="px-2 py-3 text-center text-sm text-muted-foreground">
            No matches for "{query}"
          </li>
        ) : (
          filtered.map((item) => (
            <li
              key={item}
              className="rounded px-2 py-1.5 text-sm text-foreground hover:bg-accent"
            >
              {item}
            </li>
          ))
        )}
      </ul>
      <p className="text-xs text-muted-foreground">
        Query: <code className="font-mono font-semibold text-foreground">{query || '∅'}</code>
        {' · '}
        Showing {filtered.length} of {ITEMS.length}
      </p>
    </div>
  );
}
