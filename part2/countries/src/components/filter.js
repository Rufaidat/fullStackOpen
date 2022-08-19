import React from "react";

const Filter = (props) => {
  return (
    <form onSubmit={props.addCountries}>
      find countries <input onChange={props.onChange} />
    </form>
  );
};

export default Filter;
