import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { applyMemberClub, fetchClubByID, resetCurrentClub } from '../../redux/slices/clubSlice'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { FaCalendarDay, FaUsers } from 'react-icons/fa6'
import { FiAward } from 'react-icons/fi'
import { FaRegUserCircle } from 'react-icons/fa'

import toast from 'react-hot-toast'
import dayjs from 'dayjs'
import LoaderSpinner from '../../components/Loaders/LoaderSpinner'

const ClubDetail = () => {
    // Kulübün ID'sini almak için useParams hook'unu kullanın.
    const { id } = useParams()
    const { currentClub,status } = useSelector((state) => state.club)
    const { clubData, eventsData, announcementsData, leadersData } = currentClub
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    //Kulüp Bilgiler DeStructing

    const handleMemberApply = () => {
        if (!user) {
            toast.error('Kulübe başvuru yapabilmek için giriş yapmalısınız.')
            return;
        }
        // Kulübe üye başvurusu yap
        const applyData = {
            clubID: id,
            clubName: clubData?.clubName,
            userID: user.uid,
            displayName: user.displayName,
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

    const filteredActiveAnnouncements = announcementsData?.filter((announcement) => announcement.status === 'active')

    if (status === 'loading') {
        return <LoaderSpinner />
    }
    

    // Kulüp oluşturulma tarihi

    const clubCreatedDate = clubData?.clubCreatedAt?.toDate ? dayjs(clubData?.clubCreatedAt.toDate()).format('DD/MM/YYYY') : "Yükleniyor...";

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
                        <img src={clubData?.clubLogo} className='w-40 h-40 border rounded-full object-cover' alt={`${clubData?.clubLogo} kulübünün logosu`} />
                        <div className='mx-5'>
                            <h2 className='text-xl '>{clubData?.clubName}</h2>
                            <span className='flex items-center gap-x-2 my-3'>
                                <IoLocationSharp size={22} />
                                {clubData?.clubLocation ? clubData?.clubLocation : 'Konum bilgisi bulunmamaktadır.'}
                            </span>
                            <p className='text-sm'>{clubData?.clubDescription}</p>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 mt-2'>
                        <h1 className='text-lg font-semibold '>Kulüp Liderleri</h1>
                        <div className='flex gap-x-3'>
                            {
                                leadersData?.map((leader) => (
                                    <div key={leader.uid} className='flex items-center gap-x-2'>
                                        <FaRegUserCircle size={25} />
                                        <span>{leader.displayName.toUpperCase()}</span>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
                <div className="col-span-3 row-span-1 col-start-1 row-start-2 border rounded-md p-3">
                    <h1 className='text-xl font-semibold border-b p-2 '>Etkinlikler</h1>
                    {
                        eventsData?.length === 0 && <p className='text-lg text-center mt-5'>Henüz bir etkinlik bulunmamaktadır.</p>
                    }

                    <div className='flex flex-col gap-y-2 mt-5 h-full text-lg'>
                        {

                            eventsData?.slice(0, 3).map((event) => (
                                <Link to={`/events/${event.eventID}`} key={event.eventID} className='flex items-center justify-between gap-x-2 bg-neutral-50 hover:bg-neutral-100 p-2 rounded-md'>
                                    <span>{event.eventName}</span>
                                    <span>{event.eventLocation}</span>
                                    <span>{dayjs(event.eventDate).format("DD/MM/YYYY HH:mm")}</span>
                                </Link>
                            ))
                        }

                    </div>
                </div>

                <div className="col-span-2 row-span-1 col-start-4 row-start-1 border rounded-md p-3 h-full">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulüp Bilgieri</h1>
                    <div className='flex flex-col  gap-y-3 mt-5 w-full text-lg'>
                        <span className='flex items-center gap-x-2'>
                            <FaUsers size={25} /> {clubData?.clubMembers?.length} Üye
                        </span>
                        <span className='flex items-center gap-x-2'>
                            <FaCalendarDay size={25} /> {eventsData?.length} Etkinlik
                        </span>
                        <span className='flex items-center gap-x-2'>
                            <FiAward size={25} /> {clubCreatedDate} Tarihinde Kuruldu
                        </span>
                        <span className='flex items-center gap-x-2'>

                            <button onClick={handleMemberApply} className='bg-primary text-white p-3 rounded-md hover:bg-primary-hover w-full mt-3'>Başvuru Yap</button>
                        </span>
                    </div>

                </div>
                <div className="col-span-2 col-start-4 row-start-2 border rounded-md p-3">
                    <h1 className='text-xl font-semibold border-b p-2'>Kulüp İlanları</h1>
                    <div className='flex flex-col gap-y-2 mt-5 h-full'>
                        {
                            announcementsData?.length === 0 && <p className='text-lg text-center  '>Henüz bir ilan bulunmamaktadır.</p>
                        }

                        {
                            filteredActiveAnnouncements?.slice(0, 3).map((announcement) => (
                                <Link to={`/announcements/${announcement?.announcementID}`} key={announcement.announcementID} className='flex  gap-y-2 justify-between bg-neutral-50 p-2 rounded-md hover:bg-neutral-100'>
                                    <h1 className='text-lg font-semibold'>{announcement.announcementTitle}</h1>
                                    <p className=''>{dayjs(announcement?.announcementDate.toDate()).format("DD/MM/YYYY HH:mm")} </p>
                                </Link>
                            ))
                        }

                    </div>
                </div>
               

            </div>


        </div>

    )
}



export default ClubDetail


