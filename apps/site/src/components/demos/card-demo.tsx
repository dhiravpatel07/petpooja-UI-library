'use client';
import { useState } from 'react';
import {
  Card,
  CardSectionHeader,
  CardMedia,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardFooter,
} from '@petpooja/ui';
import { PlaceholderMedia, PlaceholderMediaThumb } from './placeholder-media';

const secondaryBtn =
  "inline-flex h-10 w-[120px] items-center justify-center rounded-[10px] border border-[#e5e5e5] bg-white px-4 py-2 text-[14px] font-medium leading-[22px] text-black transition-colors hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";
const primaryBtn =
  "inline-flex h-10 w-[120px] min-w-[88px] items-center justify-center rounded-[10px] bg-[#1770ee] px-4 py-2 text-[14px] font-medium leading-[22px] text-white transition-colors hover:bg-[#1463d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-['Inter',ui-sans-serif,system-ui,sans-serif]";

function TrailingArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-black/80">
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface StackedProps {
  pressed?: boolean;
  interactive?: boolean;
}

export function CardStacked({ pressed = false, interactive = false }: StackedProps) {
  return (
    <div className="w-[350px]">
      <Card
        variant="stacked"
        interactive={interactive}
        className={pressed ? 'bg-[#fafafa]' : undefined}
      >
        <CardSectionHeader>
          <CardTitle size="lg">Header</CardTitle>
        </CardSectionHeader>
        <CardMedia>
          <PlaceholderMedia />
        </CardMedia>
        <CardContent>
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <CardTitle>Title</CardTitle>
              <CardSubtitle>Subtitle</CardSubtitle>
            </div>
            <CardDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </CardDescription>
          </div>
          <CardFooter>
            <button type="button" className={secondaryBtn}>
              Secondary
            </button>
            <button type="button" className={primaryBtn}>
              Primary
            </button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}

interface HorizontalProps {
  pressed?: boolean;
  interactive?: boolean;
}

export function CardHorizontal({ pressed = false, interactive = false }: HorizontalProps) {
  return (
    <div className="w-[350px]">
      <Card
        variant="horizontal"
        interactive={interactive}
        className={pressed ? 'bg-[#fafafa]' : undefined}
      >
        <CardMedia>
          <PlaceholderMediaThumb />
        </CardMedia>
        <CardContent>
          <div className="flex flex-1 flex-col gap-1">
            <CardTitle>Header</CardTitle>
            <CardSubtitle>Subheader</CardSubtitle>
          </div>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] p-2 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            aria-label="More"
          >
            <TrailingArrow />
          </button>
        </CardContent>
      </Card>
    </div>
  );
}

export function CardInteractiveDemo() {
  const [lastClicked, setLastClicked] = useState<string | null>(null);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-[350px]">
        <Card
          variant="horizontal"
          interactive
          onClick={() => setLastClicked(new Date().toLocaleTimeString())}
        >
          <CardMedia>
            <PlaceholderMediaThumb />
          </CardMedia>
          <CardContent>
            <div className="flex flex-1 flex-col gap-1">
              <CardTitle>Tap me</CardTitle>
              <CardSubtitle>Hold to see the pressed state</CardSubtitle>
            </div>
            <TrailingArrow />
          </CardContent>
        </Card>
      </div>
      <p className="text-xs text-muted-foreground">
        {lastClicked ? `Clicked at ${lastClicked}` : 'Awaiting click…'}
      </p>
    </div>
  );
}
