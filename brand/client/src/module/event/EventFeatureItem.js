import React from "react";
import EventVoucherNum from "./EventVoucherNum";
import EventImage from "./EventImage";
import EventMeta from "./EventMeta";
import EventTitle from "./EventTitle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const EventFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  height: 269px;
  .event {
    &-image {
      display: block;
      width: 100%;
      height: 269px;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const EventFeatureItem = ({ event }) => {
  const truncatedTitle = truncateTitle(event?.tensukien, 60);
  const navigate = useNavigate();

  return (
    <EventFeatureItemStyles>
      <EventImage
        url={event?.hinhanh}
        alt="unsplash"
        to={`/event/${event?.id_sukien}`}
      ></EventImage>
      <div className="event-overlay"></div>
      <div className="event-content">
        <div className="event-top">
          <EventVoucherNum>{event?.soluongvoucher}</EventVoucherNum>
          <EventMeta
            color="inherit"
            brandName={event?.brand_name}
            brandId={event?.id_thuonghieu}
            startdate={event?.thoigianbatdau}
            enddate={event?.thoigianketthuc}
          ></EventMeta>
        </div>
        <EventTitle size="large" to={`/event/${event?.id_sukien}`}>
          {truncatedTitle}
        </EventTitle>
      </div>
    </EventFeatureItemStyles>
  );
};

export default EventFeatureItem;