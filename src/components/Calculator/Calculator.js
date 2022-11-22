import React, { useState, useEffect } from "react";
import { get } from "../../api/api";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style.css";
import Modal_Calculator from "../Modal/Modal_Calculator";
import View_my_tasks from "../View_my_tasks/View_my_tasks";
import Modal_Loading from "../Modal/Modal_Loading";
import { baseUrl } from "../../config";
import TextField from "@mui/material/TextField";
import { FcSearch } from "react-icons/fc";

// import Dot from '../Dot/Dot'
let dataCards = [];
let dataCards1 = [];
let dataCards2 = [];
let dataCards3 = [];
let dataCards4 = [];
let flag_show_page = false;
let size = 0;
let index = 0;
let sizeMod = 0;
const number = 4;
let textview = "";
let Has_already_been_typed = false;
let actionMode = "";
let actionFlag = false;
let helpFlag = false;
let arrayIdTasks = [];
let objTasks = [];
let getUsers = [];
let student = "";
let filteredData = [];
let inputText = "";

const Calculator = () => {
  const [get_logged_in, setLogged_in] = useState(false);
  const [done, setDone] = useState(false);
  const [, setLoading] = useState(false);
  const [, setDataCards] = useState([]);
  const [, setDataCards1] = useState([]);
  const [, setDataCards2] = useState([]);
  const [, setDataCards3] = useState([]);
  const [, setDataCards4] = useState([]);
  const [, setFlag] = useState(false);
  const [, setTextview] = useState();
  const [, setActionMode] = useState("");
  const [, setArrayIdTasks] = useState([]);
  const [, setObjTasks] = useState([]);
  const [, setInputText] = useState("");
  const [, setFilteredData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setActionFlag] = useState(false);
  const [, setHelpFlag] = useState(false);
  const [, setUsers] = useState([]);
  const [, setStudent] = useState("");
  let inputHandler = (e) => {
    setInputText((inputText = e.target.value.toLowerCase()));
    setFilteredData(
      (filteredData = dataCards.filter((el) => {
        // setInputText(lowerCase);
        if (inputText === "") {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.myTitle.toLowerCase().includes(inputText);
        }
      }))
    );
    sizeMod = filteredData.length % number;
    size = (filteredData.length - sizeMod) / number;
    dataCards1 = [];
    dataCards2 = [];
    dataCards3 = [];
    dataCards4 = [];
    index = 0;
    for (let i = 0; i < size; i++) {
      setDataCards1((dataCards1[i] = filteredData[index]));
      index++;
      setDataCards2((dataCards2[i] = filteredData[index]));
      index++;
      setDataCards3((dataCards3[i] = filteredData[index]));
      index++;
      setDataCards4((dataCards4[i] = filteredData[index]));
      index++;
    }
    for (let i = 0; i < sizeMod; i++) {
      if (i < sizeMod) {
        setDataCards4((dataCards4[size] = filteredData[index]));
        i++;
        index++;
      }
      if (i < sizeMod) {
        setDataCards3((dataCards3[size] = filteredData[index]));
        i++;
        index++;
      }
      if (i < sizeMod) {
        setDataCards2((dataCards2[size] = filteredData[index]));
        i++;
        index++;
      }
      if (i < sizeMod) {
        setDataCards1((dataCards1[size] = filteredData[index]));
        i++;
        index++;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setLogged_in(sessionStorage.getItem("logged_in"));
        getData();
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getData = () => {
    // https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/
    // https://taal.tech/wp-json/wp/v2/routes/
    if (flag_show_page === true) setDone(true);
    if (flag_show_page === false)
      get(`${baseUrl}/wp-json/wp/v2/routes/`, {
        params: {
          per_page: 99,
          "Cache-Control": "no-cache",
        },
      }).then((res) => {
        setDone(true);
        // console.log("resCAlc:", res)
        size = res.data.length / number;

        setDataCards(
          (dataCards = res.data.map((value) => {
            return {
              myUsers: value.acf.users,
              myTitle: value.title.rendered
                .replace("&#8211;", "-")
                .replace("&#8217;", "'"),
              myTasks: value.acf.tasks,
              myId: value.id,
              myACF: value.acf,
            };
          }))
        );

        sizeMod = dataCards.length % number;
        size = (dataCards.length - sizeMod) / number;
        for (let i = 0; i < size; i++) {
          setDataCards1((dataCards1[i] = dataCards[index]));
          index++;
          setDataCards2((dataCards2[i] = dataCards[index]));
          index++;
          setDataCards3((dataCards3[i] = dataCards[index]));
          index++;
          setDataCards4((dataCards4[i] = dataCards[index]));
          index++;
        }
        for (let i = 0; i < sizeMod; i++) {
          if (i < sizeMod) {
            setDataCards4((dataCards4[size] = dataCards[index]));
            i++;
            index++;
          }
          if (i < sizeMod) {
            setDataCards3((dataCards3[size] = dataCards[index]));
            i++;
            index++;
          }
          if (i < sizeMod) {
            setDataCards2((dataCards2[size] = dataCards[index]));
            i++;
            index++;
          }
          if (i < sizeMod) {
            setDataCards1((dataCards1[size] = dataCards[index]));
            i++;
            index++;
          }
        }
        setFlag((flag_show_page = true));
        sizeMod = dataCards.length % number;
        size = (dataCards.length - sizeMod) / number;
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
      setStudent(
        (student = res.data.filter((item) => item.description !== ""))
      );
      setUsers(
        (getUsers = student.map((r) => {
          return r.name;
        }))
      );
    });
  };
  //-------------------------------------------------------------
  const calc = (val) => {
    textview = document.forms["myForm"]["textview"];
    if (Has_already_been_typed) {
      setTextview((textview.value = ""));
      setArrayIdTasks((arrayIdTasks = [])); // reset array
      setObjTasks((objTasks = []));
      setActionMode((actionMode = ""));
    }
    if (actionMode === "") {
      setArrayIdTasks(
        val.myTasks.map((value) => {
          return arrayIdTasks.push(value.ID);
        })
      );
      setObjTasks(
        val.myTasks.map((value) => {
          return objTasks.push(value);
        })
      );
      console.log("objTasks1:", objTasks);
      // console.log("value.post_title:", arrayNameTasks)
      setActionFlag((actionFlag = false));
    }
    if (actionMode === "∪") {
      setArrayIdTasks(
        val.myTasks.map((value) => {
          return arrayIdTasks.push(value.ID);
        })
      );
      setObjTasks(
        val.myTasks.map((value) => {
          return objTasks.push(value);
        })
      );

      setActionFlag((actionFlag = true));
    }
    //------------------------------
    if (actionMode === "∩") {
      let tempArray = [];
      let tempObj = [];
      val.myTasks.forEach((element) => {
        for (let i = 0; i < arrayIdTasks.length; i++) {
          if (element.ID === arrayIdTasks[i]) {
            tempArray.push(element.ID);
            tempObj.push(element);
          }
        }
      });
      setArrayIdTasks((arrayIdTasks = []));
      setObjTasks((objTasks = []));

      setArrayIdTasks((arrayIdTasks = tempArray));
      setObjTasks((objTasks = tempObj));

      setActionFlag((actionFlag = true));
    }
    //------------------------------
    if (actionMode === "-") {
      let tempArray = [];
      let tempObj = [];
      let newTempArray = [];
      let newTempObj = [];
      val.myTasks.forEach((element) => {
        for (let i = 0; i < arrayIdTasks.length; i++) {
          if (element.ID === arrayIdTasks[i]) {
            tempArray.push(element.ID);
            tempObj.push(element);
          }
        }
      });
      for (let i = 0; i < arrayIdTasks.length; i++) {
        let flag = false;
        for (let j = 0; j < tempArray.length; j++) {
          if (tempArray[j] === arrayIdTasks[i]) {
            flag = true;
          }
        }
        if (!flag) {
          newTempArray.push(arrayIdTasks[i]);
          newTempObj.push(objTasks[i]);
        }
      }
      setObjTasks((objTasks = []));
      setArrayIdTasks((arrayIdTasks = []));
      setArrayIdTasks((arrayIdTasks = newTempArray));
      setObjTasks((objTasks = newTempObj));
      setActionFlag((actionFlag = true));
    }
    setTextview((textview.value += "(" + val.myTitle + ")"));
    Has_already_been_typed = true;
    // console.log("arrayIdTasks:", arrayIdTasks)
    // console.log("arrayNameTasks:", objTasks)
  };
  //--------------------------------------------------------------
  const Action = (val) => {
    textview = document.forms["myForm"]["textview"];
    if (Has_already_been_typed) {
      setTextview((textview.value += val));
      setActionMode((actionMode = val)); // save the action choice
      Has_already_been_typed = false;
    }
  };
  //--------------------------------------------------------------
  const reset = () => {
    window.location.replace("/Calculator");
  };
  const help = () => {
    setHelpFlag((helpFlag = true));
    setModalOpen(true);
  };
  //--------------------------------------------------------------
  return (
    <>
      {!get_logged_in ? (
        <div style={{ color: "white" }}>Please connect properly !</div>
      ) : (
        <>
          {!done ? (
            <>
              <Modal_Loading />
            </>
          ) : (
            <>
              {" "}
              <div
                style={{
                  backgroundColor: "rgb(213, 221, 228)",
                  overflow: "hidden",
                  height: "800px",
                }}
              >
                <div className="Cover_view_my_tasks">
                  <h6 className="Title_view_my_tasks">My tasks</h6>
                  <div className="View_my_tasks">
                    <View_my_tasks prop={objTasks} />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  {modalOpen && (
                    <Modal_Calculator
                      setOpenModal={setModalOpen}
                      idsTasks={arrayIdTasks}
                      propActionFlag={actionFlag}
                      helpProps={helpFlag}
                      usersArray={getUsers}
                    />
                  )}
                  <div
                    className="row"
                    style={{ paddingBottom: "100px", margin: "-70px" }}
                  >
                    <div id="TaskShow" className="col-4 "></div>
                    <div
                      className="col-4 "
                      id="containerCalc"
                      style={{ width: "600px", marginTop: "2px" }}
                    >
                      <form name="myForm">
                        <input
                          type="text"
                          className="textview"
                          id="textview"
                          disabled
                        ></input>
                      </form>
                      <div className="row">
                        <input
                          type="button"
                          className="col-2"
                          id="btns"
                          value="∪"
                          onClick={() => Action("∪")}
                        ></input>
                        <input
                          type="button"
                          className="col-2"
                          id="btns"
                          value="∩"
                          onClick={() => Action("∩")}
                        ></input>
                        <input
                          type="button"
                          className="col-2"
                          id="btns"
                          value="\"
                          onClick={() => Action("-")}
                        ></input>
                        <input
                          type="button"
                          className="col-2"
                          id="btnsOrange"
                          value="Enter"
                          onClick={() => {
                            setModalOpen(true);
                            setHelpFlag((helpFlag = false));
                          }}
                        ></input>
                        <input
                          type="button"
                          className="col-2"
                          id="btnsOrange"
                          value="AC"
                          onClick={() => reset("value")}
                        ></input>
                        <div className="inputCover" dir="rtl">
                          <TextField
                            dir="rtl"
                            style={{
                              marginRight: "180px",
                              borderRadius: "10px",
                              textAlign: "right",
                              width: "200px",
                              backgroundColor: "#fff",
                            }}
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="חיפוש כפתור"
                            label={
                              <FcSearch style={{ fontSize: "xx-large" }} />
                            }
                            onChange={inputHandler}
                          />
                        </div>
                      </div>
                      <div className="row" id="dataFromServerButton">
                        <div className="col-3">
                          {dataCards1.map((value, index) => {
                            return (
                              <div key={index} className="App">
                                <header key={index}>
                                  <button
                                    className="btnRoute"
                                    onClick={() => calc(value)}
                                    style={{
                                      marginBottom: 15,
                                      height: 80,
                                      width: 100,
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <div
                                      className="f"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {value.myTitle}
                                    </div>
                                  </button>
                                </header>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-3">
                          {dataCards2.map((value, index) => {
                            return (
                              <div key={index} className="App">
                                <header key={index}>
                                  <button
                                    className="btnRoute"
                                    onClick={() => calc(value)}
                                    style={{
                                      marginBottom: 15,
                                      height: 80,
                                      width: 100,
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <div
                                      className="f"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {value.myTitle}
                                    </div>
                                  </button>
                                </header>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-3">
                          {dataCards3.map((value, index) => {
                            return (
                              <div key={index} className="App">
                                <header key={index}>
                                  <button
                                    className="btnRoute"
                                    onClick={() => calc(value)}
                                    style={{
                                      marginBottom: 15,
                                      height: 80,
                                      width: 100,
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <div
                                      className="f"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {value.myTitle}
                                    </div>
                                  </button>
                                </header>
                              </div>
                            );
                          })}
                        </div>
                        <div className="col-3">
                          {dataCards4.map((value, index) => {
                            return (
                              <div key={index} className="App">
                                <header key={index}>
                                  <button
                                    className="btnRoute"
                                    onClick={() => calc(value)}
                                    style={{
                                      marginBottom: 15,
                                      height: 80,
                                      width: 100,
                                      borderRadius: "10px",
                                    }}
                                  >
                                    <div
                                      className="f"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {value.myTitle}
                                    </div>
                                  </button>
                                </header>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </div>
                      <input
                        type="button"
                        className="col-2"
                        id="btnsOrange"
                        value="Help"
                        onClick={() => {
                          help();
                        }}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};
export default Calculator;
