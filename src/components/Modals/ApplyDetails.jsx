import React from 'react';
import { createPortal } from 'react-dom';

const ApplyDetails = ({ apply, setIsOpen }) => {
  const { clubName, clubDescription, createdByName, clubLogo, status } = apply;

  const statusWord = {
    pending: "Beklemede",
    success: "Onaylandı",
    rejected: "Reddedildi",
  };

  const statusColor = {
    pending: "text-yellow-500",
    success: "text-green-500",
    rejected: "text-red-500",
  };

  const modalRoot = document.getElementById("modal-root");

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg w-1/3  p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{clubName}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-black text-lg"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={clubLogo}
              alt={`${clubName} Logo`}
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium">Kulüp Açıklaması</h3>
            <p className="text-gray-700">{clubDescription}</p>
          </div>

          {/* Created By */}
          <div>
            <h3 className="text-lg font-medium">Başvuran Kişi</h3>
            <p className="text-gray-700">{createdByName}</p>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-medium">Durum</h3>
            <p className={`${statusColor[status]} font-bold`}>{statusWord[status]}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-x-4">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ApplyDetails;
