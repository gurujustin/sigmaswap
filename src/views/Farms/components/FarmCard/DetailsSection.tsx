import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'

export interface ExpandableSectionProps {
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address,
  pid: number,
  exchange? : string
}

const Wrapper = styled.div`
  margin-top: 24px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  pid,
  exchange
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, pid })

  let swapURLFirstPart = "https://quickswap.exchange/#/swap"
  let addURLFirstPart = "https://quickswap.exchange/#/add"

  switch (exchange) {
    case "DFYN":
      swapURLFirstPart = "https://exchange.dfyn.network/#/swap"
      addURLFirstPart = "https://exchange.dfyn.network/#/add"
      break;
    case "QuickSwap":
    default:
      break;
  }
  
  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={
          isTokenOnly ?
            `${swapURLFirstPart}/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
          `${addURLFirstPart}/${liquidityUrlPathParts}`
        }>
          {lpLabel}
        </StyledLinkExternal>
      </Flex>
      {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )}
      <Flex justifyContent="flex-start">
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on polygonscan')}
        </Link>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
