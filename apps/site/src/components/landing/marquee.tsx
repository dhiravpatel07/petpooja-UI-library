// Horizontal infinitely-scrolling row of every component name. Doubled to
// ensure seamless loop. Uses a CSS keyframe defined in globals.css.

const COMPONENTS = [
  'Badge',
  'Bottom Sheet',
  'Card',
  'Checkbox',
  'Date Picker',
  'Calendar',
  'Popup',
  'Radio Group',
  'Search',
  'Switch',
  'Tabs',
];

export function ComponentMarquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-background py-6">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="flex gap-12 [animation:marquee_40s_linear_infinite]">
        {[...COMPONENTS, ...COMPONENTS, ...COMPONENTS].map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-3 font-mono text-2xl font-semibold tracking-tight text-foreground/40 transition-colors hover:text-foreground sm:text-3xl"
          >
            {name}
            <span className="h-1.5 w-1.5 rounded-full bg-[#7e00d2]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
