import { Game } from '../../../AdminComponent/Game/Game';
import * as actionTypes from './ActionType';

const initialState = {
    game:[],
    loading: false,
    error: null,
    search:[],
    message: null
};


const GameReducer =(state=initialState, action) => {
    switch(action.type) {
    case actionTypes.CREATE_GAME_REQUEST:
    case actionTypes.GET_ALL_GAME_REQUEST:
    case actionTypes.DELETE_GAME_REQUEST:
    case actionTypes.SEARCH_GAME_REQUEST:
    case actionTypes.UPDATE_GAMES_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case actionTypes.CREATE_GAME_SUCCESS:
        return {
            ...state,
            loading: false,
            game: [...state.game, action.payload]
        };
    case actionTypes.GET_ALL_GAME_SUCCESS:  
        return {
            ...state,
            loading: false,
            game: action.payload
        };
    case actionTypes.DELETE_GAME_SUCCESS:
        return {
            ...state,
            loading: false,
            game: state.game.filter(
                (item) => item.id !== action.payload               
            )
        };
    case actionTypes.UPDATE_GAMES_SUCCESS:
        console.log("Update game Availability Success");
        return {
            ...state,
            loading: false,
            game: state.game.map((item) =>
                item.id === action.payload.id ? action.payload : item
            )
        };

    case actionTypes.SEARCH_GAME_SUCCESS:
        return {
            ...state,
            loading: false,
            search: action.payload
        };

    case actionTypes.CREATE_GAME_FAILURE:
    case actionTypes.GET_ALL_GAME_FAILURE:
    case actionTypes.DELETE_GAME_FAILURE:
    case actionTypes.SEARCH_GAME_FAILURE:
    case actionTypes.UPDATE_GAMES_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    default:
        return state;
    }
};

export default GameReducer;