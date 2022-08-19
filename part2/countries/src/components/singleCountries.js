import React from "react";

const SingleCountry = ({ countries }) => {
  return (
    <div>
      <h1>{countries.name.common}</h1>
      <p>capital {countries.capital}</p>
      <p>area {countries.area}</p>
      <h3>languages</h3>
      {/* <ul>
        {Object.keys(countries.lanuages).map((elem, index) => (
          <li key={index}>{countries.lanuages.elem}</li>
        ))}
      </ul> */}
      <img src={countries.flags.png} alt="flag" />
    </div>
  );
};

export default SingleCountry;
