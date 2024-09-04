import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const VoucherTitleStyles = styled.h3`
  a {
    font-weight: 600;
    line-height: 1.5;
    display: block;
    ${(props) =>
      props.size === "normal" &&
      css`
        font-size: 18px;
      `};
    ${(props) =>
      props.size === "large" &&
      css`
        font-size: 22px;
      `};
  }
`;

const VoucherTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  const navigate = useNavigate();
  return (
    <VoucherTitleStyles size={size} className={`voucher-title ${className}`}>
      <NavLink onClick={()=>{navigate(to); window.location.reload()}}>{children}</NavLink>
    </VoucherTitleStyles>
  );
};

export default VoucherTitle;
