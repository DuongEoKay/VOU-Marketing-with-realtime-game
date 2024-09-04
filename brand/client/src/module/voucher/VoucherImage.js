import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const VoucherImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const VoucherImage = ({ className = "", url = "", alt = "", to = null }) => {
  if (to)
    return (
      <NavLink to={to} style={{ display: "block" }}>
        <VoucherImageStyles className={`voucher-image ${className}`}>
          <img src={url} alt={alt} loading="lazy" />
        </VoucherImageStyles>
      </NavLink>
    );
  return (
    <VoucherImageStyles className={`voucher-image ${className}`}>
      <img src={url} alt={alt} loading="lazy" />
    </VoucherImageStyles>
  );
};

export default VoucherImage;