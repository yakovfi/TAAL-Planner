import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import Dot from '../Dot/Dot'
import "./style.css";


function Tag({ title, id, show }) {
    const [, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <>

            <button className='Tasks' ref={drag} src={title}>{title}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {/* <Dot color="rgb(164, 190, 125)" />   */}
                <RiDragMove2Line style={{ fontSize: "25px", color: "rgb(164, 190, 125)" }} />

            </button>

        </>
    );
}
export default Tag;
