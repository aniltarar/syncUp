import React from 'react'
import { useNavigate } from 'react-router-dom'

const LeaderAnnouncementClubBox = ({ club }) => {

    const navigate = useNavigate()

    return (
        <div className='flex justify-between w-full border shadow rounded-lg p-3 gap-x-3'>
            <div className='flex items-center gap-x-3 justify-between'>
                <img src={club?.clubLogo} alt="" className='w-40 h-40 rounded-full object-cover ' />
            </div>
            <div className='flex flex-col gap-y-3 justify-between items-end'>
                <h1 className='text-xl font-semibold'>{club?.clubName}</h1>
                <span className='text-lg text-end'>Duyuru Sayısı : {club?.announcements.length}</span>
                <button onClick={() => navigate(`/leader/announcements/${club.id}`)} className='px-4 py-1 bg-primary rounded-full text-white font-semibold hover:bg-primary-hover w-40'>Duyurular</button>

            </div>


        </div>
    )
}

export default LeaderAnnouncementClubBox