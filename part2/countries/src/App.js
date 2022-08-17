import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import Countries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  //fetch data from db.json
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data[0].name.common);
      setCountries(response.data);
    });
  };
  // use useeffect to change the state of persons
  useEffect(hook, []);

  // function for change in filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // check if persons name include the fiter input value
  // const toShow = countries.every((elem) => elem.name.common.includes(filter));

  const filteredCountries = countries.filter((elem) =>
    elem.name.common.includes(filter)
  );

  //assign persons that contain the filter value to a variable
  // let countriesToShow =
  //   filteredCountries > 10 ? ["too many countries to show"] : filteredCountries;
  const countriesToShow =
    filteredCountries.length > 10
      ? [{ name: "too many countries to show", id: 1 }]
      : countries.filter((elem) => elem.name.common.includes(filter));
  return (
    <div>
      <Filter onChange={handleFilterChange} />;
      <div>
        {countriesToShow.map((countries) => (
          <Countries countries={countries} />
        ))}
      </div>
    </div>
  );
};

export default App;
