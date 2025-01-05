import React from 'react'

function RejectedCard({ data }) {
    console.log(data)
    return (
        <>
            <div>
                <div>{data[0].name}</div>
            </div>
        </>
    )
}

export default RejectedCard
