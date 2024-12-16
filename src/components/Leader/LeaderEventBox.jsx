import dayjs from 'dayjs';
import React from 'react';

const LeaderEventBox = ({ event }) => {
  const eventDate = dayjs(event.eventDate).format('DD/MM/YYYY HH:mm');

  const statusTranslate = {
    success: 'Tamamlandı',
    failed: 'İptal Edildi',
    pending: 'Planlanıyor',
  };

  const statusColor = {
    success: 'text-green-500 bg-green-100',
    failed: 'text-red-500 bg-red-100',
    pending: 'text-yellow-500 bg-yellow-100',
  };

  return (
    <div className="grid grid-cols-6 gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 place-items-center border">
      {/* Etkinlik Adı */}
      <span className="justify-self-start text-gray-800 font-medium">{event.eventName}</span>
        {/* Etkinlik Görseli */}
        <span className="justify-self-start">
        <img
          src={event.eventImage}
          alt={event.eventName}
          className="w-24 h-24 object-cover rounded-md border"
        />
      </span>

      {/* Etkinlik Tarihi */}
      <span className="justify-self-start text-gray-600">{eventDate}</span>

    

      {/* Etkinlik Konumu */}
      <span className="justify-self-start text-gray-600">{event.eventLocation}</span>

      {/* Kulüp Adı */}
      <span className="justify-self-center text-gray-800">{event.clubName}</span>

      {/* Etkinlik Durumu */}
      <span
        className={`justify-self-center text-sm px-4 py-1 rounded-full font-medium ${statusColor[event.status]}`}
      >
        {statusTranslate[event.status]}
      </span>
    </div>
  );
};

export default LeaderEventBox;
