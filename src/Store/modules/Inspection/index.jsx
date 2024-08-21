import { createSlice } from "@reduxjs/toolkit";
const InspectionStore=createSlice({
  name:"inspection",
  initialState:{
    proche:10,
    reunion:2,
    sortie:12,
  },
  reducers:{
    setProche(state,action){
      state.proche=action.payload;
    },
    setSortie(state,action){
      state.sortie=action.payload;
    },
    setReunion(state,action){
      state.reunion=action.payload;
    },
  }
})
const {setProche,setSortie,setReunion}=InspectionStore.actions
export{setProche,setSortie,setReunion}
const reducer=InspectionStore.reducer
export default reducer