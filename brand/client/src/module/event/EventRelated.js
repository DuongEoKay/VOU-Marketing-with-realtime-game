import Heading from "components/layout/Heading";
import React from "react";
import EventItem from "./EventItem";

const EventRelated = ({ events }) => {
  return (
    <div className="event-related">
      <Heading>Related Events</Heading>
      <div className="grid-layout grid-layout--primary">
        {events.map((event) => (
          <EventItem event={event}></EventItem>
        ))}
      </div>
    </div>
  );
};

export default EventRelated;
