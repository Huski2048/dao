import { DaoConfig } from 'config/constants/types'
import { Dao } from 'state/types'
import fetchPublicDaoData from './fetchPublicDaoData'

const fetchDao = async (dao: Dao): Promise<Dao> => {
  const daoPublicData = await fetchPublicDaoData(dao)

  return { ...dao, ...daoPublicData }
}

const fetchDaos = async (daoToFetch: DaoConfig[]) => {
  const data = await Promise.all(
    daoToFetch.map(async (daoConfig) => {
      const dao = await fetchDao(daoConfig)
      return dao
    }),
  )
  return data
}

export default fetchDaos
