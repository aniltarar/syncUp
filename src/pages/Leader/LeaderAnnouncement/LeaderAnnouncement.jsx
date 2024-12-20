import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAccount } from '../../../hooks/useAccount'
import { fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice'

const LeaderAnnouncement = () => {
  const dispatch = useDispatch()
  const user = useAccount()

  useEffect(() => {
    if (user) {
      dispatch(fetchLeaderClubsByUserID(user.uid))
    }
  }, [dispatch, user])

  return (
    <div>

    </div>
  )
}

export default LeaderAnnouncement