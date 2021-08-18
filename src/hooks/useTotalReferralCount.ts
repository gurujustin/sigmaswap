import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getReferralAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import referralABI from 'config/abi/referral.json'
import useRefresh from './useRefresh'

const useTotalReferralCount = () => {
    const [count, setCount] = useState()
    const { account }: { account: string } = useWallet()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(referralABI, getReferralAddress())
            const total = await refContract.methods.referralsCount(account).call()
            setCount(total)
        }
        fetchTotalRef()
    }, [account, slowRefresh])

    return count
}

export default useTotalReferralCount