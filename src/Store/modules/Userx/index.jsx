import { createSlice } from "@reduxjs/toolkit"
const userxStore = createSlice({
  name: 'Userx',
  initialState: {
    user_tmp:""},
    reducers: {
      setUserx(state, action) {
        state.userx = action.payload;
      },
    }})
    const {setUserx}= userxStore.actions
    export {setUserx}
    const reducer = userxStore.reducer
    export default reducer