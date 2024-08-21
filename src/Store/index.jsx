import microGridReducer from './modules/MicroGridStore'
import {configureStore} from '@reduxjs/toolkit' 
import PVReducer from "./modules/PVStore"
import FlashBoxReducer from './modules/FlashBoxStore'
import RobotReducer from "./modules/RobotStore"
import InspectionReducer from './modules/Inspection'
import PageManageReducer from './modules/PageManage'
import CameraReducer from './modules/CameraStore'
import Bmap from './modules/Bmap'
import Userx from "./modules/Userx"
import RainReducer from './modules/RainStore'
import WeatherReducer from './modules/Weather'
const store = configureStore({
  reducer:{
    microGrid:microGridReducer,
    PV:PVReducer,
    FlashBox:FlashBoxReducer,
    Robot:RobotReducer,
    Inspection:InspectionReducer,
    PageManage:PageManageReducer,
    Camera:CameraReducer,
    Bmap: Bmap,
    Userx:Userx,
    Rain:RainReducer,
    Weather:WeatherReducer,

  }
})
export default store