import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('rehype-pretty-code').Options} */
const prettyCodeOptions = {
  // VS Code's default dark theme — same TextMate grammar engine VS Code uses.
  theme: 'dark-plus',
  keepBackground: false,
  defaultLang: { block: 'tsx', inline: 'plaintext' },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  transpilePackages: ['@petpooja/ui'],
};

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});

export default withMDX(nextConfig);
