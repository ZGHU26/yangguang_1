import React from 'react'
import Histogramme from './Histogramme'
import Mycard from '../Mycard/Cart';
function App() {
  return (
    <div className="frame-dAW-8">
      <Mycard title1='V2G站点' title2="V2G Point">
      
      <div className="frame-UIc-2">
        <div className="frame-ucM-1">
          <div className="vec-rectangle-VTU-1"></div>
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
        <Histogramme/>
      </div>
      </Mycard>
    </div>);
}
export default App;