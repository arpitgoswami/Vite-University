import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { useEffect, useState } from 'react'
import {
    createViewMonthAgenda,
    createViewMonthGrid,
} from '@schedule-x/calendar'

import '@schedule-x/theme-default/dist/index.css'

import axios from '@axios'

function Calendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios
            .get('tasks')
            .then((response) => {
                setTasks(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const events = tasks.map((task) => ({
        id: task._id,
        title: task.TITLE,
        start: task['CREATED DATE']?.slice(0, 10) || '2025-01-10',
        end: task['DEADLINE DATE']?.slice(0, 10) || '2025-01-20',
    }))

    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [eventsService],
    })

    useEffect(() => {
        eventsService.getAll()
    }, [eventsService])

    return (
        <div className="mx-2 my-4">
            <div className="mb-4 text-xl font-semibold">Event Calendar.</div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default Calendar
