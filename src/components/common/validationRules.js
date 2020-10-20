const ValidationRules = [
  {
    field: "email",
    method: "isEmpty",
    valtype: "myEmail",
    validWhen: false,
    message: "Email is required.",
  },
  {
    field: "email",
    method: "isEmail",
    valtype: "myEmail",
    validWhen: true,
    message: "That is not a valid email.",
  },
  {
    field: "name",
    method: "isEmpty",
    valtype: "myName",
    validWhen: false,
    message: "Name is required.",
  },
  {
    field: "password",
    method: "isEmpty",
    valtype: "myPassword",
    validWhen: false,
    message: "Password is required.",
  },
  {
    field: "password_confirmation",
    method: "isEmpty",
    validWhen: false,
    message: "Password confirmation is required.",
  },
//   {
//     field: "password_confirmation",
//     method: "equals",
//     args: (typeof password === 'undefined') ? "your_default_value" : password,
//     validWhen: true,
//     message: "Password and password confirmation do not match.",
//   },
];
console.log('password',(typeof password))
export default ValidationRules;
