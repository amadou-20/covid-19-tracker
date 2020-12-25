import React, { useState, useEffect } from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent  } from '@material-ui/core';

function App() {

  const [countries, setCountries] = useState([
    'USA','UK','INDIA','SENEGAL','JAPON'
  ]);
  // https://disease.sv/v3/covid-19/countries

  useEffect(() => {
    // async --> send a request, wait for it, do something with
    const getCountriesData = async() => {
    await  fetch("https://disease.sh/v3/covid-19/countries")
       .then((reponse) => reponse.json())
       .then((data) => {
         const countries = data.map((country) => ({
         name: country.country, // united states, united kingdom
         value: country.countryInfo.iso2 // USA, UK, FR
         }));

      setCountries(countries);
       });
    }
    getCountriesData();
  }, [countries]);

  return (
    <div className="App">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select 
          variant="outlined"
          value="abc"
        >
          {countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default App;