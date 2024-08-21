import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import 'echarts-liquidfill';
import "./index.css"
import { useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { setPuissanceCalcul, setPuissanceRestante } from '*/modules/FlashBoxStore'

function App() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => {
        setViewportWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);

      // 清理事件监听器
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const dynamicFontSize2 = (viewportWidth * 0.01) * 0.6 + 'px';
    const dynamicFontSize1 = (viewportWidth * 0.01) * 2 + 'px';
    const dynamicFontSize3 = (viewportWidth * 0.01) * 1 + 'px';
  const { puissanceCalcul, puissanceRestante} = useSelector((state) => state.FlashBox
);

    const dispatch = useDispatch();
     useEffect(() => {
    dispatch(setPuissanceCalcul(60));
    dispatch(setPuissanceRestante(101));
  },[dispatch]);
  const value= puissanceCalcul%(puissanceCalcul+puissanceRestante)
  const option = {
    backgroundColor:"rgba(0, 0, 0,0.0)",
    title: [
    {
        text: `{a|${(value)}%}`,
        
     
            subtext: "算力使用占比",
            subtextStyle:{
            fontSize: dynamicFontSize2,
            color:'#fff',},
      
        top: "center",
        left: "center",
        itemGap: -10, //主副标题间距
        textStyle: {
            fontWeight: "normal",
            rich: {
                
                a: {
                    padding: [0, 0, 0, 0],
                    fontWeight: "normal",
                    fontSize: dynamicFontSize1,
                    color: "#fff",
                    fontFamily: "DINAlternate-Bold",
                    textShadow: [5, 5, 10, "#7ff06fff"]
                },
                
            }
        }
    }],
    angleAxis: {
        axisLine: {
            show: false
        },
        axisLabel: {
            show: false
        },
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        min: 0,
        max: 100,
        boundaryGap: ["1000", "100"]
    },
    radiusAxis: {
        type: 'category',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            show: false
        },
        data: ['a', 'b', 'c'],
        z: 10
    },
    polar: {
        radius: '100%'
    },
    series: [{
        type: 'bar',
        data: [, , value], //修改数据
        coordinateSystem: 'polar',
        barMaxWidth: 5,
        z: 2,
        name: '',

        color: '#4faac5',
        barGap: '-100%',
    },
    {
        type: "bar",

        data: [, , 100],
        coordinateSystem: 'polar',
        barMaxWidth: 5,
        z: -2,
        name: '',

        color: '#fff',
        barGap: '-100%',

    },
    {
        type: 'liquidFill',
        radius: '70%',
        center: ['50%', '50%'],
        color: [
        {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 1,
                color: 'rgba(2, 159, 200, 1)'
            }, {
                offset: 0.5,
                color: 'rgba(0, 186, 211, .5)'
            }, {
                offset: 0,
                color: 'rgba(0, 230, 220, 1)'
            }],
        }, ],
        data: [{ value: value / (puissanceCalcul + puissanceRestante), itemStyle: { color: '#00F5FF' }} ,{value: value / (puissanceCalcul + puissanceRestante),itemStyle:{color:'rgba(72, 162, 164,1)'}},{value: value / (puissanceCalcul + puissanceRestante)}], // data个数代表波浪数
        backgroundStyle: {
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0)',
            color: 'rgba(255, 255, 255, 0)',
        },
        outline: {
            show: false,
        },
        label: {
            show: false,
        },
    }, ],
    tooltip: {
        show: false
    },

}
  return (
    <div className="Ballwater">
      <ReactEcharts
        option={option}
        style={{ width: '100%',
            height:"100%"
        }}
        echarts={echarts}></ReactEcharts>
    </div>
  );
};
export default App;