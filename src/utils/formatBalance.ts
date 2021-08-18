import BigNumber from 'bignumber.js'

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  const displayBalance = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed()
}

export const getCorrectedNumber = (balance: number) => {
  const digits = balance > 0.001 ? 4 : 9
  
  return  balance < 1e-5 && balance > 0 
    ? balance.toExponential(2).split('e')[0].toLocaleString()
    : balance.toLocaleString(undefined, {maximumFractionDigits:  balance > 1 ? 2 : (digits)})
}