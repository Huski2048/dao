import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Huski',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Huski), NFTs, and more, on a platform you can trust.',
}

export const getCustomMeta = (path: string): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${'Home'} | ${'Huski'}`,
      }

    default:
      return null
  }
}
