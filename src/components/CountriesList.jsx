import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountriesListShimmer from "./CountriesListShimmer";

function CountriesList({ query }) {
  const [countriesData, setCountriesData] = useState([]);

  async function fetchCountriesData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountriesData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCountriesData();
  }, []);

  return (
    <div className="countries-container">
      {countriesData && countriesData.length ? (
        countriesData
          .filter(
            (country) =>
              country.name.common.toLowerCase().includes(query) ||
              country.region.toLowerCase().includes(query)
          )
          .map((country) => (
            <CountryCard
              key={country.cca3}
              name={country.name.common}
              population={country.population}
              region={country.region}
              flag={country.flags.svg}
              capital={country.capital?.[0]}
              data={country}
            />
          ))
      ) : (
        <CountriesListShimmer />
      )}
    </div>
  );
}

export default CountriesList;
