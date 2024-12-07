import React from 'react'
import syncUp from '/src/assets/syncUp.svg'
import { NavLink } from 'react-router-dom'
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
    <aside className='bg-neutral-100 min-h-screen w-72 flex flex-col items-center border-r-2'>
      <NavLink to="/admin">
        <img src={syncUp} alt="syncUp Logo" className='p-5 border-b-[2px] hover:animate-pulse' />
      </NavLink>
      <div className='flex flex-col gap-3 p-5'>
        <NavLink 
          to="/admin" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-primary text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <MdDashboard size={22} /> Hızlı Erişim Paneli
        </NavLink>
        <NavLink 
          to="/admin/users" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <FaUsers size={22} /> Kullanıcılar
        </NavLink>
        <NavLink 
          to="/admin/clubs" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <FaPeopleRoof size={22} /> Kulüpler
        </NavLink>
        <NavLink 
          to="/admin/events" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <FaCalendarDay size={22} /> Etkinlikler
        </NavLink>
        <NavLink 
          to="/admin/announcements" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <FaBullhorn size={22} /> Duyurular
        </NavLink>
        <NavLink 
          to="/admin/feedbacks" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <MdFeedback size={22} /> Geri Bildirimler
        </NavLink>
        <NavLink 
          to="/admin/clubs-applies" 
          className={({ isActive }) => 
            `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
          }>
          <FaClipboardCheck size={22} /> Kulüp Onayları
        </NavLink>
      </div>
      <div className='flex flex-col gap-2 p-5 mt-auto items-start justify-start w-full'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center justify-start w-full text-white rounded-md transition-colors gap-x-3 px-4 py-2 ${isActive ? 'bg-red-600' : 'bg-red-500 hover:bg-red-600'}`
          }>
          <IoLogOut size={22} />
          <span>Panelden Çık</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default AdminSideBar
