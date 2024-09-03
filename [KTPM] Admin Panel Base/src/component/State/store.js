import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import userReducer from "./User/Reducer";


const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,



})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));
