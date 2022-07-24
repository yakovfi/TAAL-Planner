import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { get } from "../../api/api";
import { FcLink } from "react-icons/fc";
import { BsExclamationLg } from "react-icons/bs";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";

//--------------------------
let obj = { tasks: [], users: [] }
let student = [];
let myStudents = [];
let myStudentsChoice = [];
let flagClickOK = false;
//--------------------------
function Modal({ setOpenModal, setText }) {
    // console.log("setOpenModal:", setOpenModal())
    console.log("setText:", setText)

    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setStudent] = useState([])
    const [, setMyStudents] = useState([])
    const [, setMyStudentsChoice] = useState([])
    const [, setFlagClickOK] = useState(false);

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

    const getData = () => {
        get(`${baseUrl}/wp-json/wp/v2/users/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            },
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {

            setStudent(student = res.filter((item) => item.acf.risk_profile > 0))
            // console.log("student:", student);

        });
    }
    function Post_Route() {

        setFlagClickOK(flagClickOK = true)
        resultMyArrayStudent()
        if (setText === null || setText === "") {
            alert('Please give the Route a title !')
            return
        }

        if (JSON.parse(localStorage.getItem('New_Routes')) === null) {
            alert('Route is empty ! ');
            return
        }
        else {
            set_obj(obj.tasks = JSON.parse(localStorage.getItem('New_Routes')));
            // console.log("obj : ", obj)
            // console.log("obj.tasks : ", obj.tasks)

            let url_post = `${baseUrl}/wp-json/wp/v2/routes/`
            fetch(url_post, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                },
                body: JSON.stringify({
                    title: setText,
                    status: 'publish',
                    fields: {
                        tasks: obj.tasks.map((e) => {
                            // console.log("e.id:", e.id)
                            return e.id
                        }),
                        users: {
                            ID: myStudentsChoice.map((e) => {
                                // console.log("e.id2:", e)
                                return e.id
                            }),
                        }
                    },
                })
            }).then(function (response) {
                return response.json();
            }).then(function (post) {
                setDone(true)

                // alert(get_Route_ID)
                // console.log("post:", post)
                window.location.replace("/planner")
            })
        }
    }
    const saveCheckbox = (val) => {
        setMyStudents(myStudents.push(val))
        sortById()
        // console.log("myStudents:", myStudents);
    }
    const sortById = () => {
        if (myStudents.length > 1)
            for (let i = 0; i < myStudents.length; i++) {
                let min = myStudents[i];
                for (let j = i; j < myStudents.length; j++) {
                    // console.log(j, ",", myStudents[j].id)
                    if (myStudents[j].id < min.id) {
                        setMyStudents(myStudents[i] = myStudents[j])
                        setMyStudents(myStudents[j] = min)
                        min = myStudents[j].id
                    }
                }
            }
    }
    const resultMyArrayStudent = () => {
        if (myStudents.length > 1)
            for (let i = 0; i < myStudents.length; i++) {
                let index = i;
                let count = 1;
                for (let j = i + 1; j < myStudents.length; j++) {
                    if (myStudents[j].id === myStudents[i].id) {
                        i++;
                        count++;
                    }
                }
                if (count % 2 !== 0) {
                    setMyStudentsChoice(myStudentsChoice.push(myStudents[index]))
                }
                // console.log("myStudentsChoice:", myStudentsChoice)
            }
    }
    return (
        <>
            {setText === null || setText === "" ? <>
                <div className="Background">
                    <div className="modalContainer">
                        <div className="titleCloseBtn">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                X
                            </button>
                        </div>
                        <div className="title">
                            <h3> Please type in the route name</h3>
                            <BsExclamationLg style={{ color: "red", fontSize: "80px" }} />
                        </div>
                        <div className="body">

                        </div>
                        <div className="footer">
                            <button className='cancelBtn'
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                closed
                            </button>
                        </div>
                    </div>
                </div>
            </>
                :
                <div className="Background">
                    <div className="modalContainer">
                        <div className="titleCloseBtn">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                X
                            </button>
                        </div>

                        <h6 ><FcLink className='icon' />&nbsp;&nbsp;Select employees:</h6>
                        <div className='allStudent' >
                            {student.map((value, index) => {
                                return (
                                    <label key={index} className="list-group-item" >

                                        <input onChange={() => saveCheckbox(value)} className="form-check-input me-1" type="checkbox" id={value.name} name={value.name} value=""></input>
                                        {value.name}

                                    </label>
                                )
                            })}
                        </div>
                        <div className="body">
                            <h5>Are you sure?</h5>
                        </div>
                        <div className="footer">

                            <button className='continueBtn'
                                onClick={Post_Route}
                            > Yes
                            </button>
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;

                            <button className='cancelBtn'
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >No
                            </button>
                            {flagClickOK ? <><Modal_Loading props={false} /></> : <></>}

                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default Modal;