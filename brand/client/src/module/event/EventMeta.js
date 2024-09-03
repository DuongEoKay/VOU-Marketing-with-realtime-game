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
  date = "",
  brandName,
  className = "",
  color = "gray",
  brandId = "",
  event = {},
}) => {
  const [brand, setBrand] = useState();
  const navigate = useNavigate();

  const date1 = event?.createdAt?.seconds
    ? new Date(event?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date1).toLocaleDateString("vi-VI");
  return (
    <EventMetaStyles className={className} color={color}>
      <span className="event-time">{date || formatDate}</span>
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
