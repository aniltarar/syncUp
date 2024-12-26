import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPendingMemberApplies } from '../../redux/slices/leaderSlice';

const LeaderMemberClubBox = ({ club }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pendingApplies, setPendingApplies] = useState([]);

    useEffect(() => {
        dispatch(fetchPendingMemberApplies(club.id))
            .then((data) => {
                setPendingApplies(data.payload);
            });
    }, [club, dispatch]);

    return (
        <div
            key={club.id}
            className="bg-white p-5 rounded-xl shadow-lg  flex flex-col items-center border border-gray-200"
        >
            <div className="flex items-center gap-x-5 w-full">
                <img
                    src={club.clubLogo}
                    className="rounded-full w-24 h-24 object-cover border-2 border-gray-200"
                    alt={`${club.clubName} kulübünün logosu`}
                />
                <div className="flex flex-col gap-y-2 w-full">
                    <h1 className="text-2xl font-bold text-gray-700">{club.clubName}</h1>
                    <div className="flex gap-2 text-sm">
                        <span className="bg-primary-dark text-white px-4 py-1 rounded-full">
                            Üye Sayısı: {club.members.length}
                        </span>
                        <span className="bg-primary-dark text-white px-4 py-1 rounded-full">
                            Toplam Başvuru Sayısı: {club.membershipApplies.length}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full mt-5">
                <div className="flex  w-full justify-end">
                    <span className="bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                        Bekleyen Başvuru Sayısı: {pendingApplies?.length}
                    </span>
                </div>
                <button
                    className="bg-primary text-white rounded-lg py-2 px-4 font-semibold hover:bg-primary-hover transition-colors duration-300"
                    onClick={() => navigate(`/leader/membership-applies/${club.id}`)}
                >
                    Başvuruları Görüntüle
                </button>
            </div>
        </div>
    );
};

export default LeaderMemberClubBox;
