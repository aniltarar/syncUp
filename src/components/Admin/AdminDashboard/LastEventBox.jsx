import dayjs from 'dayjs'
import React from 'react'

const LastEventBox = ({ event }) => {
    const statusTranslate = {
        pending: "Planlanıyor",
        finished: "Tamamlandı",
        failed: "İptal Edildi"
    }
    return (
        <div className='grid grid-cols-3  bg-white p-5 rounded-lg shadow-md'>

            <span className='col-span-1 justify-self-start'>{event.eventName}</span>
            <span className='text-sm text-center col-span-1 justify-self-center'>{dayjs(event.eventDate).format("DD/MM/YYYY HH:mm")}</span>
            <span className='col-span-1 justify-self-end'>{statusTranslate[event.status]}</span>

        </div>
    )
}

export default LastEventBox