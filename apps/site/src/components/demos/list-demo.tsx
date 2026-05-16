'use client';
import * as React from 'react';
import {
  List,
  ListItem,
  ListAvatar,
  ListIcon,
  ListDivider,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from '@petpooja/ui';

// Outline raven glyph — the canonical Pantheon system icon.
function RavenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M7 9c0-2 1.5-3.5 3.5-3.5S14 7 14 9c3 0.5 5.5 3 6 7l-2.5 0.5-2.5-1-3 1.5-3-1-3-1.5z" />
      <path d="M4 9.5l-2.5-0.5L4 10.5" />
      <circle cx="6.5" cy="8" r="0.6" fill="currentColor" stroke="none" />
      <path d="M9 12c1.6 1 3.6 1.2 5.5 0.5" />
      <path d="M11 17v3.5M9 20.5l2-0.5 2 0.5" />
      <path d="M15 17v3.5M13 20.5l2-0.5 2 0.5" />
    </svg>
  );
}

// Pantheon "Media" placeholder — rounded triangle, lobed sun, and a
// slightly-tilted rounded square. Matches the Figma image slot illustration.
function AvatarPlaceholder() {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="currentColor"
      className="h-full w-full text-[#BFBFBF]"
      aria-hidden="true"
    >
      {/* Rounded-corner triangle (top center) */}
      <path d="M28 14.5 C28.85 14.5 29.6 14.95 30.05 15.7 L35.85 25.7 C36.95 27.6 35.55 30 33.3 30 L22.7 30 C20.45 30 19.05 27.6 20.15 25.7 L25.95 15.7 C26.4 14.95 27.15 14.5 28 14.5 Z" />

      {/* 10-lobe sun / cog (bottom left, center 18,39, mean radius ~7) */}
      <path d="M18 31.6 C19.2 31.6 20.25 32.25 20.85 33.2 C21.95 33 23.1 33.55 23.55 34.6 C24.65 34.95 25.3 36.05 25.05 37.15 C25.85 37.95 25.95 39.25 25.25 40.15 C25.6 41.25 24.95 42.4 23.85 42.7 C23.45 43.8 22.25 44.4 21.15 44.05 C20.4 44.9 19.15 45.05 18.2 44.4 C17.25 45.05 16 44.9 15.25 44.05 C14.15 44.4 12.95 43.8 12.55 42.7 C11.45 42.4 10.8 41.25 11.15 40.15 C10.45 39.25 10.55 37.95 11.35 37.15 C11.1 36.05 11.75 34.95 12.85 34.6 C13.3 33.55 14.45 33 15.55 33.2 C16.15 32.25 17.2 31.6 18.4 31.6 Z" />

      {/* Tilted rounded square (bottom right) */}
      <rect
        x="30.5"
        y="32.5"
        width="15"
        height="13"
        rx="3"
        transform="rotate(-5 38 39)"
      />
    </svg>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center">
      {/* `overflow-hidden` is what makes the rounded corners actually clip the
          first / last row + the divider hairlines, instead of letting them bleed
          past the curve and meet the border at a hard square edge. */}
      <div className="w-full max-w-[320px] overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-white">
        {children}
      </div>
    </div>
  );
}

function PlaceholderTile({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children ?? <AvatarPlaceholder />}
    </div>
  );
}

// ─── 1. Text variants (1 / 2 / 3 lines) ────────────────────────────────────
export function ListTextVariantsDemo() {
  return (
    <Centered>
      <List divided>
        <ListItem title="Title" />
        <ListItem label="Label" title="Title" />
        <ListItem label="Label" title="Title" description="Text" />
      </List>
    </Centered>
  );
}

