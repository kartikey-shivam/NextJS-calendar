import React, { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import AddEvent from "@/Components/AddEvent";
import moment from "moment";
import axios from "axios";
import { useState } from "react";
import ReactModal from "react-modal";
export default function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef<any>();
  const onEventAdded = (event: any) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
    console.log(calendarRef, "hello");
  };
  const handleEventAdd = async (data: any) => {
    const token = window.localStorage.getItem("token");
    console.log(token, "header");
    await axios.post(
      "http://localhost:8000/calendar/create-event",
      data.event,
      {
        headers: {
          "content-type": "text/json",
          Authorization: token,
        },
      }
    );
  };
  // const handleDatesSet = async (data: any) => {
  //   console.log(data, "data");
  //   const response = await axios.get(
  //     "http://localhost:8000/calendar/get-events?start=" +
  //       moment(data.start).toISOString() +
  //       "&end" +
  //       moment(data.end).toISOString()
  //   );
  //   setEvents(response.data);
  // };
  return (
    <div className="p-5">
      <button
        onClick={() => setModalOpen(true)}
        className="px-2 py-1 rounded:md bg-purple-500 hover:bg-purple-800 dark:bg-green-500 dark:hover:bg-green-800"
      >
        Add event
      </button>
      {modalOpen ? (
        <AddEvent
          isOpen={true}
          onClose={() => setModalOpen(false)}
          onEventAdded={(event: any) => onEventAdded(event)}
        />
      ) : (
        ""
      )}

      <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[daygridPlugin]}
        initialView="dayGridMonth"
        eventAdd={(event) => handleEventAdd(event)}
        // datesSet={(date) => handleDatesSet(date)}
      />
    </div>
  );
}
