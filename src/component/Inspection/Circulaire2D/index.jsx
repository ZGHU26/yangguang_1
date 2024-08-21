
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";
import "./index.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef,useState } from 'react';
import { setProche, setReunion, setSortie } from '*/modules/Inspection';
import { Button } from 'tdesign-react';

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
  const dynamicFontSize = (viewportWidth * 0.01) * 0.6 + 'px';
  const automove = true
  const chartRef = useRef(null);
  const { proche, reunion, sortie } = useSelector((state) => state.Inspection);
  const dispatch = useDispatch();
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        return `<span style="font-size: 1vw;">${params.marker} </span><span style="font-size: 1vw">${params.name}</span> <span style="font-size: 1vw">${params.value}</span><span style="font-size: 1vw">人</span>`},
        backgroundColor:'rgba(0,0,0,0.5)',
        textStyle:{
        color:"#fff",
        fontSize:dynamicFontSize
      },
    },
    legend: {
      color:"#fff",
      orient:"vertical",
     top:'center',
     right:"5%",
      show: true,
      width:"100%",
      textAlign: 'center',
      textStyle:{
        color:"#fff",
        fontSize:dynamicFontSize
      },
 
    },
    series: [
      {
        selectedMode: 'single',
        selectedOffset: 15,
        type: 'pie',
        center: ['50%', '50%'],
        radius: '75%',
        right:"35%",
        data: [
          { value: proche, name: '靠近阳光房', itemStyle: { color: 'rgba(0,255,255,0.5)' } },
          { value: reunion, name: '会议区聚集', itemStyle: { color: 'rgba(250,212,42,0.5)' } },
          { value: sortie, name: '离开阳光房', itemStyle: { color: 'rgba(0,179,255,0.5)' } }
        ],
        label: {
          show: false,
          
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          label:false,
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          }
        }
      }
    ]
  };
  //#region 改变数值
  useEffect(() => {
    dispatch(setProche(12));
    dispatch(setReunion(2));
    dispatch(setSortie(11));
    //#endregion
    if (automove) {
      let currentIndex = 0;
      const myChartInstance = chartRef.current.getEchartsInstance()
      const highlightAndShowTip = () => {
        myChartInstance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        myChartInstance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        myChartInstance.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }
      highlightAndShowTip();
      const intervalId = setInterval(() => {
        myChartInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        myChartInstance.dispatchAction({
          type: 'unselect',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % 3;
        // 高亮当前图形
        highlightAndShowTip();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [dispatch, automove]);
  return (
    <div className='Circulaire'  >
  
        <ReactEcharts ref={chartRef} className={'CirculaireEchart'}
          option={option} 
          echarts={echarts}></ReactEcharts>
    </div>
  );
}

export default App;