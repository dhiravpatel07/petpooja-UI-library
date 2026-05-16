'use client';
import {
  COLOR_PALETTES,
  ColorPalette,
  ColorSwatch,
  ColorSystem,
  PRIMARY_PALETTE,
  SECONDARY_PALETTE,
  GRAY_PALETTE,
  ERROR_PALETTE,
  WARNING_PALETTE,
  SUCCESS_PALETTE,
} from '@petpooja/ui';

export function ColorSystemDemo() {
  return <ColorSystem palettes={COLOR_PALETTES} />;
}

export function ColorPaletteDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
      <ColorPalette palette={PRIMARY_PALETTE} />
      <ColorPalette palette={SECONDARY_PALETTE} />
    </div>
  );
}

export function ColorSwatchDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <ColorSwatch label="Primary 500" hex="#1770EE" />
      <ColorSwatch label="Gray 0" hex="#FFFFFF" />
      <ColorSwatch label="Gray 1000" hex="#000000" />
      <ColorSwatch label="Custom" hex="#FF6B35" />
    </div>
  );
}

export function ColorStatusDemo() {
  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
      <ColorPalette palette={ERROR_PALETTE} />
      <ColorPalette palette={WARNING_PALETTE} />
      <ColorPalette palette={SUCCESS_PALETTE} />
    </div>
  );
}

export function ColorNeutralsDemo() {
  return <ColorPalette palette={GRAY_PALETTE} />;
}
