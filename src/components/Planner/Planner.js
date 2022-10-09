import React, { useState, useEffect } from 'react';
import './style.css';
// import { AiFillCheckCircle } from "react-icons/ai";
// import { MdHelpOutline } from "react-icons/md";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal';

//-------------------------
let marginHebrew = '0px';
const Planner = () => {
    const [get_logged_in, setLogged_in] = useState(false);// for TextView
    const [get_Name,
        // setName
    ] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [Hebrew, setHebrew] = useState(false);
    const [
        language
        , setLanguage] = useState("English");
    const [floatLan, setFloatLan] = useState("left");
    const [sites, setSites] = useState("Sites");
    const [addSite, setAddSite] = useState("Add sites");
    const [stations, setStations] = useState("Stations");
    const [addStation, setAddStation] = useState("add stations");
    const [myTasks, setTasks] = useState("Tasks");
    const [addMyTask, setAddTask] = useState("Add tasks");
    const [
        // saveButton
        , setSaveButton] = useState("Save route");
    const [
        // routeWrite
        , setRouteWrite] = useState("Write down the name of the route");
    const [drag, setRDrag] = useState("route view");

    const [titlePlacesCss, setTitlePlacesCss] = useState("linear-gradient(90deg, #7A78B7  5%, #7A78B71F 1%)");
    const [titleStationCss, setTitleStationCss] = useState("linear-gradient(90deg, #F2AE69 5%, #FEF5ED 1%)");
    const [titleTaskCss, setTitleTaskCss] = useState("linear-gradient(90deg, #C4CE9C 5%, #F8F9F3 1%)");
    const [
        // inputSide
        , setInputSide] = useState("left");
    const [flagHebrew, setflagHebrew] = useState(false);


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
        english();
        fetchData();
    }, []);

    //-------------------input-------------------------
    // function getName(val) {
    //     setName(val.target.value)
    // }
    const hebrew = () => {
        setHebrew(false);
        setLanguage("עברית");
        console.log(Hebrew)
        setFloatLan("left");
        setSites("Sites");
        setStations("Stations");
        setTasks("Tasks");
        setSaveButton("Save route");
        setRouteWrite("Write down the name of the route");
        setRDrag("route view");
        setAddSite("Add sites");
        setAddStation("add stations");
        setAddTask("Add tasks");
        setTitlePlacesCss("linear-gradient(90deg, #7A78B7  5%, #7A78B71F 1%)");
        setTitleStationCss("linear-gradient(90deg,#F2AE69 5%, #FEF5ED 1%)");
        setTitleTaskCss("linear-gradient(90deg, #C4CE9C 5%, #F8F9F3 1%)");
        setInputSide("left");
        setflagHebrew(true);
        // marginHebrew = '1330px';
    }
    const english = () => {
        setHebrew(true);
        setLanguage("English");
        console.log(Hebrew);
        setFloatLan("right");
        setSites("אתרים");
        setStations("תחנות");
        setTasks(" משימות");
        setSaveButton("שמור מסלול");
        setRouteWrite("רשום את שם המסלול");
        setRDrag("תצוגת המסלול");
        setAddSite("הוסף אתר");
        setAddStation("הוסף תחנה");
        setAddTask("הוסף משימה");
        setTitlePlacesCss("linear-gradient(90deg,  #7A78B71F 95%, #7A78B7 1%)");
        setTitleStationCss("linear-gradient(90deg, #FEF5ED 95%, #F2AE69 1%)");
        setTitleTaskCss("linear-gradient(90deg, #F8F9F3 95%, #C4CE9C 1%)");
        setInputSide("right");
        setflagHebrew(false);
        // marginHebrew = 0;

    }
    return (
        <>
            {!get_logged_in ? <div style={{ color: "white" }}>Please connect properly !</div> :
                <>

                    <div className="Planner" >

                        {loading && <div>Loading</div>}
                        {!loading && (

                            < >
                                <div className="Actions" >
                                    {flagHebrew ?
                                        <>
                                            {/* <button className="AddRoute" type="submit"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >
                                            <AiFillCheckCircle className='icon' />
                                            &nbsp;&nbsp;
                                            {saveButton}
                                        </button> */}

                                            {/* &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;  &nbsp;&nbsp;
                                        <button className="AddRoute" type="submit"
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >
                                            <MdHelpOutline className='icon' />
                                            &nbsp;&nbsp;
                                            Help
                                        </button> */}

                                        </> :
                                        <>
                                            {/* <button className="AddRoute" type="submit" style={{
                                            position: 'absolute',
                                            right: '70px',

                                        }}
                                            onClick={() => {
                                                setModalOpen(true);
                                            }}
                                        >
                                            {saveButton}
                                            &nbsp;&nbsp;
                                            <AiFillCheckCircle className='icon' />
                                        </button> */}
                                        </>}
                                    {/* כפתור שפות */}
                                    <button className="language" style={{ marginLeft: marginHebrew }}
                                        onClick={() => {
                                            if (Hebrew !== false)
                                                hebrew();
                                            else
                                                english();
                                        }}>{language}</button>
                                </div>

                                {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}
                                <div>
                                    <Places setFloatLang={floatLan} sites={sites} stations={stations} myTasks={myTasks} drag={drag}
                                        addSite={addSite} addStation={addStation} addMyTask={addMyTask} titlePlacesCss={titlePlacesCss}
                                        titleStationCss={titleStationCss} titleTaskCss={titleTaskCss} flagHebrew={flagHebrew} />
                                </div>
                            </>
                        )}
                    </div>
                </>
            }
        </>
    );
}
export default Planner;
