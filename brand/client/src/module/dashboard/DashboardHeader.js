import { Button } from "components/button";
import React from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "./logo.png";
import { authContext } from "contexts/authContext";

const DashboardHeaderStyles = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 18px;
    font-weight: 600;
    img {
      max-width: 40px;
    }
  }
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
      background-position: center;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  @media screen and (max-width: 1023.98px) {
    .logo {
      visibility: hidden;
    }
  }
`;

const DashboardHeader = () => {
  const {
    authState: { brand },
  } = useContext(authContext);

  const navigate = useNavigate()

  return (
    <DashboardHeaderStyles>
      <NavLink to="/" className="logo">
        <img srcSet={logo} alt="brandmanager" className="logo" />
        <span className="hidden lg:inline-block">BrandManager</span>
      </NavLink>
      <div className="header-right">
      <Button to="/manage/add-voucher" className="bg-white" height="52px">
          Create new voucher
        </Button>
        <Button to="/manage/add-event" className="bg-white" height="52px">
          Create new event
        </Button>
        <NavLink onClick={() => {navigate(`/brand/${brand?.id_thuonghieu}`); window.location.reload();}} className="header-avatar">
          <img src={brand.hinhanh} alt="" />
        </NavLink>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
