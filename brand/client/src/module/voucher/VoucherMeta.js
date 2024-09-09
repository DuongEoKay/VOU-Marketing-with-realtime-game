import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const VoucherMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: calc(0.5em + 0.5vw);
  font-weight: 600;
  ${(props) =>
    props.color === "gray" &&
    css`
      color: ${(props) => props.theme.gray6B};
    `};
  ${(props) =>
    props.gray === "inherit" &&
    css`
      color: inherit;
    `};
  .voucher {
    &-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const VoucherMeta = ({
  date = "",
  brandName,
  className = "",
  color = "gray",
  brandId = "",
  voucher = {},
}) => {
  const [brand, setBrand] = useState();
  const navigate = useNavigate();

  const format = () => {
    const formatDate = new Date(date)
    return formatDate.toLocaleString()
  }
  const formatDate = format()
  return (
    <VoucherMetaStyles className={className} color={color}>
      <span className="voucher-time">Expired Date: {formatDate || date}</span>
      <span className="voucher-dot"></span>
      <span
        className="voucher-author"
        onClick={() => {
          navigate(`/brand/${brandId}`);
          window.location.reload();
        }}
      >
        {brandName || brand?.ten}
      </span>
    </VoucherMetaStyles>
  );
};

export default VoucherMeta;
