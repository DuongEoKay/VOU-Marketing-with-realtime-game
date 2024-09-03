import React, { useContext, useState } from "react";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import VoucherTable from "../voucher/VoucherTable";
import { voucherContext } from "contexts/voucherContext";
import ReactPaginate from "react-paginate";

const VoucherManageStyles = styled.div`
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

const VoucherManage = () => {
  const {
    voucherState: { vouchers },
    getAllVouchers,
  } = useContext(voucherContext);

  useState(() => getAllVouchers(), []);

  const [filters, setFilters] = useState({
    ten: "",
    ngayhethan: ""
  });

  const filteredVouchers = vouchers?.filter((voucher) => {
    // Filter by title
    const isNameMatch =
      !filters.ten ||
      voucher.ten.toLowerCase().includes(filters.ten.toLowerCase());

    return isNameMatch;
  });

  const handleDateChange = (e) => {
    setFilters({ ...filters, ngayhethan: e.target.value });
  };

  const handleNameChange = (e) => {
    setFilters({ ...filters, ten: e.target.value });
  };

  const sortedVouchers = filteredVouchers.sort((a, b) => {
    if (filters.ngayhethan === "Furthest") {
      return parseDate(b.ngayhethan) - parseDate(a.ngayhethan);
    } else if (filters.ngayhethan === "Nearest") {
      return parseDate(a.ngayhethan) - parseDate(b.ngayhethan);
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
    <VoucherManageStyles>
      <div className="heading">
        <DashboardHeading
          title="All vouchers"
          desc="Manage all your vouchers easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="flex items-center date-filter justify-normal">
          <label className="p-4 text-black bg-gray-200 rounded-md ">
            <select
              className="bg-inherit"
              value={filters.ngayhethan}
              onChange={handleDateChange}
            >
              <option value="">Filter by Date Expired</option>
              <option value="Nearest">Nearest</option>
              <option value="Furthest">Furthest</option>
            </select>
          </label>
        </div>
        <div className="w-full max-w-[300px] search-voucher">
          <input
            type="text"
            className="w-full p-4 border border-gray-500 border-solid rounded-lg shadow-sm"
            placeholder="Search voucher..."
            onChange={handleNameChange}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>
                <span class="label">QRCode</span>
                <span class="gap"></span>
                <span class="label">Image</span>
                <span class="gap"></span>
                <span class="label">Name</span>
            </th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            <VoucherTable
              filtervouchers={currentPageData}
              sortedVouchers={sortedVouchers}
            ></VoucherTable>
          ) : (
            <p className="p-5 ">
              You haven't created any voucher Let we know your thoughts.
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
          pageCount={Math.ceil(filteredVouchers?.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </VoucherManageStyles>
  );
};

export default VoucherManage;
