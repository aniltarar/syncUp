import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNotification, markAsRead } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const NotificationBox = ({ notification }) => {
    const { title, message, from, to, isRead, createdAt } = notification;

    // createdAt'ın bir Timestamp olup olmadığını kontrol et
    const notificationTime = createdAt?.toDate ? dayjs(createdAt.toDate()).format('DD/MM/YYYY HH:mm') : dayjs(createdAt).format('DD/MM/YYYY HH:mm');


    const dispatch = useDispatch();

    const handleMarkAsRead = () => {
        if (isRead) {
            toast.error("Bu bildirim zaten okundu olarak işaretlenmiş!");
            return;
        }
        dispatch(markAsRead({ uid: to, notificationID: notification.id }));
       
    };

    const handleDeleteNotification = () => {
        dispatch(deleteNotification({ uid: to, notificationID: notification.id }));
       
    };

    return (
        <div className='p-3 w-full bg-neutral-50 border rounded-md gap-y-3 flex flex-col'>
            <div className='flex items-center justify-between mb-3'>
                <span className='font-semibold text-xl'>Başlık : {title}</span>
                <div className='flex gap-x-3'>
                    <span>{notificationTime}</span> {/* Tarihi burada gösteriyoruz */}
                </div>
            </div>
            <div className=''>
                <p className='text-sm'><span className='font-semibold'>Mesaj : </span>{message}</p>
            </div>
            <div className='flex items-center justify-between w-full'>
                <span className='text-sm'><span className='font-semibold'>Gönderen : </span>{from?.toUpperCase()}</span>
                <div className=' flex gap-x-2 items-center'>
                    <button 
                        disabled={isRead} 
                        onClick={handleMarkAsRead} 
                        className={`text-white p-2 rounded-md text-sm w-52 ${isRead ? "bg-neutral-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500"}`}
                    >
                        {isRead ? "Okundu" : "Okundu Olarak İşaretle"}
                    </button>
                    <button 
                        onClick={handleDeleteNotification} 
                        className='bg-red-500 text-white p-2 text-sm rounded-md w-20 hover:bg-red-600'
                    >
                        Sil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationBox;
