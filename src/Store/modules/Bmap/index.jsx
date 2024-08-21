import { createSlice } from "@reduxjs/toolkit"
const bmapStore = createSlice({
  name: 'BMap',
  initialState: {
    mapx: 'mapbox://styles/mapbox/streets-v11',},
    reducers: {
      setMapX(state, action) {
        state.mapx = action.payload;
      },
    }})
    const {setMapX}= bmapStore.actions
    export {setMapX}
    const reducer = bmapStore.reducer
    export default reducer