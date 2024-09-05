import React, { useContext, useState } from "react";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import EventTable from "./EventTable";
import { soluongvoucherArray } from "utils/constants";
import { eventContext } from "contexts/eventContext";
import ReactPaginate from "react-paginate";
import { authContext } from "contexts/authContext";

const EventManageStyles = styled.div`
  @media screen and (max-width: 800px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 593px) {
    .search-event {
      display: none;
    }
    .heading {
      margin-bottom: 3.5em;
    }
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

  .label {
      isplay: inline-block;
  }

  .gap {
    display: inline-block;
    width: 32px;
  }
`;

const itemsPerPage = 3;

function parseDate(dateString) {
  return new Date(dateString);
}

const EventManage = () => {
  const {
    eventState: { events },
    getAllEvents,
  } = useContext(eventContext);

  useState(() => getAllEvents(), []);

  const {
    authState: { allbrand },
    allBrand,
  } = useContext(authContext);
  useState(() => allBrand(), []);

  const [filters, setFilters] = useState({
    tensukien: "",
    soluongvoucher: 0,
    brand: "",
    thoigianbatdau: "",
  });

  const filteredEvents = events?.filter((event) => {
    // Filter by vouchernum
    const isNumMatch =
      !filters.soluongvoucher || event.soluongvoucher === filters.soluongvoucher;

    // Filter by title
    const isNameMatch =
      !filters.tensukien ||
      event.tensukien.toLowerCase().includes(filters.tensukien.toLowerCase());

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

  const handleNameChange = (e) => {
    setFilters({ ...filters, tensukien: e.target.value });
  };

  const sortedEvents = filteredEvents.sort((a, b) => {
    if (filters.thoigianbatdau === "Latest") {
      return parseDate(b.thoigianbatdau) - parseDate(a.thoigianbatdau);
    } else if (filters.thoigianbatdau === "Oldest") {
      return parseDate(a.thoigianbatdau) - parseDate(b.thoigianbatdau);
    }
    return 0;
  });
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedEvents?.slice(offset, offset + itemsPerPage);

  return (
    <EventManageStyles>
      <div className="heading">
        <DashboardHeading
          title="All events"
          desc="Manage all your events easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="flex items-center date-filter justify-normal">
          <label className="p-4 text-black bg-gray-200 rounded-md ">
            <select
              className="bg-inherit"
              value={filters.thoigianbatdau}
              onChange={handleDateChange}
            >
              <option value="">Filter by Date Started</option>
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-center category-filter">
          <label className="p-4 text-black bg-gray-200 rounded-md">
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
        <div className="w-full max-w-[300px] search-event">
          <input
            type="text"
            className="w-full p-4 border border-gray-500 border-solid rounded-lg shadow-sm"
            placeholder="Search event..."
            onChange={handleNameChange}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
                <span class="label">Image</span>
                <span class="gap"></span>
                <span class="label">Name</span>
            </th>
            <th>VoucherNum</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            <EventTable
              filterevents={currentPageData}
              brands={allbrand}
              sortedEvents={sortedEvents}
            ></EventTable>
          ) : (
            <p className="p-5 ">
              You haven't published anything! Let we know your thoughts.
            </p>
          )}
        </tbody>
      </Table>
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
    </EventManageStyles>
  );
};

export default EventManage;
