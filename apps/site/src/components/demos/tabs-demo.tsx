'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@petpooja/ui';

function RavenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 9c0-2 1.5-3.5 3.5-3.5S14 7 14 9c3 0.5 5.5 3 6 7l-2.5 0.5-2.5-1-3 1.5-3-1-3-1.5z" />
      <path d="M4 9.5l-2.5-0.5L4 10.5" />
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9 12c1.6 1 3.6 1.2 5.5 0.5" />
      <path d="M11 17v3.5M9 20.5l2-0.5 2 0.5" />
      <path d="M15 17v3.5M13 20.5l2-0.5 2 0.5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 4 4 5-7" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}

// Live interactive demo — icon + text, medium, 3 tabs
export function TabsLiveDemo() {
  return (
    <Tabs defaultValue="sales" className="w-full max-w-[520px]">
      <TabsList size="md">
        <TabsTrigger value="sales">
          <RavenIcon />
          Sales
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <ChartIcon />
          Analytics
        </TabsTrigger>
        <TabsTrigger value="orders">
          <PackageIcon />
          Orders
        </TabsTrigger>
      </TabsList>
      <TabsContent value="sales">
        <div className="rounded-lg border border-border bg-background p-5">
          <h3 className="text-base font-semibold">Sales</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Revenue rose 12.4% week over week. 248 closed deals across 14 reps.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="rounded-lg border border-border bg-background p-5">
          <h3 className="text-base font-semibold">Analytics</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Funnel conversion held steady at 3.2%. Top traffic source: organic search.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="orders">
        <div className="rounded-lg border border-border bg-background p-5">
          <h3 className="text-base font-semibold">Orders</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            14 pending fulfillment, 3 in dispute, 2,418 shipped this quarter.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// All four sizes — Icon + Text, 3 tabs each
const SIZES = [
  { size: 'xs', label: 'Extra Small' },
  { size: 'sm', label: 'Small' },
  { size: 'md', label: 'Medium' },
  { size: 'lg', label: 'Large' },
] as const;

export function TabsSizesDemo() {
  return (
    <div className="flex flex-col gap-8">
      {SIZES.map(({ size, label }) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label} · size=&quot;{size}&quot;
          </span>
          <Tabs defaultValue="sales">
            <TabsList size={size}>
              <TabsTrigger value="sales">
                <RavenIcon />
                Sales
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <ChartIcon />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="orders">
                <PackageIcon />
                Orders
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      ))}
    </div>
  );
}

// All three composition types at Medium size
export function TabsTypesDemo() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Icon + Text
        </span>
        <Tabs defaultValue="sales">
          <TabsList size="md">
            <TabsTrigger value="sales">
              <RavenIcon />
              Sales
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <ChartIcon />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="orders">
              <PackageIcon />
              Orders
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Text only
        </span>
        <Tabs defaultValue="sales">
          <TabsList size="md">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Icon only
        </span>
        <Tabs defaultValue="sales">
          <TabsList size="md">
            <TabsTrigger value="sales" aria-label="Sales">
              <RavenIcon />
            </TabsTrigger>
            <TabsTrigger value="analytics" aria-label="Analytics">
              <ChartIcon />
            </TabsTrigger>
            <TabsTrigger value="orders" aria-label="Orders">
              <PackageIcon />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
