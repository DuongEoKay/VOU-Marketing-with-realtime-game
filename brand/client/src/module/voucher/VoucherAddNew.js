import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import CloudinaryUploader from "components/image/CloudinaryUploader";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { voucherContext } from "contexts/voucherContext";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const VoucherAddNew = () => {
  const navigate = useNavigate();

  const [isDefaultImageVisibleQRCode, setDefaultImageVisibleQRCode] = useState(true);
  const [isDefaultImageVisibleHinhAnh, setDefaultImageVisibleHinhAnh] = useState(true);

  const { addVoucher } = useContext(voucherContext)

  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      ten: "",
      qrcode: "",
      hinhanh: "",
      trigia: "",
      voucherEndDate: dayjs()
    },
  });

  const [loading, setLoading] = useState(false);
  const [urlQRCode, updateUrlQRCode] = useState();
  const [urlHinhanh, updateUrlHinhanh] = useState();
  const [error, updateError] = useState();
  const [EndDateValue, setEndDateValue] = useState(dayjs());
  const [mota, setMota] = useState("");

  const addVoucherHandler = async (values) => {
    const { ten, trigia, diem, voucherEndDate } = values
  
    const endDate_day = voucherEndDate.date()
    const endDate_month = voucherEndDate.month() + 1
    const endDate_year = voucherEndDate.year()
    const endDate_hour = voucherEndDate.hour()
    const endDate_minute = voucherEndDate.minute()
    const endDate_second = "00"

    const ngayhethan = endDate_month + "/" + endDate_day + "/" + endDate_year + " " + endDate_hour + ":" + endDate_minute + ":" + endDate_second

    const qrcode = urlQRCode
    const hinhanh = urlHinhanh

    if (!Number.isInteger(parseInt(trigia, 10))) toast.error("Value of Voucher must be an integer")
    else if (!Number.isInteger(parseInt(diem, 10))) toast.error("Point of Voucher must be an integer")
    else {
        try {
            const newVoucherData = await addVoucher({ ten, qrcode, hinhanh, trigia, diem, mota, ngayhethan });
            if (newVoucherData["success"]) {
                toast.success(`New voucher added successfully`);
                navigate("/manage/vouchers");
            } 
            else {
            toast.error(newVoucherData["message"]);
            }
        } catch (error) {
            console.log(error);
        }
    }
  };

  useEffect(() => {
    document.title = "BrandManager - Add new voucher";
  }, []);

  function handleOnUploadQRCode(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrlQRCode(result?.info?.secure_url);
    console.log(result);
    setValue("qrcode", urlQRCode);
    setDefaultImageVisibleQRCode(false);
  }

  function handleOnUploadHinhAnh(error, result, widget) {
    if (error) {
      updateError(error);
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrlHinhanh(result?.info?.secure_url);
    console.log(result);
    setValue("hinhanh", urlHinhanh);
    setDefaultImageVisibleHinhAnh(false);
  }

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <>
      <DashboardHeading
        title="Create New Voucher"
        desc="Let your client becomes so attached to your brand"
      ></DashboardHeading>
      <form
        className="form"
        onSubmit={handleSubmit(addVoucherHandler)}
        autoComplete="off"
      >
        <div className="single-form-layout">
          <Field>
            <Label>Voucher Name</Label>
            <Input
              control={control}
              placeholder="Enter your voucher's name"
              name="ten"
              required
            ></Input>
          </Field>
        </div>
        <div className="form-layout mt-6">
          <Field>
            <Label>QRCode</Label>
            <CloudinaryUploader onUpload={handleOnUploadQRCode}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <>
                    {!isDefaultImageVisibleQRCode && (
                      <div>
                        <button
                          className="p-3 text-sm text-white bg-green-500 rounded-md"
                          onClick={handleOnClick}
                        >
                          Rechoose Image
                        </button>
                      </div>
                    )}

                    {isDefaultImageVisibleQRCode && (
                      <button
                        className="flex items-start justify-center w-full h-full border-r-2 border-gray-700"
                        onClick={handleOnClick}
                      >
                        <img
                          className="w-[50%] h-[90%]"
                          src={require("../../assets/img-upload.png")}
                          alt="ImgUpload"
                        />
                      </button>
                    )}
                  </>
                );
              }}
            </CloudinaryUploader>
            {urlQRCode && (
              <>
                <img
                  className="rounded-3xl w-[34rem] h-[20rem] object-cover"
                  src={urlQRCode}
                  alt="Uploaded resource"
                />
              </>
            )}
          </Field>
          <Field>
            <Label>Image</Label>
            <CloudinaryUploader onUpload={handleOnUploadHinhAnh}>
              {({ open }) => {
                function handleOnClick(e) {
                  e.preventDefault();
                  open();
                }
                return (
                  <>
                    {!isDefaultImageVisibleHinhAnh && (
                      <div>
                        <button
                          className="p-3 text-sm text-white bg-green-500 rounded-md"
                          onClick={handleOnClick}
                        >
                          Rechoose Image
                        </button>
                      </div>
                    )}

                    {isDefaultImageVisibleHinhAnh && (
                      <button
                        className="flex items-start justify-center w-full h-full border-r-2 border-gray-700"
                        onClick={handleOnClick}
                      >
                        <img
                          className="w-[50%] h-[90%]"
                          src={require("../../assets/img-upload.png")}
                          alt="ImgUpload"
                        />
                      </button>
                    )}
                  </>
                );
              }}
            </CloudinaryUploader>
            {urlHinhanh && (
              <>
                <img
                  className="rounded-3xl w-[34rem] h-[20rem] object-cover"
                  src={urlHinhanh}
                  alt="Uploaded resource"
                />
              </>
            )}
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Voucher Value</Label>
            <Input
              control={control}
              placeholder="Enter your voucher's value"
              name="trigia"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Voucher Point</Label>
            <Input
              control={control}
              placeholder="Enter your voucher's point"
              name="diem"
              required
            ></Input>
          </Field>
        </div>
        <div className="single-form-layout ml-44">
          <Field>
            <Label>Voucher Expired Date</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Pick Voucher Expired Date"
                value={EndDateValue}
                onChange={(newValue) => {
                  setEndDateValue(newValue);
                  setValue("voucherEndDate", newValue);
                }}
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
          </Field>
        </div>
        <div className="single-form-layout">
          <div className="mb-10">
            <Field>
              <Label>Description</Label>
              <div className="w-full entry-content">
                <ReactQuill
                  modules={modules}
                  name="mota"
                  value={mota}
                  onChange={setMota}
                />
              </div>
            </Field>
          </div>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new Voucher
        </Button>
      </form>
    </>
  );
};

export default VoucherAddNew;
