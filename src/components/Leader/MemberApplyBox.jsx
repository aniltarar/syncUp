import dayjs from 'dayjs'
import React from 'react'
import { useDispatch } from 'react-redux'
import { rejectMemberApply, successMemberApply } from '../../redux/slices/leaderSlice'

const MemberApplyBox = ({ memberApply }) => {

    const formattedDate = dayjs(memberApply.date).format('DD/MM/YYYY HH:mm')
    const dispatch = useDispatch()

    const statusTranslate = {
        success: 'Tamamlandı',
        failed: 'Reddedildi',
        pending: 'Beklemede',
    };

    const statusColor = {
        success: 'text-green-500 bg-green-100',
        failed: 'text-red-500 bg-red-100',
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
           

            <div className='grid grid-cols-5 gap-3 items-center bg-neutral-100 p-3 rounded-lg shadow'>
                <div className='justify-self-start'>{memberApply.displayName}</div>
                <div className='justify-self-start'>{memberApply.clubName}</div>
                <div className='justify-self-start'>{formattedDate}</div>
                <div className={`justify-self-start text-sm px-4 py-1 rounded-full font-medium text-center w-32 ${statusColor[memberApply.status]}`}>{statusTranslate[memberApply.status]}</div>
                <div className='justify-self-center flex gap-x-3'>
                    <button onClick={() => handleSuccessApply(memberApply)} className=' px-4 py-2 rounded-full font-medium bg-yellow-500 text-white hover:bg-yellow-600' >Onayla</button>
                    <button onClick={() => handleRejectApply(memberApply)} className=' px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600' >Reddet</button>
                </div>
            </div>
        </div>
    )
}

export default MemberApplyBox