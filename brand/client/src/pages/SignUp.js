import React, { useEffect, useContext, useState } from "react";
import { Label } from "../components/label";
import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import { Dropdown } from "components/dropdown";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { authContext } from "../contexts/authContext";
import DashboardHeading from "module/dashboard/DashboardHeading";
import TextArea from "components/input/TextArea";
import CloudinaryUploader from "components/image/CloudinaryUploader";

const SignUpPage = () => {
  const { registerUser } = useContext(authContext);
  const location = useLocation()
  const phone = location.state?.phone || ""

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      sex: "",
    },
  });

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const [selectGender, setSelectGender] = useState("");

  const handleSignUp = async (values) => {
    // const { Email, brandname, password } = values;
    // try {
    //   const registerData = await registerBrand({ "Email": Email, "ten": brandname, "matkhau": password });
    //   if (registerData["success"]) {
    //     toast.success(`Welcome ${brandname}, now your brand is our partner!`);
    //   } else {
    //     toast.error(registerData["message"]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    const { email, fullname, username, dateofBirth, sex, facebook, password, otp} = values
    const formatdate = new Date(dateofBirth)
    const day = formatdate.getDate();
    const month = formatdate.getMonth() + 1;
    const year = formatdate.getFullYear();
    const newString = day + "/" + month + "/" + year
    try {
      const registeruser = await registerUser({
        otp,
        email, 
        'fullName': fullname,
        password,
        'role': "ROLE_BRAND_OWNER",
        phone,
        username,
        'avatar': url,
        'dateOfBirth': newString,
        sex,
        facebook
      })

      if (registeruser["accessToken"]) {
        toast.success(registeruser["message"]);
        navigate("/sign-up-brand", { state: { phone, username } });
      } else {
          toast.error(registeruser["message"]);
      }
    }
    catch (error) {
      console.log(error);
    }

    // console.log(values)
    // console.log(phone)
    // console.log(url)
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

  const handleClickOption = (item) => {
    setValue("sex", item);
    setSelectGender(item);
  };

  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <div class="form-layout">
          <Field>
            <Label htmlFor="email" className="label">
              Email
            </Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your Email"
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="username" className="label">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your Full Name"
              control={control}
            />
          </Field>
        </div>
        <div class="form-layout">
          <Field>
            <Label htmlFor="tel" className="label">
              Phone Number
            </Label>
            <Input
              type="tel"
              name="phone"
              placeholder="Enter your Phone Number"
              value={phone}
              disabled
              control={control}
            />
          </Field>
          <Field>
            <Label htmlFor="username" className="label">
              Username
            </Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your Username"
              control={control}
            />
          </Field>
        </div>
        <div class="form-layout">
          <Field>
            <Label htmlFor="date" className="label">
              Date of Birth
            </Label>
            <Input
              type="date"
              name="dateofBirth"
              placeholder="Enter your Date of Birth"
              control={control}
            />
          </Field>
          <Field>
            <Label>Sex</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Your gender"></Dropdown.Select>
              <Dropdown.List>
                <Dropdown.Option key="male" onClick={() => handleClickOption("Male")}>
                  Male
                </Dropdown.Option>
                <Dropdown.Option key="female" onClick={() => handleClickOption("Female")}>
                  Female
                </Dropdown.Option>
                <Dropdown.Option key="other" onClick={() => handleClickOption("Other")}>
                  Other
                </Dropdown.Option>
              </Dropdown.List>
            </Dropdown>
            {selectGender && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectGender}
              </span>
            )}
          </Field>
        </div>
        <div class="form-layout">
          <Field>
            <Label htmlFor="link" className="label">
              Facebook
            </Label>
            <Input
              type="text"
              name="facebook"
              placeholder="Enter your Facebook link"
              control={control}
            />
          </Field>
          <Field>
          <Label htmlFor="password" className="label">
            Password
          </Label>
          <InputPasswordToggle control={control}></InputPasswordToggle>
          </Field>
        </div>
        <div className="solo-form-layout">
        <Field>
            <Label>Avatar</Label>
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
        <div class="single-form-layout mb-6">
          <Field>
            <Label htmlFor="username" className="label">
              OTP
            </Label>
            <Input
              type="text"
              name="otp"
              placeholder="Enter your OTP"
              control={control}
            />
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

export default SignUpPage;
