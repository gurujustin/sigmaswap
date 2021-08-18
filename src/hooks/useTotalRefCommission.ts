import { useEffect, useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getReferralAddress } from 'utils/addressHelpers'
import { getContract } from 'utils/web3'
import referralABI from 'config/abi/referral.json'
import useRefresh from './useRefresh'

const useTotalRefCommission = () => {
    const [commission, setCommission] = useState()
    const { account }: { account: string } = useWallet()
    const { slowRefresh } = useRefresh()

    useEffect(() => {
        async function fetchTotalRef() {
            const refContract = getContract(referralABI, getReferralAddress())
            const totalCommissions = await refContract.methods.totalReferralCommissions(account).call()
            setCommission(totalCommissions)
        }
        fetchTotalRef()
    }, [account, slowRefresh])

    return commission
}

export default useTotalRefCommission