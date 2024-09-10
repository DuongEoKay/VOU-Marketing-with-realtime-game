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
import { useParams } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

const VoucherUpdate = () => {
  const navigate = useNavigate();

  const [isDefaultImageVisibleQRCode, setDefaultImageVisibleQRCode] = useState(true);
  const [isDefaultImageVisibleHinhAnh, setDefaultImageVisibleHinhAnh] = useState(true);

  const { slug } = useParams();

  const { voucherState: { detailedvoucher },
    getDetailedVoucher, updateVoucher } = useContext(voucherContext)

  const { control, watch, setValue, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      ten: "",
      qrcode: "",
      hinhanh: "",
      trigia: "",
      diem: "",
      voucherEndDate: dayjs()
    },
  });

  const id = slug;
  const detailid = id;
  useState(() => getDetailedVoucher(detailid), []);

  const [loading, setLoading] = useState(false);
  const [urlQRCode, updateUrlQRCode] = useState();
  const [urlHinhanh, updateUrlHinhanh] = useState();
  const [error, updateError] = useState();
  const [EndDateValue, setEndDateValue] = useState(dayjs());
  const [mota, setMota] = useState("");

  const updateVoucherHandler = async (values) => {
    // const { ten, trigia, diem, voucherEndDate } = values
  
    // const endDate_day = voucherEndDate.date()
    // const endDate_month = voucherEndDate.month() + 1
    // const endDate_year = voucherEndDate.year()
    // const endDate_hour = voucherEndDate.hour()
    // const endDate_minute = voucherEndDate.minute()
    // const endDate_second = "00"

    // const ngayhethan = endDate_month + "/" + endDate_day + "/" + endDate_year + " " + endDate_hour + ":" + endDate_minute + ":" + endDate_second

    // const qrcode = urlQRCode
    // const hinhanh = urlHinhanh

    // if (!Number.isInteger(parseInt(trigia, 10))) toast.error("Value of Voucher must be an integer")
    //   if (!Number.isInteger(parseInt(diem, 10))) toast.error("Point of Voucher must be an integer")
    // else {
    //     try {
    //         const newVoucherData = await addVoucher({ ten, qrcode, hinhanh, trigia, diem, mota, ngayhethan });
    //         if (newVoucherData["success"]) {
    //             toast.success(`New voucher added successfully`);
    //             navigate("/manage/vouchers");
    //         } 
    //         else {
    //         toast.error(newVoucherData["message"]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    let qrcode;
    qrcode = urlQRCode == undefined ? detailedvoucher[0].qrcode : urlQRCode;
    let hinhanh;
    hinhanh = urlHinhanh == undefined ? detailedvoucher[0].hinhanh : urlHinhanh;

    const endDate_day = EndDateValue.date()
    const endDate_month = EndDateValue.month() + 1
    const endDate_year = EndDateValue.year()
    const endDate_hour = EndDateValue.hour()
    const endDate_minute = EndDateValue.minute()
    const endDate_second = EndDateValue.second()

    const ngayhethan = endDate_month + "/" + endDate_day + "/" + endDate_year + " " + endDate_hour + ":" + endDate_minute + ":" + endDate_second

    let { ten, trigia, diem } = values

    ten = ten == "" ? detailedvoucher[0].ten : ten;
    trigia = trigia == "" ? detailedvoucher[0].trigia : trigia;
    diem = diem == "" ? detailedvoucher[0].diem : diem;

    let plainText = stripHtml(mota)

    if (!Number.isInteger(parseInt(trigia, 10))) toast.error("Value of Voucher must be an integer")
    else if (!Number.isInteger(parseInt(diem, 10))) toast.error("Point of Voucher must be an integer")
    else {
        const updateInfor = {ten, qrcode, hinhanh, trigia, diem, "mota": plainText, ngayhethan}
        try {
            const updateVoucherData = await updateVoucher(detailid, updateInfor);
            if (updateVoucherData["success"]) {
                toast.success(`Voucher updated successfully`);
                navigate("/manage/vouchers");
            }
            else {
              toast.error(updateVoucherData["message"]);
            }
        } catch (error) {
            console.log(error);
        }
    }
  };

  useEffect(() => {
    document.title = "BrandManager - Update voucher";
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

  useEffect(() => {
    if (detailedvoucher.length > 0) {
      const voucher = detailedvoucher[0];
      setMota(voucher.mota || "");
      setEndDateValue(dayjs(voucher.ngayhethan) || dayjs())
    }
  }, [detailedvoucher]);

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

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  return (
    <>
      <DashboardHeading
        title="Update Voucher"
        desc="Update Your Voucher Easily Here"
      ></DashboardHeading>
      {detailedvoucher.map((voucher) =>
      <form
      className="form"
      onSubmit={handleSubmit(updateVoucherHandler)}
      autoComplete="off"
    >
      <div className="single-form-layout">
        <Field>
          <Label>Voucher Name</Label>
          <Input
            control={control}
            placeholder={voucher.ten}
            name="ten"
          ></Input>
        </Field>
      </div>
      <div className="form-layout mt-6">
          <Field>
              <Label>QRCode</Label>
              <img
                  className="w-[20rem] h-[15rem] object-cover mb-3 rounded-3xl"
                  src={urlQRCode ? urlQRCode : voucher.qrcode}
                  alt="VoucherQRCode"
              ></img>
              <CloudinaryUploader onUpload={handleOnUploadQRCode}>
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
                          Change QRCode
                      </button>
                  );
                }}
              </CloudinaryUploader>
            </Field>
            <Field>
              <Label>Image</Label>
              <img
                  className="w-[20rem] h-[15rem] object-cover mb-3 rounded-3xl"
                  src={urlHinhanh ? urlHinhanh : voucher.hinhanh}
                  alt="VoucherImage"
              ></img>
              <CloudinaryUploader onUpload={handleOnUploadHinhAnh}>
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
                          Change Image
                      </button>
                  );
                }}
              </CloudinaryUploader>
            </Field>
      </div>
      <div className="form-layout">
        <Field>
          <Label>Voucher Value</Label>
          <Input
            control={control}
            placeholder={voucher.trigia}
            name="trigia"
          ></Input>
        </Field>
        <Field>
          <Label>Voucher Point</Label>
          <Input
            control={control}
            placeholder={voucher.diem}
            name="diem"
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
        Update Voucher
      </Button>
    </form>
    )}
    </>
  );
};

export default VoucherUpdate;