import type { ComponentType } from 'react';

export interface Demo {
  id: string;
  name: string;
  description?: string;
  render: ComponentType;
}

// Each component generated from Figma adds an entry here.
// Demos live in apps/docs/src/demos/<Name>.tsx and import from '@petpooja/ui'.
export const demos: Demo[] = [];
