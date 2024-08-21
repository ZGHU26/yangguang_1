// RainStore.js
import { createSlice } from '@reduxjs/toolkit';

const rainSlice = createSlice({
  name: 'rain',
  initialState: {
    isRaining: false,
  },
  reducers: {
    setIsRaining: (state, action) => {
      state.isRaining = action.payload;
    },
  },
});

export const { setIsRaining } = rainSlice.actions;
export default rainSlice.reducer;
