'use client';
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetTrigger,
  BottomSheetHeader,
  BottomSheetTitleGroup,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetClose,
  BottomSheetCloseIcon,
} from '@petpooja/ui';
import { PlaceholderMedia } from './placeholder-media';

const secondaryBtn =
  "inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-[#e5e5e5] bg-white px-4 py-2 text-[14px] font-medium leading-[22px] text-black transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";
const primaryBtn =
  "inline-flex h-10 min-w-[88px] flex-1 items-center justify-center rounded-[10px] bg-[#1770ee] px-4 py-2 text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-[#1463d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";

interface DemoProps {
  variant?: 'default' | 'subtitle' | 'zero';
  label?: string;
}

export function BottomSheetDemo({ variant = 'default', label = 'Open bottom sheet' }: DemoProps) {
  return (
    <BottomSheet>
      <BottomSheetTrigger className={primaryBtn}>{label}</BottomSheetTrigger>
      <BottomSheetContent>
        {variant === 'zero' ? <ZeroStateBody /> : <TitleBody variant={variant} />}
        <BottomSheetFooter>
          <BottomSheetClose className={secondaryBtn}>Secondary</BottomSheetClose>
          <BottomSheetClose className={primaryBtn}>Primary</BottomSheetClose>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}

function TitleBody({ variant }: { variant: 'default' | 'subtitle' }) {
  return (
    <BottomSheetHeader>
      <BottomSheetTitleGroup>
        <BottomSheetTitle>Title</BottomSheetTitle>
        {variant === 'subtitle' && <BottomSheetDescription>Subtitle</BottomSheetDescription>}
      </BottomSheetTitleGroup>
      <BottomSheetCloseIcon />
    </BottomSheetHeader>
  );
}

function ZeroStateBody() {
  return (
    <div className="flex w-full flex-col">
      <BottomSheetHeader className="justify-end">
        <BottomSheetCloseIcon />
      </BottomSheetHeader>
      <div className="flex w-full flex-col gap-6">
        <div className="h-[250px] w-full overflow-hidden bg-[#f0f0f0]">
          <PlaceholderMedia />
        </div>
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <BottomSheetTitle size="lg">Title</BottomSheetTitle>
          <BottomSheetDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut est interdum,
            vestibulum nisi vel, semper dui. Praesent hendrerit volutpat velit eget rutrum.
          </BottomSheetDescription>
        </div>
      </div>
    </div>
  );
}

// Static, non-modal visual representations of each Figma state. Used by the
// docs preview tab — these render in-place rather than as a fixed-position modal.
export function BottomSheetStatic({ variant }: { variant: 'default' | 'subtitle' | 'zero' }) {
  return (
    <div
      className="flex h-[600px] w-[375px] flex-col overflow-hidden rounded-t-[30px] border border-[#e6e6e6] bg-white font-['Inter',ui-sans-serif,system-ui,sans-serif] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      role="presentation"
    >
      <div className="flex min-h-0 w-full flex-1 flex-col justify-between">
        {variant === 'zero' ? (
          <ZeroStateBodyStatic />
        ) : (
          <StaticHeader variant={variant as 'default' | 'subtitle'} />
        )}
        <div className="flex w-full items-start gap-2.5 px-6 py-4">
          <span className={secondaryBtn}>Secondary</span>
          <span className={primaryBtn}>Primary</span>
        </div>
      </div>
    </div>
  );
}

function StaticHeader({ variant }: { variant: 'default' | 'subtitle' }) {
  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      <div className="flex flex-col items-start gap-1">
        <p className="text-[16px] font-semibold leading-[24px] text-black">Title</p>
        {variant === 'subtitle' && (
          <p className="text-[14px] font-normal leading-[22px] text-[#666666]">Subtitle</p>
        )}
      </div>
      <CloseGlyph />
    </div>
  );
}

function ZeroStateBodyStatic() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-end px-6 py-4">
        <CloseGlyph />
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="h-[250px] w-full overflow-hidden bg-[#f0f0f0]">
          <PlaceholderMedia />
        </div>
        <div className="flex flex-col items-center gap-2 px-6 text-center">
          <p className="text-[18px] font-semibold leading-[26px] text-black">Title</p>
          <p className="text-[14px] font-normal leading-[22px] text-[#666666]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut est interdum,
            vestibulum nisi vel, semper dui. Praesent hendrerit volutpat velit eget rutrum.
          </p>
        </div>
      </div>
    </div>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0 text-black/80">
      <path
        d="M5 5l10 10M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
