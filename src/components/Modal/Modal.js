import React, { useState, useEffect } from "react";
import "./Modal.css";
import { get } from "../../api/api";
import { FcLink } from "react-icons/fc";
import { BsExclamationLg } from "react-icons/bs";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";
import { RiAsterisk } from "react-icons/ri";

//--------------------------
let obj = { tasks: [], users: [], mySite: [] };
let student = [];
let myStudents = [];
let myStudentsChoice = [];
let flagClickOK = false;
//--------------------------
function Modal({ setOpenModal, setFlagStudent, flagTest }) {
  console.log("flagTest:", flagTest);
  const [, set_obj] = useState(null); // for TextView
  const [, setDone] = useState(false);
  const [, setLoading] = useState(false);
  const [, setStudent] = useState([]);
  const [, setMyStudents] = useState([]);

  const [, setMyStudentsChoice] = useState([]);
  const [, setFlagClickOK] = useState(false);
  const [get_Name, setName] = useState(null); // for TextView

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
      setStudent(
        (student = res.data.filter((item) => item.acf.risk_profile > 0))
      );
      // console.log("student:", student);
    });
  };
  function Post_Route() {
    setFlagClickOK((flagClickOK = true));
    resultMyArrayStudent();
    // if (setText === null || setText === "") {
    //     alert('Please give the Route a title !')
    //     return
    // }

    if (JSON.parse(localStorage.getItem("New_Routes")) === null) {
      alert("Route is empty ! ");
      return;
    } else {
      set_obj((obj.tasks = JSON.parse(localStorage.getItem("New_Routes"))));
      console.log("obj.tasks:", obj.tasks);
      set_obj((obj.mySite = JSON.parse(localStorage.getItem("MySite"))));
      console.log("obj.mySite:", obj.mySite.id);

      // console.log("obj : ", obj)
      // console.log("obj.tasks : ", obj.tasks)
      let url_post = `${baseUrl}/wp-json/wp/v2/routes/`;
      fetch(url_post, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          title: get_Name,
          status: "publish",
          fields: {
            tasks: obj.tasks.map((e) => {
              // console.log("e.id:", e.id)
              return e.id;
            }),
            users: {
              ID: myStudentsChoice.map((e) => {
                console.log("res of eee:00101110001010001:", e.id);
                return e.id;
              }),
            },
            my_site: obj.mySite.id,
          },
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (post) {
          setDone(true);

          // alert(get_Route_ID)
          // console.log("post:", post)
          window.location.replace("/planner");
        });
    }
  }
  const saveCheckbox = (val) => {
    setMyStudents(myStudents.push(val));
    if (myStudents.length > 1) sortById();
    console.log("myStudents", myStudents);
    // console.log("myStudents:", myStudents);
  };
  const sortById = () => {
    for (let i = 0; i < myStudents.length; i++) {
      let min = myStudents[i];
      for (let j = i; j < myStudents.length; j++) {
        // console.log(j, ",", myStudents[j].id)
        if (myStudents[j].id < min.id) {
          setMyStudents((myStudents[i] = myStudents[j]));
          setMyStudents((myStudents[j] = min));
          min = myStudents[j].id;
        }
      }
    }
  };
  const resultMyArrayStudent = () => {
    console.log("myStudents:", myStudents);
    if (myStudents.length > 1)
      for (let i = 0; i < myStudents.length; i++) {
        let index = i;
        let count = 1;
        for (let j = i + 1; j < myStudents.length; j++) {
          if (myStudents[j].id === myStudents[i].id) {
            i++;
            count++;
          }
        }
        if (count % 2 !== 0) {
          setMyStudentsChoice(myStudentsChoice.push(myStudents[index]));
        }

        // console.log("myStudentsChoice:", myStudentsChoice)
      }
    setMyStudentsChoice(myStudentsChoice.push(myStudents[0]));
  };
  function getName(val) {
    setName(val.target.value);
  }
  const saveData = () => {
    setFlagStudent(false);
    setOpenModal(false);
  };
  return (
    <>
      {flagTest ? (
        <>
          {false ? (
            // setText === null || setText === ""
            <>
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
                  <div className="title">
                    <h3> Please type in the route name</h3>
                    <BsExclamationLg
                      style={{ color: "red", fontSize: "80px" }}
                    />
                  </div>
                  <div className="body"></div>
                  <div className="footer">
                    <button
                      className="cancelBtn"
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      closed
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="Background">
              <div className="modalContainer">
                {setFlagStudent ? (
                  <>
                    {/* <div className="titleCloseBtn">
                                    <button
                                        onClick={() => {
                                            setOpenModal(false);
                                        }}
                                    >
                                        X
                                    </button>
                                </div> */}

                    <div className="headerNewRoute">
                      <div className="newRoutTitle"> שייך מסלול לעובד </div>
                    </div>

                    <div className="AddStudentTitle">
                      &nbsp;&nbsp;
                      <FcLink className="icon" />
                    </div>
                    <div className="allStudent">
                      {student.map((value, index) => {
                        return (
                          <label key={index} className="list-group-item">
                            <input
                              dir="ltr"
                              onChange={() => saveCheckbox(value)}
                              className="form-check-input me-1"
                              type="checkbox"
                              id={value.name}
                              name={value.name}
                              value=""
                            ></input>
                            {value.name}
                          </label>
                        );
                      })}
                    </div>
                    <button className="saveAs" onClick={() => saveData()}>
                      <div style={{ color: "white" }}>שייך</div>
                    </button>

                    <button className="cancelSaveAs" onClick={() => saveData()}>
                      {" "}
                      ביטול
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="body">
                      <h5>שמירת מסלול</h5>
                    </div>
                    <div className="footer">
                      <button className="continueBtn" onClick={Post_Route}>
                        {" "}
                        שמור מסלול
                      </button>
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      <button
                        className="cancelBtn"
                        onClick={() => {
                          setOpenModal(false);
                        }}
                      >
                        ביטול
                      </button>
                      {flagClickOK ? (
                        <>
                          <Modal_Loading props={false} />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {false ? (
            // setText === null || setText === ""
            <>
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
                  <div className="title">
                    <h3> Please type in the route name</h3>
                    <BsExclamationLg
                      style={{ color: "red", fontSize: "80px" }}
                    />
                  </div>
                  <div className="body"></div>
                  <div className="footer">
                    <button
                      className="cancelBtn"
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      closed
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="Background">
              <div className="modalContainer">
                {setFlagStudent ? (
                  <>
                    {/* <div className="titleCloseBtn">
                                    <button
                                        onClick={() => {
                                            setOpenModal(false);
                                        }}
                                    >
                                        X
                                    </button>
                                </div> */}

                    <div className="headerNewRoute">
                      <div className="newRoutTitle">מסלול חדש</div>
                    </div>
                    <form id="IPU" className="w3-container">
                      <div className="nameRoutTitle"> :שם המסלול </div>
                      <p>
                        <input
                          dir="rtl"
                          className="inputRouteName"
                          required={true}
                          type="text"
                          onChange={getName}
                        ></input>
                      </p>
                    </form>
                    {/* <div className="AddStudentTitle">
                  שייך מסלול לעובד &nbsp;&nbsp;
                  <FcLink className="icon" />
                </div>
                <div className="allStudent">
                  {student.map((value, index) => {
                    return (
                      <label key={index} className="list-group-item">
                        <input
                          dir="ltr"
                          onChange={() => saveCheckbox(value)}
                          className="form-check-input me-1"
                          type="checkbox"
                          id={value.name}
                          name={value.name}
                          value=""
                        ></input>
                        {value.name}
                      </label>
                    );
                  })}
                </div> */}
                    <button className="saveAs" onClick={() => saveData()}>
                      <div style={{ color: "white" }}>שמירה בשם</div>
                    </button>

                    <button className="cancelSaveAs" onClick={() => saveData()}>
                      {" "}
                      ביטול
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="body">
                      <h5>שמירת מסלול</h5>
                    </div>
                    <div className="footer">
                      <button className="continueBtn" onClick={Post_Route}>
                        {" "}
                        שמור מסלול
                      </button>
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      <button
                        className="cancelBtn"
                        onClick={() => {
                          setOpenModal(false);
                        }}
                      >
                        ביטול
                      </button>
                      {flagClickOK ? (
                        <>
                          <Modal_Loading props={false} />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Modal;
