import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const EventImageStyles = styled.div`
  img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }
`;

const EventImage = ({ className = "", url = "", alt = "", to = null }) => {
  if (to)
    return (
      <NavLink to={to} style={{ display: "block" }}>
        <EventImageStyles className={`event-image ${className}`}>
          <img src={url} alt={alt} loading="lazy" />
        </EventImageStyles>
      </NavLink>
    );
  return (
    <EventImageStyles className={`event-image ${className}`}>
      <img src={url} alt={alt} loading="lazy" />
    </EventImageStyles>
  );
};

export default EventImage;