import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { voucherContext } from "../../contexts/voucherContext";
import { useNavigate } from "react-router-dom";
import VoucherStatisticTableItem from "./VoucherStatisticTableItem";

const VoucherStatisticTable = ({ filtervouchers, isAdmin = false, sortedVouchers }) => {
    const navigate = useNavigate();

    return (
        <>
        {filtervouchers.length > 0
            ? filtervouchers?.map((voucher, index) => (
                <tr>
                <td>{`0${index + 1}`}</td>
                <td>
                    <VoucherStatisticTableItem voucher={voucher}></VoucherStatisticTableItem>
                </td>
                <td>
                    <span className="text-gray-500">{voucher?.trigia}</span>
                </td>
                <td>
                    <span className="text-gray-500">{voucher?.soluongsudung}</span>
                </td>
                <td>
                    <span className="text-gray-500">{voucher?.tensukien}</span>
                </td>
                <td>
                    <span className="text-gray-500">{voucher?.ngansach}</span>
                </td>
                </tr>
            ))
            : sortedVouchers?.map((voucher, index) => (
                <tr>
                <td>{`0${index + 1}`}</td>
                <td>
                    <VoucherStatisticTableItem voucher={voucher}></VoucherStatisticTableItem>
                </td>
                <td>
                    <span className="text-gray-500">{voucher?.trigia}</span>
                </td>
                </tr>
            ))}
        </>
    );
};

export default VoucherStatisticTable;