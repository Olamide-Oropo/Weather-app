import React from "react";
import Tab from "./Tab";
import { getCurrentWeatherInfo } from "./getCurrentWeatherInfo";
import Humidity from "../assets/svg/humidity-svgrepo-com.svg";
import Precipitation from "../assets/svg/umbrella-svgrepo-com.svg";
import Wind from "../assets/svg/direction-wind-speed-navigation-svgrepo-com.svg";
import cloud from "../assets/svg/cloud-rain-alt-1-svgrepo-com.svg"

export default function WeatherInfo({screenWidth,weather,Address}){
    const alt = "----";
    const dict = {}
    const Arr = []
    const getAlt = (main,first,second) => {
        if(typeof main !== typeof dict || typeof main !== typeof Arr){
            return alt
        }else{
            return main[first][second]
        }
    }
    const date = getAlt(weather,"current","time").split("T")
    const daily = getAlt(weather,"daily","time")
    const dailyCode = getAlt(weather,"daily","weather_code")
    const updatedDaily = [...daily]
    const updatedDailyCode = [...dailyCode]
    const maxtemps = [...getAlt(weather,"daily","temperature_2m_max")]
    const mintemps = [...getAlt(weather,"daily","temperature_2m_min")]
    const currentInfo = getCurrentWeatherInfo(getAlt(weather,"current","weather_code"))
    return(
        <>
            <aside>
                <h2>{Number(getAlt(weather,"current","temperature_2m")).toFixed(0)}{getAlt(weather,"current_units","temperature_2m")}</h2>
                {
                    (screenWidth < 700) ?(
                        <h2 className="loc">{Address()}</h2>
                    ):null
                }
                <section className="date">
                    <p>{date[0]}</p>
                    <p className="vr">|</p>
                    <p>{date[1]}</p>
                </section>
                <section className="tab info-content">
            	        <article>
                            <img src={Wind} alt="Wind Speed"/>
                            <p>{getAlt(weather,"current","wind_speed_10m")}{getAlt(weather,"current_units","wind_speed_10m")}</p>
                        </article>
            	        <article>
                            <img src={Humidity} alt="Humidity"/>
                            <p>{getAlt(weather,"current","relative_humidity_2m")}{getAlt(weather,"current_units","relative_humidity_2m")}</p>
                        </article>
            	        <article>
                            <img src={Precipitation} alt="Precipitation" />
                            <p>{getAlt(weather,"current","precipitation")}{getAlt(weather,"current_units","precipitation")}</p>
                        </article>
                </section>
                <section className="activities">
                    <h3>Weather Description</h3>
                    <section className="activity-row">
                        <Tab text={currentInfo.decsr}/>
                    </section>
                </section>
                <section className="forecast">
                    <h3>4 Day Forecast</h3>
                    <section>
                        {
                            updatedDaily.map((item,index) => (
                                <article key={item + index} className="forecast-item">
                                    <img src={getCurrentWeatherInfo(updatedDailyCode[index]).icon} alt="cloud"/>
                                    <p>{item}</p>
                                    <span>
                                        <p>{Number(maxtemps[index]).toFixed(0)} &deg;C</p>
                                        <p>{Number(mintemps[index]).toFixed(0)} &deg;C</p>
                                    </span>
                                </article>
                            ))
                        }
                    </section>

                </section>
            </aside>
        </>
    )
}