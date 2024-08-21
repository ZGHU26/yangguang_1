import React from 'react'
import Lineaire from './Lineaire'
import Mycard from '../Mycard/Cart';

import CountUp from 'react-countup';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import {setTotalDuration,setRegulationCount,setStorageCount,setMaintenanceCount} from '*/modules/MicroGridStore'
function App (){
  const dispatch=useDispatch();


  const {totalDuration,regulationCount,storageCount,maintenanceCount} = useSelector((state) => state.microGrid);
  //region 改变数据
  // useEffect(()=>{
  //   dispatch(setTotalDuration());
  //   dispatch(setRegulationCount());
  //   dispatch(setStorageCount());
  //   dispatch(setMaintenanceCount());
  // },[dispatch]);
  //endregion

  

  return (
    <div className="frame-sKE-3">
      
      <Mycard title1 = '微电网' title2='Micro Grids' > 
        <div className="frame-vUE-1">
          <div className="vec-rectangle-gSw-1"></div>
          <div className="frame-sLU-2">
            <div className="img-DJd-1"></div>
            <div className="frame-jKg-2">
              <div className="img-vvb-1"></div>
            </div>
            <div className="frame-ypS-3">
              <div className="img-yds-1"></div>
            </div>
          </div>
          <div className="img-zaC-3"></div>
          <div className="img-TLA-4"></div>
          <Lineaire/>
          <div className='YAN'>
          <div className="vec-rectangle-dcE-2"></div>
          <div className="vec-rectangle-KuR-4"></div>
          <div className="vec-rectangle-ITo-6"></div>
          <div className="frame-eCC-2">
          <div className="frame-qsD-1">
            <div className="text-ykz-1">
              <div className="p-text-ykz-1"><span className="span-CYq-1 "><CountUp end={totalDuration} suffix="H"duration={3} separator=','/></span></div>
            </div>
            <div className="text-vXn-2">
              <div className="p-text-vXn-2"><span className="span-HvL-1 ">总时长</span></div>
            </div>
          </div>
        
          <div className="frame-qsD-1">
            <div className="text-MfG-1">
              <div className="p-text-MfG-1"><span className="span-PmQ-1 "><CountUp end={regulationCount}suffix="次" duration={3} separator=','/></span></div>
            </div>
            <div className="text-JAH-2">
              <div className="p-text-JAH-2"><span className="span-AWJ-1 ">调控次数</span></div>
            </div>
          </div>
          <div className="frame-qsD-1">
            <div className="text-ykz-1">
              <div className="p-text-ykz-1"><span className="span-FRb-1 "><CountUp end={storageCount}suffix="次" duration={3} separator=','/></span>
              </div>
            </div>
            <div className="text-LOQ-2">
              <div className="p-text-LOQ-2"><span className="span-Nnk-1 ">储能次数</span></div>
            </div>
          </div>
         
          <div className="frame-qsD-1">
            <div className="text-MfG-1">
              <div className="p-text-MfG-1"><span className="span-EGF-1 "><CountUp end={maintenanceCount}suffix="次" duration={3} separator=','/></span>
              </div>
            </div>
            <div className="text-ksX-2">
              <div className="p-text-ksX-2"><span className="span-Pts-1 ">维护次数</span></div>
            </div>
          </div>
        </div>
        </div>  
        </div> 
        
        </Mycard>
     </div>
  );
}
export default App;