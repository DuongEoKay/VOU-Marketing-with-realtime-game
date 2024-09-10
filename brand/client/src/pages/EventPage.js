import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { eventContext } from "contexts/eventContext";
import EventNewestSmall from "module/event/EventNewestSmall";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { soluongvoucherArray } from "utils/constants";
import ReactPaginate from "react-paginate";

const itemsPerPage = 6;

function parseDate(dateString) {
  return new Date(dateString);
}

const EventPageStyles = styled.div`
  .small_container {
    width: 65vw;
    margin: 0 auto;
    margin-top: 2rem;
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

const EventPage = () => {
  useEffect(() => {
    document.title = "BrandManager - Event Page";
  }, []);
  const {
    eventState: { allevents },
    getAllEventsEver,
  } = useContext(eventContext);

  useState(() => getAllEventsEver(), []);

  const [filters, setFilters] = useState({
    tensukien: "",
    soluongvoucher: 0,
    brand: "",
    thoigianbatdau: "",
  });

  const searchTerm = useSelector((state) => state);
  
  const filteredEvents = allevents?.filter((event) => {
    // Filter by vouchernum
    const isNumMatch =
      !filters.soluongvoucher || event.soluongvoucher === filters.soluongvoucher;

    // Filter by title
    const isNameMatch =
      event.tensukien.toLowerCase().includes(searchTerm.toLowerCase());

    // Return true only if both date and category match
    return isNumMatch && isNameMatch;
  });

  const handleDateChange = (e) => {
    setFilters({ ...filters, thoigianbatdau: e.target.value });
  };

  const handleNumChange = (e) => {
    const selectedAmount = parseInt(e.target.value, 10);
    setFilters((prevFilters) => ({
      ...prevFilters,
      soluongvoucher: selectedAmount === "" ? null : parseInt(selectedAmount, 10),
    }));
  };

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sort the events array by date in descending order (latest to oldest)
  const sortedEvents = filteredEvents.sort((a, b) => {
    if (filters.thoigianbatdau === "Latest") {
      return parseDate(b.thoigianbatdau) - parseDate(a.thoigianbatdau);
    } else if (filters.thoigianbatdau === "Oldest") {
      return parseDate(a.thoigianbatdau) - parseDate(b.thoigianbatdau);
    }
    return 0; // No change if 'selectedOrder' is neither 'latest' nor 'oldest'
  });

  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedEvents.slice(offset, offset + itemsPerPage);

  return (
    <EventPageStyles>
      <Layout>
        <div className="small_container">
          <div className="flex justify-between mb-10 filter_bar">
            <label className="p-3 text-black bg-gray-200 rounded-md">
              <select
                className="bg-inherit"
                value={filters.thoigianbatdau}
                onChange={handleDateChange}
              >
                <option value="">Filter by Date</option>
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </label>
            <label className="p-3 text-black bg-gray-200 rounded-md ">
              <select
                className="bg-inherit"
                value={filters.soluongvoucher}
                onChange={handleNumChange}
              >
                <option value="">{`Vouchers`}</option>
                {soluongvoucherArray.map((item) => (
                  <option key={item.id} value={item.amount}>
                    {item.amount}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="events">
            <div className="flex items-center justify-between">
              <Heading>Events</Heading>
            </div>
            {sortedEvents.length > 0 ? (
              <div className="grid-layout">
                {currentPageData.length > 0
                  ? currentPageData?.map((event) => (
                      <EventNewestSmall event={event}></EventNewestSmall>
                    ))
                  : sortedEvents?.map((event) => (
                      <EventNewestSmall event={event}></EventNewestSmall>
                    ))}
              </div>
            ) : (
              <div className="text-lg text-center">
                <p>
                  Sorry! There is no event corresponding to your
                  keyword.
                </p>
              </div>
            )}
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredEvents?.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </Layout>
    </EventPageStyles>
  );
};

export default EventPage;
