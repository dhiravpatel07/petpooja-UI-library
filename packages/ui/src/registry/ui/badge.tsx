import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-[5px] bg-[#7e00d2] text-white',
  {
    variants: {
      size: {
        large:
          "px-2 text-[10px] font-medium leading-[18px] whitespace-nowrap font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        small: 'h-2 w-2 p-0',
      },
    },
    defaultVariants: {
      size: 'large',
    },
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, size = 'large', children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ size }), className)} {...props}>
        {size === 'small' ? null : children}
      </span>
    );
  },
);
Badge.displayName = 'Badge';

export { badgeVariants };
