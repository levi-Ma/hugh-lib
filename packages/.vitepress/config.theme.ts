import type { DefaultTheme } from 'vitepress'
import indexes from '../indexes.json'

const Guide = [
  { text: 'Get Started', link: '/docs/guide/' },
]

const CoreFunctions = indexes.documents.map(doc => ({
  text: doc.name,
  link: doc.docs,
}))

const DefaultSideBar: any[] = [
  { text: 'Guide', items: Guide },
  { text: 'Core Functions', items: CoreFunctions },
]

export const sidebar: DefaultTheme.Sidebar = {
  '/docs/guide/': DefaultSideBar,
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
