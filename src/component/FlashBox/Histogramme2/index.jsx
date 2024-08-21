import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";
import { useState,useEffect } from 'react';
import "./index.css"
const titlename=['视觉感知', '现场仿真', '能源调控', '智能体调度']
const data=['28', '32', '16', '34']
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
  const dynamicFontSize = (viewportWidth * 0.01) * 0.8+ 'px';
  const option = {
    grid: {
      containLabel: true,
      bottom:'8%',
      right:'5%',
      left:'5%',
      top:'7%'

    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      borderColor:"rgba(0,0,0,0.6)",
      borderWidth: 1, // 设置边框宽度为0
      borderRadius: 6,
        backgroundColor:'rgba(0,0,0,0.5)',
        textStyle:{
        color:"#fff",
        fontSize: dynamicFontSize,}
    },
    legend: {
      show:false
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      data:titlename,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show:true,
        color: '#fff',
        fontSize: dynamicFontSize
      },
      splitLine: {
        show: false
    },
    },
    series: [
      { name:'TOPS',
      barWidth:20,
      barCategoryGap: '50%',
        type: 'bar',
        label:{
          normal:{
          show:true,
          
          position:"inside",
          formatter:'{c}%',
          fontSize:dynamicFontSize,}
        },
        data: data,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: 'rgb(51, 204, 204,1)'
        }, {
            offset: 1,
            color: 'rgb(31,89,89,0.1)'
        }]),
            borderRadius: 30,
        BorderWidth: 0,
        },
      }, {
        name: '背景',
        type: 'bar',
        barGap: '-100%',
        data: [100, 100, 100, 100],
        label:{
          show:false
        },
        barWidth: 20,
        itemStyle: {
            normal: {
                color: 'rgba(24,31,68,0.3)',
                borderWidth: 3,
                barBorderRadius: 30
            }
        }
    },
    ]
  };
  return (
    <div className='Histogramme2'>
      <ReactEcharts
      style={{ width: '100%',
        height: '100%'}}
        option={option}
        echarts={echarts}></ReactEcharts>
    </div>
  );
}
export default App;
