import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getVaultContract,
} from 'utils/contractHelpers'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import ERC20_ABI from '../config/abi/erc20.json'
import { getContract } from '../utils'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBep20Contract(address, library.getSigner()), [address, library])
}

export const useVault = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getVaultContract(address, library.getSigner()), [address, library])
}

// returns null on errors
function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}


