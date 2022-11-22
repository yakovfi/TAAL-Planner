import React, { useState, useEffect } from "react";
import "./Modal.css";
import { baseUrl } from "../../config";
import Dot from "../Dot/Dot";
//--------------------------
let getPicture, getSound;
let ichour = "אישור";
let flagClickOK = false;
let flag_token = false;
//--------------------------
const Modal_Help = ({ setModalOpen, idTasks }) => {
  const [, login_token] = useState("");
  const [complete_name, setcomplete_name] = useState("");
  useEffect(() => {
    const url = `${baseUrl}/wp-json/wp/v2/users/me/`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer" + sessionStorage.jwt,
      },
    })
      .then((response) => response.data.json())
      .then(function (user) {
        if (!flag_token) {
          login_token((flag_token = true));
          console.log("user: ", user);
          setcomplete_name(user.name);
        }
      });
  });
  const [, setDone] = useState(false);
  const [get_title, settitle] = useState("");
  const [, setPicture] = useState(null);
  const [, setSound] = useState(null);
  const [getDescription, setDescription] = useState("");
  const [, setFlagClickOK] = useState(false);
  //----------------------------------

  return (
    <>
      <div className="modalContainerHelp">
        <div className="titleCloseBtnPlases">
          <button
            className="cancelCovar"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <div className="closeModal">x</div>
          </button>
        </div>

        <div className="HelpTxt">נשלחה בקשה למסיייע/ת {complete_name}</div>
      </div>
    </>
  );
};
export default Modal_Help;
