import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import "./style.css";
// import Dot from "../Dot/Dot"
import { useState, useEffect, } from 'react';


function Tag({ title, id, flagBoard, myStation, myMarginTop, count }) {

    console.log("countcountcountcount:", count)

    console.log("id:", id)
    console.log("title:", title)


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


                <div className='kav'></div><div className='kavTop'><div className="titleStat"></div><div className="nameStationBoard"> {myStation}</div></div>  </> : <>
                {/* <Dot color="#C4CE9C" /> */}
            </>}
            {/* {count > 1 ? <><div className='kav2'></div></> : <></>} */}
            <button className='Tasks' style={{ marginTop: myMarginTop }} ref={drag} src={title}>
                <div className='penIcon' ></div>
                <div className='eyeIcon' ></div>
                <div className={'nameOfTask'}> {title}</div>
                {flagBoard ? <>   <div className='kavTask'></div><div className='kavTask2'></div>
                    <div className='kavTaskTop'></div>
                </> : <></>}



                {/* <RiDragMove2Line style={{ fontSize: "25px", color: "rgb(164, 190, 125)" }} /> */}
            </button>


        </>
    );
}
export default Tag;
