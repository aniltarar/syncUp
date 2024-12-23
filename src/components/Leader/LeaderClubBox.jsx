import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchClubLeadersName, fetchPendingMemberApplies } from '../../redux/slices/leaderSlice';


const LeaderClubBox = ({ club }) => {
  const dispatch = useDispatch();
  const [leaderNames, setLeaderNames] = useState([]);
  const [pendingApplies, setPendingApplies] = useState([]);

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };




  useEffect(() => {
    dispatch(fetchClubLeadersName(club.id)).then((data) => {
      const leaderNames = data.payload.map((name) => capitalizeWords(name));
      setLeaderNames(leaderNames);
    });
    
  }, [club, dispatch]);

  useEffect(() => {
    dispatch(fetchPendingMemberApplies(club.id)).then((data) => {
      setPendingApplies(data.payload);
    });
  }, [club, dispatch]);



  return (
    <div className="grid grid-cols-6 gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 place-items-center border">
      {/* Kulüp Adı */}
      <span className="justify-self-start text-gray-800 font-medium">{club.clubName}</span>

      {/* Kulüp Logosu */}
      <span className="justify-self-start">
        <img
          src={club.clubLogo}
          alt={club.clubName}
          className="w-24 h-24  rounded-md border"
        />
      </span>

      {/* Kulüp Liderleri */}
      <span className="justify-self-start text-gray-600">
        {leaderNames.length > 0 ? leaderNames.join(', ') : 'Lider Yok'}
      </span>

      {/* Üye Sayısı */}
      <span className="justify-self-center text-gray-800">{club?.members?.length} Üye</span>

      {/* Etkinlik Sayısı */}
      <span className="justify-self-center text-gray-800">{club?.events?.length} Etkinlik</span>

      {/* Bekleyen Üye Başvuruları */}
      <span className="justify-self-center text-sm px-4 py-1 rounded-full font-medium bg-yellow-100 text-yellow-500 animate-pulse">
        {pendingApplies?.length || 0} Kişi bekliyor.
      </span>
    </div>
  );
};

export default LeaderClubBox;
