import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnnouncementBox = ({ announcement }) => {
    const { title, content, publisher, createdAt, announcementImage } = announcement;
    const formattedDate = dayjs(createdAt.toDate()).format('DD/MM/YYYY HH:mm');
    const navigate = useNavigate()


    return (
        <div onClick={()=>navigate(`/announcements/${announcement.id}`)} className="flex flex-col border rounded-lg  h-full bg-white cursor-pointer hover:bg-neutral-100">
            <div>
                <img
                    src={announcementImage}
                    alt={title}
                    className="w-full h-52 object-cover rounded-t-lg"
                />
            </div>
            <div className="p-4 flex flex-col justify-between h-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{content.slice(0, 130)}...</p>
                <div className="mt-auto">
                    <p className="text-sm text-gray-500">Yayınlayan: <span className="font-medium">{publisher}</span></p>
                    <p className="text-sm text-gray-500">Tarih: {formattedDate}</p>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBox;
