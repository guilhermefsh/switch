import { useState } from 'react'

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())

    return (
        <div className=" p-4 rounded-lg shadow bg-purple-900">
            <h2 className="text-xl font-semibold mb-2">Calendar</h2>
            <p className="text-lg">{currentDate.toDateString()}</p>
        </div>
    )
}

