import { Link } from "react-router-dom";

function CountryCard({ name, population, region, flag, capital, data }) {
  return (
    <Link to={`/${name}`} className="country-card" state={data}>
      <div className="flag-container">
        <img src={flag} alt={name + "flag"} />
      </div>
      <div className="country-details">
        <h3 className="country-title">{name}</h3>
        <p>
          <b>Population:</b> {population.toLocaleString("en-DE")}
        </p>
        <p>
          <b>Region:</b> {region}
        </p>
        <p>
          <b>Capital:</b> {capital}
        </p>
      </div>
    </Link>
  );
}
export default CountryCard;
