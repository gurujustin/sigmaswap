import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import useToast from 'hooks/useToast'

import { stake, sousStake, sousStakeBnb, autostake } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useVault } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const { toastError, toastSuccess } = useToast()

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      try {
        const txHash = await stake(masterChefContract, pid, amount, account, decimals)
        dispatch(fetchFarmUserDataAsync(account))
        console.info(txHash)
        toastSuccess("Success","Staking transaction confirmed")
      } catch (e) {
        toastError("An error occurred.", `Transaction unsuccessful, please try again`);
      }
    },
    [account, dispatch, masterChefContract, pid, toastSuccess, toastError],
  )

  return { onStake: handleStake }
}

export const useAutoStake = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const vaultContract = useVault()
  const { toastError, toastSuccess } = useToast()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await autostake(vaultContract,  amount, account)
        dispatch(fetchFarmUserDataAsync(account))
        console.info(txHash)
        toastSuccess("Success","Staking transaction confirmed")
      } catch (e) {
        toastError("An error occurred.", `Transaction unsuccessful, please try again`);
      }
    },
    [account, dispatch, vaultContract,  toastSuccess, toastError],
  )

  return { onStake: handleStake }
}

export const useSousStake = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingBnb) {
        await sousStakeBnb(sousChefContract, amount, account)
      } else {
        await sousStake(sousChefContract, amount, account)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
    },
    [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId],
  )

  return { onStake: handleStake }
}

export default useStake
