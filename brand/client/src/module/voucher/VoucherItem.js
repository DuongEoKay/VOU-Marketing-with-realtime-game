import React from "react";
import styled from "styled-components";
import VoucherValue from "./VoucherValue";
import VoucherImage from "./VoucherImage";
import VoucherMeta from "./VoucherMeta";
import VoucherTitle from "./VoucherTitle";
import { useNavigate } from "react-router-dom";

const VoucherItemStyles = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  .voucher {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: inherit;
    }
    &-vouchernum {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .voucher {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const VoucherItem = ({ voucher }) => {
  const truncatedTitle = truncateTitle(voucher.ten, 60);
  const navigate = useNavigate();
  return (
    <VoucherItemStyles className="cursor-pointer">
      <VoucherImage
        url={voucher?.hinhanh}
        alt="VoucherImage"
        to={`/voucher/${voucher.id_voucher}`}
      ></VoucherImage>
      <VoucherValue type="secondary">Value: {voucher?.trigia}</VoucherValue>
      <VoucherTitle to={`/voucher/${voucher.id_voucher}`}>{truncatedTitle}</VoucherTitle>
      <VoucherMeta
        brandName={voucher?.brand_name}
        brandId={voucher?.id_thuonghieu}
        date={voucher?.ngayhethan}
      ></VoucherMeta>
    </VoucherItemStyles>
  );
};

export default VoucherItem;
