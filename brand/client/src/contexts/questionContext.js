import { createContext, useReducer } from "react";
import { questionReducer } from "../reducers/questionReducer";
import axios from "axios";

export const questionContext = createContext();

const QuestionContextProvider = ({children}) => {
    const [questionState, dispatch] = useReducer(questionReducer, {
        question: {},
        questions: [],
        questionsLoading: true,
    });

    // get all questions
    const getAllQuestions = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/event/fetchquestion");
          if (response.data.success) {
            dispatch({
              type: "QUESTIONS_LOADED_SUCCESS",
              payload: response.data._questions,
            });
          }
        } catch (error) {
          return error.response.data
            ? error.response.data
            : { success: false, message: "Server error" };
        }
    };

    // add question
    const addQuestion = async (Question) => {
        try {
          const response = await axios.post("http://localhost:5000/api/event/createquestion", Question);
          if (response.data.success) {
            dispatch({ type: "ADD_QUESTION", payload: response.data.question });
            return response.data;
          }
        } catch (error) {
          return error.response.data
            ? error.response.data
            : { success: false, message: "Server error" };
        }
      };

    const questionContextData = {
        questionState,
        getAllQuestions,
        addQuestion,
      };

    return (
        <questionContext.Provider value={questionContextData}>
          {children}
        </questionContext.Provider>
      );
}

export default QuestionContextProvider;