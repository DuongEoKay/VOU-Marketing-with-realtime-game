import Heading from "components/layout/Heading";
import React from "react";
import VoucherItem from "./VoucherItem";

const VoucherRelated = ({ vouchers }) => {
  return (
    <div className="voucher-related">
      <Heading>Related Vouchers</Heading>
      <div className="grid-layout grid-layout--primary">
        {vouchers.map((voucher) => (
          <VoucherItem voucher={voucher}></VoucherItem>
        ))}
      </div>
    </div>
  );
};

export default VoucherRelated;
