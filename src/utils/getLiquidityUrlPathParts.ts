// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
// In the URL, using the quote token 'BNB' is represented by 'ETH'
const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, pid }) => {
  const chainId = process.env.REACT_APP_CHAIN_ID
  const firstPart = quoteTokenSymbol === 'BNB' ? 'ETH' : quoteTokenAdresses[chainId]
  const secondPart = tokenAddresses[chainId]

  if(pid === 4){
    // SIGMA-WETH
    return `0x72572CCf5208b59f4BcC14e6653d8c31Cd1fC5a0/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619`
  }
  if(pid === 12){
    // SIGMA-ROUTE
    return `0x72572CCf5208b59f4BcC14e6653d8c31Cd1fC5a0/0x16eccfdbb4ee1a85a33f3a9b21175cd7ae753db4`
  }
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
