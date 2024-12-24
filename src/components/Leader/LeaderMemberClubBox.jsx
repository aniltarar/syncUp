import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchPendingMemberApplies } from '../../redux/slices/leaderSlice'

const LeaderMemberClubBox = ({ club }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [pendingApplies, setPendingApplies] = useState([])

    useEffect(() => {
        dispatch(fetchPendingMemberApplies(club.id))
            .then((data) => {
                setPendingApplies(data.payload)
            })
    }, [club, dispatch])



    return (
        <div key={club.id} className='bg-white p-3 rounded-lg shadow flex flex-col items-center justify-center border'>
            <div className='flex items-start gap-x-3 w-full justify-between'>
                <img src={club.clubLogo} className=' rounded-full w-32 h-32  object-cover' alt={`${club.clubName} kulübünün logosu`} />
                <div className='flex flex-col gap-y-1 items-end '>
                    <h1 className='text-xl font-semibold'>{club.clubName}</h1>
                    <span className=" text-sm px-4 py-1 rounded-full font-medium bg-primary-dark w-32 text-white "> Üye Sayısı : {club.members.length}</span>
                </div>
            </div>
            <div className='flex flex-col gap-y-3 w-full '>
                <div className='flex items-center justify-between mt-3 '>

                    <span className="justify-self-center text-sm px-4 py-1 rounded-full font-medium bg-primary-dark text-white ">
                        Toplam Başvuru Sayısı : {club.membershipApplies.length}
                    </span>
                    <span className="justify-self-center text-sm px-4 py-1 rounded-full font-medium bg-yellow-100 text-yellow-500 animate-pulse">
                        Bekleyen Başvuru Sayısı: {pendingApplies?.length}
                    </span>
                </div>

                <button className='bg-primary text-white rounded-lg p-2 font-semibold hover:bg-primary-hover' onClick={() => navigate(`/leader/membership-applies/${club.id}`)}>
                    Başvuruları Görüntüle
                </button>
            </div>
        </div>
    )
}

export default LeaderMemberClubBox