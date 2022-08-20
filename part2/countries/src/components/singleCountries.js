import React, { useState } from "react";

const SingleCountry = ({ countries }) => {
  const [show, setShow] = useState("false");
  console.log(show);
  return (
    <div>
      <h1>{countries.name.common}</h1>
      {show ? (
        <>
          {" "}
          <h4>capital {countries.capital}</h4>
          <h4>area {countries.area}</h4>
          <h3>languages</h3>
          <ul>
            {Object.values(countries.languages).map((elem, index) => (
              <li key={index}>{elem}</li>
            ))}
          </ul>
          <img src={countries.flags.png} alt="flag" />
        </>
      ) : (
        <button onClick={() => setShow(true)}>show</button>
      )}
    </div>
  );
};

export default SingleCountry;
