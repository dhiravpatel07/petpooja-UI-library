'use client';
import { useState } from 'react';
import {
  Badge,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Search,
  Card,
  CardContent,
  CardMedia,
  CardTitle,
  CardSubtitle,
} from '@petpooja/ui';

const ITEMS = [
  'Margherita pizza',
  'Pepperoni pizza',
  'Mushroom risotto',
  'Caesar salad',
  'Garlic bread',
];

function ZebraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-current">
      <rect x="4" y="4" width="3" height="16" rx="1" fill="currentColor" />
      <rect x="9" y="4" width="3" height="16" rx="1" fill="currentColor" />
      <rect x="14" y="4" width="3" height="16" rx="1" fill="currentColor" />
      <rect x="19" y="4" width="2" height="16" rx="1" fill="currentColor" />
    </svg>
  );
}

export function LiveSearch() {
  const [q, setQ] = useState('');
  const filtered = q
    ? ITEMS.filter((i) => i.toLowerCase().includes(q.toLowerCase()))
    : ITEMS;
  return (
    <div className="flex flex-col gap-3">
      <Search value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try typing 'pizza'…" />
      <ul className="flex flex-col gap-1">
        {filtered.length === 0 ? (
          <li className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
            No matches for "{q}"
          </li>
        ) : (
          filtered.slice(0, 4).map((item) => (
            <li
              key={item}
              className="flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-sm"
            >
              <span className="text-foreground">{item}</span>
              <Badge size="small" />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export function LiveSwitchPanel() {
  const [push, setPush] = useState(true);
  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      {[
        { label: 'Push notifications', state: push, set: setPush },
        { label: 'Email digest', state: email, set: setEmail },
        { label: 'SMS alerts', state: sms, set: setSms },
      ].map((row) => (
        <label
          key={row.label}
          className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5"
        >
          <span className="text-sm font-medium text-foreground">{row.label}</span>
          <Switch
            size="small"
            checked={row.state}
            onCheckedChange={(v) => row.set(v)}
            icon
            aria-label={row.label}
          />
        </label>
      ))}
    </div>
  );
}

export function LiveTabs() {
  return (
    <Tabs defaultValue="day">
      <TabsList size="sm">
        <TabsTrigger value="day">
          <ZebraIcon />
          Day
        </TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function LiveCard() {
  return (
    <div className="w-full max-w-[280px]">
      <Card variant="horizontal" interactive>
        <CardMedia className="flex items-center justify-center bg-[#1770ee]/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#1770ee]">
            <path
              d="M3 13h2l3-9 4 18 3-12 2 6h4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CardMedia>
        <CardContent>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle>Today's revenue</CardTitle>
            <CardSubtitle>Up 12.4% week over week</CardSubtitle>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
