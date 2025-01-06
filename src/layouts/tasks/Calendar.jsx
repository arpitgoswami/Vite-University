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
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Initialize eventsService plugin
    const eventsService = useState(() => createEventsServicePlugin())[0]

    // Fetch tasks data
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('tasks')
                console.log('API Response:', response.data) // Debug API response
                setTasks(response.data || []) // Ensure response data is an array
            } catch (err) {
                console.error('Failed to fetch tasks:', err)
                setError('Failed to fetch tasks. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    // Map tasks to events for the calendar
    const events = tasks.map((task) => {
        const event = {
            id: task?._id || 'No ID',
            title: task?.TITLE || 'Untitled Task',
            start: task?.['CREATED DATE']?.slice(0, 10) || '2025-01-10',
            end: task?.['DEADLINE DATE']?.slice(0, 10) || '2025-01-20',
        }
        console.log('Mapped Event:', event) // Debug each mapped event
        return event
    })

    console.log('Mapped Events:', events) // Debug final events array

    // Initialize the calendar
    const calendar = useCalendarApp({
        views: [createViewMonthGrid(), createViewMonthAgenda()],
        events: events,
        plugins: [eventsService],
    })

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="mx-2 my-4">
            <div className="mb-4 text-xl font-semibold">Event Calendar</div>
            {tasks.length > 0 ? (
                <ScheduleXCalendar calendarApp={calendar} />
            ) : (
                <div>No data available</div>
            )}
        </div>
    )
}

export default Calendar
