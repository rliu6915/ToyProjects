import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = ({filter, countries}) => {

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if (filter.length === 0) {
        return <div>
            no filter
        </div>
    }

    if (filteredCountries.length > 10) {
        return (
            <p>
                too many matches, specify another filter
            </p>
        )
    }

    if (filteredCountries.length === 1) {
        return (
            <CountryDetail country={filteredCountries[0]} />
        )
    }
    
    return (
        <ul>
            {filteredCountries.map(country =>
                <Country 
                    key={country.name.common}
                    country={country} 
                />
            )}
        </ul>
    )
}

export default Countries