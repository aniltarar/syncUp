import React, { Fragment, useEffect, useState } from 'react';
import { useAccount } from '../../hooks/useAccount';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotificationsDown } from '../../redux/slices/authSlice';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/tr'; // Türkçe dil dosyasını dahil ediyoruz

// relativeTime plugin'ini dahil ediyoruz
dayjs.extend(relativeTime);
dayjs.locale('tr');

const NotificationsDown = () => {
    const dispatch = useDispatch();
    const user = useAccount();
    const { notifactionsDown } = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open); // open durumunu tersine çevirir
        dispatch(fetchNotificationsDown(user.uid))
    };

    useEffect(() => {
        dispatch(fetchNotificationsDown(user.uid))
    }, [dispatch, user.uid]);

    const filteredNotifications = notifactionsDown?.filter(notification => {
        const unReadNotification = notification.isRead === false;
        return unReadNotification;
    });

    const sortedNotifications = [...notifactionsDown]?.sort((a, b) => {
        const dateA = a?.createdAt?.toDate ? a.createdAt.toDate() : new Date(a?.createdAt);
        const dateB = b?.createdAt?.toDate ? b.createdAt.toDate() : new Date(b?.createdAt);
        return dateB - dateA; // En yeni tarih en üstte olacak şekilde sıralar
    });

    return (
        <Menu>
            <MenuButton className="px-5 py-2 rounded-full bg-primary/20 hover:bg-primary/50 hover:ring-2 ring-offset-2 ring-primary transition-all duration-200" onClick={toggleOpen}>
                <div className="flex items-center gap-3">
                    <span
                        className={`flex rounded-full ${filteredNotifications.length > 0 ? "animate-shake " : ""
                            }`}
                    >
                        <FaBell size={22} />
                    </span>
                </div>
            </MenuButton>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems
                    anchor="bottom end"
                    className="bg-white w-60 rounded-md shadow-xl border p-3 flex flex-col gap-y-2 mt-2"
                >
                    {
                        sortedNotifications && sortedNotifications.length > 0 ? (
                            sortedNotifications.slice(0, 3).map((notification, index) => {
                                const notificationTime = notification.createdAt?.toDate
                                    ? dayjs(notification.createdAt.toDate()).fromNow()
                                    : 'Geçersiz Tarih';

                                return (
                                    <MenuItem key={notification.id || index}>
                                        <Link to="/notifications" className="block transition-colors text-sm data-[focus]:bg-neutral-100 px-2 py-1 rounded-md">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-lg font-bold text-gray-800">{notification.title}</h2>
                                                <span className="text-sm text-gray-500">{notificationTime}</span>
                                            </div>
                                        </Link>
                                    </MenuItem>
                                );
                            })
                        ) : (
                            <span className="text-center text-sm text-black-500 bg-neutral-100 p-2 rounded-md ">
                                Bildirim Yok
                            </span>
                        )
                    }

                    <MenuItem className="mt-5 text-center block bg-neutral-200 transition-colors text-sm data-[focus]:bg-neutral-300 px-2 py-1 rounded-md">
                        <Link to='/notifications' className=' '>Tüm Bildirimlere Git</Link>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

export default NotificationsDown;
