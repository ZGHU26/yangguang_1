import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import { useEffect, useRef ,useState} from "react";
import './index.css'
const data = {
  unit:'千瓦时/KWh',
xAxis :['7日', '8日', '9日', '10日', '11日', '12日'],
seriesData:[1,1,2,3,3,4]}
function Lineaire() {
  const automove = true
  const chartRef = useRef(null);
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
  const option = {
    grid: {
      left: "5%",
      right: "0%",
      bottom: "5%",
      top:"15%",
      containLabel: true
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: 'cross',
      },
      formatter: function (params) {

        return `${params[0].axisValue} ${params[0].marker} ${params[0].value} KWh`},
      borderColor: 'rgba(0,0,0,0.6)', // 取消边框线
      borderWidth: 1, // 设置边框宽度为0
      borderRadius: 6,
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: "#fff",
      }
    },
    legend: {
      show: true,
      top:'5%',
      width:'100%',
      textStyle: { 
        fontSize:dynamicFontSize,
        color: "#fff",
      }
    },
    xAxis: {
      type: 'category',
      axisTick: { // 隐藏 x 轴的刻度线
        show: false
      },
      axisLine: {
        show: false
      },
      data: data.xAxis,
      axisLabel: {
        color: '#fff',
        fontSize:dynamicFontSize,
      },
    },
    yAxis: {
      name:"耗电量/KWh",
      nameTextStyle:{
        color:"#fff",
        fontSize:dynamicFontSize 
      },
      type: 'value',
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: '#fff',
        fontSize:dynamicFontSize,
      },
    
    },
    series: [
      {
        data: data.seriesData,
        type: 'line',
        lineStyle: {
          color: 'rgba(23, 255, 243, 0.8)'
        },
      }
    ]
  };
  useEffect(() => {
    if (automove) {
      let currentIndex = 5;
      const myChart_instance = chartRef.current.getEchartsInstance()
      const highlightAndShowTip = () => {
        myChart_instance.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        myChart_instance.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
      }
      highlightAndShowTip();
      const intervalId = setInterval(() => {
        const dataLen = data.seriesData.length;
        myChart_instance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // 高亮当前图形
        highlightAndShowTip();
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [automove]);


  return (
    <div className="zhexian">
      <ReactEcharts ref={chartRef}
        option={option}
        onEvents={onclick}
        echarts={echarts}
        style={{ width: '100%', height: '100%' }}>

        </ReactEcharts>
    </div>
  );
};
export default Lineaire;