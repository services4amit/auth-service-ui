import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import "./SignIn.scss";

const LandPage = () => {

  const [name, setuserName] = useState("");

  useEffect(() => {

    if (window.sessionStorage.getItem('authToken')) {

      axios
        .post("http://localhost:8090/auth/home", { authtoken: window.sessionStorage.getItem('authToken') })
        .then((response) => {
          setuserName(response.data.name);
          console.log("response", response);
        })
        .catch((error) => {
          console.log("logout error", error);
          window.location.href = "/signIn";
        });
    } else {
      window.location.href = "/signIn";
    }

  }, [])


  const logoutHandler = () => {
    axios
      .post("http://localhost:8090/auth/logout", { authtoken: window.sessionStorage.getItem('authToken') })
      .then((response) => {
        window.sessionStorage.setItem("authToken", response.data.authtoken);
        window.location.href = "/signIn";
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  };
  return (
    <div id="sign-in">
      <div className="sign-in">
        <h2>How you doing!!!</h2>
        <h3>{name}</h3>
        <button className="login-button" onClick={logoutHandler}><span>Log out</span></button>
      </div>
    </div>
  );
};

export default LandPage;
