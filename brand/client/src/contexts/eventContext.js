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
      brandevents: [],
      allevents: [],
      eventsLoading: true,
      games: [],
    });
  
    // get all events
    const getAllEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/brand/api/event");
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
        const response = await axios.get(
          `http://localhost:8080/brand/api/event/detailevent/${EventId}`
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
            `http://localhost:8080/brand/api/event/${eventId}`
        );
        if (response.data.success) {
            dispatch({ type: "DELETE_EVENT", payload: eventId });
            return response.data;
        }
        } catch (error) {
          console.log(error);
        }
    };

    // delete questionevent
    const deleteQuestionEvent = async (eventId) => {
      try {
      const response = await axios.delete(
        `http://localhost:8080/brand/api/event/deleteallquestionoffevent/${eventId}`
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
        const response = await axios.post("http://localhost:8080/brand/api/event/create", Event);
        console.log("add",response.data)
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

    // update event
    const updateEvent = async (id, Event) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/brand/api/event/${id}`, Event
        );
        return response.data;
      } catch (error) {
        if (error.response.data) {
          return error.response.data;
        } else return { success: false, message: error.message };
      }
    }

    // get all eventofbrand
    const getAllEventsOfBrand = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/brand/api/event/eventofbrand/${id}`);
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
  
    const getAllEventsEver = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/brand/api/event/allevent`);
        if (response.data.success) {
          dispatch({
            type: "ALL",
            payload: response.data.events,
          });
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }
    };

    const getGameName = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/games/`);
        if (response.data) {
          dispatch({
            type: "GAME",
            payload: response.data,
          });
          return response.data;
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
        }
    }

    // event context data
    const eventContextData = {
      eventState,
      getAllEvents,
      getDetailedEvent,
      deleteEvent,
      addEvent,
      updateEvent,
      getAllEventsOfBrand,
      getAllEventsEver,
      deleteQuestionEvent,
      getGameName,
    };
  
    return (
      <eventContext.Provider value={eventContextData}>
        {children}
      </eventContext.Provider>
    );
  };
  
  export default EventContextProvider;
  