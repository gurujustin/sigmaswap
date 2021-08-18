import React from 'react'
import styled from 'styled-components'
import { Button } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import {BigNumber} from "bignumber.js"
import Input, { InputProps } from './Input'

interface Props extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
}

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

const BalanceInput: React.FC<Props> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const TranslateString = useI18n()
  let useMax = max;
  if(symbol==='USDT'||symbol==='USDC'){
    useMax=  new BigNumber(max).multipliedBy("1000000000000").toString();
  } 
  else if(symbol==='WBTC'){
    useMax=  new BigNumber(max).multipliedBy("10000000000").toString();
  } 
  return (
    <div>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      <StyledMaxText>{TranslateString(454, `${useMax.toLocaleString()} ${symbol} Available`)}</StyledMaxText>
    </div>
  )
}

export default BalanceInput
