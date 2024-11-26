import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileComplete from '../../components/Modals/ProfileComplete'
import { useAccount } from '../../hooks/useAccount'

const Home = () => {
  const [isActive, setIsActive] = useState(null)

  const user = useAccount();



  useEffect(() => {
    if (user?.phoneNumber === null) {
      setIsActive(true)
    }
  }
    , [user])


  return (
    <>
      {isActive &&

        <ProfileComplete user={user} setIsActive={setIsActive} />
      }

      <div className='flex flex-grow items-center justify-center '>
        deneme
      </div>
    </>
  )
}

export default Home