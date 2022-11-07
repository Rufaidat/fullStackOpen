import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const SingleCountry = ({ countries }) => {
  const [weather, setWeather] = useState({});
  const [all, setAll] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  let img = ``;
  // get weather forecast
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${countries.latlng[0]}&lon=${countries.latlng[1]}&appid=${apiKey}`
      )
      .then((response) => {
        setWeather(response.data);
        setAll(true);
      })
      .catch((err) => console.log({ err }));
  }, []);
  if (all) {
    img = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  }
  return (
    <div>
      {all ? (
        <>
          <h1>{countries.name.common}</h1>
          <h4>capital {countries.capital}</h4>
          <h4>area {countries.area}</h4>
          <h3>languages</h3>
          <ul>
            {Object.values(countries.languages).map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <img src={countries.flags.png} alt="flag" />
          <h1>Weather in {countries.capital}</h1>
          <>
            <p>temperature -{weather.main.temp} Celcius</p>
            <img src={img} alt="" /> <p>wind {weather.wind.speed}m/s</p>
          </>
        </>
      ) : (
        <>
          <h1>{countries.name.common}</h1>
          <h4>capital {countries.capital}</h4>
          <h4>area {countries.area}</h4>
          <h3>languages</h3>
          <ul>
            {Object.values(countries.languages).map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <img src={countries.flags.png} alt="flag" />
          <h1>Weather in {countries.capital}</h1>
        </>
      )}
    </div>
  );
};

export default SingleCountry;
