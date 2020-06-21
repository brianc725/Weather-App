import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './App.css';

function App() {

  const [searchText, changeSearchText] = useState("");

  const navbarSearchChange = (event) => {
    const { value } = event.target;
    // Do not allow for typing of more than 5 numbers
    if (value.length <= 5) {
      changeSearchText(value);
    }
  }

  const navbarSearchSubmission = () => {
    // Basic zip code validation all numbers and 5 digits regex
    console.log(searchText);
    // Otherwise if good, do API call and check response status

    navbarSearchClear();
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
