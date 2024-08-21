import React from 'react'
import Mycard from '../Mycard/Cart';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect} from 'react';
import CountUp from 'react-countup';
import {setSuperficieTotal,setPuissanceTotal,setComposantTotal,setTemperature,setHumidite,setDeteriorationTaux,setPropre,setRayonUltraViolet,setEtatCommunication} from '*/modules/PVStore'

function App() {
  const dispatch=useDispatch();
  const{superficieTotal,puissanceTotal,composantTotal,temperature,humidite,deteriorationTaux,propre,rayonUltraViolet: uvIndex,etatCommunication}=useSelector((state)=>state.PV);
  const getRayonUltraViolet = (uvIndex)=>{
    if (uvIndex>=0 && uvIndex<=2){
      return"弱";
    }else if(uvIndex>=3 && uvIndex<=5){
      return"中等";
    }else if (uvIndex>5){
      return "强";
    }
    return"未知";
  };
  const rayonUltraViolet=getRayonUltraViolet(uvIndex);
  //#region 改变数据
  useEffect(()=>{
    dispatch(setSuperficieTotal(100));
    dispatch(setPuissanceTotal(100));
    dispatch(setComposantTotal(100));
    dispatch(setTemperature(200));
    dispatch(setHumidite(100));
    dispatch(setDeteriorationTaux(100));
    dispatch(setPropre('良好'));
    dispatch(setRayonUltraViolet(100));
    dispatch(setEtatCommunication('优'));
  },[dispatch])
  //#endregion
  return (
    <div className="frame-mvI-4">
      <Mycard title1 = '光伏面板' title2='PV module'>
  
        <div className="frame-qLf-1">
          <div className="vec-rectangle-Yjp-1"></div>
          <div className="frame-xpI-2">

          <div className="frame-OrA-1">

            <div className="frame-LuU-1">
              <div className="img-cLO-1"></div>
              <div className="frame-VPT-10">
                <div className="img-DYM-1"></div>
              </div>
            </div>
            <div className="frame-xaX-2">
              <div className="text-KwG-1">
                <div className="p-text-KwG-1"><span className="span-JXa-1 ">总面积</span></div>
              </div>
              <div className="frame-EFT-2">
                <div className="text-xTa-1">
                  <div className="p-text-xTa-1"><span className="span-Dch-1 "><CountUp end={superficieTotal} suffix="m" duration={3} separator=","/></span></div>
                </div>
               
              </div>
            </div>
          </div>
          <div className="frame-AaU-2">
            <div className="frame-LuU-1">
              <div className="img-cLO-1"></div>
              <div className="frame-VPT-10">
              <div className="img-TWB-1 "></div>
              </div>
            </div>
            <div className="frame-xaX-2">
              <div className="text-KwG-1">
                <div className="p-text-KwG-1"><span className="span-gTJ-1 ">总功率</span></div>
              </div>
              <div className="frame-EFT-2">
                <div className="text-xTa-1">
                  <div className="p-text-xTa-1"><span className="span-TMy-1 "><CountUp end={puissanceTotal} suffix='瓦' duration={3} separator=','/></span></div>
                </div>
                <div className="frame-nCz-2">
                 
                </div>
              </div>
            </div>
          </div>
          <div className="frame-DWb-3">
            <div className="frame-LuU-1">
              <div className="img-cLO-1"></div>
              <div className="frame-VPT-10">
                <div className="img-XbV-1"></div>
              </div>
            </div>
            <div className="frame-xaX-2">
              <div className="text-KwG-1">
                <div className="p-text-Kwg-1"><span className="span-gwl-1 ">组件数</span></div>
              </div>
              <div className="frame-EFT-2">
                <div className="text-xTa-1">
                  <div className="p-text-xTa-1"><span className="span-tyV-1 "><CountUp end={composantTotal} suffix="个"duration={3} separator=','/></span></div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="frame-GRs-3">
          <div className="frame-Dis-1">
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-Hfy-2">
                  <div className="p-text-Hfy-2"><span className="span-Mqn-1 ">温度</span></div>
                </div>
              </div>
              <div className="frame-fwK-3">
                <div className="frame-JOk-1">
                  <div className="text-xgK-1">
                    <div className="p-text-xgK-1"><span className="span-TJt-1 "><CountUp end={temperature}suffix="°C" duration={3} separator=','/></span></div>
                  </div>
                  <div className="frame-eQw-2">
                    <div className="img-KXz-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-Hfy-2">
                  <div className="p-text-Hfy-2"><span className="span-hpT-1 ">湿度</span></div>
                </div>
              </div>
              <div className="frame-fwK-3">
                <div className="frame-JOk-1">
                  <div className="text-xgK-1">
                    <div className="p-text-xgK-1"><span className="span-FKU-1 "><CountUp end={humidite}suffix="%" duration={3} separator=','/></span></div>
                  </div>
                  <div className="frame-acB-2">
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-wRG-2">
                  <div className="p-text-wRG-2"><span className="span-tfC-1 ">面板清洁度</span></div>
                </div>
              </div>
              <div className="frame-Yan-3">
                <div className="text-qian-1">
                  <div className="p-text-qian-1"><span className="span-yho-1 ">{propre}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="frame-Dis-1">
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-wRG-2">
                  <div className="p-text-wRG-2"><span className="span-ZHG-1 ">紫外线指数</span></div>
                </div>
              </div>
              <div className="frame-qian-3">
                <div className="text-qian-1">
                  <div className="p-text-qian-1"><span className="span-qJJ-1 ">{rayonUltraViolet}</span></div>
                </div>
              </div>
            </div>
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-QFj-2">
                  <div className="p-text-QFj-2"><span className="span-fWo-1 ">通信状态</span></div>
                </div>
                </div>
                <div className="frame-YAn-3">
                <div className="text-qian-1">
                  <div className="p-text-qian-1"><span className="span-Dde-1 ">{etatCommunication}</span></div>
                </div>
              </div>
            </div>
            <div className="frame-oUp-1">
              <div className="vec-rectangle-ouN-1"></div>
              <div className="frame-JEX-2">
                <div className="vec-circular-qcJ-1"></div>
                <div className="text-QFj-2">
                  <div className="p-text-QFj-2"><span className="span-jLa-1 ">损耗估计</span></div>
                </div>
              </div>
              <div className="frame-Yan-3">
                <div className="text-xgK-1">
                  <div className="p-text-xgK-1"><span className="span-ABF-1 "><CountUp end={deteriorationTaux} suffix="%"duration={3} separator=','/></span></div>
                </div>
                <div className="frame-NxU-2">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
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
       
      </Mycard>
    </div>);
}
  export default App;