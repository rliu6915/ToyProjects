import { useEffect, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';
import countriesServices from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState("")

  // console.log(countries)
  const filteredCountries = newCountry.length === 0 ? countries 
  : countries.filter(country => country.name.common.toLowerCase().includes(newCountry.toLowerCase()))
  // console.log(filteredCountries)

  useEffect(() => {
    countriesServices.getAll().then(response => {
      setCountries(response)
    });
  }, [])


  const handleCountryChange = (event) => {
    console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <h2>Countries:</h2>
      <Filter 
        newCountry={newCountry} 
        handleCountryChange={handleCountryChange} 
      />
      <h2>Results:</h2>
      <Countries
        filter={newCountry}
        countries={filteredCountries}
      />
    </div>
  );
}

export default App;
