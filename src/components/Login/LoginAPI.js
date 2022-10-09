import React, { useState } from "react";
import ReactLoading from "react-loading";
import { baseUrl } from "../../config";

//---------------------
let flag_token = false;
let flag = false;
// let myStatus = 0;
//---------------------

function LoginAPI(props) {
  const [, login_token] = useState("");
  const [, setFlag] = useState(false);
  if (props.APIDetailsLogin.user.length > 0) {
    const url = `${baseUrl}/wp-json/jwt-auth/v1/token/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: props.APIDetailsLogin.user,
        password: props.APIDetailsLogin.pass,
      }),
    })
      .then((response) =>
        response.status === 403
          ? alert("Wrong username/mail or wrong Password")
          : response.json()
      )

      .then(function (user) {
        if (!flag_token) {
          if (user.message !== undefined) {
            if (user.message.includes("2FA")) {
              // console.log("2FA")
              alert(
                "2FA is activated, No support for this feature, Please login with another user"
              );
              login_token((flag_token = true));
            }
          }
          setFlag((flag = true));
          // console.log("token", user.token)
          sessionStorage.setItem("jwt", user.token);
          sessionStorage.setItem("logged_in", 1);
          window.location.replace("/Dashboard");
        }
      });
  }
  return (
    <>
      {props.getFlagLoading && flag ? (
        <>
          <h1 style={{ textAlign: "center", color: "white" }}>Loading</h1>
          <ReactLoading
            type={"bars"}
            className="loading"
            color={"rgb(180, 175, 199)"}
            height={"10%"}
            width={"10%"}
          />
        </>
      ) : null}
    </>
  );
}
export default LoginAPI;
