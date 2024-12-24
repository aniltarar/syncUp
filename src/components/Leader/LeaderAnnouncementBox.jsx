import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleAnnouncementStatus } from '../../redux/slices/leaderSlice';
import LeaderAnnouncementDetailModal from '../Modals/LeaderAnnouncementDetailModal';
import LeaderAnnouncementEditModal from '../Modals/LeaderAnnouncementEditModal';

const LeaderAnnouncementBox = ({ announcement }) => {
    const { title, content, announcementImage, createdAt, clubName, clubID, status } = announcement;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const formattedDate = dayjs(new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6)).format('DD/MM/YYYY');

    const statusTranslate = {
        active: 'Yayında',
        passive: 'Yayından Kaldırıldı',
    };

    const statusColor = {
        active: 'text-green-500 bg-green-100',
        passive: 'text-red-500 bg-red-100',
    };



    const handleRemoveAnnouncement = () => {
        dispatch(toggleAnnouncementStatus({ clubID, announcementID: announcement.id, status }));
    };



    return (
        <>
        {
            isOpen && ( <LeaderAnnouncementDetailModal setIsOpen={setIsOpen} announcement={announcement} />)
        }
        {
            isEdit && ( <LeaderAnnouncementEditModal setIsEdit={setIsEdit} announcement={announcement} />)
        }
       
        <div className="grid grid-cols-6 gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 place-items-center border">
            {/* Duyuru Başlığı */}
            <span className="col-span-1 justify-self-start text-gray-800 font-medium">{title}</span>

            {/* Yayın Tarihi */}
            <span className="col-span-1 justify-self-center text-gray-600">{formattedDate}</span>

            {/* Görsel */}
            <span className="col-span-1 justify-self-center">
                <img
                    src={announcementImage || "/placeholder.svg?height=200&width=400"}
                    alt={title}
                    className="w-32 h-32 object-contain rounded-md border"
                />
            </span>

            {/* Kulüp Adı */}
            <span className="col-span-1 justify-self-center text-center text-gray-800">{clubName}</span>

            {/* Duyuru Durumu */}
            <span
                className={`col-span-1 justify-self-center  px-4 py-1 rounded-full font-medium ${statusColor[status]}`}
            >
                {statusTranslate[status]}
            </span>

            {/* Eylem Düğmeleri */}
            <div className="col-span-1 justify-self-center flex flex-col gap-y-2">
                <button onClick={()=>setIsOpen(true)} className="px-4 py-2 rounded-full text-sm bg-gray-500 text-white hover:bg-gray-600">
                    Detay
                </button>
                <button onClick={()=>setIsEdit(true)} className="px-4 py-2 rounded-full text-sm bg-yellow-500 text-white hover:bg-yellow-600">
                    Düzenle
                </button>
                {status === 'active' && (
                    <button
                        onClick={handleRemoveAnnouncement}
                        className="px-4 py-2 rounded-full text-sm bg-red-500 text-white hover:bg-red-600"
                    >
                        Yayından Kaldır
                    </button>
                )}
                {status === 'passive' && (
                    <button
                        onClick={handleRemoveAnnouncement}
                        className="px-4 py-2 rounded-full text-sm bg-green-500 text-white hover:bg-green-600"
                    >
                        Yayına Al
                    </button>
                )}
            </div>
        </div>
        </>
    );
};

export default LeaderAnnouncementBox;
