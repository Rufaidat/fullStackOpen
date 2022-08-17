import React from "react";
const Countries = ({ countries }) => {
  return <div key={countries.id}>{countries.name.common}</div>;
};

export default Countries;
