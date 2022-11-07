import React from "react";
import { useState } from "react";

const Countries = ({ countries }) => {
  const { name, area, capital, languages, flags } = countries;
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>{name.common}</h1>
      {!show ? (
        <button onClick={() => setShow(true)}>show</button>
      ) : (
        <>
          {" "}
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
