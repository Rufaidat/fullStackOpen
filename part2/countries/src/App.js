import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import Countries from "./components/countries";
import SingleCountry from "./components/singleCountries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState({});

  //fetch data from db.json
  const hook = () => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  };
  // use useeffect to change the state of countries
  useEffect(hook, []);
  // function for change in filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // check if countries name include the fiter input value
  const toShow = countries.filter((elem) =>
    elem.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Filter onChange={handleFilterChange} />
      <div>
        {toShow.length > 10 ? (
          "Too many searches, specify another filter"
        ) : toShow.length === 1 ? (
          <SingleCountry countries={toShow[0]} weather={weather} />
        ) : (
          toShow.map((country, index) => (
            <Countries key={index} countries={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
