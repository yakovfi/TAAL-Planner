import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { MdOutlineAdsClick } from "react-icons/md";
import { FcAddDatabase, FcSearch } from "react-icons/fc";
import Stations from '../Stations/Stations'
import Modal_Places from '../Modal/Model_Places'
import Modal_Loading from '../Modal/Modal_Loading'
import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";
// const { baseUrl } = require
//-----------------------
let places = [];
let onlyAllStation = [];
let stationArray = [];
let Places_and_their_stations = [];
let thisIdTask = 0;
let filteredData = []
let inputText = ""

//-----------------------
const Places = (props) => {
    console.log("setFloatLan:", props.setFloatLang)
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setStateStation] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setThisIdTask] = useState(0)
    const [, setOnlyAllStation] = useState([]);
    const [, setPlaces] = useState([]);
    const [, setFilteredData] = useState([]);
    const [, setInputText] = useState("");

    let inputHandler = (e) => {
        //convert input text to lower case
        setInputText(inputText = e.target.value.toLowerCase());

        setFilteredData(filteredData = places.filter((el) => {
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
                getData();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    const getData = async () => {
        await get(`${baseUrl}/wp-json/wp/v2/places/`, {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            // console.log("res: ", res)
            setPlaces(places = res.filter((item) => item.parent === 0))
            setOnlyAllStation(onlyAllStation = res.filter((item) => item.parent > 0))

            Places_and_their_stations = places.map((element) => {
                return {
                    parent: element,
                    related: res.filter((r) => r.parent === element.id)
                }
            })
            setFilteredData(filteredData = places.filter((el) => {

                if (inputText === '') {
                    return el;
                }
                //return the item which contains the user input
                else {
                    return el.name.toLowerCase().includes(inputText)
                }
            }))
        });
        setDone(true)
        // setData_Loaded(true)
    }
    const Display_The_Stations = (e) => {
        setThisIdTask(thisIdTask = e.id)
        if (stationArray.length > 0) {
            stationArray = [];
        }
        // console.log("val:", e);
        Places_and_their_stations.forEach(element => {
            if (element.parent.id === e.id) {
                element.related.forEach(rel => {
                    setStateStation({ data: stationArray.push(rel) });
                });
                // console.log("stationArray:", stationArray);
            }
        });
        setStateStation({ data: stationArray })
    }
    //----------------------------------------------------------------------
    return (
        <>
            {!done ? <>
                {<Modal_Loading />}
            </>
                :
                <>
                    {modalOpen && <Modal_Places setOpenModalPlaces={setModalOpen} />}

                    <div className='Cover_Places' style={{
                        float: props.setFloatLang,
                        padding: "1%",
                        marginRight: "2%"
                    }}>
                        <div className='TitlePlaces' style={{
                            background: props.titlePlacesCss

                        }}><h3>{props.sites}</h3></div>
                        <div className='addPlaceCover'>
                            <button
                                className='AddPlace'
                                onClick={() => {
                                    setModalOpen(true);
                                }}>
                                <FcAddDatabase style={{
                                    width: "85px",
                                    height: "30px"
                                }} />
                                <h6>{props.addSite}</h6>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <div className="search" style={{
                            backgroundColor: "rgb(237, 234, 255)", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"
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
                        <div className='Places'>
                            {filteredData.map((value, index) => {
                                return (
                                    <button
                                        className='Place'
                                        onClick={() => Display_The_Stations(value)}
                                        key={index}>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        {value.name}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {/* <Dot color="rgb(161, 147, 229)" /> */}
                                        <MdOutlineAdsClick style={{ fontSize: "25px", color: "rgb(161, 147, 229)" }} />
                                    </button>
                                )
                            })}

                        </div>
                    </div>
                    <Stations propsData={stationArray} idTask={thisIdTask} allStations={onlyAllStation}
                        language={props} stationsName={props.stations} myTasks={props.myTasks} drag={props.drag}
                        addStation={props.addStation} addMyTask={props.addMyTask}
                        titleStationCss={props.titleStationCss} titleTaskCss={props.titleTaskCss} />
                </>
            }
        </>
    );
}
export default Places;