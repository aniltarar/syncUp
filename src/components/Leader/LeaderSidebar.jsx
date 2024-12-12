import React from 'react'
import { NavLink } from 'react-router-dom'
import syncUp from '/src/assets/syncUp.svg'
import { MdDashboard } from "react-icons/md";
import { FaBullhorn } from "react-icons/fa";
import { FaClipboardCheck,FaPeopleRoof,FaCalendarDay } from "react-icons/fa6";
import { IoMdSettings } from 'react-icons/io';

const LeaderSidebar = () => {
    return (
        <aside className='bg-neutral-100 min-h-screen w-72 flex flex-col items-center border-r-2' >
            <NavLink to="/leader">
                <img src={syncUp} alt="syncUp Logo" className='p-5 border-b-[2px] hover:animate-pulse mb' />
            </NavLink>
            <div className='flex flex-col gap-3 mt-5'>
                <NavLink
                    to="/leader"
                    className={({ isActive }) =>
                        `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-primary text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                    }>
                    <MdDashboard size={22} />
                    Hızlı Erişim Paneli
                </NavLink>

                <NavLink to="clubs" className={({ isActive }) =>
                    `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                }>
                    <FaPeopleRoof size={22} />
                    Kulüpler
                </NavLink>
                <NavLink to="events" className={({ isActive }) =>
                    `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                }>
                    <FaCalendarDay size={22} />
                    Etkinlikler
                </NavLink>

                <NavLink to="announcements" className={({ isActive }) =>
                    `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                }>
                    <FaBullhorn size={22} />
                    Duyurular

                </NavLink>
                <NavLink to="membership-applies" className={({ isActive }) =>
                    `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                }>
                    <FaClipboardCheck size={22} />
                    Üye Başvuruları
                </NavLink>
                <NavLink to="club-settings" className={({ isActive }) =>
                    `flex items-center gap-x-3 text-slate-800 rounded-md transition-colors text-start px-4 py-2 ${isActive ? 'bg-neutral-700 text-white' : 'bg-neutral-200 hover:bg-neutral-300'}`
                }>
                    <IoMdSettings size={22} />
                    Kulüp Ayarları
                </NavLink>


            </div>

            <NavLink to="/" className='flex items-center gap-x-3 m-5 mt-auto text-white rounded-md transition-colors text-start px-4 py-2 bg-red-500 hover:bg-red-600'>Panelden Çıkış Yap</NavLink>

        </aside>
    )
}

export default LeaderSidebar