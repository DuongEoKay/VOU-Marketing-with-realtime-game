//import {api} from '../../../api/api';
import axios from 'axios';
import { api } from '../../config/api';
import { API_URL } from "../../config/api"
import {
    DELETE_GAME_FAILURE,
    DELETE_GAME_REQUEST,
    DELETE_GAME_SUCCESS,
    SEARCH_GAME_FAILURE,
    SEARCH_GAME_REQUEST,
    SEARCH_GAME_SUCCESS,
    UPDATE_GAMES_AVAILABILITY_FAILURE,
    UPDATE_GAMES_AVAILABILITY_REQUEST,
    UPDATE_GAMES_AVAILABILITY_SUCCESS,
    CREATE_GAME_FAILURE,
    CREATE_GAME_REQUEST,
    CREATE_GAME_SUCCESS,
    GET_ALL_GAME_FAILURE,
    GET_ALL_GAME_REQUEST,
    GET_ALL_GAME_SUCCESS,


} from './ActionType';




export const createGame = (data) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_GAME_REQUEST });
        try {
            console.log("Data sent from form:", data);
            const response = await axios.post(
                `${API_URL}/games/`,
                data.userData,
                {
                    headers: {
                        Authorization: `Bearer ${data.jwt}`
                    }
                }
            );
            data.navigate("/admin/game/")
            dispatch({ type: CREATE_GAME_SUCCESS, payload: response.data });
            console.log("Create game success:", response.data);
        } catch (error) {
            console.error("Error creating game:", error);
            dispatch({ type: CREATE_GAME_FAILURE, payload: error });
        }
    };
};

export const getAllGame = (reqData) => {
   return async (dispatch) => {
        dispatch({type: GET_ALL_GAME_REQUEST});
        try {
            const {data} = await api.get(`/games/`,
            {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });

            dispatch({type: GET_ALL_GAME_SUCCESS, payload: data});
            console.log("get all game success",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: GET_ALL_GAME_FAILURE, payload: error});
        }
    };
};


export const searchGame =({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({type: SEARCH_GAME_REQUEST});
        try {
            const {data} = await api.get(`/food/search?name=${keyword}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: SEARCH_GAME_SUCCESS, payload: data});
            console.log("search GAME item",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: SEARCH_GAME_FAILURE, payload: error});
        }
    };
}


export const updateGame=({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_GAMES_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(`/food/${foodId}`,{},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: UPDATE_GAMES_AVAILABILITY_SUCCESS, payload: data});
            console.log("update GAME items availability",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: UPDATE_GAMES_AVAILABILITY_FAILURE, payload: error});
        }
    };
}


export const deleteGame = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: DELETE_GAME_REQUEST});
        try {
            const {data} = await api.delete(`/admin/food/${foodId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: DELETE_GAME_SUCCESS, payload: data});
            console.log("delete GAME item",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: DELETE_GAME_FAILURE, payload: error});
        }
    };
}





