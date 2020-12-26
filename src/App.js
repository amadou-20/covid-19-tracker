import React, { useState, useEffect } from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent  } from '@material-ui/core';
import InfoBox from "./InfoBox";
import Map from "./Map";


function App() {
  const [country, setCountry] = useState('worldwide');
  const [countries, setCountries] = useState([]);

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

  const onCountryChange = (event) => {
    const countryCode = event.target.value;

    console.log('YOOOO >>>>', countryCode);
    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app_header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select 
          variant="outlined" onChange={onCountryChange}
          value={country}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </div>

    <div className="app_stats">
      <InfoBox title="Coronavirus Cases" cases={300} total={400} />
      <InfoBox title="Recovered" cases={100} total={300} />
      <InfoBox title="Deaths" cases={2200} total={3000} />
    </div>
   
    <Map />

</div>
  );
}

export default App;