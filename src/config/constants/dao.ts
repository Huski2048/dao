import tokens from './tokens'
import { DaoConfig } from './types'

const Dao: DaoConfig[] = [

    {
        name: "ETH",
        vaultAddress: {
            42: '0x723948a67870c362B5eecb2c75B76C95614644b3',
            56: "0x85549eac2c801dbd20964f7f6248f9ed32bd4efb",
        },
        configAddress: {
            42: '0xCD7743F2782aa0B375e97dB524A874E71F6dd7f2',
            56: '',
        },
        pid: 8,
        token: tokens.eth,
    },
    {
        name: "USDT",
        vaultAddress: {
            42: '0xEFc81d3Ca394De19162FBabd69aeE5e9D81438e4',
            56: "0xbD91429B7546AFe01c2CC4a4587bBB2E66302534",
        },
        configAddress: {
            42: '0xCD7743F2782aa0B375e97dB524A874E71F6dd7f2',
            56: '',
        },
        pid: 5,
        token: tokens.usdt,
    },
    {
        name: "USDC",
        vaultAddress: {
            42: '0xD2758D89C3FE8113ab6741F042f521Abd192F527',
            56: "0xe363355790cfc313f5ab1939155356e72bf662fb",
        },
        configAddress: {
            42: '0xCD7743F2782aa0B375e97dB524A874E71F6dd7f2',
            56: '',
        },
        pid: 12,
        token: tokens.usdc,
    },

]

export default Dao
