import React from "react";
const Countries = ({ countries }) => {
  return (
    <div>
      {countries.name.common}
      <button>show</button>
    </div>
  );
};

export default Countries;
