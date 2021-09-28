import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'CHERRY-USDC',
    lpAddresses: {
      80001: '',
      137: '0x18Bf5425C38A1913E0acA46Dd8cB584C4815eAC9',
    },
    tokenSymbol: 'CHERRY',
    tokenAddresses: {
      80001: '',
      137: '0x5cb984817d5a1e3259c2bbc3a0ebdfe6bd1de74b',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    exchange:"QuickSwap"

  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'CHERRY-WMATIC',
    lpAddresses: {
      80001: '',
      137: '0x040c8C50b327080476bC67034cE085933842BE76',
    },
    tokenSymbol: 'CHERRY',
    tokenAddresses: {
      80001: contracts.wmatic[80001],
      137: contracts.wmatic[137],
    },
    quoteTokenSymbol: QuoteToken.WMATIC,
    quoteTokenAdresses: contracts.wmatic,
    exchange:"QuickSwap"

  },
  {
    pid: 11,
    risk: 5,
    lpSymbol: 'WMATIC-USDC',
    lpAddresses: {
      80001: '',
      137: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      80001: contracts.wmatic[80001],
      137: contracts.wmatic[137],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    exchange:"QuickSwap"

  },
 
  {
    pid: 12,
    risk: 12,
    lpSymbol: 'WETH-USDC',
    lpAddresses: {
      80001: '',
      137: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d',
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      80001: '',
      137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    exchange:"QuickSwap"
  },
 
  {
    pid: 13,
    risk: 5,
    lpSymbol: 'WMATIC-WETH',
    lpAddresses: {
      80001: '',
      137: '0xadbF1854e5883eB8aa7BAf50705338739e558E5b',
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      80001: contracts.wmatic[80001],
      137: contracts.wmatic[137],
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
    exchange:"QuickSwap"
  },

  {
    pid: 14,
    risk: 5,
    lpSymbol: 'WBTC-USDC',
    lpAddresses: {
      80001: '',
      137: '0xF6a637525402643B0654a54bEAd2Cb9A83C8B498',
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      80001: contracts.wbtc[80001],
      137: contracts.wbtc[137],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    exchange:"QuickSwap"
  },
  {
    pid: 15,
    risk: 5,
    lpSymbol: 'WBTC-WETH',
    lpAddresses: {
      80001: '',
      137: '0xdC9232E2Df177d7a12FdFf6EcBAb114E2231198D', // vert-weth
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      80001: '',
      137: contracts.cake[137], // vert
    },
    quoteTokenSymbol: QuoteToken.WETH,
    quoteTokenAdresses: contracts.weth,
    exchange:"QuickSwap"

  },
  {
    pid: 16,
    risk: 3,
    lpSymbol: 'USDC-USDT',
    lpAddresses: {
      80001: '',
      137: '0x2cF7252e74036d1Da831d11089D326296e64a728',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      80001: contracts.busd[80001],
      137: contracts.busd[137],
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
    exchange:"QuickSwap"

  },
  {
    pid: 17,
    risk: 3,
    lpSymbol: 'USDC-DAI',
    lpAddresses: {
      80001: '',
      137: '0xf04adBF75cDFc5eD26eeA4bbbb991DB002036Bdd',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      80001: '',
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
    quoteTokenSymbol: QuoteToken.DAI,
    quoteTokenAdresses: contracts.dai,
    exchange:"QuickSwap"

  },  
  {
    pid: 0,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'CHERRY',
    lpAddresses: {
      80001: '',
      137: "0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708", // CHERRY-USDC LP
    },
    tokenSymbol: 'CHERRY',
    tokenAddresses: {
      80001: '',
      137: '0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },    
  {
    pid: 3,
    risk: 5,
    isTokenOnly: true,
    isVault: true,
    lpSymbol: 'CHERRY',
    lpAddresses: {
      80001: '',
      137: "0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708", // CHERRY-USDC LP
    },
    tokenSymbol: 'CHERRY',
    tokenAddresses: {
      80001: '',
      137: '0xbD01698Ab485A7b8092A4e32B9c8B1939F6D2708',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  }


  
 
]

export default farms
