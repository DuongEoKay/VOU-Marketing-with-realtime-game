import React, { useState } from "react";
import styled, { css } from "styled-components";

const VoucherValueStyles = styled.div`
  display: inline-block;
  border-radius: calc(0.2vw + 0.3em);
  padding: 4px 10px;
  color: #6b6b6b;
  font-size: calc(0.5vw + 0.5em);
  font-weight: 600;

  @media screen and (max-width: 1070px) {
    margin-right: calc(0.5em + 0.5vw);
  }
  a {
    font-weight: inherit;
    display: block;
  }
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  ${(props) =>
    props.type === "light" &&
    css`
      background-color: ${(props) => props.theme.grayLight};
    `};
`;

const VoucherValue = ({
  children,
  type = "primary",
  className = "",
}) => {
  const [voucherValue, setvoucherValue] = useState("");
  return (
    <VoucherValueStyles type={type} className={`voucher-vouchervalue ${className}`}>
      {children || voucherValue?.name}
    </VoucherValueStyles>
  );
};

export default VoucherValue;
