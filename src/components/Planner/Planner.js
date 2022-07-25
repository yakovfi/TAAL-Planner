import React, { useState, useEffect } from 'react';
import './style.css';
import { FcOk } from "react-icons/fc";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal';

//-------------------------
const Planner = () => {

    const [get_logged_in, setLogged_in] = useState(false);// for TextView
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [Hebrew, setHebrew] = useState(false);
    const [language, setLanguage] = useState("עברית");
    const [floatLan, setFloatLan] = useState("left");
    const [sites, setSites] = useState("Sites");
    const [addSite, setAddSite] = useState("Add sites");
    const [stations, setStations] = useState("Stations");
    const [addStation, setAddStation] = useState("add stations");
    const [myTasks, setTasks] = useState("Tasks");
    const [addMyTask, setAddTask] = useState("Add tasks");

    const [saveButton, setSaveButton] = useState("Save route");
    const [routeWrite, setRouteWrite] = useState("Write down the name of the route");
    const [drag, setRDrag] = useState("Drag a task here:");
    const [titlePlacesCss, setTitlePlacesCss] = useState("linear-gradient(90deg, rgb(161, 147, 229) 5%, rgb(237, 234, 255) 1%)");
    const [titleStationCss, setTitleStationCss] = useState("linear-gradient(90deg, #e29e62 5%, rgb(255, 234, 220) 1%)");
    const [titleTaskCss, setTitleTaskCss] = useState("linear-gradient(90deg, rgb(164, 190, 125) 5%, rgb(236, 245, 220) 1%)");






    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setLogged_in(sessionStorage.getItem('logged_in'))
                // getData();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
    }
    const hebrew = () => {
        setHebrew(true);
        setLanguage("עברית");
        console.log(Hebrew)
        setFloatLan("left");
        setSites("Sites");
        setStations("Stations");
        setTasks("Tasks");
        setSaveButton("Save route");
        setRouteWrite("Write down the name of the route");
        setRDrag("Drag a task here:");
        setAddSite("Add sites");
        setAddStation("add stations");
        setAddTask("Add tasks");
        setTitlePlacesCss("linear-gradient(90deg, rgb(161, 147, 229) 5%, rgb(237, 234, 255) 1%)");
        setTitleStationCss("linear-gradient(90deg, #e29e62 5%, rgb(255, 234, 220) 1%)");
        setTitleTaskCss("linear-gradient(90deg, rgb(164, 190, 125) 5%, rgb(236, 245, 220) 1%)")


    }
    const english = () => {
        setHebrew(false);
        setLanguage("English");
        console.log(Hebrew);
        setFloatLan("right");
        setSites("אתרים");
        setStations("תחנות");
        setTasks("משימות");
        setSaveButton("שמור מסלול");
        setRouteWrite("רשום את שם המסלול");
        setRDrag(":גרור משימות לכאן");
        setAddSite("הוסף אתר");
        setAddStation("הוסף תחנה");
        setAddTask("הוסף משימה");
        setTitlePlacesCss("linear-gradient(90deg, rgb(237, 234, 255) 95%, rgb(161, 147, 229) 1%)");
        setTitleStationCss("linear-gradient(90deg, rgb(255, 234, 220) 95%, #e29e62 1%)");
        setTitleTaskCss("linear-gradient(90deg, rgb(236, 245, 220) 95%, rgb(164, 190, 125) 1%)")


    }
    return (
        <>

            {!get_logged_in ? <div style={{ color: "white" }}>Please connect properly !</div> :
                <>

                    {loading && <div>Loading</div>}
                    {!loading && (

                        <div className="Planner" style={{
                            backgroundColor: 'rgb(213, 221, 228)',
                            overflow: "hidden",
                        }}>
                            <div className="Actions">
                                <input type="text" className="form-control custom-search-input" onChange={getName} placeholder={routeWrite}
                                    style={{ fontSize: "x-large" }}>

                                </input>
                                <button className="AddRoute" type="submit"
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    <FcOk className='icon' />
                                    &nbsp;&nbsp;
                                    {saveButton}
                                </button>

                                <button
                                    onClick={() => {
                                        if (Hebrew === false)
                                            hebrew();
                                        else
                                            english();
                                    }}>{language}</button>
                            </div>

                            {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}
                            <div>
                                <Places setFloatLang={floatLan} sites={sites} stations={stations} myTasks={myTasks} drag={drag}
                                    addSite={addSite} addStation={addStation} addMyTask={addMyTask} titlePlacesCss={titlePlacesCss}
                                    titleStationCss={titleStationCss} titleTaskCss={titleTaskCss} />
                            </div>
                        </div>
                    )}
                </>
            }
        </>
    );
}
export default Planner;
