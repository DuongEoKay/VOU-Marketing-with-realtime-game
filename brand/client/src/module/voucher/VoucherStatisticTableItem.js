import React from "react";

const truncateten = (ten, maxLength) => {
  if (ten.length <= maxLength) {
    return ten;
  } else {
    return ten.slice(0, maxLength) + "...";
  }
};

const formatDate = (date) => {
  const format = new Date(date)
  return format.toLocaleString()
}

const VoucherStatisticTableItem = ({ voucher }) => {
  const truncatedten = truncateten(voucher.tensukien, 60);
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <h3 className="font-semibold">{truncatedten}</h3>
        <time className="text-sm text-gray-500">{`Event End Date: ${formatDate(voucher?.thoigianketthuc)}`}</time>
      </div>
    </div>
  );
};

export default VoucherStatisticTableItem;