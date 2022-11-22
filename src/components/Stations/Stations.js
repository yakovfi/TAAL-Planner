import React, { useState, useEffect } from "react";
import { get } from "../../api/api";
// import { FcSearch } from "react-icons/fc";
// import { MdOutlineAdsClick } from "react-icons/md";
import "./style.css";
import TasksComp from "../Tasks_comp/Tasks_comp";
import ModalStations from "../Modal/Modal_Stations";
// import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";
import { AiOutlinePlus } from "react-icons/ai";
// import Dot from "../Dot/Dot"
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import "@fontsource/assistant";
import ModalIcons from "../Modal/Modal_Icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//-----------------------
let allTasks = [];
let tasks = [];
let filteredData = [];
let inputText = "";
let flagFirstTime = true;
let myStation = { name: "", id: "", flag: true, data: [] };
let myCategory = "stationCategory";
//-----------------------
const Stations = (props) => {
  console.log("props.stationArray: ", props.stationArray);
  // console.log("station:", props.language.setFloatLang)
  // console.log("mySite:", props.mySite);
  console.log("propsDataStations:", props.propsData);
  // console.log(" props.allStations:", props.allStations)
  // console.log(" props.idTask:", props.idTask)
  // const [, set_obj] = useState(null);// for TextView
  const [, setStateTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [, setFilteredData] = useState([]);
  const [, setInputText] = useState("");
  const [, setFlagFirstTime] = useState(false);
  const [, setMyStation] = useState(null);
  const [modalIconsOpen, setModalIconsOpen] = useState(false);
  const [myRouteClick, setMyRouteClick] = useState(0);
  const [characters, updateCharacters] = useState(props.propsData);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }
  if (flagFirstTime === true) {
    filteredData = props.propsData;
  }
  // console.log("filtered Data 1:", filteredData)
  let inputHandler = (e) => {
    setInputText((inputText = e.target.value.toLowerCase()));
    setFlagFirstTime((flagFirstTime = false));
    //convert input text to lower case
    // setFilteredData(filteredData = [])
    // console.log("filtered Data 2:", filteredData)
    setFilteredData(
      (filteredData = props.propsData.filter((el) => {
        if (inputText === "") {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.name.toLowerCase().includes(inputText);
        }
      }))
    );
    // console.log("filtered Data 3:", filteredData)
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        getingData();
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const getingData = async () => {
    await get(`${baseUrl}/wp-json/wp/v2/tasks/`, {
      params: {
        per_page: 100,
        "Cache-Control": "no-cache",
      },
    }).then((res) => {
      let max_pages = res.headers["x-wp-totalpages"];
      console.log("res headers:", res.headers);
      allTasks = res.data;
      if (max_pages > 1) {
        for (let i = 2; i <= max_pages; i++) {
          console.log("max_pages: ", max_pages);
          get(`${baseUrl}/wp-json/wp/v2/tasks/`, {
            params: {
              per_page: 100,
              page: i,
              "Cache-Control": "no-cache",
            },
          }).then((res) => {
            console.log("res:", res);
            // allTasks = res.data;
            Array.prototype.push.apply(allTasks, res.data);
            console.log("allTasks:", allTasks);
          });
        }
      }
    });
  };
  const Display_The_Tasks = (e, n) => {
    console.log("eeeeeeeeeeeeeeeeeee: ", e);
    if (myStation.id === e) {
      setMyStation((myStation.flag = false));
    } else {
      setMyStation((myStation.flag = true));
    }
    setMyStation((myStation.data = props.propsData));
    setMyStation((myStation.name = n));
    setMyStation((myStation.id = e));
    // console.log("console myStat myStation:", myStation)
    if (tasks.length > 0) {
      tasks = [];
    }
    allTasks.forEach((element) => {
      for (let i = 0; i < element.places.length; i++) {
        if (element.places[i] === e) {
          tasks.push(element);
        }
      }
      // console.log("Display_The_Tasks", tasks)
    });
    setFilteredData(
      (filteredData = props.propsData.filter((el) => {
        if (inputText === "") {
          return el;
        }
        //return the item which contains the user input
        else {
          return el.name.toLowerCase().includes(inputText);
        }
      }))
    );
    // console.log("filteredData from st:", filteredData)
    setStateTask({ data: tasks }); //Updating the state
  };

  const clickOnhreeDotsVerticaIcont = (value) => {
    setMyRouteClick(value.id);
    setModalIconsOpen(true);
  };
  //----------------------------------------------------------
  return (
    <>
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          {modalOpen && (
            <ModalStations
              setOpenModalPlaces={setModalOpen}
              idTasks={props.idTask}
            />
          )}

          <div
            className="Cover_Stations"
            style={{
              float: props.language.setFloatLang,
              marginRight: "-2%",
              padding: "2%",
            }}
          >
            {!props.flagHebrew ? (
              <>
                <div
                  className="TitleStation"
                  style={{
                    background: props.titleStationCss,
                    //   background: linear-gradient(90deg, rgb(255, 234, 220) 95%, #e29e62 1%);
                  }}
                >
                  {/* <BsThreeDotsVertical className='threeDotsVertical' /> */}
                  <div className="MyTitle text"> {props.stationsName}</div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="TitleStation"
                  style={{
                    background: props.titleStationCss,
                    //   background: linear-gradient(90deg, rgb(255, 234, 220) 95%, #e29e62 1%);
                  }}
                >
                  <h3>
                    &nbsp;&nbsp;&nbsp;
                    <div className="MyTitle"> {props.stationsName}</div>
                    {/* <BsThreeDotsVertical className='threeDotsVerticalEngStation' /> */}
                  </h3>
                </div>
              </>
            )}
            <div
              className="search"
              style={{
                backgroundColor: "rgb(255, 242, 234)",
                borderStyle: "none none solid none",
                borderColor: "#fff",
                borderWidth: "5px",
              }}
            >
              <input
                className="searchButton"
                dir="rtl"
                placeholder="חפש תחנה"
                label={<CgSearch style={{ fontSize: "x-large" }} />}
                onChange={inputHandler}
              ></input>
            </div>
            <div className="Stations">
              {props.clickAddRoute ? ( //DND
                <>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                      {(provided) => (
                        <ul
                          className="characters"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {characters.map(({ id, name }, index) => {
                            let ID = "" + id;
                            console.log("id: ", typeof ID);

                            return (
                              <Draggable
                                key={ID}
                                draggableId={ID}
                                index={index}
                              >
                                {(provided) => (
                                  <p
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div
                                      className="buttons"
                                      onClick={() =>
                                        Display_The_Tasks(id, name)
                                      }
                                      key={index}
                                    >
                                      {/* <BsThreeDotsVertical
                                        className="threeDotsVerticalEng"
                                        onClick={() =>
                                          clickOnhreeDotsVerticaIcont(id, name)
                                        }
                                      /> */}
                                      {myRouteClick === id ? (
                                        <>
                                          {modalIconsOpen && (
                                            <ModalIcons
                                              setOpenModalPlaces={
                                                setModalIconsOpen
                                              }
                                              myCategory={myCategory}
                                            />
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      <h3 className="nameOfButton">{name}</h3>
                                      {/* <Dot color="#F2AE69" /> */}
                                    </div>
                                  </p>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {/* {filteredData.map((value, index) => {
                    return (
                      <button
                        className="buttons"
                        onClick={() => Display_The_Tasks(value)}
                        key={index}
                      >
                        <BsThreeDotsVertical
                          className="threeDotsVerticalEng"
                          // onClick={() => clickOnhreeDotsVerticaIcont(value)}
                        />
                        {myRouteClick === value.id ? (
                          <>
                            {modalIconsOpen && (
                              <ModalIcons
                                setOpenModalPlaces={setModalIconsOpen}
                                myCategory={myCategory}
                              />
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="nameOfButton">{value.name}</div>
                      </button>
                    );
                  })} */}
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="addStationCover">
              <button
                className="AddButton"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <AiOutlinePlus className="plus" />
              </button>
            </div>
          </div>
          <TasksComp
            propsDataTask={tasks}
            allStations={props.allStations}
            language={props.language.setFloatLang}
            myTasks={props.myTasks}
            drag={props.drag}
            addMyTask={props.addMyTask}
            titleTaskCss={props.titleTaskCss}
            mySite={props.mySite}
            myStation={myStation}
            flagHebrew={props.flagHebrew}
            tasksOfRoutes={props.tasksOfRoutes}
            myStations={props.propsData}
          />
        </>
      )}
    </>
  );
};
export default Stations;
//----------------------------------------
