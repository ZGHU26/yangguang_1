import React,{useState,useEffect, useRef } from 'react';
import { Table } from 'antd';
import "./index.css"
function App(){
  
  const columns = [
    {
      title: '系统事件',
      dataIndex: 'name',
      width: 100,
      align: 'center',
      titleCellStyle: {
        backgroundColor:"transparent",}
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: 100,
      align: 'center',
      titleCellStyle: {
        backgroundColor:"transparent",},
    },
    {
      title: '时间',
      dataIndex: 'time',
      align: 'center',
      titleCellStyle: {
        backgroundColor:"transparent",},
    },
  ];
 
  const [data,setData] = useState([
    {
      key: '1',
      name: '供冷调节（降温）',
      type: '能源调控',
      time: '2024-04-12 12:01:05',
    },
    {
      key: '2',
      name: '会议区人员数量增加',
      type: '智能感知',
      time: '2024-04-12 12:03:05',
    },
    {
      key: '3',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 13:01:05',
    },
    {
      key: '4',
      name: '光伏面板清洁情况',
      type: '运维提醒',
      time: '2024-04-12 12:45:05',
    },
    {
      key: '5',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
    {
      key: '6',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
    {
      key: '7',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
    {
      key: '8',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
    {
      key: '9',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
    {
      key: '10',
      name: '人员进入阳光房',
      type: '智能感知',
      time: '2024-04-12 14:03:05',
    },
   
  ]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     if (tbodyRef.current) {
  //       const { scrollTop, scrollHeight, clientHeight } = tbodyRef.current;
  //       const isAtBottom = scrollTop + clientHeight >= scrollHeight;
  //       if (isAtBottom) {
  //         tbodyRef.current.scrollTop = 0; // 如果滚动到底部，则重置到顶部
  //       } else {
  //         tbodyRef.current.scrollTop += 1; // 每次向下滚动1像素
  //       }
  //     }
  //   }, 50); // 调整这个间隔以控制滚动速度

  //   return () => clearInterval(intervalId);
  // }, []);




  return(
  
    <div className='Table'>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      style={{width:'100%',
        height:"100%"
      }}
      rowClassName="Table.ant-table-row-hover" 
      scroll={{ y: 250 }}
    />
    </div>
    )
}
export default App;
