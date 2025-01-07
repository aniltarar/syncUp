import dayjs from 'dayjs';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleAnnouncementStatus } from '../../../redux/slices/adminSlice';

const AdminAnnouncementBox = ({ announcement }) => {

    const dispatch = useDispatch();
    const { title, createdAt, content, publisher, status, announcementImage } = announcement

    const formattedDate = dayjs(createdAt.toDate()).format('DD/MM/YYYY HH:mm');

    const statusTranslate = {
        "active": 'Yayında',
        "passive": 'Yayında Değil',
    }
    const statusColor = {
        "active": 'text-green-500 bg-green-100',
        "passive": 'text-red-500 bg-red-100',
    }

    const handleToggleAnnouncementStatus = () => {
        dispatch(toggleAnnouncementStatus(announcement.id));
    }


    return (
        <div className='grid grid-cols-5 bg-white p-3  gap-3 border rounded-lg items-center'>
            <span className='font-semibold'>{title}</span>
            <span className='justify-self-start'>{formattedDate}</span>
            <img src={announcementImage} className='h-20 object-contain justify-self-center' alt="" />
            <span className='justify-self-center'>{publisher}</span>
            <span onClick={handleToggleAnnouncementStatus} className={`justify-self-center ${statusColor[status]} p-1 rounded-md cursor-pointer`}>{statusTranslate[status]}</span>

        </div>
    )
}

export default AdminAnnouncementBox