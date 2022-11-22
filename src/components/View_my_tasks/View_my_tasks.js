import React, { useState } from "react";
import "./style.css";
import Audios from "../Audios/Audios";
import { get } from "../../api/api";
import Images from "../Images/Images";
import { FcSpeaker } from "react-icons/fc";
import { baseUrl } from "../../config";

let MyTasks = [];
let IdTask = 0;
// let dataTask = [];
function View_my_tasks({ prop }) {
  const [, setIdTask] = useState([]);
  const [, setDataTask] = useState([]);
  const clickTask = async (e) => {
    setIdTask((IdTask = e.ID));
    await get(`${baseUrl}/wp-json/wp/v2/tasks/`, {
      params: {
        per_page: 99,
        "Cache-Control": "no-cache",
      },
    }).then((res) => {
      console.log("res: ", res.data);
      setDataTask((MyTasks = res.data.filter((item) => item.id === e.ID)));
      console.log("MyTasks: ", MyTasks);
    });
  };
  return (
    <>
      <div className="image" style={{}}>
        <Images id={IdTask} data={MyTasks} />
      </div>
      <br></br>
      <br></br>
      <div className="tasksList">
        {prop.map((value, index) => {
          return (
            <button
              className="showTasks"
              onClick={() => clickTask(value)}
              key={index}
            >
              <FcSpeaker style={{ fontSize: "30px" }} />
              &nbsp;&nbsp;&nbsp;{value.post_title}
            </button>
          );
        })}
      </div>
      <Audios id={IdTask} data={MyTasks} />
    </>
  );
}
export default View_my_tasks;
