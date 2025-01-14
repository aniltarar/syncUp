import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileDown from './Navbar/ProfileDown'
import syncUp from '../assets/syncUp.svg'
import { useSelector } from 'react-redux'
import NotificationsDown from './Navbar/NotificationsDown'


const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='container mx-auto max-w-6xl mt-3'>
      {/* Navbar Container */}
      <div className='flex justify-between items-center px-7 py-5 rounded-full border-2 border-neutral-200'>

        {/* Logo */}
        <Link to='/'>
          <img src={syncUp} className='w-24' alt="SyncUp Logo" />
        </Link>

        {/* Links (visible on large screens) */}
        <div className='hidden sm:flex gap-5 flex-1 justify-center'>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/clubs'>Kulüpler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/events'>Etkinlikler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/announcements'>Duyurular</Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='sm:hidden'>
          <button onClick={toggleMenu} className='text-neutral-700 text-2xl '>
            &#9776; {/* Hamburger Icon */}
          </button>
        </div>

        {/* Profile and Auth Section */}
        <div className='flex items-center gap-x-2'>
          {user ? <NotificationsDown /> : null}
          {user ? <ProfileDown /> :
            <Link to='/auth/login' className='text-md px-4 py-2 rounded-full text-neutral-900 font-medium text-sm items-center bg-primary hover:ring-2 ring-offset-2 ring-primary transition-all duration-300'>
              Oturum aç
            </Link>
          }
        </div>
      </div>

      {/* Mobile Menu - Only visible if isMenuOpen is true */}
      {isMenuOpen && (
        <div className='sm:hidden flex flex-col items-center justify-center gap-5 py-5 bg-gray-100 divide-y-2'>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/clubs'>Kulüpler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/events'>Etkinlikler</Link>
          <Link className='text-sm font-medium hover:underline text-neutral-700' to='/announcements'>Duyurular</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
