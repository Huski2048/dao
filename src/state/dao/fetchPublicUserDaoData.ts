import { getAddress } from 'utils/addressHelpers'
import { getBep20Contract, getConfigContract, getVaultContract } from 'utils/contractHelpers';
import BigNumber from 'bignumber.js'
import { Dao, SerializedBigNumber } from '../types'

type PublicDaoData = {
  code?: SerializedBigNumber
  allowance: string
  investorStatus: boolean
  invitees?: any
  investors?: any
}

const fetchUserDao = async (account: string, dao: Dao): Promise<PublicDaoData> => {
  const { vaultAddress, token, name, configAddress } = dao
  const vaultAddresses = getAddress(vaultAddress)

  let allowanceJson = '1'
  if (name === 'ETH') {
    allowanceJson = '1'
  } else {
    const baseTokenAddress = getAddress(token.address)
    const contract = getBep20Contract(baseTokenAddress)
    const allowance = await contract.allowance(account, vaultAddresses)
    allowanceJson = new BigNumber(allowance?._hex).toJSON()
  }

  const configAddresses = getAddress(configAddress)
  const config = getConfigContract(configAddresses);
  const getInvestorStatus = await config.getInvestorStatus(account);
  const vault = getVaultContract(vaultAddresses);
  const getCode = await vault.getCode(account);
  const getInvitees = await vault.getInvitees(account);
  const getInvestors = await vault.getInvestors();

  const invitees = []
  if (getInvitees !== []) {
    for (let i = 0; i < getInvitees.length; i++) {
      const inviteesObj = {
        inviterCode: '',
        amount: '',
        investor: '',
      }
      inviteesObj.inviterCode = getInvitees[i].inviterCode
      inviteesObj.amount = getInvitees[i].amount._hex
      inviteesObj.investor = getInvitees[i].investor

      invitees.push(inviteesObj)
    }
  }

  const investors = []
  if (getInvestors !== []) {
    for (let i = 0; i < getInvestors.length; i++) {
      const investorsObj = {
        inviterCode: '',
        amount: '',
        investor: '',
      }
      investorsObj.inviterCode = getInvestors[i].inviterCode
      investorsObj.amount = getInvestors[i].amount._hex
      investorsObj.investor = getInvestors[i].investor

      investors.push(investorsObj)
    }
  }

  return {
    code: getCode,
    allowance: allowanceJson,
    investorStatus: getInvestorStatus,
    invitees,
    investors,
  }
}

export default fetchUserDao
