import React, { useEffect } from 'react'
import { useAccount } from '../../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderClubsByUserID, resetMemberApplies } from '../../../redux/slices/leaderSlice'
import { useNavigate } from 'react-router-dom'



const LeaderMembershipApplies = () => {

  const user = useAccount()
  const dispatch = useDispatch()
  const { clubs } = useSelector((state) => state.leader) // Mevcut kullanıcının lider olduğu kulüpleri getirir
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(resetMemberApplies())
    dispatch(fetchLeaderClubsByUserID(user.uid))

  }, [dispatch, user.uid])



  return (
    <div className='flex flex-col '>
      <div className='flex flex-col  justify-between gap-y-3'>
        <h1 className='text-2xl font-semibold'>Üyelik Başvuruları</h1>
        <hr />


        <div className='grid grid-cols-3 gap-3 '>
          {
            clubs?.map((club) => (
              <div key={club.id} className='bg-neutral-100 p-3 rounded-lg shadow flex flex-col items-center justify-center'>
                <div className='flex items-start gap-x-3 w-full'>
                  <img src={club.clubLogo} className='w-20 rounded-full h-20 size-fit' alt={`${club.clubName} kulübünün logosu`} />
                  <div>
                    <h1 className='text-xl font-semibold'>{club.clubName}</h1>
                    <span className='text-sm text-gray-500'>Üye Sayısı : {club.members.length}</span>
                  </div>
                </div>
                <div className='flex flex-col gap-y-3 w-full'>
                  <span>
                    Toplam Başvuru Sayısı : {club.membershipApplies.length}
                  </span>

                  <button className='bg-primary text-white rounded-lg p-2 font-semibold hover:bg-primary-hover' onClick={() => navigate(`/leader/membership-applies/${club.id}`)}>
                    Başvuruları Görüntüle
                  </button>
                </div>
              </div>
            ))
          }
        </div>




      </div>

    </div>
  )
}

export default LeaderMembershipApplies