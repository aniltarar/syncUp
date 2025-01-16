import dayjs from 'dayjs'
import React from 'react'
import { useDispatch } from 'react-redux'
import { rejectMemberApply, successMemberApply } from '../../redux/slices/leaderSlice'

const MemberApplyBox = ({ memberApply }) => {


    const formattedDate = dayjs(new Date(memberApply.createdAt.seconds * 1000 + memberApply.createdAt.nanoseconds / 1e6)).format('DD/MM/YYYY HH:mm');
    const dispatch = useDispatch()

    const statusTranslate = {
        success: 'Tamamlandı',
        rejected: 'Reddedildi',
        pending: 'Beklemede',
    };

    const statusColor = {
        success: 'text-green-500 bg-green-100',
        rejected: 'text-red-500 bg-red-100',
        pending: 'text-yellow-500 bg-yellow-100',
    };

    const handleSuccessApply = (memberApply) => {
        dispatch(successMemberApply(memberApply))
    }

    const handleRejectApply = (memberApply) => {
        dispatch(rejectMemberApply(memberApply))
    }


    return (
        <div>
           

            <div className='grid grid-cols-5 gap-3 items-center bg-white p-3 rounded-lg shadow border hover:shadow-md transition-shadow duration-300'>
                <div className='justify-self-start'>{memberApply.displayName.toUpperCase()}</div>
                <div className='justify-self-start'>{memberApply.clubName}</div>
                <div className='justify-self-start'>{formattedDate}</div>
                <div className={`justify-self-start text-sm px-4 py-1 rounded-full font-medium text-center w-32 ${statusColor[memberApply.status]}`}>{statusTranslate[memberApply.status]}</div>
                <div className='justify-self-center flex gap-x-3'>
                    <button onClick={() => handleSuccessApply(memberApply)} className=' px-4 py-2 rounded-full font-medium bg-primary text-white hover:bg-primary-hover' >Onayla</button>
                    <button onClick={() => handleRejectApply(memberApply)} className=' px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600' >Reddet</button>
                </div>
            </div>
        </div>
    )
}

export default MemberApplyBox