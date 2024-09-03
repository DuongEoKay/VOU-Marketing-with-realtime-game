import React from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 30px;
  .logo {
    margin: -5px auto -10px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: min(2em, 5vw);
    margin-bottom: 40px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-top: 1em;
    text-align: center;
    a {
      color: ${(props) => props.theme.primary};
      text-decoration: none;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <img
          src={logo}
          style={{
            resizeMode: "cover",
            height: 150,
            width: 150,
          }}
          alt=""
          className="logo"
        />
        <h1 className="heading">BrandManager</h1>
      </div>
      {children}
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
