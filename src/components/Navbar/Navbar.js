import SearchBar from "../SearchBar/SearchBar";
import { FaBell } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { FaUser } from "react-icons/fa";

import "./style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div
        className="userImage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "50px",
        }}
      >
        <FaUser />
      </div>
      <SearchBar />
      <div className="links">
        <a href="/groups">יצירת קבוצות</a>
        <div className="iconNavbar">
          <GoChecklist style={{ fill: "white" }} />
        </div>

        <div className="line">|</div>

        <a href="/messages">הודעות </a>
        <div className="iconNavbar">
          <FaBell style={{ fill: "white" }} />
        </div>

        <div className="line">|</div>

        <a href="/profile">הפרופיל שלי </a>
        <div className="iconNavbar">
          <GoPerson style={{ fill: "white" }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
