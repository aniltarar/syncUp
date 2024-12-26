import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeaderAnnouncementClubBox = ({ club }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5 flex items-center gap-5">
            <div className="flex items-center">
                <img
                    src={club?.clubLogo}
                    alt={`${club?.clubName} kulübünün logosu`}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
                />
            </div>
            <div className="flex flex-col justify-between flex-1">
                <h1 className="text-2xl font-bold text-gray-700">{club?.clubName}</h1>
                <span className="text-lg font-medium text-gray-600">
                    Duyuru Sayısı: <span className="text-primary">{club?.announcements.length}</span>
                </span>
            </div>
            <button
                onClick={() => navigate(`/leader/announcements/${club.id}`)}
                className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors duration-300"
            >
                Duyurular
            </button>
        </div>
    );
};

export default LeaderAnnouncementClubBox;
