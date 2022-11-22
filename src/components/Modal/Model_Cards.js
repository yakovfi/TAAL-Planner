import React, { useState, useEffect } from "react";
import { get } from "../../api/api";
import "./Modal.css";
import img1 from "../../Pictures/img1.png";
import img2 from "../../Pictures/img2.png";
import { BsFillFlagFill } from "react-icons/bs";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";

//--------------------------

let profileStudent = 0;
let myOriginalTasks = [];
let red_flag = "red";
let orange_flag = "orange";
let green_flag = "green";
let dataTasks = [];
let dataUsers = [];
let epsilon = 10;
let myOriginalTasksFlag = false;
let flagClickOK = false;
//--------------------------

function Modal_Cards({
  setOpenModal,
  setText,
  thisMyRoute,
  thisGetMyTasks,
  thisFlagTasks,
  thisGetMyUsers,
  thisFlagUsers,
}) {
  const [, setDone] = useState(false);
  const [, setProfileStudent] = useState(0);
  const [, setMyOriginalTasks] = useState([]);
  const [, setLoading] = useState(false);
  const [, setDataTasks] = useState([]);
  const [, setDataUsers] = useState([]);
  const [, setMyOriginalTasksFlag] = useState(false);
  const [, setFlagClickOK] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        getData();
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getData = () => {
    get(`${baseUrl}/wp-json/wp/v2/tasks/`, {
      params: {
        per_page: 99,
        "Cache-Control": "no-cache",
      },
    }).then((res) => {
      setDataTasks((dataTasks = res.data));
    });

    get(`${baseUrl}/wp-json/wp/v2/users/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      params: {
        per_page: 99,
        "Cache-Control": "no-cache",
      },
    }).then((res) => {
      setDataUsers((dataUsers = res.data));
    });
  };
  function Post_Route() {
    setFlagClickOK((flagClickOK = true));
    if (setText === null || setText === "") {
      alert("Please give the Route a title !");
      return;
    }
    if (JSON.parse(localStorage.getItem("New_Routes")) === null) {
      alert("Route is empty ! ");
      return;
    } else {
      let url_post = `${baseUrl}/wp-json/wp/v2/routes/`;
      fetch(url_post, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          status: "draft",
          title: thisMyRoute.myTitle + "-duplicate-1",
          fields: {
            tasks: thisMyRoute.myTasks.map((e) => {
              // console.log("e.id:", e.ID)
              return e.ID;
            }),
            // users: obj.tasks,
          },
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (post) {
          setDone(true);
          window.location.replace("/routes_cards");
        });
    }
  }
  const studentChois = (val) => {
    // setThisFlagTasks(thisFlagTasks = true);
    setMyOriginalTasks((myOriginalTasks = []));
    // console.log("val:", val.ID);
    setOpenModal(false);
    setMyOriginalTasksFlag((myOriginalTasksFlag = true));
    thisGetMyTasks.map((val) => {
      return dataTasks.map((item) => {
        if (val.ID === item.id) {
          // console.log("my Original Tasks:", myOriginalTasks);
          return setMyOriginalTasks(myOriginalTasks.push(item));
        }
        return null;
      });
    });
    let myStudent = dataUsers.filter((item) => item.id === val.ID);
    // console.log("myStudent:", myStudent)
    setProfileStudent((profileStudent = myStudent[0].acf.risk_profile));
    // alert(profileStudent)
    // setMyOriginalTasks(myOriginalTasks = thisGetMyTasks.map((val) => dataTasks.filter((item) => item.id === val.ID)));
  };
  return (
    <>
      {thisFlagTasks === true ? (
        <>
          <div className="Background">
            <div className="modalMyTasksContainer">
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setMyOriginalTasksFlag((myOriginalTasksFlag = false));
                  }}
                >
                  X
                </button>
              </div>
              <div className="title"></div>
              <img
                src={img1}
                alt="Logo"
                style={{ width: "220px", height: "180px", marginLeft: "110px" }}
              />
              ;<h3 style={{ color: "red" }}>:רשימת המשימות</h3>
              <br></br>
              <h5 className="bodyTasks">
                {thisGetMyTasks && !myOriginalTasksFlag ? (
                  <>
                    {thisGetMyTasks.map((val, index) => {
                      return (
                        <div key={index}>
                          <div>{val.post_title}</div>
                          <br></br>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {myOriginalTasks ? (
                      <>
                        {myOriginalTasks.map((val, index) => {
                          return (
                            <div key={index}>
                              <div>
                                {val.title.rendered}
                                {parseInt(val.acf.minimum_profile) >
                                parseInt(profileStudent) ? (
                                  <>
                                    {parseInt(val.acf.minimum_profile) -
                                      parseInt(profileStudent) <
                                    epsilon ? (
                                      <>
                                        <BsFillFlagFill
                                          style={{ color: orange_flag }}
                                        />
                                      </>
                                    ) : (
                                      <span>
                                        <BsFillFlagFill
                                          style={{ color: red_flag }}
                                        />
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <BsFillFlagFill
                                    style={{ color: green_flag }}
                                  />
                                )}
                                {/* {console.log("val.acf.minimum_profile:", typeof (parseInt(val.acf.minimum_profile)))} */}
                              </div>
                              <br></br>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <h3 style={{ color: "red" }}>לא קיימים משימות</h3>
                      </>
                    )}
                  </>
                )}
              </h5>
            </div>
          </div>
        </>
      ) : thisFlagUsers ? (
        <>
          <div className="Background">
            <div className="modalMyTasksContainer">
              <div className="titleCloseBtn">
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  X
                </button>
              </div>
              <div className="title"></div>
              <img
                src={img2}
                alt="Logo"
                style={{ width: "220px", height: "180px", marginLeft: "110px" }}
              />
              ;<h3 style={{ color: "red" }}>:החניכים</h3>
              <br></br>
              <h5 className="bodyTasks">
                {thisGetMyUsers ? (
                  <>
                    {thisGetMyUsers.map((val, index) => {
                      return (
                        <div key={index}>
                          <div>
                            <button
                              onClick={() => {
                                studentChois(val);
                              }}
                              className="btn btn-primary"
                            >
                              {val.display_name}
                            </button>{" "}
                            -
                          </div>
                          <br></br>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <h6 style={{ color: "red" }}>
                      אין חניכים המשוייכים למסלול זה
                    </h6>
                  </>
                )}
              </h5>
            </div>
          </div>
        </>
      ) : (
        <div className="Background">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                X
              </button>
            </div>
            <h1>שכפול מסלול</h1>
            <div className="body">
              <h5>
                {" "}
                :האם את/ה מעוניין בשכפול המסלול{" "}
                <div style={{ color: "red" }}>?{thisMyRoute.myTitle}</div>
              </h5>
            </div>
            <div className="footer">
              <button
                className="cancelBtn"
                onClick={() => {
                  setOpenModal(false);
                }}
              >
                ביטול
              </button>
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <button className="continueBtn" onClick={Post_Route}>
                {" "}
                אישור
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
      )}
    </>
  );
}
export default Modal_Cards;
