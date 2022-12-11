import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FcPlus, FcCalculator } from "react-icons/fc";

import { RiHome4Line } from "react-icons/ri";

import "./style.css";
import { FaUser, FaAddressCard, FaRoute } from "react-icons/fa";
import { useState } from "react";
import { baseUrl } from "../../config";

let flag_token = false;

const Nav = () => {
  const [, login_token] = useState("");
  const [complete_name, setcomplete_name] = useState("");
  useEffect(() => {
    const url2 = `${baseUrl}/wp-json/wp/v2/users/me/`;
    fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer" + sessionStorage.jwt,
      },
    })
      .then((response) => response.json())
      .then(function (user) {
        if (!flag_token) {
          login_token((flag_token = true));
          // console.log("user: ", user)
          setcomplete_name(user.name);
        }
      });
  });
  return (
    <div className="nav">
      <ul className="nav-links">
        {/* <Link to="/Calculator" className="link">
          <li>
            <FcCalculator style={{ fontSize: "24px" }} />
            &nbsp;&nbsp; פעולות נוספות
          </li>
        </Link>
        <Link to="/student" className="link">
          <li>
            <FaAddressCard style={{ fontSize: "24px" }} />
            &nbsp;&nbsp;עובדים{" "}
          </li>
        </Link>
        <Link to="/routes_cards" className="link">
          <li>
            <FaRoute style={{ fontSize: "24px" }} />
            &nbsp;&nbsp;מסלולים{" "}
          </li>
        </Link>
        <Link to="/planner" className="link">
          <li>
            <FcPlus style={{ fontSize: "24px" }} /> &nbsp;&nbsp;הוסף מסלול{" "}
          </li>
        </Link> */}
        <Link to="/Dashboard">
          <div className="home"></div>
        </Link>
      </ul>
      <div className="userName">{complete_name}</div>
      <div className="myUser"></div>
    </div>
  );
};
export default Nav;
//----------------------------------------
