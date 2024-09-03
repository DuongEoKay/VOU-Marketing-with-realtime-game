import React from "react";

const truncatetensukien = (tensukien, maxLength) => {
  if (tensukien.length <= maxLength) {
    return tensukien;
  } else {
    return tensukien.slice(0, maxLength) + "...";
  }
};

const EventTableItem = ({ event }) => {
  const truncatedtensukien = truncatetensukien(event.tensukien, 60);
  return (
    <div className="flex items-center gap-x-3">
      <img
        src={event.hinhanh ? event.hinhanh : require("../../assets/logo.png")}
        alt=""
        className="w-[66px] h-[55px] rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-semibold">{truncatedtensukien}</h3>
        <time className="text-sm text-gray-500">{event?.thoigianbatdau}</time>
      </div>
    </div>
  );
};

export default EventTableItem;
