import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Table, message, Space, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, CloseCircleOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { useTranslation } from 'react-i18next';

const apiKey = 'c1a479140786d3ec386ce555a0218b7e';
const googleApiKey = 'AIzaSyDPZ4k5RYBzlTnGpl4ps5Q1XNOLuYLK6Mk';
const defaultCity = 'shenzhen';

const WeatherReport = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const showWeather = useSelector((state) => state.Weather.showWeather);
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');
  const [showForecast, setShowForecast] = useState({});

  useEffect(() => {
    fetchWeather(defaultCity);
  }, []);

  const translateText = async (text, targetLang = 'en') => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${googleApiKey}`;

    try {
      const response = await axios.post(url, {
        q: text,
        target: targetLang,
      });

      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
      return text;
    }
  };

  const fetchWeather = async (query) => {
    try {
      const isCoordinates = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(query);
      let translatedQuery = query;

      if (!isCoordinates && /[\u4e00-\u9fa5]/.test(query)) {
        translatedQuery = await translateText(query, 'en'); // 将中文城市名翻译成英文进行搜索
      }

      const params = isCoordinates
        ? { lat: translatedQuery.split(',')[0], lon: translatedQuery.split(',')[1], appid: apiKey, units: 'metric' }
        : { q: translatedQuery, appid: apiKey, units: 'metric' };

      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, { params });
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, { params });

      const originalCity = weatherResponse.data.name;

      // 将城市名称和天气描述翻译回中文
      const translatedCity = await translateText(originalCity, 'zh');
      const translatedWeather = await translateText(weatherResponse.data.weather[0].description, 'zh');

      // 更新数据中的地名和天气描述
      weatherResponse.data.name = translatedCity;
      weatherResponse.data.weather[0].description = translatedWeather;

      setWeatherData((prevWeather) => {
        if (prevWeather.some((data) => data.originalCity.toLowerCase() === originalCity.toLowerCase())) {
          return prevWeather;
        }
        return [...prevWeather, { ...weatherResponse.data, originalCity }];
      });

      // 翻译 forecast 中的 weather 描述
      const translatedForecast = await Promise.all(
        forecastResponse.data.list.map(async (item) => {
          const translatedWeather = await translateText(item.weather[0].description, 'zh');
          return {
            ...item,
            weather: [{ ...item.weather[0], description: translatedWeather }]
          };
        })
      );

      forecastResponse.data.list = translatedForecast;

      setForecastData((prevForecast) => {
        if (prevForecast.some((data) => data.city.name.toLowerCase() === originalCity.toLowerCase())) {
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

  const handleQuery = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    fetchWeather(location);
  };

  const handleShowForecast = (index) => {
    setShowForecast((prevShowForecast) => ({
      ...prevShowForecast,
      [index]: !prevShowForecast[index],
    }));
  };

  const handleClose = (index) => {
    setWeatherData((prevWeatherData) => prevWeatherData.filter((_, i) => i !== index));
    setForecastData((prevForecastData) => prevForecastData.filter((_, i) => i !== index));
  };

  const columns = [
    { title: t('Date'), dataIndex: 'date', key: 'date' },
    { title: t('Temperature'), dataIndex: 'temp', key: 'temp' },
    { title: t('Weather'), dataIndex: 'weather', key: 'weather' }, // 显示已翻译的天气描述
    { title: t('MaxTemp'), dataIndex: 'temp_max', key: 'temp_max' },
    { title: t('MinTemp'), dataIndex: 'temp_min', key: 'temp_min' },
  ];

  const forecastTableData = (forecast) =>
    forecast
      ? forecast.list
          .filter((item) => item.dt_txt.includes('12:00:00'))
          .map((day) => ({
            key: day.dt_txt,
            date: new Date(day.dt_txt).toLocaleDateString(),
            temp: `${day.main.temp} °C`,
            weather: day.weather[0].description,
            temp_max: `${day.main.temp_max} °C`,
            temp_min: `${day.main.temp_min} °C`,
          }))
      : [];

  const getWindDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) return t('North') + "风";
    if (deg >= 22.5 && deg < 67.5) return t('Northeast') + "风";
    if (deg >= 67.5 && deg < 112.5) return t('East') + "风";
    if (deg >= 112.5 && deg < 157.5) return t('Southeast') + "风";
    if (deg >= 157.5 && deg < 202.5) return t('South') + "风";
    if (deg >= 202.5 && deg < 247.5) return t('Southwest') + "风";
    if (deg >= 247.5 && deg < 292.5) return t('West') + "风";
    if (deg >= 292.5 && deg < 337.5) return t('Northwest') + "风";
  };

  const renderArrow = (value1, value2) => {
    if (value1 > value2) {
      return <CaretUpOutlined className="arrow-up" />;
    } else if (value1 < value2) {
      return <CaretDownOutlined className="arrow-down" />;
    } else {
      return null;
    }
  };

  const renderWeatherBox = (data, index) => {
    const weatherIconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    const forecast = forecastData.find(
      (f) => f.city.name.toLowerCase() === data.originalCity.toLowerCase()
    );

    return (
      <Card
        key={index}
        className="weather-box"
        title={
          <div className="weather-box-header">
            <Space align="center" className="weather-box-space">
              <img src={weatherIconUrl} alt={data.weather[0].description} className="weather-icon" />
              <Space className={`action-icons ${index === 0 ? 'first-card' : 'other-card'}`}>
                <AlignLeftOutlined onClick={() => handleShowForecast(index)} className="action-icon align-icon" />
                {index !== 0 && (
                  <CloseCircleOutlined onClick={() => handleClose(index)} className="action-icon close-icon" />
                )}
              </Space>
            </Space>
          </div>
        }
      >
        {index === 0 && (
          <>
            <Input
              placeholder={t('Entercityname')}
              value={location}
              onChange={handleQuery}
              className="search-input"
            />
            <Button type="primary" onClick={handleSearch} className="search-button">{t('Search')}</Button>
          </>
        )}
        <h3 className="nameh3">{`${data.name}`}</h3>
        <div className="weather-details">
          <div className="weather-column">
            <p>
              <span className='iconfont icon-temperature' /> {t("Temperature")}: {data.main.temp} °C {renderArrow(data.main.temp, weatherData[0]?.main.temp)}
            </p>
            <p>
              <span className='iconfont icon-feelslike' /> {t("FeelsLike")}: {data.main.feels_like} °C {renderArrow(data.main.feels_like, weatherData[0]?.main.feels_like)}
            </p>
            <p>
              <span className='iconfont icon-weather' /> {t("Weather")}: {data.weather[0].description}
            </p>
            <p>
              <span className='iconfont icon-humidity' /> {t("Humidity")}: {data.main.humidity}% {renderArrow(data.main.humidity, weatherData[0]?.main.humidity)}
            </p>
          </div>
          <div className="weather-column">
            <p>
              <span className='iconfont icon-rain' /> {t("Rain")}: {data.rain ? `${data.rain['1h']} mm` : '0 mm'}  {renderArrow(data.rain ? data.rain['1h'] : 0, weatherData[0]?.rain ? weatherData[0].rain['1h'] : 0)}
            </p>
            <p>
              <span className='iconfont icon-windspeed' /> {t("WindSpeed")}: {data.wind.speed} m/s {renderArrow(data.wind.speed, weatherData[0]?.wind.speed)}
            </p>
            <p>
              <span className='iconfont icon-winddirection' /> {t("WindDirection")}: {getWindDirection(data.wind.deg)}
            </p>
            <p>
              <span className='iconfont icon-pressure' /> {t("Pressure")}: {data.main.pressure} hPa {renderArrow(data.main.pressure, weatherData[0]?.main.pressure)}
            </p>
          </div>
        </div>
        {showForecast[index] && forecast && (
          <Table
            columns={columns}
            dataSource={forecastTableData(forecast)}
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
        <Space direction="vertical" className="ant-space">
          {weatherData.map((data, index) => (
            <div className="ant-space-item" key={index}>
              {renderWeatherBox(data, index)}
            </div>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default WeatherReport;
