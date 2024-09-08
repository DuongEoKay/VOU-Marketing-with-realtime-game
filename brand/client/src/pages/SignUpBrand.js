import React, { useEffect, useContext, useState } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";
import CloudinaryUploader from "components/image/CloudinaryUploader";

const schema = yup.object({
  sms: yup.string().required("Please enter your sms"),
});

const SignUpBrandPage = () => {
  const { registerBrand } = useContext(authContext);
  const navigate = useNavigate()

  const location = useLocation()
  const phone = location.state?.phone || ""
  const username = location.state?.username || ""

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    const { sms, brandname } = values;
    try {
      const registerData = await registerBrand({ "sms": sms, "ten": brandname, "hinhanh": url });
      if (registerData["success"]) {
        toast.success(`Welcome ${brandname}, now your brand is our partner!`);
        navigate("/dashboard")
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

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
    console.log(result);
    setValue("image", url);
    // Hide the default image after upload
    setDefaultImageVisible(false);
  }

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
        <div className="solo-form-layout">
        <Field>
            <Label>Brand Image</Label>
            <CloudinaryUploader onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <>
                    {!isDefaultImageVisible && (
                      <div>
                        <button
                          className="p-3 text-sm text-white bg-green-500 rounded-md"
                          onClick={handleOnClick}
                        >
                          Rechoose Image
                        </button>
                      </div>
                    )}

                    {isDefaultImageVisible && (
                      <button
                        className="flex items-start justify-center w-full h-full border-r-2 border-gray-700"
                        onClick={handleOnClick}
                      >
                        <img
                          className="w-[50%] h-[90%]"
                          src={require("../assets/img-upload.png")}
                          alt="ImgUpload"
                        />
                      </button>
                    )}
                  </>
                );
              }}
            </CloudinaryUploader>
            {url && (
              <>
                <img
                  className="rounded-3xl w-[34rem] h-[20rem] object-cover"
                  src={url}
                  alt="Uploaded resource"
                />
              </>
            )}
          </Field>
        </div>
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

export default SignUpBrandPage;