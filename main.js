import "./style.css";
import { getWeather } from "./weather.js";

const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
getWeather(10, 10, timeZone).then(weather => console.log('weather', weather));