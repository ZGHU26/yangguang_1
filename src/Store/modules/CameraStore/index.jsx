import {createSlice} from "@reduxjs/toolkit"

const CameraStore = createSlice({
  name:'camera',
  initialState:{
    interval: undefined, // 是否正在旋转地图
    angle : 120,
    viewState:{
      longitude: 113.974171 - 0.00196,
      latitude: 22.594238 + 0.00195,
      zoom: 18,
      minZoom: 13,
      maxZoom: 30,
      bearing: 180,
      pitch: 60
    }
  },
  reducers: {
 setIntervalState(state,action){
state.interval=action.payload;
 },
 setViewState(state,action){
  state.viewState=action.payload
 },
 setAngle(state,action){
  state.angle=action.payload
 }
    },
  },
);
export const {setIntervalState,setViewState,setAngle} = CameraStore.actions;

const reducer = CameraStore.reducer;
export default reducer