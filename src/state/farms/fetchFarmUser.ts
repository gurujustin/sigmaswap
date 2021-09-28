import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import farmsConfig from 'config/constants/farms'
import { getMasterChefAddress, getVaultAddress } from 'utils/addressHelpers'
import vaultABI from 'config/abi/vault.json'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchFarmUserAllowances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()
  const vaultAddress = getVaultAddress()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    if (farm.isVault) {
      return { address: lpContractAddress, name: 'allowance', params: [account, vaultAddress] }
    } 
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })
  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.isTokenOnly ? farm.tokenAddresses[CHAIN_ID] : farm.lpAddresses[CHAIN_ID]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)

  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()
  const vaultAddress = getVaultAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const vaultCalls = [
    {
      address: vaultAddress,
      name: 'userInfo',
      params: [account],
    },
    {
      address: vaultAddress,
      name: 'balanceOf',
    },
    {
      address: vaultAddress,
      name: 'totalShares',
    },
  ]
  const [vaultUserInfo, balanceOf, totalShares] = await multicall(vaultABI, vaultCalls)

  const parsedStakedBalances = rawStakedBalances.map((stakedBalance, index) => {
    if (index === 9) {
      return new BigNumber(vaultUserInfo[2]._hex).times(new BigNumber(balanceOf[0]._hex)).div(new BigNumber(totalShares[0]._hex)).toJSON()
    }
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string) => {
  const masterChefAdress = getMasterChefAddress()
  const vaultAddress = getVaultAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingCherry',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)

  const vaultCalls = [
    {
      address: vaultAddress,
      name: 'userInfo',
      params: [account],
    },
    {
      address: vaultAddress,
      name: 'calculateTotalpendingCherryRewards',
    },
    {
      address: vaultAddress,
      name: 'totalShares',
    },
  ]
  const [vaultUserInfo, pendingCherry, totalShares] = await multicall(vaultABI, vaultCalls)
  const parsedEarnings = rawEarnings.map((earnings, index) => {
    if (index === 9) {
      return new BigNumber(vaultUserInfo[2]._hex).times(new BigNumber(pendingCherry[0]._hex)).div(new BigNumber(totalShares[0]._hex)).toJSON()
    }
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
