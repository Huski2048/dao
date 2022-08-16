const tokens = {
  usdt: {
    symbol: 'USDT',
    address: {
      56: '0x55d398326f99059ff775485246999027b3197955',
      42: '0x1484a6020a0f08400f6f56715016d2c80e26cdc1',
    },
    decimals: 18,
    decimalsDigits: 2,
    projectLink: 'https://tether.to/',
    coingeckoId: 'tether',
  },
  usdc: {
    symbol: 'USDC',
    address: {
      56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      42: '0x7079f3762805cff9c979a5bdc6f5648bcfee76c8',
    },
    decimals: 18,
    decimalsDigits: 2,
    projectLink: 'https://www.centre.io/usdc',
    coingeckoId: 'usd-coin',
  },
  eth: {
    symbol: 'ETH',
    address: {
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      42: '0x0000000000000000000000000000000000000000',
    },
    decimals: 18,
    decimalsDigits: 5,
    projectLink: 'https://ethereum.org/en/',
    coingeckoId: 'binance-eth',
  },

}

export default tokens
