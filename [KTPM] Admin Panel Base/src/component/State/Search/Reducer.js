import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAIL
} from "./ActionType";

const initialState = {
    loading: false,
    restaurants: [],
    error: null
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                restaurants: action.payload
            };
        case SEARCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default searchReducer;