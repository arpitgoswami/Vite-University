import Draggable from 'react-draggable'

function AttendanceModal({ data }) {
    return (
        <>
            <Draggable grid={[10, 10]}>
                <dialog id="my_modal" className="modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="text-lg font-bold">{data.username}</h3>
                        <p className="py-4">Click the button below to close</p>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </Draggable>
        </>
    )
}

export default AttendanceModal
