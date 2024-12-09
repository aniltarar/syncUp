import React, { useState } from 'react'
import { CiSquareInfo } from 'react-icons/ci'
import { FaCalendarDay, FaUsers } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdLogin } from 'react-icons/md'
import ClubDetail from '../Modals/ClubDetail'

const ClubCard = ({ club }) => {

    const { clubName, clubLogo, events, members, clubDescription } = club

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }



    return (

        <div className='flex flex-col  border shadow-lg rounded-lg items-center gap-y-2 '>
            {
                isOpen && <ClubDetail club={club} setIsOpen={setIsOpen} />
            }
            <div className="badges flex w-full my-3 ml-3 gap-x-3">
                <span className='px-2 py-1 bg-primary-light rounded-full text-sm hover:bg-primary-hover cursor-pointer'>Teknoloji</span>
                <span className='px-2 py-1 bg-primary-light rounded-full text-sm hover:bg-primary-hover cursor-pointer'>Yazılım</span>
            </div>
            <div className="clubLogo p-3">
                <img src={clubLogo} className='w-32 h-32 rounded-md border ' alt={`${clubName} kulübünün logosu.`} />
            </div>
            <div className="clubName text-lg font-semibold">{clubName}</div>

            <div className="flex items-center justify-start gap-x-2 text-neutral-500 text-sm">

                <IoLocationSharp size={22} />
                <span>
                    Mühendislik Fakültesi
                </span>

            </div>
            <div className="members-events flex justify-between gap-x-5  ">
                <span className='flex items-center gap-x-1 text-sm text-neutral-500'>
                    <FaUsers size={22} />
                    {members.length} Üye
                </span>
                <span className='flex items-center gap-x-1 text-sm text-neutral-500'>
                    <FaCalendarDay size={22} />
                    {events.length} Etkinlik
                </span>
            </div>
            <div className=" p-3 text-start ">
                <p className=' text-sm'>{clubDescription.split(" ").slice(0, 10).join(" ")}...</p>


            </div>
            <div className="buttons flex items-center justify-center p-3 gap-x-3  bg-gray-100 w-full mt-auto ">
                <button className='px-2 py-1 bg-neutral-300 rounded-lg flex items-center justify-center gap-x-2  w-full hover:bg-neutral-400' onClick={handleOpen}>
                    <IoIosInformationCircleOutline size={20} />
                    <span>Detaylar</span>
                </button>
                <button className='px-2 py-1 bg-primary rounded-lg flex items-center justify-center gap-x-2  w-full'>
                    <MdLogin size={20} />
                    <span className='text-center '>Katıl</span>
                </button>


            </div>
        </div>
    )
}

export default ClubCard