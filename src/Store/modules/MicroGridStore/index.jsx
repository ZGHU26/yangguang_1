//编写store
import {createSlice } from "@reduxjs/toolkit"
const microGridStore = createSlice({
  name: 'microGrid',
  initialState: {
  totalDuration: 880,
    regulationCount: 1428,
    storageCount: 0,
    maintenanceCount: 2,
  },
  reducers: {
    setTotalDuration(state, action) {
      state.totalDuration = action.payload;
    },
    setRegulationCount: (state, action) => {
      state.regulationCount = action.payload;
    },
    setStorageCount: (state, action) => {
      state.storageCount = action.payload;
    },
    setMaintenanceCount: (state, action) => {
      state.maintenanceCount = action.payload;
    },
  }})
const {setTotalDuration,setRegulationCount,setStorageCount,setMaintenanceCount,}=microGridStore.actions
export{setTotalDuration,setRegulationCount,setStorageCount,setMaintenanceCount}

const reducer = microGridStore.reducer
export default reducer