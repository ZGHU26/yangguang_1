// weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    showWeather: false,
  },
  reducers: {
    setShowWeather(state, action) {
      state.showWeather = action.payload;
    },
  },
});

export const { setShowWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
