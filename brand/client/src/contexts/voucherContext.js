import { createContext, useReducer } from "react";
import { voucherReducer } from "../reducers/voucherReducer";
import axios from "axios";

export const voucherContext = createContext();

const VoucherContextProvider = ({children}) => {
    const [voucherState, dispatch] = useReducer(voucherReducer, {
        voucher: {},
        vouchers: [],
        detailedvoucher: [],
        allvouchers: [],
        vouchersLoading: true,
    });

    // get all vouchers
    const getAllVouchers = async () => {
        try {
          const response = await axios.get("http://localhost:5000/brand/api/voucher/");
          if (response.data.success) {
            dispatch({
              type: "VOUCHERS_LOADED_SUCCESS",
              payload: response.data.voucher,
            });
          }
        } catch (error) {
          return error.response.data
            ? error.response.data
            : { success: false, message: "Server error" };
        }
    };

    // add voucher
    const addVoucher = async (Voucher) => {
        try {
          const response = await axios.post("http://localhost:5000/brand/api/voucher/create", Voucher);
          if (response.data.success) {
            dispatch({ type: "ADD_VOUCHER", payload: response.data.voucher });
            return response.data;
          }
        } catch (error) {
          return error.response.data
            ? error.response.data
            : { success: false, message: "Server error" };
        }
    };

    // delete voucher
    const deleteVoucher = async (voucherId) => {
        try {
        const response = await axios.delete(
            `http://localhost:/brand/api/voucher/${voucherId}`
        );
        if (response.data.success) {
            dispatch({ type: "DELETE_VOUCHER", payload: voucherId });
            return response.data;
        }
        } catch (error) {
        console.log(error);
        }
    };

    // getDetailedVoucher
    const getDetailedVoucher = async (VoucherId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/brand/api/voucher/detailvoucher/${VoucherId}`
        );
        if (response.data.success) {
          dispatch({
            type: "DETAIL_VOUCHER",
            payload: response.data.vouchers,
          });
          return response.data;
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    const getAllVouchersEver = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/brand/api/voucher/allvoucher`);
        if (response.data.success) {
          dispatch({
            type: "ALL",
            payload: response.data.vouchers,
          });
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    const voucherContextData = {
      voucherState,
      getAllVouchers,
      addVoucher,
      deleteVoucher,
      getDetailedVoucher,
      getAllVouchersEver
    };

    return (
        <voucherContext.Provider value={voucherContextData}>
          {children}
        </voucherContext.Provider>
      );
}

export default VoucherContextProvider;