import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 19,
    risk: 5,
    lpSymbol: 'SIGMA-USDC',
    lpAddresses: {
      80001: '',
      137: '0x18Bf5425C38A1913E0acA46Dd8cB584C4815eAC9',
    },
    tokenSymbol: 'SIGMA',
    tokenAddresses: {
      80001: '',
      137: '0x5cb984817d5a1e3259c2bbc3a0ebdfe6bd1de74b',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    exchange:"QuickSwap"

  },
  {
    pid: 20,
    risk: 5,
    lpSymbol: 'SIGMA-WMATIC',
    lpAddresses: {
      80001: '',
      137: '0x040c8C50b327080476bC67034cE085933842BE76',
    },
    tokenSymbol: 'SIGMA',
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
    lpSymbol: 'SIGMA',
    lpAddresses: {
      80001: '',
      137: "0x5cb984817d5a1e3259c2bbc3a0ebdfe6bd1de74b", // SIGMA-USDC LP
    },
    tokenSymbol: 'SIGMA',
    tokenAddresses: {
      80001: '',
      137: '0x5cb984817d5a1e3259c2bbc3a0ebdfe6bd1de74b',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },  
  {
    pid: 1,
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'WMATIC',
    lpAddresses: {
      80001: '',
      137: "0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827", // WMATIC-USDC LP
    },
    tokenSymbol: 'WMATIC',
    tokenAddresses: {
      80001: '',
      137: contracts.wmatic[137],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 2, 
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WETH',
    lpAddresses: {
      80001: '',
      137: '0x853Ee4b2A13f8a742d64C8F088bE7bA2131f670d', // WETH-USDC LP
    },
    tokenSymbol: 'WETH',
    tokenAddresses: {
      80001: '',
      137: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
    },
    quoteTokenSymbol: QuoteToken.BUSD, 
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 3,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'WBTC',
    lpAddresses: {
      80001: '',
      137: '0xF6a637525402643B0654a54bEAd2Cb9A83C8B498', // WBTC-USDC 
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      80001: '',
      137: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6', // WBTC
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },

  {
    pid: 4,
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'QUICK',
    lpAddresses: {
      80001: '',
      137: '0x1F1E4c845183EF6d50E9609F16f6f9cAE43BC9Cb', // QUICK-USDC LP
    },
    tokenSymbol: 'QUICK',
    tokenAddresses: {
      80001: '',
      137: '0x831753dd7087cac61ab5644b308642cc1c33dc13',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 5,
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    lpAddresses: {
      80001: '',
      137: '0xf04adBF75cDFc5eD26eeA4bbbb991DB002036Bdd', // DAI-USDC LP
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      80001: '',
      137: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 6,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'USDC',
    lpAddresses: {
      80001: '',
      137: '0xf6a637525402643b0654a54bead2cb9a83c8b498', // USDC LP
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      80001: '',
      137: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 7,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'USDT',
    lpAddresses: {
      80001: '',
      137: '0x2cF7252e74036d1Da831d11089D326296e64a728', // USDT-USDC LP
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      80001: '',
      137: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 8,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'LINK',
    lpAddresses: {
      80001: '',
      137: '0x70ceE55c98F6DA2685807611f115eA737d4a248E', // LINK-USDC LP
    },
    tokenSymbol: 'LINK',
    tokenAddresses: {
      80001: '',
      137: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 9,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BIFI',
    lpAddresses: {
      80001: '',
      137: '0xc3AA39ec9826D015767cd4dFA5492999327848C8', // BIFI-USDC LP
    },
    tokenSymbol: 'BIFI',
    tokenAddresses: {
      80001: '',
      137: '0xfbdd194376de19a88118e84e279b977f165d01b8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 10,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'AAVE',
    lpAddresses: {
      80001: '',
      137: '0x7c76B6B3FE14831A39C0fec908DA5f17180df677', // AAVE-USDC LP
    },
    tokenSymbol: 'AAVE',
    tokenAddresses: {
      80001: '',
      137: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 18,
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'SHUSHI',
    lpAddresses: {
      80001: '',
      137: '0xD9f57D9ed738AE20C5a60241a32Fd076e69AF005', // SHUSHI-USDC LP
    },
    tokenSymbol: 'SHUSHI',
    tokenAddresses: {
      80001: '',
      137: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },


  
 
]

export default farms
