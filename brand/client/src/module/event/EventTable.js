import { ActionDelete, ActionEdit, ActionView } from "components/action";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { eventContext } from "../../contexts/eventContext";
import { voucherContext } from "contexts/voucherContext";
import { useNavigate } from "react-router-dom";
import EventTableItem from "./EventTableItem";

const EventTable = ({ filterevents, brands, isAdmin = false, sortedEvents }) => {
    const handleDeleteEvent = async (eventId) => {
        Swal.fire({
        title: "Are you sure?",
        text: "If you delete event, all of its vouchers will be deleted too",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1DC071",
        cancelButtonColor: "#ef233c",
        confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const questiondeleted = await deleteQuestionEvent(eventId)
                const voucherdeleted = await deleteVoucherEvent(eventId)
                if(questiondeleted["success"] && voucherdeleted["success"]){
                    const deleted = await deleteEvent(eventId);
                    if (deleted["success"]) {
                        Swal.fire("Deleted!", "Your event has been deleted.", "success");
                        setTimeout(function () {
                        window.location.reload();
                        }, 2000);
                    } 
                    else {
                        Swal.fire("Error occured");
                    }
                }
            } catch (error) {
                console.log(error);
                }    
        }
        });
    };
    const { deleteEvent, deleteQuestionEvent } = useContext(eventContext);
    const { deleteVoucherEvent } = useContext(voucherContext)

    const navigate = useNavigate();

    const getBrand = (id) => {
        if (!brands || !Array.isArray(brands)) {
            return "Unknown Brand";
        }
        const brand = brands.filter((u) => {
            return u?.id_thuonghieu === id;
        });
        return brand[0]?.ten || "Unknown Brand";
    };

    return (
        <>
        {filterevents.length > 0
            ? filterevents?.map((event, index) => (
                <tr>
                <td>{`0${index + 1}`}</td>
                <td>
                    <EventTableItem event={event}></EventTableItem>
                </td>
                <td>
                    <span className="text-gray-500">{event?.soluongvoucher}</span>
                </td>
                <td>
                    <span className="text-gray-500">
                        {getBrand(event?.id_thuonghieu) || event?.id_thuonghieu}
                    </span>
                </td>
                <td>
                    <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                        onClick={() => navigate(`/event/${event?.id_sukien}`)}
                    ></ActionView>
                    {!isAdmin && (
                        <ActionEdit
                        onClick={() =>
                            navigate(`/manage/update-event/${event?.id_sukien}`)
                        }
                        ></ActionEdit>
                    )}
                    <ActionDelete
                        onClick={() => handleDeleteEvent(event?.id_sukien)}
                    ></ActionDelete>
                    </div>
                </td>
                </tr>
            ))
            : sortedEvents?.map((event, index) => (
                <tr>
                <td>{`0${index + 1}`}</td>
                <td>
                    <EventTableItem event={event}></EventTableItem>
                </td>
                <td>
                    <span className="text-gray-500">{event?.soluongvoucher}</span>
                </td>
                <td>
                    <span className="text-gray-500">
                    {getBrand(event?.brand?.id_thuonghieu) || event?.brand?.tensukien}
                    </span>
                </td>
                <td>
                    <div className="flex items-center text-gray-500 gap-x-3">
                    <ActionView
                        onClick={() => navigate(`/event/${event?.id_thuonghieu}`)}
                    ></ActionView>
                    {!isAdmin && (
                        <ActionEdit
                        onClick={() =>
                            navigate(`/manage/update-event/${event?._id}`)
                        }
                        ></ActionEdit>
                    )}
                    <ActionDelete
                        onClick={() => handleDeleteEvent(event?._id)}
                    ></ActionDelete>
                    </div>
                </td>
                </tr>
            ))}
        </>
    );
};

export default EventTable;
