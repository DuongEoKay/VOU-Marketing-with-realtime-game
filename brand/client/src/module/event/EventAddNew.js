import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown } from "components/dropdown";
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import CloudinaryUploader from "components/image/CloudinaryUploader";
import { soluongvoucherArray, game } from "utils/constants";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { eventContext } from "contexts/eventContext";
import { questionContext } from "contexts/questionContext";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const EventAddNew = () => {
  const navigate = useNavigate();

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);

  const { addEvent } = useContext(eventContext);
  const { addQuestion } = useContext(questionContext)

  const { control, watch, setValue, register, formState: { errors }, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      tensukien: "",
      voucherId: "",
      voucherAmount: 0,
      image: "",
      eventStartDate: dayjs(),
      eventEndDate: dayjs(),
      questions: [],
      gamename: "",
      gameid: ""
    },
  });

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions"
  });

  const [selectvoucherNum, setSelectvoucherNum] = useState();
  const [selectgameName, setSelectgameName] = useState();
  const [loading, setLoading] = useState(false);
  const [url, updateUrl] = useState();
  const [error, updateError] = useState();
  const [StartDateValue, setStartDateValue] = useState(dayjs());
  const [EndDateValue, setEndDateValue] = useState(dayjs());
  const [numQuestions, setNumQuestions] = useState(0);
  const [mota, setMota] = useState("");


  const addEventHandler = async (values) => {
    const { tensukien, voucherAmount, gameid, eventStartDate, eventEndDate } = values

    const startDate_day = values.eventStartDate.date()
    const startDate_month = values.eventStartDate.month() + 1
    const startDate_year = values.eventStartDate.year()
    const startDate_hour = values.eventStartDate.hour()
    const startDate_minute = values.eventStartDate.minute()
    const startDate_second = values.eventStartDate.second()
  
    const endDate_day = values.eventEndDate.date()
    const endDate_month = values.eventEndDate.month() + 1
    const endDate_year = values.eventEndDate.year()
    const endDate_hour = values.eventEndDate.hour()
    const endDate_minute = values.eventEndDate.minute()
    const endDate_second = values.eventEndDate.second()

    const Date_startDate = eventStartDate.toDate()
    const Date_endDate = eventEndDate.toDate()

    const thoigianbatdau = startDate_month + "/" + startDate_day + "/" + startDate_year + " " + startDate_hour + ":" + startDate_minute + ":" + startDate_second
    const thoigianketthuc = endDate_month + "/" + endDate_day + "/" + endDate_year + " " + endDate_hour + ":" + endDate_minute + ":" + endDate_second

    const hinhanh = url
    const soluongvoucher = voucherAmount
    const id_game = gameid
    
    if(tensukien == "" || tensukien == undefined) toast.error("Please fill in Brand's Name");
    else if(voucherAmount == 0) toast.error("Please fill in voucherNum");
    else if(gameid == "") toast.error("Please choose game for your Event");
    else if(Date_startDate >= Date_endDate) toast.error("End Date/Time must be after Start Date/Time");
    else {
      try {
        const newEventData = await addEvent({ tensukien, hinhanh, id_game, soluongvoucher, mota, thoigianbatdau, thoigianketthuc });
        if (newEventData["success"]) {
          let allquestionscreated = 0
          for (let i = 0; i < numQuestions; i++) {
            const id_sukien = newEventData["event"].id_sukien
            const cauhoi = watch(`questions[${i}].question`)
            const a = watch(`questions[${i}].answerA`)
            const b = watch(`questions[${i}].answerB`)
            const c = watch(`questions[${i}].answerC`)
            const d = watch(`questions[${i}].answerD`)
            const dapan = watch(`questions[${i}].correctAnswer`)
            const newQuestionData = await addQuestion({ id_sukien, cauhoi, a, b, c, d, dapan });
            if(newQuestionData["success"]) {
              allquestionscreated = allquestionscreated + 1
            }
          }
          if (allquestionscreated == numQuestions) {
            toast.success(`New event added successfully`);
            navigate("/manage/events");
          }
        } 
        else {
          toast.error(newEventData["message"]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    document.title = "BrandManager - Add new event";
  }, []);

  const handleClickOption = (item) => {
    setValue("voucherId", item.id);
    setValue("voucherAmount", item.amount);
    setSelectvoucherNum(item);
  };

  const handleClickGameOption = (item) => {
    setValue("gameid", item.id);
    setValue("gamename", item.name);
    setSelectgameName(item);
  };

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

  const handleNumQuestionsChange = (value) => {
    const num = parseInt(value, 10);
    setNumQuestions(num);
    const currentQuestions = watch("questions");
    if (currentQuestions.length < num) {
      for (let i = currentQuestions.length; i < num; i++) {
        append({ question: "", answerA: "", answerB: "", answerC: "", answerD: "", correctAnswer: "", onScreencorrectAnswer: "" });
      }
    } else {
      // Remove extra questions
      for (let i = currentQuestions.length; i > num; i--) {
        remove(i - 1);
      }
    }
  };

  const handleCorrectAnswer = (answer, index) => {
    setValue(`questions[${index}].onScreencorrectAnswer`, answer)
    const answerA = watch(`questions[${index}].answerA`)
    const answerB = watch(`questions[${index}].answerB`)
    const answerC = watch(`questions[${index}].answerC`)
    const answerD = watch(`questions[${index}].answerD`)
    if(answer == "A") setValue(`questions[${index}].correctAnswer`, answerA)
    else if(answer == "B") setValue(`questions[${index}].correctAnswer`, answerB)
    else if(answer == "C") setValue(`questions[${index}].correctAnswer`, answerC)
    else if(answer == "D") setValue(`questions[${index}].correctAnswer`, answerD)
  }

  return (
    <>
      <DashboardHeading
        title="Create New Event"
        desc="Let your thoughts spreading"
      ></DashboardHeading>
      <form
        className="form"
        onSubmit={handleSubmit(addEventHandler)}
        autoComplete="off"
      >
        <div className="form-layout">
          <Field>
            <Label>Event Name</Label>
            <Input
              control={control}
              placeholder="Enter your event's name"
              name="tensukien"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Voucher Number</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select number of Voucher"></Dropdown.Select>
              <Dropdown.List>
                {soluongvoucherArray.length > 0 &&
                  soluongvoucherArray.slice(0).map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.amount}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectvoucherNum?.amount && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectvoucherNum?.amount}
              </span>
            )}
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
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
                          src={require("../../assets/img-upload.png")}
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
          <Field>
            <Label>Game Name</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select game for your Event"></Dropdown.Select>
              <Dropdown.List>
                {game.length > 0 &&
                  game.slice(0).map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickGameOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectgameName?.name && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {selectgameName?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="solo-form-layout">
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
        <div className="single-form-layout">
          <Field>
            <Label>Number of Questions</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select number of Questions"></Dropdown.Select>
              <Dropdown.List>
                {Array.from({ length: 10 }, (_, i) => i).map((num) => (
                  <Dropdown.Option
                    key={num}
                    onClick={() => handleNumQuestionsChange(num)}
                  >
                    {num}
                  </Dropdown.Option>
                ))}
              </Dropdown.List>
            </Dropdown>
            {numQuestions && (
              <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                {numQuestions}
              </span>
            )}
          </Field>
        </div>

        {fields.map((field, index) => (
          <div className="form-layout" key={field.id}>
            <Field>
              <Label>Question {index + 1}</Label>
              <Input
                control={control}
                placeholder={`Enter question ${index + 1}`}
                name={`questions[${index}].question`}
                required
              />
            </Field>
            <Field>
              <Label>Answer A</Label>
              <Input
                control={control}
                placeholder="Enter answer A"
                name={`questions[${index}].answerA`}
                required
              />
            </Field>
            <Field>
              <Label>Answer B</Label>
              <Input
                control={control}
                placeholder="Enter answer B"
                name={`questions[${index}].answerB`}
                required
              />
            </Field>
            <Field>
              <Label>Answer C</Label>
              <Input
                control={control}
                placeholder="Enter answer C"
                name={`questions[${index}].answerC`}
                required
              />
            </Field>
            <Field>
              <Label>Answer D</Label>
              <Input
                control={control}
                placeholder="Enter answer D"
                name={`questions[${index}].answerD`}
                required
              />
            </Field>
            <Field>
              <Label>Correct Answer</Label>
              <Dropdown>
                <Dropdown.Select placeholder={watch(`questions[${index}].onScreencorrectAnswer`) || "Select correct answer"}></Dropdown.Select>
                <Dropdown.List>
                  {["A", "B", "C", "D"].map((answer) => (
                    <Dropdown.Option
                      key={answer}
                      onClick={() => handleCorrectAnswer(answer, index)}
                    >
                      {answer}
                    </Dropdown.Option>
                  ))}
                </Dropdown.List>
              </Dropdown>
              <input
                type="hidden"
                value={watch(`questions[${index}].correctAnswer`)}
                {...register(`questions[${index}].correctAnswer`, { required: "Correct answer is required" })}
              />
              {errors?.questions?.[index]?.correctAnswer && (
                <span>{errors.questions[index].correctAnswer.message}</span>
              )}
              <span>
                Correct answer: {watch(`questions[${index}].correctAnswer`)}
              </span>
            </Field>
          </div>
        ))}
        <div className="form-layout ml-16">
          <Field>
            <Label>Event Start Date</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Pick Event Start Date"
                value={StartDateValue}
                onChange={(newValue) => {
                  setStartDateValue(newValue);
                  setValue("eventStartDate", newValue);
                }}
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
          </Field>
          <Field>
            <Label>Event End Date</Label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Pick Event End Date"
                value={EndDateValue}
                onChange={(newValue) => {
                  setEndDateValue(newValue);
                  setValue("eventEndDate", newValue);
                }}
                renderInput={(params) => <Input {...params} />}
              />
            </LocalizationProvider>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new Event
        </Button>
      </form>
    </>
  );
};

export default EventAddNew;
