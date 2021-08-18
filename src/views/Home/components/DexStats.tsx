import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

const StyledDexStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const DexStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let eggPerBlock = 0;
  if(farms && farms[0] && farms[0].eggPerBlock){
    eggPerBlock = new BigNumber(farms[0].eggPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledDexStats>
      <CardBody>
        <Heading mb="24px" style={{fontWeight:500, fontSize:'20px'}} >
          DEX Stats
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={0} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={0} decimals={0} />}
        </Row>
      </CardBody>
    </StyledDexStats>
  )
}

export default DexStats
