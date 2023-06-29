import CountryDetail from "./CountryDetail"
import { useState } from "react"

const Country = ({country}) => {
    const [showCountry, setShowCountry] = useState(false);

    const handleClick = () => {
        setShowCountry(!showCountry)
    }

    return (
        <li>
            {country.name.common}
            <button value={country.name.commo} onClick={handleClick}>
                show
            </button>
            {showCountry && <CountryDetail country={country} />}
        </li>
    )
}
export default Country