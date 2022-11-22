import React, { useState } from "react";
import "./style.css";
import Dot from "../Dot/Dot";
import Clock from "../Clock/Clock";
import Tag from "../Tag/Tag.js";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import ModalHelp from "../Modal/Modal_help";
let flagStress = false;
const Phone = (props) => {
  const [, setFlagStress] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const stressFun = () => {
    setFlagStress((flagStress = true));
  };
  const backup = () => {
    setFlagStress((flagStress = false));
  };

  return (
    <>
      {props.flagPhone ? (
        <>
          {!flagStress ? (
            <>
              <div className="phoneCover">
                <div className="phoneHeaderCover">
                  <div className="hederPhone">
                    <button
                      className="stress"
                      onClick={() => stressFun()}
                    ></button>
                    <div className="cellInfo"></div>
                    <Dot className="Dotcamera" color="#2f2f2f" />
                    <div className="clock">
                      <Clock />
                    </div>
                  </div>
                </div>
                <div className="stap2">
                  {props.board.map((tag, keyCount) => {
                    return (
                      <Tag
                        modalFlagTablet={props.modalFlagTablet}
                        title={tag.title}
                        id={tag.id}
                        idImg={tag.idImg}
                        dataImg={tag.dataImg}
                        idAudio={tag.idAudio}
                        dataAudio={tag.dataAudio}
                        key={keyCount}
                        flagBoard={true}
                        myLastStation={props.myStation.name}
                        myStation={tag.myStation}
                        myMarginTop={"-68px"}
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
                      />
                    );
                  })}
                </div>
                <div className="stap3"></div>
              </div>
            </>
          ) : (
            <>
              {/* stress */}
              <div className="phoneCoverStress">
                <div className="phoneHeaderCover">
                  <div className="hederPhone">
                    <div className="grayStress"></div>
                    <div className="cellInfo"></div>
                    <Dot className="Dotcamera" color="#2f2f2f" />
                    <div className="clock">
                      <Clock />
                    </div>
                  </div>
                  {modalOpen ? (
                    <>
                      <div className="pleaseName" style={{ color: "#45350a" }}>
                        ,בבקשה
                      </div>
                      <div className="pleaseListenIconCover"></div>
                    </>
                  ) : (
                    <>
                      <div className="pleaseName">,בבקשה</div>
                      <button className="pleaseListenIcon"></button>
                    </>
                  )}
                </div>
                <div className="positionTextStress">
                  <div className="textStress">.התקשתי במילוי המשימות שלי</div>
                  <div className="textStress">
                    אשמח לסיוע, ותודה על הרצון לעזור
                  </div>
                </div>
                <div className="whiteCoverPhoneStress">
                  <div className="currentLocation">:המיקום הנוכחי שלי</div>
                  {props.mySite.name ? (
                    <>
                      {" "}
                      <div className="currentLocationName">
                        {" "}
                        {props.mySite.name}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="currentLocationName">אין מיקום</div>
                    </>
                  )}
                </div>
                <div>
                  {modalOpen ? (
                    <>
                      <div
                        className="redCoverPhoneStress"
                        style={{ backgroundColor: "#400910" }}
                      >
                        <div className="needHelp"></div>
                        <div
                          className="helpContinue"
                          style={{ color: "#3d453e" }}
                        >
                          ממשיך לבקש עזרה
                        </div>
                      </div>
                      <div
                        className="greenCoverPhoneStress"
                        style={{ backgroundColor: "#053705" }}
                      >
                        <div style={{ border: "none", background: "#11B911" }}>
                          {/* <MdOutlineSettingsBackupRestore className='TempBackup' /> */}
                        </div>

                        <div className="backup" style={{ color: "#3d453e" }}>
                          חזור למשימות שלי
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="redCoverPhoneStress">
                        <button
                          className="needHelp"
                          onClick={() => {
                            setModalOpen(true);
                          }}
                        ></button>
                        <div className="helpContinue">ממשיך לבקש עזרה</div>
                      </div>
                      <div className="greenCoverPhoneStress">
                        <button
                          style={{ border: "none", background: "#11B911" }}
                          onClick={() => backup()}
                        >
                          <MdOutlineSettingsBackupRestore className="TempBackup" />
                        </button>

                        <div className="backup">חזור למשימות שלי</div>
                      </div>
                    </>
                  )}
                </div>
                <div className="stap31"></div>
                {modalOpen && <ModalHelp setModalOpen={setModalOpen} />}
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Phone;
