import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProfileDown from './Navbar/ProfileDown'

import syncUp from '../assets/syncUp.svg'
import { useSelector } from 'react-redux'
import NotificationsDown from './Navbar/NotificationsDown'



const Navbar = () => {

  const { user } = useSelector((state) => state.auth)




  return (
    <div className='container mx-auto max-w-6xl mt-3'>

      <div className='flex flex-row items-center justify-between  px-7 py-5 rounded-full border-2 border-neutral-200 '>
        <Link to='/'>
          <img src={syncUp} className='w-24' alt="SyncUp Logo" />
        </Link>
        <div className='flex flex-row items-center justify-center gap-5 flex-1 '>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/clubs'>Kulüpler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/events'>Etkinlikler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/announcments'>Duyurular</Link>
        </div>
        <div className='flex items-center gap-x-2'>
          {
            user ? <NotificationsDown /> : null
          }
          {
            user ? <ProfileDown /> :
              <div className='flex flex-row gap-3'>
                <Link to='/auth/login' className='text-md px-4 py-2 rounded-full text-neutral-900 font-medium text-sm items-center bg-primary hover:ring-2 ring-offset-2 ring-primary transition-all duration-300'>Oturum aç</Link>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar