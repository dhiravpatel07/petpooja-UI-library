import type { ReactNode } from 'react';
import { highlight } from '@/lib/highlight';
import { ComponentPreviewTabs } from './component-preview-tabs';

interface ComponentPreviewProps {
  preview: ReactNode;
  code: string;
  language?: string;
  previewClassName?: string;
}

export async function ComponentPreview({
  preview,
  code,
  language = 'tsx',
  previewClassName,
}: ComponentPreviewProps) {
  const html = await highlight(code, language);
  return (
    <ComponentPreviewTabs
      preview={preview}
      codeHtml={html}
      codeText={code}
      language={language}
      previewClassName={previewClassName}
    />
  );
}
