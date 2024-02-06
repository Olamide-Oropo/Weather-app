import './styles/App.css';
import axios from "axios"
import { useState,useEffect } from 'react';
import WeatherInfo from './components/WeatherInfo';
import WeatherMainlg from './components/WeatherMainLg';
import {getCurrentWeatherInfo} from './components/getCurrentWeatherInfo';
import moon from "./assets/images/heaven-5114501_1920.jpg";
import mountain from "./assets/images/mountain-3351653_1920.jpg";


function App() {
  useEffect(() => {
    if(window.navigator.geolocation){
      window.navigator.geolocation.getCurrentPosition(data => {
          setLocation({
            ...location,
            latitude:data.coords.latitude,
            longitude:data.coords.longitude,
            status:true
          })
      },() => {
        setLocation({
          ...location,
          status:false,
          msg:"Please enable location for this services to run properly."
        })
      })
    }else{
      setLocation({
        ...location,
        status:false,
        msg:"Geolocation is not supported by this browser.",
      })
    }
  },[])
  const [location,setLocation] = useState({
    status:false,
    msg:"Loading....",
    latitude:"",
    longitude:"",
    address:""
  });
  useEffect(() => {
    if(location.status === true){
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&past_days=1&past_hours=6&forecast_days=3&forecast_hours=6past_hours=6&forecast_hours=1`)
      .then(res => setWeather(res.data))
      .catch(err => {
        setLocation({
          ...location,
          msg:err
        })
      })
      axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=25c4026626cf4e749cd09403154e0705`)
      .then(res => setLocation({
        ...location,
        address:res.data
      }))
      .catch(err => setLocation({
          ...location,
          msg:err
        }))
    }
  },[location.status])
  const [screenWidth,setScreenWidth] = useState(window.innerWidth);
  const [weather,setWeather] = useState()
  window.addEventListener("resize",() => {
    setScreenWidth(window.innerWidth)
  })
  const dict = {}
  const Arr = []
  const getAlt = (main,first,second) => {
      if(typeof main !== typeof dict || typeof main !== typeof Arr){
          return mountain
      }else{
          return main[first][second]
      }
  }
  const currentInfo = getCurrentWeatherInfo(getAlt(weather,"current","weather_code"))
  const getBg = () => {
    if(getAlt(weather,"current","is_day") === 1){
      return currentInfo.image
    }else{
      return moon
    }
  }
  const Address = () => {
    if(typeof location.address !== typeof dict){
      return "----"
    }else{
      const data = location.address["features"][0]["properties"]["city"] + "," + location.address["features"][0]["properties"]["country"]
      return data
    }
  }
  Address()
  return (
    <div className="App">
      <main>
        {
          (location.status === false) ? (
            <section className='fullsrcn'>
              <article className='alert'>
                <p>{location.msg}</p>
              </article>
            </section>
          ): null
        }
        <section className='blur-bg'>
          {
            (screenWidth > 700) ? (<img src={getBg()} alt="Main"/>):null
          }
          <section className='main-bg'>
            <img src={getBg()} alt="Main"/>
            <section className='Main-content'>
              <WeatherInfo screenWidth={screenWidth} weather={weather} Address={Address}/>
              {
              (screenWidth > 700) ? (
                <WeatherMainlg weather={weather} Address={Address}/>
              ):null
              }
            </section>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
