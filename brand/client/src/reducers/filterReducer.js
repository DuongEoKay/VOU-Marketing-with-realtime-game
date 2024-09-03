// reducers.js
const initialState = "";

export const searchTermReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return action.payload;
    default:
      return state;
  }
};
