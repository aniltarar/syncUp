import React from 'react'
import { Link } from 'react-router-dom'
import ProfileDown from './Navbar/ProfileDown'

import syncUp from '../assets/syncUp.svg'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { user } = useSelector((state) => state.auth)




  return (
    <div className='flex flex-row items-center justify-between border-b py-5 mx-5'>
      <Link to='/'>
        <img src={syncUp} alt="SyncUp Logo" />
      </Link>
      <div className='flex flex-row items-center justify-between w-1/2 '>
        <Link className='text-2xl' to='/clubs'>Kulüpler</Link>
        <Link className='text-2xl' to='/events'>Etkinlikler</Link>
        <Link className='text-2xl' to='/announcments'>Duyurular</Link>
      </div>
      {
        user ? <ProfileDown /> :
          <div className='flex flex-row gap-3'>
            <Link to='/login' className='text-xl px-2 py-3 bg-green-400 rounded-md'>Oturum Aç</Link>
            <Link to='/register' className='text-xl px-2 py-3 bg-green-400 rounded-md'>Kayıt Ol</Link>
          </div>
      }
    </div>
  )
}

export default Navbar