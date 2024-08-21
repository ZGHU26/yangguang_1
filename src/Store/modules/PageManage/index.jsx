import { createSlice } from "@reduxjs/toolkit";
const PageManageStore=createSlice({
  name:'PageManage',
  initialState:{
    pageopen:{
      '微电网':false,
      '光伏面板':false,
      '系统事件':false,
      "闪电匣智能网关":false,
      "机器人自动巡检":false,
      "视觉感知":false,
      "V2G站点":false,
    }
  },
  reducers:{

    setPageOpen(state,action){
      state.pageopen=action.payload;
    }
  }})
  const {setPageOpen}=PageManageStore.actions
  export {setPageOpen}
const reducer = PageManageStore.reducer
export default reducer
