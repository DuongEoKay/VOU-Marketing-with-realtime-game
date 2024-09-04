import React from "react";
import styled from "styled-components";
import EventVoucherNum from "./EventVoucherNum";
import EventImage from "./EventImage";
import EventMeta from "./EventMeta";
import EventTitle from "./EventTitle";
import { useNavigate } from "react-router-dom";

const EventItemStyles = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  .event {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: inherit;
    }
    &-vouchernum {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .event {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
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

const EventItem = ({ event }) => {
  const truncatedTitle = truncateTitle(event.tensukien, 60);
  const navigate = useNavigate();
  return (
    <EventItemStyles className="cursor-pointer">
      <EventImage
        url={event?.hinhanh}
        alt="EventImage"
        to={`/event/${event.id_sukien}`}
      ></EventImage>
      <EventVoucherNum type="secondary">Vouchers: {event?.soluongvoucher}</EventVoucherNum>
      <EventTitle to={`/event/${event.id_sukien}`}>{truncatedTitle}</EventTitle>
      <EventMeta
        brandName={event?.brand_name}
        brandId={event?.id_thuonghieu}
        date={event?.ngaybatdau}
      ></EventMeta>
    </EventItemStyles>
  );
};

export default EventItem;
