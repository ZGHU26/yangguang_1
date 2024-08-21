import ReactEcharts from "echarts-for-react";
import * as echarts from 'echarts';
import {setInacheve,setFini} from "*/modules/RobotStore";
import { useDispatch,useSelector} from "react-redux";
import { useEffect,useState} from "react";
import './index.css'

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
  const dynamicFontSize = (viewportWidth * 0.01) * 0.8 + 'px';
  const {fini,inacheve}=useSelector((state)=>state.Robot);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setFini(1000));
    dispatch(setInacheve(1000));
  });
  const option = {
    tooltip: {
      trigger: 'item',
      zIndex: 1000 ,
   
      formatter: function (params) {

        return `${params.marker} <span style="font-size: 1vw">${params.name}</span> <span style="font-size: 1vw">${params.value}</span><span style="font-size: 1vw">人</span>`},
      borderWidth: 1, // 设置边框宽度为0
      borderRadius: 6,
      
        backgroundColor:'rgba(0,0,0,0.5)',
        textStyle:{
        color:"#fff",
        fontSize:dynamicFontSize,
        
      }
        
    },
    legend: {
      show:true,
      left:'5%',
      top:'75%',
      width:'100%',
      textStyle:{
      color:'#fff',
      fontSize:dynamicFontSize,
      
    

  }},
    series: [
      {
        name: '巡逻情况',
        type: 'pie',
        left:"55%",
        top:"10%",
        radius: ['45%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#5fd0d3',
          borderWidth: 2},
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 0,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: fini, name: '已巡逻', itemStyle: { color:'#5fd0d9'  } },
          { value: inacheve, name: '未巡逻', itemStyle: { color: '#9d9d9d' } },
      ],
      }
    ]
  };
  return (
    <div className="Robot">
      <ReactEcharts
        option={option}
        style={{ width: '100%', height: '100%' }}
        echarts={echarts}></ReactEcharts>
    </div>
  );
};
export default App;