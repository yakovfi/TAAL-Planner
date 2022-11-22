import React, { useState, useEffect } from "react";
import { get } from "../../api/api";
import "./style.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import img1 from "../../Pictures/img1.png";
import img2 from "../../Pictures/img2.png";
import img3 from "../../Pictures/img3.png";
import img4 from "../../Pictures/img6.png";
import logo from "../../Pictures/logo.jpeg";
import Modal_Cards from "../Modal/Model_Cards";
import { GrDuplicate } from "react-icons/gr";
import { FcSearch } from "react-icons/fc";
import Modal_Loading from "../Modal/Modal_Loading";
import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";

// import { Form } from "react-bootstrap";
//----------------------------------------------------|
let dataCards = []; //                                 |
let dataCards1 = []; //                                |
let dataCards2 = []; //                                |
let dataCards3 = []; //                                |
let dataCards4 = []; //                                |
let flag_show_page = false; //                         |
let size = 0; //                                       |
let index = 0; //                                      |
let sizeMod = 0; //                                    |
const number = 4; //                                   |
let myRoute = []; //                                   |
let getMyTasks = []; //                                |
let flagTasks = false; //                              |
let getMyUsers = []; //                                |
let flagUsers = false; //                              |
let filteredData = [];
let inputText = "";
//                                                    |
//----------------------------------------------------|
const Cards = () => {
  const [get_logged_in, setLogged_in] = useState(false);
  const [done, setDone] = useState(false);
  const [, setLoading] = useState(false);
  const [, setDataCards] = useState([]);
  const [, setDataCards1] = useState([]);
  const [, setDataCards2] = useState([]);
  const [, setDataCards3] = useState([]);
  const [, setDataCards4] = useState([]);
  const [, setMyRoute] = useState([]);
  const [, setFlag] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setMyTasks] = useState([]);
  const [, setFlagTasks] = useState(false);
  const [, setMyUsers] = useState([]);
  const [, setFlagUsers] = useState(false);
  const [, setFilteredData] = useState([]);
  const [, setInputText] = useState("");

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
        alert(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const getData = () => {
    if (flag_show_page === true) setDone(true);
    if (flag_show_page === false)
      get(`${baseUrl}/wp-json/wp/v2/routes/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        params: {
          per_page: 99,
          "Cache-Control": "no-cache",
        },
      }).then((res) => {
        console.log("res:", res.data);
        setDone(true);
        size = res.data.length / number;

        setDataCards(
          (dataCards = res.data.map((value) => {
            // console.log("value :", value)
            return {
              myUsers: value.acf.users,
              myTitle: value.title.rendered
                .replace("&#8211;", "-")
                .replace("&#8217;", "'"),
              myTasks: value.acf.tasks,
              myId: value.id,
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
  };
  const Replication = (val) => {
    setModalOpen(true);
    setMyRoute((myRoute = val));
    setFlagTasks((flagTasks = false));
    setFlagUsers((flagUsers = false));
  };
  const myTasks = (val) => {
    // console.log("getMyTasks:", val)
    setMyTasks((getMyTasks = val));
    setModalOpen(true);
    setFlagTasks((flagTasks = true));
    // console.log("myval:", getMyTasks)
    setFlagUsers((flagUsers = false));
  };
  const myUsersfunc = (val) => {
    setMyTasks((getMyTasks = val.myTasks));
    // console.log("getMyUsers:", val.myUsers)
    // console.log("getMyTasks:", val.myTasks)
    setMyUsers((getMyUsers = val.myUsers));
    setModalOpen(true);
    setFlagUsers((flagUsers = true));
    setFlagTasks((flagTasks = false));
  };

  return (
    <>
      {!get_logged_in ? (
        <div style={{ color: "white" }}>Please connect properly !</div>
      ) : (
        <>
          {!done ? (
            <>{<Modal_Loading />}</>
          ) : (
            <>
              <div className="inputCover">
                <TextField
                  style={{
                    borderRadius: "10px",
                    textAlign: "right",
                    width: "200px",
                    backgroundColor: "#fff",
                  }}
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Search route"
                  label={<FcSearch style={{ fontSize: "xx-large" }} />}
                  onChange={inputHandler}
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgb(213, 221, 228)",
                  overflow: "hidden",
                }}
              >
                {modalOpen && (
                  <Modal_Cards
                    setOpenModal={setModalOpen}
                    thisMyRoute={myRoute}
                    thisGetMyTasks={getMyTasks}
                    thisFlagTasks={flagTasks}
                    thisFlagUsers={flagUsers}
                    thisGetMyUsers={getMyUsers}
                  />
                )}
                <br></br>
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                      {dataCards1.map((value, index) => {
                        return (
                          <div key={index} className="App">
                            <header key={index}>
                              <Card
                                style={{
                                  color: "#000",
                                  marginBottom: 15,
                                  boxShadow: "1px 2px #888888",
                                  borderRadius: "30px",
                                }}
                              >
                                {/* display_name */}
                                {/* <Card.Img src={img1} style={{ height: 237, borderRadius: "30px" }} /> */}
                                <Card.Body src={logo}>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div
                                          className="col-md-11"
                                          style={{
                                            backgroundColor:
                                              "rgb(225, 241, 251)",
                                            width: "300px",
                                            height: "50px",
                                            padding: "10px",
                                          }}
                                        >
                                          <h5>{value.myTitle}</h5>
                                        </div>
                                      </div>
                                      <br></br>
                                    </div>
                                  </Card.Title>
                                  <button
                                    className="btn btn-Light"
                                    id="dropdown-basic-button"
                                    style={{
                                      borderRadius: "100px",
                                      borderColor: "black",
                                      width: "130px",
                                    }}
                                    onClick={() => myTasks(value.myTasks)}
                                  >
                                    משימות
                                  </button>
                                  &nbsp;&nbsp;
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "100px",
                                      width: "130px",
                                    }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    משוייך ל
                                  </button>
                                  <br></br>
                                  <br></br>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{
                                      width: "270px",
                                      borderRadius: "100px",
                                    }}
                                    onClick={() => Replication(value)}
                                  >
                                    <GrDuplicate className="icon" />
                                    &nbsp;&nbsp; שכפל מסלול זה
                                  </button>
                                </Card.Body>
                              </Card>
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
                              <Card
                                style={{
                                  color: "#000",
                                  marginBottom: 15,
                                  boxShadow: "1px 2px #888888",
                                  borderRadius: "30px",
                                }}
                              >
                                {/* <Card.Img src={img2} style={{ height: 237, borderRadius: "30px" }} /> */}
                                <Card.Body>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div
                                          className="col-md-11"
                                          style={{
                                            backgroundColor:
                                              "rgb(225, 241, 251)",
                                            width: "300px",
                                            height: "50px",
                                            padding: "10px",
                                          }}
                                        >
                                          <h5>{value.myTitle}</h5>
                                        </div>
                                      </div>
                                    </div>
                                    <br></br>
                                  </Card.Title>
                                  <button
                                    className="btn btn-Light"
                                    id="dropdown-basic-button"
                                    style={{
                                      borderRadius: "100px",
                                      borderColor: "black",
                                      width: "130px",
                                    }}
                                    onClick={() => myTasks(value.myTasks)}
                                  >
                                    משימות
                                  </button>
                                  &nbsp;&nbsp;
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "100px",
                                      width: "130px",
                                    }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    משוייך ל
                                  </button>
                                  <br></br>
                                  <br></br>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{
                                      width: "270px",
                                      borderRadius: "100px",
                                    }}
                                    onClick={() => Replication(value)}
                                  >
                                    <GrDuplicate className="icon" />
                                    &nbsp;&nbsp; שכפל מסלול זה
                                  </button>
                                </Card.Body>
                              </Card>
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
                              <Card
                                style={{
                                  color: "#000",
                                  marginBottom: 15,
                                  boxShadow: "1px 2px #888888",
                                  borderRadius: "30px",
                                }}
                              >
                                {/* display_name */}
                                {/* <Card.Img src={img3} style={{ height: 237, borderRadius: "30px" }} /> */}
                                <Card.Body src={logo}>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div
                                          className="col-md-11"
                                          style={{
                                            backgroundColor:
                                              "rgb(225, 241, 251)",
                                            width: "300px",
                                            height: "50px",
                                            padding: "10px",
                                          }}
                                        >
                                          <h5>{value.myTitle}</h5>
                                        </div>
                                      </div>
                                    </div>
                                    <br></br>
                                  </Card.Title>
                                  <button
                                    className="btn btn-Light"
                                    id="dropdown-basic-button"
                                    style={{
                                      borderRadius: "100px",
                                      borderColor: "black",
                                      width: "130px",
                                    }}
                                    onClick={() => myTasks(value.myTasks)}
                                  >
                                    משימות
                                  </button>
                                  &nbsp;&nbsp;
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "100px",
                                      width: "130px",
                                    }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    משוייך ל
                                  </button>
                                  <br></br>
                                  <br></br>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{
                                      width: "270px",
                                      borderRadius: "100px",
                                    }}
                                    onClick={() => Replication(value)}
                                  >
                                    <GrDuplicate className="icon" />
                                    &nbsp;&nbsp; שכפל מסלול זה{" "}
                                  </button>
                                </Card.Body>
                              </Card>
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
                              <Card
                                style={{
                                  color: "#000",
                                  marginBottom: 15,
                                  boxShadow: "1px 2px #888888",
                                  borderRadius: "30px",
                                }}
                              >
                                {/* <Card.Img src={img4} style={{ height: 237, borderRadius: "30px" }} /> */}
                                <Card.Body>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div
                                          className="col-md-11"
                                          style={{
                                            backgroundColor:
                                              "rgb(225, 241, 251)",
                                            width: "300px",
                                            height: "50px",
                                            padding: "10px",
                                          }}
                                        >
                                          <h5>{value.myTitle}</h5>
                                        </div>
                                      </div>
                                    </div>
                                    <br></br>
                                  </Card.Title>
                                  <button
                                    className="btn btn-Light"
                                    id="dropdown-basic-button"
                                    style={{
                                      borderRadius: "100px",
                                      borderColor: "black",
                                      width: "130px",
                                    }}
                                    onClick={() => myTasks(value.myTasks)}
                                  >
                                    משימות
                                  </button>
                                  &nbsp;&nbsp;
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{
                                      color: "#fff",
                                      borderRadius: "100px",
                                      width: "130px",
                                    }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    משוייך ל
                                  </button>
                                  <br></br>
                                  <br></br>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    style={{
                                      width: "270px",
                                      borderRadius: "100px",
                                    }}
                                    onClick={() => Replication(value)}
                                  >
                                    <GrDuplicate className="icon" />
                                    &nbsp;&nbsp; שכפל מסלול זה
                                  </button>
                                </Card.Body>
                              </Card>
                            </header>
                          </div>
                        );
                      })}
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
export default Cards;
