import React, { useState, useEffect } from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent  } from '@material-ui/core';
import InfoBox from "./InfoBox";
import Map from "./Map";


function App() {
  const [country, setCountry] = useState('worldwide');
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [InputCountry, setInputCountry] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
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


    const url =
    countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
       fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setInputCountry(countryCode);
      setCountryInfo(data);
    })

  };

  return (
    <div className="app">
      <div className="app_left">
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div> 

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          { /*Table*/ }
          <h3>Worldwide new cases</h3>
          { /*Graph*/ }
          </CardContent>
      </Card>

</div>
  );
}

export default App;