export const eventReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "EVENTS_LOADED_SUCCESS":
        return {
          ...state,
          events: payload,
          eventsLoading: false,
        };
        case "EVENTS_LOADED_SUCCESS_BRAND":
        return {
          ...state,
          brandevents: payload,
          eventsLoading: false,
        };
      case "ALL":
        return {
          ...state,
          allevents: payload,
          eventsLoading: false,
        };
      case "DETAIL_EVENT":
        return {
          ...state,
          detailedevent: payload,
          eventsLoading: false,
        };
      case "LARGEST_EVENT":
        return {
          ...state,
          lastevent: payload,
          eventsLoading: false,
        };
      case "NEWEST_EVENT":
        return {
          ...state,
          smalllastevents: payload,
          eventsLoading: false,
        };
      case "GAME":
        return {
          ...state,
          games: payload,
          eventsLoading: false,
        };
      case "USERCOUNT":
        return {
          ...state,
          usercount: payload,
          eventsLoading: false,
        };
      default:
        return state;
    }
  };