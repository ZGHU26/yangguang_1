import { createSlice } from "@reduxjs/toolkit";
const PVStore = createSlice({
name:"PV",
initialState:{
superficieTotal:52,
puissanceTotal:6000,
composantTotal:25,
temperature:52,
humidite:67,
deteriorationTaux:6,
propre:'良好',
rayonUltraViolet:3,
etatCommunication:"优",
},
reducers:{
  setSuperficieTotal(state,action){
    state.superficieTotal=action.payload;
  },
  setPuissanceTotal(state,action){
    state.puissanceTotal=action.payload;
  },
  setComposantTotal(state,action){
    state.composantTotal=action.payload;
  },
  setTemperature(state,action){
    state.temperature=action.payload;
  },
  setHumidite(state,action){
    state.humidite=action.payload;
  },
  setPropre(state,action){
    state.propre=action.payload;
  },
  setRayonUltraViolet(state,action){
    state.rayonUltraViolet=action.payload;
  }, 
  setEtatCommunication(state,action){
    state.etatCommunication=action.payload;
  },
  setDeteriorationTaux(state,action){
    state.deteriorationTaux=action.payload;
  },

}
})
const {setSuperficieTotal,setPuissanceTotal,setComposantTotal,setTemperature,setHumidite,setDeteriorationTaux,setPropre,setRayonUltraViolet,setEtatCommunication}= PVStore.actions
export {setSuperficieTotal,setPuissanceTotal,setComposantTotal,setTemperature,setHumidite,setDeteriorationTaux,setPropre,setRayonUltraViolet,setEtatCommunication}
const reducer = PVStore.reducer
export default reducer