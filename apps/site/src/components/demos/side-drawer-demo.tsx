'use client';
import * as React from 'react';
import {
  SideDrawer,
  SideDrawerTrigger,
  SideDrawerContent,
  SideDrawerHeader,
  SideDrawerLeadingIcon,
  SideDrawerTitleGroup,
  SideDrawerTitleStack,
  SideDrawerTitle,
  SideDrawerSubtitle,
  SideDrawerCloseIcon,
  SideDrawerBody,
  SideDrawerSection,
  SideDrawerSectionTitle,
  SideDrawerText,
  SideDrawerSeparator,
  SideDrawerFooter,
  SideDrawerCancelButton,
  SideDrawerConfirmButton,
  SideDrawerActionCta,
  SideDrawerMedia,
  SideDrawerZeroState,
  SideDrawerZeroStateTitle,
  SideDrawerZeroStateDescription,
  SideDrawerClose,
} from '@petpooja/ui';

const triggerBtn =
  "inline-flex h-10 items-center justify-center rounded-[10px] bg-[#1770EE] px-4 py-2 text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-[#125ABE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";

// Pantheon "Media" placeholder — rounded triangle (top), 11-lobe sun
// (bottom-left), tilted rounded square (bottom-right). Matches Figma's
// image-slot illustration.
function PlaceholderArt() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="currentColor"
      className="h-full w-full text-[#BFBFBF]"
      aria-hidden="true"
    >
      {/* Rounded-corner triangle pointing up. The bottom curves slightly
          inward to give the shield/teardrop silhouette from Figma. */}
      <path d="M100 32 C108 32 114 36 119 44 L163 110 C170 121 164 132 152 130 C130 126 70 126 48 130 C36 132 30 121 37 110 L81 44 C86 36 92 32 100 32 Z" />

      {/* 11-lobe sun. Quadratic curves from outer point to outer point with
          the inner point as the control — produces a wavy flower edge. */}
      <path d="M60 103 Q70.2 113.5 84.3 110.1 Q87.2 124.4 100.9 129.3 Q95.6 142.9 104.5 154.4 Q92.7 163 94 177.5 Q79.5 178.3 72.7 191.2 Q60 184 47.3 191.2 Q40.5 178.3 26 177.5 Q27.3 163 15.5 154.4 Q24.4 142.9 19.1 129.3 Q32.8 124.4 35.7 110.1 Q49.8 113.5 60 103 Z" />

      {/* Rounded square, slight clockwise lean (5°) bottom-right. */}
      <rect
        x="115"
        y="106"
        width="68"
        height="68"
        rx="10"
        transform="rotate(5 149 140)"
      />
    </svg>
  );
}

// Decorative back arrow that just closes the drawer.
function BackButton() {
  return (
    <SideDrawerClose asChild>
      <button
        type="button"
        aria-label="Back"
        className="flex size-6 shrink-0 items-center justify-center text-black outline-none transition-opacity hover:opacity-60 focus-visible:opacity-60"
      >
        <SideDrawerLeadingIcon />
      </button>
    </SideDrawerClose>
  );
}

// ─── 1. Default — sections + dividers + CTA footer ─────────────────────────
export function SideDrawerDefaultDemo() {
  return (
    <SideDrawer>
      <SideDrawerTrigger className={triggerBtn}>
        Open default drawer
      </SideDrawerTrigger>
      <SideDrawerContent>
        <SideDrawerHeader>
          <SideDrawerTitleGroup>
            <BackButton />
            <SideDrawerTitleStack>
              <SideDrawerTitle>Title</SideDrawerTitle>
              <SideDrawerSubtitle>Subtitle</SideDrawerSubtitle>
            </SideDrawerTitleStack>
          </SideDrawerTitleGroup>
          <SideDrawerCloseIcon />
        </SideDrawerHeader>

        <SideDrawerBody divided>
          <SideDrawerSection>
            <SideDrawerSectionTitle>Content Title</SideDrawerSectionTitle>
            <SideDrawerText>Content Subtitle</SideDrawerText>
          </SideDrawerSection>

          <SideDrawerSeparator />

          <SideDrawerSection>
            <div className="flex w-full items-center justify-between">
              <SideDrawerSectionTitle>Content Title</SideDrawerSectionTitle>
              <SideDrawerActionCta>Action CTA</SideDrawerActionCta>
            </div>
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex w-full items-start gap-4">
                <SideDrawerText className="flex-1">Item {n}</SideDrawerText>
                <SideDrawerText className="max-w-[300px] text-right">
                  Description of Item {n}
                </SideDrawerText>
              </div>
            ))}
          </SideDrawerSection>

          <SideDrawerSeparator />

          <SideDrawerSection>
            <h3 className="text-[16px] font-medium leading-[24px] text-black">
              List <span className="text-[#666666]">(List Item Count)</span>
            </h3>
            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-black" />
                  <span className="text-[14px] leading-[22px] text-black">
                    Item {n}
                  </span>
                </div>
              ))}
            </div>
          </SideDrawerSection>
        </SideDrawerBody>

        <SideDrawerFooter>
          <SideDrawerClose asChild>
            <SideDrawerCancelButton>Secondary</SideDrawerCancelButton>
          </SideDrawerClose>
          <SideDrawerConfirmButton>Primary Action</SideDrawerConfirmButton>
        </SideDrawerFooter>
      </SideDrawerContent>
    </SideDrawer>
  );
}

