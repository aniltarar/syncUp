import React, { useState } from 'react';

import ClubSettingModal from '../Modals/ClubSettingModal';

const LeaderClubSettingBox = ({ club }) => {

    const [isEditOpen, setIsEditOpen] = useState(false);

    


    return (
        <>
        {
            isEditOpen && (
                <ClubSettingModal club={club} setIsEditOpen={setIsEditOpen} />
            )
        }
        <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-5 flex items-center gap-5">
            <img
                src={club?.clubLogo}
                alt={`${club?.clubName} kulübünün logosu`}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-gray-200"
                />
            <div className="flex flex-col justify-between flex-1">
                <h1 className="text-2xl font-bold text-gray-700">{club?.clubName}</h1>
                <p className="text-gray-600 text-sm md:text-base mt-2">{club?.clubDescription}</p>
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="ml-auto my-2 px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors duration-300 self-start"
                    >
                    Özelleştir
                </button>
            </div>
        </div>
                    </>
    );
};

export default LeaderClubSettingBox;
