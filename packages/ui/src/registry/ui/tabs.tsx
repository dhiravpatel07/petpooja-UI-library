'use client';
import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 47:626 (Pantheon › Tabs).
//
// The Figma file documents 200+ frames (4 sizes × 3 states × 3 types ×
// 2-5 tab counts). Per the user's instruction we collapse all that into
// a single composable component:
//
//   • Size lives on TabsList as a `size` prop (xs | sm | md | lg) and
//     cascades to triggers via a `data-tabs-size` attribute + Tailwind
//     `group-data-*` selectors. RSC-safe — no React.createContext.
//   • Icon / Text Only / Icon + Text variants are pure composition:
//     pass an SVG child, or text, or both. Icons are auto-sized to
//     match the active tab size via `[&_svg]:size-*` selectors.
//   • Selected state uses a 1.5px `::after` underline positioned over
//     the list's 1px bottom border — no layout shift.
//
// Tokens from Figma:
//   • Heights:        32 / 36 / 40 / 48 px (xs / sm / md / lg)
//   • Icon sizes:     18 / 18 / 20 / 24 px
//   • Type sizes:     14/22 (xs/sm/md) and 16/24 (lg)
//   • Padding:        px-8 py-2 (all sizes)
//   • Gap (icon↔txt): 8 px
//   • Enabled text:   #666666 (text/secondary)
//   • Hover bg:       #fafafa (surface/secondary)
//   • Selected text:  #1770ee (text/brand) + Inter Semi-Bold
//   • Underline:      1.5px #1770ee
//   • List border:    1px #e5e5e5 (border/primary)

const Tabs = TabsPrimitive.Root;

export type TabsSize = 'xs' | 'sm' | 'md' | 'lg';

interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  /** Size of every trigger inside this list. Cascades via data attribute. */
  size?: TabsSize;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size = 'md', ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    data-tabs-size={size}
    className={cn(
      'group/tabs-list inline-flex items-center border-b border-[#e5e5e5]',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Layout — flex row with icon ↔ text gap
      'relative inline-flex items-center justify-center gap-2 px-8 py-2 whitespace-nowrap',
      "font-['Inter',ui-sans-serif,system-ui,sans-serif] font-medium text-[#666666] transition-colors",
      // Auto-shrink icons to the right size
      '[&_svg]:shrink-0',
      // Size cascade — driven by data-tabs-size on the parent List
      'group-data-[tabs-size=xs]/tabs-list:h-8 group-data-[tabs-size=xs]/tabs-list:text-[14px] group-data-[tabs-size=xs]/tabs-list:leading-[22px] group-data-[tabs-size=xs]/tabs-list:[&_svg]:size-[18px]',
      'group-data-[tabs-size=sm]/tabs-list:h-9 group-data-[tabs-size=sm]/tabs-list:text-[14px] group-data-[tabs-size=sm]/tabs-list:leading-[22px] group-data-[tabs-size=sm]/tabs-list:[&_svg]:size-[18px]',
      'group-data-[tabs-size=md]/tabs-list:h-10 group-data-[tabs-size=md]/tabs-list:text-[14px] group-data-[tabs-size=md]/tabs-list:leading-[22px] group-data-[tabs-size=md]/tabs-list:[&_svg]:size-5',
      'group-data-[tabs-size=lg]/tabs-list:h-12 group-data-[tabs-size=lg]/tabs-list:text-[16px] group-data-[tabs-size=lg]/tabs-list:leading-[24px] group-data-[tabs-size=lg]/tabs-list:[&_svg]:size-6',
      // Hover state
      'hover:bg-[#fafafa]',
      // Selected state — Radix sets data-state="active"
      'data-[state=active]:font-semibold data-[state=active]:text-[#1770ee]',
      // Underline pseudo — sits over the list's 1px gray border, becomes blue when active
      'after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1.5px] after:bg-transparent',
      'data-[state=active]:after:bg-[#1770ee]',
      // Disabled
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
      // Focus
      'focus-visible:outline-none focus-visible:bg-[#fafafa]',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