// ─── 2. Zero State — centered media + title + description ──────────────────
export function SideDrawerZeroStateDemo() {
  return (
    <SideDrawer>
      <SideDrawerTrigger className={triggerBtn}>
        Open zero-state drawer
      </SideDrawerTrigger>
      <SideDrawerContent>
        <SideDrawerHeader>
          <SideDrawerTitleGroup>
            <BackButton />
            <SideDrawerTitleStack>
              <SideDrawerTitle>Title</SideDrawerTitle>
              <SideDrawerSubtitle>Subtitle</SideDrawerSubtitle>
            </SideDrawerTitleStack>
          </SideDrawerTitleGroup>
          <SideDrawerCloseIcon />
        </SideDrawerHeader>

        <SideDrawerBody>
          <SideDrawerZeroState>
            <SideDrawerMedia>
              <div className="flex h-full w-full items-center justify-center p-12">
                <PlaceholderArt />
              </div>
            </SideDrawerMedia>
            <div className="flex w-full flex-col items-center gap-2 px-6">
              <SideDrawerZeroStateTitle>Content Title</SideDrawerZeroStateTitle>
              <SideDrawerZeroStateDescription>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
                est interdum, vestibulum nisi vel, semper dui. Praesent
                hendrerit volutpat velit eget rutrum.
              </SideDrawerZeroStateDescription>
            </div>
          </SideDrawerZeroState>
        </SideDrawerBody>

        <SideDrawerFooter>
          <SideDrawerClose asChild>
            <SideDrawerCancelButton>Secondary</SideDrawerCancelButton>
          </SideDrawerClose>
          <SideDrawerConfirmButton>Primary Action</SideDrawerConfirmButton>
        </SideDrawerFooter>
      </SideDrawerContent>
    </SideDrawer>
  );
}

// ─── 3. Custom body — no built-in spacing ──────────────────────────────────
export function SideDrawerCustomDemo() {
  return (
    <SideDrawer>
      <SideDrawerTrigger className={triggerBtn}>
        Open custom drawer
      </SideDrawerTrigger>
      <SideDrawerContent>
        <SideDrawerHeader>
          <SideDrawerTitleGroup>
            <SideDrawerTitleStack>
              <SideDrawerTitle>Custom layout</SideDrawerTitle>
              <SideDrawerSubtitle>
                Render any content inside the body slot
              </SideDrawerSubtitle>
            </SideDrawerTitleStack>
          </SideDrawerTitleGroup>
          <SideDrawerCloseIcon />
        </SideDrawerHeader>

        <SideDrawerBody className="p-6">
          <div className="flex flex-col gap-4">
            <p className="text-[14px] leading-[22px] text-black">
              The `SideDrawerBody` is a plain flex column with{' '}
              <code className="font-mono text-[13px]">overflow-y-auto</code>. Drop
              any content tree inside — forms, tables, custom layouts — without
              any opinionated padding or gap.
            </p>
            <div className="rounded-[10px] border border-[#E5E5E5] bg-[#FAFAFA] p-4 text-[13px] leading-[20px] text-[#666666]">
              <code>{`<SideDrawerBody className="p-6">{custom}</SideDrawerBody>`}</code>
            </div>
          </div>
        </SideDrawerBody>

        <SideDrawerFooter>
          <SideDrawerClose asChild>
            <SideDrawerCancelButton>Cancel</SideDrawerCancelButton>
          </SideDrawerClose>
          <SideDrawerConfirmButton>Done</SideDrawerConfirmButton>
        </SideDrawerFooter>
      </SideDrawerContent>
    </SideDrawer>
  );
}
