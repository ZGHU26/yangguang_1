import React, { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Button, Space,Dropdown,Card  } from 'antd';
import {
  GlobalOutlined,
  RedoOutlined,
  ToolOutlined,
  PoweroffOutlined,
  LoadingOutlined,
  SettingOutlined ,
} from '@ant-design/icons';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import "./index.css"
import Cookies from 'js-cookie';
import axios from 'axios';
import { setMapX } from '*/modules/Bmap';
import { setPageOpen } from '*/modules/PageManage';
import { setIntervalState,setViewState,setAngle} from '*/modules/CameraStore'
import { useTranslation } from 'react-i18next';
import i18n from '@/translations';
import { setShowWeather } from '*/modules/WeatherStore';
import { setIsRaining } from '*/modules/RainStore';

const { SubMenu } = Menu;
 // 是否展开全部组件



const App = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setPageOpen_1 = (data) => {
    dispatch(setPageOpen(data));
  };
//------------------------------------------------天气-----------------------------------//
//#region 天气情况

  const { SubMenu } = Menu;
  const { t } = useTranslation();

  const showWeather = useSelector((state) => state.Weather.showWeather); // 确保路径正确

  const handleToggle = () => {
 
    dispatch(setShowWeather(!showWeather)); // 切换显示状态
  };

  //#endregion
  //#region下雨功能（可控）
  const isRaining = useSelector((state) => state.Rain.isRaining)
  const [manualOverride, setManualOverride] = useState(false); // 用于跟踪手动停止状态
  const cityname =useSelector ((state)=> state.City.cityname)
  const apiKey = 'c1a479140786d3ec386ce555a0218b7e';
    // 自动控制下雨效果
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityname)}&appid=${apiKey}&units=metric`);
                const weatherData = response.data;
                console.log(weatherData);

                // 检查是否包含“rain”关键词，且未手动停止
                if (weatherData.weather.some(condition => condition.main.toLowerCase().includes('rain')) && !manualOverride) {
                    if (!isRaining) {
                        dispatch(setIsRaining(true)); // 触发下雨
                    }
                }
            } catch (error) {
                console.error("获取天气数据失败: ", error);
            }
        };

        // 仅在未手动停止的情况下进行自动检查
        if (!manualOverride) {
            fetchWeatherData();
            const intervalId = setInterval(fetchWeatherData, 600000); // 定期刷新

            return () => clearInterval(intervalId); // 清除定时器
        }
    }, [isRaining, dispatch, manualOverride]);

    // 手动切换下雨状态
    const toggleRain = () => {
        dispatch(setIsRaining(!isRaining)); // 切换下雨状态
        setManualOverride(true); // 标志为手动停止
    };

  //#endregion

//----------------------------------组件展开-------------------------------//
//#region
   //#region PV&Inspection
   const handleClick1 = () => {
    setPageOpen_1({
      '微电网': true,
      '光伏面板': false,
      '系统事件': true,
      "闪电匣智能网关": true,
      "机器人自动巡检": false,
      "视觉感知": true,
      "V2G站点": true,
    })
  }
//#endregion
  //#region 微电网和V2和flash
  const handleClick3 = () => {
    setPageOpen_1({
      '微电网':false ,
      '光伏面板': true,
      '系统事件': true,
      "闪电匣智能网关": false,
      "机器人自动巡检": true,
      "视觉感知": true,
      "V2G站点": false,
    })
  }
//#endregion
 //#region 系统事件和视觉感知
 const handleClick4 = () => {
  setPageOpen_1({
    '微电网':true ,
    '光伏面板': true,
    '系统事件': false,
    "闪电匣智能网关": true,
    "机器人自动巡检": true,
    "视觉感知": false,
    "V2G站点": true,
  })
}
//#endregion
  //#region 全部展开
  const handleClick2 = () => {
    setPageOpen_1({
      '微电网': false,
      '光伏面板': false,
      '系统事件': false,
      "闪电匣智能网关": false,
      "机器人自动巡检": false,
      "视觉感知": false,
      "V2G站点": false,
    })
   
  }
  //#endregion
  //#region 全部关闭
  const handleClick5 = () => {
    setPageOpen_1({
      '微电网': true,
      '光伏面板': true,
      '系统事件': true,
      "闪电匣智能网关": true,
      "机器人自动巡检": true,
      "视觉感知": true,
      "V2G站点": true,
    })

  }
  //#endregion
   //#endregion
 //-----------------------------------旋转功能----------------------------//
 //#region 旋转
  const {interval,viewState,angle} = useSelector((state) => state.Camera);
  const [loading, setLoading] = useState(false);
const setViewStateAction =(data) =>{
  dispatch(setIntervalState(data))
};
const setIntervalAction = (data) => {
  dispatch(setIntervalState(data));
};
const setAngle_1 = (data)=>{
dispatch(setAngle(data))
}
const handleSwitchChange = () =>{ 
  setLoading(true);
  setAngle_1(viewState.bearing + 10)

  if (interval !==2000) {
    setIntervalAction(2000);
  } else {
    setIntervalAction(undefined)
    setViewStateAction(viewState);
    setLoading(false)
  }
};
//#endregion
//------------------------------------退出功能----------------------------//
//#region 退出

const handleLogout =()=>{
  Cookies.remove('token');
  navigate("/login")
}

//#endregion

//---------------------------------三种地图切换---------------------------//

//#region 地图切换
const {mapx} = useSelector((state) => state.Bmap)
const setMapxY =(data) =>{
  dispatch(setMapX(data))
};
const handleMenuclick = (e) => {
  if (!mapx) return; // 如果地图尚未准备好，避免调用 setStyle 方法

  switch (e.key) {
    case '7':
      setMapxY('mapbox://styles/dylan779453/clwudlb0u019r01q1gu7e5zd1');
      break;
    case '8':
      setMapxY('mapbox://styles/dylan779453/cly2zqce6007p01oe8k5i8am2');
      break;
    case '9':
      setMapxY('mapbox://styles/dylan779453/clwrr1aby017r01r0bkpucp4g');
      break;
    default:
      break;
  }
};
//#endregion
 
//-----------------------------------管理功能-------------------------//
//#region 管理功能 
const [isAdmin, setIsAdmin] = useState(false);
const [users, setUsers] = useState([]);
const token = Cookies.get('token');
const headers = {
  Authorization: `Bearer ${token}`  // 将 token 添加到 Authorization 头部
};
useEffect(() => {
  if (token) {
    fetchUserInfo();
  } else {
    setIsAdmin(false);
  }
}, [token]);
    const fetchUserInfo = async () => {
      try {
      const response = await axios.get('http://127.0.0.1:5000/admin/usermanagement',
        { headers });
     
      if (response.data.is_admin) {
        setIsAdmin(true);
    
      } else {
        setIsAdmin(false);
      }
    } catch (error) {

      setIsAdmin(false);
    }
  };



//#endregion
const items = [
    { key: 'xuanzhuan',
      label: <span onClick={handleSwitchChange} style={{ color: '#fff' }}>旋转</span>,
      icon:loading ?<LoadingOutlined  style={{color:'#fff',fontSize:"16px"}}  onClick={handleSwitchChange} /> : <RedoOutlined  style={{color:'#fff',fontSize:"18px"}} onClick={handleSwitchChange}/>,
     
},
    {
      key: 'fonction',
      label: <span style={{ color: '#fff' }}>功能</span>,
      icon: <ToolOutlined   style={{color:'#fff',fontSize:"16px"}}/>,
      children : [
        { key: 'handleClick1', label: <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)'}} onClick={handleClick1}>PV&Robot</Button> },
        { key: 'handleClick3', label: <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}onClick={handleClick3}>Micro&V2&Flash</Button> },
        { key: 'handleClick4', label: <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}onClick={handleClick4}>Issues&Inspection</Button> },
        { key: 'handleClick2', label: <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}onClick={handleClick2}>Open all</Button> },
        { key: 'handleClick5', label: <Button  style={{ backgroundColor: 'rgba(0,0,0,0.5)'}}onClick={handleClick5}>Close all</Button> },
      ],
    },
    {
      key: 'Mapstyle',
      label : <span style={{ color: '#fff' }}>地图样式</span>,
      icon: <GlobalOutlined  style={{color:'#fff',fontSize:"16px"}}/>,
      children: [
        { key: '7', label: '卫星地图', onClick: handleMenuclick},
        { key: '8', label: '黑', onClick: handleMenuclick },
        {key:'9',label:"白",onClick:handleMenuclick}
      ],
    },
    {
      key: "weather",
      label: <span onClick={handleToggle} style={{ color: '#fff' }}>天气情况</span>,
      icon: <span className='iconfont icon-WeatherControl' style={{ color: '#fff' }} onClick={handleToggle} />,
    },
    {
      key: 'weather1',
      label: <span style={{ color: '#fff' }}>天气</span>,
      icon: <span className='iconfont icon-WeatherControl' style={{ color: '#fff' }} />,
      children: [
  
        {
          key: 'rainy',
          label: <Button style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => toggleRain('rainy')}>{isRaining ? "停止下雨" : "下雨"}</Button>
        },
      ]
    },
    {
      key: 'tuichu',
      label: <span  onClick={handleLogout} style={{ color: '#fff' }}>退出</span>,
      icon: <PoweroffOutlined  style={{color:'#fff',fontSize:"16px"}} onClick={handleLogout} />,
    },
  ];

  if (isAdmin) {
    items.unshift({
      key: 'adminButton',
      label: <span style={{ color: '#fff' }}>管理功能</span>,
      icon: <span className='iconfont icon-guanli' style={{ color: '#fff' }}/> ,
      onClick: () => {
        // Handle admin button click
        navigate("/admin/usermanagement");
      }
    });
  }

  return (
    <div className='yanqian'>
    <Dropdown overlay={<Menu items={items} style={{ backgroundColor: 'rgba(0,0,0,0.5)'}} />}>
      <a onClick={(e) => e.preventDefault()}>
      <Card  bordered={false}  style={{ backgroundColor: '#001529' }} >
        <Space>
          <SettingOutlined  style={{color:'#fff',fontSize: '25px'}}/>
        </Space>
        </Card>
      </a>
    </Dropdown>
  </div>
);
};

export default App;

