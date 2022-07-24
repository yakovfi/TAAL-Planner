import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import { FcAddDatabase, FcSearch } from "react-icons/fc";
import { MdOutlineAdsClick } from "react-icons/md";
import './style.css';
import Tasks_comp from "../Tasks_comp/Tasks_comp";
import Dot from '../Dot/Dot'
import Modal_Stations from '../Modal/Modal_Stations'
import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";

//-----------------------
let allTasks = [];
let tasks = [];
let filteredData = []
let inputText = ""
let flagFirstTime = true;
//-----------------------

const Stations = (props) => {
    console.log("station:", props.language.setFloatLang)
    // console.log(" props.allStations:", props.allStations)
    // console.log(" props.idTask:", props.idTask)
    const [, setStateTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [, setFilteredData] = useState([]);
    const [, setInputText] = useState("");
    const [, setFlagFirstTime] = useState(false);

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
        if (tasks.length > 0) {
            tasks = [];
        }
        allTasks.forEach(element => {
            for (let i = 0; i < element.places.length; i++) {
                if (element.places[i] === e.id) {
                    tasks.push(element)
                }
            }
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
                    {modalOpen && <Modal_Stations setOpenModalPlaces={setModalOpen} idTasks={props.idTask} />}
                    <div className='Cover_Stations' style={{
                        float: props.language.setFloatLang,
                        marginRight: "2%",
                        padding: "1%"
                    }}>
                        <div className='TitleStation'><h3>{props.stationsName}</h3></div>
                        <div className='addStationCover'>
                            <button
                                className='AddStation'
                                onClick={() => {
                                    setModalOpen(true);
                                }}>
                                <FcAddDatabase style={{
                                    width: "85px",
                                    height: "30px"
                                }} />
                                <h6>Add station</h6>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <div className="search" style={{
                            backgroundColor: "rgb(255, 242, 234)", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"

                        }}>
                            <TextField
                                dir="rtl"
                                style={{
                                    backgroundColor: "#fff", right: "10%", margin: "10px"
                                }}
                                id="outlined-basic"
                                variant="outlined"

                                label={<FcSearch style={{ fontSize: "x-large" }} />}
                                onChange={inputHandler}
                            />
                        </div>
                        <div className='Stations'>
                            {
                                filteredData.map((value, index) => {
                                    return (
                                        <button className='Station'
                                            onClick={() => Display_The_Tasks(value)}
                                            key={index}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <MdOutlineAdsClick style={{ fontSize: "25px", color: "#e29e62" }} />
                                            {/* <Dot color="#e29e62" /> */}
                                        </button>
                                    )
                                })}
                        </div>
                    </div>
                    <Tasks_comp propsDataTask={tasks} allStations={props.allStations} language={props.language.setFloatLang} myTasks={props.myTasks} />
                </>
            )}
        </>
    );
}
export default Stations;
//----------------------------------------