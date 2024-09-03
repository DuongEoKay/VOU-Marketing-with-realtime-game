import { searchTermReducer } from "../reducers/filterReducer";
import { createStore } from "redux";

const store = createStore(searchTermReducer);

export default store;
