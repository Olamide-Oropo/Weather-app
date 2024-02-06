import Clear_sky from "../assets/images/mountain-3351653_1920.jpg"
import Clear_sky_icon from "../assets/svg/cloud-sun-alt-svgrepo-com.svg";
import Partly_clear from "../assets/images/clouds-384672_1920.jpg";
import Partly_clear_icon from "../assets/svg/cloudy-sky-svgrepo-com.svg";
import Fog from "../assets/images/mountain-547363_1920.jpg";
import Fog_icon from "../assets/svg/cloud-fog-svgrepo-com.svg";
import Rain from "../assets/images/raindrops-3216607_1920.jpg";
import Rain_icon from "../assets/svg/cloud-rain-alt-1-svgrepo-com.svg";
import Winter from "../assets/images/winter-4698763_1920.jpg";
import Winter_icon from "../assets/svg/cloud-snow-alt-svgrepo-com.svg";
import bolt_icon from "../assets/svg/cloud-bolt-svgrepo-com.svg";
import Default from "../assets/svg/cloudy-svgrepo-com.svg"

function fillInfo(descr,image,icon){
    const Info = {
        decsr:descr,
        image:image,
        icon:icon
    }
    return Info
}
function getInfo(code){
    switch(code){
        case 0:
            return fillInfo("Clear sky",Clear_sky,Clear_sky_icon)
        case 1:
            return fillInfo("Mainly clear",Partly_clear,Partly_clear_icon)
        case 2:
            return fillInfo("partly cloudy",Partly_clear,Partly_clear_icon)
        case 3:
            return fillInfo("partly cloudy",Partly_clear,Partly_clear_icon)
        case 45:
            return fillInfo("Fog",Fog,Fog_icon)
        case 48:
            return fillInfo("Depositing rime fog",Fog,Fog_icon)
        case 51:
            return fillInfo("Light Drizzle",Rain,Rain_icon)
        case 53:
            return fillInfo("moderate Drizzle",Rain,Rain_icon)
        case 55:
            return fillInfo("dense intensity Drizzle",Rain,Rain_icon)
        case 56:
            return fillInfo("Light Freezing Drizzle",Rain,Rain_icon)
        case 57:
            return fillInfo("dense intensity Freezing Drizzle",Rain,Rain_icon)
        case 61:
            return fillInfo("Slight Rain",Rain,Rain_icon)
        case 63:
            return fillInfo("moderate Rain",Rain,Rain_icon)
        case 65:
            return fillInfo("heavy intensity Rain",Rain,Rain_icon)
        case 66:
            return fillInfo("Light Freezing Rain",Rain,Rain_icon)
        case 67:
            return fillInfo("heavy intensity Freezing Rain",Rain,Rain_icon)
        case 71:
            return fillInfo("Slight Snow fall",Winter,Winter_icon)
        case 73:
            return fillInfo("moderate Snow fall",Winter,Winter_icon)
        case 75:
            return fillInfo("heavy intensity Snow fall",Winter,Winter_icon)
        case 77:
            return fillInfo("Snow grains",Winter,Winter_icon)
        case 80:
            return fillInfo("Slight Rain showers",Rain,Rain_icon)
        case 81:
            return fillInfo("moderate Rain showers",Rain,Rain_icon)
        case 82:
            return fillInfo("violent Rain showers",Rain,Rain_icon)
        case 85:
            return fillInfo("slight Snow showers",Winter,Winter_icon)
        case 86:
            return fillInfo("heavy Snow showers",Winter,Winter_icon)
        case 95:
            return fillInfo("moderate Thunderstorm",Rain,bolt_icon)
        case 96:
            return fillInfo("Thunderstorm with slight hail",Rain,bolt_icon)
        case 99:
            return fillInfo("Thunderstorm with heavy hail",Rain,bolt_icon)
        default:
            return fillInfo("No weather Description",Clear_sky,Default)
    }
}
export function getCurrentWeatherInfo(code){
    return getInfo(code)
}