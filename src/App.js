import React from "react";
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent  } from '@material-ui/core';

function App() {

  return (
    <div className="App">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select 
          variant="outlined"
          value="abc"
        >
         <MenuItem value="worldwide">Worldwide</MenuItem>
         <MenuItem value="worldwide">option 2</MenuItem>
         <MenuItem value="worldwide">option 3</MenuItem>
         <MenuItem value="worldwide">Deeeeeew</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
