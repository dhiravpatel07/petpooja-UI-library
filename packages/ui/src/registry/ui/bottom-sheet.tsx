'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const BottomSheet = DialogPrimitive.Root;
const BottomSheetTrigger = DialogPrimitive.Trigger;
const BottomSheetPortal = DialogPrimitive.Portal;
const BottomSheetClose = DialogPrimitive.Close;

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/40',
      'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
      className,
    )}
    {...props}
  />
));
BottomSheetOverlay.displayName = 'BottomSheetOverlay';

interface BottomSheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  hideOverlay?: boolean;
}

const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  BottomSheetContentProps
>(({ className, children, hideOverlay = false, ...props }, ref) => (
  <BottomSheetPortal>
    {!hideOverlay && <BottomSheetOverlay />}
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mx-auto',
        'flex h-[600px] max-h-[90vh] w-full max-w-[375px] flex-col overflow-hidden',
        "border border-[#e6e6e6] bg-white font-['Inter',ui-sans-serif,system-ui,sans-serif]",
        'rounded-t-[30px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
        'focus:outline-none',
        'data-[state=open]:animate-slide-up data-[state=closed]:animate-slide-down',
        className,
      )}
      {...props}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col justify-between">{children}</div>
    </DialogPrimitive.Content>
  </BottomSheetPortal>
));
BottomSheetContent.displayName = 'BottomSheetContent';

const BottomSheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full items-center justify-between px-6 py-4', className)}
    {...props}
  />
));
BottomSheetHeader.displayName = 'BottomSheetHeader';

const BottomSheetTitleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col items-start gap-1', className)} {...props} />
));
BottomSheetTitleGroup.displayName = 'BottomSheetTitleGroup';

const BottomSheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex w-full items-start gap-2.5 px-6 py-4', className)}
    {...props}
  />
));
BottomSheetFooter.displayName = 'BottomSheetFooter';

const titleVariants = cva('font-semibold text-black', {
  variants: {
    size: {
      md: 'text-[16px] leading-[24px]',
      lg: 'text-[18px] leading-[26px]',
    },
  },
  defaultVariants: { size: 'md' },
});

interface BottomSheetTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    VariantProps<typeof titleVariants> {}

const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  BottomSheetTitleProps
>(({ className, size, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(titleVariants({ size }), className)}
    {...props}
  />
));
BottomSheetTitle.displayName = 'BottomSheetTitle';

const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-[14px] font-normal leading-[22px] text-[#666666]', className)}
    {...props}
  />
));
BottomSheetDescription.displayName = 'BottomSheetDescription';

// The X icon shown in the corner. Renders as a Radix Close button so clicking
// dismisses the sheet automatically (and is keyboard-accessible).
const BottomSheetCloseIcon = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>, 'children'>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-black/80 transition-colors',
      'hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  >
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-5 w-5"
    >
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  </DialogPrimitive.Close>
));
BottomSheetCloseIcon.displayName = 'BottomSheetCloseIcon';

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetCloseIcon,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitleGroup,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetFooter,
};
