'use client';
import {
  Popup,
  PopupTrigger,
  PopupContent,
  PopupHeader,
  PopupBody,
  PopupFooter,
  PopupMedia,
  PopupTitle,
  PopupDescription,
  PopupClose,
  PopupCloseIcon,
} from '@petpooja/ui';
import { PlaceholderMedia } from './placeholder-media';

const secondaryBtn =
  "inline-flex h-12 items-center justify-center rounded-[12px] border border-[#e5e5e5] bg-white px-4 py-2 text-[16px] font-medium leading-6 text-black transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";
const primaryBtn =
  "inline-flex h-12 min-w-[88px] items-center justify-center rounded-[12px] bg-[#1770ee] px-4 py-2 text-[16px] font-medium leading-6 text-white transition-colors hover:bg-[#1463d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";
const triggerBtn =
  "inline-flex h-10 items-center justify-center rounded-[10px] bg-[#1770ee] px-4 py-2 text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-[#1463d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";

// Outline raven icon — 20×20 rendered size, matches Figma's left-facing
// bird silhouette from node 3580:103.
function RavenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-black"
      aria-hidden="true"
    >
      {/* Head + body silhouette — head on left, tail trailing right */}
      <path d="M7 9c0-2 1.5-3.5 3.5-3.5S14 7 14 9c3 0.5 5.5 3 6 7l-2.5 0.5-2.5-1-3 1.5-3-1-3-1.5z" />
      {/* Beak — small triangle pointing further left */}
      <path d="M4 9.5l-2.5-0.5L4 10.5" />
      {/* Eye */}
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      {/* Folded wing — curve across the body */}
      <path d="M9 12c1.6 1 3.6 1.2 5.5 0.5" />
      {/* Left leg + 3-toed foot */}
      <path d="M11 17v3.5M9 20.5l2-0.5 2 0.5" />
      {/* Right leg + 3-toed foot */}
      <path d="M15 17v3.5M13 20.5l2-0.5 2 0.5" />
    </svg>
  );
}

export function PopupDefaultDemo() {
  return (
    <Popup>
      <PopupTrigger className={triggerBtn}>Open default popup</PopupTrigger>
      <PopupContent>
        <PopupHeader>
          <div className="flex items-center gap-2">
            <RavenIcon />
            <PopupTitle>Title</PopupTitle>
          </div>
          <PopupCloseIcon />
        </PopupHeader>
        <PopupBody>
          <PopupDescription>
            Maecenas efficitur molestie ligula, vitae euismod velit volutpat eget. In mattis dui
            sit amet dui viverra, vitae mollis massa suscipit. Cras ultricies ipsum sed metus
            aliquet.
          </PopupDescription>
        </PopupBody>
        <PopupFooter>
          <PopupClose className={secondaryBtn}>Secondary</PopupClose>
          <PopupClose className={primaryBtn}>Primary</PopupClose>
        </PopupFooter>
      </PopupContent>
    </Popup>
  );
}

export function PopupImageDemo() {
  return (
    <Popup>
      <PopupTrigger className={triggerBtn}>Open image popup</PopupTrigger>
      <PopupContent>
        <PopupMedia>
          <PlaceholderMedia />
          <PopupCloseIcon className="absolute right-4 top-4 bg-white/60 backdrop-blur-sm" />
        </PopupMedia>
        <PopupBody>
          <PopupTitle>Title</PopupTitle>
          <PopupDescription>
            Maecenas efficitur molestie ligula, vitae euismod velit volutpat eget. In mattis dui
            sit amet dui viverra, vitae mollis massa suscipit. Cras ultricies ipsum sed metus
            aliquet.
          </PopupDescription>
        </PopupBody>
        <PopupFooter>
          <PopupClose className={secondaryBtn}>Secondary</PopupClose>
          <PopupClose className={primaryBtn}>Primary</PopupClose>
        </PopupFooter>
      </PopupContent>
    </Popup>
  );
}

export function PopupBothDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <PopupDefaultDemo />
      <PopupImageDemo />
    </div>
  );
}
