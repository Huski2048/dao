import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import daoConfig from 'config/constants/dao'
import fetchDaos from './fetchDaos'
import fetchUserDaos from './fetchUserDaos'
import { DaoState, Dao } from '../types'

const noAccountDaoConfig = daoConfig.map((dao) => ({
  ...dao,
}))

const initialState: DaoState = { data: noAccountDaoConfig, loadArchivedData: false, userDataLoaded: false }
export const nonArchivedFarms = daoConfig // .filter(({ pid }) => !isArchivedPid(pid))
// Async thunks
export const fetchDaoPublicDataAsync =
  createAsyncThunk<Dao[], number[]>(
    'dao/fetchDaoPublicDataAsync',
    async (pids) => {
      const daoToFetch = daoConfig.filter((daoCon) => pids.includes(daoCon.pid))
      const daos = await fetchDaos(daoToFetch)
      return daos
    }
  ,
  )

export const fetchDaoUserDataAsync =
  createAsyncThunk<Dao[], { account: string; pids: number[] }>(
    'dao/fetchDaoUserDataAsync',
    async ({ account, pids }) => {
      const daoToFetch = daoConfig.filter((daoCon) => pids.includes(daoCon.pid))
      const userDaos = await fetchUserDaos(account, daoToFetch)
      return userDaos

    }
  ,
  )

export const daoSlice = createSlice({
  name: 'dao',
  initialState,
  reducers: {
    setLoadArchivedFarmsData: (state, action) => {
      const loadArchivedData = action.payload
      state.loadArchivedData = loadArchivedData
    },
  },
  extraReducers: (builder) => {
    // Update daos with live data
    builder.addCase(fetchDaoPublicDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((dao) => {
        const liveData = action.payload.find((daoData) => daoData.pid === dao.pid)
        return { ...dao, ...liveData }
      })
    })

    // Update daos with user data
    builder.addCase(fetchDaoUserDataAsync.fulfilled, (state, action) => {
      state.data = state.data.map((dao) => {
        const userData = action.payload.find((daoData) => daoData.pid === dao.pid)
        return { ...dao, ...userData }
      })
    })

  },
})

// Actions
export const { setLoadArchivedFarmsData } = daoSlice.actions

export default daoSlice.reducer
