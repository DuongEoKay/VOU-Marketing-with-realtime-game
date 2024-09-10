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
          detailedvoucher: payload,
          vouchersLoading: false,
        };
      case "VOUCHER_OF_EVENT":
        return {
          ...state,
          voucherevent: payload,
          vouchersLoading: false,
        };
      case "ALL_VOUCHEREVENT":
        return {
          ...state,
          allvoucherevent: payload,
          vouchersLoading: false,
        };
      default:
        return state;
    }
};