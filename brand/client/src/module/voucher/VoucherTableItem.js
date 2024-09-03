import React from "react";

const truncateten = (ten, maxLength) => {
  if (ten.length <= maxLength) {
    return ten;
  } else {
    return ten.slice(0, maxLength) + "...";
  }
};

const VoucherTableItem = ({ voucher }) => {
  const truncatedten = truncateten(voucher.ten, 60);
  return (
    <div className="flex items-center gap-x-3">
      <img
        src={voucher.qrcode ? voucher.qrcode : require("../../assets/logo.png")}
        alt=""
        className="w-[66px] h-[55px] rounded object-cover"
      />
      <img
        src={voucher.hinhanh ? voucher.hinhanh : require("../../assets/logo.png")}
        alt=""
        className="w-[66px] h-[55px] rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{truncatedten}</h3>
        <time className="text-sm text-gray-500">{voucher?.ngayhethan}</time>
      </div>
    </div>
  );
};

export default VoucherTableItem;
