import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

const PassedEventBox = ({ event }) => {
  const { eventName, eventDate, eventImage, clubName, status } = event;

  const statusTranslate = {
    pending: "Planlanıyor",
    failed: "İptal Edilmiş",
    finished: "Tamamlandı",
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-500",
    failed: "bg-red-100 text-red-500",
    finished: "bg-green-100 text-green-500",
  }

  const formattedDate = dayjs(eventDate).format("DD/MM/YYYY HH:mm");

  return (
    <Link to={`/events/${event?.id}`} className="flex flex-col border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={eventImage}
          alt={eventName}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${statusColor[status]}`}>   
          {statusTranslate[status]}
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-lg font-semibold text-gray-800">{eventName}</h1>
        <p className="text-sm text-gray-600">{clubName}</p>
        <p className="text-sm text-gray-500 mt-2">{formattedDate}</p>
      </div>
    </Link>
  );
};

export default PassedEventBox;
