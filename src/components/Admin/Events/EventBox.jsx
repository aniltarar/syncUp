import dayjs from 'dayjs'
import React from 'react'

const EventBox = ({ event }) => {
    const { eventName, eventDate, eventLocation, status, clubName } = event

    const statusTranslate = {
        pending: 'Planlanıyor',
        finished: 'Tamamlandı',
        failed: 'İptal Edildi'
    }

    const statusColor = {
        pending: 'text-yellow-500 bg-yellow-100 ',
        finished: 'text-green-500 bg-green-100',
        failed: 'text-red-500 bg-red-100'
    }

    return (
        <div className='grid grid-cols-5 p-3 border rounded-lg shadow-sm bg-white items-center'>
            <span>{eventName}</span>
            <span className='justify-self-center'>{dayjs(eventDate).format("DD/MM/YYYY HH:mm")}</span>
            <span className='justify-self-center'>{eventLocation}</span>
            <span className={` ${statusColor[status]} w-32 text-center rounded-lg p-1 font-semibold justify-self-center`}>{statusTranslate[status]}</span>
            <span className='justify-self-center'>{clubName}</span>
        </div>
    )
}

export default EventBox