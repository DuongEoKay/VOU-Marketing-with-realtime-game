import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { Field } from "../components/field";
import Input from "../components/input/Input";
import { Label } from "../components/label";
import AuthenticationPage from "./AuthenticationPage";
import { toast } from "react-toastify";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";

const ValidateOtpPage = () => {
  const { validateOtp } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation()
  const username = location.state?.username || ""

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Login Page";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignIn = async (values) => {
    const { otp } = values;
    try {
      const loginData = await validateOtp({ 'username': username, 'otp': otp });
      if (loginData["accessToken"]) {
        toast.success(loginData["message"]);
        // navigate("/validate-otp", { state: { username } });
      } else {
        toast.error(loginData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username" className="label">
            Username
          </Label>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            control={control}
            disabled
          />
        </Field>
        <Field>
          <Label htmlFor="username" className="label">
            OTP
          </Label>
          <Input
            type="text"
            inputmode="numeric"
            name="otp"
            placeholder="Enter your OTP"
            control={control}
          />
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
        <div className="have-account">
          Not a member? <NavLink to={"/phone-number"}>Sign up here</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default ValidateOtpPage;
