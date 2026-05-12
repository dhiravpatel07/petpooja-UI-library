import { highlight } from '@/lib/highlight';
import { REGISTRY_BASE_URL } from '@/lib/utils';
import { InstallCommandTabs } from './install-command-tabs';

const MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const;
export type Manager = (typeof MANAGERS)[number];

function commandFor(manager: Manager, registryName: string): string {
  const url = `${REGISTRY_BASE_URL}/r/${registryName}.json`;
  switch (manager) {
    case 'pnpm':
      return `pnpm dlx shadcn@latest add ${url}`;
    case 'yarn':
      return `yarn dlx shadcn@latest add ${url}`;
    case 'bun':
      return `bunx --bun shadcn@latest add ${url}`;
    case 'npm':
    default:
      return `npx shadcn@latest add ${url}`;
  }
}

interface InstallCommandProps {
  name: string;
}

export async function InstallCommand({ name }: InstallCommandProps) {
  const variants = await Promise.all(
    MANAGERS.map(async (manager) => {
      const command = commandFor(manager, name);
      const html = await highlight(command, 'bash');
      return { manager, command, html };
    }),
  );

  return <InstallCommandTabs variants={variants} />;
}
