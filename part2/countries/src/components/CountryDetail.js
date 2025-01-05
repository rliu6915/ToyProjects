import Weather from "./Weather";

const CountryDetail = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital[0]}</p>
            <p>population: {country.population}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt="flag" width="200" height="200" />
            <Weather capital={country.capital[0]} />
        </div>
    )
}

export default CountryDetail;