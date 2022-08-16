import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import "./style.css";
// import Dot from "../Dot/Dot"


function Tag({ title, id, flagBoard }) {
    console.log("how am i:", flagBoard)
    const [, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <>

            <button className='Tasks' ref={drag} src={title}>
                <div className='penIcon' ></div>
                <div className='eyeIcon' ></div>
                <div className={'nameOfTask'}> {title}</div>

                {flagBoard ? <>

                    <div className='kav'></div><div className='kavTop'></div>   </> : <>
                    {/* <Dot color="#C4CE9C" /> */}
                </>}

                {/* <RiDragMove2Line style={{ fontSize: "25px", color: "rgb(164, 190, 125)" }} /> */}
            </button>

        </>
    );
}
export default Tag;
