import React from "react";
import { useDrag } from "react-dnd";
// import { RiDragMove2Line } from "react-icons/ri";
import "./style.css";
// import Dot from "../Dot/Dot"
import { BsThreeDotsVertical } from "react-icons/bs"

// import { useState, } from 'react';

function Tag({ title, id, flagBoard, myStation, myMarginTop, count, myLastStation, width, height, kavTopWidth, bottom, nameStation, kavTaskTopMarginTop }) {
    localStorage.setItem('myLastStation', JSON.stringify(myLastStation))

    console.log("myLastStation:", myLastStation)
    console.log("width width width widthwidthwidth:", kavTaskTopMarginTop)

    console.log("myStation:", myStation)
    console.log("countcountcountcount:", count)
    console.log("id:", id)
    console.log("title:", title)
    // console.log("flag Tag", flag)

    const [, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),

    }));

    return (
        <>
            {flagBoard ? <>
                {/* {myLastStation !== myStation && flagBoard ? <>  <div className='kavTask3'></div></> : <></>} */}

                <div className='kav'></div>
                <div className='kavTop' style={{ width: kavTopWidth }}>
                    <div className="titleStat"></div>
                    <div className='kavTask'></div>
                    <div className='kavTask2' style={{ height: height, bottom: bottom }}></div>
                    <div className='kavTaskTop' style={{ marginTop: width }}></div>
                    <div className="nameStationBoard">{nameStation}
                    </div>
                </div>  </> :

                <>


                    {/* <Dot color="#C4CE9C" /> */}
                </>}
            {/* {count > 1 ? <><div className='kav2'></div></> : <></>} */}
            <div className='Tasks' style={{ marginTop: myMarginTop }} ref={drag} src={title}>

                {/* <div className='penIcon' ></div>
                <div className='eyeIcon' ></div> */}
                <BsThreeDotsVertical className='threeDotsVerticalTasks' />

                <div className={'nameOfTask'}> {title}</div>

                {/* {myLastStation === myStation ? <>{console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiii")}</> : <></>} */}



                {/* <RiDragMove2Line style={{ fontSize: "25px", color: "rgb(164, 190, 125)" }} /> */}
            </div>


        </>
    );
}
export default Tag;
