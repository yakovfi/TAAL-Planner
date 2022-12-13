import React, { useState, useEffect } from "react";
import { get } from "../../api/api";

let result = [];
// https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data
const TimeData = () => {
  const [, setResult] = useState([]);
  let arrayTemp = [];

  useEffect(() => {
    (async () => {
      await gettingData();
    })();
  }, []);

  const gettingData = async () => {
    await get(`https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`, {
      // headers: {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      // },
      params: {
        per_page: 99,
        "Cache-Control": "no-cache",
      },
    }).then(async (res) => {
      let max_pages = res.headers["x-wp-totalpages"];
      arrayTemp = res.data;

      console.log("max_pages: " + max_pages);

      if (max_pages > 1) {
        for (let i = 2; i <= max_pages; i++) {
          console.log("max_pages: " + max_pages);
          await get(
            `https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`,
            {
              params: {
                per_page: 99,
                page: i,
                "Cache-Control": "no-cache",
              },
            }
          ).then(async (response) => {
            Array.prototype.push.apply(arrayTemp, response.data);
            console.log("arrayTemp: " + arrayTemp);
          });
        }
      }

      console.log("res time data:", res.data);

      // sara levy's Id -should be taken from DB / action
      const reqId = 20;

      result = res.data.filter((user) => user.acf.user_id == reqId);
      // console.log("result: " + result[0].acf.route_title);

      const start_time = result[0].acf.start_time;
      const end_time = result[0].acf.end_time;

      const diff =
        new Date(result[58].acf.end_time) - new Date(result[58].acf.start_time);
      console.log("diff: " + parseFloat(diff / 1000 / 60));

      console.log("start_time: " + start_time);
      console.log("end_time: " + end_time);
      // FMT = "%Y-%M-%D %H:%M:%S";

      let secondsCalc = Math.floor(diff / 1000);
      let minutesCalc = Math.floor(secondsCalc / 60);
      let hoursCalc = Math.floor(minutesCalc / 60);

      const year = start_time.slice(0, 4);
      const month = start_time.slice(5, 7);
      const day = start_time.slice(8, 10);
      const hours = hoursCalc;
      const minutes = minutesCalc;
      const seconds = secondsCalc;

      const resultTimeAndDateOnTask = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes,
        seconds
      );

      console.log("resultTimeOnTask: " + resultTimeAndDateOnTask);
      console.log("time on task(seconds): " + diff / 1000);
    });
  };
  return <div className=""></div>;
};

export default TimeData;
