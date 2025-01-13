import React, { useEffect } from 'react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { fetchActiveEvents, joinEvent, setFinishedEventByID } from '../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { useAccount } from '../../hooks/useAccount';
import dayjs from 'dayjs';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarDay, FaUsers } from 'react-icons/fa';
import toast from 'react-hot-toast';

const EventCard = ({ event }) => {
    const {
        id,
        eventName,
        eventDescription,
        eventDate,
        eventLocation,
        eventImage,
        eventCapacity,
        participants,
        clubName,
        clubID,
    } = event;
    const dispatch = useDispatch();
    const user = useAccount();

    const handleJoinEvent = () => {
        if(!user){
            toast.error('Etkinliğe katılabilmek için giriş yapmalısınız.');
            return;
        }

        // Etkinlik Tarihi Geçmişse Katılım Yapılamaz
        if (dayjs(eventDate).isBefore(dayjs())) {
            toast.error('Etkinlik tarihi geçtiği için katılım yapamazsınız.');
            return;
        }


        const joinData = {
            clubID,
            eventID: id,
            userID: user.uid,
        }
        dispatch(joinEvent(joinData));
        dispatch(fetchActiveEvents());

    }

    const checkEventDate = () => {
        // event Tarihi geçmişse eğer finished olarak güncelle
        if (dayjs(eventDate).isBefore(dayjs())) {
            dispatch(setFinishedEventByID(id));
        }
    }

    useEffect(() => {
        checkEventDate();
    }, [eventDate]);


    return (
        <div className="bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col">
            {/* Etkinlik Görseli */}
            <div className="relative h-48 ">
                <img
                    src={eventImage}
                    alt={`${eventName} görseli`}
                    className="w-full h-full object-cover"
                />
              
            </div>

            {/* Etkinlik Bilgileri */}
            <div className="p-4 flex flex-col gap-y-2  h-full">
                <h3 className="text-xl font-bold text-gray-800">{eventName}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {eventDescription}
                </p>

                <div className="mt-auto space-y-2  text-gray-600 text-sm ">
                    <div className="flex items-center gap-x-2 justify-between">

                        <div className='flex items-center gap-x-2'>
                            <FaCalendarDay size={24} className="text-blue-500" />
                            <span>{dayjs(eventDate).format("DD/MM/YYYY HH:mm")}</span>
                        </div>
                        <span className='bg-gray-200 border rounded-lg px-2 py-1'>
                            {clubName}
                        </span>

                    </div>
                    <div className="flex items-center gap-x-2">

                        <MdLocationOn size={24} className="text-red-500" />
                        <span>{eventLocation}</span>
                    </div>
                    <div className="flex items-center gap-x-2">

                        <FaUsers size={24} className="text-green-500" />
                        <span>
                            {participants.length}/{eventCapacity} kişi
                        </span>
                    </div>
                </div>
            </div>

            {/* Etkinlik Butonu */}
            <div className="p-4 border-t mt-auto flex justify-between items-center gap-x-2">
                <div className='px-2 py-1 bg-neutral-300 rounded-lg flex items-center justify-center gap-x-2 w-full hover:bg-neutral-400'>
                    <IoIosInformationCircleOutline size={20} />
                    <Link to={`/events/${event.id}`} className=''>Detayı Gör</Link>
                </div>
                {participants.length < eventCapacity ? (
                    <button onClick={handleJoinEvent} className="px-2 py-1 text-white bg-primary rounded-lg flex items-center justify-center gap-x-2 w-full hover:bg-primary-hover">
                        Katıl
                    </button>
                ) : (
                    <button className="w-full bg-gray-100 text-gray-500 py-2 rounded-lg cursor-not-allowed">
                        Kontenjan Dolu
                    </button>
                )}

            </div>
        </div>
    );
};

export default EventCard;
