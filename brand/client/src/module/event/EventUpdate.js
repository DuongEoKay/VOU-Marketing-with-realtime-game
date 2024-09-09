import React, { useEffect, useState, useContext } from "react";
import { useForm, useFieldArray, reset } from "react-hook-form";
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
import { useParams } from "react-router-dom";

Quill.register("modules/imageResize", ImageResize);

const EventUpdate = () => {
  const navigate = useNavigate()

  const [isDefaultImageVisible, setDefaultImageVisible] = useState(true);

  const { slug } = useParams();
  const {
    eventState: { detailedevent, games },
    getDetailedEvent,
    updateEvent,
    deleteQuestionEvent,
    getGameName
  } = useContext(eventContext);

  const {
    questionState: { questions },
    getAllQuestions, 
    addQuestion
  } = useContext(questionContext)
  const id = slug;
  const detailid = id;
  useState(() => getDetailedEvent(detailid), []);
  useState(() => getAllQuestions(detailid), []);
  useState(() => getGameName(), []);

  const { control, watch, register, formState: { errors }, reset, setValue, handleSubmit } = useForm({
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
  const [question, setQuestions] = useState([])
  const [gamename, setgameName] = useState("")

  const updateEventHandler = async (values) => {
    const startDate_day = StartDateValue.date()
    const startDate_month = StartDateValue.month() + 1
    const startDate_year = StartDateValue.year()
    const startDate_hour = StartDateValue.hour()
    const startDate_minute = StartDateValue.minute()
    const startDate_second = StartDateValue.second()

    const endDate_day = EndDateValue.date()
    const endDate_month = EndDateValue.month() + 1
    const endDate_year = EndDateValue.year()
    const endDate_hour = EndDateValue.hour()
    const endDate_minute = EndDateValue.minute()
    const endDate_second = EndDateValue.second()

    let hinhanh;
    hinhanh = url == undefined ? detailedevent[0].hinhanh : url;
    const thoigianbatdau = startDate_month + "/" + startDate_day + "/" + startDate_year + " " + startDate_hour + ":" + startDate_minute + ":" + startDate_second
    const thoigianketthuc = endDate_month + "/" + endDate_day + "/" + endDate_year + " " + endDate_hour + ":" + endDate_minute + ":" + endDate_second
    let { tensukien, voucherAmount, gameid } = values
    const id_game = gameid
    tensukien = tensukien == "" ? detailedevent[0].tensukien : tensukien;
    let soluongvoucher
    soluongvoucher = voucherAmount == 0 ? detailedevent[0].soluongvoucher : voucherAmount;
    const updateInfor = {tensukien, hinhanh, soluongvoucher, mota, thoigianbatdau, thoigianketthuc, id_game}

    try {
      const updateEventData = await updateEvent(detailid, updateInfor);
      if (updateEventData["success"]) {
        const isQuestionsDeleted = await deleteQuestionEvent(detailid)
        if(isQuestionsDeleted["success"]) {
          let allquestionscreated = 0
          for (let i = 0; i < numQuestions; i++) {
            const id_sukien = detailid
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
            toast.success(`Event updated successfully`);
            navigate("/manage/events");
          }
        }
      } else {
        toast.error(updateEventData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = "BrandManager - Update event";
  }, []);

  useEffect(() => {
    if (detailedevent.length > 0) {
      const event = detailedevent[0];
      const game = games.find((game) => game.id === event.id_game)
      setMota(event.mota || "");
      setgameName(game ? game.name : "")
      setStartDateValue(dayjs(event.thoigianbatdau) || dayjs())
      setEndDateValue(dayjs(event.thoigianketthuc) || dayjs())
    }
  }, [detailedevent]);

  useEffect(() => {
    if (questions && questions.length > 0) {
      reset({
        ...watch(),  // Keep existing values in the form
        questions: questions.map((question) => ({
          question: question.questionText,
          answerA: question.answers[0],
          answerB: question.answers[1],
          answerC: question.answers[2],
          answerD: question.answers[3],
          correctAnswer: question.correctAnswer,
          onScreencorrectAnswer: question.correctAnswer,
        })),
      });
      setNumQuestions(questions.length || 0);
    }
  }, [questions, reset]);

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
        title="Update Event"
        desc="Update Your Event Easily Here"
      ></DashboardHeading>
      {detailedevent.map((event) => (
        <form
            className="form"
            onSubmit={handleSubmit(updateEventHandler)}
            autoComplete="off"
        >
            <div className="form-layout">
              <Field>
                <Label>Event Name</Label>
                <Input
                  control={control}
                  placeholder={event.tensukien}
                  name="tensukien"
                ></Input>
              </Field>
              <Field>
                <Label>Voucher Number</Label>
                <Dropdown>
                  <Dropdown.Select placeholder={event.soluongvoucher}></Dropdown.Select>
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
                <img
                    className="w-[20rem] h-[15rem] object-cover mb-3 rounded-3xl"
                    src={url ? url : event.hinhanh}
                    alt="EventImage"
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
                            Change Image
                        </button>
                    );
                  }}
                </CloudinaryUploader>
              </Field>
              <Field>
                <Label>Game Name</Label>
                <Dropdown>
                  <Dropdown.Select placeholder={gamename}></Dropdown.Select>
                  <Dropdown.List>
                    {games.length > 0 &&
                      games.slice(0).map((item) => (
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
                <span className="inline-block p-3 text-sm font-medium text-green-600 rounded-lg bg-green-50">
                  {numQuestions}
                </span>
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
              Update Event
            </Button>
          </form>
      ))}
    </>
  );
};

export default EventUpdate;