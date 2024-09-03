import React, { useEffect, useContext } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";

const schema = yup.object({
  sms: yup.string().required("Please enter your sms"),
});

const SignUpPage = () => {
  const { registerBrand } = useContext(authContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    const { sms, brandname, password } = values;
    try {
      const registerData = await registerBrand({ "sms": sms, "ten": brandname, "matkhau": password });
      if (registerData["success"]) {
        toast.success(`Welcome ${brandname}, now your brand is our partner!`);
      } else {
        toast.error(registerData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="username" className="label">
            SMS
          </Label>
          <Input
            type="text"
            name="sms"
            placeholder="Enter your SMS"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="username" className="label">
            Brand Name
          </Label>
          <Input
            type="text"
            name="brandname"
            placeholder="Enter your brand's name"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign Up
        </Button>
        <div className="have-account">
          Already a member? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
