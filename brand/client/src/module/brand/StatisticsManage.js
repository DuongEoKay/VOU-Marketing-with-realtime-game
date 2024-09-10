import React, { useContext, useState } from "react";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import VoucherStatisticTable from "../voucher/VoucherStatisticTable";
import { voucherContext } from "contexts/voucherContext";
import { eventContext } from "contexts/eventContext";
import ReactPaginate from "react-paginate";
import { monthArray } from "utils/constants";

const StatisticsManageStyles  = styled.div`
  @media screen and (max-width: 800px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 593px) {
    .search-voucher {
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
    width: 20px;
  }
`;

const itemsPerPage = 3;

function parseDate(dateString) {
  return new Date(dateString);
}

const StatisticsManage = () => {
  const {
    voucherState: { allvoucherevent},
    getAllVoucherEvent
  } = useContext(voucherContext);

  const {
    eventState: { usercount },
    userCount,
  } = useContext(eventContext);

  useState(() => getAllVoucherEvent(), []);
  useState(() => userCount(), []);

  console.log(usercount)

  const [filters, setFilters] = useState({
    soluongsudung: 0,
    month: 0,
    tensukien: "",
    thoigianketthuc: "",
    trigia: 0,
    tenvoucher: ""
  });

  const updatedEvents = allvoucherevent.map(event => {
    if (usercount.hasOwnProperty(event.id_sukien)) {
      return {
        ...event,
        userCount: usercount[event.id_sukien]
      };
    }
    else {
      return {
        ...event,
        userCount: 0
      };
    }
    
    return event;
  });

  const filteredVouchers = updatedEvents?.filter((voucher) => {
    const searchTerm = filters.searchTerm?.toLowerCase() || ""; 

    const tenvoucher = voucher.tenvoucher?.toLowerCase() || "";
    const tensukien = voucher.tensukien?.toLowerCase() || "";

    const eventendDate = new Date(voucher.thoigianketthuc);
    const eventendMonth = eventendDate.getMonth() + 1;

    const isMonthMatch =
      !filters.month || new Date(voucher.thoigianketthuc).getMonth() + 1  === filters.month;

    const isMatch = tenvoucher.includes(searchTerm) || tensukien.includes(searchTerm);

    return isMatch && isMonthMatch;
  });

  const totalNgansach = filteredVouchers?.reduce((total, voucher) => {
    return total + (voucher.ngansach || 0);
  }, 0);

  const handleDateChange = (e) => {
    setFilters({ ...filters, thoigianketthuc: e.target.value });
  };

  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value === "" ? null : parseInt(e.target.value, 10);
    setFilters((prevFilters) => ({
      ...prevFilters,
      month: selectedMonth === "" ? null : parseInt(selectedMonth, 10),
    }));
  };

  const handleSearchChange = (e) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const sortedVouchers = filteredVouchers.sort((a, b) => {
    if (filters.thoigianketthuc === "Furthest") {
      return parseDate(b.thoigianketthuc) - parseDate(a.thoigianketthuc);
    } else if (filters.thoigianketthuc === "Nearest") {
      return parseDate(a.thoigianketthuc) - parseDate(b.thoigianketthuc);
    }
    return 0;
  });
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = sortedVouchers?.slice(offset, offset + itemsPerPage);

  return (
    <StatisticsManageStyles>
      <div className="heading">
        <DashboardHeading
          title="Statistics"
          desc="See your events' figure easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="flex items-center date-filter justify-normal">
          <label className="p-4 text-black bg-gray-200 rounded-md ">
            <select
              className="bg-inherit"
              value={filters.thoigianketthuc}
              onChange={handleDateChange}
            >
              <option value="">Filter by Date</option>
              <option value="Nearest">Nearest</option>
              <option value="Furthest">Furthest</option>
            </select>
          </label>
        </div>
        <div className="flex items-center justify-center category-filter">
          <label className="p-4 text-black bg-gray-200 rounded-md">
            <select
                className="bg-inherit"
                value={filters.month || ""}
                onChange={handleMonthChange}
            >
                <option value="">{`Month`}</option>
                {monthArray.map((item) => (
                  <option key={item.id} value={item.month}>
                    {item.month}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="w-full max-w-[300px] search-voucher">
          <input
            type="text"
            className="w-full p-4 border border-gray-500 border-solid rounded-lg shadow-sm"
            placeholder="Search voucher or event..."
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Voucher</th>
            <th>Value</th>
            <th>Used</th>
            <th>Players</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {updatedEvents.length > 0 ? (
            <VoucherStatisticTable
              filtervouchers={currentPageData}
              sortedVouchers={sortedVouchers}
            ></VoucherStatisticTable>
          ) : (
            <p className="p-5 ">
              You haven't created any voucher Let we know your thoughts.
            </p>
          )}
        </tbody>
      </Table>
      <div className="mt-5 text-right">
      <h3>
        Total Budget:{" "}
        <span className="border border-green-500 p-2 rounded-lg text-gray-800 font-semibold">
          {totalNgansach}
        </span>
      </h3>
    </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredVouchers?.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </StatisticsManageStyles>
  );
};

export default StatisticsManage;
