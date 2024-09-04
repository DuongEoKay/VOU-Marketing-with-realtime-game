import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const EventMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: calc(0.5em + 0.5vw);
  font-weight: 600;
  ${(props) =>
    props.color === "gray" &&
    css`
      color: ${(props) => props.theme.gray6B};
    `};
  ${(props) =>
    props.gray === "inherit" &&
    css`
      color: inherit;
    `};
  .event {
    &-dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const EventMeta = ({
  startdate = "",
  enddate = "",
  brandName,
  className = "",
  color = "gray",
  brandId = "",
  event = {},
}) => {
  const [brand, setBrand] = useState();
  const navigate = useNavigate();

  const format = (date) => {
    const year = date.slice(0, 4)
    const month = date.slice(5,7) - 1
    const day = date.slice(8,10)
    const hour = date.slice(11,13)
    const minute = date.slice(14,16)
    const second = date.slice(17,19)
    const formatDate = new Date(year, month, day, hour, minute, second).toLocaleString()
    return formatDate
  }
  const startDate = format(startdate)
  const endDate = format(enddate)
  return (
    <EventMetaStyles className={className} color={color}>
      <span className="event-time">Start Date: {startDate}</span>
      <span className="event-dot"></span>
      <span className="event-time">End Date: {endDate}</span>
      <span className="event-dot"></span>
      <span
        className="event-author"
        onClick={() => {
          navigate(`/brand/${brandId}`);
          window.location.reload();
        }}
      >
        {brandName || brand?.ten}
      </span>
    </EventMetaStyles>
  );
};

export default EventMeta;
