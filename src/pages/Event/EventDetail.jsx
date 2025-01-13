import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventById, joinEvent, resetCurrentEvent } from '../../redux/slices/eventSlice';
import { FaCalendarDay, FaClock, FaUsers } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import dayjs from 'dayjs';
import { useAccount } from '../../hooks/useAccount';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const user = useAccount();
  const dispatch = useDispatch();
  const { currentEvent } = useSelector((state) => state.event);
  const {
    eventName,
    eventDescription,
    eventDate,
    eventLocation,
    eventImage,
    eventCapacity,
    participants,
    clubName,
    clubID,
    status,
  } = currentEvent;

  const statusTranslate = {
    pending: 'Başvurulara Açık',
    finished: 'Etkinlik Tamamlandı',
    failed: 'Etkinlik İptal Edildi',
  };

  const statusColor = {
    pending: 'bg-yellow-500',
    finished: 'bg-green-500',
    failed: 'bg-red-500',
  };



  useEffect(() => {
    dispatch(resetCurrentEvent());
    dispatch(fetchEventById(id));
  }, [dispatch, id]);

  const handleJoinEvent = () => {
    if (!user) {
      toast.error('Etkinliğe katılabilmek için giriş yapmalısınız.');
      return;
    }
    if (dayjs(eventDate).isBefore(dayjs())) {
      toast.error('Etkinlik tarihi geçtiği için katılım yapamazsınız.');
      return;
  }

    const joinData = {
      clubID,
      eventID:id,
      userID: user.uid,
    }
    dispatch(joinEvent(joinData));
  }

  return (
    <div className="w-3/4 border mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-96">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-5 right-5 px-4 py-2 rounded ${statusColor[status]}`}
        >
          <p className="text-white text-sm font-medium">
            {statusTranslate[status]}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{eventName}</h1>
          <p className="text-sm text-gray-500 italic">{clubName}</p>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-x-4">
            <FaCalendarDay size={24} className="text-blue-500" />
            <div>
              <h2 className="text-lg font-semibold">Etkinlik Tarihi</h2>
              <p className="text-gray-600">
                {dayjs(eventDate).format('DD/MM/YYYY HH:mm')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <MdLocationOn size={24} className="text-red-500" />
            <div className=''>
              <h2 className="text-lg font-semibold">Etkinlik Yeri</h2>
              <p className="text-gray-600">{eventLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <FaClock size={24} className="text-yellow-500" />
            <div>
              <h2 className="text-lg font-semibold">Etkinlik Durumu</h2>
              <p className="text-gray-600">{statusTranslate[status]}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4">
            <FaUsers size={24} className="text-green-500" />
            <div>
              <h2 className="text-lg font-semibold">Katılımcılar</h2>
              <p className="text-gray-600">
                {participants?.length}/{eventCapacity}
              </p>
            </div>
          </div>
          <div className='col-span-2'>
            <button onClick={handleJoinEvent} className="bg-primary text-white px-4 py-2 rounded-md w-full hover:bg-primary-hover">
              Katıl
            </button>
          </div>
        </div>
        <hr className="my-6" />
        <div>
          <h2 className="text-xl font-semibold mb-3">Etkinlik Açıklaması</h2>
          <p className="text-gray-700 leading-relaxed">{eventDescription}</p>
        </div>

      </div>
    </div>
  );
};

export default EventDetail;
