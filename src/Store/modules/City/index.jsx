import { createSlice } from "@reduxjs/toolkit";
const CityStore=createSlice({
  name:'city',
  initialState:{
    cityname:'shenzhen'
  },
  reducers:{
    setCityname(state,action){
      state.cityname=action.payload;
    },
  
  }})
  const {setCityname}=CityStore.actions
  export {setCityname}
const reducer = CityStore.reducer
export default reducer
