import React, { useState } from "react";
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";
import { RiAsterisk } from "react-icons/ri";
import { BsExclamationLg } from "react-icons/bs";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";

//--------------------------
let getPicture, getSound;
let ichour = "אישור";
let flagClickOK = false;
//--------------------------
const Modal_Stations = ({ setOpenModalPlaces, idTasks }) => {
  const [, setDone] = useState(false);
  const [get_title, settitle] = useState("");
  const [, setPicture] = useState(null);
  const [, setSound] = useState(null);
  const [getDescription, setDescription] = useState("");
  const [, setFlagClickOK] = useState(false);
  //----------------------------------

  const handleTitleInput = (e) => {
    settitle(e.target.value);
  };
  //----------------------------------

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  //----------------------------------

  const handleFileInput = (e) => {
    // handle validations
    const file = e.target.files[0];

    if (file.type.includes("image")) {
      setPicture((getPicture = file));
      // console.log(file)
    }

    if (file.type.includes("audio")) {
      setSound((getSound = file));
      // console.log(file)
    }
  };
  //----------------------------------

  function Post_Station() {
    if (get_title === "" || getDescription === "") {
      alert("עליך למלא שדות חובה המסומנים בכוכבית");
    } else {
      setFlagClickOK((flagClickOK = true));
      let url_post = `${baseUrl}/wp-json/wp/v2/places/`;
      fetch(url_post, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },

        body: JSON.stringify({
          name: get_title,
          description: getDescription,
          parent: idTasks,
          fields: {
            audio: getSound,
            image: getPicture,
          },
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (post) {
          // get_Route_ID = post.id
          setDone(true);

          // alert(get_Route_ID)
          // console.log(post)
          setFlagClickOK((flagClickOK = false));
          window.location.replace("/planner");
        });
    }
  }
  return (
    <>
      {idTasks === 0 ? (
        <>
          <div className="BackgroundPlasesNoClick">
            <div className="modalContainerPlases">
              <div className="titleCloseBtnPlases">
                <button
                  onClick={() => {
                    setOpenModalPlaces(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="title">
                <h1>
                  <BsExclamationLg style={{ color: "red", fontSize: "40px" }} />
                  בחר אתר
                </h1>
              </div>
              <br></br>
              <div className="body">
                <h4>
                  {" "}
                  עליך לבחור את האתר שאת/ה מעוניינ/ת להוסיף אליו את התחנה, לאחר
                  מכן תוכל/י להוסיף את התחנה
                </h4>
                <br></br>
                <div className="footer">
                  <button
                    className="cancelBtn"
                    onClick={() => {
                      setOpenModalPlaces(false);
                    }}
                  >
                    סגור
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="BackgroundPlases">
            <div className="modalContainerPlases">
              <div className="titleCloseBtnPlases">
                <button
                  onClick={() => {
                    setOpenModalPlaces(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="title">
                <h3>
                  <b>הוסף תחנה</b>
                </h3>
              </div>
              <div className="body">
                <form id="IPU" className="w3-container">
                  <h6>
                    :רשום את שם תחנה <RiAsterisk style={{ color: "red" }} />
                  </h6>
                  <p>
                    <input
                      required={true}
                      type="text"
                      onChange={handleTitleInput}
                      style={{
                        textAlign: "right",
                        width: "420px",
                      }}
                    ></input>
                  </p>
                </form>
                <form id="IPU" className="w3-container">
                  <h6>
                    :תאר במשפט את תחנה <RiAsterisk style={{ color: "red" }} />
                  </h6>
                  <p>
                    <input
                      type="text"
                      onChange={handleDescriptionInput}
                      style={{
                        textAlign: "right",
                        width: "420px",
                      }}
                    ></input>
                  </p>
                </form>
                <form id="IPU" className="w3-container">
                  <h6>
                    : הוסף תמונה של תחנה <FcMultipleInputs />
                  </h6>
                  <div className="input-group mb-3">
                    <input
                      required={true}
                      accept=".png, .jpg, .jpeg"
                      className="form-control"
                      type="file"
                      onChange={handleFileInput}
                      style={{
                        textAlign: "right",
                        width: "100%",
                      }}
                    ></input>
                  </div>
                </form>
                <form id="IPU" className="w3-container">
                  <h6>
                    : הוסף קטע קול המתאר את התחנה <FcMultipleInputs />
                  </h6>
                  <p>
                    <input
                      required={true}
                      accept=".mp3"
                      type="file"
                      className="form-control"
                      onChange={handleFileInput}
                      style={{
                        textAlign: "right",
                        width: "96%",
                      }}
                    ></input>
                  </p>
                </form>
              </div>
              <div className="footer">
                <input
                  type="submit"
                  className="OK"
                  value={ichour}
                  onClick={Post_Station}
                />
              </div>
              {flagClickOK ? (
                <>
                  <Modal_Loading props={false} />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Modal_Stations;
