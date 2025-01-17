import { useEffect, useState } from 'react'

import { IoIosAddCircleOutline } from 'react-icons/io'
import { GrDatabase } from 'react-icons/gr'

import { ApprovalCard, SalesCard, PPICCard } from '../../components/cards/Card'

import { useNavigate } from 'react-router-dom'

import axios from '@axios'

function WorkPlace() {
    const [data, setData] = useState([])
    const [sales, setSales] = useState([])
    const [ppic, setPpic] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios
            .get('/status/pending')
            .then((response) => setData(response.data.pendingRecords))
            .catch((err) => console.log('Error fetching sales data:', err))

        axios
            .get('/sales')
            .then((response) => setSales(response.data))
            .catch((err) => console.log('Error fetching sales data:', err))

        axios
            .get('/ppic')
            .then((response) => setPpic(response.data))
            .catch((err) => console.log('Error fetching sales data:', err))
    }, [])

    return (
        <>
            <div className="m-2 text-xs">
                <div>System Workplace</div>

                <div className="flex space-x-2">
                    <div className="my-2">
                        <div className="w-[20vw] rounded-lg border p-2 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>New Approvals</div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="hover:opacity-60"
                                        onClick={() =>
                                            (window.location =
                                                '../dashboard/sales')
                                        }
                                    >
                                        <GrDatabase size={20} />
                                    </button>
                                </div>
                            </div>

                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <ApprovalCard key={index} data={item} />
                                ))
                            ) : (
                                <div>No Results Found</div>
                            )}
                        </div>
                    </div>

                    <div className="my-2">
                        <div className="w-[20vw] rounded-lg border p-2 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>Sales Entries</div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="hover:opacity-60"
                                        onClick={() => {
                                            navigate(`/testCreate/${'sales'}`)
                                        }}
                                    >
                                        <IoIosAddCircleOutline size={22} />
                                    </button>
                                    <button
                                        className="hover:opacity-60"
                                        onClick={() =>
                                            (window.location =
                                                '../dashboard/sales')
                                        }
                                    >
                                        <GrDatabase size={20} />
                                    </button>
                                </div>
                            </div>

                            {sales.length > 0 ? (
                                sales.map((item, index) => (
                                    <SalesCard key={index} data={item} />
                                ))
                            ) : (
                                <div>No Results Found</div>
                            )}
                        </div>
                    </div>

                    <div className="my-2">
                        <div className="w-[50vw] rounded-lg border p-2 shadow-xl">
                            <div className="flex items-center justify-between">
                                <div>PPIC Entries</div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="hover:opacity-60"
                                        onClick={() => {
                                            navigate(`/testCreate/${'ppic'}`)
                                        }}
                                    >
                                        <IoIosAddCircleOutline size={22} />
                                    </button>
                                    <button
                                        className="hover:opacity-60"
                                        onClick={() =>
                                            (window.location =
                                                '../dashboard/ppic')
                                        }
                                    >
                                        <GrDatabase size={20} />
                                    </button>
                                </div>
                            </div>

                            {ppic.length > 0 ? (
                                ppic.map((item, index) => (
                                    <PPICCard key={index} data={item} />
                                ))
                            ) : (
                                <div>No Results Found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkPlace
