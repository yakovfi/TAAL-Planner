import "./Modal.css";
import React, { forwardRef, useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import Image from 'react-bootstrap/Image';
import logo from '../../Pictures/logo.jpeg'
import { FcPrint } from "react-icons/fc";




const Modal_Student = ({ thisGetMyUsers, setOpenModal }) => {
    // console.log("thisGetMyUsers:", thisGetMyUsers)
    const ComponentToPrint = forwardRef((props, ref) => {
        return <div ref={ref}>

            <div className="modalContainerStudentPrint">
                {thisGetMyUsers.acf.image.url ? <>
                    <Image style={{ height: 237, width: '97%', marginLeft: "20%" }}
                        src={thisGetMyUsers.acf.image.url}
                        alt="new"
                    /></> : <></>}

                <h3 style={{ marginLeft: "50%" }}>{thisGetMyUsers.name}  </h3>

                <div className="body" style={{ textAlign: 'right' }}>

                    {thisGetMyUsers.description === "" ? <>
                        <h6 style={{ marginLeft: "220px", color: "red" }}>!אין מידע המתאר את חניך זה</h6>
                    </> :
                        <>
                            <h5>{thisGetMyUsers.description}</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.short_term_memory ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.short_term_memory}</samp>  :זיכרון לטווח קצר מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}> ןיא </samp>  :זיכרון לטווח קצר מ1-50 -</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.middle_term_memory ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.middle_term_memory}</samp>  :זיכרון לטווח בינוני מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :זיכרון לטווח בינוני מ1-50 -</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.long_term_memory ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.long_term_memory}</samp>  :זיכרון לטווח ארוך מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>:זיכרון לטווח ארוך מ1-50 -</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.concentration_and_focus_in_actions ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.concentration_and_focus_in_actions}</samp>  :ריכוז ומיקוד בפעולות מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :ריכוז ומיקוד בפעולות מ1-50 -</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.hearing_level ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.hearing_level}</samp>  :רמת שמיעה כללית: מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :רמת שמיעה כללית: מ1-50 -</h5>
                        </>}
                    <br></br>
                    {thisGetMyUsers.acf.vision_level ? <>
                        <h5 style={{ marginLeft: "220px", color: "red" }}>
                            <samp style={{ color: "black" }}>{thisGetMyUsers.acf.vision_level}</samp>  :רמת ראיה כללית: מ1-50 -</h5>
                    </> :
                        <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :רמת ראיה כללית: מ1-50 -</h5>
                        </>}
                </div>
                <Image style={{
                    height: 87, width: '37%', marginRight: "20%",

                    bottom: '0.001px'
                }}
                    src={logo}
                    alt="new"
                />
            </div>
        </div >
    });
    // console.log("thisGetMyUsers:", thisGetMyUsers.acf);
    const ref = useRef();
    return (
        <>
            <div className="Background">
                <div className="modalContainerStudent">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        > X
                        </button>
                    </div>
                    <h3>{thisGetMyUsers.name}  </h3>

                    <div className="body" style={{ textAlign: 'right' }}>

                        {thisGetMyUsers.description === "" ? <>
                            <h6 style={{ marginLeft: "220px", color: "red" }}>!אין מידע המתאר את חניך זה</h6>
                        </> :
                            <>
                                <h5>{thisGetMyUsers.description}</h5>
                            </>}

                        <br></br>
                        {thisGetMyUsers.acf.short_term_memory ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.short_term_memory}</samp>  :זיכרון לטווח קצר מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}> ןיא </samp>  :זיכרון לטווח קצר מ1-50 -</h5>
                            </>}
                        <br></br>
                        {thisGetMyUsers.acf.middle_term_memory ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.middle_term_memory}</samp>  :זיכרון לטווח בינוני מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :זיכרון לטווח בינוני מ1-50 -</h5>
                            </>}
                        <br></br>
                        {thisGetMyUsers.acf.long_term_memory ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.long_term_memory}</samp>  :זיכרון לטווח ארוך מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>:זיכרון לטווח ארוך מ1-50 -</h5>
                            </>}
                        <br></br>
                        {thisGetMyUsers.acf.concentration_and_focus_in_actions ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.concentration_and_focus_in_actions}</samp>  :ריכוז ומיקוד בפעולות מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :ריכוז ומיקוד בפעולות מ1-50 -</h5>
                            </>}

                        <br></br>
                        {thisGetMyUsers.acf.hearing_level ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.hearing_level}</samp>  :רמת שמיעה כללית: מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :רמת שמיעה כללית: מ1-50 -</h5>
                            </>}
                        <br></br>
                        {thisGetMyUsers.acf.vision_level ? <>
                            <h5 style={{ marginLeft: "220px", color: "red" }}>
                                <samp style={{ color: "black" }}>{thisGetMyUsers.acf.vision_level}</samp>  :רמת ראיה כללית: מ1-50 -</h5>
                        </> :
                            <>
                                <h5 style={{ marginLeft: "220px", color: "red" }}><samp style={{ color: "black" }}>  ןיא </samp>  :רמת ראיה כללית: מ1-50 -</h5>
                            </>}
                    </div>
                    <ReactToPrint content={() => ref.current}>
                        <PrintContextConsumer>
                            {({ handlePrint }) => (
                                <button className="printStudent" onClick={handlePrint}> הדפסה
                                    {/* הדפס את הנתונים אודות {thisGetMyUsers.name} */}
                                    <FcPrint style={{ fontSize: "30px" }} />
                                </button>
                            )}
                        </PrintContextConsumer>
                    </ReactToPrint>
                    <ComponentToPrint ref={ref} />
                </div>
            </div>
        </>
    );
}
export default Modal_Student;