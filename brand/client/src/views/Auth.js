import React from "react";
import { useContext } from "react";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import SignUpBrandPage from "pages/SignUpBrand";
import ValidateOtpPage from "pages/ValidateOtp";
import PhonePage from "pages/Phone";
import { authContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(authContext);
  let body;

  if (authLoading) {
    body = (
      <div>
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) return <Navigate to="/dashboard" />;
  else {
    body = (
      <>
        {authRoute === "sign-in" && <SignInPage />}
        {authRoute === "phone-number" && <PhonePage />}
        {authRoute === "validate-otp" && <ValidateOtpPage />}
      </>
    );
  }

  return <>{body}</>;
};

export default Auth;
