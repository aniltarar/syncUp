import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../../hooks/useAccount'
import { fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice'
import LeaderAnnouncementClubBox from '../../../components/Leader/LeaderAnnouncementClubBox'

const LeaderAnnouncement = () => {
  const dispatch = useDispatch()
  const user = useAccount()
  const { clubs } = useSelector(state => state.leader)





  useEffect(() => {
    if (user) {
      dispatch(fetchLeaderClubsByUserID(user.uid))
    }
  }, [dispatch, user])

  return (

    <div className='flex flex-col gap-y-3'>
      <div className='flex flex-col justify-between items-start'>
        <h1 className='text-2xl font-semibold'>Duyurular</h1>
      </div>
      <hr />
      {

        clubs?.length === 0 && (
          <div className='text-center text-lg text-gray-500'>
            Henüz bir kulüp lideri değilsiniz.
          </div>
        )

      }
      <div className='grid grid-cols-3 gap-3'>
        {
          clubs?.map(club => (
            <LeaderAnnouncementClubBox key={club.id} club={club} />
          ))
        }

      </div>

    </div>

  )
}

export default LeaderAnnouncement