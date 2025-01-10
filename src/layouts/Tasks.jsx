import { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdAddCircle } from 'react-icons/io'
import { IoReloadCircle } from 'react-icons/io5'

import TaskCard from '../components/cards/TaskCard'
import Loading from '../components/Loading'

import axios from '@axios'

function Tasks() {
    const [loading, setLoading] = useState(true)
    const [tasks, setTasks] = useState([])
    const ref = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('tasks')
                setTasks(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching tasks:', error)
            }
        }
        fetchTasks()
    }, [])

    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }

    const assignedData = () => {
        const result = tasks.filter(
            (item) => item['ASSIGNED TO'].toLowerCase() == 'arpit'
        )
        setTasks(result)
    }

    const reload = () => window.location.reload()

    return (
        <>
            <div className="m-2">
                <div className="my-4 flex items-center justify-between">
                    <div className="text-xl font-semibold">Tasks Board.</div>
                    <div className="flex space-x-2">
                        <div className="btn btn-primary" onClick={assignedData}>
                            Assigned to Me
                        </div>
                        <div className="btn btn-primary" onClick={reload}>
                            All
                        </div>
                        <div
                            className="btn btn-circle btn-info"
                            onClick={() => navigate('/testCreate/tasks')}
                        >
                            <IoMdAddCircle size={30} />
                        </div>
                        <div
                            className="btn btn-circle btn-success"
                            onClick={reload}
                        >
                            <IoReloadCircle size={30} />
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div
                    ref={ref}
                    className="relative flex h-[88vh] flex-wrap items-center justify-center p-2"
                >
                    <div className="text-9xl font-bold text-base-300">
                        Tasks.
                    </div>
                    <div className="absolute grid h-full w-full grid-cols-6 gap-2">
                        {tasks.map((task, index) => (
                            <TaskCard key={index} data={task} ref={ref} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks
