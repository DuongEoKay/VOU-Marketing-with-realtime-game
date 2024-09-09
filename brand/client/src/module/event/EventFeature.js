import React from "react";
import EventFeatureItem from "./EventFeatureItem";

function getRandomElementsFromArray(arr, numElements) {
  const shuffledArray = arr.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numElements);
}

const EventFeature = ({ events }) => {
  const numRandomEvents = 3;
  const randomEvents = getRandomElementsFromArray(events, numRandomEvents);

  return (
    <>
      {randomEvents.map((event) => (
        <EventFeatureItem event={event}></EventFeatureItem>
      ))}
    </>
  );
};

export default EventFeature;