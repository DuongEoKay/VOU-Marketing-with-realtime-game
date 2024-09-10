import React from "react";
import styled from "styled-components";
import EventVoucherNum from "./EventVoucherNum";
import EventImage from "./EventImage";
import EventMeta from "./EventMeta";
import EventTitle from "./EventTitle";
import { useNavigate } from "react-router-dom";

const EventNewestSmallStyles = styled.div`
  .event {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 250px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const EventNewestSmall = ({ event }) => {
  const truncatedTitle = truncateTitle(event.tensukien, 60);
  const navigate = useNavigate();
  return (
    <EventNewestSmallStyles className="shadow-xl cursor-pointer rounded-2xl">
      <EventImage
        url={`${
          event?.hinhanh ||
          `https://images.unsplash.com/photo-1678047471351-84a24c661587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
        }`}
        alt=""
        to={`/event/${event.id_sukien}`}
      ></EventImage>
      <div className="p-3 bot">
        <EventVoucherNum>{event?.soluongvoucher}</EventVoucherNum>
        <EventTitle
          size="medium"
          className="event-title"
          to={`/event/${event.id_sukien}`}
        >
          {truncatedTitle}
        </EventTitle>
        <EventMeta
          color="gray"
          brandName={event.brand_name}
          brandId={event.id_thuonghieu}
          startdate={event?.thoigianbatdau}
          enddate={event?.thoigianketthuc}
        ></EventMeta>
      </div>
    </EventNewestSmallStyles>
  );
};

export default EventNewestSmall;