

const CountryDetail = ({countries}) => {
    return (
        <div>
            <h2>{countries[0].name.common}</h2>
            <p>capital: {countries[0].capital[0]}</p>
            <p>population: {countries[0].population}</p>
            <h3>languages</h3>
            <ul>
                {Object.values(countries[0].languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={countries[0].flags.png} alt="flag" width="200" height="200" />
        </div>
    )
}

export default CountryDetail;