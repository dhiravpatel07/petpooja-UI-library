'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Pixel-perfect port of Figma node 5376:906 (Pantheon › Search).
//
// A search input with a 16×16 magnifying-glass icon on the left and an
// optional 16×16 close (×) button on the right. The close button appears
// only when the input has a value, and clicking it clears the input and
// returns focus there — the standard search-clear pattern.
//
// Tokens from Figma:
//   • Container: h-8 (32px), rounded-[8px], border #e5e5e5, bg white
//   • Padding:   px-4 (16px horizontal), gap-2 (8px between icon and input)
//   • Text:      Inter Regular 14/22

function SearchGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10.5 10.5l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface SearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Fires after the clear (×) button is pressed and the value has been emptied. */
  onClear?: () => void;
}

const Search = React.forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      value,
      defaultValue,
      onChange,
      onClear,
      disabled,
      placeholder = 'Search',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof defaultValue === 'string' ? defaultValue : '',
    );
    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : internalValue;
    const hasValue = currentValue.length > 0;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(event.target.value);
      onChange?.(event);
    };

    const handleClear = () => {
      const input = inputRef.current;
      if (!input) return;
      // Use the native value setter so React's synthetic onChange fires
      // — required for controlled inputs to see the cleared value.
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      setter?.call(input, '');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.focus();
      onClear?.();
    };

    return (
      <div
        className={cn(
          'inline-flex h-8 w-full items-center gap-2 overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-white px-4',
          "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
          'transition-colors focus-within:border-foreground/40',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <SearchGlyph className="h-4 w-4 shrink-0 text-black/60" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-[14px] leading-[22px] text-black outline-none',
            'placeholder:text-black/60 disabled:cursor-not-allowed',
            // Hide browser-native search clear button — we render our own
            '[&::-webkit-search-cancel-button]:hidden',
            '[&::-webkit-search-decoration]:hidden',
          )}
          {...props}
        />
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className={cn(
              'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-black/60 transition-colors',
              'hover:text-black focus-visible:outline-none focus-visible:text-black focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            )}
          >
            <CloseGlyph className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);
Search.displayName = 'Search';

export { Search };
