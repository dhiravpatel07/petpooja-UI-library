'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV: NavSection[] = [
  {
    title: 'Getting started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'CLI', href: '/docs/cli' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Bottom Sheet', href: '/docs/components/bottom-sheet' },
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Chip', href: '/docs/components/chip' },
      { title: 'Color', href: '/docs/components/color' },
      { title: 'Date Picker', href: '/docs/components/date-picker' },
      { title: 'Dropdown', href: '/docs/components/dropdown' },
      { title: 'List', href: '/docs/components/list' },
      { title: 'Popup', href: '/docs/components/popup' },
      { title: 'Radio Group', href: '/docs/components/radio-group' },
      { title: 'Search', href: '/docs/components/search' },
      { title: 'Side Drawer', href: '/docs/components/side-drawer' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Table', href: '/docs/components/table' },
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Text', href: '/docs/components/text' },
      { title: 'Text Input', href: '/docs/components/text-input' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-6">
      {NAV.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {section.title}
          </h3>
          <ul className="flex flex-col gap-1">
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-md px-3 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-accent font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
