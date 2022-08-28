import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import Tag from "../Tag/Tag.js";

// import { MdOutlineAdsClick } from "react-icons/md";
// import { FcAddDatabase, FcSearch } from "react-icons/fc";
import Stations from '../Stations/Stations'
import ModalPlaces from '../Modal/Model_Places'
import ModalLoading from '../Modal/Modal_Loading'
// import TextField from "@mui/material/TextField";
import { baseUrl } from "../../config";
import { AiOutlinePlus } from "react-icons/ai";
// import Dot from "../Dot/Dot";
import { BsThreeDotsVertical } from "react-icons/bs"
import { CgSearch } from "react-icons/cg";
// const { baseUrl } = require
//-----------------------
let places = [];
let myRoutes = [];
let onlyAllStation = [];
let stationArray = [];
let Places_and_their_stations = [];
let thisIdTask = 0;
let filteredData = []
let filteredDataRouts = []
let inputText = ""
let inputTextRouts = ""
let mySite = { name: '', id: '' }
let flagRoute = false;
// let flagButtonRoute = false;
let tasksOfRoutes = [];

//-----------------------
const Places = (props) => {
    // console.log("setFloatLan:", props.setFloatLang)
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setStateStation] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setThisIdTask] = useState(0)
    const [, setOnlyAllStation] = useState([]);
    const [, setPlaces] = useState([]);
    const [, setRoutes] = useState([]);
    const [, setFilteredData] = useState([]);
    const [, setFilteredDataRouts] = useState([]);
    const [, setInputText] = useState("");
    const [, setInputTextRouts] = useState("");
    const [, setMySite] = useState(null);
    // const [get_logged_in, setLogged_in] = useState(false);// for TextView
    const [, setFlagRoute] = useState(false);
    const [, setFlagButtonRoute] = useState(false);
    const [, setTasksOfRoutes] = useState([]);

    let inputHandler = (e) => {
        // console.log("eeeeeeeeeeeeeeee:", e.target.value)

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
    let inputHandlerRoutes = (e) => {
        // console.log("eeeeeeeeeeeeeeee:", e.target.value)
        //convert input text to lower case
        setInputTextRouts(inputTextRouts = e.target.value.toLowerCase());

        setFilteredDataRouts(filteredDataRouts = myRoutes.filter((el) => {
            // setInputText(lowerCase);

            if (inputTextRouts === '') {
                return el;
            }
            //return the item which contains the user input
            else {
                return el.title.rendered.toLowerCase().includes(inputTextRouts)
            }
        }))
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // setLogged_in(sessionStorage.getItem('logged_in'));
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
                per_page: 99
            }
        }).then(res => {
            console.log("res places: ", res)
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
    const DisplayTasks = (e) => {
        setTasksOfRoutes(tasksOfRoutes = e);
        setFlagButtonRoute(flagRoute = true);

        console.log("check value routes:", tasksOfRoutes);
    }
    const Display_The_Stations = (e) => {

        setFlagRoute(flagRoute = true);
        setThisIdTask(thisIdTask = e.id);
        if (stationArray.length > 0) {
            stationArray = [];
        }
        setMySite(mySite.name = e.name)
        setMySite(mySite.id = e.id)
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

        get(`${baseUrl}/wp-json/wp/v2/routes/`, {
            params: {
                per_page: 99
            }
        }).then(res => {
            // console.log("resssssssssss ", res)
            // console.log("mySite.id:", mySite.id)
            setRoutes(myRoutes = res.filter((item) => item.acf.my_site == mySite.id))
            // console.log("myRoutesssssssssssss:", myRoutes);

            setFilteredDataRouts(filteredDataRouts = myRoutes.filter((el) => {

                if (inputTextRouts === '') {
                    return el;
                }
                //return the item which contains the user input
                else {
                    return el.title.rendered.toLowerCase().includes(inputTextRouts)
                }
            }))
        })
    }
    // const foo = () => {

    //     alert("בדיקת כפתור")
    // }
    //----------------------------------------------------------------------
    return (
        <>
            {!done ? <>
                {<ModalLoading />}
            </>
                :
                <>
                    {!flagRoute ? <>
                        {modalOpen && <ModalPlaces setOpenModalPlaces={setModalOpen} />}

                        <div className='Cover_Places' style={{
                            float: props.setFloatLang,
                            padding: "2%",
                            marginRight: "7%"
                            // marginleft: "7%"
                        }}>
                            {!props.flagHebrew ? <> <div className='TitlePlacesCover' style={{
                                background: props.titlePlacesCss

                            }}><h3 className='TitlePlaces'>

                                    {/* <BsThreeDotsVertical className='threeDotsVertical' /> */}
                                    <div className='MyTitle'>{props.sites}</div>
                                </h3>


                            </div></> : <>
                                <div className='TitlePlacesCover' style={{
                                    background: props.titlePlacesCss

                                }}><h3 className='TitlePlaces'>
                                        &nbsp;&nbsp;&nbsp;

                                        <div className='MyTitle'>{props.sites}</div>

                                        {/* <BsThreeDotsVertical className='threeDotsVerticalEng' /> */}
                                    </h3>
                                </div></>}
                            <div className="search" style={{
                                backgroundColor: "#7A78B71F", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"
                            }}>
                                <input className='searchButton'
                                    dir="rtl"
                                    placeholder="חפש אתר"
                                    label={<CgSearch style={{ fontSize: "x-large", }} />}
                                    onChange={inputHandler}
                                ></input>
                            </div>
                            <div className='Places'>
                                {filteredData.map((value, index) => {
                                    return (
                                        <button
                                            className='Place'
                                            onClick={() => Display_The_Stations(value)}
                                            key={index}>

                                            {/* <div className='penIcon' ></div>
                                            <div className='eyeIcon' ></div> */}
                                            <BsThreeDotsVertical className='threeDotsVerticalEng' />


                                            <div className='nameOfSite'>{value.name}</div>
                                            {/* <Dot color="rgb(161, 147, 229)" /> */}
                                            {/* <Dot color={'#7A78B7 '} /> */}
                                        </button>
                                    )
                                })}
                            </div>
                            <div className='addPlaceCover'>
                                <button
                                    className='AddPlace'
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}>
                                    <AiOutlinePlus className='plus' />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <Stations propsData={stationArray} idTask={thisIdTask} allStations={onlyAllStation}
                            language={props} stationsName={props.stations} myTasks={props.myTasks} drag={props.drag}
                            addStation={props.addStation} addMyTask={props.addMyTask}
                            titleStationCss={props.titleStationCss} titleTaskCss={props.titleTaskCss} mySite={mySite} flagHebrew={props.flagHebrew} />
                    </> : <>
                        {/* routs */}
                        {modalOpen && <ModalPlaces setOpenModalPlaces={setModalOpen} />}

                        <div className='Cover_Places' style={{
                            float: props.setFloatLang,
                            padding: "2%",
                            marginRight: "7%"
                        }}>
                            {!props.flagHebrew ? <> <div className='TitlePlacesCover' style={{
                                background: "linear-gradient(90deg,  #256FA11F  95%, #679abd 1%)"

                            }}><h3 className='TitlePlaces'>
                                    <div className='MyRoutesTitle'>מסלולים ב <span className='name_of_site_title'>{mySite.name}</span></div>
                                </h3>

                            </div></> : <>
                                <div className='TitlePlacesCover' style={{
                                    background: props.titlePlacesCss
                                }}><h3 className='TitlePlaces'>
                                        &nbsp;&nbsp;&nbsp;
                                        <div className='MyTitle'>{props.sites}</div>
                                    </h3>
                                </div></>}
                            <div className="search" style={{
                                backgroundColor: "#256FA11F", borderStyle: 'none none solid none', borderColor: "#fff", borderWidth: "5px"
                            }}>
                                <input className='searchButton'
                                    dir="rtl"
                                    placeholder="חפש מסלול"

                                    label={<CgSearch style={{ fontSize: "x-large", }} />}
                                    onChange={inputHandlerRoutes}
                                ></input>
                            </div>
                            <div className='routs'>
                                {filteredDataRouts.map((value, index) => {
                                    return (
                                        <button
                                            className='Place'
                                            onClick={() => DisplayTasks(value)}
                                            key={index}>
                                            <BsThreeDotsVertical className='threeDotsVerticalEng' />

                                            {/* <div className='penIcon' onClick={foo}></div>
                                            <div className='linkIcon' ></div>
                                            <div className='duplicateIcon'></div>
                                            <div className="shareIcon"></div> */}
                                            <div className='nameOfSite'>{value.title.rendered.replace("&#8211;", "-").replace("&#8217;", "'")}</div>
                                            {/* <Dot color="rgb(161, 147, 229)" /> */}
                                            {/* <Dot color={'#7A78B7 '} /> */}
                                        </button>
                                    )
                                })}

                            </div>
                            {flagRoute && tasksOfRoutes.length > 1 ? <>
                                {tasksOfRoutes.acf.tasks.for((tag, keyCount) => {

                                    return <Tag />;

                                })}


                            </> : <></>}
                            <div className='addPlaceCover' style={{ background: '#256FA11F' }}>
                                <button
                                    className='AddPlace'
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}>
                                    <AiOutlinePlus className='plus' />

                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <Stations propsData={stationArray} idTask={thisIdTask} allStations={onlyAllStation}
                            language={props} stationsName={props.stations} myTasks={props.myTasks} drag={props.drag}
                            addStation={props.addStation} addMyTask={props.addMyTask}
                            titleStationCss={props.titleStationCss} titleTaskCss={props.titleTaskCss}
                            mySite={mySite} flagHebrew={props.flagHebrew} tasksOfRoutes={tasksOfRoutes} />
                    </>}
                </>
            }
        </>
    );
}
export default Places;




// {dndArray.map((tag, keyCount) => {

//     return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} flagBoard={true} myLastStation={props.myStation.name} myStation={tag.myStation} myMarginTop={'-68px'} count={count} />;

// })}
//זה בשביל להציג את המסלול
//נ.ב צריך להוסיף למערך את המסלול