import React, { useEffect } from 'react'
import { useAccount } from '../../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderClubsByUserID, resetMemberApplies } from '../../../redux/slices/leaderSlice'
import { useNavigate } from 'react-router-dom'
import LeaderMemberClubBox from '../../../components/Leader/LeaderMemberClubBox'



const LeaderMembershipApplies = () => {

  const user = useAccount()
  const dispatch = useDispatch()
  const { clubs } = useSelector((state) => state.leader) // Mevcut kullanıcının lider olduğu kulüpleri getirir
 

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
              <LeaderMemberClubBox key={club.id} club={club} />
            ))
          }
        </div>




      </div>

    </div>
  )
}

export default LeaderMembershipApplies