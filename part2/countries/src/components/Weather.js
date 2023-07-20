import React, { useState, useEffect } from 'react'
import weatherServices from '../services/weather'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({});

    useEffect(() => {
        weatherServices
            .getOneCity(capital)
            .then(response => {
                // console.log(response)
                setWeather(response);
            })
    }, [capital]);

    // console.log(weather)

    if (Object.keys(weather).length === 0) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p>loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>temperature: {weather.main.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>wind: {weather.wind.speed} mph direction {weather.wind.deg}</p>
        </div>
    )
}

export default Weather