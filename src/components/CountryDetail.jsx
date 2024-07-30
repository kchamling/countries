import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

import "./CountryDetail.css";
import CountryDetailShimmer from "./CountryDetailShimmer";

function CountryDetail() {
  const { state } = useLocation();
  const { country } = useParams();
  const navigate = useNavigate();

  const [countryData, setCountryData] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [notFound, setNotFound] = useState(false);

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      flag: data.flags.svg,
      tld: data.tld,
      languages: Object.values(data.languages || {}).join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      borders: data.borders || [],
    });

    if (data.borders && data.borders.length > 0) {
      fetchBorderCountries(data.borders);
    }
  }

  async function fetchCountryData() {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`
      );
      const data = await response.json();

      return data[0];
    } catch (error) {
      console.log(error);
      setNotFound(true);
    }
  }

  async function fetchBorderCountries(borders) {
    try {
      const responses = await Promise.all(
        borders.map((border) =>
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        )
      );

      const borderData = await Promise.all(responses.map((res) => res.json()));

      const borderNames = borderData.map((data) => data[0]?.name.common);
      setBorderCountries(borderNames);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }
    fetchCountryData().then((data) => {
      if (data) {
        updateCountryData(data);
      }
    });
  }, [country, state]);

  if (notFound) {
    return <div>Country Not Found</div>;
  }

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="country-details-container">
        <span className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeftLong />
          &nbsp; Back
        </span>

        {countryData === null ? (
          <CountryDetailShimmer />
        ) : (
          <div className="country-detail">
            <img src={countryData.flag} alt={`${countryData.name} flag`} />

            <div className="details-text-container">
              <h1>{countryData.name}</h1>

              <div className="country-details-text">
                <div className="left">
                  <p>
                    <b>
                      Native Name: {countryData.nativeName || countryData.name}
                    </b>
                    <span className="native-name"></span>
                  </p>
                  <p>
                    <b>
                      Population:{" "}
                      {countryData.population.toLocaleString("en-IN")}
                    </b>
                    <span className="population"></span>
                  </p>
                  <p>
                    <b>Region: {countryData.region}</b>
                    <span className="region"></span>
                  </p>
                  <p>
                    <b>Sub Region: {countryData.subregion}</b>
                    <span className="sub-region"></span>
                  </p>
                  <p>
                    <b>Capital: {countryData.capital?.join(", ")}</b>
                    <span className="capital"></span>
                  </p>
                </div>

                <div className="right">
                  <p>
                    <b>Top Level Domain: {countryData.tld}</b>
                    <span className="top-level-domain"></span>
                  </p>
                  <p>
                    <b>Currencies: {countryData.currencies}</b>
                    <span className="currencies"></span>
                  </p>
                  <p>
                    <b>Languages: {countryData.languages}</b>
                    <span className="languages"></span>
                  </p>
                </div>
              </div>

              {borderCountries.length > 0 && (
                <div className="border-countries">
                  <b>Border Countries:</b>&nbsp;
                  {borderCountries.map((border) => (
                    <Link key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
export default CountryDetail;
