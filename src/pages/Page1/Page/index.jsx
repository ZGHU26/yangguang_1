import React from 'react'
import './index.css'
import "./icon.css"
import Head from '@@/Head'
import MicroGrids from '@@/MicroGrids'
import PV from '@@/PV'
import Issues from '@@/Issues'
import Flashbox from "@@/FlashBox"
import Robot from '@@/Robot'
import Inspection from '@@/Inspection'
import V2 from '@@/V2'
import Background from "@@/Background"
import Clock from "@@/Clock"
import Fonction from "@@/Fonction"
import Weather from "@@/Weather"

function App() {

  return (
    <div className="frame-eih-2 ">
      <Background />
      <Head />
      <Clock />
      <Fonction/>
      <Weather/>
      <MicroGrids />
      <PV />
      <Issues />
      <Robot />
      <Inspection />
      <V2 />
      <Flashbox />
    </div>
   
  );
}

export default App;
