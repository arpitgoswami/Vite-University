import React from 'react'

function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex space-x-4">
                <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
                <div className="animation-delay-200 h-4 w-4 animate-bounce rounded-full bg-primary"></div>
                <div className="animation-delay-400 h-4 w-4 animate-bounce rounded-full bg-primary"></div>
            </div>
        </div>
    )
}

export default Loading
