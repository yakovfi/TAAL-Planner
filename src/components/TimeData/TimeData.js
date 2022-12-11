import React, { useState } from "react";
import { get } from "../../api/api";
let result = [];
// https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data
const TimeData = () => {
  const [, setResult] = useState([]);

  get(`https://s83.bfa.myftpupload.com/wp-json/wp/v2/time_data/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
    },
    params: {
      per_page: 99,
      "Cache-Control": "no-cache",
    },
  }).then((res) => {
    console.log("typeof res", typeof res.data);
    console.log("res time data:", res.data);

    // sara levy's Id
    const reqId = 20;
    console.log("ressssssssssss:" + res.data[0].acf.user_id);

    result = res.data.filter((user) => user.acf.user_id == 20);
    console.log("result: " + result[0].acf.route_title);

    const diff = result[0].acf.end_time - result[0].acf.start_time;
    console.log("diff: " + diff);
  });

  return <div className=""></div>;
};

export default TimeData;
