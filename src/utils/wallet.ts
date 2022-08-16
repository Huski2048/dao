/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  const provider = window.ethereum
  if (provider) {
    const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      })

      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the ETH network on metamask")
    return false
  }
}
