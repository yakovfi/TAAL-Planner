import React, { useState } from "react";
import LoginAPI from "./LoginAPI";
import logo from "../../Pictures/logo.jpeg";
import "./styleLogin.css";
let flagLoading = false;
function Login(props) {
  const [, setFlagLoading] = useState(false);
  const [APIDetailsLogin, setAPIDetailsLogin] = useState({
    user: "",
    pass: "",
  });
  const [loginDetails, setLoginDetails] = useState({
    user: "",
    pass: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit() {
    setAPIDetailsLogin({ ...loginDetails });
    setFlagLoading((flagLoading = true));
  }
  return (
    <>
      {sessionStorage.logged_in ? (
        <h1>
          You are not supposed to be here ! Please close the tab and log in
          again
        </h1>
      ) : (
        <>
          <header className="App-header">
            {/* <p>{props.serverMessage}</p> */}
            <div
              className="d-flex justify-content-around"
              onKeyPress={(e) => {
                e.key === "Enter" && handleSubmit();
              }}
            >
              <div className="d-flex flex-column">
                <div className="p-2">
                  <h2
                    className="Login_Title"
                    style={{ paddingTop: "7vh", marginLeft: "0.5rem" }}
                  >
                    Login
                  </h2>
                </div>
                <div className="p-2">
                  <div className="login">
                    <input
                      type="text"
                      placeholder="User Name"
                      name="user"
                      value={loginDetails.user}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="pass"
                      value={loginDetails.pass}
                      onChange={handleChange}
                    />
                    <div className="d-flex justify-content-center">
                      <input
                        type="submit"
                        onClick={handleSubmit}
                        value="כניסה"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <img 
                src={logo}
                className="App-logo"
                alt="logo"
                style={{ paddingTop: "4.5%" }}
              ></img>
            </div>
          </header>
          <LoginAPI
            APIDetailsLogin={APIDetailsLogin}
            setUsername={props.setUsername}
            setIsLoggedIn={props.setIsLoggedIn}
            setServerMessage={props.setServerMessage}
            getFlagLoading={flagLoading}
          />
        </>
      )}
    </>
  );
}
export default Login;
