import { createSlice } from "@reduxjs/toolkit";
const FlashBoxStore=createSlice({
  name:'FlashBox',
  initialState:{
    puissanceCalcul:22.5,
    puissanceRestante:127.5,
  },
  reducers:{
    setPuissanceCalcul(state,action){
      state.puissanceCalcul=action.payload;
    },
    setPuissanceRestante(state,action){
      state.puissanceRestante=action.payload;
    },
  }})
  const {setPuissanceCalcul,setPuissanceRestante}=FlashBoxStore.actions
  export {setPuissanceCalcul,setPuissanceRestante}
const reducer = FlashBoxStore.reducer
export default reducer
