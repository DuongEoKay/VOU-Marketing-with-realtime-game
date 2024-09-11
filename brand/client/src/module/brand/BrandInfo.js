import Layout from "components/layout/Layout";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../../assets/banner.jpg";
import { theme } from "utils/constants";
import Heading from "components/layout/Heading";
import { useLocation, useParams } from "react-router-dom";
import { authContext } from "contexts/authContext";
import { eventContext } from "contexts/eventContext";
import EventNewestSmall from "module/event/EventNewestSmall";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const itemsPerPage = 6;

const BrandInfoStyles = styled.div`
  padding-bottom: 100px;

  .small_container {
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 65vw;
    margin: 0 auto;
    transition: width 0.1s;
  }
  .background {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }

  .background_blur {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
  }

  .profile_container {
    transform: translateX(-6%);
  }
  .brand_avt {
    width: 200px;
    height: 200px;
    border-radius: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }
  .fl_button {
    color: white;
    background-color: ${theme.primary};
    cursor: pointer;
    padding: calc(1em + 0.5vw);
    line-height: 1;
    border-radius: calc(0.1em + 0.4vw);
    font-weight: 600;
    height: 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .brand_info {
    text-align: center;
  }

  .fullname {
    font-size: 24px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    ul {
      display: flex;
      gap: 1rem;
    }
    .active {
      background-color: black;
      color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
    }
  }
`;

const BrandInfo = () => {
  const { slug } = useParams();
  const {
    authState: { allbrand },
    allBrand,
  } = useContext(authContext);
  useState(() => allBrand(), []);

  const getBrand = (id) => {
    if (!Array.isArray(allbrand)) {
      return "";
    }
  
    const brand = allbrand.filter((u) => u?.id_thuonghieu === id);
    return brand[0] || "";
  };

  const curBrand = getBrand(slug);

  const {
    eventState: { brandevents },
    getAllEventsOfBrand,
  } = useContext(eventContext);

  const id = slug;
  const brand_id = id

  useState(() => getAllEventsOfBrand(brand_id), []);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = brandevents.slice(offset, offset + itemsPerPage);

  return (
    <BrandInfoStyles>
      <Layout isHomePage={true}>
        <div className="relative bg_container">
          <img
            src={BackgroundImage}
            alt="Background"
            className="background"
          ></img>
          <div className="absolute background_blur"></div>
          <div className="small_container">
            <div className="ml-36 flex items-center justify-center gap-14 mb-10 profile_container">
              <div className="flex items-center gap-4 justify-evenly">
                <div>
                  <p className="font-bold text-center text-black">
                    {brandevents.length}
                  </p>
                  <span className="text-sm text-gray-500">Events</span>
                </div>
              </div>
              <div className="brand_avt">
                <img src={curBrand?.hinhanh} alt="Avatar" />
              </div>
              <div className="">
                  <button
                    className="fl_button"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
              </div>
            </div>
            <div className="mb-20 brand_info">
              <p className="text-lg font-bold fullname">{curBrand?.ten}</p>
              <div className="flex justify-center gap-3 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 6.827 6.827"
                >
                  <defs>
                    <style>
                      {`
                        .fill-none { fill: none; }
                        .fill-primary { fill: #ff6e40; }
                      `}
                    </style>
                  </defs>
                  <g>
                    <g>
                      <path
                        className="fill-none"
                        d="M0 0h6.827v6.827H0z"
                      />
                      <path
                        className="fill-none"
                        d="M.853.853h5.12v5.12H.853z"
                      />
                    </g>
                    <g>
                      <path
                        className="fill-primary"
                        d="M.909 2.24c.067 1.39 1.968 3.158 3.255 3.57.863.275 2.148-.269 1.64-.777L5 4.23c-.122-.123-.32-.108-.439.01l-.46.462c-.992-.54-1.408-.966-1.953-1.951l.462-.462c.119-.119.132-.317.01-.439l-.803-.803C1.37.598.883 1.715.908 2.24z"
                      />
                      <path
                        className="fill-primary"
                        d="m.909 2.24 1.24.51.462-.46c.119-.12.132-.318.01-.44l-.803-.803C1.37.598.883 1.715.908 2.24z"
                      />
                      <path
                        className="fill-primary"
                        d="M4.164 5.81c.863.275 2.148-.269 1.64-.777L5 4.23c-.122-.123-.32-.108-.439.01l-.46.462.062 1.107z"
                      />
                    </g>
                  </g>
                </svg>
                <span className="text-xs font-semibold text-gray-400 location">
                  {curBrand?.sms}
                </span>
              </div>
              <div className="mt-5">
                <span className="text-sm desc">
                  {curBrand?.linhvuc || "This brand has not left any traces"}
                </span>
              </div>
            </div>
            <div className="events">
              <div className="flex items-center justify-between">
                <Heading>Events</Heading>
              </div>
              <div className="grid-layout">
                {currentPageData.map((event) => (
                  <EventNewestSmall event={event}></EventNewestSmall>
                ))}
              </div>
              <div className="pagination">
                <ReactPaginate
                  previousLabel={"<"}
                  nextLabel={">"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(brandevents?.length / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </BrandInfoStyles>
  );
};

export default BrandInfo;