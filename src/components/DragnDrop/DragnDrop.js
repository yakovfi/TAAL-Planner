import React, { useState, useEffect } from "react";
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import ModalTasks from "../Modal/Modal_Tasks";
import Modal from "../Modal/Modal";
import { AiOutlinePlus } from "react-icons/ai";
import { CgSearch } from "react-icons/cg";
import { AiFillCheckCircle } from "react-icons/ai";
import Phone from "../Phone/Phone";
import Tablet from "../Tablet/Tablet";
import Dot from "../Dot/Dot";
import Clock from "../Clock/Clock";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

let Route = [];
let dndArray = [];
let saveProps = [];
let thisId = "";
let thisIdArray = [];
let myTask = {};
let helpFlag = false;
let count = 0;
let width = "-13px";
let height = "70px";
let nameStation = "14px";
let bottom = "-27px";
let kavTopWidth = "25px";
let newkavTaskTop = "100px";
let saveTag = {};
let count1 = 0;
let kavTaskTopMarginTop = "-7px";
let borderLeft = "2px solid #c2bfbf";
let flagPhone = false;
let flagTree = true;
// let flagTablet = false;
let flagPhoneOne = false;
let flagStress = false;
let modalFlagTablet = false;
const finalSpaceCharacters = [
  {
    id: "gary",
    name: "a",
  },
  {
    id: "cato",
    name: "b",
  },
  {
    id: "kvn",
    name: "c",
  },
  {
    id: "mooncake",
    name: "d",
  },
  {
    id: "quinn",
    name: "e",
  },
];

