import React from 'react'
import { createPortal } from 'react-dom'

const LeaderAnnouncementDetailModal = ({ setIsOpen, announcement }) => {
    const modalRoot = document.getElementById('modal-root')


    return createPortal(
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-1/3 flex flex-col gap-y-4'>
                <h1 className='text-2xl font-semibold'>{announcement.title}</h1>
                <hr className='' />
                <div className='flex flex-col gap-y-4'>
                    <p>
                        {announcement.content}
                    </p>
                </div>
                <div className='flex justify-end'>
                    <button onClick={() => setIsOpen(false)} className='bg-gray-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-gray-600'>Kapat</button>
                </div>
            </div>
        </div>
        ,
        modalRoot

    )
}

export default LeaderAnnouncementDetailModal