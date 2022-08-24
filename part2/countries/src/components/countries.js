import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
const Countries = ({ countries }) => {
  const { name, area, capital, languages, flags } = countries;
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=e859ca9b8b5c3b50c8aa6e821caf7725`
      )
      .then((response) => {
        console.log(response.data[0].lat);
        setWeather(response.data);
        console.log(weather);
      })
      .catch((err) => console.log({ err }));
  }, []);
  return (
    <div>
      <h1>{name.common}</h1>
      {!show ? (
        <button onClick={() => setShow(true)}>show</button>
      ) : (
        <>
          {" "}
          <h1>{weather[0].lat}</h1>
          <h4>capital {capital}</h4>
          <h4>area {area}</h4>
          <h3>languages</h3>
          <ul>
            {Object.values(languages).map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <img src={flags.png} alt="flag" />
        </>
      )}
    </div>
  );
};

export default Countries;
