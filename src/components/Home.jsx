import { useState } from "react";
import CountriesList from "./CountriesList";
import FilterByRegion from "./FilterByRegion";
import SearchBox from "./SearchBox";

function Home() {
  const [query, setQuery] = useState("");

  return (
    <main>
      <div className="search-filter-container">
        <SearchBox setQuery={setQuery} />
        <FilterByRegion setQuery={setQuery} />
      </div>
      <CountriesList query={query} />
    </main>
  );
}
export default Home;
