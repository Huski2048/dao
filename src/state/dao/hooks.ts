import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useWeb3React } from '@web3-react/core'
import { daoConfig } from 'config/constants'
import useRefresh from 'hooks/useRefresh'
import { fetchDaoPublicDataAsync, fetchDaoUserDataAsync, nonArchivedFarms } from '.'
import { State, DaoState } from '../types'


export const usePoolDaoPublicData = (includeArchive = true) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const farmsToFetch = includeArchive ? daoConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchDaoPublicDataAsync(pids))
  }, [includeArchive, dispatch, slowRefresh])
}

export const usePoolDaoWithUserData = (includeArchive = true) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()

  useEffect(() => {
    const farmsToFetch = includeArchive ? daoConfig : nonArchivedFarms
    const pids = farmsToFetch.map((farmToFetch) => farmToFetch.pid)

    dispatch(fetchDaoPublicDataAsync(pids))

    if (account) {
      dispatch(fetchDaoUserDataAsync({ account, pids }))
    }
  }, [includeArchive, dispatch, slowRefresh, account])
}

export const usePoolCoreDaoPublicData = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    dispatch(fetchDaoPublicDataAsync([251, 252]))
  }, [dispatch, fastRefresh])
}

export const useDaos = (): DaoState => {
  const farms = useSelector((state: State) => state.dao)
  return farms
}

