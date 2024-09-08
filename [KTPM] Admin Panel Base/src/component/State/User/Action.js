//import {api} from '../../../api/api';
import axios from 'axios';
import { api, API_URL } from '../../config/api';
import {
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    SEARCH_USER_FAILURE,
    SEARCH_USER_REQUEST,
    SEARCH_USER_SUCCESS,
    UPDATE_USERS_FAILURE,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_SUCCESS,
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    GET_ALL_USER_FAILURE,
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCCESS,


} from './ActionType';




export const createUserItem = ({values, jwt}) => {
    return async (dispatch) => {
        dispatch({type: CREATE_USER_REQUEST});
        try {
            const response = await api.post('/admin/food/',values,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: CREATE_USER_SUCCESS, payload: response.data});
            console.log("create USER item",response.data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: CREATE_USER_FAILURE, payload: error});
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
//         dispatch({type: GET_INGREDIENTS_OF_USER_REQUEST});
//         try {
//             const {data} = await api.get(`/food/ingredients/${reqData.USERItemId}`,{
//                 headers: {
//                     Authorization: `Bearer ${reqData.jwt}`
//                 }
//             });
//             dispatch({type: GET_INGREDIENTS_OF_USER_SUCCESS, payload: data});
//             console.log("get ingredients of USER item",data);
//         } catch (error) {
//             console.log("catch error",error);
//             dispatch({type: GET_INGREDIENTS_OF_USER_FAILURE, payload: error});
//         }
//     };
// }




export const updateUser = (data) => async (dispatch) => {
    dispatch({ type: UPDATE_USERS_REQUEST })

    try {

        console.log("data gui tu form", data)


        
        const {data:res} = await axios.put(`${API_URL}/users`, data.userData,
            {
                headers: {
                    Authorization: `Bearer ${data.jwt}`
                }
            }
        )

        data.navigate("/admin/user")

        console.log("res", res)
        

        console.log("register success", res)
        dispatch({ type: UPDATE_USERS_SUCCESS, payload: res.jwt })
    } catch (error) {
        dispatch({type: UPDATE_USERS_FAILURE, payload: error})
        console.log("error", error)

    }

}









export const deleteUser = ({userId, jwt}) => {
    return async (dispatch) => {
        dispatch({type: DELETE_USER_REQUEST});
        try {
            console.log("delete user id",userId, jwt);
            const {data} = await api.delete(`users/id/${userId}`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch({type: DELETE_USER_SUCCESS, payload: data});
            console.log("delete User success",data);
        } catch (error) {
            console.log("catch error",error);
            dispatch({type: DELETE_USER_FAILURE, payload: error});
        }
    };
}



