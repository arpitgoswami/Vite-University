import React, { forwardRef } from 'react'
import Draggable from 'react-draggable'

import { TiDelete } from 'react-icons/ti'
import { MdEditSquare } from 'react-icons/md'
import { HandleDelete } from '../../utils/HandleDelete'

import { useNavigate } from 'react-router-dom'

function TaskCard({ data }) {
    const navigate = useNavigate()
    return (
        <>
            <Draggable grid={[10, 10]}>
                <div className="relative h-max space-y-4 rounded-2xl bg-neutral p-4 pb-12 text-xs text-base-100 hover:cursor-move">
                    <div className="flex justify-between">
                        <div>{data.TITLE}</div>
                        <div className="flex space-x-1">
                            <div
                                className="btn btn-circle btn-warning btn-xs"
                                onClick={() =>
                                    navigate(
                                        `/testUpdate/${data._id}?doc=${'tasks'}`
                                    )
                                }
                            >
                                <MdEditSquare size={16} />
                            </div>
                            <div
                                className="btn btn-circle btn-error btn-xs"
                                onClick={() =>
                                    HandleDelete(data._id, 'tasks', true)
                                }
                            >
                                <TiDelete size={23} />
                            </div>
                        </div>
                    </div>
                    <div>{data.DESCRIPTION}</div>
                    <div className="flex justify-between">
                        <div> {data['DEADLINE DATE'].slice(0, 10)}</div>
                        <div className="rounded-2xl bg-primary px-2">
                            {data['ASSIGNED TO'].slice(0, 10)}
                        </div>
                    </div>
                    <div
                        className={`absolute bottom-0 left-0 w-full overflow-auto rounded-b-2xl px-4 py-2 ${
                            data.STATUS === 'Completed'
                                ? 'bg-green-500'
                                : data.STATUS === 'In Progress'
                                  ? 'bg-yellow-500'
                                  : data.STATUS === 'Deadline Crossed'
                                    ? 'bg-red-500'
                                    : 'bg-gray-500'
                        }`}
                    >
                        {data.STATUS}
                    </div>
                </div>
            </Draggable>
        </>
    )
}

export default TaskCard
