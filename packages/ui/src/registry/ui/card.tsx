'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  cn(
    'group/card overflow-hidden rounded-[10px] border border-[#e5e5e5] bg-white transition-colors',
    "font-['Inter',ui-sans-serif,system-ui,sans-serif]",
  ),
  {
    variants: {
      variant: {
        stacked: 'flex w-full flex-col',
        horizontal: 'flex w-full flex-row',
      },
      interactive: {
        true: 'cursor-pointer active:bg-[#fafafa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'stacked',
      interactive: false,
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'stacked', interactive, onKeyDown, ...props }, ref) => {
    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (interactive && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        event.currentTarget.click();
      }
      onKeyDown?.(event);
    };

    return (
      <div
        ref={ref}
        data-card-variant={variant ?? 'stacked'}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={handleKeyDown}
        className={cn(cardVariants({ variant, interactive }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = 'Card';

// Top-of-card section header. Stacked variant uses this above CardMedia for a
// Title Large heading. Padded so it sits flush against the media below it.
const CardSectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex w-full items-center px-4 py-6', className)} {...props} />
));
CardSectionHeader.displayName = 'CardSectionHeader';

// Media slot with the surface/tertiary gray fill. Sizes itself by variant via
// Tailwind group-data selectors that read data-card-variant on the Card root.
const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden bg-[#f0f0f0]',
        'group-data-[card-variant=stacked]/card:h-[188px] group-data-[card-variant=stacked]/card:w-full group-data-[card-variant=stacked]/card:shrink-0',
        'group-data-[card-variant=horizontal]/card:w-20 group-data-[card-variant=horizontal]/card:shrink-0 group-data-[card-variant=horizontal]/card:self-stretch',
        className,
      )}
      {...props}
    />
  ),
);
CardMedia.displayName = 'CardMedia';

// Main body. Stacked → column stack (gap-8 px-4 py-6). Horizontal → row
// (gap-8 p-4) so a trailing element sits beside the text block.
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex',
      'group-data-[card-variant=stacked]/card:w-full group-data-[card-variant=stacked]/card:flex-col group-data-[card-variant=stacked]/card:gap-8 group-data-[card-variant=stacked]/card:px-4 group-data-[card-variant=stacked]/card:py-6',
      'group-data-[card-variant=horizontal]/card:flex-1 group-data-[card-variant=horizontal]/card:items-center group-data-[card-variant=horizontal]/card:gap-8 group-data-[card-variant=horizontal]/card:p-4',
      className,
    )}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const titleVariants = cva('font-semibold text-black', {
  variants: {
    size: {
      md: 'text-[16px] leading-[24px]',
      lg: 'text-[18px] leading-[26px]',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  as?: 'h2' | 'h3' | 'h4' | 'p';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size, as: Comp = 'h3', ...props }, ref) => {
    const Tag = Comp as 'h3';
    return <Tag ref={ref} className={cn(titleVariants({ size }), className)} {...props} />;
  },
);
CardTitle.displayName = 'CardTitle';

// Subtitle text under a Title. Black in stacked (per Figma "text/primary"),
// gray in horizontal (per Figma "text/secondary") — adapts via parent data attr.
const CardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-[14px] font-normal leading-[22px]',
      'group-data-[card-variant=stacked]/card:text-black',
      'group-data-[card-variant=horizontal]/card:text-[#666666]',
      className,
    )}
    {...props}
  />
));
CardSubtitle.displayName = 'CardSubtitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-[14px] font-normal leading-[22px] text-[#666666]', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex w-full items-center justify-end gap-2', className)}
      {...props}
    />
  ),
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardSectionHeader,
  CardMedia,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardFooter,
};
