'use client';
import { useState } from 'react';
import {
  Badge,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
} from '@petpooja/ui';

// Cluster of live, slightly-rotated components used as the visual punch on the
// hero. Each card is interactive — visitors can flip the switch, switch tabs,
// check the box. Way more compelling than a hero illustration.
export function FloatingCluster() {
  const [pingOn, setPingOn] = useState(true);
  const [salesTab, setSalesTab] = useState('sales');
  const [agreed, setAgreed] = useState(true);
  const [plan, setPlan] = useState('pro');

  return (
    <div className="relative h-[560px] w-full">
      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,0,210,0.18)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute right-0 top-10 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(23,112,238,0.18)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Switch card — top-left */}
      <div
        className="absolute left-0 top-4 w-[220px] rotate-[-6deg] rounded-2xl border border-border bg-background p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.02] transition-transform hover:rotate-[-3deg]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Notifications
          </span>
          <Badge size="small" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Push alerts</span>
          <Switch
            checked={pingOn}
            onCheckedChange={(v) => setPingOn(v)}
            icon
            aria-label="Push alerts"
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {pingOn ? 'Notifying every event' : 'Muted'}
        </p>
      </div>

      {/* Tabs card — middle-right, larger */}
      <div
        className="absolute right-0 top-24 w-[300px] rotate-[5deg] rounded-2xl border border-border bg-background p-5 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.22)] ring-1 ring-black/[0.02] transition-transform hover:rotate-[2deg]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <div className="mb-4">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Live Tabs
          </span>
        </div>
        <Tabs value={salesTab} onValueChange={setSalesTab}>
          <TabsList size="sm">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {salesTab}
            </p>
            <p className="font-mono text-2xl font-semibold tracking-tight">
              {salesTab === 'sales' && '₹ 4.82L'}
              {salesTab === 'orders' && '218'}
              {salesTab === 'staff' && '14'}
            </p>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
            +12.4%
          </span>
        </div>
      </div>

      {/* Form card — bottom-left, taller */}
      <div
        className="absolute bottom-2 left-6 w-[260px] rotate-[3deg] rounded-2xl border border-border bg-background p-5 shadow-[0_28px_56px_-24px_rgba(0,0,0,0.2)] ring-1 ring-black/[0.02] transition-transform hover:rotate-[1deg]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Choose plan
        </span>
        <RadioGroup value={plan} onValueChange={setPlan} className="mt-3 flex flex-col gap-2">
          {[
            { id: 'starter', label: 'Starter', price: '₹999/mo' },
            { id: 'pro', label: 'Pro', price: '₹2,499/mo' },
            { id: 'enterprise', label: 'Enterprise', price: 'Talk to us' },
          ].map((p) => (
            <label
              key={p.id}
              htmlFor={`plan-${p.id}`}
              className={
                'flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 transition-colors ' +
                (plan === p.id
                  ? 'border-[#1770ee] bg-[#1770ee]/5'
                  : 'border-border hover:bg-accent/30')
              }
            >
              <span className="flex items-center gap-2">
                <RadioGroupItem id={`plan-${p.id}`} value={p.id} />
                <span className="text-sm font-medium">{p.label}</span>
              </span>
              <span className="text-xs text-muted-foreground">{p.price}</span>
            </label>
          ))}
        </RadioGroup>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
            className="h-4 w-4"
          />
          Auto-renew yearly
        </label>
      </div>

      {/* Tiny floating Badges — bottom-right */}
      <div
        className="absolute bottom-12 right-4 flex flex-col gap-2 rotate-[-8deg]"
        style={{ transformOrigin: '50% 50%' }}
      >
        <span className="rounded-full bg-background px-3 py-1.5 text-[10px] font-mono font-semibold shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] ring-1 ring-border">
          12 components
        </span>
        <span className="ml-6 rounded-full bg-[#1770ee] px-3 py-1.5 text-[10px] font-mono font-semibold text-white shadow-[0_8px_24px_-8px_rgba(23,112,238,0.6)]">
          shadcn ready
        </span>
        <span className="rounded-full bg-[#7e00d2] px-3 py-1.5 text-[10px] font-mono font-semibold text-white shadow-[0_8px_24px_-8px_rgba(126,0,210,0.55)]">
          MIT
        </span>
      </div>
    </div>
  );
}
