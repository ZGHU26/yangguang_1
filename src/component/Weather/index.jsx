// WeatherReport.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, message, Space, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, CloseCircleOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setShowWeather } from '*/modules/Weather';
import './index.css';

const apiKey = 'c1a479140786d3ec386ce555a0218b7e';
const defaultCity = 'shenzhen';

const WeatherReport = () => {
  const dispatch = useDispatch();
  const showWeather = useSelector((state) => state.Weather.showWeather);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');
  const [showForecast, setShowForecast] = useState({});

  // 初次加载时获取深圳的天气数据
  useEffect(() => {
    fetchWeather(defaultCity, setWeatherData, setForecastData);
  }, []);

  // 获取天气数据函数
  const fetchWeather = async (query, setWeather, setForecast) => {
    try {
      const isCoordinates = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(query);
      const params = isCoordinates
        ? { lat: query.split(',')[0], lon: query.split(',')[1], appid: apiKey, units: 'metric' }
        : { q: query, appid: apiKey, units: 'metric' };

      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, { params });

      setWeather(prevWeather => {
        if (prevWeather.some(data => data.name.toLowerCase() === weatherResponse.data.name.toLowerCase())) {
          return prevWeather;
        }
        return [...prevWeather, weatherResponse.data];
      });

      setForecast(prevForecast => {
        if (prevForecast.some(data => data.city.name.toLowerCase() === forecastResponse.data.city.name.toLowerCase())) {
          return prevForecast;
        }
        return [...prevForecast, forecastResponse.data];
      });

      setLocation(''); // 搜索完成后清空搜索词

    } catch (error) {
      message.error('Error fetching weather data');
      console.error('Error fetching weather data:', error);
    }
  };

  // 处理搜索查询
  const handleQuery = (event) => {
    setLocation(event.target.value);
  };

  // 处理搜索操作
  const handleSearch = () => {
    fetchWeather(location, setWeatherData, setForecastData);
  };

  // 显示或隐藏预测数据
  const handleShowForecast = (index) => {
    setShowForecast(prevShowForecast => ({
      ...prevShowForecast,
      [index]: !prevShowForecast[index],
    }));
  };

  // 关闭卡片
  const handleClose = (index) => {
    setWeatherData(prevWeatherData => prevWeatherData.filter((_, i) => i !== index));
    setForecastData(prevForecastData => prevForecastData.filter((_, i) => i !== index));
  };

  // 切换所有卡片的显示状态
  const handleToggleAll = () => {
    if (weatherData.length === 0) {
      fetchWeather(defaultCity, setWeatherData, setForecastData);
    } else {
      setWeatherData([]);
      setForecastData([]);
    }
  };

  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Temperature', dataIndex: 'temp', key: 'temp' },
    { title: 'Weather', dataIndex: 'weather', key: 'weather' },
    { title: 'Max Temp', dataIndex: 'temp_max', key: 'temp_max' },
    { title: 'Min Temp', dataIndex: 'temp_min', key: 'temp_min' },
  ];

  const forecastTableData = (forecast) =>
    forecast
      ? forecast.list
          .filter(item => item.dt_txt.includes('12:00:00'))
          .map(day => ({
            key: day.dt_txt,
            date: new Date(day.dt_txt).toLocaleDateString(),
            temp: `${day.main.temp} °C`,
            weather: day.weather[0].description,
            temp_max: `${day.main.temp_max} °C`,
            temp_min: `${day.main.temp_min} °C`,
          }))
      : [];

  // 渲染箭头图标
  const renderArrow = (value1, value2) => {
    if (value1 > value2) {
      return <CaretUpOutlined style={{ color: 'red' }} />;
    } else if (value1 < value2) {
      return <CaretDownOutlined style={{ color: 'green' }} />;
    } else {
      return null;
    }
  };

  // 渲染天气卡片
  const renderWeatherBox = (data, index) => {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    return (
      <Card
        key={index}
        className="weather-box"
        title={
          <div className="weather-box-header">
            <Space align="center" style={{ width: '100%' }}>
              <img src={weatherIconUrl} alt={data.weather[0].description} style={{ width: '50px', marginRight: '16px' }} />
              <Space>
                <AlignLeftOutlined onClick={() => handleShowForecast(index)} style={{ color: '#000', backgroundColor: '#fff', borderRadius: '50%' }} />
                <CloseCircleOutlined onClick={() => handleClose(index)} style={{ color: '#000', backgroundColor: '#fff', borderRadius: '50%' }} />
              </Space>
            </Space>
          </div>
        }
      >
        {index === 0 && (  // 只有第一个卡片显示搜索功能
          <>
            <Input
              placeholder="Enter city name or coordinates"
              value={location}
              onChange={handleQuery}
              style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleSearch} style={{ marginBottom: '16px' }}>Search</Button>
          </>
        )}
        <h3>{`${data.name}`}</h3>
        <p>Temperature: {data.main.temp} °C {renderArrow(data.main.temp, weatherData[0]?.main.temp)}</p>
        <p>Feels Like: {data.main.feels_like} °C {renderArrow(data.main.feels_like, weatherData[0]?.main.feels_like)}</p>
        <p>Weather: {data.weather[0].description} {renderArrow(data.weather[0].description, weatherData[0]?.weather[0].description)}</p>
        <p>Wind Speed: {data.wind.speed} m/s {renderArrow(data.wind.speed, weatherData[0]?.wind.speed)}</p>
        <p>Wind Direction: {data.wind.deg}° {renderArrow(data.wind.deg, weatherData[0]?.wind.deg)}</p>
        <p>Pressure: {data.main.pressure} hPa {renderArrow(data.main.pressure, weatherData[0]?.main.pressure)}</p>
        {showForecast[index] && (
          <Table
            columns={columns}
            dataSource={forecastTableData(forecastData.find(f => f.city.name.toLowerCase() === data.name.toLowerCase()))}
            pagination={false}
          />
        )}
      </Card>
    );
  };

  if (!showWeather) {
    return null;
  }
  return (
    <div className="weather-report">
      <div className="weather-container">
        <Button onClick={handleToggleAll}>Toggle All Cards</Button>
        <Space direction="vertical" className="ant-space">
          {weatherData.map((data, index) => (
            <div className="ant-space-item" key={index}>
              {renderWeatherBox(data, index)} {/* 渲染每个天气卡片 */}
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default WeatherReport;
