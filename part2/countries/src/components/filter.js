import React from "react";

const Filter = (props) => {
  return (
    <form onSubmit={props.addCountries}>
      filter shown with <input onChange={props.onChange} />
    </form>
  );
};

export default Filter;
