import React, { useContext, useEffect, useState } from "react";
import { Button } from "components/button";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import TextArea from "components/input/TextArea";
import { authContext } from "contexts/authContext";
import CloudinaryUploader from "components/image/CloudinaryUploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  password: yup.string().min(8, "Password must be at least 8 characters"),
});

const BrandProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const {
    authState: { brand },
    updateBrand,
  } = useContext(authContext);

  const [url, updateUrl] = useState();
  const [error, updateError] = useState();

  const updatebrand = async (values) => {
    let { ten, sms, linhvuc, password, diachi } = values;
    let hinhanh;
    hinhanh = url == undefined ? brand.hinhanh : url;
    ten = ten == undefined ? brand.ten : ten;
    ten = ten == "" ? brand.ten : ten;
    sms = sms == undefined ? brand.sms : sms;
    sms = sms == "" ? brand.sms : sms;
    linhvuc = linhvuc == undefined ? brand.linhvuc : linhvuc;
    linhvuc = linhvuc == "" ? brand.linhvuc : linhvuc;
    password = password == undefined ? brand.matkhau : password;
    password = password == "" ? brand.password : password;
    diachi = diachi == undefined ? brand.diachi : diachi;
    diachi = diachi == "" ? brand.diachi : diachi;

    try {
      const updateData = await updateBrand(
        { ten, sms, password, hinhanh, linhvuc, diachi },
        brand.id_thuonghieu
      );
      if (updateData["success"]) {
        toast.success(`Brand updated successfully`);
        console.log(updateData["message"]);
        setTimeout(1000);
        window.location.reload();
      } else {
        toast.error(updateData["message"]);
      }
    } catch (error) {
      toast.error(["message"]);
    }
  }

  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      toast.error(arrErrors[0]?.message);
    }
  }, [errors]);

  function handleOnUpload(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }
  // console.log(brand.ten)

  return (
    <div>
      <DashboardHeading
        title="Brand Information"
        desc="Update your brand information"
      ></DashboardHeading>
      <form
        classname="form"
        onSubmit={handleSubmit(updatebrand)}
        autoComplete="off"
      >
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <img
              className="w-[20rem] h-[15rem] object-cover mb-3 rounded-3xl"
              src={url ? url : brand.hinhanh}
              alt="UserAvatar"
            ></img>
            <CloudinaryUploader onUpload={handleOnUpload}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <button
                    className="p-3 text-sm text-white bg-green-500 rounded-md"
                    onClick={handleOnClick}
                  >
                    Update Avatar
                  </button>
                );
              }}
            </CloudinaryUploader>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Brand's Name</Label>
            <Input
              control={control}
              name="ten"
              placeholder={brand.ten}
            ></Input>
          </Field>
          <Field>
            <Label>SMS</Label>
            <Input
              control={control}
              name="sms"
              type="sms"
              placeholder={brand.sms}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Field</Label>
            <Input
              control={control}
              name="linhvuc"
              placeholder={brand.linhvuc}
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              control={control}
              defaultValue={`${brand.matkhau}`}
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="solo-form-layout">
          <Field>
            <Label>Address</Label>
            <Input
              control={control}
              name="diachi"
              placeholder={brand.diachi}
            ></Input>
          </Field>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default BrandProfile;