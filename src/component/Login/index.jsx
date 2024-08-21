import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import i18n from '@/translations';
import { useNavigate, Routes, Route } from 'react-router-dom';
import "@/pages/Page1/Page/icon.css";
import { Dropdown, Menu } from 'antd';

import './index.css';

const LoginRegister = () => {
    const { t } = useTranslation();
    const [isLogin, setIsLogin] = useState(true);
    const [isAdminRegister, setIsAdminRegister] = useState(false); // 新增状态
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const toggleLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const setCookie = (token) => {
        Cookies.set('token', token, { expires: 1 / 24 });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            setMessage(t('confirmPasswordMismatch'));
            return;
        }

        const url = isLogin 
            ? 'http://127.0.0.1:5000/login' 
            : isAdminRegister 
            ? 'http://127.0.0.1:5000/register/admin' 
            : 'http://127.0.0.1:5000/register';
//插个眼//
        

        try {
            const userData = {
                username,
                password,
            };

            const response = await axios.post(url, userData);
            
            setMessage(response.data.message);

            if (response.data.message === 'Login successful') {
                setCookie(response.data.token);
                navigate('/page');
            } else {
                setMessage(t('registerSuccessful'));
                setPassword('');
                setUsername('');
                setConfirmPassword('');
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : t('error'));
        }
    };

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
        setMessage('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setIsAdminRegister(false); // 切换表单时重置管理员注册状态
    };
    const handleAdminRegister=()=>{
    setIsAdminRegister(true);
    setIsLogin(false);
    setMessage('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');}
    return (
        <div className='Login'>
            <div className='container'>
                <h2>{isLogin ? t('login') : isAdminRegister ? t('registerAdmin') : t('register')}</h2>
                {/* 插个眼 */}
                <div className='dropdown-container'>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key="en" onClick={() => toggleLanguage('en')}>
                                EN
                            </Menu.Item>
                            <Menu.Item key="zh" onClick={() => toggleLanguage('zh')}>
                                中文
                            </Menu.Item>
                        </Menu>
                    }>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <span className='iconfont icon-fanyi' style={{ color: "black" }}>
                            </span>
                        </a>
                    </Dropdown>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><span className='iconfont icon-yonghu'>  </span>{t('username')}:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            <span className='iconfont icon-mima'>  </span>{t('password')}:
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isLogin && (
                        <>
                            <div>
                                <label>{t('confirmPassword')}:</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit">{isLogin ? t('loginButton') : isAdminRegister ? t('registerAdmin') : t('registerButton')}</button>
                    {/* 插个眼 */}
                </form>

                <p>{message}</p>
                {!isAdminRegister && (
                    <button onClick={handleToggleForm}>
                        {isLogin ? t('goToRegister') : t('goBackToLogin')}
                    </button>
                )}
                 <p>{message}</p>
                {isLogin && (
                    <button onClick={handleAdminRegister} >
                        {t('registerForAdmin')}
                    </button>
                )}
                {/* 插个眼 */}
                {isAdminRegister && (
                    <button onClick={() => {
                        setIsAdminRegister(false);
                        setIsLogin(true);
                    }}>
                        {t('goBackToLogin')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
