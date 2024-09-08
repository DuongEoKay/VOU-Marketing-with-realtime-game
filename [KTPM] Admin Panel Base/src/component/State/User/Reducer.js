import * as actionTypes from './ActionType';

const initialState = {
    user:[],
    loading: false,
    error: null,
    search:[],
    message: null
};


const USERItemReducer =(state=initialState, action) => {
    switch(action.type) {
    case actionTypes.CREATE_USER_REQUEST:
    case actionTypes.GET_ALL_USER_REQUEST:
    case actionTypes.DELETE_USER_REQUEST:
    case actionTypes.SEARCH_USER_REQUEST:
    case actionTypes.UPDATE_USERS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null
        };
    case actionTypes.CREATE_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            USERItem: action.payload
        };
    case actionTypes.GET_ALL_USER_SUCCESS:  
        return {
            ...state,
            loading: false,
            user: action.payload
        };
    case actionTypes.DELETE_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            USERItem: state.USERItem.filter(
                (item) => item.id !== action.payload               
            )
        };
    case actionTypes.UPDATE_USERS_SUCCESS:
        console.log("Update USER Item Availability Success");
        return {
            ...state,
            loading: false,
            USERItem: state.USERItem.map((item) =>
                item.id === action.payload.id ? action.payload : item
            )
        };

    case actionTypes.SEARCH_USER_SUCCESS:
        return {
            ...state,
            loading: false,
            search: action.payload
        };

    case actionTypes.CREATE_USER_FAILURE:
    case actionTypes.GET_ALL_USER_FAILURE:
    case actionTypes.DELETE_USER_FAILURE:
    case actionTypes.SEARCH_USER_FAILURE:
    case actionTypes.UPDATE_USERS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    default:
        return state;
    }
};

export default USERItemReducer;