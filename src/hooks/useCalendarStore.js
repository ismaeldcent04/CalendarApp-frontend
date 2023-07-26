import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";
import { el } from "date-fns/locale";
import calendarApi from "../api/calendarApi";
import { convertEventstoDateEvents } from "../helpers/convertEventstoDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveEvent = (calendar) => {
    dispatch(onSetActiveEvent(calendar));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend
    console.log(calendarEvent);
    // TODO:  bien
    try {
      if (calendarEvent._id) {
        //Actualizando
        await calendarApi.put(`/events/${calendarEvent._id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //Creando
      const { data } = await calendarApi.post("/events", calendarEvent);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error saving event", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent._id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventstoDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error loading events");
      console.log(error);
    }
  };

  return {
    //*Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //*Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};
