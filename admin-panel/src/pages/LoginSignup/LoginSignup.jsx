import './LoginSignup.css';
import React, { useState } from 'react';

import user_icon from '../../Assets/person.png';
import email_icon from '../../Assets/email.png';
import password_icon from '../../Assets/password.png';



const formFields = [

  {
    id: 1,
    label: "Fullname",
    type: "text",
    placeholder: "Fullname",
  },
  {
    id: 2,
    label: "Email",
    type: "mail",
    placeholder: "Email",
  },
  {
    id: 3,
    label: "Phone",
    type: "phone",
    placeholder: "Phone",
  },
  {
    id: 4,
    label: "Date of Birth",
    type: "date",
    placeholder: "17/11/2003",
  },
  {
    id: 5,
    label: "Sex",
    type: "text",
    placeholder: "Male",
  },
  {
    id: 6,
    label: "Sex",
    type: "text",
    placeholder: "Male",
  },
  {
    id: 7,
    label: "Role",
    type: "select",
    options: [
      { value: "brand", label: "Brand Owner" },
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" }
    ],
    placeholder: "Select Roles",
  },
];


const LoginSignup = () => {
  const [action, setAction] = useState("Login");

  const handleLogin = () => {
    setAction("Login");
  }

  const handleSignup = () => {
    setAction("Sign Up");
  }


  return (
    <div className="login-signup-container">
      <div className="container">
        <div className="header">
          <div className="text">{action}</div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (<></>)}
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="text" placeholder="Username" />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div className="inputs">
            {formFields.map((field) => (
              <div key={field.id} className="input">
                <img src={
                  field.type === "text" ? user_icon :
                    field.type === "mail" ? email_icon :
                      field.type === "password" ? password_icon :
                        null
                } alt="" />
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    multiple={field.multiple}
                    placeholder={field.placeholder}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="forgot-password">
            Lost Password? <span>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              handleSignup();
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;