import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BrandItemStyles = styled.div`
  .brand {
    width: fit-content;
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    padding: 1em;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    cursor: pointer;
    &-image {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 100%;
      margin-right: 1em;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
    }
    &-name {
      font-weight: bold;
      font-size: calc(0.5em + 0.5vw);
    }
    &-desc {
      font-size: calc(0.3em + 0.5vw);
      line-height: 2;
    }
  }
`;

const BrandItem = ({ brand }) => {
  const navigate = useNavigate();
  return (
    <BrandItemStyles>
      <div className="brand" onClick={() => navigate(`/brand/${brand.id_thuonghieu}`)}>
        <div className="brand-image">
          <img src={brand.hinhanh} alt="brandAvt" />
        </div>
        <div className="brand-content">
          <h3 className="brand-name">{brand.ten}</h3>
          <p className="brand-desc">{brand.linhvuc}</p>
        </div>
      </div>
    </BrandItemStyles>
  );
};

export default BrandItem;
