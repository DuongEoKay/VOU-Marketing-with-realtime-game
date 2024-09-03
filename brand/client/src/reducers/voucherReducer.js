export const voucherReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "VOUCHERS_LOADED_SUCCESS":
        return {
          ...state,
          vouchers: payload,
          vouchersLoading: false,
        };
      case "ALL":
        return {
          ...state,
          allvouchers: payload,
          vouchersLoading: false,
        };
      case "DETAIL_VOUCHER":
        return {
          ...state,
          detailvoucher: payload,
          vouchersLoading: false,
        };
      default:
        return state;
    }
};