// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 示例的翻译资源
const resources = {
  en: {
    translation: {
      login: 'Login',
      register: 'Register',
      username: 'Username',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      loginButton: 'Login',
      registerButton: 'Register',
      goToRegister: 'Go to Register',
      goBackToLogin: 'Go back to Login',
      passwordMismatch: 'Password and Confirm Password do not match',
      error: 'Error, please try again later',
      loginSuccessful: "login Successful",
      registerForAdmin: "registerForAdmin",
      registerAdmin: "registerAdmin",
      ModifyPassword: "Modify Password",
      userlevel: "userlevel",
      admin_approved: "admin_approved",
      admin: "admin",
      user: "user",
      pending: "pending",
      Delete: "Delete",
      AddUser: "AddUser",
      Logout: "Logout",
      Action: "Action",
      Useraddedsuccessfully: "User added successfully",
      Passwordmodifiedsuccessfully: "Password modified successfully",
      Areyousureyouwanttodelete: "Are you sure you want to delete",
      Cancel: "Cancel",
      OK: "OK",
      Date: "Date",
      Temperature: "Temperature",
      Weathe: "Weathe",
      MaxTemp: "Max Temp",
      MinTemp: "Min Temp",
      North: "North",
      Northeast: "Northeast",
      East: "East",
      Southeast: "Southeast",
      South: "South",
      Southwest: "Southwest",
      West: "West",
      Northwest: "Northwest",
      FeelsLike: "Feels Like",
      Weather: "Weather",
      Humidity: "Humidity",
      Rain: "Precipitation",
      WindSpeed: "Wind Speed",
      WindDirection: "Wind Direction",
      Pressure: "Pressure",
      Entercityname: "Enter city name",
      Search: "Search",


    }
  },
  zh: {
    translation: {
      login: '登入',
      register: '注册',
      username: '用户名',
      password: '密码',
      confirmPassword: '确认密码',
      loginButton: '登入',
      registerButton: '注册',
      goToRegister: '去注册',
      goBackToLogin: '返回登入',
      passwordMismatch: '确认密码与密码不一致',
      error: '错误，请稍后再试',
      loginSuccessful: "登入成功",
      registerForAdmin: "申请成为管理员",
      registerAdmin: "申请管理员",
      ModifyPassword: "更换密码",
      userlevel: "用户等级",
      admin_approved: "申请状态",
      admin: "管理员",
      user: "用户",
      pengding: "等待中",
      Delete: "删除用户",
      AddUser: "增加用户",
      Logout: "返回",
      Action: "操作",
      Useraddedsuccessfully: "用户添加成功",
      Passwordmodifiedsuccessfully: "密码修改成功",
      Areyousureyouwanttodelete: "你确定删除用户",
      Cancel: "取消",
      OK: "确认",
      Date: "日期",
      Temperature: "气温",
      Weathe: "天气",
      MaxTemp: "最高气温",
      MinTemp: "最低气温",
      North: "北",
      Northeast: "东北",
      East: "东",
      Southeast: "东南",
      South: "南",
      Southwest: "西南",
      West: "西",
      Northwest: "西北",
      FeelsLike: "体感温度",
      Weather: "天气",
      Humidity: "湿度",
      Rain: "降雨量",
      WindSpeed: "风速",
      WindDirection: "风向",
      Pressure: "气压",
      Entercityname: "请输入城市名字",
      Search: "搜索",

    }
  }
};

i18n
  .use(initReactI18next) // 使用 initReactI18next 初始化 i18next
  .init({
    resources,
    lng: 'zh', // 默认语言设置为中文
    fallbackLng: 'en', // 备用语言为英文
    interpolation: {
      escapeValue: false // React 默认已经转义了，所以不需要额外转义
    }
  });

export default i18n;

