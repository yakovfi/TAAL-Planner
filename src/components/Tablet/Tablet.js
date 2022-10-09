import React, { useState, useRef } from 'react';
import "./style.css";
import Clock from "../Clock/Clock"
import Tag from "../Tag/Tag.js";
import Carousel from "react-elastic-carousel";

// import { Carousel2 } from '@trendyol-js/react-carousel';
// import Slider from "react-slick";
// import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 50, itemsToShow: 2 },
    { width: 78, itemsToShow: 3 },
    { width: 100, itemsToShow: 4 },
];

const Tablet = (props) => {
    // const [currIndex, setCurrIndex] = useState(getInitialLocation);
    const sliderRef = useRef()
    const goBack = () => sliderRef.current.slickPrev()

    return (
        <>
            <div className='myTablet'>
                <header className='headerTablet'>

                    <div className='clockTablet'>

                        <Clock />
                    </div>
                    <div className="cellInfo positionCellInfoTablet"></div>
                </header>
                <div className='bodyTablet'>
                    <div className='mySiteNameOnTablet'>{props.mySite.name}</div>
                    <div className='borderTablet1'> </div>
                </div>

                <div className='kavTablet'></div>

                <div className='bodyBottomTablet'>
                    <div className='titleBodyBottomTablet'>
                        {/* שם התחנה  */}
                        {props.mySite.name} {/* זמני */}

                    </div>

                    <Carousel ref={sliderRef} style={{ direction: 'right' }} breakPoints={breakPoints}>
                        {props.board.map((tag, keyCount) => {
                            return <Tag
                                key={keyCount}
                                title={tag.title}
                                id={tag.id}
                                idImg={tag.idImg}
                                dataImg={tag.dataImg}
                                idAudio={tag.idAudio}
                                dataAudio={tag.dataAudio}
                                flagBoard={true}
                                myLastStation={props.myStation.name}
                                myStation={tag.myStation}
                                myMarginTop={'-68px'}
                                count={props.count}
                                data={props.myStation.data}
                                flag={tag.flag}
                                width={tag.width}
                                borderLeft={tag.borderLeft}
                                height={tag.height}
                                setKavTaskTopMarginTop={tag.setKavTaskTopMarginTop}
                                bottom={tag.bottom}
                                kavTopWidth={tag.kavTopWidth}
                                newkavTaskTop={tag.newkavTaskTop}
                                nameStation={tag.nameStation}
                                flagPhone={props.flagPhone}
                                flagTree={props.flagTree}
                                modalFlagTablet={props.modalFlagTablet}
                            />;
                        })}
                    </Carousel>
                    {/* <div className='borderTablet2'>

                    </div>
                    <div className='borderTablet3'></div>
                    <div className='borderTablet4'></div>
                    <div className='borderTablet5'></div> */}

                </div>
                <button className='arrow'></button>
                {/* <button
                className='closeModal'
                onClick={() => {
                    setModalFlagTablet(false);
                }}
            >
                X
            </button> */}


            </div>


        </>
    );
};

export default Tablet;
