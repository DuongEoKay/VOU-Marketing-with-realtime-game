import { createContext, useReducer } from "react";
import { eventReducer } from "../reducers/eventReducer";
import axios from "axios";

export const eventContext = createContext();

const EventContextProvider = ({ children }) => {
    // state
    const [eventState, dispatch] = useReducer(eventReducer, {
      event: {},
      events: [],
      detailedevent: [],
      eventsLoading: true,
    });
  
    // get all events
    const getAllEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/event");
        if (response.data.success) {
          dispatch({
            type: "EVENTS_LOADED_SUCCESS",
            payload: response.data.events,
          });
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    // getDetailedEvent
    const getDetailedEvent = async (EventId) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/event/detailevent",
          EventId
        );
        if (response.data.success) {
          dispatch({
            type: "DETAIL_EVENT",
            payload: response.data.events,
          });
          return response.data;
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    // delete event
    const deleteEvent = async (eventId) => {
        try {
        const response = await axios.delete(
            `http://localhost:5000/api/event/${eventId}`
        );
        if (response.data.success) {
            dispatch({ type: "DELETE_EVENT", payload: eventId });
            return response.data;
        }
        } catch (error) {
        console.log(error);
        }
    };

    // add event
    const addEvent = async (Event) => {
      try {
        const response = await axios.post("http://localhost:5000/api/event/create", Event);
        if (response.data.success) {
          dispatch({ type: "ADD_EVENT", payload: response.data.event });
          return response.data;
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    // get all eventofbrand
    const getAllEventsOfBrand = async (id) => {
      try {
        const response = await axios.post("http://localhost:5000/api/event/eventofbrand", id);
        if (response.data.success) {
          dispatch({
            type: "EVENTS_LOADED_SUCCESS_BRAND",
            payload: response.data.events,
          });
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };
  
    // event context data
    const eventContextData = {
      eventState,
      getAllEvents,
      getDetailedEvent,
      deleteEvent,
      addEvent,
      getAllEventsOfBrand,
    };
  
    return (
      <eventContext.Provider value={eventContextData}>
        {children}
      </eventContext.Provider>
    );
  };
  
  export default EventContextProvider;
  