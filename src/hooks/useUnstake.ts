import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import useToast from 'hooks/useToast'

import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake, autounstake } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useVault } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const { toastError, toastSuccess } = useToast()

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      try {
      const txHash = await unstake(masterChefContract, pid, amount, account, decimals)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
      toastSuccess("Success","Unstaking transaction confirmed")
    } catch (e) {
      toastError("An error occurred.", `Transaction unsuccessful, please try again`);
    }
    },
    [account, dispatch, masterChefContract, pid, toastSuccess, toastError],
  )

  return { onUnstake: handleUnstake }
}

export const useAutoUnstake = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const vaultContract = useVault()
  const { toastError, toastSuccess } = useToast()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
      const txHash = await autounstake(vaultContract, amount, account, 18)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
      toastSuccess("Success","Unstaking transaction confirmed")
    } catch (e) {
      toastError("An error occurred.", `Transaction unsuccessful, please try again`);
    }
    },
    [account, dispatch, vaultContract, toastSuccess, toastError],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23]

export const useSousUnstake = (sousId) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const sousChefContract = useSousChef(sousId)
  const isOldSyrup = SYRUPIDS.includes(sousId)

  const handleUnstake = useCallback(
    async (amount: string) => {
      if (sousId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldSyrup) {
        const txHash = await sousEmegencyUnstake(sousChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(sousId, account))
      dispatch(updateUserBalance(sousId, account))
      dispatch(updateUserPendingReward(sousId, account))
    },
    [account, dispatch, isOldSyrup, masterChefContract, sousChefContract, sousId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
