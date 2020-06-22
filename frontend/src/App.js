import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  const [searchText, changeSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState('imperial');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState('');

  // Start with a default zip code as a placeholder
  useEffect(
    () => {
      fetchWeatherData(90024, 'imperial');
      setLoading(false);
    }, []);

  const navbarSearchChange = (event) => {
    const { value } = event.target;
    // Do not allow for typing of more than 5 numbers
    if (value.length <= 5) {
      changeSearchText(value);
    }
  }

  const navbarSearchSubmission = () => {
    // Basic zip code validation all numbers and 5 digits regex
    if (/^\d{5}$/.test(searchText)) {
      fetchWeatherData(searchText, units);
    } else {
      setError('Invalid zip code.');
    }

    navbarSearchClear();
  }

  const fetchWeatherData = async (zipCode, units) => {
    let data = await fetch(`http://localhost:8080/api/weather/${zipCode}/${units}`, {mode: 'cors'});
    if (data.status === 200) {
      data = await data.json();
      setWeather(data);
      return;
    }

    // Error
    data = await data.json();
    setError(data);
  }

  const navbarSearchClear = () => {
    changeSearchText('');
  }

  // use Effect to do initial page search query and future api calls

  return (
    <div className="App">
      <Navbar
        onChange={navbarSearchChange}
        value={searchText}
        onSubmit={navbarSearchSubmission}
        onClear={navbarSearchClear}
      />
        Current weather here
    </div>
  );
}

export default App;
