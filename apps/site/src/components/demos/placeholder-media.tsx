import { cn } from '@/lib/utils';

// Reproduction of the Figma placeholder illustration used in the Bottom Sheet
// Zero State and Card media areas: a rounded triangle, a 12-point sunburst,
// and a rounded square — all filled in #c8c8c8 (the luminosity-blended tone
// of the original Frame 7.png over the #f0f0f0 surface).
interface PlaceholderMediaProps {
  className?: string;
}

export function PlaceholderMedia({ className }: PlaceholderMediaProps) {
  return (
    <svg
      viewBox="0 0 350 188"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      {/* Rounded triangle — top */}
      <path
        d="M175 32
           C181 32 185 35 188 40
           L218 84
           C222 91 220 97 213 99
           L137 99
           C130 97 128 91 132 84
           L162 40
           C165 35 169 32 175 32 Z"
        fill="#c8c8c8"
      />

      {/* 12-point sunburst — bottom-left.
          Sharp points smoothed via stroke-linejoin=round + matching stroke. */}
      <path
        d="M130,108
           L135.2,118.7 L145,112 L144.1,123.9
           L156,123 L149.3,132.8 L160,138
           L149.3,143.2 L156,153 L144.1,152.1
           L145,164 L135.2,157.3 L130,168
           L124.8,157.3 L115,164 L115.9,152.1
           L104,153 L110.7,143.2 L100,138
           L110.7,132.8 L104,123 L115.9,123.9
           L115,112 L124.8,118.7 Z"
        fill="#c8c8c8"
        stroke="#c8c8c8"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* Rounded square — bottom-right */}
      <rect x="186" y="108" width="60" height="60" rx="12" fill="#c8c8c8" />
    </svg>
  );
}

// Compact version of the same composition for narrow contexts (horizontal
// card thumb, list-row leading visuals). Same 3-shape arrangement packed
// into a square viewBox.
export function PlaceholderMediaThumb({ className }: PlaceholderMediaProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      preserveAspectRatio="xMidYMid meet"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
    >
      {/* Rounded triangle */}
      <path
        d="M40 12
           C42.5 12 44.3 13.2 45.5 15
           L57 36
           C58.5 39 57.5 41.5 54.5 42.5
           L25.5 42.5
           C22.5 41.5 21.5 39 23 36
           L34.5 15
           C35.7 13.2 37.5 12 40 12 Z"
        fill="#c8c8c8"
      />
      {/* 12-point sunburst */}
      <path
        d="M27,46
           L28.8,50.3 L32.7,47.8 L32.4,52.6
           L37,52.2 L34.5,56.2 L38.8,58.4
           L34.5,60.6 L37,64.6 L32.4,64.2
           L32.7,69 L28.8,66.5 L27,70.8
           L25.2,66.5 L21.3,69 L21.6,64.2
           L17,64.6 L19.5,60.6 L15.2,58.4
           L19.5,56.2 L17,52.2 L21.6,52.6
           L21.3,47.8 L25.2,50.3 Z"
        fill="#c8c8c8"
        stroke="#c8c8c8"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Rounded square */}
      <rect x="46" y="46" width="22" height="22" rx="5" fill="#c8c8c8" />
    </svg>
  );
}
