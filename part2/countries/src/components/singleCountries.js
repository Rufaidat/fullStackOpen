import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const SingleCountry = ({ countries }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${countries.capital}&appid=e859ca9b8b5c3b5 0c8aa6e821caf7725`
      )
      .then((response) => {
        console.log(response.data);
        // setWeather(response.data);
        // console.log(weather);
      })
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default SingleCountry;
