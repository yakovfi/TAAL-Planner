import { createStore } from 'redux';
import reduser from './reduser';
// import React, { useState, useEffect } from 'react';
// import { get } from "../api/api";

// let places = [];
// let stationArray = [];
// let Places_and_their_stations = [];

const store = createStore(




    reduser,
    {
        //initial state
        name: "שרה ישראלי"
    }
)
export default store;



// await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
//     params: {
//         per_page: 99, 'Cache-Control': 'no-cache'
//     }
// }).then(res => {
//     places = res.filter((item) => item.parent === 0)

//     Places_and_their_stations = places.map((element) => {
//         return {
//             parent: element,
//             related: res.filter((r) => r.parent === element.id)
//         }
//     })

//     for (let i = 0; i < Places_and_their_stations.length; i++) {
//         let temp = Places_and_their_stations[i]
//         setStatePlaces(statePlaces => [...statePlaces, { value: temp.parent.name, label: temp.parent.name }])
//     }
// });
