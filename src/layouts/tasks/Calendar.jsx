import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewWeek,
    createViewMonthGrid,
    createViewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import axios from '@axios'

function Calendar() {
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [tasks, setTasks] = useState([])
    const [mappedEvents, setMappedEvents] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('tasks')
                setTasks(response.data)
            } catch (error) {
                console.error('Error fetching tasks:', error)
            }
        }

        fetchTasks()
    }, [])

    // Map tasks to events after tasks are fetched
    useEffect(() => {
        if (tasks.length > 0) {
            const events = tasks.map((task) => ({
                id: task._id, // Assuming each task has a unique ID
                title: task.TITLE, // Assuming task has a TITLE field
                start: '2025-01-1', // Assuming task has a "CREATED DATE" field
                end: '2025-01-10', // Assuming task has a "DEADLINE DATE" field
            }))
            setMappedEvents(events)
        }
    }, [tasks])

    const calendar = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: mappedEvents, // Use mapped events
        plugins: [eventsService],
    })

    useEffect(() => {
        if (mappedEvents.length > 0) {
            eventsService.getAll() // Only call getAll when mapped events are available
        }
    }, [mappedEvents, eventsService])

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    )
}

export default Calendar
