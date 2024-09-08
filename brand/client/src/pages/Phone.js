import React, { useEffect, useContext, useState } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { NavLink, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthenticationPage from "./AuthenticationPage";
import { authContext } from "../contexts/authContext";

const PhonePage = () => {
  const { phoneValidate } = useContext(authContext);

  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange"
  });

  const handlePhoneValidate = async (values) => {
    const { phone } = values;
    const response = await phoneValidate({phone})
    if(response["valid"]) navigate("/sign-up", { state: { phone } });
    else toast.error(response["message"]) 
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
        onSubmit={handleSubmit(handlePhoneValidate)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="phone" className="label">
            Phone Number
          </Label>
          <Input
            type="tel"
            name="phone"
            placeholder="Enter your Phone Number"
            control={control}
            required
          />
        </Field>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Next
        </Button>
        <div className="have-account">
          Already a member? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
      </form>
    </AuthenticationPage>
  );
};

export default PhonePage;
