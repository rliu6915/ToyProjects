import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import countriesServices from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState("")

  useEffect(() => {
    countriesServices.getAll().then(response => {
      setCountries(response)
    });
  }, [])


  const handleCountryChange = (event) => {
    // console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <h2>Countries:</h2>
      <Filter 
        filter={newCountry} 
        handleFilter={handleCountryChange} 
      />·
      <h2>Results:</h2>
      <Countries
        filter={newCountry} 
        countries={countries}
      />
    </div>
  );
}

export default App;
