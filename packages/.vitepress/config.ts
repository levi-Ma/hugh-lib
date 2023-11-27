import { defineConfig } from 'vitepress'
import { nav, sidebar } from './config.theme'
import { MarkdownTransform } from './plugins/transform'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [['link', { rel: 'icon', href: 'https://f.micecube.com/202311/2312013788283.svg', type: 'image/svg+xml' }]],
  title: "Hugh Library",
  description: "Hugh Library",
  themeConfig: {
    logo: 'https://f.micecube.com/202311/2312013788283.svg',
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2019-present Evan You',
    },
    sidebar,
    nav,
  },
  vite: {
    publicDir: 'public',
    plugins: [MarkdownTransform() as any],
    build: {
      // fix: rollup failed to resolve import "vue/server-renderer"
      rollupOptions: {
        external: ['vue/server-renderer'],
      },
    },
  },
})
