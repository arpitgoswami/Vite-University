import React, { useState } from 'react'

function EventCalendar() {
    const [events, setEvents] = useState({})
    const [selectedDate, setSelectedDate] = useState('')
    const [eventText, setEventText] = useState('')

    const days = Array.from({ length: 31 }, (_, i) => i + 1)

    const addEvent = () => {
        if (!selectedDate || !eventText) return
        setEvents({ ...events, [selectedDate]: eventText })
        setEventText('')
    }

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Event Calendar</h1>
            <div className="grid grid-cols-7 gap-4 border p-4">
                {days.map((day) => (
                    <div
                        key={day}
                        className={`cursor-pointer border p-4 ${
                            selectedDate === day.toString()
                                ? 'bg-blue-200'
                                : 'bg-gray-100'
                        }`}
                        onClick={() => setSelectedDate(day.toString())}
                    >
                        <div>{day}</div>
                        <div className="text-sm text-gray-500">
                            {events[day] || 'No Events'}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold">Add Event</h2>
                <input
                    type="text"
                    placeholder="Enter event"
                    value={eventText}
                    onChange={(e) => setEventText(e.target.value)}
                    className="mr-2 border p-2"
                />
                <button
                    onClick={addEvent}
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                    Add Event
                </button>
            </div>
        </div>
    )
}

export default EventCalendar
