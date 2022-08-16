import { getAddress } from 'utils/addressHelpers'
import { getVaultContract, getConfigContract } from 'utils/contractHelpers';
import { Dao, SerializedBigNumber } from '../types'

type PublicDaoData = {
  price: string
  roundID: string
  startedAt: string
  timeStamp: string
  answeredInRound: string
  raiseFund: SerializedBigNumber
}

const fetchDao = async (dao: Dao): Promise<PublicDaoData> => {
  const { vaultAddress, configAddress } = dao
  const vaultAddresses = getAddress(vaultAddress)
  const configAddresses = getAddress(configAddress)
  const vault = getVaultContract(vaultAddresses);
  const getPrice = await vault.getPrice();

  const config = getConfigContract(configAddresses);
  const getConfig = await config.getConfig();

  return {
    price: getPrice[0]._hex,
    roundID: getPrice[1]._hex,
    startedAt: getPrice[2]._hex,
    timeStamp: getPrice[3]._hex,
    answeredInRound: getPrice[4]._hex,
    raiseFund: getConfig[3]._hex,
  }
}

export default fetchDao
