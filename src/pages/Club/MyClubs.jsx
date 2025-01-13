import React, { useEffect } from 'react'
import { useAccount } from '../../hooks/useAccount'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserClubs, resetClubs } from '../../redux/slices/clubSlice'
import MyClubBox from '../../components/Clubs/MyClubBox'

const MyClubs = () => {
  const dispatch = useDispatch()
  const user = useAccount()
  const { clubs } = useSelector((state) => state.club)

  useEffect(() => {
    dispatch(resetClubs())
    dispatch(fetchUserClubs(user.uid))
  }, [dispatch, user.uid]
  )

  return (
    <div className='flex flex-col gap-y-3 mx-2 w-full'>
      <div className='flex flex-col items-start gap-x-2 bg-neutral-100 rounded-md p-3'>
        <h1 className='text-xl font-semibold'>Kulüplerim</h1>
        <p>Buradan üye olduğunuz kulüpleri listeleyip ilgili kulübe tıklayarak detaylarına gidebilirsiniz.</p>
      </div>
      {
        clubs.length === 0 && (
          <div className='flex items-center justify-center bg-neutral-100 rounded-md p-3'>
            <p>Üye olduğunuz kulüp bulunmamaktadır.</p>
          </div>
        )
      }
      <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3'>
        {clubs.map((club) => (
          <MyClubBox key={club.id} club={club} />
        ))}
      </div>

    </div>
  )
}

export default MyClubs