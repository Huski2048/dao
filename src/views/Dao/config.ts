interface Founders {
    name: string,
    image: string,
}
interface Links {
    huskiFinance: string,
    onePager: string,
    googleForm: string,
    whatIsDao: string,
    howToDao: string,
    joinDao: string
}
export const Founders: Array<Founders> = [
    // uncomment to see the founders section (for testing purposes)
    // {
    //     name: 'Binance Smart Chain',
    //     image: '/images/founders/logo.png',
    // }, {
    //     name: 'PancakeSwap',
    //     image: '/images/founders/logo.png',
    // },
    // {
    //     name: 'Ethereum',
    //     image: '/images/founders/logo.png',
    // },
]

export const Links: Links = {
    huskiFinance: 'https://dev.huski.finance/',
    onePager: 'https://drive.google.com/file/d/1APcnc0YD8N_14I5O_P_IDnwE9-i2NUvX/view?usp=sharing',
    googleForm: 'https://docs.google.com/forms/d/e/1FAIpQLSfQYEmLeC9fxtCHSB9lbcRO_3YcYvEUHSEZo6Xc9V9Lz1z5ag/viewform?usp=sf_link',
    whatIsDao: 'https://blog.aragon.org/what-is-a-dao/',
    howToDao: 'https://blog.aragon.org/how-to-dao-answers-for-beginners/',
    joinDao: ""
}

export const FUNDING_AMOUNT_TARGET = 1000000 // funding amount to be reached is 1,000,000 USD (1 million), and can go over this target
export const FUNDING_PERIOD_TARGET = '2022-03-31T23:59:59.000Z' // Date in ISO-8601 format 
export const SECOND_PHASE_START_DATE = '2022-04-01T00:00:00.000Z' // Date in ISO-8601 format
