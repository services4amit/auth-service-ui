import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import Validate from "../common/validate";
import Valid from "../common/valid";
import rules from "../common/validationRules";
import config from "../common/config"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginFail, setloginFail] = useState(false);

  const [validation, setValidation] = useState(Valid(rules));
  const [formFields, setFormFields] = useState(config.signIn);
  const [validation_field, setValidationField] = useState();
  const [reqRules, setReqRules] = useState([]);

  let requiredRules = [];
  useEffect(() => {
    formFields.map((item) => {
      for(let i = 0; i < rules.length; i++){
        if(rules[i].field===item){
          requiredRules.push(rules[i])
        }
      }
      setReqRules(requiredRules)
    });
  }, []);

  useEffect(()=>{
    setValidationField(Valid(reqRules));
  },[reqRules])

  const changeHandler = (e, valtype) => {
    let name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };
  
  const formSubmit = (event) => {
    event.preventDefault();

    const validation = Validate(formData, reqRules, {...validation_field});
    setValidation(validation);
    if (validation.isValid) {
      axios
        .post("http://localhost:8090/auth/login", formData)
        .then((response) => {
          window.sessionStorage.setItem("authToken", response.data.authtoken);
          window.location.href = "/landPage";
        })
        .catch((error) => {
          setloginFail(true);
          console.log("Error Login", error);
        });
      console.log("User has been logged in succesfully");
    } else {
      console.log("Invalid input values", validation);
    }
  };

  return (
    <div id="sign-in">
      <h1>Sign-In Page</h1>
      <div className="sign-in">
        <form className="demoForm">
          <h2>Sign up</h2>

          <div className="input-div">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className={validation.email.isInvalid && "has-error"}
              required
              name="email"
              valtype="myEmail"
              placeholder="john@doe.com"
              onChange={(e) => changeHandler(e, "myEmail")}
            />
            <span className={validation.email.isInvalid && "error-message"}>
              {validation.email.message}
            </span>
          </div>
          <div className="input-div">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={validation.password.isInvalid && "has-error"}
              required
              name="password"
              valtype="myPassword"
              placeholder=""
              onChange={(e) => changeHandler(e, "myPassword")}
            />
            <span className={validation.password.isInvalid && "error-message"}>
              {validation.password.message}
            </span>
          </div>

          <button onClick={formSubmit} className="btn btn-primary">
            Log In
          </button>
        </form>
        {loginFail ? <h2>Authentication Failed</h2> : null}

        <div className="login-div">
          <NavLink to="/createAccount">
            Not an existing user! Create Account
          </NavLink>
          {/* <a href='/createAccount'>Not an existing user! Create Account</a> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
