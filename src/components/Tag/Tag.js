import React, { useState } from "react";
import { useDrag } from "react-dnd";
// import { RiDragMove2Line } from "react-icons/ri";
import "./style.css";
// import Dot from "../Dot/Dot"
import { BsThreeDotsVertical } from "react-icons/bs";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";

let idListen = 0;
let dataListen = {};

// import { useState, } from 'react';
function Tag({
  title,
  id,
  flagBoard,
  myStation,
  myMarginTop,
  count,
  myLastStation,
  width,
  height,
  kavTopWidth,
  bottom,
  nameStation,
  kavTaskTopMarginTop,
  borderLeft,
  flagPhone,
  idImg,
  dataImg,
  data,
  modalFlagTablet,
}) {
  localStorage.setItem("myLastStation", JSON.stringify(myLastStation));
  console.log("title in Tag:", title);
  console.log("myLastStation:", myLastStation);
  console.log("width width width widthwidthwidth:", kavTaskTopMarginTop);
  console.log("myStation:", myStation);
  console.log("countcountcountcount:", count);
  console.log("id:", id);
  console.log("title:", title);
  const [, setIdListen] = useState(0);
  const [, setDataListen] = useState({});

  // console.log("flag Tag", flag)

  const [, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const listen = () => {
    setIdListen((idListen = idImg));
    setDataListen((dataListen = dataImg));
    // console.log("dataListen:", dataListen)
  };
  const listenMyStation = () => {
    data.forEach((val) => {
      if (nameStation === val.name) setIdListen((idListen = val.id));
    });
    setDataListen((dataListen = data));
    console.log("idListen:", idListen);
    console.log("dataListen", dataListen);
  };
  return (
    <>
      {flagBoard && !flagPhone && !modalFlagTablet ? (
        <>
          {/* {myLastStation !== myStation && flagBoard ? <>  <div className='kavTask3'></div></> : <></>} */}

          <div className="kav"></div>
          <div className="kavTop" style={{ width: kavTopWidth }}>
            <div className="titleStat"></div>
            <div className="kavTask" style={{ borderLeft: borderLeft }}>
              {/* <div className='kavB'></div> */}
            </div>
            <div
              className="kavTask2"
              style={{ height: height, bottom: bottom }}
            ></div>
            <div className="kavTaskTop" style={{ marginTop: width }}></div>
            <div className="nameStationBoard">{nameStation}</div>
          </div>
        </>
      ) : (
        <>{/* <Dot color="#C4CE9C" /> */}</>
      )}
      {flagBoard && flagPhone && !modalFlagTablet ? (
        <>
          <div className="margin"></div>
          {nameStation !== "" ? (
            <>
              {console.log("flagPhone:", flagPhone)}

              <div className="stap1">
                <div className="nameStationBoardPhone">{nameStation}</div>
                <button
                  className="listenIconStation"
                  onClick={() => listenMyStation()}
                ></button>
                <div className="kavPhoneStationBoard"></div>
              </div>
            </>
          ) : (
            <></>
          )}
          <BsThreeDotsVertical className="threeDotsVerticalTasks" />
          <div className="borderTask">
            <div className="nameOfTaskPhone">
              {" "}
              {title}
              <Images id={idImg} data={dataImg} />
            </div>
          </div>
          <button className="listenIcon" onClick={() => listen()}></button>
          <Audios id={idListen} data={dataListen} />
          <div className="kavPhone"></div>
        </>
      ) : (
        <>
          {/* משימות */}
          {!modalFlagTablet ? (
            <>
              <div
                className="buttons"
                style={{ marginTop: myMarginTop }}
                ref={drag}
                src={title}
              >
                <BsThreeDotsVertical className="threeDotsVerticalTasks" />
                <div className="nameOfTask"> {title}</div>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* <Dot color="#C4CE9C" /> */}
        </>
      )}

      {flagBoard && modalFlagTablet && !flagPhone ? (
        <>
          <div className="ItemStyle">
            <Images id={idImg} data={dataImg} flag={true} />
          </div>
        </>
      ) : (
        <></>
      )}
      {/* {!flagPhone ? <>      <div className='Tasks' style={{ marginTop: myMarginTop }} ref={drag} src={title}>

                <BsThreeDotsVertical className='threeDotsVerticalTasks' />

                <div className={'nameOfTask'}> {title}</div>
            </div></> : <>

            </>} */}
    </>
  );
}
export default Tag;
