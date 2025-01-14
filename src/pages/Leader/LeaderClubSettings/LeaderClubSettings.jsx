import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '../../../hooks/useAccount'
import { fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice'
import LeaderClubSettingBox from '../../../components/Leader/LeaderClubSettingBox'

const LeaderClubSettings = () => {
  const dispatch = useDispatch()
  const user = useAccount()
  const { clubs } = useSelector(state => state.leader)


  useEffect(() => {
    dispatch(fetchLeaderClubsByUserID(user.uid))
  }, [dispatch, user])


  return (
    <div className='flex flex-col gap-y-3 '>
      <h1 className='text-2xl font-semibold'>Kulüp Ayarları</h1>
      <hr />
      {
        clubs.length === 0 && (
          <div className='text-center text-lg text-gray-500'>
            Henüz bir kulüp lideri değilsiniz.
          </div>
        )
      }

      <div className='grid grid-cols-3 gap-3'>
        {
          clubs.map(club => (
            <LeaderClubSettingBox key={club.id} club={club} />
          ))
        }


      </div>
    </div>
  )
}

export default LeaderClubSettings