import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { DeckGL } from '@deck.gl/react';
import { MapView, COORDINATE_SYSTEM } from '@deck.gl/core';
import { ScenegraphLayer } from 'deck.gl';
import { GeoJsonLayer, PointCloudLayer } from '@deck.gl/layers'
import { Map } from 'react-map-gl';
import { Matrix4 } from 'math.gl';
import cmap from './Cmap';
import './index.css'
import { FlyToInterpolator } from '@deck.gl/core';
import { useInterval } from 'ahooks';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { NavigationControl } from 'react-map-gl';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import { useDispatch,useSelector } from 'react-redux';
import {setTotalDuration} from '*/modules/MicroGridStore'
import { setIntervalState,setViewState,setAngle} from '*/modules/CameraStore';
import { setMapX } from '*/modules/Bmap';
import {Tile3DLayer} from '@deck.gl/geo-layers';
import { Tiles3DLoader} from '@loaders.gl/3d-tiles';
import { createRainEffect } from '@@/RainEffect';
import { setIsRaining } from '*/modules/RainStore';
function App() {
 const  dispatch = useDispatch()
  const mapRef = useRef(null);
 
  const {interval,viewState,angle} = useSelector((state) => state.Camera);
  const setAngleAction=(data)=>{
    dispatch(setAngle(data))
  }

  const setViewStateAction = (data) => {
    dispatch(setViewState(data));
  };
  const {mapx} = useSelector((state) => state.Bmap)


  //#region 下雨
  const rainEffectInstance = useRef(null);
  const canvasRef = useRef(null); 
  const isRaining = useSelector((state) => state.Rain.isRaining)
 

  useEffect(() => {
  

    if (isRaining) {
      if (canvasRef.current && !rainEffectInstance.current) {
        rainEffectInstance.current = createRainEffect(canvasRef.current);
   
      }
    } else if (rainEffectInstance.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      rainEffectInstance.current = null;

    }
  }, [isRaining]);
  

  

  
  //#endregion
  //#region 右键旋转功能
  useEffect(() => {
    //允许右键旋转视角
    document.getElementById("deckgl-wrapper").addEventListener("contextmenu", evt => evt.preventDefault());
  }, [])
  //#endregion
  
  //#region 点云
  const rotationAngle = Math.PI; // 30度对应的弧度值
  const rotationMatrix = new Matrix4().rotateZ(rotationAngle);
  // 创建一个缩放矩阵
  const scale = 1;
  const scaleMatrix = new Matrix4().scale([scale, scale, scale]);
  // 合并旋转矩阵和缩放矩阵
  const transformationMatrix = rotationMatrix.multiplyRight(scaleMatrix);
  const coordinateOrigin = [113.972009, 22.596948]
  const [pointcloud_isshow, setpointcloud_isshow] = useState(true)

  //#endregion 
  //#region 地图旋转
  function rotate(pitch, bearing, duration) {
    setViewStateAction({

      ...viewState,
      pitch: pitch,
      bearing: bearing,
      transitionDuration: duration,
      transitionInterpolator: new FlyToInterpolator()
    })
  }
  useInterval(() => {
    rotate(viewState.pitch, angle, 2000)
    setAngleAction (angle + 10)
  }, interval, { immediate: true });
  

  //#endregion 地图旋转

  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 3
  });
  const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [115.974171, 28.594238, 8000]
  });
  const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [113.974171, 23.594238, 80000]
  });
  const lightingEffect = new LightingEffect({ambientLight, pointLight1,pointLight2});
  const scenegraphLayer = [
    new ScenegraphLayer({
    id: 'ScenegraphLayer',
    data: [{ 'coord': [113.974171 - 0.00196, 22.594238 + 0.00234] }
    ],
    getPosition: (d) => d.coord,
    getOrientation: (d) => [0, 180, 90],
    scenegraph: "data/bd.gltf",
    sizeScale: 0.0013,
    _lighting: 'pbr',
    pickable: true
  }),
  new GeoJsonLayer({
    id: "GeoJsonLaye",
    data: "data/buildings.geojson",
    stroked: true,
    filled: true,
    extruded: true,
    pickable: true,
    getFillColor: [245, 245, 220],
    opacity: 0.5,
    material:  {
      ambient: 0.1,
      diffuse: 0.6,
      shininess: 32,
      specularColor: [60, 64, 70]
    },
    getElevation: (f) => f.properties.height,
   }),
   new Tile3DLayer({
    id: 'tile-3d-layer',
    data: '/tileMapApi/backend/tileset.json',
    loader: Tiles3DLoader,
    onTilesetLoad: (tileset) => {
      const {cartographicCenter, zoom} = tileset;
    },
    pointSize: 2,
    
  })
  
  //#region 点云
  // pointcloud_isshow && new PointCloudLayer({
  //   id: 'PointCloudLayer',
  //   data: "data/pointcloud.json",
  //   getColor: d => cmap(d.position[2], 0, 10),
  //   getNormal: [0, 1, 0],
  //   getPosition: (d) => d.position,
  //   modelMatrix: transformationMatrix,
  //   pointSize: 0.5,
  //   opacity: 0.5,
  //   pickable: false,
  //   radiusPixels: 0.5,
  //   coordinateOrigin,
  //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
  // }),
  //#endregion
  ]
  const token = "pk.eyJ1IjoiZHlsYW43Nzk0NTMiLCJhIjoiY2x3cmo0MzE0MDE5djJqcHk3a2x1djF5eSJ9.BdzAhTZeKEEeCIyAL-CKWQ"
  return (
    <div className='frame-eih-2'>
      <DeckGL
        initialViewState={viewState}
        controller={true}
        effects={[lightingEffect]}
        layers={scenegraphLayer}>
        <MapView
          id="map"
          mapRef={mapRef}>
          <Map
            ref={mapRef}
            mapStyle ={ mapx}
            mapboxAccessToken={token}
            preventStyleDiffing={true} >
          </Map>
        </MapView>
      </DeckGL>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          display: isRaining ? 'block' : 'none', // 根据 isRaining 控制 Canvas 显示
        }}
      ></canvas>
    </div>
  );
}

export default App;