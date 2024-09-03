export const questionReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "QUESTIONS_LOADED_SUCCESS":
        return {
          ...state,
          questions: payload,
          questionsLoading: false,
        };
      case "ALL":
        return {
          ...state,
          allquestions: payload,
          questionsLoading: false,
        };
      case "DETAIL_QUESTION":
        return {
          ...state,
          detailquestion: payload,
          questionsLoading: false,
        };
      default:
        return state;
    }
  };