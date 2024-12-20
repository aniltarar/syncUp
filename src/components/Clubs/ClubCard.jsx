import React from 'react'
import toast from 'react-hot-toast'
import { CiSquareInfo } from 'react-icons/ci'
import { FaCalendarDay, FaUsers } from 'react-icons/fa6'
import { IoIosInformationCircleOutline } from 'react-icons/io'
import { IoLocationSharp } from 'react-icons/io5'
import { MdLogin } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { applyMemberClub } from '../../redux/slices/clubSlice'
import { useAccount } from '../../hooks/useAccount' // Ekledik

const ClubCard = ({ club }) => {
    const { id, clubName, clubLogo, events, members, clubDescription } = club
    const user = useAccount() // Kullanıcı bilgisi
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleMemberApply = () => {
        if (!user) {
            toast.error('Kulübe başvuru yapabilmek için giriş yapmalısınız.');
            return;
        }
    
        // Kullanıcı bilgilerini kontrol edin
        if (!user.displayName) {
            toast.error('Kullanıcı bilgileri eksik. Lütfen profilinizi güncelleyin.');
            return;
        }
    
        // Kulübe üye başvurusu yap
        const applyData = {
            clubID: id,
            clubName: clubName,
            userID: user?.uid,
            displayName: user?.displayName, // Kullanıcının adı soyadı burada geçiliyor
        };
    
        dispatch(applyMemberClub(applyData));
    };
    

    return (
        <div className='flex flex-col border shadow-lg rounded-lg items-center gap-y-2 '>
            <div className="badges flex w-full my-3 ml-3 gap-x-3">
                <span className='px-2 py-1 bg-primary-light rounded-full text-sm hover:bg-primary-hover cursor-pointer'>Teknoloji</span>
                <span className='px-2 py-1 bg-primary-light rounded-full text-sm hover:bg-primary-hover cursor-pointer'>Yazılım</span>
            </div>
            <div className="clubLogo p-3">
                <img src={clubLogo} className='h-52 rounded-md border ' alt={`${clubName} kulübünün logosu.`} />
            </div>
            <div className="clubName text-lg font-semibold">{clubName}</div>
            <div className="flex items-center justify-start gap-x-2 text-neutral-500 text-sm">
                <IoLocationSharp size={22} />
                <span>Mühendislik Fakültesi</span>
            </div>
            <div className="members-events flex justify-between gap-x-5">
                <span className='flex items-center gap-x-1 text-sm text-neutral-500'>
                    <FaUsers size={22} />
                    {members.length} Üye
                </span>
                <span className='flex items-center gap-x-1 text-sm text-neutral-500'>
                    <FaCalendarDay size={22} />
                    {events.length} Etkinlik
                </span>
            </div>
            <div className="p-3 text-start">
                <p className='text-sm'>{clubDescription.split(" ").slice(0, 10).join(" ")}...</p>
            </div>
            <div className="buttons flex items-center justify-center p-3 gap-x-3 bg-gray-100 w-full mt-auto">
                <button
                    className='px-2 py-1 bg-neutral-300 rounded-lg flex items-center justify-center gap-x-2 w-full hover:bg-neutral-400'
                    onClick={() => navigate(`/clubs/${club.id}`)}
                >
                    <IoIosInformationCircleOutline size={20} />
                    <span>Detaylar</span>
                </button>
                <button
                    className='px-2 py-1 bg-primary rounded-lg flex items-center justify-center gap-x-2 w-full hover:bg-primary-hover'
                    onClick={handleMemberApply}
                >
                    <MdLogin size={20} />
                    <span className='text-center'>Katıl</span>
                </button>
            </div>
        </div>
    )
}

export default ClubCard
