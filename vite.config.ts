import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkSmartypants from 'remark-smartypants'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    nitro({
      prerender: {
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        routes: ['/'],
      },
    }),
    tailwindcss(),
    tanstackStart(),
    // Must run before the React plugin so .mdx is already JSX by the time
    // React's transform sees it.
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        // Curly quotes, proper dashes and ellipses. This is an editorial
        // site; straight quotes in long-form prose look wrong.
        remarkPlugins: [remarkSmartypants],
      }),
    },
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

export default config