//-------------------------
function DragnDrop(props) {
  if (props.tasksOfRoutes && props.tasksOfRoutes.acf)
    props.tasksOfRoutes.acf.tasks.forEach((element) => {
      console.log("element:", element.post_title);
    });
  console.log("props mySite:", props.mySite);
  // console.log("JSON.parse(localStorage.getItem('New_Routes')):", JSON.parse(localStorage.getItem('New_Routes')))
  // console.log("propsDataTask:", props.propDataTask)
  // nameStation = props.myStation.name
  // const [, setFlagFirst] = useState(true)
  const [, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenAddRoute, setModalOpenAddRoute] = useState(false);
  const [, setModalFlagTablet] = useState(false);

  // const [, setHelpFlag] = useState(false);
  const [board, setBoard] = useState([]);
  const [, setCount] = useState(0);
  const [get_Name] = useState(null); // for TextView
  const [, setFlagTree] = useState(true);
  const [, setFlagPhone] = useState(false);
  // const [, setFlagTablet] = useState(false);
  const [, setFlagPhoneOne] = useState(false);
  const [, setWidth] = useState("-13px");
  const [, setHeight] = useState("70px");
  const [, setNameStation] = useState("");
  const [, setBottom] = useState("-27px");
  const [, setKavTopWidth] = useState("25px");
  const [, setNewkavTaskTop] = useState("100px");
  const [, setKavTaskTopMarginTop] = useState("-7px");
  const [, setBorderLeft] = useState("2px solid #c2bfbf");
  const [, setFlagStress] = useState(false);

  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  // const [, setNameStation] = useState(props.myStation.name);
  // const [, setMarginTop] = useState("");
  // let inputHandler = (e) => {
  //     console.log("eeeeeeeeeeeeeeee:", e.target.value)
  //     setInputText(inputText = e.target.value.toLowerCase());
  //     setFilteredData(filteredData = Route.filter((el) => {
  //         // setInputText(lowerCase);
  //         if (inputText === '') {
  //             return el;
  //         }
  //         //return the item which contains the user input
  //         else {
  //             return el.name.toLowerCase().includes(inputText)
  //         }
  //     }))
  // };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  saveProps = props;
  // console.log("props,", saveProps.propDataTask)
  // alert("hi")
  dndArray = props.propDataTask.map((element) => {
    if (count1 === 0) {
      nameStation = props.myStation.name;
      count1++;
    }
    return {
      id: element.id,
      title: element.title.rendered
        .replace("&#8211;", "-")
        .replace("&#8217;", "' "),
      mySite: props.mySite,
      myStation: props.myStation.name,
      data: props.myStation.data,
      nameStation: nameStation,
      width: width,
      borderLeft: borderLeft,
      height: height,
      kavTaskTopMarginTop: kavTaskTopMarginTop,
      bottom: bottom,
      kavTopWidth: kavTopWidth,
      newkavTaskTop: newkavTaskTop,
      idImg: thisId,
      dataImg: saveProps.propDataTask,
    };
  });
  console.log("dndArray check:", dndArray);
  //---------------------------------------------------------
  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  //---------------------------------------------------------
  const addImageToBoard = (id) => {
    thisId = id;
    if (saveTag.props !== undefined) {
      if (saveTag.props.myLastStation === saveTag.props.myStation) {
        setFlagPhoneOne((flagPhoneOne = true));
        setWidth((width = "-84px"));
        setBorderLeft((borderLeft = "2x solid #c2bfbf"));
        setHeight((height = "86px"));
        setBottom((bottom = "45px"));
        setKavTopWidth((kavTopWidth = "0px"));
        setNewkavTaskTop((newkavTaskTop = "100px"));
        setNameStation((nameStation = ""));
        setKavTaskTopMarginTop((kavTaskTopMarginTop = "-27px"));
      } else {
        setFlagPhoneOne((flagPhoneOne = false));
        setBorderLeft((borderLeft = "0x solid #c2bfbf"));
        setWidth((width = "-13px"));
        setHeight((height = "70px"));
        setBottom((bottom = "-27px"));
        setKavTopWidth((kavTopWidth = "25px"));
        setNewkavTaskTop((newkavTaskTop = "0px"));
        // setNameStation(nameStation = props.myStation.name)
        setNameStation((nameStation = props.myStation.name));
        setKavTaskTopMarginTop((kavTaskTopMarginTop = "-7px"));
      }
    }
    setCount(count++);
    // alert(count)
    // setFlagFirst(flagFirst = false)
    Route = dndArray.filter((tag) => id === tag.id);
    setBoard((board) => [...board, Route[0]]);
    // thisIdArray.push(thisId);
    myTask = saveProps.propDataTask.filter((item) => item.id === id);
    // console.log("myTAsk:", myTask[0])
    thisIdArray.push(myTask[0]);
    // console.log("thisIdArray:", thisIdArray)
    // console.log("dndArray:", dndArray)
    localStorage.setItem("New_Routes", JSON.stringify(thisIdArray));
    localStorage.setItem("MySite", JSON.stringify(props.mySite));
  };
  // const help = () => {
  //     setHelpFlag(helpFlag = true)
  //     setModalOpen(true);
  // }
  const treeFunction = () => {
    setFlagPhone((flagPhone = false));
    // setFlagTablet(flagTablet = false)
    setModalFlagTablet((modalFlagTablet = false));
    setFlagTree((flagTree = true));
    // alert("tree")
    // alert(flagPhone)
  };
  const stressFun = () => {
    setFlagStress((flagStress = true));
  };
  const watchFunction = () => {
    setFlagTree((flagTree = false));
    // setFlagTablet(flagTablet = false);
    setModalFlagTablet((modalFlagTablet = false));

    setFlagPhone((flagPhone = false));
  };
  const phoneFunction = () => {
    setFlagTree((flagTree = false));
    setFlagPhone((flagPhone = true));
    setModalFlagTablet((modalFlagTablet = false));
  };
  const tabletFunction = () => {
    setFlagTree((flagTree = false));
    setFlagPhone((flagPhone = false));
    setModalFlagTablet((modalFlagTablet = true));
  };
  // const computerFunction = () => {
  //     setFlagTree(false);
  //     alert("computer")
  // }
  //---------------------------------------------------------
  return (
    <>
      {modalOpen && (
        <ModalTasks
          setOpenModalPlases={setModalOpen}
          allStations={props.allStations}
          help={helpFlag}
        />
      )}
      {modalOpenAddRoute && (
        <Modal setOpenModal={setModalOpenAddRoute} setText={get_Name} />
      )}
      <div
        className="Cover_Tasks"
        style={{
          float: props.language,
          marginRight: "-2%",
          padding: "2%",
          fontSize: "small",
        }}
      >
        {!props.flagHebrew ? (
          <>
            <div
              className="TitleTasks"
              style={{
                background: props.titleTaskCss,
              }}
            >
              {/* <BsThreeDotsVertical className='threeDotsVertical' /> */}
              <div className="MyTitle text">{props.myTasks}</div>
            </div>
            <div
              className="search"
              style={{
                backgroundColor: "#F8F9F3",
                borderStyle: "none none solid none",
                borderColor: "#fff",
                borderWidth: "5px",
              }}
            >
              <input
                className="searchButton"
                dir="rtl"
                placeholder="חפש משימה"
                label={<CgSearch style={{ fontSize: "x-large" }} />}
                // onChange={inputHandler}
              ></input>
            </div>
          </>
        ) : (
          <>
            <div
              className="TitleTasks"
              style={{
                background: props.titleTaskCss,
              }}
            >
              <h3>
                &nbsp;
                <div className="MyTitle">{props.myTasks}</div>
                {/* <BsThreeDotsVertical className='threeDotsVerticalEng' /> */}
              </h3>
            </div>
            <div
              className="search"
              style={{
                backgroundColor: "#F8F9F3",
                borderStyle: "none none solid none",
                borderColor: "#fff",
                borderWidth: "5px",
              }}
            >
              <input
                className="searchButton"
                dir="rtl"
                label={<CgSearch style={{ fontSize: "x-large" }} />}
                // onChange={inputHandler}
              ></input>
            </div>
          </>
        )}
        {/* המשימות */}
        <div className="TasksCover">
          {dndArray.length === 0
            ? null
            : dndArray.map((tag) => {
                return (
                  <Tag
                    title={tag.title}
                    id={tag.id}
                    key={tag.id}
                    idImg={tag.idImg}
                    dataImg={tag.dataImg}
                    flagBoard={false}
                    myStation={tag.myStation}
                    myLastStation={props.myStation.name}
                    count={count}
                    data={tag.data}
                  />
                );
              })}
        </div>
        <div className="addTaskCover">
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
      <>
        {props.flagHebrew ? (
          <>
            <div className="Board" style={{ marginLeft: "1119px" }} ref={drop}>
              <i className="bi bi-dash-square">
                <div
                  style={{
                    position: "relative",
                    left: "13px",
                  }}
                >
                  {/* <Images id={thisId} data={saveProps.propDataTask} /> */}
                </div>
                {/* <Audios id={thisId} data={myTask} /> */}
                <div className="txt">
                  {" "}
                  {props.drag}&nbsp;&nbsp;
                  {/* <button className="helpBtn" onClick={() => {
                            help()
                        }} >help</button> */}
                  <div style={{ fontSize: "20px", left: "185px" }}>
                    {/* <span><RiDragMove2Line /></span> */}
                    {/* <div className='kavTop'></div> */}
                  </div>
                  {/* &nbsp;<RiDragMove2Line /> */}
                </div>
              </i>
              <div className="MyTasks">
                {props.mySite.name}
                {board.map((tag, keyCount) => {
                  return (
                    <Tag
                      title={tag.title}
                      idImg={tag.idImg}
                      data={tag.data}
                      dataImg={tag.dataImg}
                      id={tag.id}
                      key={keyCount}
                      flagBoard={true}
                      myStation={tag.myStation}
                      myMarginTop={"-68px"}
                      myLastStation={props.myStation.name}
                      count={count}
                    />
                  );
                })}
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="Board" ref={drop}>
              <i className="bi bi-dash-square">
                <div
                  style={{
                    position: "relative",
                    left: "13px",
                  }}
                ></div>
                {/* <Audios id={thisId} data={myTask} /> */}
                <div className="txt">
                  {" "}
                  {props.drag}&nbsp;&nbsp;
                  <div style={{ fontSize: "20px", left: "185px" }}></div>
                </div>
                <button
                  className="AddRoute"
                  type="submit"
                  onClick={() => {
                    setModalOpenAddRoute(true);
                  }}
                >
                  שמור מסלול &nbsp;&nbsp;
                  <AiFillCheckCircle className="icon" />
                </button>
              </i>
              {/* <div className='my_Buttons_icons'>
                                <button className='tree'></button>
                                <div className='kavIconsTree'></div>
                                <button className='watch'></button>
                                <div className='kavIconsWatch'></div>
                                <button className='phone'></button>
                                <div className='kavIconsPhone'></div>
                                <button className='tablet'></button>
                                <div className='kavIconsTablet'></div>
                                <button className='computer'></button>
                            </div> */}
              <div className="my_Buttons_icons">
                <button
                  className="tree"
                  onClick={() => {
                    treeFunction();
                  }}
                >
                  <div className="kavIconsTree"></div>
                </button>
                <button
                  className="watch"
                  onClick={() => {
                    watchFunction();
                  }}
                >
                  <div className="kavIconsWatch"></div>
                </button>
                <button
                  className="phone"
                  onClick={() => {
                    phoneFunction();
                  }}
                >
                  <div className="kavIconsPhone"></div>
                </button>
                <button
                  className="tablet"
                  onClick={() => {
                    tabletFunction();
                  }}
                >
                  <div className="computer">
                    <div className="kavIconsTablet"></div>
                  </div>
                </button>
              </div>
              <div className="MyTasks">
                {/* flagTree   */}
                {flagTree ? (
                  <>
                    {props.mySite.name ? (
                      <>
                        <div className="kavT"></div>
                        <div className="mySiteChois">
                          {props.mySite.name}
                          &nbsp;&nbsp;{" "}
                        </div>
                        {props.tasksOfRoutes && props.tasksOfRoutes.acf ? (
                          <>
                            {props.tasksOfRoutes.acf.tasks.map(
                              (element, keyCount) => {
                                //שליחת המסלול
                                return (
                                  <Tag
                                    key={keyCount}
                                    title={element.post_title}
                                    id={element.ID}
                                    flagBoard={true}
                                    myLastStation={props.myStation.name}
                                    myMarginTop={"-68px"}
                                    count={count}
                                    flagTree={flagTree}
                                  />
                                );
                              }
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {board.map((tag, keyCount) => {
                      return (saveTag = (
                        <Tag
                          modalFlagTablet={modalFlagTablet}
                          title={tag.title}
                          id={tag.id}
                          data={tag.data}
                          idImg={tag.idImg}
                          dataImg={tag.dataImg}
                          key={keyCount}
                          flagBoard={true}
                          myLastStation={props.myStation.name}
                          myStation={tag.myStation}
                          myMarginTop={"-68px"}
                          count={count}
                          flag={tag.flag}
                          width={tag.width}
                          borderLeft={tag.borderLeft}
                          height={tag.height}
                          setKavTaskTopMarginTop={tag.setKavTaskTopMarginTop}
                          bottom={tag.bottom}
                          kavTopWidth={tag.kavTopWidth}
                          newkavTaskTop={tag.newkavTaskTop}
                          nameStation={tag.nameStation}
                          flagPhone={flagPhone}
                          flagTree={flagTree}
                        />
                      ));
                    })}
                    {flagPhoneOne ? (
                      <>
                        <div className="kavB"></div>
                      </>
                    ) : (
                      <>
                        <div className="kavBOne"></div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* flagPhone */}
                    {flagPhone ? (
                      <>
                        {props.tasksOfRoutes && props.tasksOfRoutes.acf ? (
                          <>
                            <div className="phoneCover">
                              <div className="phoneHeaderCover">
                                <div className="hederPhone">
                                  <button
                                    className="stress"
                                    onClick={() => stressFun()}
                                  ></button>
                                  <div className="cellInfo"></div>
                                  <Dot className="Dotcamera" color="#2f2f2f" />
                                  <div className="clock">
                                    <Clock />
                                  </div>
                                </div>
                              </div>
                              {props.tasksOfRoutes.acf.tasks.map(
                                (element, keyCount) => {
                                  //שליחת המסלול
                                  return (
                                    <Tag
                                      key={keyCount}
                                      title={element.post_title}
                                      id={element.ID}
                                      flagBoard={true}
                                      myLastStation={props.myStation.name}
                                      myMarginTop={"-68px"}
                                      count={count}
                                      flagTree={flagTree}
                                      flagPhone={flagPhone}
                                    />
                                  );
                                }
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <Phone
                              modalFlagTablet={modalFlagTablet}
                              flagPhone={flagPhone}
                              board={board}
                              saveTag={saveTag}
                              count={count}
                              myStation={props.myStation}
                              flagTree={flagTree}
                              flagStress={flagStress}
                              mySite={props.mySite}
                            />
                          </>
                        )}

                        {/* --------------------------------------------------- */}

                        {/* --------------------------------------------------- */}
                      </>
                    ) : (
                      <>
                        {/* {modalFlagTablet ? <>
                                                <Tablet
                                                    flagPhone={flagPhone}
                                                    board={board}
                                                    saveTag={saveTag}
                                                    count={count}
                                                    myStation={props.myStation}
                                                    flagTree={flagTree}
                                                    flagStress={flagStress}
                                                    mySite={props.mySite} />

                                            </> : <></>} */}
                        {modalFlagTablet ? (
                          <>
                            <Tablet
                              modalFlagTablet={modalFlagTablet}
                              flagPhone={flagPhone}
                              board={board}
                              saveTag={saveTag}
                              count={count}
                              myStation={props.myStation}
                              flagTree={flagTree}
                              flagStress={flagStress}
                              mySite={props.mySite}
                            />
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </>
    </>
  );
}
export default DragnDrop;
