import BigNumber from 'bignumber.js/bignumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)

export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 380000
export const DEFAULT_CODE = '0x00000000'
export const CALCULATION_ACCURACY = 100000
export const PRICE_DECIMAL = 100000000


