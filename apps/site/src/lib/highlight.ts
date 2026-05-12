// Server-side syntax highlighting via Shiki. Used by the
// ComponentPreview and InstallCommand server components so that strings
// (not MDX-fenced code) can be highlighted with the same VS Code theme
// that rehype-pretty-code applies to MDX code blocks.
import { codeToHtml } from 'shiki';

const THEME = 'dark-plus';

export async function highlight(code: string, language = 'tsx'): Promise<string> {
  return codeToHtml(code, {
    lang: language,
    theme: THEME,
  });
}
