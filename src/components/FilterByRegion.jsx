function FilterByRegion({ setQuery }) {
  return (
    <div className="filter-by-region">
      <select
        onChange={(e) => {
          setQuery(e.target.value.toLowerCase());
        }}
      >
        <option value="Filter by Region" hidden>
          Filter by Region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
export default FilterByRegion;
