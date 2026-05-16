'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 66:689 (Pantheon › Colors).
//
// The Figma file documents 10 palettes laid out as vertical columns:
//   • Primary   (blue)   — 9 shades   100 → 900
//   • Secondary (red)    — 9 shades   100 → 900
//   • Yellow    (accent) — 9 shades   100 → 900
//   • Aqua      (accent) — 9 shades   100 → 108
//   • Green     (accent) — 9 shades   100 → 900
//   • Beige     (accent) — 9 shades   100 → 900
//   • Gray      (neutral)— 11 shades  0, 100 → 900, 1000
//   • Error     (status) — 3 shades   100 / 500 / 600
//   • Warning   (status) — 9 shades   100 → 900 (mirrors Yellow ramp)
//   • Success   (status) — 3 shades   100 / 500 / 600
//
// Per-swatch tokens from Figma:
//   • Frame size:      500 × 80 px
//   • Padding:         24 px (left/right) · vertically centered text
//   • Label font:      Inter Medium · 16 / 24 (title-medium)
//   • Hex font:        Inter Medium · uppercase · right-aligned
//   • Foreground:      auto-contrasted (white on dark, black on light)
//                      using WCAG relative luminance · threshold ≈ 0.5
//   • Surface ring:    1 px black/5 — preserves the edge of very light shades
//                      (#FFFFFF, #FAFAFA, #FFFBEA, etc.) on white backgrounds.

const normalizeHex = (hex: string) => (hex.startsWith('#') ? hex : `#${hex}`);
const stripHex = (hex: string) => hex.replace('#', '').toUpperCase();

// WCAG 2 relative luminance. Returns 0..1.
function luminance(hex: string): number {
  const h = stripHex(hex);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (v: number) =>
    v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** Pick the more readable label color (#000 or #fff) for a given hex background. */
export function readableTextColor(hex: string): '#000000' | '#ffffff' {
  return luminance(hex) > 0.5 ? '#000000' : '#ffffff';
}

export interface ColorShade {
  /** Step label as it appears in Figma (e.g. "100", "500", "1000"). */
  step: string;
  /** Hex value — with or without the leading `#`. */
  hex: string;
}

export interface ColorPaletteSpec {
  /** Column heading (e.g. "Primary"). */
  name: string;
  /** Optional supergroup label rendered before the name (e.g. "Accent"). */
  group?: string;
  /** Shades ordered lightest → darkest. */
  shades: ColorShade[];
}

export interface ColorSwatchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Display label on the left of the swatch (e.g. "Primary 100"). */
  label: string;
  /** Background hex. Used verbatim for the right-hand readout (uppercased, no `#`). */
  hex: string;
  /** Override the auto-contrasted foreground. */
  textColor?: string;
}

/**
 * Single Figma swatch frame: a 500 × 80 colored row with the shade name on
 * the left and its uppercase hex on the right.
 */
export const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  (
    { label, hex, textColor, className, style, onClick, onKeyDown, ...props },
    ref,
  ) => {
    const bg = normalizeHex(hex);
    const fg = textColor ?? readableTextColor(bg);
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
      if (!copied) return;
      const t = window.setTimeout(() => setCopied(false), 1400);
      return () => window.clearTimeout(t);
    }, [copied]);

    const copyToClipboard = React.useCallback(async () => {
      try {
        await navigator.clipboard.writeText(bg);
        setCopied(true);
      } catch {
        // Clipboard unavailable (insecure context, denied permission, etc.) — no-op.
      }
    }, [bg]);

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={copied ? `Copied ${bg}` : `Copy ${bg}`}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          void copyToClipboard();
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            void copyToClipboard();
          }
        }}
        className={cn(
          'group relative flex h-20 w-full cursor-pointer select-none items-center justify-between gap-4 rounded-[10px] px-6',
          "font-['Inter',ui-sans-serif,system-ui,sans-serif] text-base leading-6",
          'ring-1 ring-inset ring-black/5 outline-none',
          'transition focus-visible:ring-2 focus-visible:ring-current/60',
          className,
        )}
        style={{ backgroundColor: bg, color: fg, ...style }}
        {...props}
      >
        <span className="truncate font-medium">{label}</span>
        <span className="flex shrink-0 items-center gap-2 font-mono font-medium tracking-tight">
          <span>{copied ? 'Copied!' : stripHex(hex)}</span>
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex transition-opacity duration-150',
              copied
                ? 'opacity-90'
                : 'opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70',
            )}
          >
            {copied ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </span>
        </span>
      </div>
    );
  },
);
ColorSwatch.displayName = 'ColorSwatch';

