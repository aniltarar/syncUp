import dayjs from 'dayjs';
import React, { useState } from 'react';
import CancelledEvent from '../Modals/CancelledEvent';
import EditEvent from '../Modals/EditEvent';

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

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>

      {
        isOpen && (
          <CancelledEvent event={event} setIsOpen={setIsOpen} />
        )
      }
      {
        isEditOpen && (
          <EditEvent event={event} setIsEditOpen={setIsEditOpen} />
        )
      }
      <div className="grid grid-cols-8 gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 place-items-center border">
        {/* Etkinlik Adı */}
        <span className="justify-self-start text-gray-800 font-medium">{event.eventName}</span>
          {/* Etkinlik Tarihi */}
          <span className="justify-self-start text-gray-600">{eventDate}</span>
        {/* Etkinlik Görseli */}
        <span className="justify-self-start">
          <img
            src={event.eventImage}
            alt={event.eventName}
            className="w-24 h-24 object-cover rounded-md border"
          />
        </span>

      



        {/* Etkinlik Konumu */}
        <span className="justify-self-start text-gray-600">{event.eventLocation}</span>

        {/* Kulüp Adı */}
        <span className="justify-self-center text-gray-800">{event.clubName}</span>

        {/* Etkinlik Katılımcı Sayısı */}
        <span className="justify-self-center text-gray-800">{event.participants? <span>{(event?.participants?.length)} Katılımcı</span>: <span>Henüz Katılımcı Yok</span>}</span>

        {/* Etkinlik Durumu */}
        <span
          className={`justify-self-center text-sm px-4 py-1 rounded-full font-medium ${statusColor[event.status]}`}
        >
          {statusTranslate[event.status]}
        </span>
        <span
          className={`justify-self-center text-sm flex flex-col gap-y-2`}
        >
          <button onClick={()=>setIsEditOpen(true)} className=' px-4 py-2 rounded-full font-medium bg-yellow-500 text-white hover:bg-yellow-600' >Düzenle</button>
          <button onClick={() => setIsOpen(true)} className=' px-4 py-2 rounded-full font-medium bg-red-500 text-white hover:bg-red-600' >İptal Et</button>
        </span>



      </div>
    </>
  );
};

export default LeaderEventBox;
