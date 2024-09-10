import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { voucherContext } from "../../contexts/voucherContext";
import { useNavigate } from "react-router-dom";
import VoucherTableItem from "./VoucherTableItem";

const VoucherTable = ({ filtervouchers, isAdmin = false, sortedVouchers }) => {
  const handleDeleteVoucher = async (voucherId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#ef233c",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleted = await deleteVoucher(voucherId);
          console.log(deleted);
          if (deleted["success"]) {
            Swal.fire("Deleted!", "Your voucher has been deleted.", "success");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            Swal.fire("Error occurred");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const { deleteVoucher } = useContext(voucherContext);
  const navigate = useNavigate();
  const now = new Date();

  const renderTableRow = (voucher, index) => {
    const expirationDate = new Date(voucher?.ngayhethan);
    const isExpired = expirationDate < now;

    return (
      <tr key={voucher.id_voucher}>
        <td>{`0${index + 1}`}</td>
        <td>
          <VoucherTableItem voucher={voucher}></VoucherTableItem>
        </td>
        <td>
          <span className="text-gray-500">{voucher?.trigia}</span>
        </td>
        <td>
          <div className="flex items-center text-gray-500 gap-x-3">
            <ActionView
              onClick={() => navigate(`/voucher/${voucher?.id_voucher}`)}
            ></ActionView>
            {!isAdmin && (
              <ActionEdit
                onClick={() =>
                  navigate(`/manage/update-voucher/${voucher?.id_voucher}`)
                }
                disabled={isExpired}
              ></ActionEdit>
            )}
            <ActionDelete
              onClick={() => handleDeleteVoucher(voucher?.id_voucher)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      {filtervouchers.length > 0
        ? filtervouchers?.map((voucher, index) => renderTableRow(voucher, index))
        : sortedVouchers?.map((voucher, index) => renderTableRow(voucher, index))}
    </>
  );
};

export default VoucherTable;