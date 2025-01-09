import dayjs from 'dayjs'
import React from 'react'
import { FaCalendarDay } from "react-icons/fa6";


const FeedbackBox = ({ feedback }) => {
    const { title, status, description, createdAt, reply,id } = feedback
    const statusTranslate = {
        "pending": "Beklemede",
        "success": "Çözümlendi",
       
    }
    const statusColor = {
        "pending": "bg-yellow-100 text-yellow-800 ",
        "success": "bg-green-100 text-green-800 animate-pulse",
    }
    const formattedDate = dayjs(createdAt.toDate()).format('DD/MM/YYYY HH:mm')

    return (
        <div className='flex flex-col bg-white border p-3 rounded-md'>
            <div className='flex justify-between items-center w-full'>
               
                <h1 className='font-semibold text-lg'>{title}</h1>
               
                
                <span className={`px-3 py-1 rounded-md ${statusColor[status]}`}>{statusTranslate[status]}</span>
            </div>
            <div className='flex flex-col gap-y-2 mt-2'>

                <p className='text-sm'>{description}</p>
            </div>

            {
                reply &&
                <div className='bg-blue-100 p-3 rounded-md mt-2'>
                    <h1 className='text-sm font-semibold'>Yönetici Cevabı</h1>
                    <p className='text-sm'>{reply}</p>

                </div>
            }

            <div className='flex justify-between items-center mt-2'>
                <div className='flex items-center gap-x-2'>
                    <FaCalendarDay size={16} />
                    <span className='text-sm'>{formattedDate}</span>
                </div>
                <h2 className='text-xs '>Bilet No : {id}</h2>
            </div>



        </div>
    )
}

export default FeedbackBox