import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, Flex, Text, ToastContainer, Heading } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { useFarmFromPid, useFarmUser, usePriceCakeBusd } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import { useAutoApprove } from 'hooks/useApprove'
import StakeAction from './StakeAction'
import HarvestAction from './HarvestAction'

const Action = styled.div`
  padding-top: 16px;
`
const ToastContainerSticky = styled(ToastContainer)`
  position:absolute
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
`
export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  totalValue?: BigNumber
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account, totalValue }) => {
  const TranslateString = useI18n()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  console.log(pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  console.log(allowance)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const cakePrice = usePriceCakeBusd()
  const lpContract = useMemo(() => {
    if (isTokenOnly) {
      return getContract(ethereum as provider, tokenAddress)
    }
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])



  
  const { onApprove } = useAutoApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])

  let usdStaked = stakedBalance

  if (totalValue) {
    usdStaked = usdStaked.times(new BigNumber(totalValue).div(farm.lpStakedTotal))
  }

  const profit = 0
  console.log(isApproved)
  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction
        isTokenOnly={isTokenOnly}
        stakedBalance={stakedBalance}
        tokenBalance={tokenBalance}
        tokenDecimals={farm.tokenDecimals}
        tokenName={lpName}
        pid={pid}
        depositFeeBP={depositFeeBP}
        usdStaked={usdStaked}
        quoteTokenDecimals={farm.quoteTokenDecimals}
      />
    ) : (
      <Button mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }

  return (
    <Action>
      <Flex justifyContent="space-between">
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          Recent SIGMA Profit:
        </Text>
        <Heading color={profit === 0 ? 'textDisabled' : 'text'}>{profit}</Heading>
      </Flex>
      <Flex justifyContent="space-between" mb="12px">
        <Text bold color="secondary" fontSize="13px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          0.1% unstaking fee if withdrawn within 72h
        </Text>
      </Flex>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {lpName}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" fullWidth /> : renderApprovalOrStakeButton()}
    </Action>
  )
}

export default CardActions
