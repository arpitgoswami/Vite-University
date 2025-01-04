import React, { useState, useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";

function TestRoute() {
  // Initialize the events service plugin
  const [eventsService] = useState(() => createEventsServicePlugin());

  // Define the calendar configuration
  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    events: [
      {
        id: "1",
        title: "Event 1",
        start: "2025-01-16",
        end: "2025-02-16",
      },
    ],
    plugins: [eventsService],
  });

  useEffect(() => {
    // Fetch all events when the component mounts
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className="calendar-container">
      {/* Render the calendar component */}
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default TestRoute;
