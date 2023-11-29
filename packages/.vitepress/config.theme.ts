import type { DefaultTheme } from 'vitepress'
import indexes from '../indexes.json'

const Guide = [
  { text: 'Get Started', link: '/docs/guide/' },
]

const CoreFunctions = indexes.documents.map(doc => ({
  text: doc.name,
  link: doc.docs,
}))

const Use = [
  { text: '@hugh-ma/utils', link: '/docs/use/hugh-config' },
  { text: '@hugh-ma/vueuse', link: '/docs/use/hugh-vueuse' },
  { text: 'HughHttp', link: '/docs/use/hugh-http' },
]

const DefaultSideBar: any[] = [
  { text: 'Guide', items: Guide },
  { text: 'Core Functions', items: CoreFunctions },
  { text: 'Use', items: Use },
]

export const sidebar: DefaultTheme.Sidebar = {
  '/docs/guide/': DefaultSideBar,
  '/docs/use/': DefaultSideBar,
  ...getReduceSideBar(indexes.documents.map(v => v.docs)),
}

export const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Home',
    link: '/'
  },
  {
    text: 'Guide',
    items: Guide,
  },
  {
    text: 'Functions',
    items: CoreFunctions,
  },
  {
    text: 'Use',
    items: Use,
  },
  {
    text: 'Github',
    link: 'https://github.com/levi-Ma/hugh-lib',
  }
]

function getReduceSideBar(names: string[]) {
  const bars = names.reduce((total, key) => {
    if (!key)
      return total
    total[key] = DefaultSideBar
    return total
  }, <any>{})
  return bars
}
