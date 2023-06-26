const Filter = ({newFilter, handleCountryChange }) => (
    <div>
        find countries:
        <input
            value={newFilter}
            onChange={handleCountryChange}
        />
    </div>
)
export default Filter