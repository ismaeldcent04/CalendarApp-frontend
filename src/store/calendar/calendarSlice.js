import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del jefe",
//   notes: "Hay que comprar el pastel",
//   start: new Date(),
//   end: addHours(new Date(), 1),
//   bgColor: "#fafafa",
//   user: {
//     _id: 123,
//     name: "Ismael",
//   },
// };

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (state, action) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, action) => {
      state.events = state.events.map((event) => {
        if (event._id === action.payload._id) {
          return action.payload;
        }

        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent._id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
