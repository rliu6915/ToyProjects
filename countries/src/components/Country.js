const Country = ({country}) => {
    // console.log(country)
    return (
        <li>
            {country.name.common}
        </li>
    )
}
export default Country