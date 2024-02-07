import axios from "axios"

const API_link =
  "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true";
export function getWeather(latitude, longitude, timezone) {
    return axios.get(API_link, { params: {
        latitude,
        longitude,
        timezone
    }}).then(({data}) => {
        return {
            current: parseCurrentWeather(data),
            // daily: parseDailyWeather(data),
            // hourly: parseHourlyWeather(data),
        }
    })
}
function parseCurrentWeather({current_weather, daily}) {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode
    } = current_weather;
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_2m_max: [maxFeelsLikeTemp],
        apparent_temperature_2m_min: [minFeelsLikeTemp],
        precipitation: [precip] 
    } = daily;
    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLikeTemp),
        lowFeelsLike: Math.round(minFeelsLikeTemp),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip),
        iconCode
    }
}