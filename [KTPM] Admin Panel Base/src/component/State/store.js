import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import userReducer from "./User/Reducer";
import gameReducer from "./Game/Reducer";


const rootReducer = combineReducers({
    auth:authReducer,
    user:userReducer,
    game:gameReducer



})

export const store=legacy_createStore(rootReducer, applyMiddleware(thunk));
