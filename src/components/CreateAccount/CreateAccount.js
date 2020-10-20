import React, { useEffect, useState } from "react";
import axios from "axios";

import Validate from "../common/validate";
import Valid from "../common/valid";
import rules from "../common/validationRules";
import config from "../common/config";

import "./CreateAccount.scss";

const FormValidate = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    // password_confirmation: ""
  });

  const changeHandler = (e) => {
    let name = e.target.name;
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const [validation, setValidation] = useState(Valid(rules));
  const [formFields, setFormFields] = useState(config.createAcc);
  const [validation_field, setValidationField] = useState();
  const [reqRules, setReqRules] = useState([]);

  let requiredRules = [];
  useEffect(() => {
    formFields.map((item) => {
      for (let i = 0; i < rules.length; i++) {
        if (rules[i].field === item) {
          requiredRules.push(rules[i]);
        }
      }
      setReqRules(requiredRules);
    });
  }, []);

  useEffect(() => {
    setValidationField(Valid(reqRules));
  }, [reqRules]);

  const formSubmit = (event) => {
    event.preventDefault();
    const validation = Validate(formData, reqRules, { ...validation_field });
    setValidation(validation);
    if (validation.isValid) {
      axios
        .post("http://localhost:8090/auth/signup", formData)
        .then((response) => {
          window.sessionStorage.setItem("authToken", response.data.authtoken);
          window.location.href = "/landPage";
          console.log("signup response", response);
        })
        .catch((err) => {
          console.log("err", err);
        });
      console.log("User has been registered succesfully");
    } else {
      console.log("Invalid input values", validation);
    }
  };

  return (
    <div>
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
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className={validation.name.isInvalid && "has-error"}
            required
            name="name"
            valtype="myName"
            placeholder=""
            onChange={(e) => changeHandler(e, "myName")}
          />
          <span className={validation.name.isInvalid && "error-message"}>
            {validation.name.message}
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

        {/* <div className="input-div">
          <label htmlFor="password_confirmation">Re-Type Password</label>
          <input
            type="password"
            className={
              validation.password_confirmation.isInvalid && "has-error"
            }
            required
            name="password_confirmation"
            valtype="myPwdConfirm"
            placeholder=""
            onChange={(e)=>changeHandler(e, "myPwdConfirm")}
          />
          <span
            className={
              validation.password_confirmation.isInvalid && "error-message"
            }
          >
            {validation.password_confirmation.message}
          </span>
        </div> */}

        <button onClick={formSubmit} className="btn btn-primary">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default FormValidate;
