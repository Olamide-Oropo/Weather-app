import React from "react";
import TabHr from "./TabHr";
import { getCurrentWeatherInfo } from "./getCurrentWeatherInfo";

export default function WeatherMainlg({weather,Address}){
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
    const hourly = getAlt(weather,"hourly","time");
    const hourlyCode = getAlt(weather,"hourly","weather_code");
    const updatedHourlyCode = [...hourlyCode];
    const hourlyTemp = getAlt(weather,"hourly","temperature_2m");
    const updatedHourly = [...hourly];
    const updatedHourlyTemp = [...hourlyTemp]
    return(
        <>
            <section className="weather-main">
                <h4 className="tab-hr loc-lg">{Address()}</h4>
                <section className="main-info">
                    <article className="tab-hr">
                        <p>{getAlt(weather,"current","wind_speed_10m")}{getAlt(weather,"current_units","wind_speed_10m")}</p>
                        <p>Wind Speed</p>
                    </article>
                    <article className="tab-hr">
                        <p>{getAlt(weather,"current","relative_humidity_2m")}{getAlt(weather,"current_units","relative_humidity_2m")}</p>
                        <p>Humidity</p>
                    </article>
                    <article className="tab-hr">
                        <p>{getAlt(weather,"current","precipitation")}{getAlt(weather,"current_units","precipitation")}</p>
                        <p>Precipitation</p>
                    </article>
                </section>
                <section>
                    <h5>Weather Changes By The Hour</h5>
                    <section className="hourly-forecast">
                        {
                            updatedHourly.map((item,index) => {
                                const time = item.split("T")
                                return <TabHr icon={getCurrentWeatherInfo(updatedHourlyCode[index]).icon} temp={Number(updatedHourlyTemp[index]).toFixed(0)} time={time[1]} key={item + index}/>
                            })
                        }
                    </section>
                </section>
            </section>
        </>
    )
}