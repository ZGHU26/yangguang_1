import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Checklogin = ({children}) => {
    const navigate = useNavigate();
    const token = Cookies.get('token');
 useEffect(() => {
    const checkTokenValidity = async () => {
        try {
        if (!token) {
            navigate('/Login'); // 如果没有 Token，则导航到登录页
            return;
        }
        const response = await axios.post(`http://127.0.0.1:5000/check_token`, { token })
                const { status } = response.data;
                if (status === 'success') {
                }else {
                    navigate('/Login'); // 验证失败则导航到登录页
                }
            } catch(error){
                navigate('/Login'); // 请求出错则导航到登录页
            }};
            checkTokenValidity();
    }, [navigate,token]);
  
    return <>{children}</>;
}
export default Checklogin;
