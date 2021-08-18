import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import useToast from 'hooks/useToast'
import { updateUserAllowance, fetchFarmUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
import { useMasterchef, useCake, useSousChef, useLottery, useVault } from './useContract'

// Approve a Farm
export const useApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const masterChefContract = useMasterchef()
  const { toastError, toastSuccess } = useToast()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      dispatch(fetchFarmUserDataAsync(account))
      toastSuccess("Success", `Got approval!`);
      return tx
    } catch (e) {
      toastError("An error occurred.", `Did not get approval, please try again`);
      return false
    }
  }, [account, dispatch, lpContract, masterChefContract, toastError, toastSuccess])

  return { onApprove: handleApprove }
}

// Approve a AutoPool
export const useAutoApprove = (lpContract: Contract) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const vaultContrat = useVault()
  const { toastError, toastSuccess } = useToast()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, vaultContrat, account)
      dispatch(fetchFarmUserDataAsync(account))
      toastSuccess("Success", `Got approval!`);
      return tx
    } catch (e) {
      toastError("An error occurred.", `Did not get approval, please try again`);
      return false
    }
  }, [account, dispatch, lpContract, vaultContrat, toastError, toastSuccess])

  return { onApprove: handleApprove }
}

// Approve a Pool
export const useSousApprove = (lpContract: Contract, sousId) => {
  const dispatch = useDispatch()
  const { account }: { account: string } = useWallet()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, sousChefContract, account)
      dispatch(updateUserAllowance(sousId, account))
      return tx
    } catch (e) {
      return false
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId])

  return { onApprove: handleApprove }
}

// Approve the lottery
export const useLotteryApprove = () => {
  const { account }: { account: string } = useWallet()
  const cakeContract = useCake()
  const lotteryContract = useLottery()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cakeContract, lotteryContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cakeContract, lotteryContract])

  return { onApprove: handleApprove }
}

// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

export const usePreSaleApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWallet()
  const onApprove = useCallback(async () => {
    try {
      const tx = await tokenContract.methods
        .approve(spenderAddress, ethers.constants.MaxUint256)
        .send({ from: account })
      return tx
    } catch {
      return false
    }
  }, [account, spenderAddress, tokenContract])

  return onApprove
}

