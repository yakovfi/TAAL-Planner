import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { get } from "../../api/api";
import { FcLink } from "react-icons/fc";
import { BsExclamationLg } from "react-icons/bs";
import Modal_Loading from "./Modal_Loading";
import { baseUrl } from "../../config";
import { RiAsterisk } from "react-icons/ri";

//--------------------------

//--------------------------
function Modal_Icons({ setOpenModalPlaces, myCategory }) {

    return (
        <>
            {myCategory === 'stationCategory' ? <>

                <div className='ModalIconsStation'>
                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='penIconStation'></button>

                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='duplicateIconStation' ></button>

                </div>
            </> : <>


                <div className='ModalIcons'>
                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='penIcon'></button>
                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='linkIcon' ></button>
                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='duplicateIcon' ></button>
                    <button
                        onClick={() => setOpenModalPlaces(false)}
                        className='shareIcon' ></button>
                </div></>}


        </>
    );
}
export default Modal_Icons;