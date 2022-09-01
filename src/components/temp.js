import React, { useState } from "react";
import ReactLoading from 'react-loading';
let flag_token = false
let myStatus = 0;
function LoginAPI(props) {

    const [, login_token] = useState('')
    const [, setMyStatus] = useState(0)
    if (props.APIDetailsLogin.user.length > 0) {

        const url = 'https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: props.APIDetailsLogin.user,
                password: props.APIDetailsLogin.pass
            })
        })
            .then((response) => {
                setMyStatus(myStatus = response.status)
                // console.log(myStatus)

            }).then((response) => response.status === 403 ? (alert('Wrong username/mail or wrong Password'), flag_token = true) : response.json())
            .then(function (user) {
                if (!flag_token) {
                    if (user.message !== undefined) {
                        if (user.message.includes("2FA")) {
                            // console.log("2FA")
                            alert('2FA is activated, No support for this feature, Please login with another user')
                            login_token(flag_token = true)
                        }
                    }
                    // console.log("token", user.token)
                    sessionStorage.setItem('jwt', user.token)

                    sessionStorage.setItem('logged_in', 1)
                    window.location.replace('/planner')
                }
            })
    }
    return (
        <>
            {props.getFlagLoading ? <>
                <h1 style={{ textAlign: "center", color: "white" }}>Loading</h1>
                < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
            </> : null
            }
        </>
    )
}
export default LoginAPI
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
// "start": "react-scripts start $env:NODE_OPTIONS=”–max-old-space-size=8192”",
