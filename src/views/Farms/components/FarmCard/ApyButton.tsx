import React from 'react'
import BigNumber from 'bignumber.js'
import { CalculateIcon, IconButton, useModal } from '@pancakeswap-libs/uikit'
import { Address } from 'config/constants/types'
import ApyCalculatorModal from './ApyCalculatorModal'

export interface ApyButtonProps {
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  pid: number
}

const ApyButton: React.FC<ApyButtonProps> = ({
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  cakePrice,
  apy,
  pid
}) => {
  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      lpLabel={lpLabel}
      quoteTokenAdresses={quoteTokenAdresses}
      quoteTokenSymbol={quoteTokenSymbol}
      tokenAddresses={tokenAddresses}
      cakePrice={cakePrice}
      apy={apy}
      pid={pid}
    />,
  )

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  )
}

export default ApyButton
