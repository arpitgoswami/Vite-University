import React from "react";

const Assignments = () => {
  // Sample timetable data
  const timetableData = [
    {
      day: "Monday",
      time: "9:00 AM - 11:00 AM",
      subject: "Mathematics",
      room: "Room 101",
    },
    {
      day: "Tuesday",
      time: "11:30 AM - 1:30 PM",
      subject: "Physics",
      room: "Room 102",
    },
    // Add more timetable entries as needed
  ];

  // Sample academic calendar data
  const academicCalendarData = [
    {
      date: "2023-10-16",
      event: "Midterm Exams",
    },
    {
      date: "2023-11-05",
      event: "Parent-Teacher Meeting",
    },
    // Add more academic calendar events as needed
  ];

  return (
    <div className="container mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6">
        Class Timetable and Academic Calendar
      </h1>

      {/* Timetable */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Timetable</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Day</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Subject</th>
              <th className="border border-gray-300 p-2">Room</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.map((entry, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{entry.day}</td>
                <td className="border border-gray-300 p-2">{entry.time}</td>
                <td className="border border-gray-300 p-2">{entry.subject}</td>
                <td className="border border-gray-300 p-2">{entry.room}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Academic Calendar */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Academic Calendar</h2>
        <ul>
          {academicCalendarData.map((event, index) => (
            <li key={index} className="mb-2">
              <span className="font-semibold">{event.date}:</span> {event.event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Assignments;