export interface ColorPaletteProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  palette: ColorPaletteSpec;
  /** Optional override for the rendered swatches (e.g. for stories / custom layouts). */
  children?: React.ReactNode;
}

/**
 * One Figma palette column: heading + a vertical stack of swatches.
 */
export const ColorPalette = React.forwardRef<HTMLDivElement, ColorPaletteProps>(
  ({ palette, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex w-full flex-col gap-3', className)}
        {...props}
      >
        <div className="flex items-baseline gap-1.5 px-1">
          {palette.group ? (
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {palette.group} /
            </span>
          ) : null}
          <span className="text-sm font-semibold text-foreground">
            {palette.name}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {children ??
            palette.shades.map((shade) => (
              <ColorSwatch
                key={shade.step}
                label={`${palette.name} ${shade.step}`}
                hex={shade.hex}
              />
            ))}
        </div>
      </div>
    );
  },
);
ColorPalette.displayName = 'ColorPalette';

export interface ColorSystemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Override the rendered palettes. Defaults to all ten Pantheon palettes. */
  palettes?: ColorPaletteSpec[];
}

/**
 * The full Pantheon Colors page: every palette laid out side by side.
 * Responsive grid — wraps onto multiple rows on narrow viewports.
 */
export const ColorSystem = React.forwardRef<HTMLDivElement, ColorSystemProps>(
  ({ palettes = COLOR_PALETTES, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
          className,
        )}
        {...props}
      >
        {palettes.map((palette) => (
          <ColorPalette
            key={`${palette.group ?? 'core'}-${palette.name}`}
            palette={palette}
          />
        ))}
      </div>
    );
  },
);
ColorSystem.displayName = 'ColorSystem';

// ──────────────────────────────────────────────────────────────────────────
// Pantheon palette data — verbatim from Figma node 66:689 (Pantheon › Colors).
// ──────────────────────────────────────────────────────────────────────────

export const PRIMARY_PALETTE: ColorPaletteSpec = {
  name: 'Primary',
  shades: [
    { step: '100', hex: '#E8F1FD' },
    { step: '200', hex: '#D1E2FC' },
    { step: '300', hex: '#A2C6F8' },
    { step: '400', hex: '#74A9F5' },
    { step: '500', hex: '#1770EE' },
    { step: '600', hex: '#125ABE' },
    { step: '700', hex: '#0E438F' },
    { step: '800', hex: '#092D5F' },
    { step: '900', hex: '#051630' },
  ],
};

export const SECONDARY_PALETTE: ColorPaletteSpec = {
  name: 'Secondary',
  shades: [
    { step: '100', hex: '#F9E9EA' },
    { step: '200', hex: '#F3D2D6' },
    { step: '300', hex: '#E8A6AD' },
    { step: '400', hex: '#DC7983' },
    { step: '500', hex: '#C52031' },
    { step: '600', hex: '#9E1A27' },
    { step: '700', hex: '#76131D' },
    { step: '800', hex: '#4F0D14' },
    { step: '900', hex: '#27060A' },
  ],
};

export const YELLOW_PALETTE: ColorPaletteSpec = {
  group: 'Accent',
  name: 'Yellow',
  shades: [
    { step: '100', hex: '#FFFBEA' },
    { step: '200', hex: '#FEF5D3' },
    { step: '300', hex: '#FDEBA7' },
    { step: '400', hex: '#FCD64F' },
    { step: '500', hex: '#FBCC23' },
    { step: '600', hex: '#C9A31C' },
    { step: '700', hex: '#64520E' },
    { step: '800', hex: '#322907' },
    { step: '900', hex: '#191404' },
  ],
};

