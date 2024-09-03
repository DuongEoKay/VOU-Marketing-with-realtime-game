import axios from "axios"
import { API_URL, api } from "../../config/api"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, OTP_FAILURE, OTP_REQUEST, OTP_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType"



export const registerUser = (data) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })

    try {
        
        const {data:res} = await axios.post(`${API_URL}/auth/register`, data.userData)

        console.log("data", data.userData)
        console.log("res", res)
        

        data.navigate("/")

        console.log("register success", res)
        dispatch({ type: REGISTER_SUCCESS, payload: res.jwt })
    } catch (error) {
        dispatch({type: REGISTER_FAILURE, payload: error})
        console.log("error nay moi ne", error, data.userData)
        console.log("error", error)

    }

}


export const loginUser = (data) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })

    try {
        const {data:res} = await axios.post(`${API_URL}/auth/validate-otp/`, data.userData)
        console.log("data", data.userData)
        if (res.accessToken) {
            localStorage.setItem("jwt", res.accessToken)
            
            data.navigate("/admin/restaurant")
        }
        else {
            data.navigate("/account/otp")
        }
        console.log("login success", res)
        dispatch({ type: LOGIN_SUCCESS, payload: res.jwt })
    } catch (error) {
        dispatch({type: LOGIN_FAILURE, payload: error})
        console.log("error", error)

    }

}


export const validateOtp = (data) => async (dispatch) => {
    dispatch({ type: OTP_REQUEST })

    try {
        
        console.log("data", data)
        const {data:res} = await axios.post(`${API_URL}/auth/login/`, data.userData, )
        if (res.valid === true) {
            localStorage.setItem("username", data.userData.username)
            data.navigate("/account/otp");
            console.log("send otp success", res);
        } else {
            data.navigate("account/login");
            console.log("invalid infor", res);
        }
        dispatch({ type: OTP_SUCCESS, payload: res.message })
    } catch (error) {
        dispatch({type: OTP_FAILURE, payload: error})
        console.log("error", error)

    }

}


export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })

    try {
        const {data:res} = await api.get(`/user/profile`,

            { headers: {
                Authorization: `Bearer ${jwt}` 
            } })
        
        dispatch({ type: GET_USER_SUCCESS, payload: res })
        console.log("user profile", res)
    } catch (error) {
        dispatch({type: GET_USER_FAILURE, payload: error})
        console.log("error", error)

    }

}


export const addToFavorite = ({jwt, restaurantId}) => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })

    try {
        const {data:res} = await api.put(`/restaurants/${restaurantId}/add-favourite`,{},

            { headers: {
                Authorization: `Bearer ${jwt}` 
            } })
        
        dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: res })
        console.log("add to favorite success", res)
    } catch (error) {
        dispatch({type: ADD_TO_FAVORITE_FAILURE, payload: error})
        console.log("error", error)

    }

}


export const logout = () => async (dispatch) => {
    dispatch({ type: ADD_TO_FAVORITE_REQUEST })

    try {
        localStorage.clear()
        dispatch({ type: LOGOUT})
        console.log("logout succes")
    } catch (error) {
        console.log("error", error)

    }

}



