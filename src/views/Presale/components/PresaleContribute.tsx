import React, { useState, useEffect } from 'react'
import { useModal, Button, Heading, Card, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { IfoStatus } from 'config/constants/types'
import UnlockButton from 'components/UnlockButton'
import { usePreSaleApprove } from 'hooks/useApprove'
import { usePreSaleAllowance } from 'hooks/useAllowance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CardValue from 'views/Home/components/CardValue'
import Spacer from 'components/Spacer'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

const StyledPreSaleCard = styled(Card)`
  padding: 32px 16px 16px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
  border-radius: 16px;
  margin-top: 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 32px 16px 16px;
    margin-left: auto;
    margin-right: auto;
    max-width: 437px;
    width: 100%;
    border-radius: 16px;
  }
`
const Row = styled.div`
  display: block;
  padding-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    padding-top: 24px;
  }
`
const RowItem = styled.div`
  display: flex;
  padding-top: 16px;
  
`

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status?: IfoStatus
  raisingAmount?: BigNumber
  tokenDecimals: number
}

const PresaleContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [claimTokenBalance, setClaimTokenBalance] = useState(new BigNumber(0))
  const [claimed, setClaimed] = useState(false)
  const [amount, setAmount] = useState(new BigNumber(0))
  const [isActive, setActive] = useState(true)
  const { account } = useWallet()
  const [total, setTotal] = useState(new BigNumber(0))
  const [unclaimToken, setUnclaimToken] = useState(new BigNumber(0))
  const [ownToken, setOwnToken] = useState(new BigNumber(0))
  const [totalSoldToken, setTotalSoldToken] = useState(new BigNumber(0))
  const [leftToken, setLeftToken] = useState(new BigNumber(0))
  const contractRaisingToken = useERC20(currencyAddress)
  console.log("_debug", contractRaisingToken)
  const allowance = usePreSaleAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = usePreSaleApprove(contractRaisingToken, address)
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  const TranslateString = useI18n()

  useEffect(() => {
    const fetch = async () => {
      const balance = new BigNumber(await contract.methods.getTokensUnclaimed().call())
      const _claimed = await contract.methods.claimActive().call()
      const _amount = await contract.methods.getTokensOwned().call()
      const _active = await contract.methods.saleActive().call()
      const _leftToken = await contract.methods.getSIGMATokensLeft().call()
      const _unclaimToken = await contract.methods.getTokensUnclaimed().call()
      const _ownToken = await contract.methods.getTokensOwned().call()
      const _totalSoldToken = await contract.methods.getTotalTokensSold().call()
      const _total = _totalSoldToken + _leftToken

      setClaimed(_claimed)
      setClaimTokenBalance(balance)
      setAmount(_amount)
      setActive(_active)
      setLeftToken(_leftToken)
      setUnclaimToken(_unclaimToken)
      setOwnToken(_ownToken)
      setTotalSoldToken(_totalSoldToken)
      setTotal(_total)
    }

    if (account) {
      fetch()
    }
  }, [account, contract.methods, pendingTx])

  // if (allowance === null) {
  //   return null
  // }

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.claimTokens( account ).call()
    setPendingTx(false)
  }
  const isFinished = false;
  console.log("_debug" ,isActive)

  return (
    <>
    {!isActive && <Heading size="lg" style={{textAlign:'center'}}>PreSale is not active</Heading>}
    <Row>
      
      <StyledPreSaleCard >
        <Heading size="lg" mb="24px" style={{textAlign:'center'}}>Buy </Heading>
        {account && (allowance <= 0) && <Button
          fullWidth
          disabled={pendingTx || isFinished}
          onClick={async () => {
            try {
              setPendingTx(true)
              await onApprove()
              setPendingTx(false)
            } catch (e) {
              setPendingTx(false)
              console.error(e)
            }
          }}
        >
          Approve
        </Button>}
      {!account && <UnlockButton fullWidth />}
        {account && (allowance > 0) && (
        <LabelButton
          disabled={(pendingTx || claimed) || !(isActive || isFinished)}
          buttonLabel='Contribute'
          label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            isFinished
              ? claimed
                ? 'Claimed'
                : getBalanceNumber(claimTokenBalance, tokenDecimals).toFixed(4)
              : getBalanceNumber(new BigNumber(amount)).toFixed(4)
          }
          onClick={onPresentContributeModal}
        />
        )}
       
      </StyledPreSaleCard>
      <Spacer size='sm'/>
      <StyledPreSaleCard >
        <Heading size="lg" mb="24px" style={{textAlign:'center'}}>Claim </Heading>
        
      {!account && <UnlockButton fullWidth />}
        {account && (
        <LabelButton
          disabled={pendingTx || claimed || (claimTokenBalance <= new BigNumber(0)) || (allowance <= 0) || !(isActive || isFinished)}
          buttonLabel='Claim'
          label='Your tokens to claim (Sigma)'
          value={
            // eslint-disable-next-line no-nested-ternary
            isFinished
              ? claimed
                ? 'Claimed'
                : getBalanceNumber(claimTokenBalance, tokenDecimals).toFixed(4)
              : getBalanceNumber(new BigNumber(amount)).toFixed(4)
          }
          onClick={claim}
        />
        )}
       
      </StyledPreSaleCard>

    </Row>
    <Row>
      <StyledPreSaleCard>
        <Heading size="lg" mb="24px" style={{textAlign:'center'}}>Info </Heading>
        <hr/>
        <RowItem>
          <Text mr='16px'>Purchased Sigma:</Text>
          <CardValue value={getBalanceNumber(ownToken, 6)} decimals={0} fontSize='16px' />
        </RowItem>
        <RowItem>
          <Text mr='16px'>Unclaimed Sigma:</Text>
          <CardValue value={getBalanceNumber(unclaimToken, 6)} decimals={0} fontSize='16px' />
        </RowItem>
        <hr />
        <RowItem>
          <Text mr='16px'>Total Sigma:</Text>
          <CardValue value={getBalanceNumber(total, 6)} decimals={0} fontSize='16px' />
        </RowItem>
        <RowItem>
          <Text mr='16px'>Total Sigma Sold:</Text>
          <CardValue value={getBalanceNumber(totalSoldToken, 6)} decimals={0} fontSize='16px' />
        </RowItem>
        <hr />
        <RowItem>
          <Text mr='16px' color="warning">Sigma Left:</Text>
          <CardValue value={getBalanceNumber(leftToken, 6)} decimals={0} fontSize='18px' />
        </RowItem>
      </StyledPreSaleCard>
      <Spacer size='sm'/>
      <StyledPreSaleCard>
        <Heading size="lg" mb="24px" style={{textAlign:'center'}}>PreSale  </Heading>
        <RowItem>
          <Text fontSize='18px' mr='16px'>- Sigma Presale Price: </Text>
          <CardValue fontSize='18px' value={0.1} decimals={1} prefix='$'/>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px'>- Sigma Postsale Price: </Text>
          <CardValue fontSize='18px' value={0.3} decimals={1} prefix='$'/>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px'>- Earn 40% on Presale!!</Text>
        </RowItem>
        <RowItem>
          <Text fontSize='18px' mr='16px'>- Unsold Supply will be burned!</Text>
        </RowItem>
      </StyledPreSaleCard>
    </Row>
    </>
  )
}

export default PresaleContribute
