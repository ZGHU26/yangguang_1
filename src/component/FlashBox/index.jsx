import React from 'react'
import Ballwater from './Ballwater'
import Histogramme2 from "./Histogramme2"
import Mycard from '../Mycard/Cart'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setPuissanceCalcul, setPuissanceRestante } from '*/modules/FlashBoxStore'
import CountUp from 'react-countup'

function App(){
  const dispatch = useDispatch();
  const { puissanceCalcul, puissanceRestante} = useSelector((state) => state.FlashBox
  );

  //#region 改变数值
  // useEffect(() => {
  //   dispatch(setPuissanceCalcul(10));
  //   dispatch(setPuissanceRestante(10));
  // }, [dispatch])
  //#endregion 
const testwidth='36vw'
  return (
    <div className="frame-XGQ-9">
      <Mycard  title1="闪电匣智能网关" title2="FlashBox Smart Gateway"  testwidth={testwidth} testradus='20px' >    
        <div className="frame-otZ-1">
          <div className="vec-rectangle-Efq-1"></div>
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
          <div className="img-zOj-4"></div>
        </div>
        <div className="frame-eNR-2">
          <div className="frame-yQk-1">
            <div className="vec-rectangle-cgg-1"></div>
            <div className="frame-lxJ-2">
              <div className="vec-circular-lcV-1"></div>
              <div className="text-vQQ-2">
                <div className="p-text-vQQ-2"><span className="span-WDJ-1 ">算力</span></div>
              </div>
            </div>
            <div className="frame-qWC-3">
              <div className="frame-xJg-1">
                <div className="text-tmQ-1">
                  <div className="p-text-tmQ-1"><span className="span-VPB-1 "><CountUp end={puissanceCalcul} style={{ fontSize: '1.1vw' }}duration={3}separator=','/>
                  <span style={{ fontSize: '0.8vw' }}>TOPS</span></span></div>
                </div>
            
              </div>
            </div>
          </div>
          <div className="frame-XNZ-2">
            <div className="vec-rectangle-cgg-1"></div>
            <div className="frame-lxJ-2">
              <div className="vec-circular-lcV-1"></div>
              <div className="text-NBg-2">
                <div className="text-NBg-2"><span className="span-oci-1 ">剩余算力</span></div>
              </div>
            </div>
            <div className="frame-qWC-3">
              <div className="frame-xJg-1">
                <div className="text-tmQ-1">
                  <div className="p-text-tmQ-1"><span className="span-nTb-1 "><CountUp end={puissanceRestante} style={{ fontSize: '1.1vw' }}duration={3} separator=","/>
                  <span style={{ fontSize: '0.8vw' }}>TOPS</span></span></div>
                </div>
              </div>
            </div>
          </div>
          <Ballwater />
          <Histogramme2 />
       
        </div>

      </Mycard>
     </div>
  );
}

export default App;