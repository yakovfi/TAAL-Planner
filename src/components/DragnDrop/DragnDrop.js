import React, { useState, useEffect, } from 'react';
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Audios from "../Audios/Audios";
import Modal_Tasks from '../Modal/Modal_Tasks';
import { AiOutlinePlus } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
// import Images from "../Images/Images";
// import { RiDragMove2Line } from "react-icons/ri";
// import { FcAddDatabase } from "react-icons/fc";
// import { MdOutlineLiveHelp } from "react-icons/md";
// import Dot from "../Dot/Dot";
// import MyStations from '../Stations/MyStation.js';
// import View_my_tasks from '../View_my_tasks/View_my_tasks';
//-------------------------

let Route = [];
let dndArray = [];
let saveProps = [];
let thisId = ""
let thisIdArray = [];
let myTask = {};
let helpFlag = false;
let inputText = '';
let filteredData = [];
let flagFirst = true;
let count = 0;
//-------------------------
function DragnDrop(props) {

    console.log("propsDataTask:", props.propDataTask)


    const [, setFlagFirst] = useState(true)
    const [, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setHelpFlag] = useState(false);
    const [board, setBoard] = useState([]);
    const [, setInputText] = useState("");
    const [, setFilteredData] = useState([]);
    const [, setCount] = useState(0);

    let inputHandler = (e) => {
        console.log("eeeeeeeeeeeeeeee:", e.target.value)

        //convert input text to lower case
        setInputText(inputText = e.target.value.toLowerCase());

        setFilteredData(filteredData = Route.filter((el) => {
            // setInputText(lowerCase);

            if (inputText === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.name.toLowerCase().includes(inputText)
            }
        }))
    };
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
            mySite: props.mySite,
            myStation: props.myStation.name
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

        setCount(count++)
        // alert(count)
        setFlagFirst(flagFirst = false)
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
                marginRight: "-2%",
                padding: "2%",
                fontSize: "small"
            }}>
                {!props.flagHebrew ?
                    <><div className='TitleTasks' style={{
                        background: props.titleTaskCss
                    }}><h3>
                            <BsThreeDotsVertical className='threeDotsVertical' />
                            <div className='MyTitle'>{props.myTasks}</div>
                        </h3>
                    </div>
                        <div className="search" style={{
                            backgroundColor: "#F8F9F3", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"
                        }}>
                            <input className='searchButton'
                                dir="rtl"
                                label={<CgSearch style={{ fontSize: "x-large", }} />}
                                onChange={inputHandler}
                            ></input>
                        </div></> : <>

                        <div className='TitleTasks' style={{
                            background: props.titleTaskCss
                        }}><h3>
                                &nbsp;
                                <div className='MyTitle'>{props.myTasks}</div>
                                <BsThreeDotsVertical className='threeDotsVerticalEng' />

                            </h3></div>
                        <div className="search" style={{
                            backgroundColor: "#F8F9F3", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"
                        }}>
                            <input className='searchButton'
                                dir="rtl"
                                label={<CgSearch style={{ fontSize: "x-large", }} />}
                                onChange={inputHandler}
                            ></input>
                        </div>
                    </>}
                <div className='TasksCover'>
                    {dndArray.length === 0 ? null : dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} myStation={tag.myStation} />;
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
                                {/* <Images id={thisId} data={saveProps.propDataTask} /> */}
                            </div>
                            <Audios id={thisId} data={myTask} />

                            <div className='txt'> {props.drag}&nbsp;&nbsp;
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
                        <div className='MyTasks'>
                            {props.mySite.name}

                            {board.map((tag, keyCount) => {

                                return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} flagBoard={true} myStation={tag.myStation} myMarginTop={'-68px'} />;
                            })}
                        </div>
                    </div> :
                    <div className="Board" ref={drop} >

                        <i className="bi bi-dash-square">
                            <div style={{
                                position: "relative",
                                left: "13px"
                            }}>
                            </div>
                            <Audios id={thisId} data={myTask} />

                            <div className='txt'> {props.drag}&nbsp;&nbsp;
                                <div style={{ fontSize: "20px", left: "185px" }}>
                                    {/* <span><RiDragMove2Line /></span> */}
                                </div>
                            </div>
                        </i>

                        <div className='MyTasks'>
                            <div className='kavT'></div>

                            {props.mySite.name ? <> <div className='mySiteChois'>
                                {props.mySite.name}

                                &nbsp;&nbsp; </div></> : <></>}

                            {board.map((tag, keyCount) => {

                                return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} flagBoard={true} myStation={tag.myStation} myMarginTop={'-68px'} count={count} />;
                            })}
                            <div className='kavB'></div>

                        </div>
                        {/* <Images id={thisId} data={saveProps.propDataTask} /> */}

                    </div>}

            </>
        </>
    );
}
export default DragnDrop;
