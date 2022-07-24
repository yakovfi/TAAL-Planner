import React from "react";
import { connect } from "react-redux";


function CallState(props) {

    return (
        <h1>
            Helow: {props.userName}
        </h1>
    )
}
export default connect(
    (state) => {
        return {  //get data from store and push into the props


        },
            { userName: state.name }
    }
)(CallState);