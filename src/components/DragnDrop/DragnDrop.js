import React, { useState, useEffect, } from 'react';
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";
import { RiDragMove2Line } from "react-icons/ri";
import { FcAddDatabase } from "react-icons/fc";
import { MdOutlineLiveHelp } from "react-icons/md";
import Modal_Tasks from '../Modal/Modal_Tasks';
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs"

//-------------------------
let Route = [];
let dndArray = [];
let saveProps = [];
let thisId = ""
let thisIdArray = [];
let myTask = {};
let helpFlag = false;

//-------------------------
function DragnDrop(props) {
    // console.log("mySite drag:", props.mySite)
    // console.log("Task AllStation in:", props.allStations)
    console.log("Task AllStation in:", props.language)

    const [, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setHelpFlag] = useState(false);
    const [board, setBoard] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    saveProps = props;

    // console.log("props,", saveProps.propDataTask)

    dndArray = (props.propDataTask).map((element) => {
        return {
            id: element.id,
            title: element.title.rendered.replace("&#8211;", "-").replace("&#8217;", "' "),
            mySite: props.mySite
        }
    })
    console.log("dndArray:", dndArray);
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
        Route = dndArray.filter((tag) => id === tag.id);
        setBoard((board) => [...board, Route[0]]);
        // thisIdArray.push(thisId);
        myTask = saveProps.propDataTask.filter((item) => item.id === id)
        console.log("myTAsk:", myTask[0])
        thisIdArray.push(myTask[0]);
        console.log("thisIdArray:", thisIdArray)
        console.log("dndArray:", dndArray)

        localStorage.setItem('New_Routes', JSON.stringify(thisIdArray))
        localStorage.setItem('MySite', JSON.stringify(props.mySite))

    };
    const help = () => {
        setHelpFlag(helpFlag = true)
        setModalOpen(true);
    }
    //---------------------------------------------------------
    return (
        <>

            {modalOpen && <Modal_Tasks setOpenModalPlases={setModalOpen} allStations={props.allStations} help={helpFlag} />}
            <div className='Cover_Tasks' style={{
                float: props.language,
                padding: "1%",
                marginRight: "2%",
                fontSize: "small"
            }}>
                <div className='TitleTasks' style={{

                    //   background: linear-gradient(90deg, rgb(164, 190, 125) 5%, rgb(236, 245, 220) 1%);
                    background: props.titleTaskCss
                }}><h3>

                        <BsThreeDotsVertical className='threeDotsVertical' />

                        <div className='MyTitle'>{props.myTasks}</div>

                    </h3></div>

                <div className='TasksCover'>
                    {dndArray.length === 0 ? null : dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} />;
                    })}
                </div>

                <div className='addTaskCover'>
                    <button
                        className='AddStation'
                        onClick={() => {
                            setModalOpen(true);
                        }}>
                        <AiOutlinePlus className='plus_station' />

                    </button>
                </div>
            </div>
            <>
                {props.flagHebrew ?
                    <div className="Board" style={{ marginLeft: "1119px" }} ref={drop} >
                        <i className="bi bi-dash-square">
                            <div style={{
                                position: "relative",
                                left: "13px"
                            }}>
                                <Images id={thisId} data={saveProps.propDataTask} />
                            </div>
                            <Audios id={thisId} data={myTask} />

                            <div className='txt'> {props.drag}&nbsp;&nbsp;
                                {/* <button className="helpBtn" onClick={() => {
                            help()
                        }} >help</button> */}
                                <div className="blink" style={{ fontSize: "35px", left: "185px" }}><span><RiDragMove2Line /></span></div>
                                {/* &nbsp;<RiDragMove2Line /> */}
                            </div>
                        </i>
                        <div className='MyTasks'>
                            {board.map((tag, keyCount) => {
                                return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} />;
                            })}
                        </div>
                    </div> : <div className="Board" ref={drop} >
                        <i className="bi bi-dash-square">
                            <div style={{
                                position: "relative",
                                left: "13px"
                            }}>
                                <Images id={thisId} data={saveProps.propDataTask} />
                            </div>
                            <Audios id={thisId} data={myTask} />

                            <div className='txt'> {props.drag}&nbsp;&nbsp;

                                <div className="blink" style={{ fontSize: "35px", left: "185px" }}><span><RiDragMove2Line /></span></div>

                            </div>
                        </i>
                        <div className='MyTasks'>
                            {board.map((tag, keyCount) => {
                                return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} />;
                            })}
                        </div>
                    </div>}

            </>
        </>
    );
}
export default DragnDrop;
