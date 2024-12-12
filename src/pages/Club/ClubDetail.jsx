import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { applyMemberClub, fetchClubByID, resetCurrentClub } from '../../redux/slices/clubSlice'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { FaCalendarDay, FaUsers } from 'react-icons/fa6'
import { FiAward } from 'react-icons/fi'
import { FaRegUserCircle } from 'react-icons/fa'
import { CiInstagram, CiLinkedin, CiMail } from 'react-icons/ci'
import toast from 'react-hot-toast'

const ClubDetail = () => {
    // Kulübün ID'sini almak için useParams hook'unu kullanın.
    const { id } = useParams()
    const { currentClub } = useSelector((state) => state.club)
    const { clubName, clubLogo, events, members, clubDescription } = currentClub
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()


    const handleMemberApply = () => {
        if(!user) {
        toast.error('Kulübe başvuru yapabilmek için giriş yapmalısınız.')
        return;
        }
        // Kulübe üye başvurusu yap
        const applyData = {
            clubID: id,
            userID: user.uid,
        }
        dispatch(applyMemberClub(applyData))
    }



    // Kulüp detaylarını getirme işlemi
    useEffect(() => {
        // Eğer Slice'ta mevcut kulüp varsa sıfırlama işlemi
        dispatch(resetCurrentClub())
        // Mevcut kulübü getirme işlemi
        dispatch(fetchClubByID(id))
    }, [dispatch, id])



    return (
        <div className='flex flex-col  w-full'>
            <Link to="/clubs" className='flex items-center gap-x-2 text-sm text-neutral-400 mb-5  hover:text-neutral-500 transition-colors'>
                <span>
                    <IoMdArrowRoundBack />
                </span>
                <span >Kulüpler Sayfasına Geri Dön</span>
            </Link>

            <div className="grid grid-cols-5 grid-rows-4 gap-4">
                <div className="col-span-3 row-span-1 border rounded-md p-3  ">
                    <h1 className='text-xl font-semibold p-2 border-b'>Kulüp Hakkında</h1>
                    <div className='flex my-3 '>
                        <img src={clubLogo} className='w-40 h-40 border rounded-full' alt={`${currentClub.clubLogo} kulübünün logosu`} />
                        <div className='mx-5'>
                            <h2 className='text-xl '>{clubName}</h2>
                            <span className='flex items-center gap-x-2 my-3'>
                                <IoLocationSharp size={22} />
                                Mühendislik Fakültesi
                            </span>
                            <p className='text-sm'>{clubDescription}</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 mt-2'>
                        <h1 className='text-lg font-semibold '>Kulüp Liderleri</h1>


                        <div className='flex gap-x-2 items-center '>
                            <FaRegUserCircle size={25} /> <span className='text-2xl'>Lider-1</span>
                        </div>
                        <div className='flex gap-x-2 items-center '>
                            <FaRegUserCircle size={25} /> <span className='text-2xl'>Lider-1</span>
                        </div>
                        <div className='flex gap-x-2 items-center '>
                            <FaRegUserCircle size={25} /> <span className='text-2xl'>Lider-1</span>
                        </div>

                    </div>

                </div>
                <div className="col-span-3 row-span-1 col-start-1 row-start-2 border rounded-md p-3">
                    <h1 className='text-xl font-semibold border-b p-2'>Etkinlikler</h1>
                    <div className='flex flex-col gap-y-2 mt-5 h-full text-lg'>
                        {/* {
                            events?.map((event) => (
                                <div key={event.id} className='flex items-center gap-x-2'>
                                    <span>{event.eventName}</span>
                                    <span>{event.eventDate}</span>
                                </div>
                            ))
                        } */}
                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>Etkinlik Adı - 1</span>
                            <span>10 Mart 2023</span>
                        </div>
                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>Etkinlik Adı - 2</span>
                            <span>23 Mayıs 2023</span>
                        </div>
                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>Etkinlik Adı - 1</span>
                            <span>10 Mart 2023</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 col-start-1 row-start-3 border rounded-md p-3">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulüp İletişim Bilgileri</h1>
                    <div className='flex flex-col mt-3 gap-y-2  h-full'>
                        <span className='flex items-center gap-x-3 hover:text-blue-500 transition-colors'>
                            <CiMail size={30} /> <a href='mailto:kulup@mail.com'>kulup@mail.com</a>
                        </span>
                        <span className='flex items-center gap-x-3 hover:text-blue-500 transition-colors'>
                            <CiLinkedin size={30} /> <a href='https://www.linkedin.com/'>Linkedin</a>
                        </span>
                        <span className='flex items-center gap-x-3 hover:text-blue-500 transition-colors'>
                            <CiInstagram size={30} /> <a href='mailto:kulup@mail.com'>Instagram</a>
                        </span>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 col-start-4 row-start-1 border rounded-md p-3 h-full">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulüp Bilgieri</h1>
                    <div className='flex flex-col  gap-y-2 mt-5 h-full text-lg'>
                        <span className='flex items-center gap-x-2'>
                            <FaUsers size={25} /> {members?.length} Üye
                        </span>
                        <span className='flex items-center gap-x-2'>
                            <FaCalendarDay size={25} /> {events?.length} Üye
                        </span>
                        <span className='flex items-center gap-x-2'>
                            <FiAward size={25} /> Kuruluş Tarihi : 10 Ekim 2021
                        </span>

                    </div>
                </div>
                <div className="col-span-2 col-start-4 row-start-2 border rounded-md p-3">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulüp İlanları</h1>
                    <div className='flex flex-col gap-y-2 mt-2'>

                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>İlan Adı - 2</span>
                            <span>23 Mayıs 2023</span>
                        </div>
                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>İlan Adı - 2</span>
                            <span>23 Mayıs 2023</span>
                        </div>
                        <div className='flex items-center gap-x-2 bg-neutral-50 p-2 rounded-md'>
                            <span>İlan Adı - 2</span>
                            <span>23 Mayıs 2023</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 row-span-1 col-start-4 row-start-3 border rounded-md h-full p-3">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulübe Başvuru</h1>
                    <div className="flex flex-grow justify-center items-center h-full">
                        <button className='bg-primary w-1/2 p-5 rounded-md hover:bg-primary-hover' onClick={handleMemberApply}>Başvur</button>
                    </div>

                </div>

            </div>


        </div>

    )
}

export default ClubDetail