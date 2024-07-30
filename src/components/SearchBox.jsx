import { FaSearch } from "react-icons/fa";

function SearchBox({ query, setQuery }) {
  return (
    <div className="search-box">
      <input
        type="text"
        name=""
        id=""
        placeholder="Search for a country..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />
      <FaSearch className="search-icon" />
    </div>
  );
}
export default SearchBox;
