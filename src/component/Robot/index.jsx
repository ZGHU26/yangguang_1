import React from 'react'
import Circulaire3D from './Circulaire3D'
import Mycard from '../Mycard/Cart';
import CountUp from 'react-countup';
import {setFini,setInacheve,setEnvironnement} from "*/modules/RobotStore";
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
function App() {
  const {fini,inacheve,environnement}=useSelector((state)=>state.Robot);
  const getEvaluation=(environnement)=>{
    if (environnement>0 && environnement<60){
      return"差劲";
    }else if (environnement>=60 &&environnement<80){
      return "良好"
    }else if (environnement>=80){
      return "优秀";
    }
    return"未知";
  }
  const evaluation = getEvaluation(environnement)
  const dispatch=useDispatch();
  //#region 改变环境评分
  useEffect(()=>{
    dispatch(setEnvironnement(80))
  })
  //#endregion
  return (
<div className="frame-Jyf-6">
  <Mycard title1 ="机器人自动巡检" title2="Robot automatic inspection">
        
        <div className="frame-JWj-2">
          <div className="frame-eRD-1">
            <div className="vec-rectangle-MZi-1"></div>
            <Circulaire3D/>
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
         
          <div className="frame-kTv-2">
            
            <div className="frame-VtA-3">
              <div className="frame-fqz-1">
                <div className="img-IOt-1"></div>
                <div className="img-EVP-2"></div>
              </div>
              <div className="frame-QbA-2">
                <div className="img-ace-1"></div>
                <div className="img-Hnr-2"></div>
              </div>
              <div className="frame-jxm-3">
                <div className="img-rod-1"></div>
                <div className="img-aFZ-2"></div>
              </div>
              <div className="frame-gRS-4">
                <div className="img-kyR-1"></div>
                <div className="img-WML-2"></div>
              </div>
            
            </div>
            
            <div className="frame-Gob-4">
              <div className="frame-ceV-1">
                <div className="img-QpD-1"></div>
                <div className="img-pdI-2"></div>
                <div className="img-alV-3"></div>
              </div>
              <div className="text-RZi-2">
                <div className="p-text-RZi-2"><span className="span-zrr-1 ">校园巡查路线</span></div>
              </div>
            </div>
            <div className="frame-lKK-5">
              <div className="text-Ubp-1">
                <div className="p-text-Ubp-1"><span className="span-Ebo-1 ">线路总数</span></div>
              </div>
              <div className="text-KxX-2">
                <div className="p-text-KxX-2"><span className="span-VFt-1 "><CountUp end={fini+inacheve} style={{ fontSize: '1.2vw' }}duration={3} separator=','/>
                <span style={{ fontSize: '1vw' }}>条</span></span></div>
              </div>
            </div>
          </div>
          <div className="img-HAC-3"></div>
          <div className='kuang'>
          <div className="frame-Idk-5">
            <div className="frame-LQJ-1">
              <div className="vec-circular-ZGO-1"></div>
              <div className="img-Nyz-2"></div>
              <div className="frame-KtO-3">
                <div className="img-saE-1"></div>
              </div>
            </div>
            <div className="frame-abZ-2">
              <div className="img-fPC-1"></div>
              <div className="vec-circular-VPd-2"></div>
            </div>
            <div className="frame-RWG-3">
              <div className="img-XTV-1"></div>
              <div className="vec-circular-Okv-2"></div>
            </div>
          </div>
          <div className="frame-sev-6">
          <div className="frame-JIh-4">
            <div className="frame-srl-1">
              <div className="img-hwa-1"></div>
              <div className="img-ykk-2"></div>
              <div className="img-HGL-3"></div>
            </div>
            <div className="text-fgJ-2">
              <div className="p-text-fgJ-2"><span className="span-oQr-1 ">校园环境</span></div>
            </div>
          </div>
            <div className="frame-nrY-1">
              <div className="img-XHL-1"></div>
              <div className="img-tUL-2"></div>
              <div className="frame-rwW-3">
                <div className="img-ULc-1"></div>
                <div className="img-UUL-2"></div>
              </div>
              <div className="img-PYs-4"></div>
              <div className="img-fSr-5"></div>
              <div className="img-qZN-6"></div>
              <div className="img-fVz-7"></div>
              <div className="img-czv-8"></div>
              <div className="img-LpJ-9"></div>
              <div className="img-Kjr-10"></div>
              <div className="img-cag-11"></div>
              <div className="img-Umt-12"></div>
            </div>
            <div className="frame-GSU-2">
              <div className="frame-Wgb-1">
                <div className="text-BiT-1"><span>年用水总量</span></div>
                <div className="frame-PCz-2">
                  <div className="text-GHa-1">
                    <div className="p-text-GHa-1"><span className="span-JMu-1 "><CountUp end= {environnement} style={{ fontSize: '0.9vw' }}duration={3}separator=','/>
                    <span style={{ fontSize: '0.7vw' }}>立方米</span></span></div>
                  </div>
                  
                </div>
              </div>
              <div className="frame-PLn-3">
              <div className="text-BiT-1"><span>环境评分</span></div>
                <div className="text-Zlf-2">
                  <div className="p-text-Zlf-2"><span className="span-Ezd-1 ">{evaluation}</span></div>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </Mycard>
      </div>);
}
export default App;