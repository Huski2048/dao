import { DaoConfig } from 'config/constants/types'
import { Dao } from 'state/types'
import fetchPublicUserDaoData from './fetchPublicUserDaoData'

const fetchUserDao = async (account: string, dao: Dao): Promise<Dao> => {
    const daoPublicData = await fetchPublicUserDaoData(account, dao)

    return { ...dao, ...daoPublicData }
}

const fetchUserDaos = async (account: string, daoToFetch: DaoConfig[]) => {
    const data = await Promise.all(
        daoToFetch.map(async (daoConfig) => {
            const dao = await fetchUserDao(account, daoConfig)
            return dao
        }),
    )
    return data
}

export default fetchUserDaos
