import { createSlice } from "@reduxjs/toolkit";
const RobotStor = createSlice({
  name:"Robot",
  initialState:{
    inacheve:8,
    fini:15,
    environnement:82,
    evaluer:"优秀"
  },
  reducers:{
    setInacheve(state,action){
      state.inacheve=action.payload;
    },
    setFini(state,action){
      state.fini=action.payload;
    },
    setEnvironnement(state,action){
      state.environnement=action.payload
    },
    setEvaluer(state,action){
      state.evaluer=action.payload
    },
  }
})
const {setInacheve,setFini,setEnvironnement,setEvaluer}=RobotStor.actions
export{setInacheve,setFini,setEnvironnement,setEvaluer}
const reducer = RobotStor.reducer
export default reducer