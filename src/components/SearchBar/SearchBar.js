import "./style.css";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="boxContainer">
      <table className="elementsContainer">
        <tbody>
          <tr>
            <td>
              <input type="text" className="searchBarInput" />
            </td>
            <td>
              <a href="/" className="searchButton">
                <BiSearch style={{ width: "1.8em", height: "1.8em" }} />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchBar;
