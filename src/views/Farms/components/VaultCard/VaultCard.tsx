import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCardAccentSpecial = styled.div`
  background: linear-gradient(45deg,
  rgba(0, 255, 255, 1) 0%,
  rgba(0, 101, 255, 1) 10%,
  rgba(47, 255, 222, 1) 20%,
  rgba(176, 35, 181, 1) 30%,
  rgba(192, 37, 39, 1) 40%,
  rgba(208, 54, 29, 1) 50%,
  rgba(197, 98, 17, 1) 60%,
  rgba(95, 234, 13, 1) 70%,
  rgba(69, 243, 7, 1) 80%,
  rgba(4, 248, 38, 1) 90%,
  rgba(0, 255, 255, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

// background: linear-gradient(to top,rgb(255,255,255,.6), rgb(255,255,255,1));
const FCard = styled.div`
  align-self: baseline;
  background: linear-gradient(to top, ${(props) => props.theme.card.background.concat("C8")}, ${(props) => props.theme.card.background.concat("FF")});

  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  cakePrice?: BigNumber
  ethereum?: provider
  account?: string
}

const VaultCard: React.FC<FarmCardProps> = ({ farm, cakePrice, ethereum, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
   
    return farm.lpTotalInQuoteToken
  }, [cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
   
  const lpLabel = farm.lpSymbol
  const earnLabel = 'SIGMA'
  let farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const formats = [
    { value: 1e3, symbol: "K" } , 
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" },
  ];
  let formatted = farmAPY;
  formats.forEach(format => {
    if(farm.apy.times(new BigNumber(100).toNumber()).gt(format.value)){
      formatted = farm.apy && farm.apy.times(new BigNumber(100)).div(format.value).toNumber().toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      const parts = formatted.match(/([\D]*)([\d.,]+)([\D]*)/)
      formatted=`${parts[1]}${parts[2]} ${format.symbol}${parts[3]}`
    }
  });

  farmAPY = formatted;


  
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk, lpSymbol } = farm
  return (
    <FCard>
      {farm.tokenSymbol === 'SIGMA' && <StyledCardAccent />}
      {farm.risk === 999 && <StyledCardAccentSpecial />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier='Auto'
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      <Flex justifyContent='space-between' alignItems='center'>
        <Text>APY:</Text>
        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
          {farm.apy ? (
            <>
              <ApyButton
                lpLabel={lpLabel}
                quoteTokenAdresses={quoteTokenAdresses}
                quoteTokenSymbol={quoteTokenSymbol}
                tokenAddresses={tokenAddresses}
                cakePrice={cakePrice}
                apy={farm.apy}
                pid={farm.pid}
              />
              {farmAPY}%
            </>
          ) : (
            <Skeleton height={24} width={80} />
          )}
        </Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text style={{ fontSize: '24px' }}>{TranslateString(10001, 'Deposit Fee')}:</Text>
        <Text bold style={{ fontSize: '24px' }}>{(farm.depositFeeBP / 100)}%</Text>
      </Flex>
      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} totalValue={totalValue} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly ?
              `https://polygonscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://polygonscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
          pid={farm.pid}
          exchange={farm.exchange}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default VaultCard
