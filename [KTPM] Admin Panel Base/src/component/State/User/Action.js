//import {api} from '../../../api/api';
import { api } from '../../config/api';
import {
    DELETE_USER_ITEM_FAILURE,
    DELETE_USER_ITEM_REQUEST,
    DELETE_USER_ITEM_SUCCESS,
    SEARCH_USER_ITEM_FAILURE,
    SEARCH_USER_ITEM_REQUEST,
    SEARCH_USER_ITEM_SUCCESS,
    UPDATE_USER_ITEMS_AVAILABILITY_FAILURE,
    UPDATE_USER_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_USER_ITEMS_AVAILABILITY_SUCCESS,
    CREATE_USER_ITEM_FAILURE,
    CREATE_USER_ITEM_REQUEST,
    CREATE_USER_ITEM_SUCCESS,
    GET_ALL_USER_FAILURE,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,


} from './ActionType';




export const createUserItem = ({values, jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_USER_ITEM_REQUEST});
        try {
            const response = await api.post('/admin/food/',values,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: CREATE_USER_ITEM_SUCCESS, payload: response.data});
            console.log("create USER item",response.data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: CREATE_USER_ITEM_FAILURE, payload: error});
        }
    };
};

export const getUserById = async (reqData) => {
    
    try {
            const {data} = await api.get(`/users/${reqData.id}`,
            {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
                
            });
            console.log("get user by id",data);
            return data;
        } catch (error) {
            console.log("catch error",error);
            return error;
        }


};

export const getAllUser = (reqData) => {
   return async (dispatch) => {
        dispatch({type: GET_ALL_USER_REQUEST});
        try {
            const {data} = await api.get(`/users/`,
            {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                }
            });

            dispatch({type: GET_ALL_USER_SUCCESS, payload: data});
            console.log("get all user success",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: GET_ALL_USER_FAILURE, payload: error});
        }
    };
};




// export const getAllIngredientsOfUSERItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({type: GET_INGREDIENTS_OF_USER_ITEM_REQUEST});
//         try {
//             const {data} = await api.get(`/food/ingredients/${reqData.USERItemId}`,{
//                 headers: {
//                     Authorization: `Bearer ${reqData.jwt}`
//                 }
//             });
//             dispatch({type: GET_INGREDIENTS_OF_USER_ITEM_SUCCESS, payload: data});
//             console.log("get ingredients of USER item",data);
//         } catch (error) {
//             console.log("catch error",error);
//             dispatch({type: GET_INGREDIENTS_OF_USER_ITEM_FAILURE, payload: error});
//         }
//     };
// }


export const updateUser=({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: UPDATE_USER_ITEMS_AVAILABILITY_REQUEST});
        try {
            const {data} = await api.put(`/food/${foodId}`,{},{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: UPDATE_USER_ITEMS_AVAILABILITY_SUCCESS, payload: data});
            console.log("update USER items availability",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: UPDATE_USER_ITEMS_AVAILABILITY_FAILURE, payload: error});
        }
    };
}


export const deleteFoodAction = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: DELETE_USER_ITEM_REQUEST});
        try {
            const {data} = await api.delete(`/admin/food/${foodId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: DELETE_USER_ITEM_SUCCESS, payload: data});
            console.log("delete USER item",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: DELETE_USER_ITEM_FAILURE, payload: error});
        }
    };
}



