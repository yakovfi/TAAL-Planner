import React, { useState } from "react";
import "./Modal.css";
import { RiAsterisk } from "react-icons/ri";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";

//--------------------------
let get_title = "";
let flagClickOK = false;
//--------------------------
function Modal({
  setOpenModal,
  propActionFlag,
  idsTasks,
  helpProps,
  usersArray,
}) {
  const [, settitle] = useState("");
  const [, setFlagClickOK] = useState(false);
  const handleTitleInput = (e) => {
    settitle((get_title = e.target.value));
  };
  // console.log("usersArray:", usersArray)
  // console.log("idsTasks:", idsTasks)
  // console.log("helpProps:", helpProps)

  function Post_Route() {
    if (get_title === "") {
      alert("עליך למלא שדות חובה המסומנים בכוכבית");
    } else {
      setFlagClickOK((flagClickOK = true));

      let url_post = `${baseUrl}/wp-json/wp/v2/routes/`;
      fetch(url_post, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          title: get_title,
          status: "publish",

          fields: {
            // tasks: obj.tasks[0].id,
            tasks: idsTasks.map((e) => {
              return e;
            }),
          },
        }),
      })
        .then(function (response) {
          return response.data.json();
        })
        .then(function (post) {
          // console.log(post)
          window.location.replace("/planner");
        });
    }
  }
  return (
    <>
      {!propActionFlag && !helpProps ? (
        <>
          <div className="Background">
            <div className="modalContainerMessage">
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  {" "}
                  X
                </button>
              </div>
              <div className="title">
                <h1>נא לבחור את המסלולים ולבצע עליהם את הפעולה הרצויה למשל </h1>
              </div>
              <br></br> <br></br>
              <div className="body">
                <h1 style={{ color: "red" }}>בנק הפועלים ∪ קפה קרולינה</h1>
              </div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div className="footer" style={{ textAlign: "center" }}>
                <button
                  className="cancelBtn"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  {" "}
                  הבנתי
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {!helpProps ? (
            <>
              <div className="Background">
                <div className="modalContainerCalculator">
                  <div className="titleCloseBtn">
                    <button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      {" "}
                      X
                    </button>
                  </div>
                  <div className="title">
                    <h4 style={{ textAlign: "center", color: "red" }}>
                      בניית מסלול חדש
                    </h4>
                  </div>
                  <div className="body">
                    <form id="IPU" className="w3-container">
                      <h6 style={{ textAlign: "right" }}>
                        {" "}
                        :רשום את שם המסלול{" "}
                        <RiAsterisk style={{ color: "red" }} />
                      </h6>
                      <p>
                        <input
                          required={true}
                          type="text"
                          onChange={handleTitleInput}
                          style={{
                            textAlign: "right",
                            width: "460px",
                            height: "35px",
                          }}
                        ></input>
                      </p>
                    </form>
                    <h6 style={{ textAlign: "right" }}>
                      בחר חניכים שצריכים לבצע את המשימות
                    </h6>
                    <div className="allTasks">
                      {usersArray.map((value, index) => {
                        return (
                          <label key={index} className="list-group-item">
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              value=""
                            ></input>
                            {value}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <h5 style={{ textAlign: "right", color: "red" }}>
                    ?האם ברצונך לשמור מסלול זה
                  </h5>
                  <div className="footer" style={{ textAlign: "right" }}>
                    <button
                      className="cancelBtn"
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      {" "}
                      לא
                    </button>
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <button className="continueBtn" onClick={Post_Route}>
                      כן
                    </button>
                    {flagClickOK ? (
                      <>
                        <Modal_Loading props={false} />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="Background">
              <div className="modalContainerCalculator">
                <div className="titleCloseBtn">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    {" "}
                    X
                  </button>
                </div>
                <h3>הוראות שימוש במחשבון</h3>
                <div className="body" style={{ textAlign: "right" }}>
                  <h5>:U</h5>
                  <h5>
                    {" "}
                    פעולת איחוד - ניתן לאחד 2 מסלולים ויותר, פעולה זו מוסיפה את
                    המשימות השייכות למסלולים שבחרת לפי סדר הפעולות וניתן לשמור
                    כמסלול חדש
                  </h5>
                  <h6 style={{ color: "red" }}>
                    הצורך בפעולה זו נועדה ליצור מסלול חדש הבנוי מסדרת מסלולים
                    כדי לאפשר לחניך מסלול הבנוי ממספר מסלולים לסדר יום שלם
                  </h6>
                  <br></br>
                  <h4>:∩</h4>
                  <h5>
                    {" "}
                    פעולת חיתוך - פעולה זו יוצרת מסלול חדש המורכב מהמשימות
                    המשותפות של המסלולים לפי בחירה
                  </h5>
                  <h6 style={{ color: "red" }}>
                    הצורך בפעולה זו נועדה ליצור מסלול חדש הבנוי מהמשימות
                    המשותפות של מספר מסלולים. מידע זה יכול לסייע אם יש כמה
                    חניכים שעליהם לבצע משימה משותפת ושיקול אם לשים אותם יחד או
                    לא.
                  </h6>
                  <br></br>
                  <h5>:\</h5>
                  <h5>
                    {" "}
                    פעולת חיסור - פעולה זו יוצרת מסלול חדש המורכב מחיסור של
                    המסלולים לפי בחירה
                  </h5>
                  <h6 style={{ color: "red" }}>
                    {" "}
                    פעולה זו נועדה לסנן משימות שבעל האתר מבין כי לא מתאימים
                    לחניך (כדאי לבנות מסלול הבנוי ממשימות שלא מומלצים לחניך ואז
                    לבצע פעולת חיסור)
                  </h6>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Modal;
