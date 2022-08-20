import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import Countries from "./components/countries";
import SingleCountry from "./components/singleCountries";

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
  // use useeffect to change the state of countries
  useEffect(hook, []);
  // function for change in filter value
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // check if countries name include the fiter input value
  const toShow = countries.filter((elem) => elem.name.common.includes(filter));
  console.log(toShow);

  // assign countries that contain the filter value to a variable
  const countriesToShow =
    toShow.length < 10
      ? toShow
      : [{ name: { common: "Too many matches, specify another filter" } }];
  console.log(countriesToShow);

  return (
    <div>
      <Filter onChange={handleFilterChange} />
      <div>
        {/* {if(countriesToShow.length===1){
<SingleCountry countries={countries}/>
        }else{
          countriesToShow.map((countries, index) => (
            <Countries key={index} countries={countries} />
          ))
        }} */}
        {/* {countriesToShow.map((countries, index) => (
          // <Countries key={index} countries={countries} />
          <SingleCountry key={index} countries={countries} />
        ))} */}
        {toShow.length === 1 ? (
          <SingleCountry countries={toShow[0]} />
        ) : toShow.length > 10 ? (
          "Too many searches, specify another filter"
        ) : (
          toShow.map((country, index) => (
            <SingleCountry key={index} countries={country} />
            // <Countries key={index} countries={country} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
