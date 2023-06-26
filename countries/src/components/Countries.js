import Country from './Country'
import CountryDetail from './CountryDetail'

const Countries = ({filter, countries}) => {

    if (filter.length === 0) {
        return <div>
            no filter
        </div>
    }

    if (countries.length > 10) {
        return (
            <p>
                too many matches, specify another filter
            </p>
        )
    }

    if (countries.length === 1) {
        return (
            // <Country country={countries[0]} />
            <CountryDetail countries={countries} />
        )
    }

    console.log(countries)
    
    return (
        <ul>
            {countries.map(country =>
                <Country 
                    key={country.name.common} 
                    country={country} 
                />
            )}
        </ul>
    )
}

export default Countries