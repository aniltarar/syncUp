import React from 'react'
import syncUp from '/src/assets/syncUp.svg'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaCalendarDay } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { FaPeopleRoof } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";


const AdminSideBar = () => {
  return (
    <aside className='bg-neutral-100 min-h-screen w-72  flex flex-col items-center border-r-2  '>
      <Link to="/admin">
        <img src={syncUp} alt="syncUp Logo" className=' p-5  border-b-[2px] hover:animate-pulse' />
      </Link>
      <div className='flex flex-col gap-3  p-5'>
        <Link to="/admin" className='flex items-center  gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 bg-neutral-300 hover:bg-neutral-400  '>
          <MdDashboard size={22} /> Hızlı Erişim Paneli</Link>
          <Link to="/admin/users" className='flex items-center  gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300 hover:bg-neutral-400 '>
          <FaUsers size={22} />Kullanıcılar
        </Link>
        <Link to="/admin/clubs" className='flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300  hover:bg-neutral-400 '>
          <FaPeopleRoof size={22} /> Kulüpler
        </Link>
        <Link to="/admin/events" className='flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300 hover:bg-neutral-400 '>
          <FaCalendarDay size={22} />Etkinlikler</Link>
       
        <Link to="/admin/announcements" className='flex items-center  gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300 hover:bg-neutral-400 '>
          <FaBullhorn size={22} />Duyurular
        </Link>
        <Link to="/admin/feedbacks" className='flex items-center  gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300 hover:bg-neutral-400 '>
          <MdFeedback size={22} />Geri Bildirimler
        </Link>
        <Link to="/admin/clubs-applies" className='flex items-center  gap-x-3 text-slate-800 rounded-md transition-colors text-start  px-4 py-2 bg-neutral-300 hover:bg-neutral-400 '>
          <FaClipboardCheck size={22} />Kulüp Onayları
        </Link>
      </div>
      <div className='flex flex-col gap-2 p-5 mt-auto items-start justify-start  w-full'>
        <Link to="/" className='flex items-center justify-start w-full  text-white rounded-md transition-colors gap-x-3  px-4 py-2 bg-red-500 hover:bg-red-600'>
          <IoLogOut size={22} />
          <span>Panelden Çık</span>
        </Link>
      </div>

    </aside>
  )
}

export default AdminSideBar