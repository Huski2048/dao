import { useSelector } from 'react-redux'
import { State } from '../types'

export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

