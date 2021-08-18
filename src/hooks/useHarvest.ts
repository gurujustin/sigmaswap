import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useToast from 'hooks/useToast'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, autoharvest } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useVault } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  const { toastError, toastSuccess } = useToast()

  const handleHarvest = useCallback(async () => {
    try{
      const txHash = await harvest(masterChefContract, farmPid, account)
      dispatch(fetchFarmUserDataAsync(account))
      toastSuccess("Success","Harvesting transaction confirmed")
      return txHash
  } catch (e) {
    toastError("An error occurred.", `Harvesting unsuccessful, please try again`);
    return false;
  }
  }, [account, dispatch, farmPid, masterChefContract, toastError, toastSuccess])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()
  
  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    dispatch(updateUserPendingReward(sousId, account))
    dispatch(updateUserBalance(sousId, account))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId])

  return { onReward: handleHarvest }
}


export const useAutoHarvest = () => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const vaultContract = useVault()

  const handleHarvest = useCallback(async () => {
    await autoharvest(vaultContract, account)
    // dispatch(updateUserPendingReward(sousId, account))
    // dispatch(updateUserBalance(sousId, account))
  }, [account, vaultContract])

  return { onReward: handleHarvest }
}
