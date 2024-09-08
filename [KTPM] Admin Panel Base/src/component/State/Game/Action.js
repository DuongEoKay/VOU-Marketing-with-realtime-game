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
    UPDATE_GAMES_FAILURE,
    UPDATE_GAMES_REQUEST,
    UPDATE_GAMES_SUCCESS,
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


export const getGameById = async (reqData) => {
    
    try {
            console.log("data tu form", reqData);
            const {data} = await api.get(`/games/${reqData.id}`,
            {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
                
            });
            console.log("get game by id",data);
            return data;
        } catch (error) {
            console.log("catch error",error);
            return error;
        }


};


export const updateGame=(data) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_GAMES_REQUEST});
        try {
            const {data:res} = await axios.put(`${API_URL}/games`, data.gameData,
                {
                    headers: {
                        Authorization: `Bearer ${data.jwt}`
                    }
                }
            )
    
            data.navigate("/admin/game")
    
            console.log("res", res)
            dispatch({type: UPDATE_GAMES_SUCCESS, payload: res});
            console.log("update GAME items availability",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: UPDATE_GAMES_FAILURE, payload: error});
        }
    };
}


export const deleteGame = ({gameId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: DELETE_GAME_REQUEST});
        try {
            const {data} = await api.delete(`/games/${gameId}`,{
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





