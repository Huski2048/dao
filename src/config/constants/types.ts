import BigNumber from 'bignumber.js'
import { SerializedBigNumber } from 'state/types'

export interface Address {
  42?: string
  56?: string
}

export interface Token {
  symbol: string
  poolId?: number
  debtPoolId?: number
  address?: Address
  config?: Address
  decimals?: number
  decimalsDigits?: number
  projectLink?: string
  busdPrice?: string
  coingeckoId?: string
}


export interface DaoConfig {
  pid: number
  name: string
  vaultAddress: Address
  configAddress: Address
  token: Token
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}


export type PageMeta = {
  title: string
  description?: string
  image?: string
}