export const AQUA_PALETTE: ColorPaletteSpec = {
  group: 'Accent',
  name: 'Aqua',
  shades: [
    { step: '100', hex: '#ECF9FC' },
    { step: '101', hex: '#D8F3F9' },
    { step: '102', hex: '#B1E7F2' },
    { step: '103', hex: '#63CFE5' },
    { step: '104', hex: '#3CC3DF' },
    { step: '105', hex: '#309CB2' },
    { step: '106', hex: '#247586' },
    { step: '107', hex: '#184E59' },
    { step: '108', hex: '#0C272D' },
  ],
};

export const GREEN_PALETTE: ColorPaletteSpec = {
  group: 'Accent',
  name: 'Green',
  shades: [
    { step: '100', hex: '#E2F9E8' },
    { step: '200', hex: '#CAF2D5' },
    { step: '300', hex: '#9CE6AF' },
    { step: '400', hex: '#3FCD64' },
    { step: '500', hex: '#10C03E' },
    { step: '600', hex: '#0D9A32' },
    { step: '700', hex: '#0A7325' },
    { step: '800', hex: '#064D19' },
    { step: '900', hex: '#053A13' },
  ],
};

export const BEIGE_PALETTE: ColorPaletteSpec = {
  group: 'Accent',
  name: 'Beige',
  shades: [
    { step: '100', hex: '#FEFAF5' },
    { step: '200', hex: '#FDF5EA' },
    { step: '300', hex: '#FCECD5' },
    { step: '400', hex: '#F9D9AB' },
    { step: '500', hex: '#F7CF96' },
    { step: '600', hex: '#D8B179' },
    { step: '700', hex: '#BA935D' },
    { step: '800', hex: '#9B7640' },
    { step: '900', hex: '#7D5824' },
  ],
};

export const GRAY_PALETTE: ColorPaletteSpec = {
  name: 'Gray',
  shades: [
    { step: '0', hex: '#FFFFFF' },
    { step: '100', hex: '#FAFAFA' },
    { step: '200', hex: '#F5F5F5' },
    { step: '300', hex: '#F0F0F0' },
    { step: '400', hex: '#E5E5E5' },
    { step: '500', hex: '#CCCCCC' },
    { step: '600', hex: '#999999' },
    { step: '700', hex: '#666666' },
    { step: '800', hex: '#333333' },
    { step: '900', hex: '#1E1E1E' },
    { step: '1000', hex: '#000000' },
  ],
};

export const ERROR_PALETTE: ColorPaletteSpec = {
  name: 'Error',
  shades: [
    { step: '100', hex: '#FBEAE9' },
    { step: '500', hex: '#D92D20' },
    { step: '600', hex: '#AE241A' },
  ],
};

export const WARNING_PALETTE: ColorPaletteSpec = {
  name: 'Warning',
  shades: [
    { step: '100', hex: '#FFFAE9' },
    { step: '200', hex: '#FEF5D3' },
    { step: '300', hex: '#FDEBA7' },
    { step: '400', hex: '#FCD64F' },
    { step: '500', hex: '#FBCC23' },
    { step: '600', hex: '#C9A31C' },
    { step: '700', hex: '#64520E' },
    { step: '800', hex: '#322907' },
    { step: '900', hex: '#191404' },
  ],
};

export const SUCCESS_PALETTE: ColorPaletteSpec = {
  name: 'Success',
  shades: [
    { step: '100', hex: '#C5FEE4' },
    { step: '500', hex: '#039855' },
    { step: '600', hex: '#027A44' },
  ],
};

/**
 * All ten palettes from the Pantheon Colors page, in canvas order
 * (Primary, Secondary, Yellow, Aqua, Green, Beige, Gray, Error, Warning, Success).
 */
export const COLOR_PALETTES: ColorPaletteSpec[] = [
  PRIMARY_PALETTE,
  SECONDARY_PALETTE,
  YELLOW_PALETTE,
  AQUA_PALETTE,
  GREEN_PALETTE,
  BEIGE_PALETTE,
  GRAY_PALETTE,
  ERROR_PALETTE,
  WARNING_PALETTE,
  SUCCESS_PALETTE,
];
