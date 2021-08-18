import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://quickswap.exchange/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://quickswap.exchange/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Dividends',
    icon: 'BondsIcon',
    href: '/dividends',
  },
  {
    label: 'Referral',
    icon: 'CommunityIcon',
    href: '/referral',
  },

  {
    label: 'Presale',
    icon: 'NftIcon',
    href: '/presale',
  },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Chart',
        href: 'https://dex.guru/',
      },
      {
        label: 'VFAT Tools',
        href: 'https://vfat.tools/',
      },
      {
        label: 'DappRadar',
        href: 'https://dappradar.com/',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Docs',
        href: '',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/',
      },
    ],
  },

]

export default config
