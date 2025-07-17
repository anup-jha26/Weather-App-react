import SearchBox from "./SearchBox"
import InfoBox from "./InfoBox";
import { useState } from 'react';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "ENTER PLACE TO GET WEATHER INFO",
        feels_like: "",
        temp: "",
        temp_max: "",
        temp_min: "",
        humidity: "",
        description: "",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>A Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    );
}