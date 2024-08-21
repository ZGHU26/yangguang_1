import React from 'react'
import Circulaire2D from './Circulaire2D'
import Mycard from '../Mycard/Cart';
import CountUp from 'react-countup';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setProche,setReunion,setSortie} from '*/modules/Inspection';
function App(){
  const {proche,reunion,sortie}=useSelector((state)=>state.Inspection)
  const dispatch=useDispatch();
  return (<div className="frame-BcH-7" >
    <Mycard title1="视觉感知" title2="Inspection">
    <div className="frame-swX-2">
      <div className="frame-NMB-1">
        <div className="vec-rectangle-tSO-1"></div>
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
      </div>
      <div className="frame-nEe-2">
        <div className="frame-PzT-1">
          <div className="vec-rectangle-Rhk-1"></div>
          <div className="frame-QnL-2">
            <div className="vec-circular-Tka-1"></div>
            <div className="text-MWi-2">
              <div className="p-text-MWi-2"><span className="span-OZz-1 ">靠近阳光房</span></div>
            </div>
          </div>
          <div className="frame-PZM-3">
            <div className="frame-Xzz-1">
              <div className="text-bmZ-1">
                <div className="p-text-bmZ-1"><span className="span-OQn-1 "><CountUp end={proche}  style={{ fontSize: '1.2vw' }} duration={3} separator=','/>
                <span style={{ fontSize: '1vw' }}>人</span>
                </span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-PzT-1">
          <div className="vec-rectangle-STs-1"></div>
          <div className="frame-QnL-2">
            <div className="vec-circular-vCx-1"></div>
            <div className="text-MWi-2">
              <div className="p-text-MWi-2"><span className="span-pLf-1 ">会议区聚集</span></div>
            </div>
          </div>
          <div className="frame-PZM-3">
            <div className="frame-Xzz-1">
              <div className="text-Snf-1">
                <div className="p-text-Snf-1"><span className="span-bsR-1 "><CountUp end={reunion} duration={3} separator=',' style={{ fontSize: '1.2vw' }}/>
                <span style={{ fontSize: '1vw' }}>人</span>
                </span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-PzT-1">
          <div className="vec-rectangle-BfM-1"></div>
          <div className="frame-QnL-2">
            <div className="vec-circular-Iww-1"></div>
            <div className="text-MWi-2">
              <div className="p-text-MWi-2"><span className="span-JEB-1 ">离开阳光房</span></div>
            </div>
          </div>
          <div className="frame-PZM-3">
            <div className="frame-Xzz-1">
              <div className="text-LgY-1">
                <div className="p-text-LgY-1">
                  <span className="span-QiV-1 ">
                    <CountUp end={sortie} duration={3} separator=',' style={{ fontSize: '1.2vw' }}/>
                        <span style={{ fontSize: '1vw' }}>人</span>
                     
                
                    </span></div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      <Circulaire2D/>
    </div>
    </Mycard>
  </div>);
}

export default App;
