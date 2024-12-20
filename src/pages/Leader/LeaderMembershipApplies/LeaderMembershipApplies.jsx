import React, { useEffect } from 'react'
import { useAccount } from '../../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderClubsByUserID } from '../../../redux/slices/leaderSlice'

import MemberApplies from '../../../components/Leader/MemberApplies'




const LeaderMembershipApplies = () => {

  const user = useAccount()
  const dispatch = useDispatch()
  const { clubs } = useSelector((state) => state.leader)





  useEffect(() => {
    dispatch(fetchLeaderClubsByUserID(user.uid))


    // dispatch(fetchClubLeadersName())
  }, [dispatch, user.uid])



  return (
    <div className='flex flex-col '>

      <div className='flex flex-col  justify-between gap-y-3'>
        <h1 className='text-2xl font-semibold'>Üyelik Başvuruları</h1>
        <hr />
        <div>
          <div className='grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
            <input type='text' placeholder='Arama yapın' className='col-span-3 p-2 rounded-lg' />
            <select className='p-2 rounded-lg'>
              <option value=''>Kulüp</option>
            </select>
            <select className='p-2 rounded-lg'>
              <option value=''>Durum</option>
            </select>
          </div>
        </div>


        <div className='grid grid-cols-5 gap-3 bg-neutral-100 p-3 rounded-lg shadow font-semibold'>
          <div className='justify-self-start'>Adı Soyadı</div>
          <div className='justify-self-start'>Kulüp</div>
          <div className='justify-self-start'>Başvuru Tarihi</div>

          <div className='justify-self-start'>Durum</div>
          <div className='justify-self-center'>İşlem</div>
        </div>

        {
          clubs?.map((club) => (
            <MemberApplies key={club.id} club={club} />
          ))
        }



      </div>

    </div>
  )
}

export default LeaderMembershipApplies