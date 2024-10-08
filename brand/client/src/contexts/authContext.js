import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { LOCAL_STORAGE_TOKEN_NAME } from "../utils/constants";
import setAuthToken from "../utils/setAuthToken";

export const authContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,  
    isAuthenticated: false,
    brand: null,
  });

  // authenticate brand
  const loadBrand = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get("http://localhost:8080/brand/api/brand");
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, brand: response.data.brand },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, brand: null },
      });
    }
  };

  useState(() => loadBrand(), []);

  // login
  const loginBrand = async (Brand) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/brand/api/brand/login",
        Brand
      );
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadBrand();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  const loginUser = async (brand) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        brand
      );
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  const validateOtp = async (brand) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/validate-otp",
        brand
      );
      if (response.data.accessToken) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      await loadBrand();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  const registerBrand = async (Brand) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/brand/api/brand/register",
        Brand
      );
      if (response.data.success) {
        await loadBrand();
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  const registerUser = async (Brand) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        Brand
      );
      if (response.data.accessToken) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
        setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  const phoneValidate = async (phone) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/validate-phone", phone)
      return response.data;
    }
    catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  const logoutBrand = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, brand: null },
    });
  };

  const allBrand = async () => {
    try {
      const response = await axios.get("http://localhost:8080/brand/api/brand/allbrand");
      if (response.data.success) {
        dispatch({
          type: "ALL_BRAND",
          payload: { allbrand: response.data.brands }
        });
      }
    } 
    catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  }

  // update User
  const updateBrand = async (Brand, id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/brand/api/brand/${id}`,
        Brand
      );
      await loadBrand();
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  //context data
  const authContextData = {
    loginBrand,
    registerBrand,
    authState,
    logoutBrand,
    allBrand,
    updateBrand,
    phoneValidate,
    loginUser,
    validateOtp,
    registerUser
  };

  // return provider
  return (
    <authContext.Provider value={authContextData}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
