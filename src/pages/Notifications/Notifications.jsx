import React, { useEffect, useState } from 'react'
import { useAccount } from '../../hooks/useAccount';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../redux/slices/authSlice';
import NotificationBox from '../../components/Notifications/NotificationBox';

const Notifications = () => {

    const dispatch = useDispatch();
    const user = useAccount();
    const { notifications } = useSelector(state => state.auth.user)

    const [search, setSearch] = useState('')
    const [isRead, setIsRead] = useState(false)

    useEffect(() => {
        dispatch(fetchNotifications(user.uid))
    }, [dispatch, user.uid])


    const filteredNotifications = notifications?.filter(notification => {
        const matchSearch = notification?.title?.toLowerCase().includes(search.toLowerCase()) ||
            notification?.message?.toLowerCase().includes(search.toLowerCase()) ||
            notification?.from?.toLowerCase().includes(search.toLowerCase());

        if (isRead === '') {
            return matchSearch
        }
        if (isRead === "read") {
            return matchSearch && notification.isRead === true
        }
        if (isRead === "unread") {
            return matchSearch && notification.isRead === false
        }

        return matchSearch
    })

    if(notifications.length === 0) {

        return(
            <div className='flex h-full w-full   items-center justify-center '>
                <h1 className='text-2xl font-semibold p-3 rounded-lg bg-red-400  w-full text-center'>Bildirim Bulunamadı</h1>
            </div>
        )

    }



    return (
        <div className='flex flex-col gap-y-2 w-full'>
            <div className='flex items-center gap-x-2 w-full'>
                <input
                    type="text"
                    placeholder='Başlık, mesaj veya gönderen ara'
                    className='border p-2 rounded-md w-full'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className='border p-2 rounded-md'
                    value={isRead}
                    onChange={(e) => setIsRead(e.target.value)
                    }
                >
                    <option value="">Tümü</option>
                    <option value="unread">Okunmamış</option>
                    <option value="read">Okunmuş</option>
                </select>
            </div>

            <div className='flex flex-col gap-y-2'>
                {filteredNotifications?.map(notification => (
                    <NotificationBox key={notification.id} notification={notification} />
                ))}
            </div>



        </div>
    )
}

export default Notifications