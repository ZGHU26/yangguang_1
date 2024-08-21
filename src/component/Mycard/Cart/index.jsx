import React, { useEffect, useState } from 'react'
import { Card, Button } from 'tdesign-react';
import { ChevronUpIcon, ChevronDownIcon } from 'tdesign-icons-react';
import'./index.css';
import Draggable, { DraggableCore } from "react-draggable";
import { Resizable } from 'react-resizable';
import { useDispatch,useSelector } from 'react-redux';
import "@/pages/Page1/Page/icon.css"


export default function Mycard(props) {
//#region 联动开关
    const {pageopen}=useSelector((state)=>state.PageManage);
    const dispatch=useDispatch();

    useEffect(()=>{
        setFold(pageopen[props.title1])
    },[pageopen])

//#endregion
    const [fold, setFold] = useState(false)
    const newprops = fold ? { ...props, title: '' } : { ...props }

    const [state, setState] = useState({
        width: props.width,
        height: props.height,
    });

    const handleExtraAction=()=>{
        
    }
    return (

        <Draggable 
            handle=".drag-handler"
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            style={{
                width: state.width,
            }}
            scale={1}
        >
            <div>
                <div className='drag-handler' style={{
                    position: 'absolute',
                    //背景颜色
                    backgroundColor: 'rgba(0,0,0,0)',
                    opacity: '2px',
                    //边框
                    width: '65%',
                    height: '3vh',
                    top: '0px',
                    zIndex: 100,
                }}>
                </div>
                
                
                
                {/* <Resizable
                    width={state.width}
                    height={state.height}
                    handleSize={[478, 298.45]}
                    minConstraints={[50, 50]}
                    onResize={(event, { size }) => {
                        if (!fold) {
                            setState({ width: size.width, height: size.height });
                        }
                    }}
                > */}
                    <Card {...newprops}
                        style={{
                            ...props.style,
                            width: state.width, height: state.height,
                            position: 'relative'
                        }}
                        size='medium'
                        actions={
                            !fold ?
                         //#region 收缩
                                <Button 
                                theme="default"
                                    variant="text"
                                    icon={<ChevronUpIcon style={{ fontSize: '3vh' }} />}
                                    onClick={() => {
                                        setFold(!fold);
                                    }}
                                    style={{
                                        width: '35%',
                                        backgroundColor:'rgba(1,1,1,0)',
                                        right:'-0%',
                                        height: '3vh',
                                        position: 'absolute',  
                                        border:'none',       
                                        zIndex: 1000,
                                        color: '#fff'
                                    }}
                                ></Button>:
                                <Button theme="default"
                                    variant="text"
                                    icon={<ChevronDownIcon style={{ fontSize: '3vh' }} />}
                                    onClick={() => {
                                        setFold(!fold)
                                    }
                                    }
                                    style={{
                                        
                                        width: '35%',
                                        height: '3vh',
                                        border:'none',
                                        position: 'absolute', // 设置按钮为绝对定位
                                        right: '0%', // 
                                        zIndex: 1000,// 确保按钮在其他内容之上
                                        color: '#fff',                                       
                                    }}
                                ></Button>
                              //#endregion
                        }
                        children={
                            //#region div通用
                            <div style={{
                                maxHeight: state.height - 80, overflow: 'auto'
                            }}>
    
                                <div className="frame-Ups-1"> 
                                              
                             
                                    <div className="frame-yrI-2" style={{width:props.testwidth,top:props}}>
                                      
                                        <div className="frame-KAy-3">
                                        <span className="iconfont icon-shuzi"></span>
                                        </div>
                                        <div className="frame-Xgf-4">
                                            <div className="text-aGx-1">
                                                <div className="p-text-aGx-1"><span className="span-ybD-1 ">{props.title1}</span></div>
                                            </div>
                                            <div className="text-wNq-2">
                                                <div className="p-text-wNq-2"><span className="span-RFf-1 ">{props.title2}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="frame-tQB-2">
                                    {!fold && props.children}
                                    </div>
                            </div>
                        //#endregion
                        }
                        title={props.title}
                        >
                          
                    </Card>
                {/* </Resizable> */}
            </div>
          
        </Draggable>
       
    )
}
