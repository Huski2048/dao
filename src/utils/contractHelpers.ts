import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'
// ABI
import bep20Abi from 'config/abi/erc20.json'
import VaultABI from 'config/abi/PublicOffering.json'
import ConfigABI from 'config/abi/PublicOfferingConfig.json'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}

export const getVaultContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(VaultABI, address, signer)
}

export const getConfigContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ConfigABI, address, signer)
}