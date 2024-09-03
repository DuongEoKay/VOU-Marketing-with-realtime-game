import { api } from "../../config/api";

import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from "./ActionType";


export const searchRestaurants = ({ searchTerm }) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_REQUEST})
        try {
            const { data } = await api.get(`/search/${searchTerm}`);

            dispatch({
                type: SEARCH_SUCCESS,
                payload: data
            })
            console.log("searchRestaurants", data);
        } catch (error) {
            dispatch({type: SEARCH_FAIL,payload: error})
            console.log("searchRestaurants fail: ", error);
        }
    }
}