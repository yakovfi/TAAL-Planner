import React, { useState, useEffect } from "react";
import { get } from "../../api/api";

let result = [];
// https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data
const TimeData = () => {
  const [, setResult] = useState([]);
  let arrayTemp = [];
  let dataResultArray = [];

  useEffect(() => {
    (async () => {
      await gettingData();
    })();
  }, []);

  // get: user_id, task_id, route_id, date_range(day, week, month, year, range)
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

      // sara levy's Id - should be taken from DB / action
      const reqUserId = 51;
      const reqTaskId = 20;
      const currDate = new Date().toJSON().slice(0, 10);

      console.log("currDate: " + currDate);
      result = res.data.filter(
        (user) =>
          // example for specific user
          user.acf.user_id == reqUserId &&
          // // example for specific task
          // user.acf.task_id == reqTaskId &&
          // example for traget time range
          user.acf.start_time.slice(0, 10) == currDate
      );

      for (let i = 0; i < result.length; i++) {
        const start_time = result[i].acf.start_time;
        const end_time = result[i].acf.end_time;

        const diff =
          new Date(result[i].acf.end_time) - new Date(result[i].acf.start_time);

        console.log("diff in minutes: " + parseFloat(diff / 1000 / 60));

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

        if (i === 1) {
          dataResultArray = resultTimeAndDateOnTask;
        } else {
          Array.prototype.push.apply(dataResultArray, resultTimeAndDateOnTask);
        }
      }

      console.log("final result: " + dataResultArray);
    });
  };
  return <div className=""></div>;
};

export default TimeData;
