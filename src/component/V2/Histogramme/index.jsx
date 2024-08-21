import ReactECharts from 'echarts-for-react';
import React from 'react';
import { useEffect,useRef } from 'react';
import * as echarts from 'echarts';
import { useState } from 'react'; 
import './index.css';
const data = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月"]
function App() {
    const chartRef = useRef(null);
    const automove = true;
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
            right: "5%",
            bottom: "0%",
            containLabel: true
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow"
            },
            borderColor:"rgba(0,0,0,0.6)",
            borderWidth: 1, // 设置边框宽度为0
            borderRadius: 6,
              backgroundColor:'rgba(0,0,0,0.5)',
              textStyle:{
              color:"#fff",
              fontSize:dynamicFontSize,}
        },
        legend: {
            show:true,
            left:"70%",
            top:"5%",
            textStyle:{
            color:'#fff',
            fontSize:dynamicFontSize,
            fontFamily: 'Arial, sans-serif',

        }
        },
        xAxis: {
            type: 'category',
            name: '月份',
            data: data,
            axisLabel: {
                color: '#fff',
                fontSize: dynamicFontSize
            },
            axisTick:{
                alignWithLabel:true
            }
        },
        yAxis: {
            name:"充电量/KWh",
            nameTextStyle:{
                color:"#fff",
                fontSize:dynamicFontSize,
            },
            type: 'value',
            splitLine: {
                show: false
              },
            axisLabel: {
                color: '#fff',
                fontSize: dynamicFontSize,
                margin:13
            }  
        },
        series: [
            {
                name: '总充电量',
                type: 'bar',
                barWidth:'20%',
                barGap:"20%",
                data: [3, 4, 5, 5, 5, 5, 5, 4],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [{
                          offset: 0,
                          color: 'rgba(51, 204, 204, 1)' // 渐变开始颜色
                      }, {
                          offset: 1,
                          color: 'rgba(31, 89, 89, 0.1)' // 渐变结束颜色
                      }],
                      false ),
                    borderRadius:[5,5,0,0],
                    BorderWidth:0
                },
            }
        ],
        label: {
            show: true,
            position:'top',
            color: '#fff',
            fontSize:dynamicFontSize
          },

    }
    useEffect(() => {
    if (automove) {
        let currentIndex = 7;
        const myChart_instance = chartRef.current.getEchartsInstance()
        
        const highlightAndShowTip=()=>{
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
    };
    highlightAndShowTip();
        const intervalId  = setInterval(() => {
            const dataLen = data.length;

            myChart_instance.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: currentIndex
            });
            currentIndex = (currentIndex + 1) % dataLen;
            // 高亮当前图形
          highlightAndShowTip();
        }, 2000);
        return()=>clearInterval(intervalId);
    }
},[automove]);
    return (
        <div className='Histogramme'>
            <ReactECharts ref={chartRef}
                option={option}
                onEvents={onclick}
                style={{width:"100%",height:"100%"}}
            echarts={echarts}>
              
        </ReactECharts>       
        </div >
    );
    
}

export default App;
