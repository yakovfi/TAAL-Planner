import React, { useState, useEffect } from "react";
import { get } from "../../api/api";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import profile from "../../Pictures/profile1.png";
import logo from "../../Pictures/logo.jpeg";
import Modal_Student from "../Modal/Modal_Student";
import Image from "react-bootstrap/Image";
import Modal_Loading from "../Modal/Modal_Loading";
import TextField from "@mui/material/TextField";
import { FcSearch } from "react-icons/fc";
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
let getMyUsers = []; //                                |
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
  const [, setFlag] = useState(false);
  // const [, setResultData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setMyUsers] = useState([]);
  const [, setFilteredData] = useState([]);
  const [, setInputText] = useState("");

  let inputHandler = (e) => {
    // console.log("element from card:", e.target.value)
    //convert input text to lower case
    setInputText((inputText = e.target.value.toLowerCase()));
    // console.log("dataCards:", dataCards)
    setFilteredData(
      (filteredData = dataCards.filter((el) => {
        // setInputText(lowerCase);

        if (inputText === "") {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.name.toLowerCase().includes(inputText);
        }
      }))
    );

    // console.log("filteredData:", filteredData)

    sizeMod = filteredData.length % number;
    size = (filteredData.length - sizeMod) / number;

    // console.log("filteredData.length", filteredData.length)

    // console.log("size", size)
    // console.log("sizeMod:", sizeMod)
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
    if (flag_show_page === true) setDone(true);
    if (flag_show_page === false)
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
        setDone(true);
        console.log("Users:", res.data.data);
        size = res.data.length / number;
        setDataCards(
          (dataCards = res.data.filter((item) => item.acf.risk_profile > 0))
        );
        // console.log("dataCards:", dataCards)
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
  const myUsersfunc = (val) => {
    // console.log("getMyUsers.name:", val.name);
    setMyUsers((getMyUsers = val));
    setModalOpen(true);
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
                  placeholder="Search employee"
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
                  <Modal_Student
                    setOpenModal={setModalOpen}
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
                                  border: "1px solid #888888",
                                  borderRadius: "20px",
                                }}
                              >
                                {value.acf.image ? (
                                  <>
                                    <Image
                                      style={{
                                        height: 237,
                                        width: "97%",
                                        borderRadius: "20px",
                                      }}
                                      src={value.acf.image.url}
                                      alt="new"
                                    />
                                  </>
                                ) : (
                                  <>
                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%', borderRadius: "20px" }} /> */}
                                  </>
                                )}
                                <Card.Body src={logo}>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div className="col-md-11">
                                          <h5>{value.name}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Title>
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{ marginLeft: "90px" }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    מידע נוסף
                                  </button>
                                  <br></br>
                                  <br></br>
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
                                  border: "1px solid #888888",
                                  borderRadius: "20px",
                                }}
                              >
                                {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                {value.acf.image ? (
                                  <>
                                    {/* <Image style={{ height: 237, width: '97%', borderRadius: "20px" }}
                                                                    src={value.acf.image.url}
                                                                    alt="new"
                                                                /> */}
                                  </>
                                ) : (
                                  <>
                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%', borderRadius: "20px" }} /> */}
                                  </>
                                )}

                                <Card.Body>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div className="col-md-12">
                                          <h5>{value.name}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Title>
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{ marginLeft: "90px" }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    מידע נוסף
                                  </button>
                                  <br></br>
                                  <br></br>
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
                                  border: "1px solid #888888",
                                  borderRadius: "20px",
                                }}
                              >
                                {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                {value.acf.image ? (
                                  <>
                                    {/* <Image style={{ height: 237, width: '97%', borderRadius: "20px" }}
                                                                    src={value.acf.image.url}
                                                                    alt="new"
                                                                /> */}
                                  </>
                                ) : (
                                  <>
                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%', borderRadius: "20px" }} /> */}
                                  </>
                                )}

                                <Card.Body>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div className="col-md-11">
                                          <h5>{value.name}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Title>
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{ marginLeft: "90px" }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    מידע נוסף
                                  </button>
                                  <br></br>
                                  <br></br>
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
                                  border: "1px solid #888888",
                                  borderRadius: "20px",
                                }}
                              >
                                {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                {value.acf.image ? (
                                  <>
                                    {/* <Image style={{ height: 237, width: '97%', borderRadius: "20px" }}
                                                                    src={value.acf.image.url}
                                                                    alt="new"
                                                                /> */}
                                  </>
                                ) : (
                                  <>
                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%', borderRadius: "20px" }} /> */}
                                  </>
                                )}
                                <Card.Body>
                                  <Card.Title>
                                    <div className="text-center ">
                                      <div className="row align-items-center">
                                        <div className="col-md-11">
                                          <h5>{value.name}</h5>
                                        </div>
                                      </div>
                                    </div>
                                  </Card.Title>
                                  <button
                                    className="btn btn-primary"
                                    id="dropdown-basic-button"
                                    style={{ marginLeft: "90px" }}
                                    onClick={() => myUsersfunc(value)}
                                  >
                                    מידע נוסף
                                  </button>
                                  <br></br>
                                  <br></br>
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