// ─── 2. Leading variants (Icon / Image / Controls) ─────────────────────────
export function ListLeadingDemo() {
  const [checked, setChecked] = React.useState(true);
  const [radio, setRadio] = React.useState('two');
  const [switched, setSwitched] = React.useState(true);

  return (
    <Centered>
      <List divided>
        <ListItem
          leading={
            <ListIcon>
              <RavenIcon />
            </ListIcon>
          }
          title="Icon leading"
        />
        <ListItem
          leading={
            <ListAvatar>
              <PlaceholderTile />
            </ListAvatar>
          }
          title="Image leading"
          label="Label"
        />
        <ListItem
          leading={
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => setChecked(v === true)}
            />
          }
          leadingGap="sm"
          title="Checkbox leading"
        />
        <ListItem
          leading={
            <RadioGroup value={radio} onValueChange={setRadio}>
              <RadioGroupItem value="two" />
            </RadioGroup>
          }
          leadingGap="sm"
          title="Radio leading"
        />
        <ListItem
          leading={
            <Switch
              checked={switched}
              onCheckedChange={setSwitched}
            />
          }
          leadingGap="sm"
          title="Switch leading"
        />
      </List>
    </Centered>
  );
}

// ─── 3. Trailing variants ──────────────────────────────────────────────────
export function ListTrailingDemo() {
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState('one');
  const [switched, setSwitched] = React.useState(false);

  return (
    <Centered>
      <List divided>
        <ListItem title="No trailing" />
        <ListItem
          title="Trailing icon"
          trailing={
            <ListIcon>
              <RavenIcon />
            </ListIcon>
          }
        />
        <ListItem
          title="Trailing checkbox"
          trailing={
            <Checkbox
              checked={checked}
              onCheckedChange={(v) => setChecked(v === true)}
            />
          }
        />
        <ListItem
          title="Trailing radio"
          trailing={
            <RadioGroup value={radio} onValueChange={setRadio}>
              <RadioGroupItem value="one" />
            </RadioGroup>
          }
        />
        <ListItem
          title="Trailing switch"
          trailing={
            <Switch checked={switched} onCheckedChange={setSwitched} />
          }
        />
      </List>
    </Centered>
  );
}

// ─── 4. Three-line + image (the Figma poster child) ────────────────────────
export function ListThreeLineImageDemo() {
  return (
    <Centered>
      <List divided>
        <ListItem
          leading={
            <ListAvatar>
              <PlaceholderTile />
            </ListAvatar>
          }
          label="Label"
          title="Title"
          description="Supporting line of text"
          trailing={
            <ListIcon>
              <RavenIcon />
            </ListIcon>
          }
        />
        <ListItem
          leading={
            <ListAvatar>
              <PlaceholderTile />
            </ListAvatar>
          }
          label="Label"
          title="Three-line layout"
          description="Leading slot aligns to top automatically"
        />
      </List>
    </Centered>
  );
}

// ─── 5. Interactive (button) row ───────────────────────────────────────────
export function ListInteractiveDemo() {
  const [selected, setSelected] = React.useState<string | null>('two');
  const rows = [
    { id: 'one', label: 'Account', desc: 'Manage your profile' },
    { id: 'two', label: 'Notifications', desc: 'Push, email, in-app' },
    { id: 'three', label: 'Billing', desc: 'Plans, invoices, taxes' },
  ];
  return (
    <Centered>
      <List divided>
        {rows.map((row) => (
          <ListItem
            key={row.id}
            interactive
            onClick={() => setSelected(row.id)}
            leading={
              <ListIcon>
                <RavenIcon />
              </ListIcon>
            }
            title={row.label}
            description={row.desc}
            trailing={
              selected === row.id ? (
                <ListIcon className="text-[#1770EE]">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.5l4 4 10-10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ListIcon>
              ) : null
            }
          />
        ))}
      </List>
    </Centered>
  );
}

// ─── 6. Plain divider example ──────────────────────────────────────────────
export function ListDividerDemo() {
  return (
    <Centered>
      <List>
        <ListItem title="Inbox" />
        <ListItem title="Sent" />
        <ListDivider />
        <ListItem title="Archive" />
        <ListItem title="Trash" />
      </List>
    </Centered>
  );
}
