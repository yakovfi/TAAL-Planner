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
    const [stations, setStations] = useState("Stations");
    const [myTasks, setTasks] = useState("Tasks")



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
    }
    const english = () => {
        setHebrew(false);
        setLanguage("English");
        console.log(Hebrew);
        setFloatLan("right");
        setSites("אתרים");
        setStations("תחנות");
        setTasks("משימות");
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
                                <input type="text" className="form-control custom-search-input" onChange={getName} placeholder="Write down the name of the route"
                                    style={{ fontSize: "x-large" }}>

                                </input>
                                <button className="AddRoute" type="submit"
                                    onClick={() => {
                                        setModalOpen(true);
                                    }}
                                >
                                    <FcOk className='icon' />   &nbsp;&nbsp;
                                    Save route
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
                                <Places setFloatLang={floatLan} sites={sites} stations={stations} myTasks={myTasks} />
                            </div>
                        </div>
                    )}
                </>
            }

        </>
    );
}
export default Planner;
