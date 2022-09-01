import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
// import { FcSearch } from "react-icons/fc";
// import { MdOutlineAdsClick } from "react-icons/md";
import './style.css';
import TasksComp from "../Tasks_comp/Tasks_comp";
import ModalStations from '../Modal/Modal_Stations'
// import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";
import { AiOutlinePlus } from "react-icons/ai";
// import Dot from "../Dot/Dot"
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgSearch } from "react-icons/cg";
import "@fontsource/assistant";

//-----------------------
let allTasks = [];
let tasks = [];
let filteredData = []
let inputText = ""
let flagFirstTime = true;
let myStation = { name: '', id: '', flag: true }

//-----------------------

const Stations = (props) => {
    // console.log("station:", props.language.setFloatLang)
    // console.log("mySite:", props.mySite);
    // console.log("propsDataStations:", props.propsData);


    // console.log(" props.allStations:", props.allStations)
    // console.log(" props.idTask:", props.idTask)
    // const [, set_obj] = useState(null);// for TextView
    const [, setStateTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [, setFilteredData] = useState([]);
    const [, setInputText] = useState("");
    const [, setFlagFirstTime] = useState(false);
    const [, setMyStation] = useState(null);


    if (flagFirstTime === true) {
        filteredData = props.propsData
    }

    // console.log("filtered Data 1:", filteredData)

    let inputHandler = (e) => {
        setInputText(inputText = e.target.value.toLowerCase());

        setFlagFirstTime(flagFirstTime = false)
        //convert input text to lower case
        // setFilteredData(filteredData = [])
        // console.log("filtered Data 2:", filteredData)
        setFilteredData(filteredData = props.propsData.filter((el) => {
            if (inputText === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.name.toLowerCase().includes(inputText)
            }
        }))
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
        }
        fetchData();
    }, []);
    const getingData = async () => {

        await get(`${baseUrl}/wp-json/wp/v2/tasks/`, {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        })
            .then(res => {
                allTasks = res;
            });
    }
    const Display_The_Tasks = (e) => {
        // console.log("myStation.idddddddddddddddddddddddd:", myStation.id)
        // console.log(" e.iddddddddddddddddddddddddddddddd:", e.id)

        if (myStation.id === e.id) {
            setMyStation(myStation.flag = false)

        }
        else {
            setMyStation(myStation.flag = true)

        }
        // console.log("myStation  flagssssssssssssssssssssssssssssssssssssssssssssss:", myStation.flag)
        setMyStation(myStation.name = e.name)
        setMyStation(myStation.id = e.id)


        // console.log("console myStat myStation:", myStation)

        if (tasks.length > 0) {
            tasks = [];
        }

        allTasks.forEach(element => {
            for (let i = 0; i < element.places.length; i++) {
                if (element.places[i] === e.id) {
                    tasks.push(element)
                }
            }
            // console.log("Display_The_Tasks", tasks)

        })

        setFilteredData(filteredData = props.propsData.filter((el) => {
            if (inputText === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.name.toLowerCase().includes(inputText)
            }
        }))
        // console.log("filteredData from st:", filteredData)
        setStateTask({ data: tasks })//Updating the state
    }
    //----------------------------------------------------------
    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    {modalOpen && <ModalStations setOpenModalPlaces={setModalOpen} idTasks={props.idTask} />}
                    <div className='Cover_Stations' style={{
                        float: props.language.setFloatLang,
                        marginRight: "-2%",
                        padding: "2%"
                    }}>

                        {!props.flagHebrew ? <><div className='TitleStation' style={{

                            background: props.titleStationCss
                            //   background: linear-gradient(90deg, rgb(255, 234, 220) 95%, #e29e62 1%);
                        }}>

                            {/* <BsThreeDotsVertical className='threeDotsVertical' /> */}

                            <div className='MyTitle text'> {props.stationsName}</div></div></> : <>
                            <div className='TitleStation' style={{

                                background: props.titleStationCss
                                //   background: linear-gradient(90deg, rgb(255, 234, 220) 95%, #e29e62 1%);
                            }}><h3>
                                    &nbsp;&nbsp;&nbsp;

                                    <div className='MyTitle'> {props.stationsName}</div>

                                    {/* <BsThreeDotsVertical className='threeDotsVerticalEngStation' /> */}
                                </h3>
                            </div></>}
                        <div className="search" style={{
                            backgroundColor: "rgb(255, 242, 234)", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"

                        }}>
                            <input className='searchButton'
                                dir="rtl"
                                placeholder="חפש תחנה"

                                label={<CgSearch style={{ fontSize: "x-large", }} />}
                                onChange={inputHandler}
                            ></input>
                        </div>
                        <div className='Stations'>
                            {
                                filteredData.map((value, index) => {
                                    return (
                                        <button className='Station'
                                            onClick={() => Display_The_Tasks(value)}
                                            key={index}>
                                            {/* <div className='penIcon' ></div>
                                            <div className='eyeIcon' ></div> */}
                                            <BsThreeDotsVertical className='threeDotsVerticalEng' />

                                            <div className="nameOfStation">{value.name}</div>

                                            {/* <Dot color="#F2AE69" /> */}
                                        </button>
                                    )
                                })}
                        </div>
                        <div className='addStationCover'>
                            <button
                                className='AddStation'
                                onClick={() => {
                                    setModalOpen(true);
                                }}>
                                <AiOutlinePlus className='plus_station' />

                            </button>
                        </div>
                    </div>
                    <TasksComp propsDataTask={tasks} allStations={props.allStations} language={props.language.setFloatLang}
                        myTasks={props.myTasks} drag={props.drag}
                        addMyTask={props.addMyTask} titleTaskCss={props.titleTaskCss} mySite={props.mySite} myStation={myStation}
                        flagHebrew={props.flagHebrew} tasksOfRoutes={props.tasksOfRoutes} myStations={props.propsData} />
                </>
            )}
        </>
    );
}
export default Stations;
//----------------------------------------